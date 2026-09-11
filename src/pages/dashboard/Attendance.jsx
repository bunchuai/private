import { useEffect, useState, useMemo, useRef } from "react";
import { Search, FileDown, ChevronLeft, ChevronRight } from "lucide-react";

const RECORDS = [
  { id: "EMP-001", name: "อธิวัฒน์ คงดี", dept: "การเงิน", date: "2026-09-01", timeIn: "08:55", timeOut: "17:05", hours: 8.17, status: "ปกติ", late: "-" },
  { id: "EMP-002", name: "ณัฐทิชา วงศ์สุวรรณ", dept: "ขาย", date: "2026-09-01", timeIn: "09:15", timeOut: "17:30", hours: 8.25, status: "สาย 15 นาที", late: "15 นาที" },
  { id: "EMP-003", name: "ธนกร พิชิตชัย", dept: "เทคโนโลยี", date: "2026-09-01", timeIn: "08:58", timeOut: "17:10", hours: 8.20, status: "ปกติ", late: "-" },
  { id: "EMP-004", name: "สุภาวดี แก้วใส", dept: "จัดซื้อ", date: "2026-09-01", timeIn: "-", timeOut: "-", hours: 0, status: "ลางาน", late: "-" },
  { id: "EMP-005", name: "กิตติพงศ์ เรืองศรี", dept: "การเงิน", date: "2026-09-01", timeIn: "08:42", timeOut: "18:20", hours: 9.63, status: "ปกติ", late: "-" },
  { id: "EMP-001", name: "อธิวัฒน์ คงดี", dept: "การเงิน", date: "2026-09-02", timeIn: "08:57", timeOut: "17:08", hours: 8.18, status: "ปกติ", late: "-" },
  { id: "EMP-002", name: "ณัฐทิชา วงศ์สุวรรณ", dept: "ขาย", date: "2026-09-02", timeIn: "09:05", timeOut: "17:12", hours: 8.12, status: "ปกติ", late: "-" },
  { id: "EMP-003", name: "ธนกร พิชิตชัย", dept: "เทคโนโลยี", date: "2026-09-02", timeIn: "09:22", timeOut: "18:00", hours: 8.63, status: "สาย 22 นาที", late: "22 นาที" },
  { id: "EMP-004", name: "สุภาวดี แก้วใส", dept: "จัดซื้อ", date: "2026-09-02", timeIn: "08:50", timeOut: "17:00", hours: 8.17, status: "ปกติ", late: "-" },
  { id: "EMP-005", name: "กิตติพงศ์ เรืองศรี", dept: "การเงิน", date: "2026-09-02", timeIn: "08:55", timeOut: "17:05", hours: 8.17, status: "ปกติ", late: "-" },
  { id: "EMP-001", name: "อธิวัฒน์ คงดี", dept: "การเงิน", date: "2026-09-03", timeIn: "08:50", timeOut: "17:02", hours: 8.20, status: "ปกติ", late: "-" },
  { id: "EMP-002", name: "ณัฐทิชา วงศ์สุวรรณ", dept: "ขาย", date: "2026-09-03", timeIn: "09:30", timeOut: "17:45", hours: 8.25, status: "สาย 30 นาที", late: "30 นาที" },
  { id: "EMP-003", name: "ธนกร พิชิตชัย", dept: "เทคโนโลยี", date: "2026-09-03", timeIn: "08:45", timeOut: "17:00", hours: 8.25, status: "ปกติ", late: "-" },
  { id: "EMP-004", name: "สุภาวดี แก้วใส", dept: "จัดซื้อ", date: "2026-09-03", timeIn: "-", timeOut: "-", hours: 0, status: "ลางาน", late: "-" },
  { id: "EMP-005", name: "กิตติพงศ์ เรืองศรี", dept: "การเงิน", date: "2026-09-03", timeIn: "08:58", timeOut: "17:05", hours: 8.12, status: "ปกติ", late: "-" },
  { id: "EMP-001", name: "อธิวัฒน์ คงดี", dept: "การเงิน", date: "2026-09-04", timeIn: "09:05", timeOut: "17:10", hours: 8.08, status: "ปกติ", late: "-" },
  { id: "EMP-002", name: "ณัฐทิชา วงศ์สุวรรณ", dept: "ขาย", date: "2026-09-04", timeIn: "08:52", timeOut: "17:18", hours: 8.43, status: "ปกติ", late: "-" },
  { id: "EMP-003", name: "ธนกร พิชิตชัย", dept: "เทคโนโลยี", date: "2026-09-04", timeIn: "08:55", timeOut: "19:30", hours: 10.58, status: "ปกติ", late: "-" },
  { id: "EMP-004", name: "สุภาวดี แก้วใส", dept: "จัดซื้อ", date: "2026-09-04", timeIn: "08:48", timeOut: "17:02", hours: 8.23, status: "ปกติ", late: "-" },
  { id: "EMP-005", name: "กิตติพงศ์ เรืองศรี", dept: "การเงิน", date: "2026-09-04", timeIn: "09:10", timeOut: "17:22", hours: 8.20, status: "สาย 10 นาที", late: "10 นาที" },
  { id: "EMP-001", name: "อธิวัฒน์ คงดี", dept: "การเงิน", date: "2026-09-05", timeIn: "08:59", timeOut: "17:08", hours: 8.15, status: "ปกติ", late: "-" },
  { id: "EMP-002", name: "ณัฐทิชา วงศ์สุวรรณ", dept: "ขาย", date: "2026-09-05", timeIn: "08:50", timeOut: "17:05", hours: 8.25, status: "ปกติ", late: "-" },
  { id: "EMP-003", name: "ธนกร พิชิตชัย", dept: "เทคโนโลยี", date: "2026-09-05", timeIn: "09:02", timeOut: "17:15", hours: 8.22, status: "ปกติ", late: "-" },
  { id: "EMP-004", name: "สุภาวดี แก้วใส", dept: "จัดซื้อ", date: "2026-09-05", timeIn: "-", timeOut: "-", hours: 0, status: "ลางาน", late: "-" },
  { id: "EMP-005", name: "กิตติพงศ์ เรืองศรี", dept: "การเงิน", date: "2026-09-05", timeIn: "08:44", timeOut: "17:00", hours: 8.27, status: "ปกติ", late: "-" },
];

const PER_PAGE = 10;

const THAI_MONTHS = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];

const toThaiDate = (iso) => {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${Number(y) + 543}`;
};

const toThaiMonthLabel = (ym) => {
  const [y, m] = ym.split("-");
  return `${THAI_MONTHS[Number(m) - 1]} ${Number(y) + 543}`;
};

const MONTH_OPTIONS = [];
for (let g = 2023; g <= 2029; g++) {
  for (let m = 1; m <= 12; m++) {
    const ym = `${g}-${String(m).padStart(2, "0")}`;
    MONTH_OPTIONS.push({ value: ym, label: toThaiMonthLabel(ym) });
  }
}

export default function Attendance() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("2026-09");
  const [page, setPage] = useState(1);
  const tableRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return RECORDS.filter((r) => {
      const inMonth = r.date.startsWith(month);
      const matchSearch = !q || r.name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q) || r.dept.toLowerCase().includes(q);
      return inMonth && matchSearch;
    });
  }, [search, month]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const visible = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const summary = useMemo(() => {
    const total = filtered.length;
    const normal = filtered.filter((r) => r.status === "ปกติ").length;
    const late = filtered.filter((r) => r.status.startsWith("สาย")).length;
    const leave = filtered.filter((r) => r.status === "ลางาน").length;
    return { total, normal, late, leave };
  }, [filtered]);

  const doExportExcel = async () => {
    const ExcelJS = await import("exceljs");
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet("รายการเข้าออกงาน", { views: [{ rightToLeft: false }] });

    const COL_WIDTHS = [5, 11, 16, 12, 12, 10, 10, 14, 16, 14];
    ws.columns = COL_WIDTHS.map((w) => ({ width: w }));

    ws.mergeCells("A1:J1");
    ws.mergeCells("A2:J2");
    ws.mergeCells("A3:J3");

    ws.getCell("A1").value = "JPK solution & technology";
    ws.getCell("A1").font = { bold: true, size: 16 };
    ws.getCell("A1").alignment = { vertical: "middle" };

    ws.getCell("A2").value = `รายงานการเข้าออกงาน ประจำเดือน ${toThaiMonthLabel(month)}`;
    ws.getCell("A2").font = { bold: true, size: 13 };
    ws.getCell("A2").alignment = { vertical: "middle" };

    ws.getCell("A3").value = `วันที่ออกรายงาน: ${toThaiDate(todayStr)}`;
    ws.getCell("A3").font = { bold: true, size: 11 };
    ws.getCell("A3").alignment = { vertical: "middle" };

    ws.getRow(1).height = 24;
    ws.getRow(2).height = 22;
    ws.getRow(3).height = 20;

    const headerRow = ws.getRow(4);
    const headers = ["ลำดับ", "รหัสพนักงาน", "ชื่อพนักงาน", "แผนก", "วันที่", "เวลาเข้า", "เวลาออก", "ชั่วโมงทำงาน", "สถานะ", "เวลาสาย"];
    headers.forEach((h, i) => {
      const cell = headerRow.getCell(i + 1);
      cell.value = h;
      cell.font = { bold: true };
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFDEEBFB" } };
      cell.alignment = { vertical: "middle" };
    });
    headerRow.height = 22;

    filtered.forEach((r, i) => {
      const row = ws.getRow(5 + i);
      const values = [
        i + 1,
        r.id,
        r.name,
        r.dept,
        toThaiDate(r.date),
        r.timeIn,
        r.timeOut,
        r.hours > 0 ? r.hours.toFixed(2) : "-",
        r.status,
        r.late,
      ];
      values.forEach((v, c) => {
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
    a.download = `รายงานเข้าออกงาน_${toThaiMonthLabel(month)}.xlsx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const doExportPDF = async () => {
    const el = tableRef.current;
    if (!el) return;
    const html2pdf = (await import("html2pdf.js")).default;
    html2pdf()
      .set({
        margin: [8, 8, 8, 8],
        filename: `รายงานเข้าออกงาน_${toThaiMonthLabel(month)}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
      })
      .from(el)
      .save();
  };

  const statusCls = (s) => {
    if (s === "ปกติ") return "ok";
    if (s.startsWith("สาย")) return "pending";
    return "sent";
  };

  if (loading) {
    return (
      <div className="dash-section">
        <div className="page-head">
          <div className="filter-row">
            <div className="skeleton-block" style={{ width: 200, height: 44 }} />
            <div className="skeleton-block" style={{ width: 280, height: 44 }} />
          </div>
          <div className="skeleton-block" style={{ width: 240, height: 44 }} />
        </div>
        <div className="stat-row stat-row-sm">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="skeleton-block" style={{ height: 64 }} />
          ))}
        </div>
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
        <div className="filter-row">
          <label className="field-inline">
            <span>เดือน</span>
            <select
              value={month}
              onChange={(e) => { setMonth(e.target.value); setPage(1); }}
              className="select-box input-sm"
            >
              {MONTH_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </label>
          <div className="search-box">
            <Search size={18} />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="ค้นหาชื่อ / รหัส / แผนก..."
            />
          </div>
        </div>
        <div className="export-row">
          <button className="primary-btn" onClick={doExportPDF}>
            <FileDown size={17} />PDF
          </button>
          <button className="primary-btn excel" onClick={doExportExcel}>
            <FileDown size={17} />Excel
          </button>
        </div>
      </div>

      <div className="stat-row stat-row-sm">
        <div className="stat-mini blue"><strong>{summary.total}</strong><span>ทั้งหมด</span></div>
        <div className="stat-mini green"><strong>{summary.normal}</strong><span>ปกติ</span></div>
        <div className="stat-mini orange"><strong>{summary.late}</strong><span>สาย</span></div>
        <div className="stat-mini red"><strong>{summary.leave}</strong><span>ลางาน</span></div>
      </div>

      <div className="dash-card">
        <div className="dash-card-head">
          <h3>รายการทั้งหมด ({filtered.length})</h3>
        </div>

        <div className="table-wrap" ref={tableRef}>
          <div className="report-print-head">
            <h2>JPK solution &amp; technology</h2>
            <p>รายงานการเข้าออกงาน ประจำเดือน {toThaiMonthLabel(month)}</p>
            <span>วันที่ออกรายงาน: {toThaiDate(todayStr)}</span>
          </div>
          <table className="doc-table attendance-table">
            <thead>
              <tr>
                <th>#</th>
                <th>รหัสพนักงาน</th>
                <th>ชื่อพนักงาน</th>
                <th>แผนก</th>
                <th>วันที่</th>
                <th>เวลาเข้า</th>
                <th>เวลาออก</th>
                <th>ชั่วโมง</th>
                <th>สถานะ</th>
                <th>เวลาสาย</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((r, i) => (
                <tr key={`${r.id}-${r.date}`}>
                  <td>{(safePage - 1) * PER_PAGE + i + 1}</td>
                  <td className="doc-cell">{r.id}</td>
                  <td><strong>{r.name}</strong></td>
                  <td>{r.dept}</td>
                  <td>{toThaiDate(r.date)}</td>
                  <td>{r.timeIn}</td>
                  <td>{r.timeOut}</td>
                  <td>{r.hours > 0 ? r.hours.toFixed(2) : "-"}</td>
                  <td><span className={`badge ${statusCls(r.status)}`}>{r.status}</span></td>
                  <td>{r.late}</td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr><td colSpan={10} className="empty-cell">ไม่พบข้อมูล</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button
            className="page-btn"
            disabled={safePage <= 1}
            onClick={() => setPage(safePage - 1)}
          ><ChevronLeft size={16} /></button>
          <span className="page-info">หน้า {safePage} / {totalPages}</span>
          <button
            className="page-btn"
            disabled={safePage >= totalPages}
            onClick={() => setPage(safePage + 1)}
          ><ChevronRight size={16} /></button>
        </div>
      </div>
    </div>
  );
}