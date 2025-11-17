import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/modal";
import Button from "../../../components/button";
import Input from "../../../components/input";
import { OrderItem } from "../../../types/OrderItem";
import { AppDispatch } from "../../../redux/store";
import { UpdateOrderAdminAction } from "../../../redux/actions/order/OrderActions";
import { selectUpdateOrderAdminLoading } from "../../../redux/slice/order/orderSlice";

interface DriverEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderItem | null;
  onSuccess: () => void;
}

const DriverEditModal: React.FC<DriverEditModalProps> = ({
  isOpen,
  onClose,
  order,
  onSuccess,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectUpdateOrderAdminLoading);
  
  const [formData, setFormData] = useState({
    driverName: "",
    driverPhone: "",
    licensePlate: "",
    vehicleName: "",
    billNumber: "",
  });

  const [errors, setErrors] = useState({
    driverName: "",
    driverPhone: "",
    licensePlate: "",
    vehicleName: "",
  });

  useEffect(() => {
    if (order?.driver) {
      setFormData({
        driverName: order.driver.driverName || "",
        driverPhone: order.driver.driverPhone || "",
        licensePlate: order.driver.licensePlate || "",
        vehicleName: order.driver.vehicleName || "",
        billNumber: order.driver.billNumber || "",
      });
    }
  }, [order]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!order?.id) return;

    const driverData = {
      driver: {
        driverName: formData.driverName,
        driverPhone: formData.driverPhone,
        licensePlate: formData.licensePlate,
        vehicleName: formData.vehicleName,
        billNumber: formData.billNumber,
      }
    };

    dispatch(UpdateOrderAdminAction({
      orderId: order.id,
      data: driverData,
      onSubmitForm: () => {
        onSuccess();
        onClose();
      }
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!order) return null;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      headerTitle="ویرایش اطلاعات راننده"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Order Info */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">اطلاعات سفارش</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                شناسه سفارش
              </label>
              <p className="text-sm text-gray-500 bg-gray-100 p-2 rounded">
                {order.id}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                نام محصول
              </label>
              <p className="text-sm text-gray-500 bg-gray-100 p-2 rounded">
                {order.product?.name || "_"}
              </p>
            </div>
          </div>
        </div>

        {/* Driver Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">اطلاعات راننده</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                label="نام راننده"
                value={formData.driverName}
                onChange={(e) => handleInputChange("driverName", e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                label="شماره تماس راننده"
                value={formData.driverPhone}
                onChange={(e) => handleInputChange("driverPhone", e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                label="پلاک خودرو"
                value={formData.licensePlate}
                onChange={(e) => handleInputChange("licensePlate", e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                label="نوع خودرو"
                value={formData.vehicleName}
                onChange={(e) => handleInputChange("vehicleName", e.target.value)}
                required
              />
            </div>
            <div className="col-span-2">
              <Input
                label="شماره بارنامه"
                value={formData.billNumber}
                onChange={(e) => handleInputChange("billNumber", e.target.value)}
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
          <Button
            type="submit"
            variant="primary"
            loading={loading}
          >
            ذخیره تغییرات
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default DriverEditModal;