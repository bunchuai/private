import { useState } from "react";
import { Search, Plus, FileText, Download, X } from "lucide-react";

const initialDocs = [
  { no: "DOC-1142", name: "สัญญาจ้างเหมาก่อสร้าง", dept: "จัดซื้อ", date: "11/09/2026", status: "ส่งแล้ว" },
  { no: "DOC-1141", name: "ใบเสนอราคา ฉบับที่ 3", dept: "ขาย", date: "10/09/2026", status: "อนุมัติ" },
  { no: "DOC-1140", name: "เอกสารเบิกจ่ายเงินเดือน", dept: "การเงิน", date: "09/09/2026", status: "อนุมัติ" },
  { no: "DOC-1139", name: "บันทึกการประชุมกรรมการ", dept: "เลขานุการ", date: "08/09/2026", status: "รอดำเนินการ" },
  { no: "DOC-1138", name: "รายงานการฝึกอบรม 2/69", dept: "ทรัพยากรบุคคล", date: "07/09/2026", status: "อนุมัติ" },
  { no: "DOC-1137", name: "คำสั่งซื้อสินค้า PO-884", dept: "จัดซื้อ", date: "06/09/2026", status: "ส่งแล้ว" },
  { no: "DOC-1136", name: "สัญญาประกันภัยนิติบุคคล", dept: "การเงิน", date: "05/09/2026", status: "รอดำเนินการ" },
  { no: "DOC-1135", name: "รายงานการซ่อมบำรุงเครื่องจักร", dept: "ปฏิบัติการ", date: "04/09/2026", status: "อนุมัติ" },
];

const DEPTS = ["จัดซื้อ", "ขาย", "การเงิน", "เลขานุการ", "ทรัพยากรบุคคล", "ปฏิบัติการ"];

const nextDocNo = (docs) => {
  const max = docs.reduce((m, d) => {
    const n = Number(d.no.replace("DOC-", ""));
    return Number.isFinite(n) && n > m ? n : m;
  }, 0);
  return `DOC-${max + 1}`;
};

export default function Documents() {
  const [docs, setDocs] = useState(initialDocs);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ no: nextDocNo(initialDocs), name: "", dept: DEPTS[0], date: "" });

  const today = () => new Date().toLocaleDateString("en-GB").split("/").reverse().map((p) => p.padStart(2, "0")).join("/");

  const openForm = () => {
    setForm({ no: nextDocNo(docs), name: "", dept: DEPTS[0], date: today() });
    setError("");
    setOpen(true);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("กรุณากรอกชื่อเอกสาร");
      return;
    }
    setDocs([{ ...form, name: form.name.trim(), status: "รอดำเนินการ" }, ...docs]);
    setOpen(false);
  };

  const filtered = docs.filter(
    (d) =>
      d.name.toLowerCase().includes(search.trim().toLowerCase()) ||
      d.no.toLowerCase().includes(search.trim().toLowerCase()) ||
      d.dept.includes(search.trim())
  );

  return (
    <div className="dash-section">
      <div className="page-head">
        <button className="primary-btn" onClick={openForm}><Plus size={18} />สร้างเอกสาร</button>
        <div className="search-box">
          <Search size={18} />
          <input placeholder="ค้นหาเอกสาร..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="dash-card">
        <div className="dash-card-head">
          <h3>รายการเอกสาร ({filtered.length})</h3>
          <button className="ghost-btn"><Download size={17} />ส่งออก</button>
        </div>
        <table className="doc-table">
          <thead>
            <tr>
              <th>เลขที่</th>
              <th>ชื่อเอกสาร</th>
              <th>แผนก</th>
              <th>วันที่</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan="5" style={{ textAlign: "center", color: "#8a9ab1", padding: 28 }}>ไม่พบเอกสาร</td></tr>
            )}
            {filtered.map((d) => (
              <tr key={d.no}>
                <td><span className="doc-cell"><FileText size={16} />{d.no}</span></td>
                <td>{d.name}</td>
                <td>{d.dept}</td>
                <td>{d.date}</td>
                <td>
                  <span className={`badge ${d.status === "อนุมัติ" ? "ok" : d.status === "ส่งแล้ว" ? "sent" : "pending"}`}>{d.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div className="modal-card form-card" onClick={(e) => e.stopPropagation()}>
            <div className="form-head">
              <h2>สร้างเอกสารใหม่</h2>
              <button type="button" className="form-close" onClick={() => setOpen(false)}><X size={18} /></button>
            </div>
            <p className="modal-sub">กรอกข้อมูลเอกสารที่จะสร้างลงในระบบ</p>

            <form onSubmit={submit} noValidate>
              <label className="field">
                <span>เลขที่เอกสาร</span>
                <input value={form.no} onChange={(e) => setForm({ ...form, no: e.target.value })} />
              </label>

              <label className="field">
                <span>ชื่อเอกสาร *</span>
                <input
                  value={form.name}
                  onChange={(e) => { setForm({ ...form, name: e.target.value }); if (error) setError(""); }}
                  placeholder="เช่น สัญญาซื้อขายสินค้า"
                />
                {error && <span className="field-error">{error}</span>}
              </label>

              <label className="field">
                <span>แผนก</span>
                <select value={form.dept} onChange={(e) => setForm({ ...form, dept: e.target.value })}>
                  {DEPTS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </label>

              <label className="field">
                <span>วันที่</span>
                <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </label>

              <div className="modal-actions form-foot">
                <button type="button" className="ghost-btn modal-btn" onClick={() => setOpen(false)}>ยกเลิก</button>
                <button type="submit" className="primary-btn modal-btn">สร้างเอกสาร</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}