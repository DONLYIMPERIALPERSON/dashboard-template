import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pasteaza | Signup",
  description: "Create your account with passkey authentication for secure access to Pasteaza",
  // other metadata
};

export default function SignUp() {
  return <SignUpForm />;
}
