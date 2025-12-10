"use client";
import { useState } from "react";

export default function FeesSettings() {
  const [feePayer, setFeePayer] = useState("business");

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Fee Configuration
        </h3>

        <div className="space-y-4">
          {/* Fee Payer */}
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Who Pays the Fees?
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Choose who bears the transaction fees for payments
            </p>

            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="feePayer"
                  value="business"
                  checked={feePayer === "business"}
                  onChange={(e) => setFeePayer(e.target.value)}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                />
                <div className="ml-3">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Business Pays Fees
                  </span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    You cover all transaction fees - better customer experience
                  </p>
                </div>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="feePayer"
                  value="customer"
                  checked={feePayer === "customer"}
                  onChange={(e) => setFeePayer(e.target.value)}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                />
                <div className="ml-3">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Customer Pays Fees
                  </span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Customers pay transaction fees - higher completion rates
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Fee Information */}
          <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Fee Structure
            </h4>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>• Bank Transfers: ₦50 + 0.5% (capped at ₦2,000)</p>
              <p>• USSD: ₦20 + 0.5% (capped at ₦100)</p>
              <p>• Cards: 1.5% + ₦100 (domestic) / 3.9% + ₦100 (international)</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
            Save Fee Settings
          </button>
        </div>
      </div>
    </div>
  );
}
