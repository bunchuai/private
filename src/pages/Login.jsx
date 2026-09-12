import BrandPanel from "../components/auth/BrandPanel";
import LoginForm from "../components/auth/LoginForm";

export default function Login() {
  return (
    <main className="login-page">
      <BrandPanel />
      <LoginForm />
    </main>
  );
}