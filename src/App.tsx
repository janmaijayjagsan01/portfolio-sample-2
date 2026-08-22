import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, Menu, MousePointer2, Sparkles, X } from 'lucide-react';
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
  },
];

const tech = ['Java', 'Python', 'JavaScript', 'React', 'SQL', 'Cloud Computing', 'Problem Solving', 'Data Structures'];
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
  const links = [['work', 'Work'], ['story', 'Story'], ['contact', 'Contact']];
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

function TechStrip() {
  return (
    <section aria-label="Technologies" className="overflow-hidden border-y border-[#4d4c68] bg-[#252545] py-5 text-[#efe8d7]">
      <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap font-mono text-[11px] uppercase tracking-[.2em]">
        {[...tech, ...tech].map((item, index) => <span key={`${item}-${index}`} className="flex items-center gap-8"><span className="text-[#f6c85f]">/</span>{item}</span>)}
      </div>
    </section>
  );
}

function ProjectVisual({ tone, mark }: { tone: string; mark: string }) {
  const palette = tone === 'saffron' ? { bg: '#f6c85f', ink: '#252545', line: '#d96f5b' } : tone === 'teal' ? { bg: '#78b7b3', ink: '#252545', line: '#146b72' } : { bg: '#d96f5b', ink: '#efe8d7', line: '#f6c85f' };
  return (
    <div className="relative h-52 overflow-hidden p-5" style={{ backgroundColor: palette.bg, color: palette.ink }}>
      <div className="absolute -right-10 -top-14 h-44 w-44 rounded-full border-[1.5px]" style={{ borderColor: palette.line }} />
      <div className="absolute -right-2 -top-6 h-32 w-32 rounded-full border" style={{ borderColor: palette.line }} />
      <div className="absolute bottom-[-55px] left-10 h-44 w-44 rotate-45 border" style={{ borderColor: palette.line }} />
      <span className="font-mono text-[10px] uppercase tracking-[.15em] opacity-70">Selected build / 2024—25</span>
      <div className="absolute bottom-4 left-5 font-display text-7xl font-bold tracking-[-.12em]">{mark}</div>
      <div className="absolute bottom-5 right-5 flex h-8 w-8 items-center justify-center border" style={{ borderColor: palette.ink }}><ArrowUpRight size={15} /></div>
    </div>
  );
}

function WorkSection() {
  return (
    <section id="work" className="bg-[#efe8d7] px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-16 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><span className="reveal font-mono text-[10px] uppercase tracking-[.2em] text-[#68637a]">02 / Workbench</span><h2 className="reveal reveal-delay-1 mt-5 font-display text-[clamp(3rem,7vw,7rem)] font-medium leading-[.83] tracking-[-.1em] text-[#252545]">Things I have<br /><span className="text-[#d96f5b]">made useful.</span></h2></div>
          <p className="reveal max-w-[260px] text-sm leading-6 text-[#68637a] md:pb-2">Three projects, three different kinds of friction. Each one taught me where the real product starts.</p>
        </div>
        <div className="grid gap-7 md:grid-cols-3">
          {projects.map((project, index) => (
            <article data-testid={`card-project-${project.name.toLowerCase().replace(' ', '-')}`} key={project.name} className={`project-card reveal reveal-delay-${index + 1} overflow-hidden border border-[#cfc4b0] bg-[#f5efdf] ${index === 1 ? 'md:mt-14' : index === 2 ? 'md:mt-5' : ''}`}>
              <ProjectVisual tone={project.tone} mark={project.mark} />
              <div className="p-6 md:p-7">
                <div className="flex items-start justify-between gap-4"><div><div className="font-mono text-[10px] text-[#68637a]">{project.number}</div><h3 className="mt-2 font-display text-3xl font-semibold tracking-[-.07em] text-[#252545]">{project.name}</h3></div><span className="mt-1 text-[#d96f5b]"><Sparkles size={17} strokeWidth={1.5} /></span></div>
                <p className="mt-5 text-[13px] font-semibold uppercase tracking-[.08em] text-[#146b72]">{project.type}</p>
                <p className="mt-3 min-h-[72px] text-sm leading-6 text-[#68637a]">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="border border-[#d6cdbb] px-2 py-1 font-mono text-[9px] uppercase tracking-[.08em] text-[#68637a]">{tag}</span>)}</div>
                <div className="mt-7 flex items-center justify-between border-t border-[#d6cdbb] pt-4 font-mono text-[10px] uppercase tracking-[.12em] text-[#68637a]"><span>{project.note}</span><span className="text-[#d96f5b]">↗</span></div>
              </div>
            </article>
          ))}
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
              <div className="relative"><span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-[#d6cdbb] bg-[#f6c85f] md:-left-[39px]" /><p className="font-mono text-[10px] uppercase tracking-[.16em] text-[#68637a]">2026 / Cloud chapter</p><h3 className="mt-3 font-display text-2xl font-semibold tracking-[-.05em] text-[#252545]">IBM PBEL Cloud Computing internship</h3><p className="mt-2 text-sm leading-6 text-[#68637a]">A next chapter in understanding how useful software gets from a laptop into the hands of many.</p></div>
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
            <div className="reveal reveal-delay-2 absolute -bottom-8 -right-2 rotate-[8deg] bg-[#146b72] px-4 py-3 font-mono text-[10px] uppercase tracking-[.14em] text-[#efe8d7] shadow-[5px_5px_0_rgba(37,37,69,.12)] md:right-0">Currently: learning cloud</div>
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
  return (
    <section id="contact" className="hero-ink relative overflow-hidden px-5 py-24 md:px-8 md:py-36">
      <div className="absolute -right-28 top-16 h-80 w-80 rounded-full border border-[#777592]/25" />
      <div className="absolute -right-16 top-28 h-56 w-56 rounded-full border border-dashed border-[#777592]/25" />
      <div className="relative mx-auto max-w-[1240px]">
        <span className="reveal font-mono text-[10px] uppercase tracking-[.2em] text-[#bcb9ca]">05 / The open tab</span>
        <h2 className="reveal reveal-delay-1 mt-7 max-w-[900px] font-display text-[clamp(3.6rem,9vw,9.5rem)] font-medium leading-[.82] tracking-[-.11em] text-[#efe8d7]">Have a good<br /><span className="text-[#f6c85f]">problem?</span></h2>
        <div className="mt-12 flex flex-col justify-between gap-10 border-t border-[#555472] pt-7 md:flex-row md:items-end">
          <p className="reveal max-w-[420px] text-lg leading-8 text-[#c8c6d2]">I am looking for the next problem worth getting curious about. If it is practical, a little tangled, and made for people — let us talk.</p>
          <div className="reveal reveal-delay-2 flex flex-col items-start gap-4">
            <a data-testid="link-email-contact" href={`mailto:${emailAddress}`} className="group flex items-center gap-4 border-b border-[#f6c85f] pb-3 font-display text-xl tracking-[-.04em] text-[#f6c85f] md:text-2xl">{emailAddress} <ArrowUpRight size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
            <div className="flex flex-wrap gap-5 font-mono text-[10px] uppercase tracking-[.16em] text-[#bcb9ca]">
              <a data-testid="link-github-contact" href={githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#f6c85f]"><Github size={14} /> GitHub</a>
              <a data-testid="link-linkedin-contact" href={linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#f6c85f]"><Linkedin size={14} /> LinkedIn</a>
              <a data-testid="link-resume" href="/JJ_RESUME_1787425298534.pdf" download className="flex items-center gap-2 hover:text-[#f6c85f]"><Download size={14} /> Download resume</a>
            </div>
          </div>
        </div>
        <div className="mt-28 flex flex-col justify-between gap-4 border-t border-[#555472] pt-5 font-mono text-[10px] uppercase tracking-[.17em] text-[#777592] md:flex-row"><span>Janmaijay Jaiswal / 2026</span><span>Made with patience + sharp edges</span><Anchor href="#top">Back to top ↑</Anchor></div>
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
      <TechStrip />
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