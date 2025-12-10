"use client";
import { useState } from "react";

export default function ProfileSettings() {
  const [profile, setProfile] = useState({
    businessName: "ABC Corporation",
    businessEmail: "contact@abc.com",
    businessPhone: "+234 123 456 7890",
    website: "https://abc.com",
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Business Profile
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Business Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Business Name
            </label>
            <input
              type="text"
              value={profile.businessName}
              onChange={(e) =>
                setProfile({ ...profile, businessName: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Business Email */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Business Email
            </label>
            <input
              type="email"
              value={profile.businessEmail}
              onChange={(e) =>
                setProfile({ ...profile, businessEmail: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Business Phone */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Business Phone
            </label>
            <input
              type="tel"
              value={profile.businessPhone}
              onChange={(e) =>
                setProfile({ ...profile, businessPhone: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Website */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Website
            </label>
            <input
              type="url"
              value={profile.website}
              onChange={(e) =>
                setProfile({ ...profile, website: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Logo Upload Section */}
        <div className="mt-6 p-4 border border-gray-200 rounded-lg dark:border-gray-700">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
            Business Logo
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Upload your business logo (PNG, JPG, max 2MB)
          </p>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center dark:bg-gray-700">
              <span className="text-gray-400 dark:text-gray-500">Logo</span>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">
                Upload Logo
              </button>
              <button className="px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 dark:border-red-600 dark:hover:bg-red-900">
                Remove Logo
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}
