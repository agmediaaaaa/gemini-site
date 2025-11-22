import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Button } from './components/Button';
import { SignalCard } from './components/SignalCard';
import { Timeline } from './components/Timeline';
import { CardStack } from './components/CardStack';
import { Typewriter } from './components/Typewriter';
import { ROICalculatorModal } from './components/ROICalculatorModal';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Shield, Zap, X, Linkedin, Youtube, Mail } from 'lucide-react';
import { CaseStudy, HiringSignal, TimelineStep, FAQItem } from './types';

// --- DATA ---

const TEAM = [
  {
    name: "Swapnil Panigrahi",
    title: "Founder & CEO",
    image: "https://ik.imagekit.io/zs/pfp%20square.jpeg",
    bio: "Leading the AI revolution in staffing recruitment.",
    linkedin: "https://www.linkedin.com/in/swapnil-panigrahi"
  },
  {
    name: "Aarav Gandhi",
    title: "Chief Marketing Officer",
    image: "https://ik.imagekit.io/zs/Screenshot%202025-10-09%20195655.png", 
    bio: "leading consultant for AI implementation in the staffing space",
    linkedin: "https://www.linkedin.com/in/aarav-gandhi-13aa18331/"
  }
];

const SIGNALS: HiringSignal[] = [
  { title: 'Companies with open jobs', description: 'Active hiring for specialized, hard-to-fill positions requiring recruiter support.', icon: 'briefcase' },
  { title: 'Rapid headcount growth', description: 'Firms increasing headcount in target departments.', icon: 'growth' },
  { title: 'New Offices & Launches', description: 'Signals indicating upcoming massive hiring needs.', icon: 'building' },
  { title: 'Recently Funded', description: 'Companies in growth mode needing to hire quickly.', icon: 'dollar' },
  { title: 'Leadership Changes', description: 'New executives bringing new initiatives and talent needs.', icon: 'users' },
  { title: 'M&A Activity', description: 'Specialized talent needed to manage transitions.', icon: 'globe' },
  { title: 'Geographic Expansion', description: 'Immediate hiring needs for local teams in new markets.', icon: 'globe' },
  { title: 'Poor Ratings', description: 'Struggling with direct hiring, receptive to agencies.', icon: 'star' },
  { title: 'High Turnover', description: 'Signals potential staffing needs and replacement opportunities.', icon: 'alert' },
];

const TIMELINE_STEPS: TimelineStep[] = [
  { number: 1, title: 'Foundation', description: 'We finalize your Custom Offer and Guarantee and begin building your dedicated email infrastructure.', detail: 'Week 1-2' },
  { number: 2, title: 'Launch Prep', description: 'You Approve the Messaging and we load the first batch of Triple-Qualified Leads into the system.', detail: 'Week 2-3' },
  { number: 3, title: 'First Appointments', description: "Your calendar begins to fill with Qualified Hiring Manager Meetings. We review the first week's performance.", detail: 'Week 3-4' },
  { number: 4, title: 'Scale', description: 'We continuously optimize to hit your target of 3-5 new job orders monthly, multiplying your revenue.', detail: 'Week 4+' },
];

const CASE_STUDIES: CaseStudy[] = [
  { 
    id: 1, 
    title: 'Mark Andiamo', 
    company: 'Founder at Andiamo Group',
    description: "It's a BD company that we're working with helping us do more than just BD but certainly building an infrastructure and a business development engine for us... We are now seeing leads come through where otherwise we hadn't. So high recommendation for both the team at Zillion Systems and specifically at Aarav and Swapnil.",
    tag: 'Video',
    wistiaId: 'd49iy5xgk7',
    aspectRatio: 0.565625
  },
  {
    id: 2,
    title: 'Pooja Sharma', 
    company: 'Founder at The Talent Mappers',
    description: "I was at a stage where I had exhausted all my networks and referrals... that's when I came across Zillion Systems. Their processes and systems are not only simple, cost effective, but genuinely result driven. I started to see new leads coming in just in few weeks, and my business took off from there.",
    tag: 'Video',
    wistiaId: 'xwbrl2indj',
    aspectRatio: 0.5625
  },
  {
    id: 3,
    title: 'Chris Morgan', 
    company: 'VP Ops at Talent Dome',
    description: "We've come from a point of knowing almost nothing to quite quickly knowing a lot thanks to the meetings we've had with Zillion and the offer they've proposed to us. If you're in the same situation and looking to scale your recruitment company I would definitely recommend speaking with Zillion.",
    tag: 'Video',
    wistiaId: 'xw80snk2dg',
    aspectRatio: 0.565625
  },
  {
    id: 4,
    title: 'Cassidy Keith',
    company: 'SVP at Welltech Partner',
    description: "We've been working with Zillions Systems for the past few months, and so far, the partnership has been a great asset to WellTech Partners. During this time, their team has helped us expand into new markets, strengthen our brand presence, and drive meaningful traffic to our website and social platforms.",
    tag: 'Testimonial'
  },
  {
    id: 5,
    title: 'Talently Case Study',
    company: 'Talently',
    description: 'Turned 3,800 targeted emails into 17 warm opportunities in just 30 days by aligning timing, signals, and messaging.',
    tag: 'Case Study',
    stats: [
      { label: 'Reached', value: '3,800' },
      { label: 'Opps', value: '17' },
      { label: 'Days', value: '30' }
    ]
  }
];

const DELIVERABLES = [
  "Fully managed cold-email engine",
  "AI-powered lead gen with 24/7 hiring-signal monitoring",
  "Personalized outreach at scale with AI-written scripts",
  "Custom sequences with ongoing A/B testing",
  "AI decision-maker mapping for precise targeting",
  "Expanded data coverage (reach contacts most vendors miss)",
  "Deliverability monitoring and optimization",
  "Weekly performance reports + bi-weekly KPI review calls",
  "Custom mini-CRM & dashboard to track lead status, pipeline, ROI, and outcomes",
  "Dedicated account manager and 24/7 Slack access",
  "Continuous optimization of copy, targeting, and send times",
  "Pre-qualified, ICP-fit leads",
  "Predictable pipeline and booked calls"
];

const FAQS: FAQItem[] = [
  {
    question: "How does your AI-based cold email system work?",
    answer: "→ We first map your Total Addressable Market (TAM) and identify companies actively showing hiring needs\n\n→ Then we pinpoint the exact decision-makers responsible for those functions\n\n→ Our AI personalizes messaging based on each prospect’s current hiring challenges\n\n→ Finally, we run the campaigns through our pre-built cold email infrastructure to drive consistent responses and meetings."
  },
  {
    question: "How long until I see results?",
    answer: "Typically, the first 2–3 weeks are spent training the system and optimizing messaging for your market. Most clients start seeing strong traction by week 3–4, and results compound from there as the system scales."
  },
  {
    question: "Do I need to provide my own email list?",
    answer: "No — we handle all the research, enrichment, and verification.\nThe only time we’ll ask for your list is for reactivation campaigns targeting prospects who previously showed interest but never converted."
  },
  {
    question: "What makes your system different from traditional lead generation agencies?",
    answer: "We are Revenue Operations for recruiting firms — not just lead gen.\nWe build a system that continues to generate job orders long after the campaign ends:\n\n1️⃣ Identify companies actively hiring in your niche\n2️⃣ Find the exact decision-maker for each role\n3️⃣ Write hyper-relevant, personalized messaging with AI\n4️⃣ Scale outreach volume responsibly (700–2,500 emails/day)\n5️⃣ Route leads and book meetings through AI-powered SDR workflows\n\nIt’s not just leads — it’s an ongoing business development engine."
  },
  {
    question: "How do you ensure emails don’t land in spam?",
    answer: "• We set up and warm dedicated domains + inboxes under your brand\n• We control all ESP configuration, sending infrastructure, and volume management\n• Deliverability is monitored 24/7 with automated testing and adjustments\n\nThis gives you consistently high inbox placement and protects your main domain reputation."
  },
  {
    question: "What kind of support do you provide?",
    answer: "You get direct access to both founders via Slack — plus:\n• Real-time lead + meeting notifications\n• A built-in mini-CRM to track engagement\n• A live client portal with campaign analytics\n• Weekly performance reports\n• Bi-weekly strategy + optimization calls\n\nIt’s a done-with-you partnership, not a vendor relationship."
  }
];

const BOOKING_LINK = "https://zillionsystems.fillout.com/intro-call-with-zillion-systems";

// --- MAIN APP ---

export default function App() {
  const [isROIModalOpen, setIsROIModalOpen] = useState(false);

  // Automatically open the ROI modal after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsROIModalOpen(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-sans selection:bg-brand-red selection:text-white">
      <Navbar onOpenROI={() => setIsROIModalOpen(true)} />
      <ROICalculatorModal isOpen={isROIModalOpen} onClose={() => setIsROIModalOpen(false)} />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-24 overflow-hidden">
        {/* Liquid Backgrounds */}
        <div className="absolute inset-0 overflow-hidden">
           <div className="absolute top-0 -left-40 w-[600px] h-[600px] bg-brand-red/20 rounded-full mix-blend-screen filter blur-[120px] opacity-50 animate-blob"></div>
           <div className="absolute top-0 -right-40 w-[600px] h-[600px] bg-red-900/20 rounded-full mix-blend-screen filter blur-[120px] opacity-50 animate-blob animation-delay-2000"></div>
           <div className="absolute -bottom-40 left-20 w-[600px] h-[600px] bg-brand-red/10 rounded-full mix-blend-screen filter blur-[120px] opacity-50 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 z-10 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-fade-in shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:border-white/20 transition-colors">
               <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse shadow-[0_0_10px_#dc2626]"></span>
               <span className="text-xs font-bold tracking-widest text-gray-300 uppercase">FOR STAFFING FIRMS</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
              Get 3-5 job orders<br />
              a month using<br />
              <Typewriter 
                words={["AI Based Cold Emails"]}
                className="bg-gradient-to-r from-white via-red-200 to-brand-red bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]"
              />
            </h1>
            
            <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto mb-16 leading-relaxed font-light relative z-30">
              Our system can fill <span className="text-white font-semibold border-b border-brand-red/50">ANY recruitment companies pipeline</span> in 30 days or less. 
              Reach out to companies that have urgent hiring needs and are open to external recruiting support.
            </p>
            
            {/* VSL Video */}
            <div className="w-full max-w-4xl mx-auto mb-16 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(220,38,38,0.25)] bg-black relative z-20">
               {/* @ts-ignore */}
               <wistia-player media-id="58ajutp3x5" aspect="1.7777777777777777"></wistia-player>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center relative z-30 mt-8">
              <Button 
                variant="primary" 
                withIcon 
                className="min-w-[200px] text-lg py-5"
                href={BOOKING_LINK}
                target="_blank"
              >
                LEARN MORE
              </Button>
              <Button 
                variant="outline" 
                className="min-w-[200px] text-lg py-5 border-white/10 hover:bg-white/5"
                href="#case-studies"
              >
                SEE CASE STUDIES
              </Button>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-20"></div>
      </section>

      {/* CASE STUDIES */}
      {/* IMPORTANT: overflow-hidden removed to allow position: sticky to work in CardStack */}
      <section id="case-studies" className="relative border-t border-white/5 py-24 bg-black">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-red/5 via-black to-black pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5 }}
               className="text-center mb-16"
            >
                 <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Client Success Stories</h2>
                 <p className="text-gray-400 text-lg">Real results from real staffing firms.</p>
            </motion.div>

            {/* Sticky Stack Card Layout */}
            <div className="flex justify-center w-full mt-10">
              <CardStack items={CASE_STUDIES} />
            </div>
        </div>
      </section>

      {/* RELEVANCE / SIGNALS */}
      <section className="py-32 bg-[#050505] relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-red/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 z-10">
                <div className="inline-block mb-4">
                    <span className="text-brand-red font-bold tracking-[0.2em] text-xs uppercase bg-brand-red/10 px-3 py-1 rounded-full border border-brand-red/20">RELEVANCE</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                    Reach companies with <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-red-500 drop-shadow-[0_0_20px_rgba(220,38,38,0.4)]">urgent hiring needs</span>.
                </h2>
                <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                    Stop wasting time on cold outreach to companies that aren't hiring. Our AI monitors thousands of data points to find your perfect placement opportunities.
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                        <h4 className="text-white font-bold mb-2 flex items-center gap-2"><Shield size={18} className="text-brand-red"/> Precise Targeting</h4>
                        <p className="text-sm text-gray-500">Filter by industry, size, and specific growth triggers.</p>
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                        <h4 className="text-white font-bold mb-2 flex items-center gap-2"><Zap size={18} className="text-brand-red"/> Real-Time Data</h4>
                        <p className="text-sm text-gray-500">Signals monitored 24/7 to catch opportunities first.</p>
                    </div>
                </div>
            </div>

            <div className="lg:w-1/2 w-full flex justify-center relative h-[700px] items-center">
                <div className="absolute w-[350px] h-[600px] bg-brand-red/20 blur-[80px] rounded-full -z-10"></div>
                <div className="relative w-[330px] h-[670px] rounded-[50px] shadow-2xl z-10">
                     <div className="absolute inset-0 rounded-[50px] bg-gradient-to-tr from-gray-600 via-gray-800 to-gray-700 p-[3px] shadow-[0_0_0_1px_rgba(0,0,0,1)]">
                         <div className="absolute inset-0 bg-black rounded-[47px]"></div>
                     </div>
                     <div className="absolute inset-[4px] bg-black rounded-[45px] overflow-hidden border-[5px] border-black ring-1 ring-white/10 relative">
                         <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-center gap-3 px-2 border border-white/5 shadow-lg">
                            <div className="w-12 h-12 rounded-full bg-black absolute -top-2 -right-2 blur-md z-0"></div>
                         </div>
                         <div className="w-full h-full bg-gradient-to-b from-[#0a0a0a] to-black overflow-hidden relative">
                            <div className="h-12 w-full bg-gradient-to-b from-black/80 to-transparent absolute top-0 z-20 pointer-events-none"></div>
                            <div className="px-5 pt-14 mb-2">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-2xl font-bold text-white tracking-tight">Live Signals</h3>
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                        <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">AI-Filtered Opportunities</p>
                            </div>
                            <div className="px-2 pb-10 h-full overflow-y-auto hide-scrollbar space-y-1 mask-image-b pt-2">
                                {SIGNALS.map((signal, idx) => (
                                    <SignalCard key={idx} signal={signal} index={idx} />
                                ))}
                                <div className="h-24"></div>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none z-30"></div>
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full z-40"></div>
                         </div>
                     </div>
                     <div className="absolute top-24 -left-[5px] w-[3px] h-8 bg-gray-600 rounded-l-md"></div>
                     <div className="absolute top-36 -left-[5px] w-[3px] h-14 bg-gray-600 rounded-l-md"></div>
                     <div className="absolute top-28 -right-[5px] w-[3px] h-20 bg-gray-600 rounded-r-md"></div>
                </div>
            </div>
        </div>
      </section>

      {/* COMPARISON SECTION */}
      <section className="py-32 bg-black relative">
        <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-20">
                <h2 className="text-4xl md:text-6xl font-bold mt-4 text-white mb-6">
                    Comparison <span className="text-gray-600 font-light">&</span> Results
                </h2>
                <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
                    See how we transform staffing operations.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                <div className="relative group">
                    <div className="absolute inset-0 bg-red-900/10 rounded-3xl blur-xl group-hover:bg-red-900/20 transition-all duration-500"></div>
                    <div className="relative bg-[#0a0a0a] border border-red-900/20 rounded-3xl p-10 h-full">
                        <h3 className="text-2xl font-bold mb-8 text-gray-200 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 text-sm">✕</span>
                            Common Challenges
                        </h3>
                        <ul className="space-y-10">
                            <li className="flex gap-4 text-gray-400">
                                <X className="text-red-800 shrink-0 mt-1" size={18}/>
                                <div>
                                    <span className="font-bold text-gray-300 block mb-1">Inconsistent Monthly Revenue</span>
                                </div>
                            </li>
                            <li className="flex gap-4 text-gray-400">
                                <X className="text-red-800 shrink-0 mt-1" size={18}/>
                                <div>
                                    <span className="font-bold text-gray-300 block mb-1">Low Email Response Rates</span>
                                </div>
                            </li>
                            <li className="flex gap-4 text-gray-400">
                                <X className="text-red-800 shrink-0 mt-1" size={18}/>
                                <div>
                                    <span className="font-bold text-gray-300 block mb-1">Can't Reach Decision Makers</span>
                                </div>
                            </li>
                            <li className="flex gap-4 text-gray-400">
                                <X className="text-red-800 shrink-0 mt-1" size={18}/>
                                <div>
                                    <span className="font-bold text-gray-300 block mb-1">Time-Consuming Manual Outreach</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="relative group">
                    <div className="absolute inset-0 bg-emerald-500/10 rounded-3xl blur-xl group-hover:bg-emerald-500/20 transition-all duration-500"></div>
                    <div className="relative bg-[#0f0f0f] border border-emerald-500/30 rounded-3xl p-10 h-full shadow-[0_0_30px_rgba(16,185,129,0.05)]">
                        <div className="absolute top-0 right-0 px-4 py-2 bg-emerald-500 rounded-bl-2xl rounded-tr-2xl text-xs font-bold text-black">OUR SYSTEM</div>
                        <h3 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 text-sm">✓</span>
                            Our Solutions
                        </h3>
                        <ul className="space-y-8">
                             <li className="flex gap-4 text-gray-200">
                                <CheckCircle className="text-emerald-500 shrink-0 mt-1" size={18}/>
                                <div>
                                    <span className="font-bold text-emerald-400 block mb-1">Predictable Job Orders.</span>
                                    <p className="text-sm text-gray-400 leading-relaxed">A system that delivers 3-5 qualified job orders monthly, transforming your revenue from volatile to reliable.</p>
                                </div>
                            </li>
                            <li className="flex gap-4 text-gray-200">
                                <CheckCircle className="text-emerald-500 shrink-0 mt-1" size={18}/>
                                <div>
                                    <span className="font-bold text-emerald-400 block mb-1">3-5x More Positive Replies.</span>
                                    <p className="text-sm text-gray-400 leading-relaxed">Our AI-powered, battle-tested scripts are proven to engage Founders and CEOs in your niche.</p>
                                </div>
                            </li>
                            <li className="flex gap-4 text-gray-200">
                                <CheckCircle className="text-emerald-500 shrink-0 mt-1" size={18}/>
                                <div>
                                    <span className="font-bold text-emerald-400 block mb-1">Direct Access to Hiring Managers.</span>
                                    <p className="text-sm text-gray-400 leading-relaxed">We guarantee meetings with the budget-approved people who can sign a placement agreement.</p>
                                </div>
                            </li>
                            <li className="flex gap-4 text-gray-200">
                                <CheckCircle className="text-emerald-500 shrink-0 mt-1" size={18}/>
                                <div>
                                    <span className="font-bold text-emerald-400 block mb-1">Automated, Done-For-You System.</span>
                                    <p className="text-sm text-gray-400 leading-relaxed">We handle the entire process (list building, sending, response management) so you can focus 100% on closing deals.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* THE FORMULA (Timeline) */}
      <section className="py-32 bg-[#030303] relative overflow-hidden">
         <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-red/50 to-transparent"></div>
         <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-[100px]"></div>
         <div className="max-w-7xl mx-auto px-4 mb-24 text-center relative z-10">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
            >
                <span className="text-brand-red font-bold text-sm uppercase tracking-widest border-b border-brand-red pb-1">THE FORMULA</span>
                <h2 className="text-4xl md:text-6xl font-bold mt-6 mb-6 text-white">Your 4-Week Journey to a Predictable Pipeline</h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">Our proven process is built for speed and zero effort on your part.</p>
            </motion.div>
         </div>
         <Timeline steps={TIMELINE_STEPS} />
      </section>

      {/* DELIVERABLES */}
      <section className="py-32 bg-black">
        <div className="max-w-6xl mx-auto px-4">
            <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-red via-red-900 to-brand-red rounded-[3.2rem] opacity-50 blur-md group-hover:opacity-75 transition duration-1000 animate-shimmer bg-[length:200%_100%]"></div>
                <div className="bg-black relative rounded-[3rem] p-10 md:p-20 border border-white/10 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[120px] pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-900/10 rounded-full blur-[100px] pointer-events-none"></div>

                    <div className="text-center mb-16 relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">What's Included in the <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-brand-red">Hiring Signal Engine</span></h2>
                        <p className="text-gray-400 text-lg">Everything you need to scale your staffing agency.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 relative z-10">
                        {DELIVERABLES.map((item, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="flex items-start gap-4 group/item"
                            >
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-red/10 border border-brand-red/20 flex items-center justify-center mt-1 group-hover/item:bg-brand-red group-hover/item:border-brand-red transition-all duration-300 shadow-[0_0_10px_rgba(220,38,38,0.2)]">
                                    <CheckCircle size={14} className="text-brand-red group-hover/item:text-white transition-colors duration-300" />
                                </div>
                                <span className="text-gray-400 group-hover/item:text-white transition-colors text-lg">{item}</span>
                            </motion.div>
                        ))}
                    </div>
                    <div className="mt-20 text-center relative z-10">
                        <Button 
                          variant="primary" 
                          className="text-lg px-16 py-6"
                          href={BOOKING_LINK}
                          target="_blank"
                        >
                          BOOK AN INTRO CALL <Calendar className="ml-2 w-5 h-5"/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
      </section>
      
      {/* TEAM */}
      <section id="about" className="py-32 bg-black relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-950/20 via-black to-black"></div>
         <div className="max-w-7xl mx-auto px-4 relative z-10">
             <div className="text-center mb-20">
                 <span className="text-brand-red font-bold text-sm uppercase tracking-widest border-b border-brand-red pb-1">LEADERSHIP</span>
                 <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4 text-white">Meet The Team</h2>
                 <p className="text-gray-400 max-w-2xl mx-auto text-lg">The minds behind the AI revolution in staffing.</p>
             </div>
             <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                {TEAM.map((member, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.2 }}
                    className="group relative"
                  >
                     <div className="absolute -inset-0.5 bg-gradient-to-b from-white/10 to-transparent rounded-2xl blur opacity-20 group-hover:opacity-50 group-hover:from-brand-red/50 transition duration-500"></div>
                     <div className="relative h-full bg-[#080808] border border-white/10 rounded-2xl overflow-hidden">
                        <div className="relative aspect-[4/5] overflow-hidden">
                           <div className="absolute inset-0 bg-brand-red/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                           <img 
                             src={member.image} 
                             alt={member.name} 
                             className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-105"
                           />
                           <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080808] to-transparent z-20"></div>
                        </div>
                        <div className="p-8 relative z-30 -mt-12">
                           <h3 className="text-3xl font-bold text-white mb-1 group-hover:text-brand-red transition-colors">{member.name}</h3>
                           <p className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200 font-medium mb-4">{member.title}</p>
                           <p className="text-gray-500 text-sm leading-relaxed border-t border-white/5 pt-4">{member.bio}</p>
                           <div className="mt-6 flex gap-4">
                              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#0077b5] hover:text-white hover:border-transparent transition-all cursor-pointer">
                                 <Linkedin size={18} />
                              </a>
                           </div>
                        </div>
                     </div>
                  </motion.div>
                ))}
             </div>
         </div>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-black border-t border-white/5 relative">
        <div className="max-w-3xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
                 <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                 <p className="text-gray-400">Get answers to common questions about our AI-powered cold email system.</p>
            </div>
            <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                    <details key={idx} className="group bg-neutral-900/20 rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 open:bg-neutral-900/60 open:border-brand-red/30 open:shadow-[0_0_20px_rgba(220,38,38,0.05)]">
                        <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-8 text-lg md:text-xl hover:text-brand-red transition-colors text-white">
                            <span>{faq.question}</span>
                            <span className="transition-transform duration-300 group-open:rotate-180 text-brand-red">
                                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                            </span>
                        </summary>
                        <div className="text-gray-400 p-8 pt-0 leading-relaxed animate-fade-in whitespace-pre-line">
                            {faq.answer}
                        </div>
                    </details>
                ))}
            </div>
            <div className="mt-16 text-center">
                <Button 
                  variant="primary" 
                  href={BOOKING_LINK}
                  target="_blank"
                >
                  BOOK AN INTRO CALL <Calendar className="ml-2 w-4 h-4"/>
                </Button>
            </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 bg-[#050505] border-t border-white/10 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[200px] bg-brand-red/5 blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                <div className="text-3xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                    Zillionsystems
                </div>
                <div className="flex gap-6">
                     <a href="https://in.linkedin.com/company/zillion-systems" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] hover:shadow-[0_0_15px_rgba(0,119,181,0.5)] transition-all duration-300">
                       <span className="sr-only">LinkedIn</span>
                       <Linkedin size={20} />
                    </a>
                    <a href="https://youtube.com/@zillionsystems" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] hover:shadow-[0_0_15px_rgba(255,0,0,0.5)] transition-all duration-300">
                       <span className="sr-only">YouTube</span>
                       <Youtube size={20} />
                    </a>
                    <a href="mailto:Swapnil@zillion-systems.com" className="w-12 h-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-red hover:text-white hover:border-brand-red hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all duration-300">
                       <span className="sr-only">Email</span>
                       <Mail size={20} />
                    </a>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-gray-500 text-sm">
                <p className="mb-4 md:mb-0 text-center md:text-left">&copy; 2025 SMPAJG Zillion Systems Agency LLP. All rights reserved.</p>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="mailto:Swapnil@zillion-systems.com" className="hover:text-white transition-colors">Contact Us</a>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}