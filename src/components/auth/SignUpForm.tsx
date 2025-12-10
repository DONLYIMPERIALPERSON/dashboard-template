"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    email: "",
    business_name: "",
    owner_first_name: "",
    owner_last_name: "",
    phone: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [isSettingUpPasskey, setIsSettingUpPasskey] = useState(false);

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.email.trim()) {
      setError("Please enter your email address");
      return;
    }
    if (!formData.business_name.trim()) {
      setError("Please enter your business name");
      return;
    }
    if (!formData.owner_first_name.trim()) {
      setError("Please enter your first name");
      return;
    }
    if (!formData.owner_last_name.trim()) {
      setError("Please enter your last name");
      return;
    }
    if (!formData.phone.trim()) {
      setError("Please enter your phone number");
      return;
    }
    if (!otp.trim() || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Call backend API for complete registration with OTP
      console.log("Completing registration for:", formData.email);

      // Send registration data as JSON body, OTP as query parameter
      const registerUrl = new URL('https://api.oyapasteaza.com/api/v1/auth/register');
      registerUrl.searchParams.append('otp', otp);

      const response = await fetch(registerUrl.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          business_name: formData.business_name,
          owner_first_name: formData.owner_first_name,
          owner_last_name: formData.owner_last_name,
          phone: formData.phone
        }),
      });

      if (!response.ok) {
        console.log('🔴 Starting error handling...');
        let errorMessage = 'Failed to complete registration';
        try {
          const errorData = await response.json();
          console.log('🔴 Registration error response:', errorData);
          console.log('🔴 Response status:', response.status);
          console.log('🔴 Error data type:', typeof errorData);
          console.log('🔴 Is array?', Array.isArray(errorData));

          // Handle different error response formats
          if (typeof errorData === 'string') {
            errorMessage = errorData;
          } else if (errorData.detail) {
            // Check if detail is an array (FastAPI validation errors)
            if (Array.isArray(errorData.detail)) {
              console.log('🔴 Detail is array:', errorData.detail);
              // Process the detail array like we do for the main array
              const extractedErrors = [];
              for (let i = 0; i < errorData.detail.length; i++) {
                const err = errorData.detail[i];
                console.log(`🔴 Processing detail error ${i}:`, err);

                if (typeof err === 'string') {
                  extractedErrors.push(err);
                } else if (err && typeof err === 'object') {
                  if (err.msg) {
                    extractedErrors.push(err.msg);
                  } else if (err.message) {
                    extractedErrors.push(err.message);
                  } else if (err.detail) {
                    extractedErrors.push(err.detail);
                  } else if (err.error) {
                    extractedErrors.push(err.error);
                  } else if (err.loc && err.msg) {
                    // Format location for better readability
                    let field = '';
                    if (Array.isArray(err.loc)) {
                      console.log(`🔴 Full loc array:`, err.loc);
                      // Remove 'body' prefix and join remaining parts
                      const relevantParts = err.loc.slice(1); // Skip 'body'
                      console.log(`🔴 Relevant parts:`, relevantParts);
                      field = relevantParts.join('.');
                      console.log(`🔴 Formatted field:`, field);
                    } else {
                      field = String(err.loc);
                    }
                    extractedErrors.push(`${field}: ${err.msg}`);
                  } else {
                    const keys = Object.keys(err);
                    console.log(`🔴 Detail error ${i} keys:`, keys);
                    for (const key of keys) {
                      if (typeof err[key] === 'string') {
                        extractedErrors.push(`${key}: ${err[key]}`);
                        break;
                      }
                    }
                    if (extractedErrors.length === 0) {
                      extractedErrors.push(JSON.stringify(err));
                    }
                  }
                } else {
                  extractedErrors.push(`Error ${i + 1}: ${String(err)}`);
                }
              }
              errorMessage = extractedErrors.join(', ');
            } else {
              // Detail is a string
              errorMessage = errorData.detail;
            }
          } else if (errorData.message) {
            errorMessage = errorData.message;
          } else if (errorData.error) {
            errorMessage = errorData.error;
          } else if (Array.isArray(errorData)) {
            console.log('🔴 Array error response:', errorData);
            console.log('🔴 First error object:', errorData[0]);
            console.log('🔴 Error object keys:', Object.keys(errorData[0] || {}));

            // Try to extract meaningful error messages from FastAPI validation errors
            const extractedErrors = [];
            for (let i = 0; i < errorData.length; i++) {
              const err = errorData[i];
              console.log(`🔴 Processing error ${i}:`, err);

              if (typeof err === 'string') {
                extractedErrors.push(err);
              } else if (err && typeof err === 'object') {
                // Check for common error field names
                if (err.msg) {
                  extractedErrors.push(err.msg);
                } else if (err.message) {
                  extractedErrors.push(err.message);
                } else if (err.detail) {
                  extractedErrors.push(err.detail);
                } else if (err.error) {
                  extractedErrors.push(err.error);
                } else if (err.loc && err.msg) {
                  // Field-specific error
                  const field = Array.isArray(err.loc) ? err.loc.join('.') : err.loc;
                  extractedErrors.push(`${field}: ${err.msg}`);
                } else {
                  // Try to get any string value from the error object
                  const keys = Object.keys(err);
                  console.log(`🔴 Error ${i} keys:`, keys);
                  for (const key of keys) {
                    if (typeof err[key] === 'string') {
                      extractedErrors.push(`${key}: ${err[key]}`);
                      break; // Use first string field found
                    }
                  }
                  // If no string field found, stringify the whole object
                  if (extractedErrors.length === 0) {
                    extractedErrors.push(JSON.stringify(err));
                  }
                }
              } else {
                extractedErrors.push(`Error ${i + 1}: ${String(err)}`);
              }
            }

            errorMessage = extractedErrors.join(', ');
          } else {
            console.log('🔴 Object error response:', errorData);
            console.log('🔴 Object keys:', Object.keys(errorData));
            errorMessage = JSON.stringify(errorData);
          }
        } catch (parseError) {
          console.error('🔴 Failed to parse error response:', parseError);
          errorMessage = `Request failed with status ${response.status}`;
        }

        console.log('🔴 Final error message:', errorMessage);
        throw new Error(errorMessage);
      }

      // Registration successful - proceed to mandatory passkey setup
      const result = await response.json();
      console.log("Registration successful:", result);

      // Show success message briefly, then start passkey setup
      setError("🎉 Registration successful! Setting up passkey for security...");
      setTimeout(() => {
        handlePasskeySignup();
      }, 2000);
    } catch (err) {
      console.error("Registration failed:", err);
      let errorMessage = "Failed to complete registration. Please try again.";

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'object' && err !== null) {
        // Handle API error responses - could be array or object
        const errorObj = err as any;

        if (Array.isArray(errorObj)) {
          // Handle array of validation errors
          errorMessage = errorObj.map((error: any) => {
            if (typeof error === 'string') return error;
            if (error.detail) return error.detail;
            if (error.message) return error.message;
            if (error.msg) return error.msg;
            return JSON.stringify(error);
          }).join(', ');
        } else if (errorObj.detail) {
          errorMessage = errorObj.detail;
        } else if (errorObj.message) {
          errorMessage = errorObj.message;
        } else if (errorObj.msg) {
          errorMessage = errorObj.msg;
        }
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasskeySignup = async () => {
    if (!navigator.credentials) {
      setError("WebAuthn is not supported in this browser");
      return;
    }

    setIsSettingUpPasskey(true);
    setError(null);

    try {
      // For new registrations, we need to initialize passkey registration with backend
      const initUrl = new URL('https://api.oyapasteaza.com/api/v1/auth/register/init');
      initUrl.searchParams.append('email', formData.email);

      const initResponse = await fetch(initUrl.toString(), {
        method: 'POST',
      });

      if (!initResponse.ok) {
        const errorData = await initResponse.json();
        throw new Error(errorData.detail || 'Failed to initialize passkey registration');
      }

      const initData = await initResponse.json();
      console.log("Init data received:", JSON.stringify(initData, null, 2));

      // Parse the registration_options JSON string
      const registrationOptions = JSON.parse(initData.registration_options);
      console.log("Parsed registration options:", registrationOptions);

      // Helper function to decode base64url
      const base64UrlDecode = (str: string) => {
        if (!str || typeof str !== 'string') {
          console.error("Invalid string for base64UrlDecode:", str);
          throw new Error("Invalid base64url string");
        }
        // Convert base64url to base64
        let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        // Add padding if needed
        while (base64.length % 4) {
          base64 += '=';
        }
        return atob(base64);
      };

      // Create WebAuthn credential
      const credential = await navigator.credentials.create({
        publicKey: {
          challenge: Uint8Array.from(base64UrlDecode(registrationOptions.challenge), (c: string) => c.charCodeAt(0)),
          rp: {
            name: registrationOptions.rp.name,
            id: registrationOptions.rp.id,
          },
          user: {
            id: Uint8Array.from(base64UrlDecode(registrationOptions.user.id), (c: string) => c.charCodeAt(0)),
            name: registrationOptions.user.name,
            displayName: registrationOptions.user.displayName,
          },
          pubKeyCredParams: registrationOptions.pubKeyCredParams,
          authenticatorSelection: registrationOptions.authenticatorSelection,
          timeout: registrationOptions.timeout,
        },
      }) as PublicKeyCredential;

      if (credential) {
        // Complete passkey registration with backend
        const completeResponse = await fetch('https://api.oyapasteaza.com/api/v1/auth/register/complete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: formData.email,
            credential: {
              id: credential.id,
              rawId: Array.from(new Uint8Array(credential.rawId)),
              type: credential.type,
              response: {
                clientDataJSON: Array.from(new Uint8Array(credential.response.clientDataJSON)),
                attestationObject: Array.from(new Uint8Array((credential.response as AuthenticatorAttestationResponse).attestationObject)),
              },
            },
          }),
        });

        if (!completeResponse.ok) {
          const errorData = await completeResponse.json();
          throw new Error(errorData.detail || 'Failed to complete passkey registration');
        }

        const result = await completeResponse.json();
        console.log("Passkey registration successful:", result);

        // Success - redirect to dashboard
        setError("✅ Passkey registered successfully! Welcome to Pasteaza Business.");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    } catch (err) {
      console.error("Passkey registration failed:", err);
      if (err instanceof DOMException && err.name === "NotAllowedError") {
        setError("Passkey registration was cancelled.");
      } else {
        setError(err instanceof Error ? err.message : "Failed to register passkey. Please try again.");
      }
    } finally {
      setIsSettingUpPasskey(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSendOTP = async () => {
    if (!formData.email.trim()) {
      setError("Please enter your email address first");
      return;
    }

    setIsSendingOTP(true);
    setError(null);

    try {
      // Call backend API to send OTP
      console.log("Sending OTP to:", formData.email);
      const response = await fetch('https://api.oyapasteaza.com/api/v1/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to send OTP');
      }

      const result = await response.json();
      console.log("OTP send response:", result);

      // Show OTP input field
      setShowOTPInput(true);
      setError("✅ OTP sent successfully! Please check your email and enter the 6-digit code below.");
    } catch (err) {
      console.error("OTP send failed:", err);
      setError(`❌ Failed to send OTP: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsSendingOTP(false);
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
            Create account
          </h1>
        </div>
        <form onSubmit={handleContinue} className="space-y-4">
          {error && (
            <div className="p-4 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <div>
            <label className="block mb-2 text-sm font-medium text-black">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 pr-24 text-base border border-[#26A69A] rounded-3xl focus:ring-2 focus:ring-[#26A69A] focus:border-[#26A69A] bg-white text-black placeholder-gray-500 transition-colors"
                required
              />
              <button
                type="button"
                onClick={handleSendOTP}
                disabled={!formData.email.trim() || isSendingOTP}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-medium text-white bg-[#26A69A] rounded-2xl hover:bg-[#26A69A]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSendingOTP ? 'Sending...' : 'Send OTP'}
              </button>
            </div>
          </div>

          {showOTPInput && (
            <div>
              <label className="block mb-2 text-sm font-medium text-black">
                OTP Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                className="w-full px-4 py-3 text-base border border-[#26A69A] rounded-3xl focus:ring-2 focus:ring-[#26A69A] focus:border-[#26A69A] bg-white text-black placeholder-gray-500 transition-colors text-center tracking-widest"
                required
              />
            </div>
          )}

          <div>
            <label className="block mb-2 text-sm font-medium text-black">
              Business Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.business_name}
              onChange={(e) => handleInputChange('business_name', e.target.value)}
              placeholder="Enter your business name"
              className="w-full px-4 py-3 text-base border border-[#26A69A] rounded-3xl focus:ring-2 focus:ring-[#26A69A] focus:border-[#26A69A] bg-white text-black placeholder-gray-500 transition-colors"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-black">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.owner_first_name}
                onChange={(e) => handleInputChange('owner_first_name', e.target.value)}
                placeholder="First name"
                className="w-full px-4 py-3 text-base border border-[#26A69A] rounded-3xl focus:ring-2 focus:ring-[#26A69A] focus:border-[#26A69A] bg-white text-black placeholder-gray-500 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-black">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.owner_last_name}
                onChange={(e) => handleInputChange('owner_last_name', e.target.value)}
                placeholder="Last name"
                className="w-full px-4 py-3 text-base border border-[#26A69A] rounded-3xl focus:ring-2 focus:ring-[#26A69A] focus:border-[#26A69A] bg-white text-black placeholder-gray-500 transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-black">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base text-black font-medium">
                +234
              </span>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="8031234567"
                className="w-full pl-16 pr-4 py-3 text-base border border-[#26A69A] rounded-3xl focus:ring-2 focus:ring-[#26A69A] focus:border-[#26A69A] bg-white text-black placeholder-gray-500 transition-colors"
                required
              />
            </div>
          </div>

          {!registrationComplete && (
            <>
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
                    Creating Account...
                  </>
                ) : (
                  "Continue"
                )}
              </button>

              <div className="text-left">
                <p className="text-sm text-gray-600">
                  You'll be prompted to create a passkey after registration
                </p>
              </div>
            </>
          )}

          {registrationComplete && (
            <div className="space-y-3">
              <p className="text-sm text-center text-gray-600 mb-4">
                🔐 Passkey registration is required for account security
              </p>
              <button
                type="button"
                onClick={handlePasskeySignup}
                disabled={isSettingUpPasskey}
                className="flex items-center justify-center w-full gap-3 px-6 py-3 text-base font-medium text-white transition-all rounded-3xl bg-[#26A69A] shadow-lg hover:bg-[#26A69A]/90 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl"
              >
                {isSettingUpPasskey ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Setting up Passkey...
                  </>
                ) : (
                  <>
                    🔐 Register Passkey (Required)
                  </>
                )}
              </button>
            </div>
          )}
        </form>

        <div className="mt-8">
          <p className="text-base font-normal text-center text-black sm:text-start">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-[#26A69A] hover:text-[#26A69A]/80 font-medium ml-1 transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
