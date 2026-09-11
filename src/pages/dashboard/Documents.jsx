import { useEffect, useRef, useState } from "react";
import { Search, Plus, FileText, X, ChevronDown, FileDown } from "lucide-react";

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
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ name: "", dept: DEPTS[0], date: "" });
  const [deptOpen, setDeptOpen] = useState(false);
  const [deptQuery, setDeptQuery] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pending, setPending] = useState(null);
  const comboboxRef = useRef(null);
  const printRef = useRef(null);

  const today = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const openForm = () => {
    setForm({ name: "", dept: DEPTS[0], date: today() });
    setDeptQuery(DEPTS[0]);
    setErrors({});
    setOpen(true);
  };

  const deptMatches = DEPTS.filter((d) => d.toLowerCase().includes(deptQuery.trim().toLowerCase()));

  useEffect(() => {
    const onClick = (e) => {
      if (comboboxRef.current && !comboboxRef.current.contains(e.target)) setDeptOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "กรุณากรอกชื่อเอกสาร";
    else if (form.name.trim().length < 2) errs.name = "ชื่อเอกสารต้องอย่างน้อย 2 ตัวอักษร";

    if (!(form.dept || deptQuery).trim().toLowerCase()) errs.dept = "กรุณาเลือกแผนก";

    const raw = form.date;
    if (!raw) errs.date = "กรุณาเลือกวันที่";
    else {
      const m = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (!m) errs.date = "รูปแบบวันที่ไม่ถูกต้อง";
      else {
        const given = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
        const now = new Date();
        const todayOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const invalid = given.getFullYear() !== Number(m[1]) || given.getMonth() !== Number(m[2]) - 1 || given.getDate() !== Number(m[3]);
        if (invalid) errs.date = "วันที่ไม่ถูกต้อง เช่น 11/09/2026";
        else if (given > todayOnly) errs.date = "วันที่ไม่สามารถเป็นวันในอนาคตได้";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const clearErr = (key) => {
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const fmtDate = (iso) => {
    const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    return m ? `${m[3]}/${m[2]}/${m[1]}` : iso;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setPending({
      no: nextDocNo(docs),
      name: form.name.trim(),
      dept: (form.dept || deptQuery).trim(),
      date: fmtDate(form.date),
      status: "รอดำเนินการ",
    });
    setConfirmOpen(true);
  };

  const confirmCreate = () => {
    setDocs([pending, ...docs]);
    setConfirmOpen(false);
    setOpen(false);
  };

  const doExportExcel = async () => {
    const ExcelJS = await import("exceljs");
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet("รายการเอกสาร");
    ws.columns = [12, 36, 14, 13, 16].map((w) => ({ width: w }));

    ws.mergeCells("A1:E1");
    ws.mergeCells("A2:E2");
    ws.mergeCells("A3:E3");
    ws.getCell("A1").value = "JPK solution & technology";
    ws.getCell("A1").font = { bold: true, size: 16 };
    ws.getCell("A1").alignment = { vertical: "middle" };
    ws.getCell("A2").value = "รายงานเอกสาร";
    ws.getCell("A2").font = { bold: true, size: 13 };
    ws.getCell("A2").alignment = { vertical: "middle" };
    ws.getCell("A3").value = `วันที่ออกรายงาน: ${fmtDate(today())}`;
    ws.getCell("A3").font = { bold: true, size: 11 };
    ws.getCell("A3").alignment = { vertical: "middle" };
    ws.getRow(1).height = 24;
    ws.getRow(2).height = 22;
    ws.getRow(3).height = 20;

    const headerRow = ws.getRow(4);
    ["เลขที่", "ชื่อเอกสาร", "แผนก", "วันที่", "สถานะ"].forEach((h, i) => {
      const cell = headerRow.getCell(i + 1);
      cell.value = h;
      cell.font = { bold: true };
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFDEEBFB" } };
      cell.alignment = { vertical: "middle" };
    });
    headerRow.height = 22;

    filtered.forEach((d, i) => {
      const row = ws.getRow(5 + i);
      [d.no, d.name, d.dept, d.date, d.status].forEach((v, c) => {
        row.getCell(c + 1).value = v;
        row.getCell(c + 1).alignment = { vertical: "middle" };
      });
    });

    const buf = await wb.xlsx.writeBuffer();
    const blob = new Blob([buf], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `รายการเอกสาร_${fmtDate(today())}.xlsx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const doExportPDF = async () => {
    const el = printRef.current;
    if (!el) return;
    const html2pdf = (await import("html2pdf.js")).default;
    html2pdf()
      .set({
        margin: [8, 8, 8, 8],
        filename: `รายการเอกสาร_${fmtDate(today())}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
      })
      .from(el)
      .save();
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
          <div className="export-row">
            <button className="ghost-btn" onClick={doExportPDF}><FileDown size={17} />PDF</button>
            <button className="ghost-btn" onClick={doExportExcel}><FileDown size={17} />Excel</button>
          </div>
        </div>
        <div className="table-wrap" ref={printRef}>
          <div className="report-print-head">
            <h2>JPK solution &amp; technology</h2>
            <p>รายงานเอกสาร</p>
            <span>วันที่ออกรายงาน: {fmtDate(today())}</span>
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
      </div>

      {open && (
        <div className="modal-overlay">
          <div className="modal-card form-card" onClick={(e) => e.stopPropagation()}>
            <div className="form-head">
              <h2>สร้างเอกสารใหม่</h2>
              <button type="button" className="form-close" onClick={() => setOpen(false)}><X size={18} /></button>
            </div>
            <p className="modal-sub">กรอกข้อมูลเอกสารที่จะสร้างลงในระบบ</p>

            <form onSubmit={submit} noValidate>
              <label className="field">
                <span>ชื่อเอกสาร *</span>
                <input
                  className={errors.name ? "input-error" : ""}
                  value={form.name}
                  onChange={(e) => { setForm({ ...form, name: e.target.value }); clearErr("name"); }}
                  placeholder="เช่น สัญญาซื้อขายสินค้า"
                />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </label>

              <div className="field combobox" ref={comboboxRef}>
                <span>แผนก</span>
                <div className="combobox-box">
                  <input
                    className={errors.dept ? "input-error" : ""}
                    value={deptQuery}
                    onFocus={() => setDeptOpen(true)}
                    onChange={(e) => { setDeptQuery(e.target.value); setDeptOpen(true); clearErr("dept"); }}
                    placeholder="ค้นหาแผนก..."
                  />
                  <ChevronDown size={16} />
                </div>
                {deptOpen && (
                  <div className="combobox-list">
                    {deptMatches.length === 0 && <div className="combobox-empty">ไม่พบแผนก</div>}
                    {deptMatches.map((d) => (
                      <button
                        key={d}
                        type="button"
                        className={d === form.dept ? "active" : ""}
                        onClick={() => { setForm({ ...form, dept: d }); setDeptQuery(d); setDeptOpen(false); clearErr("dept"); }}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                )}
                {errors.dept && <span className="field-error">{errors.dept}</span>}
              </div>

              <label className="field">
                <span>วันที่</span>
                <input
                  className={errors.date ? "input-error" : ""}
                  type="date"
                  value={form.date}
                  onChange={(e) => { setForm({ ...form, date: e.target.value }); clearErr("date"); }}
                />
                {errors.date && <span className="field-error">{errors.date}</span>}
              </label>

              <div className="modal-actions form-foot">
                <button type="button" className="ghost-btn modal-btn" onClick={() => setOpen(false)}>ยกเลิก</button>
                <button type="submit" className="primary-btn modal-btn">สร้างเอกสาร</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {confirmOpen && pending && (
        <div className="modal-overlay">
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon ok"><FileText size={24} /></div>
            <h2>ยืนยันการสร้างเอกสาร</h2>
            <p>ตรวจสอบข้อมูลก่อนยืนยันการสร้างเอกสารฉบับใหม่</p>
            <div className="confirm-rows">
              <div className="confirm-row"><span>เลขที่</span><strong>{pending.no}</strong></div>
              <div className="confirm-row"><span>ชื่อเอกสาร</span><strong>{pending.name}</strong></div>
              <div className="confirm-row"><span>แผนก</span><strong>{pending.dept}</strong></div>
              <div className="confirm-row"><span>วันที่</span><strong>{pending.date}</strong></div>
            </div>
            <div className="modal-actions">
              <button type="button" className="ghost-btn modal-btn" onClick={() => setConfirmOpen(false)}>แก้ไข</button>
              <button type="button" className="primary-btn modal-btn" onClick={confirmCreate}>ยืนยันการสร้าง</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}