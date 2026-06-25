import { Link } from 'react-router-dom';
import { Users, Building2, UserCheck, Briefcase, MapPin, GraduationCap, ArrowRight, CheckCircle, Star, Shield, Zap, Heart, Award, TrendingUp } from 'lucide-react';
import { AnimatedCounter, FAQItem } from '../components/ui';
import { useState } from 'react';

function Landing() {
  const testimonials = [
    { name: 'Rajesh Kumar', role: 'Machine Operator, Pune', quote: 'Rozgaar Hai helped me find a stable job near my hometown. The process was simple and the team guided me at every step.', rating: 5, avatar: 'RK' },
    { name: 'Priya Sharma', role: 'Staff Nurse, Hyderabad', quote: 'I was struggling to find opportunities from my village. This platform matched me with a hospital that valued my skills.', rating: 5, avatar: 'PS' },
    { name: 'Sanjay Mehta', role: 'HR Manager, Bharat Manufacturing', quote: 'We needed reliable workers for our factory. The pre-screened candidates saved us weeks of recruitment effort.', rating: 5, avatar: 'SM' },
    { name: 'Anita Deshmukh', role: 'Director, Greenfield Agro', quote: 'Finding skilled agricultural workers was always a challenge. This platform connected us with qualified rural candidates.', rating: 4, avatar: 'AD' },
  ];

  const trustedBy = ['Bharat Mfg.', 'Metro Hospital', 'TechRural', 'QuickDel', 'Sunrise Con.', 'Apex Pharma', 'Northern Steel'];

  return (
    <div>
      {/* ═══ HERO — Same dark gradient (looks great in both modes) ═══ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `radial-gradient(ellipse 80% 50% at 20% 40%, rgba(37,99,235,0.4), transparent), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(13,148,136,0.3), transparent)` }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-0 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.08] backdrop-blur-sm border border-white/[0.12] rounded-full text-blue-300 text-sm font-medium mb-8">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Now serving 10+ states across India
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
                Connecting Skilled{' '}
                <span className="relative"><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">Rural Talent</span><span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 rounded-full opacity-50" /></span>
                <br />with{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Businesses</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-slate-300/90 leading-relaxed max-w-xl mx-auto lg:mx-0">
                India's trusted recruitment platform bridging the gap between talented rural job seekers and employers looking for dedicated, skilled workers.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/register/job-seeker" className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-2xl shadow-blue-600/30 transition-all duration-300 hover:-translate-y-0.5 text-base">
                  <Users size={20} /> I'm a Job Seeker <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link to="/register/employer" className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/[0.08] backdrop-blur-sm hover:bg-white/[0.15] border border-white/20 text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 text-base">
                  <Building2 size={20} /> I'm an Employer
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-6 justify-center lg:justify-start text-sm text-slate-400">
                <span className="flex items-center gap-1.5"><CheckCircle size={15} className="text-green-400" /> No fees for seekers</span>
                <span className="flex items-center gap-1.5"><Shield size={15} className="text-blue-400" /> Verified employers</span>
                <span className="flex items-center gap-1.5"><Zap size={15} className="text-amber-400" /> Matched in 3-7 days</span>
              </div>
            </div>
            <div className="hidden lg:flex justify-center relative">
              <div className="relative w-full max-w-lg">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-teal-500/20 rounded-3xl blur-2xl" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <img src="/images/hero-illustration.png" alt="Rural workforce" className="w-full h-auto object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                </div>
                <div className="absolute -top-4 -right-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-xl p-3.5 shadow-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg"><TrendingUp size={18} className="text-green-600 dark:text-green-400" /></div>
                    <div><p className="text-xs text-slate-500 dark:text-slate-400">Placed This Month</p><p className="text-lg font-bold text-slate-900 dark:text-white">+38 <span className="text-xs text-green-600 dark:text-green-400 font-medium">↑ 12%</span></p></div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-xl p-3.5 shadow-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg"><UserCheck size={18} className="text-blue-600 dark:text-blue-400" /></div>
                    <div><p className="text-xs text-slate-500 dark:text-slate-400">New Match Found</p><p className="text-sm font-bold text-slate-900 dark:text-white">Amit P. → Machine Op.</p><p className="text-xs font-semibold text-green-600 dark:text-green-400">91% Match</p></div>
                  </div>
                </div>
                <div className="absolute -bottom-2 right-6 bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Live Matching
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 55C120 50 240 40 360 38C480 36 600 42 720 48C840 54 960 60 1080 58C1200 56 1320 46 1380 41L1440 36V100H0Z" className="fill-slate-50 dark:fill-slate-950" />
          </svg>
        </div>
      </section>

      {/* ═══ TRUSTED BY ═══ */}
      <section className="py-8 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-600 uppercase tracking-widest text-center mb-4">Trusted by companies across India</p>
          <div className="flex items-center justify-center gap-8 sm:gap-12 flex-wrap">
            {trustedBy.map(name => <span key={name} className="text-sm font-bold text-slate-300 dark:text-slate-700 tracking-wide">{name}</span>)}
          </div>
        </div>
      </section>

      {/* ═══ STATS — Premium navy gradient ═══ */}
      <section className="py-20 section-gradient-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Impact That Matters</h2>
            <p className="mt-3 text-blue-200 text-lg">Numbers that speak for themselves</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Users size={28} />, value: 1247, label: 'Candidates Registered', accent: 'from-blue-400 to-blue-600', bg: 'bg-white/10' },
              { icon: <Briefcase size={28} />, value: 486, label: 'Jobs Posted', accent: 'from-teal-400 to-teal-600', bg: 'bg-white/10' },
              { icon: <UserCheck size={28} />, value: 392, label: 'Placements Made', accent: 'from-emerald-400 to-emerald-600', bg: 'bg-white/10' },
              { icon: <GraduationCap size={28} />, value: 28, label: 'Industry Partners', accent: 'from-purple-400 to-purple-600', bg: 'bg-white/10' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-white/[0.07] backdrop-blur-sm border border-white/[0.12] hover:bg-white/[0.12] transition-all duration-300 hover:-translate-y-1">
                <div className={`inline-flex p-3.5 rounded-xl ${stat.bg} mb-4`}>{stat.icon}</div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white"><AnimatedCounter end={stat.value} /></div>
                <p className="text-sm text-blue-200 mt-1.5 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS — Light/teal gradient ═══ */}
      <section className="py-20 section-gradient-teal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4"><Zap size={14} /> Simple Process</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">How It Works</h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400 text-lg">Get started in 3 simple steps</p>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-blue-600 rounded-xl"><Users size={24} className="text-white" /></div>
                <div><h3 className="text-xl font-bold text-slate-900 dark:text-white">For Job Seekers</h3><p className="text-sm text-slate-500 dark:text-slate-400">Find your perfect role</p></div>
              </div>
              <div className="space-y-6">
                {[
                  { step: 1, title: 'Register Free', desc: 'Create your profile with skills, experience, and preferences in under 5 minutes.', color: '#2563EB' },
                  { step: 2, title: 'Get Matched', desc: 'Our team matches your profile with suitable job openings from verified employers.', color: '#3B82F6' },
                  { step: 3, title: 'Get Hired', desc: 'Attend interviews, receive offers, and start your new career with ongoing support.', color: '#60A5FA' },
                ].map(s => (
                  <div key={s.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-lg" style={{ backgroundColor: s.color }}>{s.step}</div>
                    <div><h4 className="font-semibold text-slate-900 dark:text-white">{s.title}</h4><p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{s.desc}</p></div>
                  </div>
                ))}
              </div>
              <Link to="/register/job-seeker" className="mt-8 inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm hover:text-blue-700 dark:hover:text-blue-300 group">Register Now <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></Link>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-teal-600 rounded-xl"><Building2 size={24} className="text-white" /></div>
                <div><h3 className="text-xl font-bold text-slate-900 dark:text-white">For Employers</h3><p className="text-sm text-slate-500 dark:text-slate-400">Hire pre-screened talent</p></div>
              </div>
              <div className="space-y-6">
                {[
                  { step: 1, title: 'Post a Job', desc: 'Describe your requirements — role, skills needed, salary, and location.', color: '#0D9488' },
                  { step: 2, title: 'Receive Candidates', desc: 'Get matched with pre-screened candidates that fit your needs perfectly.', color: '#14B8A6' },
                  { step: 3, title: 'Hire the Best', desc: 'Interview, select, and onboard the right candidate with our full support.', color: '#2DD4BF' },
                ].map(s => (
                  <div key={s.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-lg" style={{ backgroundColor: s.color }}>{s.step}</div>
                    <div><h4 className="font-semibold text-slate-900 dark:text-white">{s.title}</h4><p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{s.desc}</p></div>
                  </div>
                ))}
              </div>
              <Link to="/register/employer" className="mt-8 inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold text-sm hover:text-teal-700 dark:hover:text-teal-300 group">Post a Job <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BENEFITS — White with accent cards ═══ */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">Why Choose Rozgaar Hai?</h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400 text-lg">Benefits designed for both sides of the hiring equation</p>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2"><Users size={22} className="text-blue-600 dark:text-blue-400" /> For Job Seekers</h3>
              <div className="space-y-3">
                {[
                  { title: 'Free Registration', desc: 'No fees ever. Create your profile and apply for jobs at zero cost.', icon: <CheckCircle size={20} className="text-blue-500 dark:text-blue-400" /> },
                  { title: 'Vetted & Verified Jobs', desc: 'All employers and job postings are verified for authenticity.', icon: <Shield size={20} className="text-blue-500 dark:text-blue-400" /> },
                  { title: 'Career Support', desc: 'Our agents guide you through the entire process.', icon: <Heart size={20} className="text-blue-500 dark:text-blue-400" /> },
                  { title: 'Local & Relocation Options', desc: 'Find jobs near your hometown or explore opportunities across India.', icon: <MapPin size={20} className="text-blue-500 dark:text-blue-400" /> },
                  { title: 'Quick Matching', desc: 'Our matching engine connects you with relevant jobs within days.', icon: <Zap size={20} className="text-blue-500 dark:text-blue-400" /> },
                ].map(b => (
                  <div key={b.title} className="flex gap-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-100 dark:border-blue-900/30 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                    <div className="flex-shrink-0 mt-0.5">{b.icon}</div>
                    <div><h4 className="font-semibold text-slate-900 dark:text-white text-sm">{b.title}</h4><p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{b.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2"><Building2 size={22} className="text-teal-600 dark:text-teal-400" /> For Employers</h3>
              <div className="space-y-3">
                {[
                  { title: 'Pre-screened Candidates', desc: 'Every candidate profile is verified. Get quality matches.', icon: <UserCheck size={20} className="text-teal-500 dark:text-teal-400" /> },
                  { title: 'Faster Hiring', desc: 'Reduce time-to-hire from weeks to days.', icon: <Zap size={20} className="text-teal-500 dark:text-teal-400" /> },
                  { title: 'Lower Recruitment Cost', desc: 'Pay only for successful placements.', icon: <TrendingUp size={20} className="text-teal-500 dark:text-teal-400" /> },
                  { title: 'Rural Talent Pool', desc: 'Access skilled workers from rural and semi-urban India.', icon: <Award size={20} className="text-teal-500 dark:text-teal-400" /> },
                  { title: 'Dedicated Agent Support', desc: 'A recruitment agent handles sourcing and screening for you.', icon: <Shield size={20} className="text-teal-500 dark:text-teal-400" /> },
                ].map(b => (
                  <div key={b.title} className="flex gap-4 bg-teal-50/50 dark:bg-teal-900/10 rounded-xl p-4 border border-teal-100 dark:border-teal-900/30 hover:border-teal-200 dark:hover:border-teal-800 transition-colors">
                    <div className="flex-shrink-0 mt-0.5">{b.icon}</div>
                    <div><h4 className="font-semibold text-slate-900 dark:text-white text-sm">{b.title}</h4><p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{b.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS — Warm gradient ═══ */}
      <section className="py-20 section-gradient-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">What Our Users Say</h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400 text-lg">Real stories from job seekers and employers</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="flex items-center gap-0.5 mb-4">{[...Array(t.rating)].map((_, j) => <Star key={j} size={14} className="text-amber-400 fill-amber-400" />)}</div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">"{t.quote}"</p>
                <div className="mt-4 flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <div className="w-9 h-9 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-bold">{t.avatar}</div>
                  <div><p className="text-sm font-semibold text-slate-900 dark:text-white">{t.name}</p><p className="text-xs text-slate-400 dark:text-slate-500">{t.role}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400">Got questions? We've got answers.</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <FAQItem question="Is registration free for job seekers?" answer="Yes, absolutely! Registration is completely free for all job seekers. There are no hidden charges or fees at any point in the process." />
            <FAQItem question="Do I need a resume to register?" answer="No, a resume is optional. You can fill in your details directly in our registration form. However, uploading a resume can help our agents match you faster." />
            <FAQItem question="How long does it take to get matched with a job?" answer="Most candidates receive their first match within 3-7 days of registration. The timeline depends on your skills, location preferences, and available openings." />
            <FAQItem question="How much does it cost for employers?" answer="Employers pay a commission only on successful placements. There are no upfront fees for posting jobs. Contact us for our competitive pricing." />
            <FAQItem question="Are the employers verified?" answer="Yes, all employers on our platform go through a verification process. We check company details, GST registration, and contact information before listing their jobs." />
            <FAQItem question="Can I apply for jobs in a different state?" answer="Yes! During registration, you can indicate your willingness to relocate and specify preferred locations. We'll match you with opportunities accordingly." />
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 30% 50%, white 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">Ready to Get Started?</h2>
          <p className="mt-5 text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">Join thousands of job seekers and employers already using Rozgaar Hai.</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register/job-seeker" className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white hover:bg-slate-50 text-black font-semibold rounded-xl shadow-xl transition-all duration-300 hover:-translate-y-0.5 text-base">
              <Users size={20} /> Register as Job Seeker <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/register/employer" className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/10 hover:bg-white/20 border-2 border-white/30 text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 text-base">
              <Building2 size={20} /> Post a Job <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;
