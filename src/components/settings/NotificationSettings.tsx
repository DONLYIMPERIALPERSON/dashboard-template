"use client";
import { useState } from "react";

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailOnDeposit: true,
    emailOnPayout: true,
    emailOnApiError: false,
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Notification Preferences
        </h3>

        <div className="space-y-4">
          {/* Email on Deposit */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Email on Deposit
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Receive email notifications when funds are deposited
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailOnDeposit}
                onChange={(e) =>
                  setSettings({ ...settings, emailOnDeposit: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
            </label>
          </div>

          {/* Email on Payout */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Email on Payout
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Receive email notifications when payouts are processed
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailOnPayout}
                onChange={(e) =>
                  setSettings({ ...settings, emailOnPayout: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
            </label>
          </div>

          {/* Email on API Error */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Email on API Error
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Receive email notifications when API errors occur
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailOnApiError}
                onChange={(e) =>
                  setSettings({ ...settings, emailOnApiError: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
            </label>
          </div>
        </div>

        <div className="mt-6">
          <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
