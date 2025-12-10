"use client";
import { useState, useEffect } from "react";
import { DollarLineIcon, BoxCubeIcon, UserCircleIcon } from "@/icons";
import { walletApi, WalletBalance, DepositRequest, DepositResponse } from "@/lib/api";

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [walletData, setWalletData] = useState<WalletBalance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [depositMethod, setDepositMethod] = useState<'virtual_account' | 'usdt' | 'checkout_link'>('virtual_account');
  const [isCreatingDeposit, setIsCreatingDeposit] = useState(false);
  const [depositResponse, setDepositResponse] = useState<DepositResponse | null>(null);

  // Fetch wallet balance on component mount
  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        setLoading(true);
        const data = await walletApi.getBalance();
        setWalletData(data);
      } catch (err) {
        console.error("Failed to fetch wallet balance:", err);
        setError(err instanceof Error ? err.message : "Failed to load wallet data");
      } finally {
        setLoading(false);
      }
    };

    fetchWalletBalance();
  }, []);

  const fundingMethods = [
    {
      id: "virtual-account",
      name: "Virtual Account",
      icon: <BoxCubeIcon className="w-6 h-6" />,
      description: "Receive funds via bank transfer to your virtual account",
      accountNumber: "1234567890",
      bankName: "SafeHaven Bank",
      status: "active",
    },
    {
      id: "usdt-trc20",
      name: "USDT TRC20",
      icon: <UserCircleIcon className="w-6 h-6" />,
      description: "Receive USDT cryptocurrency via TRC20 network",
      walletAddress: "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuW2X",
      network: "TRC20",
      status: "active",
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    alert("Address copied to clipboard!");
  };

  const handleCheckoutLink = () => {
    // Generate or retrieve checkout link
    const checkoutUrl = "https://checkout.safehaven.com/pay/abc123";
    window.open(checkoutUrl, '_blank');
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading wallet...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 mb-4">⚠️ Error loading wallet</div>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5 lg:mb-7">
          <BoxCubeIcon className="w-8 h-8 text-gray-700 dark:text-gray-300" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Wallet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your wallet balance and funding methods
            </p>
          </div>
        </div>

        {/* Wallet Balance */}
        <div className="mb-8">
          <h4 className="text-base font-medium text-gray-900 dark:text-white mb-4">
            Wallet Balance
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Available Balance */}
            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-800">
              <div>
                <p className="text-sm text-green-700 dark:text-green-300 font-medium">
                  Available Balance
                </p>
                <p className="text-2xl font-bold text-green-800 dark:text-green-200 mt-1">
                  ₦{walletData ? walletData.available_balance.toLocaleString() : '0'}
                </p>
              </div>
            </div>

            {/* Pending Balance */}
            <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 font-medium">
                  Pending Balance
                </p>
                <p className="text-2xl font-bold text-yellow-800 dark:text-yellow-200 mt-1">
                  ₦{walletData ? walletData.pending_balance.toLocaleString() : '0'}
                </p>
              </div>
            </div>

            {/* Total Balance */}
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div>
                <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                  Total Balance
                </p>
                <p className="text-2xl font-bold text-blue-800 dark:text-blue-200 mt-1">
                  ₦{walletData ? walletData.total_balance.toLocaleString() : '0'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Funding Methods */}
        <div className="mb-8">
          <h4 className="text-base font-medium text-gray-900 dark:text-white mb-4">
            Funding Methods
          </h4>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {fundingMethods.map((method) => (
              <div
                key={method.id}
                className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                    {method.icon}
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white">
                      {method.name}
                    </h5>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      Active
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {method.description}
                </p>

                <div className="space-y-2">
                  {method.accountNumber && (
                    <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded border">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Account Number:
                      </span>
                      <span className="font-mono text-sm text-gray-900 dark:text-white">
                        {method.accountNumber}
                      </span>
                    </div>
                  )}

                  {method.bankName && (
                    <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded border">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Bank:
                      </span>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {method.bankName}
                      </span>
                    </div>
                  )}

                  {method.walletAddress && (
                    <div className="p-3 bg-white dark:bg-gray-700 rounded border">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Wallet Address:
                        </span>
                        <button
                          onClick={() => handleCopyAddress(method.walletAddress)}
                          className="text-xs text-teal-600 hover:text-teal-700 dark:text-teal-400"
                        >
                          Copy
                        </button>
                      </div>
                      <p className="font-mono text-xs text-gray-900 dark:text-white break-all">
                        {method.walletAddress}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Network: {method.network}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Checkout Link */}
        <div>
          <h4 className="text-base font-medium text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h4>

          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <BoxCubeIcon className="w-6 h-6 text-blue-700 dark:text-blue-300" />
              </div>
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">
                  Payment Link
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Deposit via checkout link
                </p>
              </div>
            </div>

            <button
              onClick={handleCheckoutLink}
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Deposit via Checkout Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
