"use client";
import { useState, useEffect } from "react";
import { ListIcon, EyeIcon, CheckCircleIcon } from "@/icons";
import { collectionsApi } from "@/lib/api";

interface Transaction {
  id: string;
  type: string;
  method: string;
  amount: number;
  currency: string;
  customer: string;
  reference: string;
  description: string;
  status: string;
  timestamp: string;
  fees: number;
  netAmount: number;
}

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch transactions on component mount
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        // Combine data from different APIs to create unified transaction view
        // This is a simplified approach - in production you'd have a dedicated transactions API
        const [trxResponse, vaResponse, usdtResponse] = await Promise.all([
          collectionsApi.getTrxCollections({ page: 1, limit: 10 }),
          collectionsApi.getVaCollections({ page: 1, limit: 10 }),
          collectionsApi.getUsdtCollections()
        ]);

        // Map and combine all transactions
        const allTransactions: Transaction[] = [
          ...trxResponse.collections.slice(0, 3).map((t: any) => ({
            id: t.id || 'N/A',
            type: 'collection',
            method: 'Dynamic TRX',
            amount: t.amount || 0,
            currency: 'NGN',
            customer: t.customer_name || 'N/A',
            reference: t.reference || 'N/A',
            description: t.description || 'TRX Collection',
            status: t.status || 'completed',
            timestamp: t.created_at || new Date().toISOString(),
            fees: Math.round((t.amount || 0) * 0.01), // 1% fee
            netAmount: (t.amount || 0) - Math.round((t.amount || 0) * 0.01)
          })),
          ...vaResponse.collections.slice(0, 3).map((t: any) => ({
            id: t.id || 'N/A',
            type: 'collection',
            method: 'Dynamic VA',
            amount: t.amount || 0,
            currency: 'NGN',
            customer: t.customer_name || 'N/A',
            reference: t.reference || 'N/A',
            description: t.description || 'VA Collection',
            status: t.status || 'completed',
            timestamp: t.created_at || new Date().toISOString(),
            fees: Math.round((t.amount || 0) * 0.01),
            netAmount: (t.amount || 0) - Math.round((t.amount || 0) * 0.01)
          })),
          ...usdtResponse.collections.slice(0, 2).map((t: any) => ({
            id: t.id || 'N/A',
            type: 'collection',
            method: 'Static USDT',
            amount: t.balance || 0,
            currency: 'USDT',
            customer: t.customer_name || 'Crypto User',
            reference: t.reference || 'N/A',
            description: t.description || 'USDT Deposit',
            status: t.status || 'completed',
            timestamp: t.created_at || new Date().toISOString(),
            fees: (t.balance || 0) * 0.01, // 1% fee
            netAmount: (t.balance || 0) * 0.99
          }))
        ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        setTransactions(allTransactions);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
        setError(err instanceof Error ? err.message : "Failed to load transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const transactionTypes = [
    { value: "all", label: "All Types" },
    { value: "collection", label: "Collections" },
    { value: "disbursement", label: "Disbursements" },
    { value: "payout", label: "Payouts" },
    { value: "checkout_link", label: "Checkout Links" }
  ];

  const statusTypes = [
    { value: "all", label: "All Status" },
    { value: "completed", label: "Completed" },
    { value: "pending", label: "Pending" },
    { value: "failed", label: "Failed" }
  ];

  const getTypeBadgeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      collection: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
      disbursement: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
      payout: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
      checkout_link: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300"
    };
    return colors[type] || "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
  };

  const getStatusBadgeColor = (status: string) => {
    const colors: { [key: string]: string } = {
      completed: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
      failed: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
    };
    return colors[status] || "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
  };

  const getStatusIcon = (status: string) => {
    return status === "completed" ? (
      <CheckCircleIcon className="w-4 h-4 text-green-600" />
    ) : status === "pending" ? (
      <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
    ) : (
      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
    );
  };

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'USDT') {
      return `${amount.toFixed(2)} ${currency}`;
    }
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const formatType = (type: string) => {
    return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = searchTerm === "" ||
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === "all" || transaction.type === selectedType;
    const matchesStatus = selectedStatus === "all" || transaction.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  // Calculate totals
  const totalTransactions = filteredTransactions.length;
  const totalAmount = filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0);
  const totalFees = filteredTransactions.reduce((sum, tx) => sum + tx.fees, 0);
  const totalNet = filteredTransactions.reduce((sum, tx) => sum + tx.netAmount, 0);

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5 lg:mb-7">
          <ListIcon className="w-8 h-8 text-gray-700 dark:text-gray-300" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Transactions
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Unified view of all payment transactions across your business
            </p>
          </div>
        </div>



        {/* Filters and Search */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by customer, reference, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Type Filter */}
            <div className="sm:w-48">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                {transactionTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="sm:w-48">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                {statusTypes.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
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
                  Method
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                  Customer
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                  Amount
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                  Fees
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
              {filteredTransactions.map((transaction) => (
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
                        {transaction.reference}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeBadgeColor(transaction.type)}`}>
                      {formatType(transaction.type)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {transaction.method}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {transaction.customer}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-32" title={transaction.description}>
                        {transaction.description}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className={`font-medium ${
                        transaction.type === "disbursement" || transaction.type === "payout"
                          ? "text-red-600 dark:text-red-400"
                          : "text-green-600 dark:text-green-400"
                      }`}>
                        {transaction.type === "disbursement" || transaction.type === "payout" ? "-" : "+"}
                        {formatCurrency(transaction.amount, transaction.currency)}
                      </p>
                      {transaction.currency !== 'USDT' && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Net: {formatCurrency(transaction.netAmount, transaction.currency)}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {transaction.currency === 'USDT' ? `${transaction.fees} ${transaction.currency}` : formatCurrency(transaction.fees, transaction.currency)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(transaction.status)}
                      <span className={`text-xs font-medium capitalize ${
                        transaction.status === "completed"
                          ? "text-green-600 dark:text-green-400"
                          : transaction.status === "pending"
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-red-600 dark:text-red-400"
                      }`}>
                        {transaction.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {new Date(transaction.timestamp).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(transaction.timestamp).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No Results */}
        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <EyeIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No transactions found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div>
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">
              Previous
            </button>
            <span className="px-3 py-1 bg-teal-600 text-white rounded">1</span>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
