import LoginForm from "@/components/auth/LoginForm/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata ={
  title: "IMAGINO - Login",
  description: "Welcome Back, Sign in to your account Now!"
}
export default function LoginPage() {
  return <LoginForm />;
}
