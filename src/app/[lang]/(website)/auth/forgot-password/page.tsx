import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm/ForgotPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WDI - Forget Password",
};

export default function ForgetPasswordPage() {
  return <ForgotPasswordForm />;
}
