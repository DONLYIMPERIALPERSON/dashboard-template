"use client";
import { useState, useEffect } from "react";
import { GridIcon, BoxCubeIcon, UserCircleIcon } from "@/icons";
import { collectionsApi } from "@/lib/api";

interface UsdtWallet {
  id: string;
  address: string;
  network: string;
  balance: number;
  status: string;
  created_at: string;
  total_collections: number;
  transaction_count: number;
}

export default function StaticUSDTPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [usdtWallets, setUsdtWallets] = useState<UsdtWallet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch USDT collections on component mount
  useEffect(() => {
    const fetchUsdtCollections = async () => {
      try {
        setLoading(true);
        const response = await collectionsApi.getUsdtCollections();
        // Map API response to our interface
        const mappedWallets: UsdtWallet[] = response.collections.map((collection: any) => ({
          id: collection.id || collection.reference || 'N/A',
          address: collection.usdt_address || 'N/A',
          network: collection.network || 'TRC20',
          balance: collection.balance || 0,
          status: collection.status || 'active',
          created_at: collection.created_at || new Date().toISOString(),
          total_collections: collection.total_collections || 0,
          transaction_count: collection.transaction_count || 0,
        }));
        setUsdtWallets(mappedWallets);
      } catch (err) {
        console.error("Failed to fetch USDT collections:", err);
        setError(err instanceof Error ? err.message : "Failed to load USDT collections");
      } finally {
        setLoading(false);
      }
    };

    fetchUsdtCollections();
  }, []);

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

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    alert("Address copied to clipboard!");
  };

  const totalActiveWallets = usdtWallets.filter((wallet: UsdtWallet) => wallet.status === "active").length;
  const totalBalance = usdtWallets
    .filter((wallet: UsdtWallet) => wallet.status === "active")
    .reduce((sum: number, wallet: UsdtWallet) => sum + wallet.balance, 0);
  const totalCollections = usdtWallets.reduce((sum: number, wallet: UsdtWallet) => sum + wallet.total_collections, 0);

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5 lg:mb-7">
          <UserCircleIcon className="w-8 h-8 text-gray-700 dark:text-gray-300" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Static USDT Collections
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your static USDT wallet addresses for collections
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8">
          <div className="grid grid-cols-1 gap-6">
            {/* Active Wallets */}
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                    Active Wallets
                  </p>
                  <p className="text-2xl font-bold text-blue-800 dark:text-blue-200 mt-1">
                    {totalActiveWallets}
                  </p>
                </div>
                <div className="p-3 bg-blue-200 dark:bg-blue-800 rounded-full">
                  <UserCircleIcon className="w-6 h-6 text-blue-700 dark:text-blue-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Static USDT Wallets */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-medium text-gray-900 dark:text-white">
              Static USDT Wallets
            </h4>
            <button className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
              Add New Wallet
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {usdtWallets.map((wallet: UsdtWallet) => (
              <div
                key={wallet.id}
                className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                      <UserCircleIcon className="w-6 h-6 text-orange-700 dark:text-orange-300" />
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white">
                        {wallet.id}
                      </h5>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        wallet.status
                      )}`}>
                        {wallet.status.charAt(0).toUpperCase() + wallet.status.slice(1)}
                      </span>
                    </div>
                  </div>

                </div>

                <div className="space-y-3">
                  {/* Wallet Address */}
                  <div className="p-3 bg-white dark:bg-gray-700 rounded border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Wallet Address:
                      </span>
                      <button
                        onClick={() => handleCopyAddress(wallet.address)}
                        className="text-xs text-teal-600 hover:text-teal-700 dark:text-teal-400"
                      >
                        Copy
                      </button>
                    </div>
                    <p className="font-mono text-sm text-gray-900 dark:text-white break-all">
                      {wallet.address}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Network: {wallet.network}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white dark:bg-gray-700 rounded border">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Transactions</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {wallet.transaction_count}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-white dark:bg-gray-700 rounded border">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Total Collected</p>
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">
                        {formatCurrency(wallet.total_collections)}
                      </p>
                    </div>
                  </div>

                  {/* Created Date */}
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Created: {new Date(wallet.created_at).toLocaleDateString()}
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
