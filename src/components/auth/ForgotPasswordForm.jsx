import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Mail, Send, Globe2, ChevronDown, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError("กรุณากรอกอีเมล");
      return;
    }
    if (!emailRe.test(email)) {
      setError("รูปแบบอีเมลไม่ถูกต้อง");
      return;
    }
    setError("");
    setSent(true);
  };

  return (
    <div className="login-wrap">
      <div className="language">
        <Globe2 size={18} />
        <span>TH</span>
        <ChevronDown size={16} />
      </div>

      <div className="login-card">
        <Link to="/login" className="back-link">
          <ArrowLeft size={18} />
          กลับไปหน้าเข้าสู่ระบบ
        </Link>

        {sent ? (
          <div className="forgot-success">
            <CheckCircle2 size={56} color="#2e9e5b" />
            <h2>ส่งลิงก์เรียบร้อยแล้ว</h2>
            <p>ระบบได้ส่งลิงก์สำหรับรีเซ็ตรหัสผ่านไปยังอีเมลของคุณแล้ว กรุณาตรวจสอบอีเมล หรือติดต่อผู้ดูแลระบบหากไม่ได้รับ</p>
            <Link to="/login" className="login-button forgot-back">
              <span>กลับหน้าเข้าสู่ระบบ</span>
              <ArrowRight size={21} />
            </Link>
          </div>
        ) : (
          <div className="welcome">
            <h2>ลืมรหัสผ่าน?</h2>
            <p>กรอกอีเมลที่ใช้สมัครใช้งาน ระบบจะส่งลิงก์รีเซ็ตรหัสผ่านให้คุณ</p>
          </div>
        )}

        {!sent && (
          <form onSubmit={submit}>
            <label className={`input-box ${error ? "input-error" : ""}`}>
              <Mail size={22} />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="อีเมลของคุณ"
                autoComplete="email"
              />
            </label>
            {error && <span className="field-error">{error}</span>}

            <button className="login-button" type="submit">
              <span>ส่งลิงก์รีเซ็ตรหัสผ่าน</span>
              <Send size={21} />
            </button>
          </form>
        )}
      </div>

      <div className="copyright">© 2026 JpkStartupProject. All rights reserved.</div>
    </div>
  );
}