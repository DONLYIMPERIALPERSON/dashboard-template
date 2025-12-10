"use client";
import { useState } from "react";
import { GridIcon, BoxCubeIcon, UserCircleIcon } from "@/icons";

export default function StaticVAPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const staticVirtualAccounts = [
    {
      id: "VA_STATIC_001",
      accountNumber: "1234567890",
      accountName: "SafeHaven Business VA",
      bankName: "GTBank",
      balance: "150,000.00",
      status: "active",
      createdAt: "2024-01-15",
      totalCollections: 250000.00,
      transactionCount: 89,
    },
    {
      id: "VA_STATIC_002",
      accountNumber: "2345678901",
      accountName: "Business Collection VA",
      bankName: "First Bank",
      balance: "85,500.00",
      status: "active",
      createdAt: "2024-02-20",
      totalCollections: 175000.00,
      transactionCount: 67,
    },
    {
      id: "VA_STATIC_003",
      accountNumber: "3456789012",
      accountName: "Enterprise VA",
      bankName: "Zenith Bank",
      balance: "200,750.00",
      status: "active",
      createdAt: "2024-03-10",
      totalCollections: 320000.00,
      transactionCount: 124,
    },
    {
      id: "VA_STATIC_004",
      accountNumber: "4567890123",
      accountName: "Legacy VA",
      bankName: "Access Bank",
      balance: "45,250.00",
      status: "inactive",
      createdAt: "2024-04-05",
      totalCollections: 95000.00,
      transactionCount: 38,
    },
    {
      id: "VA_STATIC_005",
      accountNumber: "5678901234",
      accountName: "Premium VA",
      bankName: "UBA",
      balance: "300,000.00",
      status: "active",
      createdAt: "2024-05-12",
      totalCollections: 450000.00,
      transactionCount: 156,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-100 dark:bg-green-900/20";
      case "inactive":
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const handleCopyAccount = (accountNumber: string) => {
    navigator.clipboard.writeText(accountNumber);
    alert("Account number copied to clipboard!");
  };

  const totalActiveAccounts = staticVirtualAccounts.filter(account => account.status === "active").length;
  const totalBalance = staticVirtualAccounts
    .filter(account => account.status === "active")
    .reduce((sum, account) => sum + parseFloat(account.balance.replace(',', '')), 0);
  const totalCollections = staticVirtualAccounts.reduce((sum, account) => sum + account.totalCollections, 0);

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5 lg:mb-7">
          <BoxCubeIcon className="w-8 h-8 text-gray-700 dark:text-gray-300" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Static Virtual Account Collections
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your static virtual account numbers for collections
            </p>
          </div>
        </div>

        {/* Subscribe Button */}
        <div className="mb-6">
          <button className="w-full px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 text-lg font-medium">
            Subscribe to Virtual Account Service
          </button>
        </div>

        {/* Stats Cards */}
        <div className="mb-8">
          <div className="grid grid-cols-1 gap-6">
            {/* Active Accounts */}
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                    Active Accounts
                  </p>
                  <p className="text-2xl font-bold text-blue-800 dark:text-blue-200 mt-1">
                    {totalActiveAccounts}
                  </p>
                </div>
                <div className="p-3 bg-blue-200 dark:bg-blue-800 rounded-full">
                  <BoxCubeIcon className="w-6 h-6 text-blue-700 dark:text-blue-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Static Virtual Accounts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-medium text-gray-900 dark:text-white">
              Static Virtual Accounts
            </h4>
            <div className="flex gap-3">
              <button className="px-4 py-2 text-sm bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
                Subscribe
              </button>
              <button className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                Add New Account
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {staticVirtualAccounts.map((account) => (
              <div
                key={account.id}
                className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                      <BoxCubeIcon className="w-6 h-6 text-teal-700 dark:text-teal-300" />
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white">
                        {account.id}
                      </h5>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        account.status
                      )}`}>
                        {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                      </span>
                    </div>
                  </div>

                </div>

                <div className="space-y-3">
                  {/* Account Details */}
                  <div className="grid grid-cols-1 gap-3">
                    <div className="p-3 bg-white dark:bg-gray-700 rounded border">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Account Number:
                        </span>
                        <button
                          onClick={() => handleCopyAccount(account.accountNumber)}
                          className="text-xs text-teal-600 hover:text-teal-700 dark:text-teal-400"
                        >
                          Copy
                        </button>
                      </div>
                      <p className="font-mono text-lg text-gray-900 dark:text-white">
                        {account.accountNumber}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-white dark:bg-gray-700 rounded border">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Account Name</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {account.accountName}
                        </p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-700 rounded border">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Bank</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {account.bankName}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white dark:bg-gray-700 rounded border">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Transactions</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {account.transactionCount}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-white dark:bg-gray-700 rounded border">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Total Collected</p>
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">
                        {formatCurrency(account.totalCollections)}
                      </p>
                    </div>
                  </div>

                  {/* Created Date */}
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Created: {new Date(account.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
