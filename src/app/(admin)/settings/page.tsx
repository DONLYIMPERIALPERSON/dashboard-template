"use client";
import { useState } from "react";
import { GridIcon, BellIcon, LockIcon, UserIcon, DollarLineIcon, BoxCubeIcon } from "@/icons";
import GeneralSettings from "@/components/settings/GeneralSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import ApiKeysSettings from "@/components/settings/ApiKeysSettings";
import ProfileSettings from "@/components/settings/ProfileSettings";
import SettlementAccountSettings from "@/components/settings/SettlementAccountSettings";
import FeesSettings from "@/components/settings/FeesSettings";
import TeamsSettings from "@/components/settings/TeamsSettings";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General", icon: GridIcon },
    { id: "notifications", label: "Notifications", icon: BellIcon },
    { id: "security", label: "Security", icon: LockIcon },
    { id: "teams", label: "Teams", icon: UserIcon },
    { id: "api-keys", label: "API Keys & Webhooks", icon: UserIcon },
    { id: "profile", label: "Profile", icon: UserIcon },
    { id: "settlement", label: "Settlement Account", icon: BoxCubeIcon },
    { id: "fees", label: "Fees", icon: DollarLineIcon },
  ];

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5 lg:mb-7">
          <GridIcon className="w-8 h-8 text-gray-700 dark:text-gray-300" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Settings
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your account preferences and configurations
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-teal-500 text-teal-600 dark:text-teal-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "general" && <GeneralSettings />}
          {activeTab === "notifications" && <NotificationSettings />}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "teams" && <TeamsSettings />}
          {activeTab === "api-keys" && <ApiKeysSettings />}
          {activeTab === "profile" && <ProfileSettings />}
          {activeTab === "settlement" && <SettlementAccountSettings />}
          {activeTab === "fees" && <FeesSettings />}
        </div>
      </div>
    </div>
  );
}
