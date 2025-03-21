import React from "react";
import { useDispatch } from "react-redux";

import { PublicDictionary } from "../../../utils/dictionary";
import Typography from "../../../components/typography/Typography";
import ConfirmationCard from "../../organism/ConfirmationCard";
import Image from "../../../components/image";
import { DeleteRoleManagementAction } from "../../../redux/actions/roleManagement/RoleManagementActions";

interface RoleManagementDeleteConfirmationProps {
  onSubmit: () => void;
  value: any;
  [key: string]: any; // برای سایر props
}

const RoleManagementDeleteConfirmation: React.FC<RoleManagementDeleteConfirmationProps> = (
  props
) => {
  const { onSubmit, value, ...rest } = props;
  const dispatch: any = useDispatch();

  const handleDelete = () => {
    console.log("value",value)
    dispatch(DeleteRoleManagementAction({credentials:value}));
    onSubmit();
  };

  return (
    <ConfirmationCard
      acceptButtonText="بله، حذف"
      rejectButtonText="خیر، انصراف"
      onAccept={handleDelete}
      onReject={onSubmit}
      {...rest}
    >
      <div className="mb-4">
        <Image src="/images/core/trash.svg" className="w-[90px] h-[90px]" />
      </div>
      <Typography tag="h4 font-bold text-lg">
        آیا از حذف این {PublicDictionary.roleManagement} اطمینان دارید؟
      </Typography>
    </ConfirmationCard>
  );
};

export default RoleManagementDeleteConfirmation;
