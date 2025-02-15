import React from 'react';
import Image from "../../components/image";
import Button from "../../components/button";

const ChatBotCard = () => {
    return (
        <div className="rounded-xl h-[280px] w-full relative bg-primary-100 grid grid-cols-12">
            <div className="col-span-6 flex justify-end flex-col p-6">
                <div className="font-bold text-2xl text-primary-900">
                    پیام رسان و مدیریت وظایف
                </div>
                <div className="mt-4 text-primary-800 font-bold">
                    نرم افزار یکپارچه مدیریت وظایف و پیام رسان ویرا
                </div>
                <Button size="lg" className="mt-10 w-[130px]">کلیک کنید</Button>
            </div>
            <div className="col-span-6 flex w-full h-full items-center justify-center">
                <Image src="/images/core/Vactor.png" alt="chat bot"/>
            </div>
        </div>
    );
};

export default ChatBotCard;
