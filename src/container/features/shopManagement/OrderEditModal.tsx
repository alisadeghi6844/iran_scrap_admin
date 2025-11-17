import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/modal";
import Button from "../../../components/button";
import Input from "../../../components/input";
import TextArea from "../../../components/textArea";
import SingleSelect from "../../../components/select/SingleSelect";
import StandaloneProvinceSelect from "../provinceSelect/StandaloneProvinceSelect";
import StandaloneCitySelect from "../provinceSelect/StandaloneCitySelect";
import { province } from "../provinceSelect/Province";
import { city } from "../provinceSelect/city";
import { OrderItem } from "../../../types/OrderItem";
import { OrderStatus, orderStatusOptions } from "../../../types/OrderStatus";
import { AppDispatch } from "../../../redux/store";
import { UpdateOrderAdminAction } from "../../../redux/actions/order/OrderActions";
import { selectUpdateOrderAdminLoading } from "../../../redux/slice/order/orderSlice";

interface OrderEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderItem | null;
  onSuccess: () => void;
}

const OrderEditModal: React.FC<OrderEditModalProps> = ({
  isOpen,
  onClose,
  order,
  onSuccess,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectUpdateOrderAdminLoading);

  const [formData, setFormData] = useState<{
    status: { value: OrderStatus; label: string } | null;
    province: string;
    city: string;
    detail: string;
    postalCode: string;
  }>({
    status: null,
    province: "",
    city: "",
    detail: "",
    postalCode: "",
  });

  const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (order) {
      const statusOption = orderStatusOptions.find(
        (opt) => opt.value === order.status
      );

      // Get province from product.address or order level
      const orderProvince =
        order.product?.address?.province || order.province || "";
      const orderCity = order.product?.address?.city || order.city || "";

      // Convert province name to ID if it's stored as name
      let provinceId: string = "";
      let provinceIdNumber: number | null = null;

      if (orderProvince) {
        // Check if it's already an ID (number as string)
        if (!isNaN(Number(orderProvince))) {
          provinceId = orderProvince;
          provinceIdNumber = parseInt(orderProvince);
        } else {
          // It's a name, find the ID
          const foundProvince = province.find((p) => p.name === orderProvince);
          if (foundProvince) {
            provinceId = foundProvince.id.toString();
            provinceIdNumber = foundProvince.id;
          }
        }
      }

      // Convert city name to ID if it's stored as name
      let cityId: string = "";

      if (orderCity && provinceIdNumber) {
        // Check if it's already an ID (number as string)
        if (!isNaN(Number(orderCity))) {
          cityId = orderCity;
        } else {
          // It's a name, find the ID
          const foundCity = city.find(
            (c) => c.name === orderCity && c.province_id === provinceIdNumber
          );
          if (foundCity) {
            cityId = foundCity.id.toString();
          }
        }
      }

      setFormData({
        status: statusOption || null,
        province: provinceId,
        city: cityId,
        detail: order.product?.address?.detail || order.address || "",
        postalCode:
          order.product?.address?.postalCode || order.postalCode || "",
      });

      // Set province ID for city filtering
      setSelectedProvinceId(provinceIdNumber);
    }
  }, [order]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!order?.id) return;

    const updateData = {
      status: formData.status?.value,
      province: formData.province,
      city: formData.city,
      address: formData.detail,
      postalCode: formData.postalCode,
    };

    dispatch(
      UpdateOrderAdminAction({
        orderId: order.id,
        data: updateData,
        onSubmitForm: () => {
          onSuccess();
          onClose();
        },
      })
    );
  };

  const handleInputChange = (field: string, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleProvinceChange = (provinceValue: string) => {
    setFormData((prev) => ({
      ...prev,
      province: provinceValue,
      city: "", // Reset city when province changes
    }));
    setSelectedProvinceId(provinceValue ? parseInt(provinceValue) : null);
  };

  const handleCityChange = (cityValue: string) => {
    setFormData((prev) => ({
      ...prev,
      city: cityValue,
    }));
  };

  if (!order) return null;

  return (
    <Modal open={isOpen} onClose={onClose} headerTitle="ویرایش سفارش" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Order Status */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            وضعیت سفارش
          </h3>
          <SingleSelect
            label="وضعیت"
            options={orderStatusOptions}
            value={formData.status}
            onChange={(value) => handleInputChange("status", value)}
            required
          />
        </div>

        {/* Address Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            اطلاعات آدرس
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <StandaloneProvinceSelect
                label="استان"
                value={formData.province}
                onChange={handleProvinceChange}
                onProvinceChange={setSelectedProvinceId}
              />
            </div>
            <div>
              <StandaloneCitySelect
                label="شهر"
                value={formData.city}
                onChange={handleCityChange}
                provinceId={selectedProvinceId}
              />
            </div>
            <div className="col-span-2">
              <TextArea
                label="آدرس کامل"
                value={formData.detail}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleInputChange("detail", e.target.value)
                }
                rows={2}
              />
            </div>
            <div>
              <Input
                label="کد پستی"
                value={formData.postalCode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("postalCode", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            انصراف
          </Button>
          <Button type="submit" variant="primary" loading={loading}>
            ذخیره تغییرات
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default OrderEditModal;
