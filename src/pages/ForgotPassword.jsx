import BrandPanel from "../components/auth/BrandPanel";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";

export default function ForgotPassword() {
  return (
    <main className="login-page">
      <BrandPanel />
      <ForgotPasswordForm />
    </main>
  );
}