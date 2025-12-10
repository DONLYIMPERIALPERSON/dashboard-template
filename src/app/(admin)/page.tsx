import type { Metadata } from "next";
import { SummaryMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";

export const metadata: Metadata = {
  title: "Pasteaza | Business Dashboard",
  description: "Business dashboard for managing payments, transactions, and financial operations.",
};

export default function Ecommerce() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <SummaryMetrics />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlySalesChart />
      </div>

      <div className="col-span-12">
        <RecentOrders />
      </div>
    </div>
  );
}
