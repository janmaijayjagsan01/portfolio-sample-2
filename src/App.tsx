import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Code,
  Download,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  MousePointer2,
  Phone,
  Send,
  Sparkles,
  Sun,
  User,
  X,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

type Audience = 'recruiter' | 'builder' | 'collaborator';

const audienceCopy: Record<Audience, { label: string; intro: string; action: string }> = {
  recruiter: {
    label: 'For a recruiter',
    intro: 'I bring a systems mindset, a bias for shipping, and enough curiosity to keep pulling at the thread.',
    action: 'See selected work',
  },
  builder: {
    label: 'For a fellow builder',
    intro: 'I like the seam between a messy real-world problem and the small, reliable tool that makes it lighter.',
    action: 'Open the workbench',
  },
  collaborator: {
    label: 'For a future collaborator',
    intro: 'Bring the sharp question. I will bring a whiteboard, a working prototype, and a habit of leaving things clearer.',
    action: 'Start a conversation',
  },
};

const projects = [
  {
    number: '01',
    name: 'Smart Mart',
    type: 'Inventory, but human',
    description: 'A practical retail system that makes stock, sales, and everyday decisions easier to see at a glance.',
    tags: ['Product thinking', 'Data flows', 'Web app'],
    tone: 'saffron',
    mark: 'SM',
    note: 'from shelf → signal',
    liveUrl: 'https://smart-eccomerce.vercel.app',
    githubUrl: 'https://github.com/janmaijayjagsan01/smart_eccomerce',
  },
  {
    number: '02',
    name: 'NextScrimz',
    type: 'Competition, untangled',
    description: 'A focused esports platform for organizing scrims, teams, and the tiny moments that make a match happen.',
    tags: ['Community', 'Interfaces', 'Systems'],
    tone: 'teal',
    mark: 'NS',
    note: 'from roster → rhythm',
    liveUrl: 'https://nextscrimz.xyz',
    githubUrl: 'https://github.com/janmaijayjagsan01/Nextscrimz',
  },
  {
    number: '03',
    name: 'Rasoee',
    type: 'Recipes with memory',
    description: 'A warm digital kitchen for keeping recipes close, finding the next meal, and making home cooking feel possible.',
    tags: ['Experience design', 'Search', 'Everyday UX'],
    tone: 'coral',
    mark: 'RA',
    note: 'from instinct → table',
    githubUrl: 'https://github.com/janmaijayjagsan01/rasoee',
  },
  {
    number: '04',
    name: 'AI Traffic Detection',
    type: 'Vision & signal flow',
    description: 'An intelligent traffic density monitoring and signal control system using YOLOv8 and PyTorch to dynamically optimize congestion.',
    tags: ['Computer Vision', 'YOLOv8', 'PyTorch', 'Automation'],
    tone: 'indigo',
    mark: 'AI',
    note: 'from density → flow',
    githubUrl: 'https://github.com/janmaijayjagsan01/Ai-traffic-detection-system',
  },
];

const tech = [
  'Python',
  'PySpark',
  'Apache Kafka',
  'Apache Airflow',
  'SQL',
  'Snowflake',
  'AWS',
  'JavaScript',
  'React',
  'Cloud Computing',
  'ETL Pipelines',
  'Problem Solving',
  'Data Structures',
];
const githubUrl = 'https://github.com/janmaijayjagsan01';
const linkedinUrl = 'https://www.linkedin.com/in/janmaijay-jaiswal-635040283';
const emailAddress = 'janmaijayjagsan01@gmail.com';

function useReveal() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
    const nodes = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return ready;
}

function Anchor({ href, children, onClick }: { href: string; children: ReactNode; onClick?: () => void }) {
  return <a data-testid={`link-${href.replace('#', '')}`} href={href} onClick={onClick} className="magnetic-link">{children}</a>;
}

function Nav({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (value: boolean) => void }) {
  const links = [['skills', 'Skills'], ['work', 'Work'], ['story', 'Story'], ['contact', 'Contact']];
  return (
    <header className="absolute left-0 right-0 top-0 z-20">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-6 md:px-8">
        <Anchor href="#top" onClick={() => setMenuOpen(false)}>
          <span className="font-display text-lg font-bold tracking-[-.08em] text-[#efe8d7]">JJ<span className="text-[#f6c85f]">.</span></span>
        </Anchor>
        <nav className="hidden items-center gap-9 text-[11px] font-semibold uppercase tracking-[.18em] text-[#bcb9ca] md:flex">
          {links.map(([id, label]) => <Anchor key={id} href={`#${id}`}>{label}</Anchor>)}
          <a data-testid="link-github" href={githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#f6c85f]">
            GitHub <ArrowUpRight size={13} strokeWidth={1.6} />
          </a>
          <a data-testid="link-linkedin" href={linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#f6c85f]">
            LinkedIn <ArrowUpRight size={13} strokeWidth={1.6} />
          </a>
        </nav>
        <button data-testid="button-open-menu" aria-label="Open navigation menu" onClick={() => setMenuOpen(!menuOpen)} className="grid h-10 w-10 place-items-center border border-[#4e4d6a] text-[#efe8d7] md:hidden">
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {menuOpen && (
        <div className="mx-4 border border-[#555472] bg-[#252545] p-5 md:hidden">
          <div className="flex flex-col gap-5 text-xs font-semibold uppercase tracking-[.2em] text-[#efe8d7]">
            {links.map(([id, label]) => <Anchor key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</Anchor>)}
            <a data-testid="link-github-mobile" href={githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#f6c85f]">GitHub <ArrowUpRight size={14} /></a>
            <a data-testid="link-linkedin-mobile" href={linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#f6c85f]">LinkedIn <ArrowUpRight size={14} /></a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero({ audience }: { audience: Audience }) {
  const copy = audienceCopy[audience];
  return (
    <section id="top" className="hero-ink relative min-h-[760px] overflow-hidden md:min-h-[850px]">
      <div className="absolute inset-0 opacity-60" style={{ background: 'radial-gradient(circle at 78% 22%, rgba(70, 89, 130, .58), transparent 30%), radial-gradient(circle at 7% 92%, rgba(246, 200, 95, .13), transparent 25%)' }} />
      <div className="absolute right-[7%] top-[18%] h-[260px] w-[260px] rounded-full border border-[#777592]/30 md:h-[430px] md:w-[430px]">
        <div className="orb absolute -right-3 top-1/2 h-4 w-4 bg-[#f6c85f] shadow-[0_0_0_9px_rgba(246,200,95,.12)]" />
        <div className="absolute inset-[14%] rounded-full border border-dashed border-[#777592]/25" />
        <div className="orb absolute bottom-[13%] left-[16%] h-2.5 w-2.5 bg-[#d96f5b]" />
      </div>
      <div className="relative mx-auto flex min-h-[760px] max-w-[1240px] flex-col justify-end px-5 pb-14 pt-36 md:min-h-[850px] md:px-8 md:pb-20">
        <div className="mb-auto flex items-start justify-between pt-4">
          <div className="font-mono text-[10px] uppercase tracking-[.23em] text-[#bcb9ca]">Portfolio / 2026 / kanpur, in</div>
          <div className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[.2em] text-[#bcb9ca] md:flex"><span className="h-1.5 w-1.5 rounded-full bg-[#f6c85f]" /> Available for good problems</div>
        </div>
        <div className="relative z-10 max-w-[980px]">
          <p className="reveal mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[.22em] text-[#f6c85f]"><span className="h-px w-8 bg-[#f6c85f]" /> Aspiring software engineer</p>
          <h1 className="reveal reveal-delay-1 font-display text-[clamp(4.4rem,12vw,10.8rem)] font-semibold leading-[.82] tracking-[-.105em] text-[#efe8d7]">
            Janmaijay<br /><span className="ml-[9vw] text-[#f6c85f]">Jaiswal<span className="text-[#d96f5b]">.</span></span>
          </h1>
          <div className="mt-10 flex max-w-[760px] flex-col gap-7 md:ml-[15vw] md:flex-row md:items-end md:justify-between">
            <p className="reveal reveal-delay-2 max-w-[430px] text-[15px] leading-7 text-[#c8c6d2]">{copy.intro}</p>
             <div className="reveal reveal-delay-3 flex shrink-0 flex-wrap items-center gap-5 md:self-end">
               <a data-testid="button-hero-work" href={audience === 'collaborator' ? '#contact' : '#work'} className="group inline-flex items-center gap-4 border-b border-[#f6c85f] pb-2 text-[11px] font-bold uppercase tracking-[.16em] text-[#f6c85f]">
                 {copy.action} <ArrowDown className="transition-transform group-hover:translate-y-1" size={15} />
               </a>
               <a data-testid="link-source-hero" href={githubUrl} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 border-b border-[#777592] pb-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#bcb9ca] hover:text-[#efe8d7]">
                 View source <Github size={14} className="transition-transform group-hover:rotate-12" />
               </a>
             </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-5 border-t border-[#555472] pt-5 text-[#9694aa] md:flex-row md:items-center">
          <div className="font-mono text-[10px] uppercase tracking-[.18em]">Scroll to inspect the thinking</div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.16em]"><MousePointer2 size={13} /> Built in public, learning in motion</div>
        </div>
      </div>
    </section>
  );
}

function AudienceControl({ audience, setAudience }: { audience: Audience; setAudience: (value: Audience) => void }) {
  return (
    <div className="reveal mx-auto mt-10 max-w-[600px] border border-[#3f3e60]/20 bg-[#f5efdf] p-3 shadow-[5px_5px_0_rgba(37,37,69,.08)]">
      <div className="mb-2 px-2 font-mono text-[9px] uppercase tracking-[.18em] text-[#68637a]">Change the lens</div>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(audienceCopy) as Audience[]).map((key) => (
          <button data-testid={`button-audience-${key}`} key={key} onClick={() => setAudience(key)} className={`selection-chip flex-1 border px-3 py-2 text-[10px] font-bold uppercase tracking-[.12em] ${audience === key ? 'border-[#252545] bg-[#252545] text-[#f6c85f]' : 'border-[#d6cdbb] text-[#68637a] hover:border-[#252545] hover:text-[#252545]'}`}>
            {audienceCopy[key].label}
          </button>
        ))}
      </div>
    </div>
  );
}

function IntroSection({ audience, setAudience }: { audience: Audience; setAudience: (value: Audience) => void }) {
  return (
    <section className="paper-grid relative overflow-hidden bg-[#efe8d7] px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto grid max-w-[1240px] gap-14 md:grid-cols-[.85fr_1.5fr] md:gap-24">
        <div className="reveal">
          <span className="font-mono text-[10px] uppercase tracking-[.2em] text-[#68637a]">01 / A short note</span>
          <div className="mt-16 hidden h-32 w-24 rotate-[-7deg] border border-[#d96f5b] p-2 md:block">
            <div className="flex h-full flex-col justify-between border border-[#d96f5b]/50 p-2 font-mono text-[9px] uppercase tracking-[.1em] text-[#d96f5b]"><span>J / J</span><span>Field notes<br />No. 001</span><span>2026</span></div>
          </div>
        </div>
        <div>
          <h2 className="reveal font-display text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[.97] tracking-[-.08em] text-[#252545]">The best code is<br /><span className="text-[#146b72]">a clearer thought.</span></h2>
          <p className="reveal reveal-delay-1 mt-8 max-w-[650px] text-lg leading-8 text-[#4b4963] md:text-xl md:leading-9">I am Janmaijay — a B.Tech student in AI &amp; Data Science at PSIT Kanpur. I enjoy taking a complicated workflow, asking what it is really trying to do, and turning that answer into something people can use.</p>
          <p className="reveal reveal-delay-2 mt-5 max-w-[570px] text-sm leading-7 text-[#68637a]">This space is part portfolio, part workbench. The polished bits are here. So are the questions behind them.</p>
          <AudienceControl audience={audience} setAudience={setAudience} />
        </div>
      </div>
    </section>
  );
}

function CppIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M117.65 37.33L70.4 10.05c-3.95-2.28-10.84-2.28-14.8 0L8.35 37.33C4.4 39.61.95 45.58.95 50.14v54.55c0 4.56 3.45 10.53 7.4 12.81l47.25 27.28c3.95 2.28 10.85 2.28 14.8 0l47.25-27.28c3.95-2.28 7.4-8.25 7.4-12.81V50.14c0-4.56-3.45-10.53-7.4-12.81z" fill="#00599C"/>
      <path d="M63 32.5c-17.4 0-31.5 14.1-31.5 31.5S45.6 95.5 63 95.5c11.9 0 22.3-6.6 27.7-16.4l-11.4-6.6c-3.1 5.9-9.3 9.9-16.3 9.9-10.2 0-18.5-8.3-18.5-18.5s8.3-18.5 18.5-18.5c7 0 13.2 4 16.3 9.9l11.4-6.6c-5.4-9.7-15.8-16.3-27.7-16.3z" fill="#fff"/>
      <path d="M84.5 59h4v-4h3v4h4v3h-4v4h-3v-4h-4v-3zm18 0h4v-4h3v4h4v3h-4v4h-3v-4h-4v-3z" fill="#fff"/>
    </svg>
  );
}

function Html5Icon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M71.2 460.6L35.8 64h440.4l-35.4 396.6L256 504l-184.8-43.4z" fill="#E44D26"/>
      <path d="M256 472l153.2-36 30.6-343H256v379z" fill="#F16529"/>
      <path d="M256 207.6H173l-5.6-62.8h177.2V93.6H104.6l17 190.2H256v-76.2zm0 138.8l-72.2-19.4-4.6-51.8H127l8.4 94.6 120.6 33.4v-56.8z" fill="#EBEBEB"/>
      <path d="M255.8 207.6v76.2h76.8l-7.2 81-69.6 18.8v57.4l121.2-33.6 16.8-199.8H255.8zm0-114v51.2h145.4l4.6-51.2H255.8z" fill="#fff"/>
    </svg>
  );
}

function TailwindIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 9.6c-5.6 0-9.1 2.8-10.5 8.4 2.1-2.8 4.6-3.9 7.4-3.2 1.6.4 2.8 1.6 4.1 2.9 2.1 2.2 4.5 4.7 9.8 4.7 5.6 0 9.1-2.8 10.5-8.4-2.1 2.8-4.6 3.9-7.4 3.2-1.6-.4-2.8-1.6-4.1-2.9-2.1-2.2-4.5-4.7-9.8-4.7zm-10.5 12.8c-5.6 0-9.1 2.8-10.5 8.4 2.1-2.8 4.6-3.9 7.4-3.2 1.6.4 2.8 1.6 4.1 2.9 2.1 2.2 4.5 4.7 9.8 4.7 5.6 0 9.1-2.8 10.5-8.4-2.1 2.8-4.6 3.9-7.4 3.2-1.6-.4-2.8-1.6-4.1-2.9-2.1-2.2-4.5-4.7-9.8-4.7z" fill="#38BDF8"/>
    </svg>
  );
}

function Css3Icon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M71.2 460.6L35.8 64h440.4l-35.4 396.6L256 504l-184.8-43.4z" fill="#1572B6"/>
      <path d="M256 472l153.2-36 30.6-343H256v379z" fill="#33A9DC"/>
      <path d="M256 207.6H173l-5.6-62.8h88.6V93.6H104.6l17 190.2H256v-76.2zm0 138.8l-72.2-19.4-4.6-51.8H127l8.4 94.6 120.6 33.4v-56.8z" fill="#EBEBEB"/>
      <path d="M255.8 207.6v76.2h76.8l-7.2 81-69.6 18.8v57.4l121.2-33.6 16.8-199.8H255.8zm0-114v51.2h145.4l4.6-51.2H255.8z" fill="#fff"/>
    </svg>
  );
}

function ReactIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </g>
    </svg>
  );
}

function PostgresIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M64 12C38 12 20 28 16 48c-3 15 2 30 11 41 4 5 9 9 15 12l2-6c-5-3-9-6-13-10-8-9-11-21-9-33 3-17 19-30 42-30 24 0 41 14 43 32 2 13-3 25-12 34-4 4-8 7-13 10l2 6c6-3 12-7 17-12 11-11 16-26 14-43-3-22-22-38-48-38z" fill="#336791"/>
      <path d="M64 26c-18 0-32 12-32 28 0 10 6 19 15 24 2 1 3 4 2 6l-3 12 12-6c2-1 4-1 6 0 5 3 11 4 17 4 18 0 32-12 32-28S82 26 64 26zm-7 39c-4 0-7-3-7-7s3-7 7-7 7 3 7 7-3 7-7 7zm22 0c-4 0-7-3-7-7s3-7 7-7 7 3 7 7-3 7-7 7z" fill="#336791"/>
      <circle cx="57" cy="58" r="3" fill="#fff"/>
      <circle cx="79" cy="58" r="3" fill="#fff"/>
    </svg>
  );
}

function MongoIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M31.8 2.2s-2.1 2.3-4.5 5.5C21.7 15 13 27.5 13 38.3c0 10.7 7.7 20 18.2 22.8.3.1.6.2.9.2.3 0 .6-.1.9-.2 10.5-2.8 18.2-12.1 18.2-22.8 0-10.8-8.7-23.3-14.3-30.6-2.4-3.2-4.5-5.5-4.5-5.5z" fill="#4DB33D"/>
      <path d="M32 2.2v58.9c9.8-2.7 17-11.5 17-21.8 0-10.8-8.7-23.3-14.3-30.6C33.1 6.3 32 2.2 32 2.2z" fill="#3FA037"/>
      <path d="M32 4.1c-1.4 1.7-16.7 20.8-16.7 34.2 0 8.7 5.7 16.3 14 19.3V4.1h2.7z" fill="#47A248"/>
      <path d="M31.2 59.8c-.3 0-.6-.1-.9-.2V42.7l1.7-1.3v18.4z" fill="#E8E8E8"/>
    </svg>
  );
}

function PythonIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 110" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M54.1 2c-23.3 0-21.8 10.1-21.8 10.1l.03 10.5h22.2v3.1H23.5S2 23.2 2 46.8s18.8 22.8 18.8 22.8h11.2v-15.7s-.6-18.7 18.4-18.7h17.9s17.3.3 17.3-16.7V17.7S77.4 2 54.1 2zm-12.4 6.9c2.4 0 4.4 2 4.4 4.4s-2 4.4-4.4 4.4-4.4-2-4.4-4.4 2-4.4 4.4-4.4z" fill="#3776AB"/>
      <path d="M55.9 108c23.3 0 21.8-10.1 21.8-10.1l-.03-10.5H55.5v-3.1h30.9S108 86.8 108 63.2 89.2 40.4 89.2 40.4H78v15.7s.6 18.7-18.4 18.7H41.7s-17.3-.3-17.3 16.7v11.3S32.6 108 55.9 108zm12.4-6.9c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4 2 4.4 4.4-2 4.4-4.4 4.4z" fill="#FFD438"/>
    </svg>
  );
}

function PysparkIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M48 6c-3 10-14 18-20 28-7 11-6 24 1 34 8 11 22 16 34 11 13-5 21-19 18-32-2-10-10-18-17-25-3-3-6-7-8-12-1-2-5-6-8-4z" fill="#E25A1C"/>
      <path d="M47 34c-2 6-8 11-12 17-4 7-3 14 1 20 5 7 14 9 21 6 8-3 13-11 11-19-1-6-6-11-10-15-2-2-4-5-5-7-1-1-3-3-6-2z" fill="#F49A24"/>
      <circle cx="47" cy="54" r="5" fill="#FFE885"/>
    </svg>
  );
}

function KafkaIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="14" fill="#fff"/>
      <circle cx="20" cy="28" r="10" fill="#fff"/>
      <circle cx="20" cy="72" r="10" fill="#fff"/>
      <circle cx="80" cy="28" r="10" fill="#fff"/>
      <circle cx="80" cy="72" r="10" fill="#fff"/>
      <line x1="28" y1="34" x2="40" y2="44" stroke="#fff" strokeWidth="6" strokeLinecap="round"/>
      <line x1="28" y1="66" x2="40" y2="56" stroke="#fff" strokeWidth="6" strokeLinecap="round"/>
      <line x1="72" y1="34" x2="60" y2="44" stroke="#fff" strokeWidth="6" strokeLinecap="round"/>
      <line x1="72" y1="66" x2="60" y2="56" stroke="#fff" strokeWidth="6" strokeLinecap="round"/>
    </svg>
  );
}

function AirflowIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="10" fill="#017CEE"/>
      <path d="M50 12c0 14-8 26-20 31 12 5 20 17 20 31 0-14 8-26 20-31-12-5-20-17-20-31z" fill="#00C7D4" opacity="0.85"/>
      <path d="M12 50c14 0 26 8 31 20 5-12 17-20 31-20-14 0-26-8-31-20-5 12-17 20-31 20z" fill="#017CEE" opacity="0.85"/>
    </svg>
  );
}

function SnowflakeIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#29B5E8" strokeWidth="6" strokeLinecap="round">
        <line x1="50" y1="10" x2="50" y2="90"/>
        <line x1="15" y1="30" x2="85" y2="70"/>
        <line x1="15" y1="70" x2="85" y2="30"/>
        <path d="M42 22l8-8 8 8M42 78l8 8 8-8"/>
        <path d="M26 31l-8 4 4 8M74 69l8-4-4-8"/>
        <path d="M26 69l-8-4 4-8M74 31l8 4-4 8"/>
      </g>
    </svg>
  );
}

function AwsIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 15h10l8 24h-7l-2-6h-8l-2 6h-7l8-24zm5 13h5l-2.5-9-2.5 9z" fill="#fff"/>
      <path d="M37 15h6l5 17 5-17h6l5 17 5-17h6l-8 24h-6l-5-16-5 16h-6l-8-24z" fill="#fff"/>
      <path d="M72 32c2 5 7 7 12 7 6 0 9-3 9-6 0-10-21-4-21-18 0-6 5-10 13-10 7 0 11 3 13 7l-5 3c-1-3-4-5-8-5-4 0-7 2-7 5 0 8 21 3 21 17 0 7-5 11-14 11-9 0-14-4-16-10l6-4z" fill="#fff"/>
      <path d="M12 48c26 12 55 11 76-3" stroke="#FF9900" strokeWidth="5" strokeLinecap="round"/>
      <path d="M88 43l3 8-8 1z" fill="#FF9900"/>
    </svg>
  );
}

function JsIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="16" fill="#F7DF1E"/>
      <path d="M28 72c0 8-5 13-13 13-4 0-8-2-10-5l6-5c1 2 2 3 4 3 3 0 5-2 5-6V35h8v37zm32-15c0-11-8-15-18-19-6-2-9-4-9-7s3-5 7-5c4 0 7 2 9 5l6-5c-4-5-9-7-15-7-9 0-16 5-16 13 0 10 7 14 17 18 6 3 9 5 9 8 0 3-3 6-8 6-5 0-9-3-11-7l-6 5c3 6 9 9 17 9 10 0 17-6 17-15z" fill="#000" transform="translate(18, 0) scale(0.85)"/>
    </svg>
  );
}

function SqlIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="24" rx="34" ry="14" fill="#00758F"/>
      <path d="M16 24v24c0 7.7 15.2 14 34 14s34-6.3 34-14V24c0 7.7-15.2 14-34 14S16 31.7 16 24z" fill="#00758F" opacity="0.85"/>
      <path d="M16 48v24c0 7.7 15.2 14 34 14s34-6.3 34-14V48c0 7.7-15.2 14-34 14S16 55.7 16 48z" fill="#F29111"/>
    </svg>
  );
}

function SpotifyIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#1DB954" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  );
}

const technicalSkills = [
  { name: 'C++', icon: CppIcon },
  { name: 'HTML5', icon: Html5Icon },
  { name: 'Tailwind CSS', icon: TailwindIcon },
  { name: 'CSS3', icon: Css3Icon },
  { name: 'React Native', icon: ReactIcon, sublabel: 'React Native' },
  { name: 'PostgreSQL', icon: PostgresIcon },
  { name: 'MongoDB', icon: MongoIcon },
  { name: 'Python', icon: PythonIcon },
  { name: 'PySpark', icon: PysparkIcon },
  { name: 'Apache Kafka', icon: KafkaIcon },
  { name: 'Apache Airflow', icon: AirflowIcon },
  { name: 'Snowflake', icon: SnowflakeIcon },
  { name: 'AWS', icon: AwsIcon },
  { name: 'JavaScript', icon: JsIcon },
  { name: 'SQL', icon: SqlIcon },
];

function SkillsSection() {
  return (
    <section id="skills" aria-label="Technical Skills" className="hero-ink relative overflow-hidden border-y border-[#4d4c68] px-5 py-20 md:px-8 md:py-28">
      {/* Decorative concentric orbits matching original theme */}
      <div className="pointer-events-none absolute -right-24 top-6 h-72 w-72 rounded-full border border-[#777592]/20" />
      <div className="pointer-events-none absolute -right-12 top-14 h-52 w-52 rounded-full border border-dashed border-[#777592]/20" />

      <div className="relative mx-auto max-w-[1240px] mb-12">
        <span className="reveal font-mono text-[10px] uppercase tracking-[.2em] text-[#bcb9ca]">02 / Core Capabilities</span>
        <h2 className="reveal reveal-delay-1 mt-4 font-display text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[.92] tracking-[-.08em] text-[#efe8d7]">
          My Technical <br />
          <span className="text-[#f6c85f]">Background Skills.</span>
        </h2>
      </div>

      {/* Infinite Scrolling Track */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Soft edge gradients matching hero-ink #252545 */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 md:w-36 bg-gradient-to-r from-[#252545] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 md:w-36 bg-gradient-to-l from-[#252545] to-transparent" />

        <div className="skills-track flex w-max items-center gap-6 sm:gap-8 select-none">
          {[...technicalSkills, ...technicalSkills, ...technicalSkills].map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={`${skill.name}-${index}`}
                className="group flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#1c1c38] border border-[#555472] hover:border-[#f6c85f] hover:bg-[#222244] hover:-translate-y-1 transition-all duration-200 shadow-[5px_5px_0_rgba(0,0,0,0.18)] cursor-pointer p-3 relative"
                title={skill.name}
              >
                <div className="flex items-center justify-center w-11 h-11 transition-transform duration-200 group-hover:scale-110">
                  <Icon className="w-9 h-9 object-contain drop-shadow" />
                </div>
                {skill.sublabel && (
                  <span className="mt-1 font-mono text-[8.5px] uppercase tracking-wider text-[#bcb9ca] group-hover:text-[#f6c85f] transition-colors text-center leading-none">
                    {skill.sublabel}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectVisual({ tone, mark, url }: { tone: string; mark: string; url?: string }) {
  const palette =
    tone === 'saffron'
      ? { bg: '#f6c85f', ink: '#252545', line: '#d96f5b' }
      : tone === 'teal'
      ? { bg: '#78b7b3', ink: '#252545', line: '#146b72' }
      : tone === 'indigo'
      ? { bg: '#465982', ink: '#efe8d7', line: '#f6c85f' }
      : { bg: '#d96f5b', ink: '#efe8d7', line: '#f6c85f' };

  const visual = (
    <div className="relative h-52 overflow-hidden p-5 transition-transform duration-300 group-hover:scale-[1.01]" style={{ backgroundColor: palette.bg, color: palette.ink }}>
      <div className="absolute -right-10 -top-14 h-44 w-44 rounded-full border-[1.5px]" style={{ borderColor: palette.line }} />
      <div className="absolute -right-2 -top-6 h-32 w-32 rounded-full border" style={{ borderColor: palette.line }} />
      <div className="absolute bottom-[-55px] left-10 h-44 w-44 rotate-45 border" style={{ borderColor: palette.line }} />
      <span className="font-mono text-[10px] uppercase tracking-[.15em] opacity-70">Selected build / 2024—26</span>
      <div className="absolute bottom-4 left-5 font-display text-7xl font-bold tracking-[-.12em]">{mark}</div>
      <div className="absolute bottom-5 right-5 flex h-8 w-8 items-center justify-center border transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ borderColor: palette.ink }}><ArrowUpRight size={15} /></div>
    </div>
  );

  return url ? (
    <a href={url} target="_blank" rel="noreferrer" className="group block focus:outline-none" title="Open project">
      {visual}
    </a>
  ) : (
    <div className="group">{visual}</div>
  );
}

function WorkSection() {
  return (
    <section id="work" className="bg-[#efe8d7] px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-16 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><span className="reveal font-mono text-[10px] uppercase tracking-[.2em] text-[#68637a]">02 / Workbench</span><h2 className="reveal reveal-delay-1 mt-5 font-display text-[clamp(3rem,7vw,7rem)] font-medium leading-[.83] tracking-[-.1em] text-[#252545]">Things I have<br /><span className="text-[#d96f5b]">made useful.</span></h2></div>
          <p className="reveal max-w-[280px] text-sm leading-6 text-[#68637a] md:pb-2">Four projects, each tackling a different kind of friction. Each one taught me where the real product starts.</p>
        </div>
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, index) => {
            const primaryUrl = project.liveUrl || project.githubUrl;
            return (
              <article data-testid={`card-project-${project.name.toLowerCase().replace(/\s+/g, '-')}`} key={project.name} className={`project-card reveal reveal-delay-${(index % 4) + 1} flex flex-col justify-between overflow-hidden border border-[#cfc4b0] bg-[#f5efdf]`}>
                <div>
                  <ProjectVisual tone={project.tone} mark={project.mark} url={primaryUrl} />
                  <div className="p-6 md:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-mono text-[10px] text-[#68637a]">{project.number}</div>
                        <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-.07em] text-[#252545]">{project.name}</h3>
                      </div>
                      <span className="mt-1 text-[#d96f5b]"><Sparkles size={17} strokeWidth={1.5} /></span>
                    </div>
                    <p className="mt-4 text-[12px] font-semibold uppercase tracking-[.08em] text-[#146b72]">{project.type}</p>
                    <p className="mt-3 min-h-[72px] text-sm leading-6 text-[#68637a]">{project.description}</p>
                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => <span key={tag} className="border border-[#d6cdbb] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[.08em] text-[#68637a]">{tag}</span>)}
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6 md:px-7 md:pb-7">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#d6cdbb] pt-4 font-mono text-[10px] uppercase tracking-[.12em] text-[#68637a]">
                    <span className="truncate max-w-[105px]">{project.note}</span>
                    <div className="flex items-center gap-3">
                      {project.liveUrl && (
                        <a
                          data-testid={`link-live-${project.name.toLowerCase().replace(/\s+/g, '-')}`}
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 font-bold text-[#146b72] hover:text-[#252545] hover:underline"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-[#146b72]" />
                          Live <ArrowUpRight size={13} />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          data-testid={`link-repo-${project.name.toLowerCase().replace(/\s+/g, '-')}`}
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 font-medium text-[#68637a] hover:text-[#252545] hover:underline"
                        >
                          <Github size={12} />
                          {project.liveUrl ? 'Code' : 'GitHub'} <ArrowUpRight size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section id="story" className="bg-[#d6cdbb] px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-16 md:grid-cols-[1.1fr_.9fr] md:gap-28">
          <div>
            <span className="reveal font-mono text-[10px] uppercase tracking-[.2em] text-[#68637a]">03 / The timeline</span>
            <h2 className="reveal reveal-delay-1 mt-5 max-w-[680px] font-display text-[clamp(2.8rem,6vw,6rem)] font-medium leading-[.9] tracking-[-.1em] text-[#252545]">Learning in<br /><span className="text-[#146b72]">layers,</span> not leaps.</h2>
            <div className="reveal reveal-delay-2 mt-12 border-l border-[#8d8490] pl-6 md:pl-9">
              <div className="relative pb-12"><span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-[#d6cdbb] bg-[#d96f5b] md:-left-[39px]" /><p className="font-mono text-[10px] uppercase tracking-[.16em] text-[#68637a]">2023 — 2027 / Kanpur</p><h3 className="mt-3 font-display text-2xl font-semibold tracking-[-.05em] text-[#252545]">B.Tech, AI &amp; Data Science</h3><p className="mt-2 text-sm leading-6 text-[#68637a]">PSIT Kanpur · Building the fundamentals that let an idea survive contact with reality.</p></div>
              <div className="relative pb-12"><span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-[#d6cdbb] bg-[#f6c85f] md:-left-[39px]" /><p className="font-mono text-[10px] uppercase tracking-[.16em] text-[#68637a]">2026 / Cloud chapter</p><h3 className="mt-3 font-display text-2xl font-semibold tracking-[-.05em] text-[#252545]">IBM PBEL Cloud Computing internship</h3><p className="mt-2 text-sm leading-6 text-[#68637a]">A next chapter in understanding how useful software gets from a laptop into the hands of many.</p></div>
              <div className="relative"><span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-[#d6cdbb] bg-[#146b72] md:-left-[39px]" /><p className="font-mono text-[10px] uppercase tracking-[.16em] text-[#68637a]">2026 / Data Engineering chapter</p><h3 className="mt-3 font-display text-2xl font-semibold tracking-[-.05em] text-[#252545]">Distributed Pipelines &amp; ETL Systems</h3><p className="mt-2 text-sm leading-6 text-[#68637a]">Building resilient pipelines, streaming data, and automated workflows using PySpark, Kafka, Airflow, and Cloud Warehouses.</p></div>
            </div>
          </div>
          <div className="relative">
            <div className="reveal float-slow mx-auto max-w-[350px] rotate-[-4deg] bg-[#f5efdf] p-5 shadow-[10px_12px_0_rgba(37,37,69,.12)]">
              <div className="flex aspect-[4/5] flex-col justify-between border border-[#bdb2a1] p-5">
                <div className="flex justify-between font-mono text-[10px] uppercase tracking-[.16em] text-[#68637a]"><span>Notebook / 017</span><span>JJ</span></div>
                <div><div className="mb-6 h-px w-24 bg-[#d96f5b]" /><p className="font-display text-4xl font-semibold leading-[.96] tracking-[-.08em] text-[#252545]">Make the<br />complex<br /><span className="text-[#d96f5b]">legible.</span></p></div>
                <div className="font-mono text-[10px] uppercase leading-5 tracking-[.12em] text-[#68637a]">Question worth keeping:<br />What would make this feel obvious?</div>
              </div>
            </div>
            <div className="reveal reveal-delay-2 absolute -bottom-8 -right-2 rotate-[8deg] bg-[#146b72] px-4 py-3 font-mono text-[10px] uppercase tracking-[.14em] text-[#efe8d7] shadow-[5px_5px_0_rgba(37,37,69,.12)] md:right-0">Currently: Data Engineering &amp; Distributed Systems</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    ['01', 'Notice', 'Start with the friction, not the feature list.'],
    ['02', 'Model', 'Give the messy parts names, shapes, and a place to live.'],
    ['03', 'Ship', 'Make the smallest useful version real, then listen closely.'],
  ];
  return (
    <section className="bg-[#efe8d7] px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-10 md:grid-cols-[.65fr_1.35fr] md:gap-24">
          <div><span className="reveal font-mono text-[10px] uppercase tracking-[.2em] text-[#68637a]">04 / How I work</span><h2 className="reveal reveal-delay-1 mt-5 font-display text-5xl font-medium leading-[.9] tracking-[-.09em] text-[#252545] md:text-7xl">A small<br /><span className="text-[#d96f5b]">working theory.</span></h2></div>
          <div className="border-t border-[#bdb2a1]">{steps.map(([number, title, text], index) => <div key={number} className={`reveal reveal-delay-${index + 1} grid grid-cols-[55px_1fr] gap-4 border-b border-[#bdb2a1] py-7 md:grid-cols-[80px_1fr_1fr] md:items-center`}><span className="font-mono text-[11px] text-[#d96f5b]">{number}</span><h3 className="font-display text-2xl font-semibold tracking-[-.06em] text-[#252545]">{title}</h3><p className="col-start-2 text-sm leading-6 text-[#68637a] md:col-start-3">{text}</p></div>)}</div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
    }, 4500);
  };

  const toggleTheme = () => {
    setIsLightMode((prev) => !prev);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <section id="contact" className="hero-ink relative overflow-hidden px-5 py-24 md:px-8 md:py-36">
      {/* Original decorative concentric orbits */}
      <div className="pointer-events-none absolute -right-28 top-16 h-80 w-80 rounded-full border border-[#777592]/25" />
      <div className="pointer-events-none absolute -right-16 top-28 h-56 w-56 rounded-full border border-dashed border-[#777592]/25" />

      <div className="relative mx-auto max-w-[1240px]">
        {/* Section Number & Heading in Original Theme */}
        <span className="reveal font-mono text-[10px] uppercase tracking-[.2em] text-[#bcb9ca]">05 / The open tab</span>
        <h2 className="reveal reveal-delay-1 mt-7 max-w-[900px] font-display text-[clamp(3.6rem,8.5vw,8.5rem)] font-medium leading-[.84] tracking-[-.11em] text-[#efe8d7]">
          Get In <br />
          <span className="text-[#f6c85f]">Touch.</span>
        </h2>

        {/* Intro text */}
        <div className="reveal reveal-delay-1 mt-10 grid gap-6 md:grid-cols-2 max-w-3xl border-t border-[#555472] pt-7 text-base leading-7 text-[#c8c6d2]">
          <p>
            Have a project in mind, a tangled problem, or just want to connect? I would love to hear from you — let us build something amazing together.
          </p>
          <p>
            I am always open to opportunities, collaborations, and conversations about systems, software, and products that people use.
          </p>
        </div>

        {/* Two-Column Grid: Contact Details & Floating Message Card */}
        <div className="mt-14 grid gap-12 lg:grid-cols-[1.05fr_1.1fr] lg:gap-16 items-start">
          {/* Left: Contact Info Pills & Socials */}
          <div className="reveal reveal-delay-2 flex flex-col gap-5">
            {/* Email Pill */}
            <a
              data-testid="link-email-contact"
              href={`mailto:${emailAddress}`}
              className="group flex items-center gap-4 p-4 border border-[#555472] bg-[#1c1c38] hover:border-[#f6c85f] hover:bg-[#202042] transition-all duration-200 shadow-[5px_5px_0_rgba(0,0,0,.15)]"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#555472] bg-[#252545] text-[#f6c85f] group-hover:scale-105 transition-all">
                <Mail size={18} />
              </div>
              <span className="font-mono text-sm tracking-wide text-[#efe8d7] group-hover:text-[#f6c85f] transition-colors">
                {emailAddress}
              </span>
            </a>

            {/* Phone Pill */}
            <a
              data-testid="link-phone-contact"
              href="tel:+91985180994"
              className="group flex items-center gap-4 p-4 border border-[#555472] bg-[#1c1c38] hover:border-[#f6c85f] hover:bg-[#202042] transition-all duration-200 shadow-[5px_5px_0_rgba(0,0,0,.15)]"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#555472] bg-[#252545] text-[#f6c85f] group-hover:scale-105 transition-all">
                <Phone size={18} />
              </div>
              <span className="font-mono text-sm tracking-wide text-[#efe8d7] group-hover:text-[#f6c85f] transition-colors">
                +91 985180994
              </span>
            </a>

            {/* Location Pill */}
            <div className="flex items-center gap-4 p-4 border border-[#555472] bg-[#1c1c38] shadow-[5px_5px_0_rgba(0,0,0,.15)]">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#555472] bg-[#252545] text-[#d96f5b]">
                <MapPin size={18} />
              </div>
              <span className="font-mono text-sm tracking-wide text-[#efe8d7]">
                Kanpur, Uttar Pradesh
              </span>
            </div>

            {/* Social Buttons Row */}
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <a
                data-testid="link-linkedin-contact"
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center border border-[#555472] bg-[#1c1c38] text-[#bcb9ca] hover:text-[#f6c85f] hover:border-[#f6c85f] hover:bg-[#252545] transition-all"
              >
                <Linkedin size={17} />
              </a>
              <a
                data-testid="link-github-contact"
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center border border-[#555472] bg-[#1c1c38] text-[#bcb9ca] hover:text-[#f6c85f] hover:border-[#f6c85f] hover:bg-[#252545] transition-all"
              >
                <Github size={17} />
              </a>
              <a
                data-testid="link-code-contact"
                href="https://leetcode.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Coding Profile"
                className="flex h-11 w-11 items-center justify-center border border-[#555472] bg-[#1c1c38] text-[#bcb9ca] hover:text-[#f6c85f] hover:border-[#f6c85f] hover:bg-[#252545] transition-all"
              >
                <Code size={17} />
              </a>
              <a
                data-testid="link-instagram-contact"
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center border border-[#555472] bg-[#1c1c38] text-[#bcb9ca] hover:text-[#f6c85f] hover:border-[#f6c85f] hover:bg-[#252545] transition-all"
              >
                <Instagram size={17} />
              </a>
            </div>
          </div>

          {/* Right: Floating Message Card in Original Tactile Aesthetic */}
          <div className="reveal reveal-delay-2 relative border border-[#555472] bg-[#1c1c38] p-6 sm:p-8 shadow-[10px_12px_0_rgba(0,0,0,.25)]">
            <div className="mb-6 flex items-center justify-between border-b border-[#555472] pb-4">
              <h3 className="font-display text-2xl font-semibold tracking-[-.05em] text-[#efe8d7]">
                Message
              </h3>
              <div className="h-2 w-16 bg-[#f6c85f]" />
            </div>

            {submitted ? (
              <div className="py-10 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center border border-[#f6c85f] bg-[#f6c85f]/15 text-[#f6c85f] mb-4">
                  <Check size={24} />
                </div>
                <h4 className="font-display text-xl font-semibold text-[#efe8d7]">Message Dispatched</h4>
                <p className="mt-2 text-sm text-[#c8c6d2]">
                  Thank you for reaching out. I will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#777592]">
                    <User size={16} />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full border border-[#555472] bg-[#15152a] py-3 pl-10 pr-3 font-mono text-xs text-[#efe8d7] placeholder-[#777592] focus:border-[#f6c85f] focus:outline-none transition-all"
                  />
                </div>

                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#777592]">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full border border-[#555472] bg-[#15152a] py-3 pl-10 pr-3 font-mono text-xs text-[#efe8d7] placeholder-[#777592] focus:border-[#f6c85f] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type Message"
                    className="w-full border border-[#555472] bg-[#15152a] p-3 font-mono text-xs text-[#efe8d7] placeholder-[#777592] focus:border-[#f6c85f] focus:outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 bg-[#f6c85f] hover:bg-[#ffe082] text-[#252545] font-bold font-mono text-xs uppercase tracking-[.14em] shadow-[4px_4px_0_rgba(0,0,0,.25)] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send size={14} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Floating Dock Toolbar */}
        <div className="reveal reveal-delay-3 mt-16 flex justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 border border-[#555472] bg-[#1c1c38]/95 backdrop-blur-md p-2 sm:p-2.5 shadow-[6px_6px_0_rgba(0,0,0,.25)]">
            {/* Resume CV */}
            <a
              data-testid="link-resume"
              href="/JJ_RESUME_1787425298534.pdf"
              download
              className="flex items-center gap-3 px-3.5 py-2 hover:bg-[#252545] transition-colors"
            >
              <div className="flex h-7 w-7 items-center justify-center border border-[#d96f5b] bg-[#d96f5b]/20 text-[#d96f5b]">
                <Download size={14} />
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="font-mono text-xs font-bold text-[#d96f5b]">Resume</span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#777592]">Download CV</span>
              </div>
            </a>

            <div className="h-6 w-px bg-[#555472]" />

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-3 px-3.5 py-2 hover:bg-[#252545] transition-colors cursor-pointer"
            >
              <div className="flex h-7 w-7 items-center justify-center border border-[#f6c85f] bg-[#f6c85f]/20 text-[#f6c85f]">
                {isLightMode ? <Moon size={14} /> : <Sun size={14} />}
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="font-mono text-xs font-bold text-[#efe8d7]">{isLightMode ? 'Dark Mode' : 'Light Mode'}</span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#777592]">Switch theme</span>
              </div>
            </button>

            <div className="h-6 w-px bg-[#555472]" />

            {/* Spotify */}
            <a
              href="https://open.spotify.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 px-3.5 py-2 hover:bg-[#252545] transition-colors"
            >
              <div className="flex h-7 w-7 items-center justify-center border border-[#1DB954] bg-[#1DB954]/20">
                <SpotifyIcon className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="font-mono text-xs font-bold text-[#1DB954]">Spotify</span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#777592]">Blend with me</span>
              </div>
            </a>
          </div>
        </div>

        {/* Original Footer line */}
        <div className="mt-20 flex flex-col justify-between gap-4 border-t border-[#555472] pt-5 font-mono text-[10px] uppercase tracking-[.17em] text-[#777592] md:flex-row">
          <span>Janmaijay Jaiswal / 2026</span>
          <span>Made with patience + sharp edges</span>
          <Anchor href="#top">Back to top ↑</Anchor>
        </div>
      </div>
    </section>
  );
}

function OpeningSequence({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="opening-sequence" role="status" aria-label="Opening portfolio">
      <div className="opening-sequence__top">
        <span>Selected portfolio / 2026</span>
        <button type="button" onClick={onComplete} data-testid="button-skip-intro">
          Skip intro <ArrowUpRight size={13} />
        </button>
      </div>
      <div className="opening-sequence__center">
        <span className="opening-sequence__eyebrow">Software engineer / Kanpur, India</span>
        <div className="opening-sequence__name" aria-hidden="true">
          <span>JANMAIJAY</span>
          <span>JAISWAL <b>— PORTFOLIO</b></span>
        </div>
        <div className="opening-sequence__line"><span /></div>
        <p>Systems / products / curiosity</p>
      </div>
      <div className="opening-sequence__footer">
        <span>Scroll to enter</span>
        <span className="opening-sequence__counter">Loading selected work <i /></span>
      </div>
    </div>
  );
}

function Home() {
  const [audience, setAudience] = useState<Audience>('recruiter');
  const [menuOpen, setMenuOpen] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const revealed = useReveal();
  useEffect(() => {
    document.title = 'Janmaijay Jaiswal — Software Engineer';
    const timer = window.setTimeout(() => setIntroComplete(true), 3100);
    return () => window.clearTimeout(timer);
  }, []);
  return (
    <>
      {!introComplete && <OpeningSequence onComplete={() => setIntroComplete(true)} />}
      <main className={`${revealed ? 'page-ready' : ''} ${introComplete ? 'site-unlocked' : 'site-locked'}`}>
      <section className="hero-ink relative">
        <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Hero audience={audience} />
      </section>
      <IntroSection audience={audience} setAudience={setAudience} />
      <SkillsSection />
      <WorkSection />
      <StorySection />
      <ProcessSection />
      <ContactSection />
      </main>
    </>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;