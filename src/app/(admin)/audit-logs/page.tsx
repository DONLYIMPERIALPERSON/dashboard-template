"use client";
import { useState } from "react";
import { ListIcon, UserIcon, EyeIcon } from "@/icons";

export default function AuditLogsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAction, setSelectedAction] = useState("all");

  // Mock audit log data
  const auditLogs = [
    {
      id: "log_001",
      timestamp: "2024-12-12T16:45:23Z",
      user: "John Doe",
      email: "john.doe@example.com",
      action: "login",
      resource: "Authentication",
      details: "User logged into the system",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      status: "success"
    },
    {
      id: "log_002",
      timestamp: "2024-12-12T16:30:15Z",
      user: "Jane Smith",
      email: "jane.smith@example.com",
      action: "create_checkout_link",
      resource: "Checkout Link",
      details: "Created payment link for 'Product Purchase' - Amount: ₦150,000",
      ipAddress: "192.168.1.101",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      status: "success"
    },
    {
      id: "log_003",
      timestamp: "2024-12-12T15:22:45Z",
      user: "System",
      email: "system@oyapasteaza.com",
      action: "webhook_received",
      resource: "Webhook",
      details: "Received webhook for transaction TXN_123456 - Status: completed",
      ipAddress: "104.18.32.100",
      userAgent: "Safe Haven Webhook Service",
      status: "success"
    },
    {
      id: "log_004",
      timestamp: "2024-12-12T14:15:30Z",
      user: "Mike Johnson",
      email: "mike.johnson@example.com",
      action: "api_key_created",
      resource: "API Keys",
      details: "Generated new API key for production environment",
      ipAddress: "192.168.1.102",
      userAgent: "Mozilla/5.0 (Linux; Android 10; SM-G975F) AppleWebKit/537.36",
      status: "success"
    },
    {
      id: "log_005",
      timestamp: "2024-12-12T13:45:12Z",
      user: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      action: "compliance_submitted",
      resource: "Compliance",
      details: "Submitted compliance documents for business verification",
      ipAddress: "192.168.1.103",
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15",
      status: "success"
    },
    {
      id: "log_006",
      timestamp: "2024-12-12T12:30:45Z",
      user: "David Brown",
      email: "david.brown@example.com",
      action: "payout_failed",
      resource: "Payout",
      details: "Payout to account 1234567890 failed - Insufficient funds",
      ipAddress: "192.168.1.104",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
      status: "failure"
    },
    {
      id: "log_007",
      timestamp: "2024-12-12T11:20:33Z",
      user: "Lisa Davis",
      email: "lisa.davis@example.com",
      action: "team_member_invited",
      resource: "Team Management",
      details: "Invited new team member: alex.chen@example.com with Finance role",
      ipAddress: "192.168.1.105",
      userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
      status: "success"
    },
    {
      id: "log_008",
      timestamp: "2024-12-12T10:15:22Z",
      user: "Robert Taylor",
      email: "robert.taylor@example.com",
      action: "settings_updated",
      resource: "Settings",
      details: "Updated notification preferences and security settings",
      ipAddress: "192.168.1.106",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0",
      status: "success"
    }
  ];

  const actionTypes = [
    { value: "all", label: "All Actions" },
    { value: "login", label: "Login" },
    { value: "create_checkout_link", label: "Create Checkout Link" },
    { value: "webhook_received", label: "Webhook Received" },
    { value: "api_key_created", label: "API Key Created" },
    { value: "compliance_submitted", label: "Compliance Submitted" },
    { value: "payout_failed", label: "Payout Failed" },
    { value: "team_member_invited", label: "Team Member Invited" },
    { value: "settings_updated", label: "Settings Updated" }
  ];

  const getActionBadgeColor = (action: string) => {
    const colors: { [key: string]: string } = {
      login: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
      create_checkout_link: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
      webhook_received: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300",
      api_key_created: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300",
      compliance_submitted: "bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-300",
      payout_failed: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
      team_member_invited: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300",
      settings_updated: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
    };
    return colors[action] || "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
  };

  const getStatusIcon = (status: string) => {
    return status === "success" ? (
      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
    ) : (
      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
    );
  };

  const formatAction = (action: string) => {
    return action.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = searchTerm === "" ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAction = selectedAction === "all" || log.action === selectedAction;

    return matchesSearch && matchesAction;
  });

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5 lg:mb-7">
          <ListIcon className="w-8 h-8 text-gray-700 dark:text-gray-300" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Audit Logs
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Monitor system activity and user actions
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search logs by user, action, or details..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Action Filter */}
            <div className="sm:w-64">
              <select
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                {actionTypes.map((action) => (
                  <option key={action.value} value={action.value}>
                    {action.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Audit Logs Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                  Timestamp
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                  User
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                  Action
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                  Resource
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                  Details
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                  IP Address
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <td className="py-4 px-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {new Date(log.timestamp).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(log.timestamp).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit"
                      })}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <UserIcon className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {log.user}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {log.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getActionBadgeColor(log.action)}`}>
                      {formatAction(log.action)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {log.resource}
                    </span>
                  </td>
                  <td className="py-4 px-4 max-w-xs">
                    <div className="text-sm text-gray-600 dark:text-gray-400 truncate" title={log.details}>
                      {log.details}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                      {log.ipAddress}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(log.status)}
                      <span className={`text-xs font-medium ${
                        log.status === "success"
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}>
                        {log.status === "success" ? "Success" : "Failed"}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No Results */}
        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <EyeIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No audit logs found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Pagination Info */}
        <div className="mt-6 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div>
            Showing {filteredLogs.length} of {auditLogs.length} audit logs
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">
              Previous
            </button>
            <span className="px-3 py-1 bg-teal-600 text-white rounded">1</span>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
