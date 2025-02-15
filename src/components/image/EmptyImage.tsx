import React from "react";
import Image from "./index";
import Typography from "../typography/Typography";

const EmptyImage = () => {
  return (
    <div className="flex w-full flex-col justify-center items-center pb-4">
      <Image src="/images/core/FolderNotFound.png" className="w-[360px] -mt-12"/>
      <Typography className="text-2xl font-bold -mt-4">موردی یافت نشد !</Typography>
    </div>
  );
};

export default EmptyImage;
