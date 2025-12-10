"use client";
import { useState, useEffect } from "react";
import { GridIcon, BoxCubeIcon, UserCircleIcon } from "@/icons";
import { collectionsApi, CollectionTransaction } from "@/lib/api";

export default function DynamicVAPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [collections, setCollections] = useState<CollectionTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCollections, setTotalCollections] = useState(0);

  // Fetch VA collections on component mount
  useEffect(() => {
    const fetchVaCollections = async () => {
      try {
        setLoading(true);
        const response = await collectionsApi.getVaCollections({
          page: currentPage,
          limit: 20,
        });
        setCollections(response.collections);
        setTotalCollections(response.total);
      } catch (err) {
        console.error("Failed to fetch VA collections:", err);
        setError(err instanceof Error ? err.message : "Failed to load collections");
      } finally {
        setLoading(false);
      }
    };

    fetchVaCollections();
  }, [currentPage]);

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const totalCollectedToday = collections
    .filter((col: CollectionTransaction) => col.status === "completed" &&
      new Date(col.created_at).toDateString() === new Date().toDateString())
    .reduce((sum: number, col: CollectionTransaction) => sum + col.amount, 0);

  const pendingCollections = collections.filter((col: CollectionTransaction) => col.status === "pending").length;

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5 lg:mb-7">
          <BoxCubeIcon className="w-8 h-8 text-gray-700 dark:text-gray-300" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Dynamic Virtual Account Collections
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Monitor incoming bank transfers to dynamic virtual accounts
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Today's Collections */}
            <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-700 dark:text-purple-300 font-medium">
                    Today's Collections
                  </p>
                  <p className="text-2xl font-bold text-purple-800 dark:text-purple-200 mt-1">
                    {formatCurrency(totalCollectedToday)}
                  </p>
                </div>
                <div className="p-3 bg-purple-200 dark:bg-purple-800 rounded-full">
                  <BoxCubeIcon className="w-6 h-6 text-purple-700 dark:text-purple-300" />
                </div>
              </div>
            </div>

            {/* Pending Collections */}
            <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-700 dark:text-orange-300 font-medium">
                    Pending Verifications
                  </p>
                  <p className="text-2xl font-bold text-orange-800 dark:text-orange-200 mt-1">
                    {pendingCollections}
                  </p>
                </div>
                <div className="p-3 bg-orange-200 dark:bg-orange-800 rounded-full">
                  <UserCircleIcon className="w-6 h-6 text-orange-700 dark:text-orange-300" />
                </div>
              </div>
            </div>

            {/* Total Transactions */}
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                    Total Transactions
                  </p>
                  <p className="text-2xl font-bold text-blue-800 dark:text-blue-200 mt-1">
                    {collections.length}
                  </p>
                </div>
                <div className="p-3 bg-blue-200 dark:bg-blue-800 rounded-full">
                  <GridIcon className="w-6 h-6 text-blue-700 dark:text-blue-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Collections Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-medium text-gray-900 dark:text-white">
              Recent Collections
            </h4>
            <button className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
              Export Data
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
                    Sender
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Bank Details
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
                {collections.map((collection: CollectionTransaction) => (
                  <tr
                    key={collection.id}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {collection.id}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {collection.reference}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {collection.description || 'N/A'}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {collection.customer_name || 'N/A'}
                        </p>
                        <p className="font-mono text-xs text-gray-500 dark:text-gray-400">
                          {collection.customer_email || 'N/A'}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        N/A
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-green-600 dark:text-green-400">
                        +{formatCurrency(collection.amount)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          collection.status
                        )}`}
                      >
                        {collection.status.charAt(0).toUpperCase() +
                          collection.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(collection.created_at)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing {collections.length} collections
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                Previous
              </button>
              <button className="px-3 py-1 text-sm bg-teal-600 text-white rounded hover:bg-teal-700">
                1
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                2
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
