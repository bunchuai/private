import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  UserRound,
  Globe2,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login, user } = useAuth();

  if (user) return <Navigate to="/dashboard" replace />;

  const validate = () => {
    const errs = {};
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.username.trim()) {
      errs.username = "กรุณากรอกอีเมล";
    } else if (!emailRe.test(form.username)) {
      errs.username = "รูปแบบอีเมลไม่ถูกต้อง";
    }
    if (!form.password) {
      errs.password = "กรุณากรอกรหัสผ่าน";
    } else if (form.password.length < 8) {
      errs.password = "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร";
    } else if (!/[a-z]/.test(form.password) || !/[A-Z]/.test(form.password)) {
      errs.password = "รหัสผ่านต้องมีตัวพิมพ์ใหญ่และตัวพิมพ์เล็ก";
    } else if (!/\d/.test(form.password)) {
      errs.password = "รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว";
    }
    return errs;
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    login(form.username, "ผู้ใช้งาน", remember);
    navigate("/dashboard");
  };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="welcome">
          <h2>ยินดีต้อนรับ</h2>
          <p>กรุณาเข้าสู่ระบบเพื่อใช้งาน</p>
        </div>

        <form onSubmit={submit}>
          <label
            className={`input-box ${errors.username ? "input-error" : ""}`}
          >
            <UserRound size={22} />
            <input
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="อีเมล"
              autoComplete="username"
            />
          </label>
          {errors.username && (
            <span className="field-error">{errors.username}</span>
          )}

          <label
            className={`input-box ${errors.password ? "input-error" : ""}`}
          >
            <LockKeyhole size={22} />
            <input
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="รหัสผ่าน"
              autoComplete="current-password"
            />
            <button
              type="button"
              className="icon-button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="แสดงรหัสผ่าน"
            >
              {showPassword ? <EyeOff size={21} /> : <Eye size={21} />}
            </button>
          </label>
          {errors.password && (
            <span className="field-error">{errors.password}</span>
          )}

          <div className="form-options">
            <label className="remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span className="checkmark">✓</span>
              จดจำฉันไว้ในระบบ
            </label>
            <Link to="/forgot-password" className="link-button">
              ลืมรหัสผ่าน?
            </Link>
          </div>

          <button className="login-button" type="submit">
            <span>เข้าสู่ระบบ</span>
            <ArrowRight size={21} />
          </button>
        </form>

        <div className="divider">
          <span>หรือ</span>
        </div>

        <button className="microsoft-button" type="button">
          <span className="ms-logo">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </span>
          <span>เข้าสู่ระบบด้วย Microsoft</span>
        </button>

        <p className="admin-help">ยังไม่มีบัญชี? ติดต่อผู้ดูแลระบบ</p>
      </div>

      <div className="copyright">© 2026 JpkStartupProject. All rights reserved.</div>
    </div>
  );
}
