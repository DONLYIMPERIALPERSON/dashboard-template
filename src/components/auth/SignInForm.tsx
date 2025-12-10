"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login, isLoading } = useAuth();

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    setError(null);

    try {
      await login(email);
      // Redirect happens automatically in the auth context on success
    } catch (err) {
      console.error("Authentication failed:", err);
      if (err instanceof DOMException && err.name === "NotAllowedError") {
        setError("Authentication was cancelled or no passkey found. Please register a passkey first.");
      } else {
        setError(err instanceof Error ? err.message : "Failed to authenticate. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto py-12">
      <div className="flex justify-center mb-8">
        <Image
          width={140}
          height={56}
          src="/images/rectangle-logo.png"
          alt="Pasteaza Logo"
          className="object-contain"
        />
      </div>
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <div className="mb-8 sm:mb-12">
          <h1 className="mb-4 font-semibold text-black text-xl sm:text-2xl text-center uppercase">
            Sign in to your account
          </h1>
        </div>
        <form onSubmit={handleContinue} className="space-y-6">
          {error && (
            <div className="p-4 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <div>
            <label className="block mb-3 text-sm font-medium text-black">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 text-base border border-[#26A69A] rounded-3xl focus:ring-2 focus:ring-[#26A69A] focus:border-[#26A69A] bg-white text-black placeholder-gray-500 transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center w-full gap-3 px-6 py-3 text-base font-medium text-white transition-all rounded-3xl bg-[#26A69A] shadow-lg hover:bg-[#26A69A]/90 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl"
          >
            {isLoading ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Authenticating...
              </>
            ) : (
              "Continue"
            )}
          </button>

        </form>

        <div className="mt-8">
          <p className="text-base font-normal text-center text-black">
            New to Pasteaza Business?{" "}
            <Link
              href="/signup"
              className="text-[#26A69A] hover:text-[#26A69A]/80 font-medium transition-colors"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
