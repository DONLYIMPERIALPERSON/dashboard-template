"use client";
import { useState } from "react";
import { UserIcon, MailIcon, PlusIcon, CheckCircleIcon, LockIcon } from "@/icons";

export default function TeamsSettings() {
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteFirstName, setInviteFirstName] = useState("");
  const [inviteLastName, setInviteLastName] = useState("");
  const [inviteRole, setInviteRole] = useState("support");

  // Mock team data - in real app, this would come from API
  const teamMembers = [
    {
      id: 1,
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      role: "owner",
      invitedAt: "2024-01-15T10:30:00Z",
      acceptedAt: "2024-01-15T10:35:00Z",
      isActive: true,
      status: "active"
    },
    {
      id: 2,
      email: "jane.smith@example.com",
      firstName: "Jane",
      lastName: "Smith",
      role: "admin",
      invitedAt: "2024-01-20T14:20:00Z",
      acceptedAt: "2024-01-20T14:25:00Z",
      isActive: true,
      status: "active"
    },
    {
      id: 3,
      email: "mike.johnson@example.com",
      firstName: "Mike",
      lastName: "Johnson",
      role: "finance",
      invitedAt: "2024-01-25T09:15:00Z",
      acceptedAt: null,
      isActive: true,
      status: "pending"
    }
  ];

  const roles = [
    {
      value: "support",
      label: "Support",
      description: "View business profile, transactions (read-only), status"
    },
    {
      value: "developer",
      label: "Developer",
      description: "Manage API keys, webhooks, logs (no payouts)"
    },
    {
      value: "finance",
      label: "Finance",
      description: "View wallets, approve/create payouts, view collections & transactions"
    },
    {
      value: "admin",
      label: "Admin",
      description: "Manage KYC, API keys, wallets, payments, webhooks, invite team"
    }
  ];

  const handleInviteMember = async () => {
    if (!inviteEmail) {
      alert("Please enter an email address");
      return;
    }

    // In real app, this would call the API
    console.log("Inviting team member:", {
      email: inviteEmail,
      firstName: inviteFirstName,
      lastName: inviteLastName,
      role: inviteRole
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    alert(`Invitation sent to ${inviteEmail}`);
    setShowInviteForm(false);
    setInviteEmail("");
    setInviteFirstName("");
    setInviteLastName("");
    setInviteRole("support");
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "owner":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300";
      case "admin":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      case "finance":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
      case "developer":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "support":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "owner":
        return "Owner";
      case "admin":
        return "Admin";
      case "finance":
        return "Finance";
      case "developer":
        return "Developer";
      case "support":
        return "Support";
      default:
        return role;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircleIcon className="w-4 h-4 text-green-600" />;
      case "pending":
        return <LockIcon className="w-4 h-4 text-yellow-600" />;
      default:
        return <LockIcon className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active";
      case "pending":
        return "Pending";
      default:
        return "Inactive";
    }
  };

  return (
    <div className="space-y-6">
      {/* Team Overview */}
      <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Team Management
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your team members and their access permissions
            </p>
          </div>
          <button
            onClick={() => setShowInviteForm(true)}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            Invite Member
          </button>
        </div>
      </div>

      {/* Team Members List */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-white">
          Team Members ({teamMembers.length})
        </h4>

        {teamMembers.map((member) => (
          <div key={member.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">
                    {member.firstName} {member.lastName}
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {member.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(member.role)}`}>
                  {getRoleLabel(member.role)}
                </span>
                <div className="flex items-center gap-1">
                  {getStatusIcon(member.status)}
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {getStatusText(member.status)}
                  </span>
                </div>
                <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                  ⋯
                </button>
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              Invited: {new Date(member.invitedAt).toLocaleDateString()}
              {member.acceptedAt && (
                <> • Joined: {new Date(member.acceptedAt).toLocaleDateString()}</>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Invite Member Modal */}
      {showInviteForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Invite Team Member
              </h3>
              <button
                onClick={() => setShowInviteForm(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="team@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={inviteFirstName}
                    onChange={(e) => setInviteFirstName(e.target.value)}
                    placeholder="John"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={inviteLastName}
                    onChange={(e) => setInviteLastName(e.target.value)}
                    placeholder="Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {roles.find(r => r.value === inviteRole)?.description}
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleInviteMember}
                className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 flex items-center justify-center gap-2"
              >
                <MailIcon className="w-4 h-4" />
                Send Invitation
              </button>
              <button
                onClick={() => setShowInviteForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Role Permissions Info */}
      <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <h5 className="font-medium text-yellow-800 dark:text-yellow-200 mb-3">
          Team Roles & Permissions
        </h5>
        <div className="space-y-2 text-sm text-yellow-700 dark:text-yellow-300">
          <div><strong>Owner:</strong> Full access to everything, manage team & roles, invite others</div>
          <div><strong>Admin:</strong> Manage KYC, API keys, wallets, payments, webhooks, invite team</div>
          <div><strong>Finance:</strong> View wallets, approve/create payouts, view collections & transactions</div>
          <div><strong>Developer:</strong> Manage API keys, webhooks, logs (no payouts)</div>
          <div><strong>Support:</strong> View business profile, transactions (read-only), status</div>
        </div>
      </div>
    </div>
  );
}
