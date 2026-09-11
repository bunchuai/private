import { useEffect, useRef, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const TH_MONTHS = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
];
const TH_DAYS = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
const pad = (n) => String(n).padStart(2, "0");
const toISO = (y, m, d) => `${y}-${pad(m)}-${pad(d)}`;

const parseISO = (iso) => {
  if (!iso) return null;
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  return { y: Number(m[1]), m: Number(m[2]), d: Number(m[3]) };
};

export default function ThaiDatePicker({ value, onChange, invalid, placeholder }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const sel = parseISO(value);
  const todayDate = new Date();
  const todayISO = toISO(todayDate.getFullYear(), todayDate.getMonth() + 1, todayDate.getDate());
  const [view, setView] = useState(() => {
    if (sel) return { y: sel.y, m: sel.m };
    return { y: todayDate.getFullYear(), m: todayDate.getMonth() + 1 };
  });

  useEffect(() => {
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const shift = (by) => {
    let y = view.y;
    let m = view.m + by;
    if (m < 1) { m = 12; y--; }
    if (m > 12) { m = 1; y++; }
    setView({ y, m });
  };

  const daysInMonth = new Date(view.y, view.m, 0).getDate();
  const firstDay = new Date(view.y, view.m - 1, 1).getDay();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push({ y: view.y, m: view.m, d });

  const display = sel ? `${sel.d} ${TH_MONTHS[sel.m - 1]} ${sel.y + 543}` : "";

  return (
    <div className="tdp-wrap" ref={wrapRef}>
      <div className="tdp-box">
        <input
          readOnly
          value={display}
          placeholder={placeholder || "เลือกวันที่"}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          className={invalid ? "input-error" : ""}
        />
        <Calendar size={16} />
      </div>

      {open && (
        <div className="tdp-panel">
          <div className="tdp-head">
            <button type="button" onClick={() => shift(-1)}><ChevronLeft size={16} /></button>
            <strong>{TH_MONTHS[view.m - 1]} {view.y + 543}</strong>
            <button type="button" onClick={() => shift(1)}><ChevronRight size={16} /></button>
          </div>
          <div className="tdp-week">
            {TH_DAYS.map((d) => <span key={d}>{d}</span>)}
          </div>
          <div className="tdp-grid">
            {cells.map((c, i) => {
              if (!c) return <span key={`x${i}`} />;
              const iso = toISO(c.y, c.m, c.d);
              const isSel = value === iso;
              const isToday = todayISO === iso;
              return (
                <button
                  key={iso}
                  type="button"
                  className={`${isSel ? "tdp-sel" : ""} ${isToday ? "tdp-today" : ""}`}
                  onClick={() => { onChange(iso); setOpen(false); }}
                >
                  {c.d}
                </button>
              );
            })}
          </div>
          <div className="tdp-foot">
            <button
              type="button"
              onClick={() => { onChange(todayISO); setOpen(false); }}
            >
              วันนี้
            </button>
          </div>
        </div>
      )}
    </div>
  );
}