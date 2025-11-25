import RegisterForm from "@/components/auth/RegisterForm/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WDI - Register",
  description: "Sign Up now, Fill in your details to get started!",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
