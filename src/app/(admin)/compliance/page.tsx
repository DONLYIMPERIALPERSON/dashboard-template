"use client";
import { useState } from "react";
import { GridIcon, UserIcon, CheckCircleIcon, CloseLineIcon, LockIcon } from "@/icons";

export default function CompliancePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [complianceType, setComplianceType] = useState<"individual" | "registered" | null>(null);
  const [showDirectorForm, setShowDirectorForm] = useState(false);

  // Mock compliance data - in real app, this would come from API
  const complianceStatus = {
    status: "not_submitted", // "not_submitted", "draft", "pending", "approved", "rejected"
    type: null,
    submittedAt: null,
    reviewedAt: null,
    reviewNotes: null,
    directors: [],
    documents: []
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircleIcon className="w-6 h-6 text-green-600" />;
      case "pending":
        return <LockIcon className="w-6 h-6 text-yellow-600" />;
      case "rejected":
        return <CloseLineIcon className="w-6 h-6 text-red-600" />;
      default:
        return <CloseLineIcon className="w-6 h-6 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-600 bg-green-100 dark:bg-green-900/20";
      case "pending":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20";
      case "rejected":
        return "text-red-600 bg-red-100 dark:bg-red-900/20";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "Approved";
      case "pending":
        return "Under Review";
      case "rejected":
        return "Rejected";
      case "draft":
        return "Draft";
      default:
        return "Not Submitted";
    }
  };

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5 lg:mb-7">
          <GridIcon className="w-8 h-8 text-gray-700 dark:text-gray-300" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Compliance
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Complete your business compliance verification
            </p>
          </div>
        </div>

        {/* Status Overview */}
        <div className="mb-8">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Compliance Status
                </h4>
                <div className="flex items-center gap-3">
                  {getStatusIcon(complianceStatus.status)}
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(complianceStatus.status)}`}>
                    {getStatusText(complianceStatus.status)}
                  </span>
                </div>
                {complianceStatus.submittedAt && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Submitted: {new Date(complianceStatus.submittedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
              {complianceStatus.status === "not_submitted" && (
                <button className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
                  Start Compliance
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Business Type Selection */}
        {complianceStatus.status === "not_submitted" && (
          <div className="mb-8">
            <h4 className="text-base font-medium text-gray-900 dark:text-white mb-4">
              Select Business Type
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Individual Business */}
              <div
                onClick={() => setComplianceType("individual")}
                className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                  complianceType === "individual"
                    ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <UserIcon className="w-6 h-6 text-gray-600" />
                  <h5 className="font-medium text-gray-900 dark:text-white">
                    Individual Business
                  </h5>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  For sole proprietors and non-registered businesses
                </p>
                <ul className="text-xs text-gray-500 dark:text-gray-400 mt-3 space-y-1">
                  <li>• Identity verification required</li>
                  <li>• Proof of address</li>
                  <li>• Business information</li>
                </ul>
              </div>

              {/* Registered Business */}
              <div
                onClick={() => setComplianceType("registered")}
                className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                  complianceType === "registered"
                    ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <GridIcon className="w-6 h-6 text-gray-600" />
                  <h5 className="font-medium text-gray-900 dark:text-white">
                    Registered Business
                  </h5>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  For incorporated companies and registered businesses
                </p>
                <ul className="text-xs text-gray-500 dark:text-gray-400 mt-3 space-y-1">
                  <li>• CAC registration documents</li>
                  <li>• Director information</li>
                  <li>• Business documents</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Compliance Form */}
        {complianceType && (
          <div className="space-y-6">
            {/* Business Information */}
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                Business Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Business Address
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter business address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Business Sector
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                    <option>Select sector</option>
                    <option>Technology</option>
                    <option>Finance</option>
                    <option>Healthcare</option>
                    <option>Retail</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Business Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    rows={3}
                    placeholder="Describe your business activities"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Expected Monthly Volume
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                    <option>Select volume</option>
                    <option>₦0 - ₦1M</option>
                    <option>₦1M - ₦10M</option>
                    <option>₦10M - ₦50M</option>
                    <option>₦50M+</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Registered Business Specific Fields */}
            {complianceType === "registered" && (
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                  Business Registration Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Registered Business Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter registered name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Registration Type
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                      <option>Limited Liability Company (LTD)</option>
                      <option>Business Name (BN)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      CAC Number
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder="RC1234567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date of Incorporation
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Directors Section (Registered Business) */}
            {complianceType === "registered" && (
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Directors
                  </h4>
                  <button
                    onClick={() => setShowDirectorForm(!showDirectorForm)}
                    className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                  >
                    Add Director
                  </button>
                </div>

                {/* Existing Directors */}
                <div className="space-y-3">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded border">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white">
                          John Doe (Verified Director)
                        </h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          john@example.com • +2348012345678
                        </p>
                      </div>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                        Verified
                      </span>
                    </div>

                    {/* Director Document Uploads */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                      <h6 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                        Required Documents
                      </h6>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded">
                          <div>
                            <h6 className="text-sm font-medium text-gray-900 dark:text-white">ID Document</h6>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Passport, Driver's License, or National ID</p>
                          </div>
                          <div>
                            <input type="file" className="hidden" id="verified-id-doc" />
                            <label
                              htmlFor="verified-id-doc"
                              className="px-3 py-1 text-sm border border-gray-300 rounded cursor-pointer hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                            >
                              Upload
                            </label>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded">
                          <div>
                            <h6 className="text-sm font-medium text-gray-900 dark:text-white">Proof of Address</h6>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Utility bill or bank statement</p>
                          </div>
                          <div>
                            <input type="file" className="hidden" id="verified-address-doc" />
                            <label
                              htmlFor="verified-address-doc"
                              className="px-3 py-1 text-sm border border-gray-300 rounded cursor-pointer hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                            >
                              Upload
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add Director Form */}
                {showDirectorForm && (
                  <div className="mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                      Add New Director
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          ID Number
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                    </div>

                    {/* Director Document Uploads */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                      <h6 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                        Required Documents
                      </h6>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded">
                          <div>
                            <h6 className="text-sm font-medium text-gray-900 dark:text-white">ID Document</h6>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Passport, Driver's License, or National ID</p>
                          </div>
                          <div>
                            <input type="file" className="hidden" id="new-director-id-doc" />
                            <label
                              htmlFor="new-director-id-doc"
                              className="px-3 py-1 text-sm border border-gray-300 rounded cursor-pointer hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                            >
                              Upload
                            </label>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded">
                          <div>
                            <h6 className="text-sm font-medium text-gray-900 dark:text-white">Proof of Address</h6>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Utility bill or bank statement</p>
                          </div>
                          <div>
                            <input type="file" className="hidden" id="new-director-address-doc" />
                            <label
                              htmlFor="new-director-address-doc"
                              className="px-3 py-1 text-sm border border-gray-300 rounded cursor-pointer hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                            >
                              Upload
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
                        Add Director
                      </button>
                      <button
                        onClick={() => setShowDirectorForm(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Document Upload Section */}
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                Required Documents
              </h4>
              <div className="space-y-4">
                {complianceType === "individual" ? (
                  <>
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white">Proof of Address</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Utility bill, bank statement, or similar</p>
                      </div>
                      <div>
                        <input type="file" className="hidden" id="address-proof" />
                        <label
                          htmlFor="address-proof"
                          className="px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                        >
                          Upload
                        </label>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white">CAC Certificate</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Certificate of incorporation</p>
                      </div>
                      <div>
                        <input type="file" className="hidden" id="cac-cert" />
                        <label
                          htmlFor="cac-cert"
                          className="px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                        >
                          Upload
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white">CAC Form</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">CAC registration form</p>
                      </div>
                      <div>
                        <input type="file" className="hidden" id="cac-form" />
                        <label
                          htmlFor="cac-form"
                          className="px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                        >
                          Upload
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white">Proof of Address</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Business address proof</p>
                      </div>
                      <div>
                        <input type="file" className="hidden" id="business-address" />
                        <label
                          htmlFor="business-address"
                          className="px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                        >
                          Upload
                        </label>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button className="px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium">
                Submit Compliance
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
