"use client";
import { useState } from "react";
import { GridIcon, PlusIcon, EyeIcon, CheckCircleIcon } from "@/icons";

export default function CheckoutLinkPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Mock data for existing links
  const existingLinks = [
    {
      id: "link_001",
      title: "Website Subscription",
      amount: 25000,
      currency: "NGN",
      status: "active",
      createdAt: "2024-01-15T10:30:00Z",
      paymentUrl: "https://pay.example.com/link_001",
      transactions: 12
    },
    {
      id: "link_002",
      title: "Product Purchase",
      amount: 150000,
      currency: "NGN",
      status: "active",
      createdAt: "2024-01-20T14:20:00Z",
      paymentUrl: "https://pay.example.com/link_002",
      transactions: 8
    },
    {
      id: "link_003",
      title: "Service Fee",
      amount: 50000,
      currency: "NGN",
      status: "inactive",
      createdAt: "2024-01-25T09:15:00Z",
      paymentUrl: "https://pay.example.com/link_003",
      transactions: 3
    }
  ];

  // Mock data for recent transactions
  const recentTransactions = [
    {
      id: "txn_001",
      linkId: "link_001",
      linkTitle: "Website Subscription",
      amount: 25000,
      currency: "NGN",
      customerEmail: "john@example.com",
      status: "completed",
      createdAt: "2024-01-28T16:45:00Z"
    },
    {
      id: "txn_002",
      linkId: "link_002",
      linkTitle: "Product Purchase",
      amount: 150000,
      currency: "NGN",
      customerEmail: "jane@example.com",
      status: "completed",
      createdAt: "2024-01-27T11:30:00Z"
    },
    {
      id: "txn_003",
      linkId: "link_001",
      linkTitle: "Website Subscription",
      amount: 25000,
      currency: "NGN",
      customerEmail: "mike@example.com",
      status: "pending",
      createdAt: "2024-01-26T14:20:00Z"
    }
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: GridIcon },
    { id: "create", label: "Create New Link", icon: PlusIcon },
    { id: "existing", label: "Existing Links", icon: EyeIcon },
    { id: "transactions", label: "Recent Transactions", icon: CheckCircleIcon }
  ];

  const handleCreateLink = async (formData: any) => {
    // In real app, this would call the API
    console.log("Creating checkout link:", formData);
    alert("Checkout link created successfully!");
    setShowCreateForm(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency === 'NGN' ? 'NGN' : 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5 lg:mb-7">
          <GridIcon className="w-8 h-8 text-gray-700 dark:text-gray-300" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Checkout Link
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Create payment links for your customers
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
          {/* Overview */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Unsettled Balance */}
              <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Unsettled Balance
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Funds awaiting settlement from checkout link payments
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                      ₦425,000
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Available for settlement
                    </div>
                  </div>
                </div>
              </div>

              {/* Settled Balance List */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Recent Settlements
                  </h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    5 settlements
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      id: "STL_001",
                      amount: 150000,
                      currency: "NGN",
                      date: "2024-12-11T14:30:00Z",
                      status: "completed",
                      reference: "SET_2024_001"
                    },
                    {
                      id: "STL_002",
                      amount: 250000,
                      currency: "NGN",
                      date: "2024-12-10T16:45:00Z",
                      status: "completed",
                      reference: "SET_2024_002"
                    },
                    {
                      id: "STL_003",
                      amount: 185000,
                      currency: "NGN",
                      date: "2024-12-09T11:20:00Z",
                      status: "completed",
                      reference: "SET_2024_003"
                    },
                    {
                      id: "STL_004",
                      amount: 320000,
                      currency: "NGN",
                      date: "2024-12-08T13:15:00Z",
                      status: "completed",
                      reference: "SET_2024_004"
                    },
                    {
                      id: "STL_005",
                      amount: 98000,
                      currency: "NGN",
                      date: "2024-12-07T09:45:00Z",
                      status: "completed",
                      reference: "SET_2024_005"
                    }
                  ].map((settlement) => (
                    <div key={settlement.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                            <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white">
                              Settlement {settlement.id}
                            </h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Reference: {settlement.reference}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                            {formatCurrency(settlement.amount, settlement.currency)}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(settlement.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Create New Link */}
          {activeTab === "create" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Create Payment Link
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Generate a secure payment link for your customers
                  </p>
                </div>
                <button
                  onClick={() => setShowCreateForm(!showCreateForm)}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center gap-2"
                >
                  <PlusIcon className="w-4 h-4" />
                  Create Link
                </button>
              </div>

              {showCreateForm && (
                <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-4">
                    Link Details
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Title/Description *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Product Purchase, Service Fee"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Amount *
                      </label>
                      <input
                        type="number"
                        placeholder="0.00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Currency
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                        <option>NGN</option>
                        <option>USD</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Customer Email (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="customer@example.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Success URL (Optional)
                      </label>
                      <input
                        type="url"
                        placeholder="https://your-site.com/success"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => handleCreateLink({})}
                      className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                    >
                      Create Payment Link
                    </button>
                    <button
                      onClick={() => setShowCreateForm(false)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Existing Links */}
          {activeTab === "existing" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Existing Payment Links
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Manage your active and inactive payment links
                  </p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {existingLinks.length} links
                </span>
              </div>

              {existingLinks.map((link) => (
                <div key={link.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h5 className="font-medium text-gray-900 dark:text-white">
                          {link.title}
                        </h5>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(link.status)}`}>
                          {link.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>Amount: {formatCurrency(link.amount, link.currency)}</span>
                        <span>•</span>
                        <span>Transactions: {link.transactions}</span>
                        <span>•</span>
                        <span>Created: {new Date(link.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="px-3 py-1 text-sm text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300">
                        Copy Link
                      </button>
                      <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                        ⋯
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Recent Transactions */}
          {activeTab === "transactions" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Recent Transactions
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    View payments made through your checkout links
                  </p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {recentTransactions.length} transactions
                </span>
              </div>

              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h5 className="font-medium text-gray-900 dark:text-white">
                          {transaction.linkTitle}
                        </h5>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>Amount: {formatCurrency(transaction.amount, transaction.currency)}</span>
                        <span>•</span>
                        <span>Customer: {transaction.customerEmail}</span>
                        <span>•</span>
                        <span>Date: {new Date(transaction.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatCurrency(transaction.amount, transaction.currency)}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(transaction.createdAt).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
