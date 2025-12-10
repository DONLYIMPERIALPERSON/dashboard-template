"use client";
import { useState, useEffect } from "react";
import { settingsApi, ProfileSettings as ProfileSettingsType } from "@/lib/api";

export default function ProfileSettings() {
  const [profile, setProfile] = useState<ProfileSettingsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Fetch profile settings on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await settingsApi.getProfileSettings();
        setProfile(data);
      } catch (err) {
        console.error("Failed to fetch profile settings:", err);
        setError(err instanceof Error ? err.message : "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSaveProfile = async () => {
    if (!profile) return;

    try {
      setSaving(true);
      setError(null);
      await settingsApi.updateProfileSettings(profile);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to save profile settings:", err);
      setError(err instanceof Error ? err.message : "Failed to save profile");
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
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading profile settings...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && !profile) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-red-500 mb-4">⚠️ Error loading profile settings</div>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Business Profile
        </h3>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 text-sm">Profile settings saved successfully!</p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              First Name
            </label>
            <input
              type="text"
              value={profile?.first_name || ''}
              onChange={(e) =>
                setProfile(prev => prev ? { ...prev, first_name: e.target.value } : null)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Enter first name"
            />
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Last Name
            </label>
            <input
              type="text"
              value={profile?.last_name || ''}
              onChange={(e) =>
                setProfile(prev => prev ? { ...prev, last_name: e.target.value } : null)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Enter last name"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={profile?.email || ''}
              onChange={(e) =>
                setProfile(prev => prev ? { ...prev, email: e.target.value } : null)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Enter email"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone
            </label>
            <input
              type="tel"
              value={profile?.phone || ''}
              onChange={(e) =>
                setProfile(prev => prev ? { ...prev, phone: e.target.value } : null)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Enter phone number"
            />
          </div>

          {/* Business Description */}
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Business Description
            </label>
            <textarea
              value={profile?.business_description || ''}
              onChange={(e) =>
                setProfile(prev => prev ? { ...prev, business_description: e.target.value } : null)
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Describe your business"
            />
          </div>
        </div>

        {/* Logo Upload Section */}
        <div className="mt-6 p-4 border border-gray-200 rounded-lg dark:border-gray-700">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
            Profile Picture
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Upload your profile picture (PNG, JPG, max 2MB)
          </p>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center dark:bg-gray-700">
              {profile?.avatar ? (
                <img src={profile.avatar} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
              ) : (
                <span className="text-gray-400 dark:text-gray-500 text-lg">
                  {profile?.first_name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">
                Upload Picture
              </button>
              {profile?.avatar && (
                <button className="px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 dark:border-red-600 dark:hover:bg-red-900">
                  Remove Picture
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleSaveProfile}
            disabled={saving}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}
