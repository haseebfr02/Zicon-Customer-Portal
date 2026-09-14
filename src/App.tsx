import { useEffect, useState, type ReactNode } from 'react';
import {
  Activity,
  ArrowRight,
  Bell,
  BookOpen,
  Box,
  Cloud,
  Code2,
  FileText,
  Gauge,
  Globe2,
  HelpCircle,
  KeyRound,
  LayoutDashboard,
  LifeBuoy,
  LockKeyhole,
  Menu,
  MoreHorizontal,
  Package,
  Rocket,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import './index.css';

type Announcement = {
  id: string;
  title: string;
  description: string;
  published_label: string;
  icon: string;
};

type IconType = typeof Code2;

const defaultAnnouncements: Announcement[] = [
  { id: 'bolt', title: 'ZiCON Bolt v2.0 is now live!', description: 'New features and smarter AI assistance.', published_label: '2 days ago', icon: 'bolt' },
  { id: 'maintenance', title: 'Platform Maintenance', description: 'Scheduled maintenance on Aug 30, 02:00 AM PKT', published_label: '4 days ago', icon: 'lock' },
  { id: 'docs', title: 'New Documentation', description: 'Updated guides for deployment and scaling.', published_label: '1 week ago', icon: 'document' },
];

const mainNavigation = [
  { label: 'Dashboard', icon: LayoutDashboard },
];

const productNavigation = [
  { label: 'IDE', icon: TerminalSquare },
  { label: 'ZiCON Bolt', icon: Zap },
  { label: 'ZiCON Developer Portal', icon: Cloud },
];

const manageNavigation = [
  { label: 'Projects', icon: Box },
  { label: 'Deployments', icon: Rocket },
  { label: 'Environments', icon: Activity },
  { label: 'Teams', icon: Users },
  { label: 'Settings', icon: Settings },
  { label: 'Billing', icon: Gauge },
  { label: 'Support', icon: LifeBuoy },
];

const usage = [
  { label: 'IDE Hours', value: '120 / 200', percent: 60, color: 'teal', icon: Code2 },
  { label: 'Cloud Deployments', value: '8 / 20', percent: 40, color: 'blue', icon: Cloud },
  { label: 'Storage', value: '45 GB / 200 GB', percent: 23, color: 'violet', icon: Package },
  { label: 'Bandwidth', value: '320 GB / 1 TB', percent: 28, color: 'amber', icon: Activity },
];

function App() {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [toast, setToast] = useState('');
  const [announcements, setAnnouncements] = useState<Announcement[]>(defaultAnnouncements);
  const [announcementError, setAnnouncementError] = useState('');

  useEffect(() => {
    let mounted = true;

    async function loadAnnouncements() {
      const { data, error } = await supabase
        .from('portal_announcements')
        .select('id, title, description, published_label, icon')
        .order('sort_order', { ascending: true });

      if (!mounted) return;
      if (error) {
        setAnnouncementError('Announcements are showing the latest saved preview.');
        return;
      }
      if (data && data.length > 0) setAnnouncements(data);
    }

    void loadAnnouncements();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const filteredAnnouncements = announcements.filter((item) =>
    `${item.title} ${item.description}`.toLowerCase().includes(searchValue.toLowerCase()),
  );

  function chooseItem(label: string) {
    setActiveItem(label);
    setMobileMenuOpen(false);
    if (label !== 'Dashboard') setToast(`${label} is ready to explore.`);
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenuOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-top">
          <div className="brand-mark" aria-hidden="true"><Cloud size={26} strokeWidth={2.2} /></div>
          <div className="brand-copy"><strong>ZiCON</strong><span>Developer Portal</span></div>
          <button className="mobile-close" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu"><X size={20} /></button>
        </div>

        <div className="nav-area">
          <NavGroup items={mainNavigation} activeItem={activeItem} onChoose={chooseItem} />
          <NavSection title="PRODUCTS & SERVICES" items={productNavigation} activeItem={activeItem} onChoose={chooseItem} />
          <NavSection title="MANAGE" items={manageNavigation} activeItem={activeItem} onChoose={chooseItem} />
        </div>

        <div className="help-card">
          <div className="help-title">Need Help?</div>
          <p>Our support team is here to help you 24/7</p>
          <button onClick={() => setToast('Support request started.')}><span>Contact Support</span><ArrowRight size={15} /></button>
        </div>
        <div className="sidebar-footer">© 2026 ZiCON Cloud Pvt. Ltd.</div>
      </aside>

      {mobileMenuOpen && <button className="backdrop" onClick={() => setMobileMenuOpen(false)} aria-label="Close navigation" />}

      <main className="main-content">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu"><Menu size={21} /></button>
          <div className="search-wrap">
            <Search size={17} />
            <input
              value={searchValue}
              onFocus={() => setSearchOpen(true)}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search docs, projects, services..."
              aria-label="Search portal"
            />
            <kbd>Ctrl + K</kbd>
            {searchOpen && <button className="search-clear" onClick={() => { setSearchOpen(false); setSearchValue(''); }} aria-label="Close search"><X size={14} /></button>}
          </div>
          <div className="top-actions">
            <button className="icon-button notification-button" onClick={() => setToast('You are all caught up.')} aria-label="Notifications"><Bell size={19} /><span>3</span></button>
            <button className="icon-button" onClick={() => setToast('Help center opened.')} aria-label="Help"><HelpCircle size={19} /></button>
            <div className="account-mini"><div className="avatar">DA</div><div><strong>Demo Account</strong><small>Enterprise Plan</small></div><MoreHorizontal size={18} /></div>
          </div>
        </header>

        <div className="content-wrap">
          <section className="page-heading">
            <h1>Welcome to <span>ZiCON</span> Developer Portal</h1>
            <p>Your all-in-one platform for building, deploying and scaling modern applications.</p>
          </section>

          <div className="dashboard-grid">
            <div className="primary-column">
              <section className="hero-card">
                <div className="hero-content">
                  <div className="eyebrow"><Sparkles size={14} /> Developer workspace</div>
                  <h2>Build. Code. Deploy.<br /><span>All in One Cloud.</span></h2>
                  <p>ZiCON Developer Portal provides everything developers need to build, test, and deploy applications faster and more efficiently.</p>
                  <div className="hero-actions">
                    <button className="button button-primary" onClick={() => setToast('Opening your online IDE.')}><Code2 size={16} /> Launch IDE</button>
                    <button className="button button-outline-light" onClick={() => setToast('Documentation is ready to browse.')}><BookOpen size={16} /> View Documentation</button>
                  </div>
                </div>
                <HeroIllustration />
              </section>

              <section className="tools-section">
                <SectionTitle>Access Your Tools &amp; Services</SectionTitle>
                <div className="tool-grid">
                  <ToolCard label="IDE" title="Online IDE" description="Cloud-powered IDE with WebContainers. Code, build and run projects in your browser. Supports multiple stacks." icon={TerminalSquare} accent="teal" button="Open IDE" onClick={() => setToast('Opening your online IDE.')} />
                  <ToolCard label="BOLT" title="ZiCON Bolt" description="AI-powered development assistant. Generate code, debug, refactor and accelerate your development with natural language." icon={Zap} accent="violet" button="Open ZiCON Bolt" onClick={() => setToast('ZiCON Bolt is ready to assist.')} />
                  <ToolCard label="CLOUD" title="ZiCON Developer Portal" description="Deploy, manage and scale your applications on our secure and high-performance cloud platform." icon={Cloud} accent="blue" button="Open Developer Portal" onClick={() => setToast('Developer Portal is already open.')} />
                </div>
              </section>

              <section className="benefits-panel">
                <h2>Why Developers Love <span>ZiCON Developer Portal</span></h2>
                <div className="benefits-grid">
                  <Benefit icon={Zap} title="Fast & Reliable" copy="High performance infrastructure" />
                  <Benefit icon={LockKeyhole} title="Secure by Design" copy="Enterprise-grade security & privacy" />
                  <Benefit icon={Globe2} title="Global Access" copy="Access your projects from anywhere" />
                  <Benefit icon={ShieldCheck} title="Developer First" copy="Built by developers, for developers" />
                  <Benefit icon={Activity} title="Scalable" copy="Scale your apps as you grow" />
                </div>
              </section>
            </div>

            <aside className="right-column">
              <AccountCard onAction={() => setToast('Account settings opened.')} />
              <UsageCard onAction={() => setToast('Showing detailed usage.')} />
              <Announcements announcements={filteredAnnouncements} error={announcementError} onViewAll={() => setToast('All announcements are up to date.')} />
            </aside>
          </div>

          <footer className="page-footer">ZiCON Developer Portal <span>—</span> Empowering Developers. Accelerating Innovation.</footer>
        </div>
      </main>
      {toast && <div className="toast"><ShieldCheck size={17} /> {toast}</div>}
    </div>
  );
}

function NavGroup({ items, activeItem, onChoose }: { items: { label: string; icon: IconType }[]; activeItem: string; onChoose: (label: string) => void }) {
  return <nav className="nav-group">{items.map((item) => <NavItem key={item.label} {...item} active={item.label === activeItem} onChoose={onChoose} />)}</nav>;
}

function NavSection({ title, items, activeItem, onChoose }: { title: string; items: { label: string; icon: IconType }[]; activeItem: string; onChoose: (label: string) => void }) {
  return <div className="nav-section"><div className="nav-label">{title}</div><NavGroup items={items} activeItem={activeItem} onChoose={onChoose} /></div>;
}

function NavItem({ label, icon: Icon, active, onChoose }: { label: string; icon: IconType; active: boolean; onChoose: (label: string) => void }) {
  return <button className={`nav-item ${active ? 'active' : ''}`} onClick={() => onChoose(label)}><Icon size={17} strokeWidth={active ? 2.2 : 1.8} /><span>{label}</span></button>;
}

function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="section-title">{children}</h2>;
}

function ToolCard({ label, title, description, icon: Icon, accent, button, onClick }: { label: string; title: string; description: string; icon: IconType; accent: string; button: string; onClick: () => void }) {
  return <article className={`tool-card accent-${accent}`}><div className="tool-label">{label}</div><Icon className="tool-icon" size={42} strokeWidth={1.6} /><h3>{title}</h3><p>{description}</p><button className="tool-button" onClick={onClick}>{button}<ArrowRight size={16} /></button><button className="details-button" onClick={onClick}>View Details <ArrowRight size={15} /></button></article>;
}

function Benefit({ icon: Icon, title, copy }: { icon: IconType; title: string; copy: string }) {
  return <div className="benefit"><Icon size={17} /><div><strong>{title}</strong><p>{copy}</p></div></div>;
}

function AccountCard({ onAction }: { onAction: () => void }) {
  return <section className="side-card account-card"><div className="side-card-heading"><h2>Account Overview</h2><span className="plan-badge"><Sparkles size={12} /> Enterprise Plan</span></div><div className="account-details"><strong>Demo Account</strong><span>demo@ziconcloud.me</span></div><button className="manage-button" onClick={onAction}>Manage Account <Users size={16} /></button></section>;
}

function UsageCard({ onAction }: { onAction: () => void }) {
  return <section className="side-card usage-card"><div className="side-card-heading"><h2>Usage Overview</h2><button className="month-button" onClick={onAction}>This Month <ArrowRight size={13} /></button></div><div className="usage-list">{usage.map((item) => <div className="usage-row" key={item.label}><div className={`usage-icon ${item.color}`}><item.icon size={18} /></div><div className="usage-main"><div className="usage-meta"><strong>{item.label}</strong><span>{item.value}</span></div><div className="progress-track"><div className={`progress-fill ${item.color}`} style={{ width: `${item.percent}%` }} /></div></div></div>)}</div><button className="usage-link" onClick={onAction}>View Full Usage <ArrowRight size={15} /></button></section>;
}

function Announcements({ announcements, error, onViewAll }: { announcements: Announcement[]; error: string; onViewAll: () => void }) {
  return <section className="side-card announcements-card"><div className="side-card-heading"><h2>Announcements</h2><button className="view-all" onClick={onViewAll}>View All <ArrowRight size={13} /></button></div>{error && <div className="data-note">{error}</div>}<div className="announcement-list">{announcements.map((item) => <article className="announcement" key={item.id}><AnnouncementIcon type={item.icon} /><div><strong>{item.title}</strong><p>{item.description}</p><small>{item.published_label}</small></div></article>)}</div></section>;
}

function AnnouncementIcon({ type }: { type: string }) {
  const Icon = type === 'bolt' ? Rocket : type === 'lock' ? LockKeyhole : FileText;
  return <div className={`announcement-icon ${type}`}><Icon size={14} /></div>;
}

function HeroIllustration() {
  return <div className="hero-art" aria-hidden="true"><div className="art-glow" /><div className="code-window"><div className="window-top"><span /><span /><span /></div><div className="code-lines"><i /><i /><i /><i /><i /><i /></div></div><div className="floating-cloud"><Cloud size={32} /></div><div className="floating-code"><Code2 size={23} /></div><div className="floating-cube"><Box size={22} /></div><div className="laptop"><div className="laptop-screen"><div className="screen-line" /><div className="screen-line short" /><div className="screen-line blue" /><div className="screen-line" /></div><div className="laptop-base" /></div></div>;
}

export default App;
