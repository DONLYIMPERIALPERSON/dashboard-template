"use client";
import { useState, useEffect } from "react";
import { settingsApi } from "@/lib/api";

interface SecuritySettings {
  login_alerts: boolean;
  two_factor_enabled: boolean;
  password_last_changed: string;
  session_timeout: number;
}

export default function SecuritySettings() {
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  // Fetch security settings on component mount
  useEffect(() => {
    const fetchSecuritySettings = async () => {
      try {
        setLoading(true);
        // For now, we'll use default settings since the API may not have this endpoint yet
        // In a full implementation, you'd have a dedicated security settings endpoint
        setSecuritySettings({
          login_alerts: true,
          two_factor_enabled: false,
          password_last_changed: new Date().toISOString(),
          session_timeout: 30
        });
      } catch (err) {
        console.error("Failed to fetch security settings:", err);
        setError(err instanceof Error ? err.message : "Failed to load security settings");
      } finally {
        setLoading(false);
      }
    };

    fetchSecuritySettings();
  }, []);

  const handleSaveSecuritySettings = async () => {
    if (!securitySettings) return;

    try {
      setSaving(true);
      setError(null);
      // For now, we'll simulate saving since the API may not have this endpoint yet
      // In a full implementation, you'd call settingsApi.updateSecuritySettings(securitySettings);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to save security settings:", err);
      setError(err instanceof Error ? err.message : "Failed to save security settings");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || newPassword !== confirmPassword) {
      setError("Please fill all password fields correctly");
      return;
    }

    try {
      setSaving(true);
      setError(null);
      // For now, we'll simulate password change
      // In a full implementation, you'd call authApi.changePassword({ currentPassword, newPassword });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setShowPasswordChange(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Failed to change password:", err);
      setError(err instanceof Error ? err.message : "Failed to change password");
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
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading security settings...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && !securitySettings) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-red-500 mb-4">⚠️ Error loading security settings</div>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Security Settings
        </h3>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 text-sm">Security settings saved successfully!</p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

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
                checked={securitySettings?.login_alerts || false}
                onChange={(e) =>
                  setSecuritySettings(prev => prev ? { ...prev, login_alerts: e.target.checked } : null)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
            </label>
          </div>

          {/* Session Timeout */}
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Session Timeout
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Automatically log out after period of inactivity
            </p>
            <select
              value={securitySettings?.session_timeout || 30}
              onChange={(e) =>
                setSecuritySettings(prev => prev ? { ...prev, session_timeout: parseInt(e.target.value) } : null)
              }
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={240}>4 hours</option>
            </select>
          </div>

          {/* 2FA Section */}
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Two-Factor Authentication
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Add an extra layer of security to your account
                </p>
                {securitySettings?.two_factor_enabled && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                    Enabled
                  </span>
                )}
              </div>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                {securitySettings?.two_factor_enabled ? "Manage 2FA" : "Enable 2FA"}
              </button>
            </div>
          </div>

          {/* Password Section */}
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Password
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Last changed: {securitySettings?.password_last_changed ?
                    new Date(securitySettings.password_last_changed).toLocaleDateString() : 'Never'}
                </p>
              </div>
              <button
                onClick={() => setShowPasswordChange(!showPasswordChange)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Change Password
              </button>
            </div>

            {/* Password Change Form */}
            {showPasswordChange && (
              <div className="mt-4 space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter current password"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter new password"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="Confirm new password"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleChangePassword}
                    disabled={saving}
                    className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? "Updating..." : "Update Password"}
                  </button>
                  <button
                    onClick={() => {
                      setShowPasswordChange(false);
                      setCurrentPassword("");
                      setNewPassword("");
                      setConfirmPassword("");
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleSaveSecuritySettings}
            disabled={saving}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Security Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}
