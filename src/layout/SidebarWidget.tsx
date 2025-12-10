import React from "react";

export default function SidebarWidget() {
  return (
    <div
      className={`
        mx-auto mb-10 mt-16 w-full max-w-60 rounded-2xl bg-gray-50 px-4 py-5 text-center dark:bg-white/[0.03]`}
    >
      <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
        Ready to start integrating?
      </h3>
      <p className="mb-4 text-gray-500 text-theme-sm dark:text-gray-400">
        Read our easy and properly documented APIs.
      </p>
      <a
        href="https://oyapasteaza.com/docs"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-[#26A69A] text-theme-sm hover:bg-[#26A69A]/90"
      >
        Read Documentation
      </a>
    </div>
  );
}
