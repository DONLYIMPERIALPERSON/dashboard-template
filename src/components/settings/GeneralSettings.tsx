"use client";
import { useState, useEffect } from "react";
import { settingsApi, GeneralSettings as GeneralSettingsType } from "@/lib/api";

export default function GeneralSettings() {
  const [settings, setSettings] = useState<GeneralSettingsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [theme, setTheme] = useState("light");

  // Fetch general settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const data = await settingsApi.getGeneralSettings();
        setSettings(data);
      } catch (err) {
        console.error("Failed to fetch general settings:", err);
        setError(err instanceof Error ? err.message : "Failed to load settings");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();

    // Get current theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const currentTheme = savedTheme || systemTheme;
    setTheme(currentTheme);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleSaveSettings = async () => {
    if (!settings) return;

    try {
      setSaving(true);
      setError(null);
      await settingsApi.updateGeneralSettings(settings);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to save settings:", err);
      setError(err instanceof Error ? err.message : "Failed to save settings");
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
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading settings...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && !settings) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-red-500 mb-4">⚠️ Error loading settings</div>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          General Settings
        </h3>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 text-sm">Settings saved successfully!</p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Business Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Business Name
            </label>
            <input
              type="text"
              value={settings?.business_name || ''}
              onChange={(e) => setSettings(prev => prev ? {...prev, business_name: e.target.value} : null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Enter business name"
            />
          </div>

          {/* Business Email */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Business Email
            </label>
            <input
              type="email"
              value={settings?.business_email || ''}
              onChange={(e) => setSettings(prev => prev ? {...prev, business_email: e.target.value} : null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Enter business email"
            />
          </div>

          {/* Business Phone */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Business Phone
            </label>
            <input
              type="tel"
              value={settings?.business_phone || ''}
              onChange={(e) => setSettings(prev => prev ? {...prev, business_phone: e.target.value} : null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Enter business phone"
            />
          </div>

          {/* Business Address */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Business Address
            </label>
            <input
              type="text"
              value={settings?.business_address || ''}
              onChange={(e) => setSettings(prev => prev ? {...prev, business_address: e.target.value} : null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Enter business address"
            />
          </div>

          {/* Language */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Language
            </label>
            <select
              value={settings?.language || 'en'}
              onChange={(e) => setSettings(prev => prev ? {...prev, language: e.target.value} : null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
            </select>
          </div>

          {/* Timezone (Read-only) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Timezone
            </label>
            <input
              type="text"
              value={settings?.timezone || 'Africa/Lagos'}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Timezone is automatically set based on your location
            </p>
          </div>

          {/* Currency */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Currency
            </label>
            <select
              value={settings?.currency || 'NGN'}
              onChange={(e) => setSettings(prev => prev ? {...prev, currency: e.target.value} : null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="NGN">Nigerian Naira (₦)</option>
              <option value="USD">US Dollar ($)</option>
              <option value="EUR">Euro (€)</option>
              <option value="GBP">British Pound (£)</option>
            </select>
          </div>

          {/* Theme Toggle */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Theme
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={theme === "light"}
                  onChange={(e) => handleThemeChange(e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Light</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={theme === "dark"}
                  onChange={(e) => handleThemeChange(e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Dark</span>
              </label>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Choose your preferred theme for the application
            </p>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleSaveSettings}
            disabled={saving}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
