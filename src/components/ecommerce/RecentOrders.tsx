import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

// Define the TypeScript interface for recent transactions
interface Transaction {
  id: string;
  type: "deposit" | "payout" | "collection";
  amount: number;
  fee?: number;
  description: string;
  status: "completed" | "pending" | "failed";
  date: string;
}

// Define the table data using the interface
const transactionData: Transaction[] = [
  {
    id: "dep_12345",
    type: "deposit",
    amount: 125000,
    description: "Virtual Account Deposit - ABC Corp",
    status: "completed",
    date: "2024-12-12 14:30",
  },
  {
    id: "payout_67890",
    type: "payout",
    amount: 75000,
    fee: 250,
    description: "Transfer to John Doe - ****1234",
    status: "completed",
    date: "2024-12-12 13:15",
  },
  {
    id: "dep_54321",
    type: "deposit",
    amount: 250000,
    description: "USDT Deposit - Wallet Transfer",
    status: "completed",
    date: "2024-12-12 11:45",
  },
  {
    id: "collection_98765",
    type: "collection",
    amount: 50000,
    description: "Payment Collection - Invoice #INV001",
    status: "pending",
    date: "2024-12-12 10:20",
  },
  {
    id: "payout_24680",
    type: "payout",
    amount: 100000,
    fee: 350,
    description: "Bulk Transfer - Multiple Recipients",
    status: "completed",
    date: "2024-12-12 09:10",
  },
];

export default function RecentOrders() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Transactions
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <svg
              className="stroke-current fill-white dark:fill-gray-800"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.29004 5.90393H17.7067"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.7075 14.0961H2.29085"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
              <path
                d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
            </svg>
            Filter
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            See all
          </button>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Type
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Description
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Amount
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {transactionData.map((transaction) => (
              <TableRow key={transaction.id} className="">
                <TableCell className="py-3">
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      transaction.type === 'deposit' ? 'bg-green-100 dark:bg-green-900' :
                      transaction.type === 'payout' ? 'bg-blue-100 dark:bg-blue-900' :
                      'bg-purple-100 dark:bg-purple-900'
                    }`}>
                      <span className={`text-sm ${
                        transaction.type === 'deposit' ? 'text-green-600 dark:text-green-400' :
                        transaction.type === 'payout' ? 'text-blue-600 dark:text-blue-400' :
                        'text-purple-600 dark:text-purple-400'
                      }`}>
                        {transaction.type === 'deposit' ? '↓' :
                         transaction.type === 'payout' ? '↑' : '→'}
                      </span>
                    </div>
                    <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90 capitalize">
                      {transaction.type}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-3">
                  <div>
                    <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {transaction.description}
                    </p>
                    <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                      {transaction.date}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <div>
                    <p className="font-medium">₦{transaction.amount.toLocaleString()}</p>
                    {transaction.fee && (
                      <p className="text-xs text-red-500">Fee: ₦{transaction.fee}</p>
                    )}
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      transaction.status === "completed"
                        ? "success"
                        : transaction.status === "pending"
                        ? "warning"
                        : "error"
                    }
                  >
                    {transaction.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
