import { useState } from "react";
import { Save, Shield, Bell, Building2 } from "lucide-react";

export default function Settings() {
  const [company, setCompany] = useState("JPK solution & technology");
  const [lang, setLang] = useState("th");
  const [notif, setNotif] = useState(true);

  return (
    <div className="dash-section">
      <div className="settings-grid">
        <div className="dash-card">
          <div className="dash-card-head">
            <h3><Building2 size={19} />ข้อมูลองค์กร</h3>
          </div>
          <label className="field">
            <span>ชื่อองค์กร</span>
            <input value={company} onChange={(e) => setCompany(e.target.value)} />
          </label>
          <label className="field">
            <span>ภาษาเริ่มต้น</span>
            <select value={lang} onChange={(e) => setLang(e.target.value)} className="select-box">
              <option value="th">ไทย</option>
              <option value="en">English</option>
            </select>
          </label>
        </div>

        <div className="dash-card">
          <div className="dash-card-head">
            <h3><Bell size={19} />การแจ้งเตือน</h3>
          </div>
          <label className="toggle-row">
            <div>
              <strong>แจ้งเตือนทางอีเมล</strong>
              <span>รับอีเมลเมื่อมีเอกสารใหม่หรือรออนุมัติ</span>
            </div>
            <input type="checkbox" checked={notif} onChange={(e) => setNotif(e.target.checked)} />
          </label>
          <label className="field">
            <span>อีเมลรับการแจ้งเตือน</span>
            <input placeholder="admin@jpksolution.co.th" />
          </label>
        </div>

        <div className="dash-card">
          <div className="dash-card-head">
            <h3><Shield size={19} />ความปลอดภัย</h3>
          </div>
          <div className="security-row">
            <div>
              <strong>เปลี่ยนรหัสผ่าน</strong>
              <span>อัปเดตรหัสผ่านของคุณเป็นประจำ</span>
            </div>
            <button className="ghost-btn">เปลี่ยน</button>
          </div>
          <div className="security-row">
            <div>
              <strong>ยืนยันตัวตนสองขั้นตอน (2FA)</strong>
              <span>เพิ่มความปลอดภัยในการเข้าสู่ระบบ</span>
            </div>
            <span className="badge ok">เปิดใช้งาน</span>
          </div>
        </div>
      </div>

      <div className="save-bar">
        <button className="primary-btn"><Save size={18} />บันทึกการตั้งค่า</button>
      </div>
    </div>
  );
}