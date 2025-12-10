"use client";
import { useState, useEffect } from "react";
import { settingsApi } from "@/lib/api";

interface NotificationSettings {
  email_on_deposit: boolean;
  email_on_payout: boolean;
  email_on_api_error: boolean;
  email_on_transaction: boolean;
  sms_on_deposit: boolean;
  sms_on_payout: boolean;
  push_on_deposit: boolean;
  push_on_payout: boolean;
}

export default function NotificationSettings() {
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Fetch notification settings on component mount
  useEffect(() => {
    const fetchNotificationSettings = async () => {
      try {
        setLoading(true);
        // For now, we'll use default settings since the API may not have this endpoint yet
        // In a full implementation, you'd have a dedicated notifications settings endpoint
        setNotificationSettings({
          email_on_deposit: true,
          email_on_payout: true,
          email_on_api_error: false,
          email_on_transaction: true,
          sms_on_deposit: false,
          sms_on_payout: false,
          push_on_deposit: true,
          push_on_payout: true
        });
      } catch (err) {
        console.error("Failed to fetch notification settings:", err);
        setError(err instanceof Error ? err.message : "Failed to load notification settings");
      } finally {
        setLoading(false);
      }
    };

    fetchNotificationSettings();
  }, []);

  const handleSaveNotificationSettings = async () => {
    if (!notificationSettings) return;

    try {
      setSaving(true);
      setError(null);
      // For now, we'll simulate saving since the API may not have this endpoint yet
      // In a full implementation, you'd call settingsApi.updateNotificationSettings(notificationSettings);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to save notification settings:", err);
      setError(err instanceof Error ? err.message : "Failed to save notification settings");
    } finally {
      setSaving(false);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading notification settings...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && !notificationSettings) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-red-500 mb-4">⚠️ Error loading notification settings</div>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Notification Preferences
        </h3>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 text-sm">Notification settings saved successfully!</p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Email Notifications */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
              📧 Email Notifications
            </h4>

            {/* Email on Deposit */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg dark:border-gray-700">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">
                  Deposit Notifications
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive email notifications when funds are deposited
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings?.email_on_deposit || false}
                  onChange={(e) =>
                    setNotificationSettings(prev => prev ? { ...prev, email_on_deposit: e.target.checked } : null)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
              </label>
            </div>

            {/* Email on Payout */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg dark:border-gray-700">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">
                  Payout Notifications
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive email notifications when payouts are processed
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings?.email_on_payout || false}
                  onChange={(e) =>
                    setNotificationSettings(prev => prev ? { ...prev, email_on_payout: e.target.checked } : null)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
              </label>
            </div>

            {/* Email on Transaction */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg dark:border-gray-700">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">
                  Transaction Notifications
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive email notifications for all transaction activities
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings?.email_on_transaction || false}
                  onChange={(e) =>
                    setNotificationSettings(prev => prev ? { ...prev, email_on_transaction: e.target.checked } : null)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
              </label>
            </div>

            {/* Email on API Error */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg dark:border-gray-700">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">
                  API Error Notifications
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive email notifications when API errors occur
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings?.email_on_api_error || false}
                  onChange={(e) =>
                    setNotificationSettings(prev => prev ? { ...prev, email_on_api_error: e.target.checked } : null)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
              </label>
            </div>
          </div>

          {/* SMS Notifications */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
              📱 SMS Notifications
            </h4>

            {/* SMS on Deposit */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg dark:border-gray-700">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">
                  Deposit SMS
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive SMS notifications for deposits
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings?.sms_on_deposit || false}
                  onChange={(e) =>
                    setNotificationSettings(prev => prev ? { ...prev, sms_on_deposit: e.target.checked } : null)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
              </label>
            </div>

            {/* SMS on Payout */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg dark:border-gray-700">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">
                  Payout SMS
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive SMS notifications for payouts
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings?.sms_on_payout || false}
                  onChange={(e) =>
                    setNotificationSettings(prev => prev ? { ...prev, sms_on_payout: e.target.checked } : null)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
              </label>
            </div>
          </div>

          {/* Push Notifications */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
              🔔 Push Notifications
            </h4>

            {/* Push on Deposit */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg dark:border-gray-700">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">
                  Deposit Alerts
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive push notifications for deposits
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings?.push_on_deposit || false}
                  onChange={(e) =>
                    setNotificationSettings(prev => prev ? { ...prev, push_on_deposit: e.target.checked } : null)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
              </label>
            </div>

            {/* Push on Payout */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg dark:border-gray-700">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">
                  Payout Alerts
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive push notifications for payouts
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings?.push_on_payout || false}
                  onChange={(e) =>
                    setNotificationSettings(prev => prev ? { ...prev, push_on_payout: e.target.checked } : null)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleSaveNotificationSettings}
            disabled={saving}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Preferences"}
          </button>
        </div>
      </div>
    </div>
  );
}
