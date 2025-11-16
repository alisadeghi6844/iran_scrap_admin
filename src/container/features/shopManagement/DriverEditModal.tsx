import { useState, useEffect } from "react";
import Modal from "../../../components/modal";
import Button from "../../../components/button";
import Input from "../../../components/input";

interface DriverEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
  onSuccess: () => void;
}

const DriverEditModal: React.FC<DriverEditModalProps> = ({
  isOpen,
  onClose,
  order,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    driverName: "",
    driverPhone: "",
    licensePlate: "",
    vehicleName: "",
    billNumber: "",
  });
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Updated driver data:", formData);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating driver:", error);
    } finally {
      setLoading(false);
    }
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
      isOpen={isOpen}
      onClose={onClose}
      title="ویرایش اطلاعات راننده"
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
                توضیحات
              </label>
              <p className="text-sm text-gray-500 bg-gray-100 p-2 rounded">
                {order.description || "_"}
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
                placeholder="نام و نام خانوادگی راننده..."
                required
              />
            </div>
            <div>
              <Input
                label="شماره تماس راننده"
                value={formData.driverPhone}
                onChange={(e) => handleInputChange("driverPhone", e.target.value)}
                placeholder="09xxxxxxxxx"
                required
              />
            </div>
            <div>
              <Input
                label="پلاک خودرو"
                value={formData.licensePlate}
                onChange={(e) => handleInputChange("licensePlate", e.target.value)}
                placeholder="12ط345-67"
                required
              />
            </div>
            <div>
              <Input
                label="نوع خودرو"
                value={formData.vehicleName}
                onChange={(e) => handleInputChange("vehicleName", e.target.value)}
                placeholder="نوع و مدل خودرو..."
                required
              />
            </div>
            <div className="col-span-2">
              <Input
                label="شماره بارنامه"
                value={formData.billNumber}
                onChange={(e) => handleInputChange("billNumber", e.target.value)}
                placeholder="شماره بارنامه..."
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