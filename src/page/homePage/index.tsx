import React from 'react';
import LandingPageCard from "../../container/organism/profile/LandingProfileCard";
import ChatBotCard from "../../container/organism/ChatBotCard";
import CourseCalender from "../../container/features/dashboard/CourseCalender";

const HomePage = () => {
    return (
        <div className="p-8">
            <div className="grid grid-cols-12 gap-x-6">
                <div className="col-span-3"><LandingPageCard/></div>
                <div className="col-span-5"><ChatBotCard/></div>
                <div className="col-span-4">

                        <CourseCalender/>

                </div>
            </div>
        </div>
    );
};

export default HomePage;
