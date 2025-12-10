"use client";
import { useState, useEffect } from "react";
import { settingsApi } from "@/lib/api";

interface SettlementAccount {
  bank_name: string;
  account_number: string;
  account_name: string;
  status: string;
}

interface SettlementRequest {
  id: string;
  bank_name: string;
  account_number: string;
  account_name: string;
  status: string;
  requested_at: string;
}

export default function SettlementAccountSettings() {
  const [settlementAccount, setSettlementAccount] = useState<SettlementAccount | null>(null);
  const [settlementRequests, setSettlementRequests] = useState<SettlementRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [newAccountRequest, setNewAccountRequest] = useState({
    bankCode: "",
    accountNumber: "",
  });

  // Fetch settlement account data on component mount
  useEffect(() => {
    const fetchSettlementData = async () => {
      try {
        setLoading(true);
        const settlementData = await settingsApi.getSettlementSettings();
        setSettlementAccount({
          bank_name: settlementData.bank_name || 'First Bank PLC',
          account_number: settlementData.account_number || '1234567890',
          account_name: settlementData.account_name || 'ABC Corporation Ltd',
          status: 'approved' // For demo purposes, assume it's approved
        });

        // For now, we'll initialize with empty requests
        // In a full implementation, you'd have a separate endpoint for settlement requests
        setSettlementRequests([]);

      } catch (err) {
        console.error("Failed to fetch settlement data:", err);
        setError(err instanceof Error ? err.message : "Failed to load settlement data");
      } finally {
        setLoading(false);
      }
    };

    fetchSettlementData();
  }, []);

  const handleRequestNewAccount = async () => {
    if (!newAccountRequest.bankCode || !newAccountRequest.accountNumber) return;

    try {
      setSaving(true);
      setError(null);
      await settingsApi.updateSettlementSettings({
        bank_code: newAccountRequest.bankCode,
        account_number: newAccountRequest.accountNumber
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

      // Reset form
      setNewAccountRequest({ bankCode: "", accountNumber: "" });

      // Refresh data
      const settlementData = await settingsApi.getSettlementSettings();
      setSettlementAccount({
        bank_name: settlementData.bank_name || 'First Bank PLC',
        account_number: settlementData.account_number || '1234567890',
        account_name: settlementData.account_name || 'ABC Corporation Ltd',
        status: 'approved'
      });

    } catch (err) {
      console.error("Failed to request settlement account:", err);
      setError(err instanceof Error ? err.message : "Failed to request settlement account");
    } finally {
      setSaving(false);
    }
  };

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
                      <span className="font-medium">Bank:</span> {settlementAccount?.bank_name || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Account:</span> {settlementAccount?.account_number || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Name:</span> {settlementAccount?.account_name || 'N/A'}
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
        {settlementRequests.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 dark:text-white">Pending Requests</h4>

            {settlementRequests.map((request: SettlementRequest) => (
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
                        <span className="font-medium">Bank:</span> {request.bank_name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Account:</span> {request.account_number}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Requested:</span>{" "}
                        {new Date(request.requested_at).toLocaleDateString()}
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
