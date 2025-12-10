import React from "react";

const ChartTab: React.FC = () => {
  return (
    <div className="flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
      <button className="px-3 py-2 font-medium w-full rounded-md text-theme-sm shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800">
        Daily
      </button>
    </div>
  );
};

export default ChartTab;
