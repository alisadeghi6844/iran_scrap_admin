import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import Modal from "../../../components/modal";
import Typography from "../../../components/typography/Typography";
import Button from "../../../components/button";
import Input from "../../../components/input";
import { GetProductRequestAdminByIdAction } from "../../../redux/actions/product-request-offer-admin/ProductRequestOfferAdminActions";
import {
  selectGetProductRequestAdminByIdLoading,
  selectGetProductRequestAdminByIdData,
} from "../../../redux/slice/product-request-offer-admin/ProductRequestOfferAdminSlice";

interface ProductRequestItem {
  _id: string;
  id?: string;
  providerIds: Array<{
    id: string;
    mobile: string;
    phone?: string;
    companyName?: string;
    agentName?: string;
    agentPhone?: string;
    firstName?: string;
    lastName?: string;
  }>;
  [key: string]: any;
}

interface ProductRequestEditRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: ProductRequestItem | null;
}

const ProductRequestEditRequestModal: React.FC<ProductRequestEditRequestModalProps> = ({
  isOpen,
  onClose,
  request,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [requestDetails, setRequestDetails] = useState<any>(null);
  const [editableFields, setEditableFields] = useState({
    description: "",
    amount: "",
    city: "",
    province: "",
    address: "",
    postalCode: "",
  });

  const loading = useSelector(selectGetProductRequestAdminByIdLoading);
  const requestData = useSelector(selectGetProductRequestAdminByIdData);

  // Reset state when modal opens or request changes
  useEffect(() => {
    if (isOpen && (request?._id || request?.id)) {
      setRequestDetails(null);
      dispatch(
        GetProductRequestAdminByIdAction({
          requestId: request._id || request.id,
        })
      );
    }
  }, [isOpen, request?._id, request?.id, dispatch]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setRequestDetails(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (requestData && isOpen) {
      setRequestDetails(requestData);
      // Initialize editable fields
      setEditableFields({
        description: requestData.description || "",
        amount: requestData.amount?.toString() || "",
        city: requestData.city || "",
        province: requestData.province || "",
        address: requestData.address || "",
        postalCode: requestData.postalCode || "",
      });
    }
  }, [requestData, isOpen]);

  const handleFieldChange = (field: string, value: string) => {
    setEditableFields(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveChanges = () => {
    // TODO: Implement save functionality
    console.log("Saving changes:", editableFields);
    // Here you would call an API to update the request
    onClose();
  };

  if (!request) {
    return null;
  }

  const displayData = requestDetails || request;

  // Check if providerIds is not empty
  const hasProviders = displayData?.providerIds && displayData.providerIds.length > 0;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      size="lg"
      headerTitle="ویرایش درخواست محصول"
    >
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-center">در حال بارگذاری...</div>
        </div>
      ) : (
        <div className="space-y-6">
          {hasProviders ? (
            // Show message when providerIds is not empty
            <div className="text-center py-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <Typography className="text-red-600 text-lg font-bold mb-2">
                  امکان ویرایش وجود ندارد
                </Typography>
                <Typography className="text-red-500">
                  این درخواست دارای تامین‌کننده می‌باشد و امکان ویرایش آن وجود ندارد.
                </Typography>
              </div>
              <div className="mt-6">
                <Button
                  type="button"
                  variant="primary"
                  onClick={onClose}
                >
                  بستن
                </Button>
              </div>
            </div>
          ) : (
            // Show edit form when providerIds is empty
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <Typography className="text-green-600 font-bold">
                  امکان ویرایش درخواست
                </Typography>
                <Typography className="text-green-500 text-sm">
                  این درخواست هنوز تامین‌کننده ندارد و قابل ویرایش است.
                </Typography>
              </div>

              {/* Request Information - Editable Form */}
              <div>
                <Typography className="text-lg font-bold mb-3">
                  ویرایش اطلاعات درخواست
                </Typography>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Typography className="text-sm text-gray-600 mb-2">
                        توضیحات درخواست
                      </Typography>
                      <Input
                        value={editableFields.description}
                        onChange={(e) => handleFieldChange("description", e.target.value)}
                        placeholder="توضیحات درخواست را وارد کنید"
                      />
                    </div>
                    <div>
                      <Typography className="text-sm text-gray-600 mb-2">
                        دسته‌بندی (غیرقابل ویرایش)
                      </Typography>
                      <Input
                        value={displayData.category?.name || "_"}
                        disabled
                        className="bg-gray-100"
                      />
                    </div>
                    <div>
                      <Typography className="text-sm text-gray-600 mb-2">
                        مقدار
                      </Typography>
                      <Input
                        type="number"
                        value={editableFields.amount}
                        onChange={(e) => handleFieldChange("amount", e.target.value)}
                        placeholder="مقدار را وارد کنید"
                      />
                    </div>
                    <div>
                      <Typography className="text-sm text-gray-600 mb-2">
                        واحد (غیرقابل ویرایش)
                      </Typography>
                      <Input
                        value={displayData.amountType || "_"}
                        disabled
                        className="bg-gray-100"
                      />
                    </div>
                    <div>
                      <Typography className="text-sm text-gray-600 mb-2">
                        شهر
                      </Typography>
                      <Input
                        value={editableFields.city}
                        onChange={(e) => handleFieldChange("city", e.target.value)}
                        placeholder="شهر را وارد کنید"
                      />
                    </div>
                    <div>
                      <Typography className="text-sm text-gray-600 mb-2">
                        استان
                      </Typography>
                      <Input
                        value={editableFields.province}
                        onChange={(e) => handleFieldChange("province", e.target.value)}
                        placeholder="استان را وارد کنید"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Typography className="text-sm text-gray-600 mb-2">
                        آدرس
                      </Typography>
                      <Input
                        value={editableFields.address}
                        onChange={(e) => handleFieldChange("address", e.target.value)}
                        placeholder="آدرس کامل را وارد کنید"
                      />
                    </div>
                    <div>
                      <Typography className="text-sm text-gray-600 mb-2">
                        کد پستی
                      </Typography>
                      <Input
                        value={editableFields.postalCode}
                        onChange={(e) => handleFieldChange("postalCode", e.target.value)}
                        placeholder="کد پستی را وارد کنید"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onClose}
                >
                  انصراف
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleSaveChanges}
                >
                  ذخیره تغییرات
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default ProductRequestEditRequestModal;