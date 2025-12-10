"use client";
import { useState } from "react";

export default function SecuritySettings() {
  const [loginAlerts, setLoginAlerts] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Security Settings
        </h3>

        <div className="space-y-4">
          {/* Login Alerts */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Login Alerts
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Receive notifications when your account is accessed from new devices
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={loginAlerts}
                onChange={(e) => setLoginAlerts(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
            </label>
          </div>

          {/* 2FA Section */}
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Two-Factor Authentication
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Add an extra layer of security to your account
            </p>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
              Configure 2FA
            </button>
          </div>
        </div>

        <div className="mt-6">
          <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
            Save Security Settings
          </button>
        </div>
      </div>
    </div>
  );
}
