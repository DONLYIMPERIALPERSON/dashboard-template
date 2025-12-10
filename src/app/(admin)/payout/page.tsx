"use client";
import { useState, useEffect } from "react";
import { GridIcon, BoxCubeIcon } from "@/icons";

interface Bank {
  id: number;
  name: string;
  routing_key: string;
  bank_code: string;
  category_id?: string;
  nuban_code?: string;
  logo_image?: string;
  is_active: boolean;
  created_at: string;
}

export default function PayoutPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const availableBalance = 45000.00;

  const [transferForm, setTransferForm] = useState({
    bankCode: "",
    accountNumber: "",
    accountName: "",
    amount: "",
    description: "",
  });

  const [banks, setBanks] = useState<Bank[]>([]);
  const [loadingBanks, setLoadingBanks] = useState(false);

  const [isValidating, setIsValidating] = useState(false);
  const [accountValidated, setAccountValidated] = useState(false);

  // Fetch banks on component mount
  useEffect(() => {
    const fetchBanks = async () => {
      setLoadingBanks(true);
      try {
        const response = await fetch('http://localhost:5500/payouts/banks');
        if (response.ok) {
          const data = await response.json();
          setBanks(data.banks || []);
        } else {
          console.error('Failed to fetch banks');
        }
      } catch (error) {
        console.error('Error fetching banks:', error);
      } finally {
        setLoadingBanks(false);
      }
    };

    fetchBanks();
  }, []);

  const recentTransactions = [
    {
      id: "PAY_001",
      type: "debit",
      amount: 25000.00,
      recipient: "John Doe - GTBank",
      description: "Payment for services",
      status: "completed",
      date: "2024-12-12T15:30:00Z",
    },
    {
      id: "PAY_002",
      type: "debit",
      amount: 15000.00,
      recipient: "Jane Smith - First Bank",
      description: "Vendor payment",
      status: "completed",
      date: "2024-12-12T14:15:00Z",
    },
    {
      id: "PAY_003",
      type: "debit",
      amount: 12000.00,
      recipient: "ABC Corp - Zenith Bank",
      description: "Invoice settlement",
      status: "pending",
      date: "2024-12-12T13:45:00Z",
    },
    {
      id: "PAY_004",
      type: "debit",
      amount: 18000.00,
      recipient: "Mike Johnson - Access Bank",
      description: "Freelance payment",
      status: "completed",
      date: "2024-12-11T16:20:00Z",
    },
    {
      id: "PAY_005",
      type: "debit",
      amount: 8500.00,
      recipient: "Sarah Wilson - Sterling Bank",
      description: "Consulting fee",
      status: "failed",
      date: "2024-12-11T14:10:00Z",
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

  const handleValidateAccount = async () => {
    if (!transferForm.bankCode || !transferForm.accountNumber) return;

    setIsValidating(true);

    // Simulate account validation
    setTimeout(() => {
      setAccountValidated(true);
      setTransferForm({
        ...transferForm,
        accountName: "John Doe",
      });
      setIsValidating(false);
    }, 2000);
  };

  const handleTransfer = () => {
    // Handle transfer logic here
    alert("Transfer initiated successfully!");
  };

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5 lg:mb-7">
          <GridIcon className="w-8 h-8 text-gray-700 dark:text-gray-300" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Payout
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Transfer funds to bank accounts instantly
            </p>
          </div>
        </div>



        {/* Bank Transfer Flow */}
        <div className="mb-8">
          <h4 className="text-base font-medium text-gray-900 dark:text-white mb-4">
            Bank Transfer
          </h4>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Transfer Form */}
            <div className="space-y-6">
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <BoxCubeIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    <h5 className="font-medium text-gray-900 dark:text-white">
                      Transfer Details
                    </h5>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Available: {formatCurrency(availableBalance)}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Bank Selection */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Select Bank
                    </label>
                    <select
                      value={transferForm.bankCode}
                      onChange={(e) =>
                        setTransferForm({
                          ...transferForm,
                          bankCode: e.target.value,
                        })
                      }
                      disabled={loadingBanks}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">
                        {loadingBanks ? "Loading banks..." : "Select a bank"}
                      </option>
                      {banks.map((bank) => (
                        <option key={bank.id} value={bank.bank_code}>
                          {bank.name} ({bank.bank_code})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Account Number */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Account Number
                    </label>
                    <input
                      type="text"
                      value={transferForm.accountNumber}
                      onChange={(e) =>
                        setTransferForm({
                          ...transferForm,
                          accountNumber: e.target.value,
                        })
                      }
                      placeholder="10-digit account number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  {/* Validate Account Button */}
                  <button
                    onClick={handleValidateAccount}
                    disabled={
                      isValidating ||
                      !transferForm.bankCode ||
                      !transferForm.accountNumber
                    }
                    className="w-full px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isValidating ? "Validating..." : "Validate Account"}
                  </button>

                  {/* Account Name (shown after validation) */}
                  {accountValidated && (
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                      <p className="text-sm font-medium text-green-800 dark:text-green-300">
                        Account Name: {transferForm.accountName}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Amount & Description */}
              {accountValidated && (
                <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <div className="space-y-4">
                    {/* Amount */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Amount (₦)
                      </label>
                      <input
                        type="number"
                        value={transferForm.amount}
                        onChange={(e) =>
                          setTransferForm({
                            ...transferForm,
                            amount: e.target.value,
                          })
                        }
                        placeholder="Enter amount"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                      {transferForm.amount &&
                        parseFloat(transferForm.amount) > availableBalance && (
                          <p className="text-sm text-red-600 dark:text-red-400">
                            Insufficient balance
                          </p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Description (Optional)
                      </label>
                      <textarea
                        value={transferForm.description}
                        onChange={(e) =>
                          setTransferForm({
                            ...transferForm,
                            description: e.target.value,
                          })
                        }
                        placeholder="Transfer description"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    {/* Transfer Button */}
                    <button
                      onClick={handleTransfer}
                      disabled={
                        !transferForm.amount ||
                        parseFloat(transferForm.amount) > availableBalance ||
                        parseFloat(transferForm.amount) <= 0
                      }
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Initiate Transfer
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Transfer Preview */}
            {accountValidated && transferForm.amount && (
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <h5 className="font-medium text-gray-900 dark:text-white mb-4">
                  Transfer Preview
                </h5>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Recipient:
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {transferForm.accountName}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Account:
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {transferForm.accountNumber}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Amount:
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatCurrency(parseFloat(transferForm.amount))}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Fee:
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      ₦50.00
                    </span>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Total:
                      </span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {formatCurrency(parseFloat(transferForm.amount) + 50)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Transactions Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-medium text-gray-900 dark:text-white">
              Recent Payouts
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
                    Recipient
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Amount
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
                      <span className="text-sm text-gray-900 dark:text-white">
                        {transaction.recipient}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-red-600 dark:text-red-400">
                        -{formatCurrency(transaction.amount)}
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
