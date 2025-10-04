import React from "react";
import Typography from "../typography/Typography";
import { FiFileText, FiUsers, FiCheckCircle, FiClock } from "react-icons/fi";

interface SurveyStatsProps {
  totalSurveys: number;
  publishedSurveys: number;
  totalResponses: number;
  completedResponses: number;
}

const SurveyStats: React.FC<SurveyStatsProps> = ({
  totalSurveys,
  publishedSurveys,
  totalResponses,
  completedResponses,
}) => {
  const stats = [
    {
      title: "کل نظرسنجی‌ها",
      value: totalSurveys,
      icon: <FiFileText className="w-4 h-4" />,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "منتشر شده",
      value: publishedSurveys,
      icon: <FiCheckCircle className="w-4 h-4" />,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "کل پاسخ‌ها",
      value: totalResponses,
      icon: <FiUsers className="w-4 h-4" />,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "تکمیل شده",
      value: completedResponses,
      icon: <FiClock className="w-4 h-4" />,
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} rounded-lg p-3 border border-gray-200`}
        >
          <div className="flex items-center justify-between">
            <div>
              <Typography className="text-xs font-medium text-gray-600 mb-1">
                {stat.title}
              </Typography>
              <Typography className={`text-lg font-bold ${stat.textColor}`}>
                {stat.value.toLocaleString("fa-IR")}
              </Typography>
            </div>
            <div className={`${stat.color} p-2 rounded-lg text-white`}>
              <div className="w-4 h-4">
                {stat.icon}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SurveyStats;