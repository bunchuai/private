import { useEffect, useState } from "react";
import { FileText, Users, BarChart3, ClipboardCheck, TrendingUp } from "lucide-react";
import WeatherWidget from "../../components/common/WeatherWidget";

const STATS = [
  { label: "เอกสารทั้งหมด", value: "1,284", sub: "+12% จากเดือนที่แล้ว", icon: <FileText size={22} />, cls: "blue" },
  { label: "พนักงานทั้งหมด", value: "356", sub: "+8 คนใหม่", icon: <Users size={22} />, cls: "green" },
  { label: "รายงานปีนี้", value: "96", sub: "สำเร็จ 92%", icon: <BarChart3 size={22} />, cls: "orange" },
  { label: "งานรออนุมัติ", value: "23", sub: "ด่วน 5 รายการ", icon: <ClipboardCheck size={22} />, cls: "red" },
];

const ACTIVITIES = [
  { title: "อัปโหลดเอกสารสัญญา #1142", meta: "ฝ่ายจัดซื้อ • เมื่อ 10 นาทีที่แล้ว" },
  { title: "อนุมัติรายงานค่าใช้จ่าย", meta: "ฝ่ายการเงิน • เมื่อ 45 นาทีที่แล้ว" },
  { title: "เพิ่มพนักงานใหม่ 3 ราย", meta: "ฝ่ายทรัพยากรบุคคล • เมื่อ 2 ชั่วโมงที่แล้ว" },
  { title: "ส่งรายงานประจำไตรมาส", meta: "ฝ่ายขาย • เมื่อ 5 ชั่วโมงที่แล้ว" },
  { title: "แก้ไขข้อมูลเอกสาร #1056", meta: "ฝ่ายปฏิบัติการ • เมื่อ 1 วันที่แล้ว" },
];

const RECENT_DOCS = [
  { no: "DOC-1142", name: "สัญญาจ้างเหมา", dept: "จัดซื้อ", date: "11/09/2026", status: "ส่งแล้ว" },
  { no: "DOC-1141", name: "ใบเสนอราคา", dept: "ขาย", date: "10/09/2026", status: "อนุมัติ" },
  { no: "DOC-1140", name: "เอกสารเบิกจ่าย", dept: "การเงิน", date: "09/09/2026", status: "อนุมัติ" },
  { no: "DOC-1139", name: "บันทึกการประชุม", dept: "เลขานุการ", date: "08/09/2026", status: "รอดำเนินการ" },
  { no: "DOC-1138", name: "รายงานการฝึกอบรม", dept: "ทรัพยากรบุคคล", date: "07/09/2026", status: "อนุมัติ" },
];

export default function Overview() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="dash-section">
        <div className="welcome-bar skeleton-block" style={{ height: 84 }} />
        <div className="stat-row">
          {[0, 1, 2, 3].map((i) => (
            <div className="stat-card skeleton-block" key={i} style={{ height: 88 }} />
          ))}
        </div>
        <div className="weather-card skeleton-block" style={{ height: 250, marginBottom: 18 }} />
        <div className="dash-grid">
          <div className="dash-card">
            <div className="dash-card-head"><div className="skeleton-block" style={{ height: 18, width: 140, borderRadius: 8 }} /></div>
            {[0, 1, 2, 3, 4].map((i) => <div key={i} className="skeleton-line" />)}
          </div>
          <div className="dash-card">
            <div className="dash-card-head"><div className="skeleton-block" style={{ height: 18, width: 140, borderRadius: 8 }} /></div>
            {[0, 1, 2, 3, 4].map((i) => <div key={i} className="skeleton-line" />)}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="dash-section fade-in">
      <div className="welcome-bar">
        <h2>ยินดีต้อนรับกลับ, อธิวัฒน์</h2>
        <p>วันนี้คุณมีงานรออนุมัติ 23 รายการและเอกสารใหม่ 12 ชุด</p>
      </div>

      <div className="stat-row">
        {STATS.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className={`stat-icon ${s.cls}`}>{s.icon}</div>
            <div>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
              <small>{s.sub}</small>
            </div>
          </div>
        ))}
      </div>

      <WeatherWidget />

      <div className="dash-grid">
        <div className="dash-card">
          <div className="dash-card-head">
            <h3>กิจกรรมล่าสุด</h3>
            <span className="live"><i />อัปเดตสด</span>
          </div>
          <ul className="activity-list">
            {ACTIVITIES.map((a) => (
              <li key={a.title}>
                <div className="activity-dot" />
                <div>
                  <strong>{a.title}</strong>
                  <span>{a.meta}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="dash-card">
          <div className="dash-card-head">
            <h3>เอกสารล่าสุด</h3>
            <TrendingUp size={19} />
          </div>
          <table className="doc-table">
            <thead>
              <tr>
                <th>เลขที่</th>
                <th>ชื่อเอกสาร</th>
                <th>แผนก</th>
                <th>สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_DOCS.map((d) => (
                <tr key={d.no}>
                  <td>{d.no}</td>
                  <td>{d.name}</td>
                  <td>{d.dept}</td>
                  <td><span className={`badge ${d.status === "อนุมัติ" ? "ok" : d.status === "ส่งแล้ว" ? "sent" : "pending"}`}>{d.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}