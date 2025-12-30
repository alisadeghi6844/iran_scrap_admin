import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UploadProductImageAction, DeleteProductImageAction } from "../../../../redux/actions/product/ProductImageActions";

interface UseProductImagesParams {
  dispatch: any;
  id?: string | null;
  product?: any;
  getValue?: any;
}

// Extracted from ProductEditModal with no behavior/UI changes.
export function useProductImages(params: UseProductImagesParams) {
  const { dispatch, id, product, getValue } = params;

  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [imageIds, setImageIds] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState<Set<string>>(new Set());

  // Debug log for imageURLs changes
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("imageURLs changed:", imageURLs);
  }, [imageURLs]);

  // Update imageURLs when images change
  useEffect(() => {
    if (getValue?.data?.images) {
      const urls = getValue.data.images.map((img: any) => img.url || img.path);
      const ids = getValue.data.images.map((img: any) => img._id || img.id);
      setImageURLs(urls);
      setImageIds(ids);
    } else if (product?.images) {
      const urls = product.images.map((img: any) => img.url || img.path);
      const ids = product.images.map((img: any) => img._id || img.id);
      setImageURLs(urls);
      setImageIds(ids);
    }
  }, [getValue?.data?.images, product?.images]);

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      uploadingImages.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [uploadingImages]);

  const uploadNewImage = async (file: File) => {
    // eslint-disable-next-line no-console
    console.log("uploadNewImage called with file:", file.name);
    const productId = id || product?._id;
    // eslint-disable-next-line no-console
    console.log("Product ID:", productId);

    if (!productId) {
      toast.error("شناسه محصول یافت نشد. لطفا صفحه را رفرش کنید.");
      return;
    }

    // Create preview URL for the file
    const previewUrl = URL.createObjectURL(file);
    // eslint-disable-next-line no-console
    console.log("Created preview URL:", previewUrl);

    // Store the index where we're adding this image
    const newImageIndex = imageURLs.length;
    // eslint-disable-next-line no-console
    console.log("New image will be at index:", newImageIndex);

    // Add to image URLs immediately (hard-coded display)
    setImageURLs((prev) => {
      const updated = [...prev, previewUrl];
      // eslint-disable-next-line no-console
      console.log("Added preview to imageURLs:", updated);
      return updated;
    });
    setImageIds((prev) => [...prev, ""]); // Empty ID for uploading image
    setUploadingImages((prev) => new Set([...prev, previewUrl]));

    dispatch(
      UploadProductImageAction({
        productId,
        imageFile: file,
        onSuccess: (response: any) => {
          // eslint-disable-next-line no-console
          console.log("Upload response full:", response);
          // eslint-disable-next-line no-console
          console.log("Response data:", response?.data);

          // Try multiple possible response structures
          let newImageUrl: string | null = null;
          let newImageId: string | null = null;

          if (response?.data?.image) {
            newImageUrl = response.data.image.url || response.data.image.path;
            newImageId = response.data.image._id || response.data.image.id;
          } else if (response?.data?.url || response?.data?.path) {
            newImageUrl = response.data.url || response.data.path;
            newImageId = response.data._id || response.data.id;
          } else if (response?.image) {
            newImageUrl = response.image.url || response.image.path;
            newImageId = response.image._id || response.image.id;
          } else if (response?.url || response?.path) {
            newImageUrl = response.url || response.path;
            newImageId = response._id || response.id;
          }

          // eslint-disable-next-line no-console
          console.log("Extracted image URL:", newImageUrl);
          // eslint-disable-next-line no-console
          console.log("Extracted image ID:", newImageId);

          if (newImageUrl) {
            // Replace preview URL with actual URL at the specific index
            setImageURLs((prevUrls) => {
              const previewIndex = prevUrls.findIndex((url) => url === previewUrl);
              if (previewIndex !== -1) {
                const updated = [...prevUrls];
                updated[previewIndex] = newImageUrl as string;
                // eslint-disable-next-line no-console
                console.log("Updated image URLs:", updated);
                return updated;
              }
              return prevUrls;
            });

            // Update the corresponding ID at the same index
            setImageIds((prevIds) => {
              const updated = [...prevIds];
              updated[newImageIndex] = newImageId || "";
              // eslint-disable-next-line no-console
              console.log("Updated image IDs:", updated);
              return updated;
            });

            // Remove from uploading set
            setUploadingImages((prev) => {
              const updated = new Set(prev);
              updated.delete(previewUrl);
              return updated;
            });

            // Clean up the preview URL
            URL.revokeObjectURL(previewUrl);

            toast.success("تصویر با موفقیت آپلود شد");
          } else {
            // eslint-disable-next-line no-console
            console.error("Could not extract image URL from response");
            toast.error("تصویر آپلود شد اما نمایش داده نشد. لطفا صفحه را رفرش کنید.");
          }
        },
        onError: (error: any) => {
          // eslint-disable-next-line no-console
          console.error("Error uploading image:", error);
          // eslint-disable-next-line no-console
          console.log("Removing failed upload:", previewUrl);

          // Remove failed upload from all states
          setImageURLs((prev) => {
            const updated = prev.filter((url) => url !== previewUrl);
            // eslint-disable-next-line no-console
            console.log("Removed from imageURLs:", updated);
            return updated;
          });
          setImageIds((prev) => {
            const updated = [...prev];
            updated.splice(newImageIndex, 1);
            return updated;
          });
          setUploadingImages((prev) => {
            const updated = new Set(prev);
            updated.delete(previewUrl);
            return updated;
          });

          // Clean up the preview URL
          URL.revokeObjectURL(previewUrl);

          toast.error("خطا در آپلود تصویر. لطفا دوباره تلاش کنید.");
        },
      })
    );
  };

  const removeImage = (index: number) => {
    const productId = id || product?._id;
    const imageId = imageIds[index];

    if (!productId) {
      toast.error("شناسه محصول یافت نشد. لطفا صفحه را رفرش کنید.");
      return;
    }

    if (!imageId) {
      // If no imageId, just remove from local state (for newly uploaded images)
      setImageURLs((prev) => prev.filter((_, i) => i !== index));
      setImageIds((prev) => prev.filter((_, i) => i !== index));
      return;
    }

    dispatch(
      DeleteProductImageAction({
        productId,
        imageId,
        onSuccess: () => {
          setImageURLs((prev) => prev.filter((_, i) => i !== index));
          setImageIds((prev) => prev.filter((_, i) => i !== index));
        },
        onError: (error: any) => {
          // eslint-disable-next-line no-console
          console.error("Error deleting image:", error);
        },
      })
    );
  };

  return { imageURLs, imageIds, uploadingImages, uploadNewImage, removeImage };
}


