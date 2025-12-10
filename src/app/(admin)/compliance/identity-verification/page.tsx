"use client";
import { useState } from "react";
import { CheckCircleIcon, CloseLineIcon, LockIcon } from "@/icons";

export default function IdentityVerificationPage() {
  const [verificationType, setVerificationType] = useState<"bvn" | "nin" | null>(null);
  const [identityNumber, setIdentityNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationStatus, setVerificationStatus] = useState<"not_started" | "initiated" | "verified" | "failed">("not_started");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock verification data - in real app, this would come from API
  const mockVerificationData = {
    status: "not_started", // "not_started", "initiated", "verified", "failed"
    verified: false,
    fullName: null,
    dateOfBirth: null,
    phoneNumber: null,
    email: null,
    residentialAddress: null,
    verifiedAt: null
  };

  const handleInitiateVerification = async () => {
    if (!verificationType || !identityNumber) {
      alert("Please select verification type and enter your identity number");
      return;
    }

    setLoading(true);

    try {
      // In real app, this would call the API
      // const response = await fetch('/api/identity/initiate', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     type: verificationType.toUpperCase(),
      //     number: identityNumber
      //   })
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setVerificationStatus("initiated");
      setShowOtpForm(true);
      alert("OTP sent to your registered phone number. Please check your phone.");

    } catch (error) {
      console.error("Verification initiation failed:", error);
      alert("Failed to initiate verification. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);

    try {
      // In real app, this would call the API to verify OTP
      // const response = await fetch('/api/identity/verify-otp', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ otp })
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setVerificationStatus("verified");
      setShowOtpForm(false);
      alert("Identity verification completed successfully!");

    } catch (error) {
      console.error("OTP verification failed:", error);
      setVerificationStatus("failed");
      alert("OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircleIcon className="w-6 h-6 text-green-600" />;
      case "initiated":
        return <LockIcon className="w-6 h-6 text-yellow-600" />;
      case "failed":
        return <CloseLineIcon className="w-6 h-6 text-red-600" />;
      default:
        return <CloseLineIcon className="w-6 h-6 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "text-green-600 bg-green-100 dark:bg-green-900/20";
      case "initiated":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20";
      case "failed":
        return "text-red-600 bg-red-100 dark:bg-red-900/20";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "verified":
        return "Verified";
      case "initiated":
        return "OTP Sent";
      case "failed":
        return "Failed";
      default:
        return "Not Started";
    }
  };

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5 lg:mb-7">
          <CheckCircleIcon className="w-8 h-8 text-gray-700 dark:text-gray-300" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Identity Verification
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Verify your identity using BVN or NIN for compliance
            </p>
          </div>
        </div>

        {/* Verification Status */}
        <div className="mb-8">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Verification Status
                </h4>
                <div className="flex items-center gap-3">
                  {getStatusIcon(verificationStatus)}
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(verificationStatus)}`}>
                    {getStatusText(verificationStatus)}
                  </span>
                </div>
                {verificationStatus === "verified" && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    ✅ Your identity has been successfully verified
                  </p>
                )}
                {verificationStatus === "initiated" && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    📱 Please check your phone for OTP to complete verification
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Verification Types */}
        {verificationStatus === "not_started" && (
          <div className="mb-8">
            <h4 className="text-base font-medium text-gray-900 dark:text-white mb-4">
              Choose Verification Method
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* BVN Verification */}
              <div
                onClick={() => setVerificationType("bvn")}
                className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                  verificationType === "bvn"
                    ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircleIcon className="w-6 h-6 text-gray-600" />
                  <h5 className="font-medium text-gray-900 dark:text-white">
                    BVN Verification
                  </h5>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Verify using your Bank Verification Number (BVN)
                </p>
                <ul className="text-xs text-gray-500 dark:text-gray-400 mt-3 space-y-1">
                  <li>• 11-digit BVN number required</li>
                  <li>• OTP sent to registered phone</li>
                  <li>• Instant verification</li>
                </ul>
              </div>

              {/* NIN Verification */}
              <div
                onClick={() => setVerificationType("nin")}
                className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                  verificationType === "nin"
                    ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircleIcon className="w-6 h-6 text-gray-600" />
                  <h5 className="font-medium text-gray-900 dark:text-white">
                    NIN Verification
                  </h5>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Verify using your National Identification Number (NIN)
                </p>
                <ul className="text-xs text-gray-500 dark:text-gray-400 mt-3 space-y-1">
                  <li>• 11-digit NIN number required</li>
                  <li>• OTP sent to registered phone</li>
                  <li>• Instant verification</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Identity Number Input */}
        {verificationType && verificationStatus === "not_started" && (
          <div className="mb-8">
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                Enter {verificationType.toUpperCase()} Details
              </h4>
              <div className="max-w-md">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {verificationType.toUpperCase()} Number
                </label>
                <input
                  type="text"
                  value={identityNumber}
                  onChange={(e) => setIdentityNumber(e.target.value)}
                  placeholder={`Enter your ${verificationType.toUpperCase()} number`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  maxLength={11}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Enter your 11-digit {verificationType.toUpperCase()} number
                </p>
              </div>
              <div className="mt-6">
                <button
                  onClick={handleInitiateVerification}
                  disabled={loading || !identityNumber}
                  className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Initiating..." : `Verify with ${verificationType.toUpperCase()}`}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* OTP Verification */}
        {showOtpForm && verificationStatus === "initiated" && (
          <div className="mb-8">
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                Enter OTP
              </h4>
              <div className="max-w-md">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  One-Time Password
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit OTP"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-center text-lg tracking-widest"
                  maxLength={6}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Enter the 6-digit code sent to your registered phone number
                </p>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleVerifyOtp}
                  disabled={loading || otp.length !== 6}
                  className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
                <button
                  onClick={() => {
                    setShowOtpForm(false);
                    setVerificationStatus("not_started");
                    setOtp("");
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Verification Details */}
        {verificationStatus === "verified" && (
          <div className="mb-8">
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                Verified Identity Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <p className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded">
                    {mockVerificationData.fullName || "John Doe"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date of Birth
                  </label>
                  <p className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded">
                    {mockVerificationData.dateOfBirth || "1990-01-01"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <p className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded">
                    {mockVerificationData.phoneNumber || "+2348012345678"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <p className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded">
                    {mockVerificationData.email || "john@example.com"}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Residential Address
                  </label>
                  <p className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded">
                    {mockVerificationData.residentialAddress || "123 Main Street, Lagos, Nigeria"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Important Notes */}
        <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-start gap-3">
            <CloseLineIcon className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <h5 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                Important Information
              </h5>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                <li>• Identity verification requires a small fee that will be deducted from your wallet</li>
                <li>• OTP will be sent to the phone number registered with your {verificationType?.toUpperCase()}</li>
                <li>• Your personal information is securely encrypted and stored</li>
                <li>• Verification is required before you can submit compliance documents</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
