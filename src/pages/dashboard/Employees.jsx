import { useEffect, useState } from "react";
import { Search, Plus, Phone, Mail } from "lucide-react";

const EMPLOYEES = [
  { name: "อธิวัฒน์ คงดี", role: "ผู้ดูแลระบบ", dept: "การเงิน", email: "athi@jpksolution.co.th", phone: "081-234-5678", status: "ทำงาน" },
  { name: "ณัฐทิชา วงศ์สุวรรณ", role: "หัวหน้าฝ่ายขาย", dept: "ขาย", email: "natticha@jpksolution.co.th", phone: "082-345-6789", status: "ทำงาน" },
  { name: "ธนกร พิชิตชัย", role: "วิศวกรระบบ", dept: "เทคโนโลยี", email: "thanakorn@jpksolution.co.th", phone: "083-456-7890", status: "ทำงาน" },
  { name: "สุภาวดี แก้วใส", role: "เจ้าหน้าที่จัดซื้อ", dept: "จัดซื้อ", email: "supawadee@jpksolution.co.th", phone: "084-567-8901", status: "ลางาน" },
  { name: "กิตติพงศ์ เรืองศรี", role: "นักบัญชี", dept: "การเงิน", email: "kittiphong@jpksolution.co.th", phone: "085-678-9012", status: "ทำงาน" },
  { name: "พัชรินทร์ บุญมา", role: "เลขานุการผู้บริหาร", dept: "เลขานุการ", email: "patcharin@jpksolution.co.th", phone: "086-789-0123", status: "ทำงาน" },
  { name: "วีรพล แสนเมือง", role: "ช่างซ่อมบำรุง", dept: "ปฏิบัติการ", email: "veerapol@jpksolution.co.th", phone: "087-890-1234", status: "หยุดงาน" },
];

export default function Employees() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="dash-section">
        <div className="page-head"><div className="skeleton-block" style={{ width: 180, height: 42 }} /></div>
        <div className="dash-card">
          <div className="dash-card-head"><div className="skeleton-block" style={{ width: 220, height: 24 }} /></div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="skeleton-line" style={{ width: `${90 - i * 6}%` }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="dash-section fade-in">
      <div className="page-head">
        <button className="primary-btn"><Plus size={18} />เพิ่มพนักงาน</button>
        <div className="search-box">
          <Search size={18} />
          <input placeholder="ค้นหาพนักงาน..." />
        </div>
      </div>

      <div className="dash-card">
        <div className="dash-card-head">
          <h3>รายชื่อพนักงาน ({EMPLOYEES.length})</h3>
          <span className="card-sub">ทั้งหมด 356 คน</span>
        </div>
        <table className="doc-table">
          <thead>
            <tr>
              <th>พนักงาน</th>
              <th>ตำแหน่ง</th>
              <th>แผนก</th>
              <th>ติดต่อ</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {EMPLOYEES.map((e) => (
              <tr key={e.email}>
                <td>
                  <span className="emp-cell">
                    <span className="avatar avatar-sm">{e.name.charAt(0)}</span>
                    <div>
                      <strong>{e.name}</strong>
                      <small>{e.email}</small>
                    </div>
                  </span>
                </td>
                <td>{e.role}</td>
                <td>{e.dept}</td>
                <td>
                  <span className="contact-cell"><Phone size={13} />{e.phone}<Mail size={13} style={{ marginLeft: 10 }} /></span>
                </td>
                <td>
                  <span className={`badge ${e.status === "ทำงาน" ? "ok" : e.status === "ลางาน" ? "sent" : "pending"}`}>{e.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}