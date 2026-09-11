import { Search, Plus, FileText, Download } from "lucide-react";

const DOCS = [
  { no: "DOC-1142", name: "สัญญาจ้างเหมาก่อสร้าง", dept: "จัดซื้อ", date: "11/09/2026", status: "ส่งแล้ว" },
  { no: "DOC-1141", name: "ใบเสนอราคา ฉบับที่ 3", dept: "ขาย", date: "10/09/2026", status: "อนุมัติ" },
  { no: "DOC-1140", name: "เอกสารเบิกจ่ายเงินเดือน", dept: "การเงิน", date: "09/09/2026", status: "อนุมัติ" },
  { no: "DOC-1139", name: "บันทึกการประชุมกรรมการ", dept: "เลขานุการ", date: "08/09/2026", status: "รอดำเนินการ" },
  { no: "DOC-1138", name: "รายงานการฝึกอบรม 2/69", dept: "ทรัพยากรบุคคล", date: "07/09/2026", status: "อนุมัติ" },
  { no: "DOC-1137", name: "คำสั่งซื้อสินค้า PO-884", dept: "จัดซื้อ", date: "06/09/2026", status: "ส่งแล้ว" },
  { no: "DOC-1136", name: "สัญญาประกันภัยนิติบุคคล", dept: "การเงิน", date: "05/09/2026", status: "รอดำเนินการ" },
  { no: "DOC-1135", name: "รายงานการซ่อมบำรุงเครื่องจักร", dept: "ปฏิบัติการ", date: "04/09/2026", status: "อนุมัติ" },
];

export default function Documents() {
  return (
    <div className="dash-section">
      <div className="page-head">
        <button className="primary-btn"><Plus size={18} />สร้างเอกสาร</button>
        <div className="search-box">
          <Search size={18} />
          <input placeholder="ค้นหาเอกสาร..." />
        </div>
      </div>

      <div className="dash-card">
        <div className="dash-card-head">
          <h3>รายการเอกสาร ({DOCS.length})</h3>
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
            {DOCS.map((d) => (
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
  );
}