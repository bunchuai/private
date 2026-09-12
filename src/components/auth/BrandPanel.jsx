import {
  Folders,
  BarChart3,
  Headphones,
  Cpu,
  ShieldCheck,
  BellRing,
  CheckCircle2,
} from "lucide-react";

export default function BrandPanel() {
  return (
    <section className="brand-panel">
      <div className="brand-overlay" />
      <div className="brand-content">
        <div className="brand-logo">
          <div className="logo-mark">JPK</div>
          <div>
            <div className="brand-name">JpkStartupProject</div>
            <div className="brand-tagline">Internal System • ระบบภายในองค์กร</div>
          </div>
        </div>

        <div className="hero-copy">
          <h1>เทคโนโลยีเพื่อ<br />การทำงานที่ทันสมัย</h1>
          <p>ขับเคลื่อนองค์กรด้วยระบบดิจิทัล<br />ปลอดภัย มั่นคง และพร้อมรองรับทุกการเติบโต</p>
        </div>

        <div className="feature-row">
          <Feature icon={<Folders size={27} />} title="ครบถ้วน" subtitle="ทุกงานเอกสาร" />
          <Feature icon={<BarChart3 size={27} />} title="แม่นยำ" subtitle="รายงานทุกส่วน" />
          <Feature icon={<Headphones size={27} />} title="สนับสนุน" subtitle="ทุกแผนก" />
        </div>
      </div>

      <div className="tech-scene">
        <div className="tech-grid" />
        <div className="radar radar-a" />
        <div className="radar radar-b" />
        <div className="circuit circuit-a" />
        <div className="circuit circuit-b" />
        <div className="circuit circuit-c" />
        <div className="circuit circuit-d" />

        <div className="tech-card card-code">
          <div className="code-head">
            <i />
            <i />
            <i />
          </div>
          <div className="code-lines">
            <i style={{ width: "82%" }} />
            <i style={{ width: "58%" }} />
            <i style={{ width: "70%" }} />
            <i style={{ width: "45%" }} />
          </div>
        </div>

        <div className="tech-card card-toast">
          <ShieldCheck size={20} />
          <div>
            <strong>การเชื่อมต่อปลอดภัย</strong>
            <span>เข้ารหัสทุกข้อมูล</span>
          </div>
        </div>

        <div className="tech-card card-uptime">
          <div className="card-head">
            <span className="pulse-dot" />
            ระบบพร้อมใช้งาน 99.9%
          </div>
          <div className="bars">
            <i style={{ "--h": "38%" }} />
            <i style={{ "--h": "62%" }} />
            <i style={{ "--h": "45%" }} />
            <i style={{ "--h": "78%" }} />
            <i style={{ "--h": "90%" }} />
            <i style={{ "--h": "70%" }} />
            <i style={{ "--h": "98%" }} />
          </div>
        </div>

        <div className="tech-card card-stats">
          <div className="stat-num">24/7</div>
          <div className="stat-label">สนับสนุนตลอดเวลา</div>
        </div>

        <div className="tech-card card-notify">
          <span className="notify-badge">2</span>
          <BellRing size={19} />
        </div>

        <div className="tech-card card-data">
          <div className="data-donut" />
          <div className="data-lines">
            <i />
            <i />
            <i />
          </div>
        </div>

        <div className="tech-node node-1"><span><Cpu size={15} /></span></div>
        <div className="tech-node node-2"><span><Cpu size={15} /></span></div>
        <div className="tech-node node-3"><span><Cpu size={15} /></span></div>

        <div className="chip chip-1"><CheckCircle2 size={13} /></div>
        <div className="chip chip-2"><CheckCircle2 size={13} /></div>

        <div className="particle p-1" />
        <div className="particle p-2" />
        <div className="particle p-3" />
        <div className="particle p-4" />
        <div className="particle p-5" />
      </div>
    </section>
  );
}

function Feature({ icon, title, subtitle }) {
  return (
    <div className="feature">
      {icon}
      <div>
        <strong>{title}</strong>
        <span>{subtitle}</span>
      </div>
    </div>
  );
}