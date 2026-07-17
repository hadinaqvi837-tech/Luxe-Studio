import { useRef, useState } from 'react';
import { 
  Sparkles, 
  Users, 
  Database, 
  Code, 
  Layers, 
  CheckCircle, 
  ArrowRight, 
  Play, 
  X,
  ChevronDown, 
  Check, 
  Shield, 
  Zap, 
  HelpCircle,
  MessageSquare,
  History,
  FileCode,
  Sliders,
  TrendingUp,
  Briefcase,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ScrollFloat from './animations/ScrollFloat';
import VariableProximity from './animations/VariableProximity';
import MagicRings from './animations/MagicRings';

interface LandingPageProps {
  onStartTrial: () => void;
}

export default function LandingPage({ onStartTrial }: LandingPageProps) {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // FAQ List (10 Items as specified in PRD)
  const faqs = [
    {
      q: "What is Luxe Studio and how does it work?",
      a: "Luxe Studio is an all-in-one, premium collaborative workspace that fuses artificial intelligence with real-time vector design canvas. Simply describe your design brief in natural language, and our custom AI engine constructs multi-layered, responsive, styled mockups which you can immediately edit, collaborate on, and export as developer-ready code."
    },
    {
      q: "How does the AI Design Generator create layouts?",
      a: "The generator utilizes a fine-tuned layout engine that produces structured semantic layout nodes. Unlike basic image generators that output flat, uneditable pixels, Luxe Studio creates editable components with margins, typography scales, flex grids, and colors that can be selected, edited, reordered, and exported."
    },
    {
      q: "Is my brand kit respected during AI generation?",
      a: "Yes. Once you configure your Brand Kit (colors, primary typography pairings, spacing metrics, and logo guidelines), the AI design generator consumes these constraints as system parameters. Every subsequent generation natively applies your brand kit rules, maintaining brand compliance across hundreds of variants."
    },
    {
      q: "How does real-time team collaboration work?",
      a: "The collaborative canvas supports unlimited active users on the same project file. You see real-time cursor tracks with developer names, instant element lock states when someone is actively editing, and anchored comment bubbles that float directly over visual elements to keep feedback contextually localized."
    },
    {
      q: "Can non-designers or clients leave feedback?",
      a: "Absolutely. Luxe Studio features a dedicated 'Reviewer Mode' designed specifically for clients and stakeholders. Reviewers can drop feedback comments, view past snapshots, and execute sign-offs through our structured Approvals Checklist without ever altering the underlying layout structure."
    },
    {
      q: "What export formats does Luxe Studio support?",
      a: "You can export finalized layouts with one click to clean, responsive, fully structured HTML and Tailwind CSS code. We also support standard vector exports (SVG), high-resolution mockups (PNG/PDF), and standard design token variables (nested JSON format for design systems)."
    },
    {
      q: "Is there a limit to asset storage in the Smart Library?",
      a: "Our Starter plan includes 2 GB of smart asset storage, while the Professional plan supports up to 100 GB. Enterprise teams enjoy fully customizable storage pools. All assets are automatically scanned using computer-vision models to auto-tag elements for visual similarity searching."
    },
    {
      q: "Do you offer custom integrations for Enterprise teams?",
      a: "Yes. Luxe Studio Enterprise offers custom API endpoints, direct syncing with corporate Slack environments, on-premise cloud deployments, SSO authentication protocols (SAML), and dedicated security SLAs."
    },
    {
      q: "Is my design data and intellectual property secured?",
      a: "Security is built into our core framework. Luxe Studio employs TLS 1.3 encryption in transit and AES-256 at rest. Your custom models, generated briefs, and brand assets are containerized in isolated database instances and are never used to train public base models."
    },
    {
      q: "How does the 14-day free trial work?",
      a: "Every plan (including Starter and Professional) includes a 14-day trial with absolute access to all premium assets and features. We do not ask for a credit card up front. You will receive an automated system notice 3 days before expiry with options to upgrade or save your work to local files."
    }
  ];

  const features = [
    {
      icon: <Sparkles className="w-5 h-5 text-[#C5A059]" />,
      title: "AI Design Generator",
      desc: "Input raw briefs in plain language and get 4 to 6 fully structured, layered design layouts in under 10 seconds. Customise, refine, and iterate infinitely."
    },
    {
      icon: <Users className="w-5 h-5 text-emerald-400" />,
      title: "Real-Time Collaboration",
      desc: "Simultaneous vector editing with live multi-user cursors, synchronized layouts, context-anchored commenting, and live reviewer feedback nodes."
    },
    {
      icon: <Database className="w-5 h-5 text-blue-400" />,
      title: "Smart Asset Library",
      desc: "Drag-and-drop media bank featuring automatic computer-vision tagging, visual search indexing, and real-time palette extraction of images."
    },
    {
      icon: <Code className="w-5 h-5 text-purple-400" />,
      title: "One-Click Export",
      desc: "Instantly translate finalized mockups into structured, semantic, responsive HTML/Tailwind CSS or export as design token JSON system variables."
    },
    {
      icon: <Sliders className="w-5 h-5 text-rose-400" />,
      title: "Brand Kit Management",
      desc: "Centralize corporate brand colors, typography rules, spacing standards, and master logo lockups. Retroactively update linked layouts globally."
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-indigo-400" />,
      title: "Team Approvals Flow",
      desc: "Track client sign-offs and design team reviews with structured approval logs, checklists, and automated notification alerts."
    }
  ];

  const testimonials = [
    {
      role: "Freelance UI Designer",
      quote: "Luxe Studio has completely transformed my client handoff. I went from spending 12 hours on basic grid alignments to instantly spawning 5 gorgeous options directly matching their brand color palette. Clients love commenting on the live canvas.",
      author: "Evelyn Sterling",
      metrics: "+150% Work Efficiency",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop&q=80"
    },
    {
      role: "Founder, Veloce Agency",
      quote: "With real-time team collaboration and immediate design-to-code export, we cut our development cycle by 40%. The AI design briefs aren't generic placeholders; they're genuinely creative starting points that respect our brand rules.",
      author: "Marcus Vance",
      metrics: "40% Shorter Cycles",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop&q=80"
    },
    {
      role: "Design Lead, Prism Technologies",
      quote: "Managing design consistency across 12 product lanes is incredibly difficult. Luxe's Brand Kit Manager is a lifesaver. One update in our color palette and the entire design ecosystem updates instantly. The visual asset search saves us hours.",
      author: "Tara Chowdhury",
      metrics: "100% Brand Compliance",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&fit=crop&q=80"
    }
  ];

  return (
    <div id="luxe-landing" className="min-h-screen bg-[#0A0A0A] text-[#E4E4E4] selection:bg-[#C5A059] selection:text-[#0A0A0A] font-sans antialiased scroll-smooth">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#2A2A2A] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-sm bg-gradient-to-tr from-[#C5A059] to-[#8E6F3E] flex items-center justify-center text-[#0A0A0A] font-bold text-lg tracking-widest font-mono">L</span>
            <span className="font-sans text-xl sm:text-2xl font-semibold tracking-tight leading-[1.1] bg-gradient-to-b from-white to-[#A0A0A0] bg-clip-text text-transparent">LUXE<span className="text-[#C5A059]">.</span>STUDIO</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-[#A0A0A0] tracking-wide">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#usecases" className="hover:text-white transition-colors">Testimonials</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>
          
          <div className="flex items-center gap-4">
            <button 
              id="btn-goto-workspace-nav"
              onClick={onStartTrial}
              className="px-6 py-2.5 rounded-full text-xs tracking-wider uppercase font-semibold bg-[#C5A059] text-[#0A0A0A] hover:bg-[#D4B372] transition-all duration-300 shadow-lg"
            >
              Open Workspace
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden border-b border-[#2A2A2A]">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(197,160,89,0.16),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(45,90,71,0.18),transparent_32%),linear-gradient(135deg,#0A0A0A_0%,#111111_55%,#0A0A0A_100%)]" />
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:80px_80px] opacity-20" />
        </div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content */}
          <div ref={heroRef} className="lg:col-span-6 flex flex-col items-start text-left z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mb-4"
            >
              <ScrollFloat
                animationDuration={1.2}
                ease="back.inOut(2)"
                scrollStart="center bottom+=50%"
                scrollEnd="bottom bottom-=40%"
                stagger={0.025}
                containerClassName="text-xl sm:text-2xl font-semibold uppercase tracking-[0.35em] text-[#C5A059] mb-0"
                textClassName="text-[#C5A059]"
              >
                Design Better with AI
              </ScrollFloat>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-5 text-xs sm:text-sm uppercase tracking-[0.35em] text-[#8F8F8F]"
            >
              <VariableProximity
                label="Crafted for modern creative teams"
                className="text-[#A0A0A0]"
                containerRef={heroRef}
                radius={140}
                falloff="linear"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 700, 'opsz' 28"
              />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold tracking-tight leading-[1.1] mb-6 bg-gradient-to-b from-white to-[#A0A0A0] bg-clip-text text-transparent"
            >
              Design Faster with AI.<br />
              Collaborate Better.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#808080] text-lg mb-8 max-w-lg leading-relaxed font-light"
            >
              Luxe Studio combines intelligent design assistance, real-time collaboration, and seamless asset management into one premium workspace.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              <button 
                id="btn-hero-trial"
                onClick={onStartTrial}
                className="px-8 py-4 rounded-full bg-[#C5A059] text-[#0A0A0A] text-sm tracking-wider uppercase font-semibold hover:bg-[#D4B372] transition-all duration-300 flex items-center justify-center gap-2 group shadow-xl"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                id="btn-hero-demo"
                onClick={() => setShowDemoModal(true)}
                className="px-8 py-4 rounded-full bg-[#161616] text-[#E4E4E4] text-sm tracking-wider uppercase font-semibold border border-[#2A2A2A] hover:border-[#C5A059] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current text-[#C5A059]" />
                <span>Watch Demo</span>
              </button>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-[#606060] text-xs mt-4 font-mono"
            >
              * 14-day full feature trial. No credit card required.
            </motion.p>
          </div>
          
          {/* Hero Visual Mockup */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative bg-[#161616] rounded-xl shadow-2xl p-4 border border-[#2A2A2A] aspect-video flex flex-col overflow-hidden"
            >
              <div className="absolute inset-0 z-0 rounded-xl overflow-hidden opacity-70">
                <MagicRings
                  color="#C5A059"
                  colorTwo="#2D5A47"
                  ringCount={7}
                  speed={0.8}
                  attenuation={10}
                  lineThickness={1.6}
                  baseRadius={0.32}
                  radiusStep={0.1}
                  scaleRate={0.08}
                  opacity={0.35}
                  followMouse={true}
                  hoverScale={1.08}
                  parallax={0.05}
                  clickBurst={false}
                />
              </div>
              <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#2A2A2A]"></span>
                    <span className="w-3 h-3 rounded-full bg-[#333333]"></span>
                    <span className="w-3 h-3 rounded-full bg-[#444444]"></span>
                  </div>
                  <span className="text-xs font-mono text-[#A0A0A0] font-medium bg-[#0A0A0A] px-3 py-1 rounded border border-[#2A2A2A]">Project: Aura_Wellness_Landing_Page</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-xs font-semibold text-emerald-400 font-mono">Live Session</span>
                </div>
              </div>
              
              {/* Simulated UI layout */}
              <div className="flex-1 bg-[#1A1A1A] rounded border border-[#2A2A2A] relative overflow-hidden flex">
                <div className="w-1/4 border-r border-[#2A2A2A] bg-[#0F0F0F] p-3 flex flex-col gap-4">
                  <div className="space-y-1">
                    <div className="h-3 w-1/2 bg-[#2A2A2A] rounded"></div>
                    <div className="h-2 w-3/4 bg-[#161616] rounded"></div>
                  </div>
                  <div className="h-10 bg-[#C5A059]/5 border border-[#C5A059]/20 rounded p-2 flex items-center justify-between">
                    <span className="text-[10px] font-medium text-[#C5A059]">AI design brief...</span>
                    <Sparkles className="w-3 h-3 text-[#C5A059]" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-5 bg-[#161616] border border-[#2A2A2A] rounded flex items-center px-2 justify-between">
                      <span className="text-[9px] text-zinc-400">Maison d'Or</span>
                      <span className="text-[8px] bg-[#C5A059] text-black px-1.5 py-0.5 rounded font-semibold font-mono">applied</span>
                    </div>
                    <div className="h-5 bg-[#0F0F0F] rounded"></div>
                    <div className="h-5 bg-[#0F0F0F] rounded"></div>
                  </div>
                </div>
                
                {/* Simulated workspace canvas */}
                <div className="flex-1 p-4 relative flex flex-col bg-[#0A0A0A] justify-center items-center">
                  <div className="max-w-xs text-center">
                    <span className="text-[9px] uppercase tracking-wider text-[#C5A059] font-bold">AURA SPA & RITUALS</span>
                    <h3 className="text-sm font-sans font-medium text-[#E4E4E4] mt-1">Quiet your mind. Restore your natural cellular light.</h3>
                    <div className="h-3 w-16 bg-[#C5A059] rounded mx-auto mt-3"></div>
                  </div>
                  
                  {/* Floating simulated cursors */}
                  <div className="absolute top-[20%] left-[30%] flex flex-col items-start gap-1">
                    <div className="w-4 h-4 overflow-hidden text-[#2D5A47]">
                      <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
                        <path d="M4.5,3 L19.5,12 L12,13.5 L13.5,21 L4.5,3 Z" />
                      </svg>
                    </div>
                    <span className="bg-[#2D5A47] text-white text-[8px] px-1.5 py-0.5 rounded shadow">Elena</span>
                  </div>
                  
                  <div className="absolute bottom-[30%] right-[25%] flex flex-col items-start gap-1">
                    <div className="w-4 h-4 overflow-hidden text-[#C5A059]">
                      <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
                        <path d="M4.5,3 L19.5,12 L12,13.5 L13.5,21 L4.5,3 Z" />
                      </svg>
                    </div>
                    <span className="bg-[#C5A059] text-[#0A0A0A] text-[8px] px-1.5 py-0.5 rounded shadow font-bold">Marcus (Client)</span>
                  </div>

                  {/* Comment pin */}
                  <div className="absolute top-[45%] right-[10%] flex items-center gap-1.5 bg-[#161616] p-1.5 rounded-lg border border-[#2A2A2A] shadow-md">
                    <span className="w-4 h-4 rounded-full bg-[#C5A059] flex items-center justify-center text-[#0A0A0A] text-[8px] font-bold">TC</span>
                    <span className="text-[8px] text-[#A0A0A0] font-medium">Love the typography!</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Soft decorative light leak */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#2D5A47]/10 rounded-full blur-3xl pointer-events-none"></div>
          </div>
          
        </div>
      </section>

      {/* Decorative center divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-20"></div>

      {/* Feature grid Section */}
      <section id="features" className="py-24 bg-[#0A0A0A] border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C5A059] font-mono mb-3 block">Elevating Creative Flow</span>
            <h2 className="text-3xl sm:text-4xl font-sans font-semibold text-white tracking-tight mb-4">
              Integrated modules built for design artisans.
            </h2>
            <p className="text-[#808080]">
              No fragmented tools. Design, brainstorm, archive, comment, and generate in a completely synchronized web environment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -6, borderColor: "rgba(197, 160, 89, 0.4)" }}
                transition={{ duration: 0.3 }}
                className="p-8 bg-[#0F0F0F] rounded-xl border border-[#2A2A2A] flex flex-col text-left group transition-all"
              >
                <div className="w-10 h-10 rounded bg-[#161616] flex items-center justify-center border border-[#2A2A2A] shadow-sm mb-6 group-hover:scale-110 transition-transform">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[#C5A059] transition-colors">{feat.title}</h3>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials and Metrics Section */}
      <section id="usecases" className="py-24 bg-[#0F0F0F] border-b border-[#2A2A2A] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C5A059] font-mono mb-3 block">Social Proof & Metrics</span>
            <h2 className="text-3xl sm:text-4xl font-sans font-semibold text-white tracking-tight mb-4">
              Loved by fast-moving creators and agencies.
            </h2>
            <p className="text-[#808080]">
              See how modern teams scale creative outputs while maintaining highly refined brand compliance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((test, i) => (
              <div key={i} className="bg-[#161616] p-8 rounded-xl border border-[#2A2A2A] shadow-sm flex flex-col justify-between text-left">
                <div>
                  <div className="flex gap-1 mb-5 text-[#C5A059]">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <p className="text-[#E4E4E4] text-sm leading-relaxed italic mb-6">"{test.quote}"</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#2A2A2A]">
                  <div className="flex items-center gap-3">
                    <img src={test.image} alt={test.author} className="w-10 h-10 rounded-full object-cover border border-[#2A2A2A]" />
                    <div>
                      <h4 className="text-sm font-semibold text-white">{test.author}</h4>
                      <p className="text-[11px] text-[#808080] font-medium">{test.role}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#C5A059] bg-[#C5A059]/10 px-2.5 py-1 rounded border border-[#C5A059]/20">{test.metrics}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-[#0A0A0A] border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C5A059] font-mono mb-3 block">Simple, Predictable Plans</span>
            <h2 className="text-3xl sm:text-4xl font-sans font-semibold text-white tracking-tight mb-4">
              A plan constructed for every creative scale.
            </h2>
            <p className="text-[#808080] mb-8">
              All tiers offer a 14-day risk-free trial. Cancel or change plans seamlessly.
            </p>
            
            {/* Toggle Billing */}
            <div className="inline-flex items-center gap-4 bg-[#161616] p-1.5 rounded-full border border-[#2A2A2A]">
              <button 
                id="btn-billing-monthly"
                onClick={() => setIsAnnual(false)}
                className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-all ${!isAnnual ? 'bg-[#C5A059] text-[#0A0A0A] shadow-sm' : 'text-[#A0A0A0] hover:text-white'}`}
              >
                Monthly Billing
              </button>
              <button 
                id="btn-billing-annual"
                onClick={() => setIsAnnual(true)}
                className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${isAnnual ? 'bg-[#C5A059] text-[#0A0A0A] shadow-sm' : 'text-[#A0A0A0] hover:text-white'}`}
              >
                <span>Annual Billing</span>
                <span className="bg-[#2D5A47] text-emerald-400 border border-emerald-900 text-[9px] px-1.5 py-0.5 rounded-full font-bold font-mono">Save 20%</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
            
            {/* Starter */}
            <div className="p-8 bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl flex flex-col justify-between text-left relative">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#C5A059]">Starter</span>
                <div className="mt-4 mb-6 flex items-baseline">
                  <span className="text-4xl font-sans font-semibold tracking-tight text-white">
                    ${isAnnual ? '23' : '29'}
                  </span>
                  <span className="text-sm text-[#808080] ml-2">/ month</span>
                </div>
                <p className="text-xs text-[#A0A0A0] mb-6">Excellent for independent freelancers & visual consultants building targeted layout concepts.</p>
                <div className="border-t border-[#2A2A2A] my-6"></div>
                <ul className="space-y-4 text-xs font-medium text-zinc-400">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>1 Active Project Creator</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>Up to 5 Design Projects</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>2 GB Smart Asset Library</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>20 AI Layout Generations / mo</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>Export to standard PNG & SVG</span>
                  </li>
                </ul>
              </div>
              <button 
                id="btn-buy-starter"
                onClick={onStartTrial}
                className="mt-8 w-full py-3 border border-[#2A2A2A] hover:border-[#C5A059] rounded-full text-xs uppercase tracking-wider font-semibold text-white hover:bg-[#161616] transition-all"
              >
                Start Starter Trial
              </button>
            </div>
            
            {/* Professional (Highlighted) */}
            <div className="p-8 bg-[#161616] border-2 border-[#C5A059] rounded-xl flex flex-col justify-between text-left relative transform md:-translate-y-2 shadow-2xl">
              <div className="absolute top-0 right-6 -translate-y-1/2 bg-[#C5A059] text-[#0A0A0A] text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full">
                Most Popular
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#C5A059]">Professional</span>
                <div className="mt-4 mb-6 flex items-baseline text-white">
                  <span className="text-4xl font-sans font-semibold tracking-tight">
                    ${isAnnual ? '79' : '99'}
                  </span>
                  <span className="text-sm text-[#808080] ml-2">/ month</span>
                </div>
                <p className="text-xs text-[#A0A0A0] mb-6 font-sans">Ideal for small-to-mid creative design agencies, brand studios, and in-house visual departments.</p>
                <div className="border-t border-[#2A2A2A] my-6"></div>
                <ul className="space-y-4 text-xs font-medium text-zinc-300">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>Up to 5 Design Collaborators</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>Unlimited Active Design Projects</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>100 GB Smart Asset Library</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span className="font-semibold text-white">Unlimited AI Design Generations</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>All Export Formats (HTML/Tailwind, Tokens)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>Real-Time Collaborative Vector Canvas</span>
                  </li>
                </ul>
              </div>
              <button 
                id="btn-buy-professional"
                onClick={onStartTrial}
                className="mt-8 w-full py-3 bg-[#C5A059] text-[#0A0A0A] hover:bg-[#D4B372] rounded-full text-xs uppercase tracking-wider font-bold transition-all shadow-sm"
              >
                Start Professional Trial
              </button>
            </div>
            
            {/* Enterprise */}
            <div className="p-8 bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl flex flex-col justify-between text-left relative">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#808080]">Enterprise</span>
                <div className="mt-4 mb-6 flex items-baseline">
                  <span className="text-4xl font-sans font-semibold tracking-tight text-white">Custom</span>
                </div>
                <p className="text-xs text-[#A0A0A0] mb-6">Tailored for scaling enterprise brands, legal portfolios, and corporate marketing squads.</p>
                <div className="border-t border-[#2A2A2A] my-6"></div>
                <ul className="space-y-4 text-xs font-medium text-zinc-400">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>Unlimited Active Collaborators</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>Custom Dedicated Asset Storage</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>SSO, SAML Security Integrations</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>Dedicated SLA & Support Account Manager</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>Optional Local / On-Prem Deployments</span>
                  </li>
                </ul>
              </div>
              <button 
                id="btn-buy-enterprise"
                onClick={onStartTrial}
                className="mt-8 w-full py-3 border border-[#2A2A2A] hover:border-[#C5A059] rounded-full text-xs uppercase tracking-wider font-semibold text-white hover:bg-[#161616] transition-all"
              >
                Inquire Enterprise
              </button>
            </div>
            
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-[#0F0F0F] border-b border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C5A059] font-mono mb-3 block">Answers & Details</span>
            <h2 className="text-3xl sm:text-4xl font-sans font-semibold text-white tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-[#808080]">
              Have questions about how Luxe Studio integrates into your corporate pipeline? We have answers.
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className="bg-[#161616] rounded-xl border border-[#2A2A2A] overflow-hidden shadow-sm"
              >
                <button
                  id={`btn-faq-toggle-${i}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left font-semibold text-[#E4E4E4] hover:text-[#C5A059] transition-colors"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-[#C5A059]' : ''}`} />
                </button>
                
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                     <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-sm text-[#A0A0A0] leading-relaxed border-t border-[#2A2A2A] pt-3">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] text-[#E4E4E4] border-t border-[#2A2A2A] pt-20 pb-12 font-sans relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          <div className="md:col-span-4 space-y-6 text-left">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-sm bg-gradient-to-tr from-[#C5A059] to-[#8E6F3E] flex items-center justify-center text-[#0A0A0A] font-bold text-lg tracking-widest font-mono">L</span>
              <span className="font-mono text-xl tracking-wider font-semibold text-white">LUXE<span className="text-[#C5A059]">.</span>STUDIO</span>
            </div>
            <p className="text-xs text-[#808080] max-w-sm leading-relaxed">
              Luxe Studio is a premium, AI-powered design collaboration platform engineered for creative professionals, design agencies, and in-house creative teams.
            </p>
          </div>
          
          <div className="md:col-span-2 text-left">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white mb-6">Product</h4>
            <ul className="space-y-4 text-xs text-[#A0A0A0] font-semibold">
              <li><a href="#features" className="hover:text-white transition-colors">AI Generator</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Shared Canvas</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Asset Manager</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Tiers</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 text-left">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white mb-6">Resources</h4>
            <ul className="space-y-4 text-xs text-[#A0A0A0] font-semibold">
              <li><span className="text-[#606060] cursor-not-allowed">Design Blog</span></li>
              <li><span className="text-[#606060] cursor-not-allowed">API Documentation</span></li>
              <li><span className="text-[#606060] cursor-not-allowed">Case Archives</span></li>
              <li><span className="text-[#606060] cursor-not-allowed">Help Guide</span></li>
            </ul>
          </div>

          <div className="md:col-span-4 text-left space-y-6">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white mb-4">Newsletter</h4>
            <p className="text-xs text-[#A0A0A0] leading-relaxed">
              Stay inspired. Sign up to receive custom layouts, prompt guidelines, and creative insights weekly.
            </p>
            
            {newsletterSubscribed ? (
              <div className="p-3.5 bg-emerald-950/40 border border-[#2D5A47]/30 rounded text-xs text-emerald-400 flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Subscribed! Check your inbox soon.</span>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if(newsletterEmail.trim()){ setNewsletterSubscribed(true); } }} className="flex gap-2">
                <input 
                  id="inp-newsletter"
                  type="email" 
                  placeholder="Enter email address" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-[#161616] border border-[#2A2A2A] text-white text-xs px-4 py-2.5 rounded focus:outline-none focus:border-[#C5A059]"
                  required
                />
                <button 
                  id="btn-newsletter-submit"
                  type="submit" 
                  className="bg-[#C5A059] hover:bg-[#D4B372] text-[#0A0A0A] text-xs px-5 py-2.5 rounded-full font-semibold tracking-wide transition-colors"
                >
                  Join
                </button>
              </form>
            )}
          </div>
          
        </div>
        
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-[#2A2A2A] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#808080]">
          <span>&copy; 2026 Luxe Studio. All rights reserved. Elegant execution.</span>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Security Standards</span>
          </div>
        </div>

        {/* Decorative layout line from Design HTML */}
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-20 absolute bottom-0 left-0"></div>
      </footer>

      {/* Watch Demo Modal */}
      <AnimatePresence>
        {showDemoModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#161616] rounded-xl shadow-2xl max-w-2xl w-full p-6 border border-[#2A2A2A] relative overflow-hidden"
            >
              <button 
                id="btn-close-demo"
                onClick={() => setShowDemoModal(false)}
                className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white rounded-full hover:bg-[#2A2A2A] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="text-left">
                <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-widest font-bold">90-Second Walkthrough</span>
                <h3 className="text-xl font-semibold text-white mt-1 mb-4">Experience the Luxe Design Flow</h3>
                
                {/* Simulated video playback or interactive guide */}
                <div className="aspect-video bg-[#0A0A0A] rounded-lg border border-[#2A2A2A] flex flex-col items-center justify-center relative group p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center mb-4 border border-[#C5A059]/20 animate-pulse">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1 font-mono">Connecting to AI Generator Simulation...</h4>
                  <p className="text-xs text-[#808080] max-w-sm leading-relaxed mb-4">
                    "A luxury spa brand landing page focusing on warm natural earthy tones, basalt stones, and acoustic rest rooms."
                  </p>
                  
                  <div className="w-full bg-[#2A2A2A] h-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="bg-[#C5A059] h-full"
                    ></motion.div>
                  </div>
                  
                  <span className="text-[10px] text-[#606060] font-mono mt-3">Synthesizing responsive elements, layout layers, and typography scales...</span>
                </div>
                
                <div className="mt-6 flex justify-between items-center">
                  <span className="text-xs text-[#808080]">No downloads required. Runs entirely server-side.</span>
                  <button 
                    id="btn-modal-start"
                    onClick={() => { setShowDemoModal(false); onStartTrial(); }}
                    className="px-6 py-2 bg-[#C5A059] hover:bg-[#D4B372] text-[#0A0A0A] rounded-full text-xs uppercase tracking-widest font-bold transition-all shadow-md"
                  >
                    Enter Workspace
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
