import React from "react";

interface StatisticCardProps {
  title: string;
  icon: React.ReactNode;
  data?: { _id: string | null; count: number }[] | null;
  total?: number;
  loading: boolean;
  color?: "orange" | "green" | "red" | "amber";
  idToLabel?: (id: string | null) => string;
}

const gradientClasses = {
  orange: "from-secondary-400 to-secondary-600",
  green: "from-success-400 to-success-600",
  red: "from-error-400 to-error-600",
  amber: "from-warning-400 to-warning-600",
};

const StatisticCard: React.FC<StatisticCardProps> = ({ 
  title, 
  icon,
  data, 
  total, 
  loading, 
  color = "orange",
  idToLabel 
}) => {
  const gradient = gradientClasses[color] || gradientClasses.orange;

  const renderContent = () => {
    if (loading) {
      return <div className="h-10 bg-white/30 rounded w-24 animate-pulse"></div>;
    }

    if (total !== undefined) {
      return <p className="font-bold text-4xl text-white">{total ?? 0}</p>;
    }

    if (data && data.length > 0) {
      return (
        <div className="flex items-center gap-x-6">
          {data.map((item, index) => (
            <div key={`${item._id}-${index}`} className="text-center">
              <p className="text-sm font-medium text-white/80">
                {idToLabel ? idToLabel(item._id) : (item._id ?? 'نامشخص')}
              </p>
              <p className="font-bold text-3xl text-white mt-1">
                {item.count ?? 0}
              </p>
            </div>
          ))}
        </div>
      );
    }

    return <p className="text-white/70 text-sm">داده‌ای وجود ندارد</p>;
  };

  return (
    <div className={`relative p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br ${gradient} overflow-hidden`}>
      <div className="relative z-10">
        <h3 className="font-semibold text-lg text-white/90">{title}</h3>
        <div className="mt-4 min-h-[52px] flex items-center">
          {renderContent()}
        </div>
      </div>
      <div className="absolute -bottom-4 -right-4 text-8xl text-white/10 transform rotate-12">
        {icon}
      </div>
    </div>
  );
};

export default StatisticCard;
