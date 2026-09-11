import { useEffect, useState } from "react";
import { BarChart4, Download } from "lucide-react";

const BARS = [42, 68, 55, 90, 74, 82, 60, 95, 78, 66, 88, 71];
const MONTHS = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];

export default function Reports() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="dash-section">
        <div className="page-head"><div className="skeleton-block" style={{ width: 200, height: 42 }} /></div>
        <div className="dash-card">
          <div className="dash-card-head"><div className="skeleton-block" style={{ width: 220, height: 24 }} /></div>
          <div className="barchart">
            {BARS.map((v, i) => (
              <div className="bar-col" key={i}>
                <div className="skeleton-block bar-track" style={{ height: `${v}%`, width: 26 }} />
              </div>
            ))}
          </div>
        </div>
        <div className="report-grid">
          {[1, 2].map((n) => (
            <div className="dash-card" key={n}>
              <div className="dash-card-head"><div className="skeleton-block" style={{ width: 140, height: 24 }} /></div>
              <div className="skeleton-line" style={{ width: "90%" }} />
              <div className="skeleton-line" style={{ width: "70%" }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="dash-section fade-in">
      <div className="page-head">
        <button className="primary-btn"><Download size={18} />ดาวน์โหลดรายงาน</button>
        <select className="select-box">
          <option>ปี 2569</option>
          <option>ปี 2568</option>
        </select>
      </div>

      <div className="dash-card">
        <div className="dash-card-head">
          <h3>สรุปเอกสารรายเดือน</h3>
          <span className="card-sub">หน่วย: จำนวนชุด</span>
        </div>
        <div className="barchart">
          {BARS.map((v, i) => (
            <div className="bar-col" key={i}>
              <span className="bar-value">{v}</span>
              <div className="bar-track"><div className={`bar-fill ${v > 85 ? "hot" : ""}`} style={{ height: `${v}%` }} /></div>
              <span className="bar-label">{MONTHS[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="report-grid">
        <div className="dash-card">
          <div className="dash-card-head">
            <h3>ตามสถานะ</h3>
            <BarChart4 size={18} />
          </div>
          <div className="legend-list">
            <div className="legend-item"><i className="dot ok" /><span>อนุมัติ</span><strong>884</strong></div>
            <div className="legend-item"><i className="dot sent" /><span>ส่งแล้ว</span><strong>212</strong></div>
            <div className="legend-item"><i className="dot pending" /><span>รอดำเนินการ</span><strong>188</strong></div>
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-head">
            <h3>ตามแผนก</h3>
            <BarChart4 size={18} />
          </div>
          <div className="legend-list">
            <div className="legend-item"><i className="dot dept1" /><span>การเงิน</span><strong>312</strong></div>
            <div className="legend-item"><i className="dot dept2" /><span>จัดซื้อ</span><strong>278</strong></div>
            <div className="legend-item"><i className="dot dept3" /><span>ขาย</span><strong>244</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}