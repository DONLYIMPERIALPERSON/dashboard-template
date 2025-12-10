"use client";
import React from "react";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon, BoxCubeIcon, CheckCircleIcon } from "@/icons";
import { DashboardSummary } from "@/lib/api";

interface SummaryMetricsProps {
  dashboardData: DashboardSummary | null;
}

export const SummaryMetrics: React.FC<SummaryMetricsProps> = ({ dashboardData }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Available Balance --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxCubeIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="mt-5">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Available Balance
          </span>
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            ₦{dashboardData ? dashboardData.total_balance.toLocaleString() : '0'}
          </h4>
        </div>
      </div>

      {/* <!-- Deposits Today --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <ArrowDownIcon className="text-gray-800 dark:text-white/90" />
        </div>
        <div className="mt-5">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Credits Today
          </span>
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            ₦{dashboardData ? dashboardData.total_collections_today.toLocaleString() : '0'}
          </h4>
        </div>
      </div>

      {/* <!-- Payouts Today --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <ArrowUpIcon className="text-gray-800 dark:text-white/90" />
        </div>
        <div className="mt-5">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Debits Today
          </span>
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            ₦{dashboardData ? dashboardData.total_payouts_today.toLocaleString() : '0'}
          </h4>
        </div>
      </div>

      {/* <!-- Successful Transactions Today --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <CheckCircleIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="mt-5">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Successful Transactions
          </span>
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            {dashboardData ? dashboardData.total_transactions.toLocaleString() : '0'}
          </h4>
        </div>
      </div>
    </div>
  );
};
