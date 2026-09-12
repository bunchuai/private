# AGENTS.md

## โปรเจกต์
React 18 + Vite 8 SPA "JpkStartupProject" (ระบบภายใน, UI ภาษาไทย, router เป็น HashRouter)
- Dev server port 5173, base: `/` (dev) / `/private/` (GH Pages build ด้วย env `GH_PAGES=true` ใน workflow)
- Deploy GH Pages: push main → Actions build → branch `gh-pages` → https://bunchuai.github.io/private/
- ต้องรัน `npm run build` ให้ผ่านทุกครั้งหลังแก้โค้ด ก่อน commit/push

## สไตล์ UI (ต้องใช้ให้เหมือนเดิมทุกหน้า)
- CSS ทั้งหมดรวมอยู่ใน `src/index.css` (ไม่มี CSS-in-JS)
- สีหลัก: น้ำเงิน #153b76 / #3a7ff0, เทา #6f82a0 / #8a9ab1, ฟ้าไล่ #e3edff–#f0f5ff, พื้นการ์ดขาว มุมโค้ง 11–16px
- ปุ่ม: `.primary-btn`, `.ghost-btn`, `.danger-btn`, `.modal-btn` (ปุ่ม modal กว้างเท่ากัน flex:1)
- Badge สถานะ: `.badge` + `.ok`/`.sent`/`.pending`
- ข้อความ error: `<span className="field-error">` — ต้องใช้ class `.field .field-error` (กัน `.field span` ทับสี)

## Form modal (PATTERN มาตรฐาน — ใช้กันทุก modal)
- โครงสร้าง: `<div className="modal-overlay">` (ไม่ให้ onclick ปิด — ปิดปุ่ม X/ยกเลิกเท่านั้น) → `<div className="modal-card form-card">` → `.form-head` (h2 + ปุ่ม `.form-close`) → `<p className="modal-sub">` สีแดงหนา
- **พื้นหลัง modal ต้อง TRANSPARENT (โปร่งใส)** — `.modal-overlay` background: transparent, ไม่มีม่านสี/เบลอ (แก้ที่ `src/index.css`)
- ช่อง: `<label className="field"><span>label</span><input/></label>` (input สูง 44px)
- ช่องแบบ dropdown ค้นหาได้: combobox (`src/components` pattern ใน Documents.jsx) — `.combobox`, `.combobox-list`, ปิดเมื่อคลิกนอก (useEffect mousedown)
- วันที่: ใช้ `src/components/ThaiDatePicker.jsx` (ไทย พ.ศ., แสดง "11 กันยายน 2569", เก็บค่า ISO yyyy-mm-dd, validate ไม่เอาอนาคต)
- Validate: ตอน submit ตรวจทุกช่อง เก็บ `errors = {}` แล้ว `setErrors` แสดงใต้ช่อง, เคลียร์ error เมื่อแก้ (`clearErr(key)`), input error เพิ่ม class `input-error`
- ไม่ให้กรอกมั่ว: ชื่อต้องมีตัวอักษร/ตัวเลขจริง, ห้ามอักขระซ้ำทั้งชื่อ, ห้ามสัญลักษณ์พิเศษ (เว้น `- , / ( ) .`)
- ก่อนบันทึกจริง: เปิด confirm modal (`.modal-icon.ok`, `.confirm-rows`/`.confirm-row`) แสดงสรุป → ปุ่ม "ยืนยันการสร้าง"/"แก้ไข"

## Export เอกสาร (ทุกหน้ามี PDF/Excel หัวรายงานชื่อบริษัท)
- Excel: exceljs (`await import("exceljs")`) — มา 3 แถว merge: "JpkStartupProject" (+หนา ขนาด16) / ชื่อรายงาน / วันที่ออกรายงาน, แถวหัว 4 พื้นเงิน `FFDEEBFB` หนา, ดาวน์โหลดผ่าน Blob
- PDF: html2pdf (`await import("html2pdf.js")`) `.report-print-head` (หัวชื่อบริษัท) + ตาราง, landscape, ref ไปที่ `.table-wrap`
- วันที่ต้องแปลงเป็น dd/mm/yyyy ก่อนแสดงในตาราง

## Loading (ทุกหน้าบังคับ)
- ทุกหน้าในระบบต้องมี skeleton shimmer + fade-in (pattern ใน `Overview.jsx`) — `useState loading` + `setTimeout` 800ms → โชว์ `.skeleton-block`/`.skeleton-line` ตรงกับ layout แล้วสลับเป็นจริงด้วย `.fade-in`
- reuse class ใน `src/index.css`: `.skeleton-block`, `.skeleton-line`, `.fade-in`

## หมายเหตุ
- dev: React StrictMode เอา double-run ของ effect → ถ้า fetch API ใน useEffect ต้องมี ref guard
- หน้า Dashboard มี WeatherWidget (fetch conditionผ่าน env; ครั้งเดียวต่อ mount)
- ไม่ใช้ xlsx package แล้ว (แทนด้วย exceljs), ยังไม่ลบ exceljs จาก node_modules
- ถ้าเกือบระดับไทยเก็บเป็น yyyy-mm-dd ภายใน state แต่แสดงผลเป็น Thai/p.D. ภายนอก อย่าง Documents เก็บ ISO ใช้ fmtDate แสดง dd/mm/yyyy