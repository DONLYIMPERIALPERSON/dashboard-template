"use client";
import { useState } from "react";
import { BoxCubeIcon } from "@/icons";

export default function DisbursementsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const recentTransactions = [
    {
      id: "DISB_001",
      type: "debit",
      amount: 15000.00,
      method: "Disbursement API",
      description: "Payment to vendor - Invoice #12345",
      status: "completed",
      date: "2024-12-12T14:30:00Z",
    },
    {
      id: "DISB_002",
      type: "debit",
      amount: 25000.00,
      method: "Disbursement API",
      description: "Bulk payment - December salaries",
      status: "completed",
      date: "2024-12-12T13:15:00Z",
    },
    {
      id: "DISB_003",
      type: "debit",
      amount: 8500.00,
      method: "Disbursement API",
      description: "Supplier payment - Raw materials",
      status: "pending",
      date: "2024-12-12T11:45:00Z",
    },
    {
      id: "DISB_004",
      type: "debit",
      amount: 32000.00,
      method: "Disbursement API",
      description: "Freelancer payment - Project delivery",
      status: "completed",
      date: "2024-12-11T16:20:00Z",
    },
    {
      id: "DISB_005",
      type: "debit",
      amount: 12000.00,
      method: "Disbursement API",
      description: "Commission payout - Affiliate program",
      status: "completed",
      date: "2024-12-11T14:10:00Z",
    },
    {
      id: "DISB_006",
      type: "debit",
      amount: 5000.00,
      method: "Disbursement API",
      description: "Utility bill payment",
      status: "failed",
      date: "2024-12-11T12:30:00Z",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100 dark:bg-green-900/20";
      case "pending":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20";
      case "failed":
        return "text-red-600 bg-red-100 dark:bg-red-900/20";
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

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5 lg:mb-7">
          <BoxCubeIcon className="w-8 h-8 text-gray-700 dark:text-gray-300" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Disbursement Transactions
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Track all disbursement transactions made via API
            </p>
          </div>
        </div>

        {/* Recent Transactions Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-medium text-gray-900 dark:text-white">
              Recent Transactions
            </h4>
            <button className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Transaction
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Method
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {transaction.id}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {transaction.description}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.type === "credit"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        }`}
                      >
                        {transaction.type === "credit" ? "Credit" : "Debit"}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`font-medium ${
                          transaction.type === "credit"
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {transaction.type === "credit" ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-900 dark:text-white">
                        {transaction.method}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        {transaction.status.charAt(0).toUpperCase() +
                          transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(transaction.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
