import React from "react";

export type AllRequestsTabKey =
  | "new"
  | "processing"
  | "closed"
  | "financial"
  | "delivery";

export interface AllRequestsTab {
  key: AllRequestsTabKey;
  label: string;
}

interface AllRequestsTabsProps {
  tabs: AllRequestsTab[];
  activeTab: AllRequestsTabKey;
  onTabClick: (key: AllRequestsTabKey) => void;
}

const AllRequestsTabs: React.FC<AllRequestsTabsProps> = (props) => {
  const { tabs, activeTab, onTabClick } = props;

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        درخواست های مناقصه
      </h1>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 rtl:space-x-reverse">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onTabClick(tab.key)}
              className={`py-2 px-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab.key
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default AllRequestsTabs;


