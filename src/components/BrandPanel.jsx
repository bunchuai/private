import { Folders, BarChart3, Headphones } from "lucide-react";

export default function BrandPanel() {
  return (
    <section className="brand-panel">
      <div className="brand-overlay" />
      <div className="brand-content">
        <div className="brand-logo">
          <div className="logo-mark">JPK</div>
          <div>
            <div className="brand-name">JPK solution &amp; technology</div>
            <div className="brand-tagline">Internal System • ระบบภายในองค์กร</div>
          </div>
        </div>

        <div className="hero-copy">
          <h1>ระบบบริหารจัดการ<br />ภายในองค์กร</h1>
          <p>เพื่อการทำงานที่รวดเร็ว มีประสิทธิภาพ<br />และตอบโจทย์ทุกความต้องการของทีม</p>
        </div>

        <div className="feature-row">
          <Feature icon={<Folders size={27} />} title="ครบถ้วน" subtitle="ทุกงานเอกสาร" />
          <Feature icon={<BarChart3 size={27} />} title="แม่นยำ" subtitle="รายงานทุกส่วน" />
          <Feature icon={<Headphones size={27} />} title="สนับสนุน" subtitle="ทุกแผนก" />
        </div>
      </div>

      <div className="scene">
        <div className="sun" />
        <div className="mountain mountain-back" />
        <div className="mountain mountain-front" />
        <div className="lake" />
        <div className="desk">
          <div className="laptop">
            <div className="laptop-screen">JPK solution</div>
            <div className="laptop-base" />
          </div>
          <div className="cup">☕</div>
          <div className="plant">🌿</div>
        </div>
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