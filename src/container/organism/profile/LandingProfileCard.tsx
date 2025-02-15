import React from 'react';
import Typography from "../../../components/typography/Typography";
import {Link} from "react-router-dom";
import { FaAnglesLeft } from "react-icons/fa6";

const LandingPageCard = () => {
    return (
        <div className="rounded-xl h-[280px] w-full profile-card-custom relative">
            <div
                style={{
                    background: `
            linear-gradient(
                180deg,
                rgba(0, 0, 0, 0) 0%,
                rgba(0, 0, 0, 0.3) 30%,
                rgba(0, 0, 0, 0.6) 60%,
                rgba(0, 0, 0, 1) 100%
            )
        `,
                }}
                className="absolute bottom-0 right-0 w-full z-10 h-[135px] rounded-b-xl"
            />

            <div className="w-full absolute h-full rounded-xl bg-black opacity-30 z-0"/>
            <div className="relative z-20">
                <Typography className="font-bold text-white text-[28px] pt-6 pr-8">
                    سحر کریمی
                </Typography>
                <div className="flex justify-center">
                <Typography className="font-bold text-white text-[40px] pt-6">
                   خوش آمدید !
                </Typography>
                </div>
            </div>

            <Link to="/" className="absolute bottom-4 left-4 z-20 flex items-center gap-x-2 group">
                <Typography className="font-bold text-white">مشاهده پروفایل</Typography>
                <FaAnglesLeft className="text-white text-xl group-hover:-translate-x-2 transition-all"/>
            </Link>

        </div>
    );
};

export default LandingPageCard;
