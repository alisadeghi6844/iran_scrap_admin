import Image from "../../../components/image";
import { CiLogin } from "react-icons/ci";
import Typography from "../../../components/typography/Typography";
import UserIcon from "../../../components/icon/custom/UserIcon";
import JobIcon from "../../../components/icon/custom/JobIcon";
import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch, useSelector } from "react-redux";
import { selectGetCurrentUserData } from "../../../redux/slice/account/AccountSlice";
import { LogOutAction } from "../../../redux/actions/account/AccountActions";

const ProfileIcon = () => {
  const [openProfile, setOpenProfile] = useState<boolean>(false);
  const userData = useSelector(selectGetCurrentUserData);

  const dispatch: any = useDispatch();

  const handleLogoutUser = () => {
    dispatch(LogOutAction());
  };

  return (
    <div className="relative z-20">
      <div
        onClick={() => setOpenProfile((prevState) => !prevState)}
        className="w-[66px] h-[66px] rounded-full p-[2px] border-[3px] border-[#f6f7f8] overflow-hidden cursor-pointer"
      >
        {userData?.image?.length ? (
          <Image
            base64
            src={userData?.image[0]?.file}
            className="w-full h-full rounded-full"
          />
        ) : (
          <>
            {userData?.gender == 0 ? (
              <Image
                src="/images/avatar_9.png"
                className="w-full h-full rounded-full"
              />
            ) : userData?.gender == 1 ? (
              <Image
                src="/images/MuiAvatar.png"
                className="w-full h-full rounded-full"
              />
            ) : (
              <Image
                src="/images/core/placeholder.png"
                className="w-full h-full rounded-full"
              />
            )}
          </>
        )}
      </div>
      {openProfile ? (
        <OutsideClickHandler
          onOutsideClick={() => {
            setOpenProfile(false);
          }}
        >
          <div className="absolute top-full bg-white z-50 right-0 w-[178px] py-2 px-1 shadow-lg rounded-lg font-bold text-gray-600">
            <div className="flex items-center gap-x-2 z-20 py-2 px-4 hover:bg-primary-100 rounded-lg transition-all">
              <UserIcon />
              <Typography>
                {userData?.firstName} {userData?.lastName}
              </Typography>
            </div>
            <div className="flex items-center gap-x-2 z-20 py-2 px-4 hover:bg-primary-100 rounded-lg transition-all my-2">
              <JobIcon />
              <Typography>{userData?.personnelCode}</Typography>
            </div>
            <div
              onClick={handleLogoutUser}
              className="flex cursor-pointer items-center gap-x-2 z-20 py-2 px-4 hover:bg-error-50 text-error rounded-lg transition-all"
            >
              <CiLogin className="text-2xl" />
              <Typography>خروج</Typography>
            </div>
          </div>
        </OutsideClickHandler>
      ) : null}
    </div>
  );
};

export default ProfileIcon;
