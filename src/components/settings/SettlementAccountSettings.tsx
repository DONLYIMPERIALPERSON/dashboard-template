"use client";
import { useState } from "react";

export default function SettlementAccountSettings() {
  const [settlementAccount, setSettlementAccount] = useState({
    bankName: "First Bank PLC",
    accountNumber: "1234567890",
    accountName: "ABC Corporation Ltd",
    status: "approved",
  });

  const [newAccountRequest, setNewAccountRequest] = useState({
    bankCode: "",
    accountNumber: "",
  });

  const [requests, setRequests] = useState([
    {
      id: "SETTLEMENT_ABC123",
      bankName: "GTBank PLC",
      accountNumber: "0987654321",
      accountName: "ABC Corporation Ltd",
      status: "pending",
      requestedAt: "2024-12-12T10:30:00Z",
    },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Settlement Account
        </h3>

        {/* Current Settlement Account */}
        <div className="space-y-4 mb-6">
          <h4 className="font-medium text-gray-900 dark:text-white">Current Account</h4>

          {settlementAccount.status === "approved" ? (
            <div className="p-4 border border-green-200 bg-green-50 rounded-lg dark:border-green-800 dark:bg-green-900/20">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">
                    ✅ Active Settlement Account
                  </h5>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Bank:</span> {settlementAccount.bankName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Account:</span> {settlementAccount.accountNumber}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Name:</span> {settlementAccount.accountName}
                    </p>
                  </div>
                </div>
                <div className="text-green-600 dark:text-green-400">
                  <span className="text-sm font-medium">Active</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg dark:border-yellow-800 dark:bg-yellow-900/20">
              <p className="text-yellow-800 dark:text-yellow-200">
                No active settlement account. Request one below.
              </p>
            </div>
          )}
        </div>

        {/* Request New Settlement Account */}
        <div className="space-y-4 mb-6">
          <h4 className="font-medium text-gray-900 dark:text-white">Request New Account</h4>

          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Bank Code
                </label>
                <input
                  type="text"
                  value={newAccountRequest.bankCode}
                  onChange={(e) =>
                    setNewAccountRequest({
                      ...newAccountRequest,
                      bankCode: e.target.value,
                    })
                  }
                  placeholder="e.g., 011"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Account Number
                </label>
                <input
                  type="text"
                  value={newAccountRequest.accountNumber}
                  onChange={(e) =>
                    setNewAccountRequest({
                      ...newAccountRequest,
                      accountNumber: e.target.value,
                    })
                  }
                  placeholder="10-digit account number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="mt-4">
              <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
                Request Account Validation
              </button>
            </div>

            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Your account will be validated and approved by our compliance team before activation.
            </p>
          </div>
        </div>

        {/* Pending Requests */}
        {requests.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 dark:text-white">Pending Requests</h4>

            {requests.map((request) => (
              <div
                key={request.id}
                className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg dark:border-yellow-800 dark:bg-yellow-900/20"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white">
                      ⏳ {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </h5>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">ID:</span> {request.id}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Bank:</span> {request.bankName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Account:</span> {request.accountNumber}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Requested:</span>{" "}
                        {new Date(request.requestedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
