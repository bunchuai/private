import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LayoutDashboard, FileText, Users, Settings, LogOut, Menu, X, ChevronDown, ChevronsLeft, ChevronsRight } from "lucide-react";

const NAV = [
  { type: "link", to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} />, end: true },
  { type: "link", to: "/dashboard/documents", label: "เอกสาร", icon: <FileText size={20} /> },
  { type: "link", to: "/dashboard/employees", label: "พนักงาน", icon: <Users size={20} /> },
  {
    type: "group",
    label: "ตั้งค่าระบบ",
    icon: <Settings size={20} />,
    children: [
      { to: "/dashboard/settings", label: "ตั้งค่า" },
      { to: "/dashboard/reports", label: "สรุปรายงาน" },
      { to: "/dashboard/attendance", label: "รายการเข้าออกงาน" },
    ],
  },
];

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem("jpk_sidebar") === "1");
  const [groups, setGroups] = useState({});
  const [confirmLogout, setConfirmLogout] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleCollapse = () => {
    setCollapsed((c) => {
      localStorage.setItem("jpk_sidebar", c ? "0" : "1");
      return !c;
    });
  };

  useEffect(() => {
    NAV.filter((item) => item.type === "group").forEach((g) => {
      if (g.children.some((c) => location.pathname === c.to || (c.to !== "/dashboard" && location.pathname.startsWith(c.to + "/")))) {
        setGroups((prev) => ({ ...prev, [g.label]: true }));
      }
    });
  }, [location.pathname]);

  const toggleGroup = (label) => setGroups((prev) => ({ ...prev, [label]: !prev[label] }));

  const handleLogout = (e) => {
    e.preventDefault();
    setConfirmLogout(true);
  };

  const confirmLogoutAction = () => {
    setConfirmLogout(false);
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className={`dashboard ${collapsed ? "collapsed" : ""}`}>
      <button
        className="sidebar-toggle"
        aria-label="เปิดเมนู"
        onClick={() => setOpen(true)}
      >
        <Menu size={22} />
      </button>

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-head">
          <div className="logo-mark">JPK</div>
          <div className="sidebar-text">
            <div className="brand-name">JPK solution</div>
            <div className="brand-tagline">Internal System</div>
          </div>
          <button
            type="button"
            className="sidebar-collapse"
            aria-label="ย่อ/ขยายเมนู"
            onClick={toggleCollapse}
          >
            {collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
          </button>
          <button
            className="sidebar-close"
            aria-label="ปิดเมนู"
            onClick={() => setOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {NAV.map((item) =>
            item.type === "group" ? (
              <div key={item.label} className="nav-group">
                <button
                  type="button"
                  className={`nav-group-head ${groups[item.label] ? "open" : ""}`}
                  onClick={() => toggleGroup(item.label)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  <ChevronDown size={16} className="nav-group-arrow" />
                </button>
                {(groups[item.label] || collapsed) && (
                  <div className="nav-group-body">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        className={({ isActive }) =>
                          `nav-item sub-item ${isActive ? "active" : ""}`
                        }
                        onClick={() => setOpen(false)}
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `nav-item ${isActive ? "active" : ""}`
                }
                onClick={() => setOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            )
          )}
        </nav>

        <div className="sidebar-foot">
          <a href="/login" className="nav-item" onClick={handleLogout}>
            <LogOut size={20} />
            <span>ออกจากระบบ</span>
          </a>
        </div>
      </aside>

      {open && <div className="sidebar-overlay" onClick={() => setOpen(false)} />}

      <div className="dashboard-main">
        <header className="topbar">
          <div className="topbar-title">
            <h1>ระบบบริหารจัดการภายในองค์กร</h1>
            <span>JPK solution &amp; technology</span>
          </div>
          <div className="topbar-user">
            <div className="avatar">{user?.name?.charAt(0).toUpperCase() || "ผ"}</div>
            <div>
              <strong>{user?.name || "ผู้ใช้งาน"}</strong>
              <span>{user?.role || "ผู้ใช้งานระบบ"}</span>
            </div>
          </div>
        </header>

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>

      {confirmLogout && (
        <div className="modal-overlay" onClick={() => setConfirmLogout(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon warn">
              <LogOut size={26} />
            </div>
            <h2>ยืนยันการออกจากระบบ</h2>
            <p>คุณต้องการออกจากระบบหรือไม่?</p>
            <div className="modal-actions">
              <button type="button" className="ghost-btn modal-btn" onClick={() => setConfirmLogout(false)}>
                ยกเลิก
              </button>
              <button type="button" className="danger-btn modal-btn" onClick={confirmLogoutAction}>
                ยืนยันออกจากระบบ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}