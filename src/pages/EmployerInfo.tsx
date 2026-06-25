import { Link } from 'react-router-dom';
import { Building2, FileText, Users, CheckCircle, Zap, BadgeDollarSign, Shield, Clock, ArrowRight, TrendingUp, Target } from 'lucide-react';
import { FAQItem, Button } from '../components/ui';

function EmployerInfo() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-700 to-slate-800 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-500/30 border border-teal-400/30 rounded-full text-teal-200 text-sm font-medium mb-6">
            <Building2 size={14} /> For Employers
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">Hire Pre-Screened Rural Talent</h1>
          <p className="mt-4 text-lg text-teal-100 max-w-2xl mx-auto">Access a dedicated pool of skilled workers from rural and semi-urban India. Post your requirements and let us match you with the right candidates — faster and more affordably.</p>
          <Link to="/register/employer">
            <Button size="lg" className="mt-8 bg-white text-black hover:bg-slate-50 shadow-xl">
              Post a Job Requirement <ArrowRight size={18} className="ml-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">How Hiring Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: <FileText size={32} />, title: 'Post Your Job', desc: 'Fill in job details — role, skills needed, salary range, location, and any perks you offer.' },
              { step: '02', icon: <Users size={32} />, title: 'Receive Matched Candidates', desc: 'Our agents screen and match candidates based on your requirements. You get only relevant profiles.' },
              { step: '03', icon: <CheckCircle size={32} />, title: 'Hire & Onboard', desc: 'Interview shortlisted candidates, select the best fit, and we help with the onboarding process.' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl mb-4">{s.icon}</div>
                <div className="text-xs font-bold text-teal-400 mb-2">STEP {s.step}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Why Employers Choose Us</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Target size={24} className="text-blue-600" />, title: 'Pre-Screened Candidates', desc: 'Every candidate is verified. No irrelevant applications — only qualified matches reach you.' },
              { icon: <Zap size={24} className="text-amber-600" />, title: 'Faster Hiring', desc: 'Reduce time-to-hire from weeks to days. Our agents handle sourcing and initial screening.' },
              { icon: <BadgeDollarSign size={24} className="text-green-600" />, title: 'Pay Only for Placements', desc: 'No upfront fees. You pay a commission only when a candidate is successfully placed.' },
              { icon: <Shield size={24} className="text-purple-600" />, title: 'Dedicated Rural Talent', desc: 'Access workers from rural and semi-urban areas who bring dedication and loyalty to their roles.' },
              { icon: <Clock size={24} className="text-teal-600" />, title: 'End-to-End Support', desc: 'From posting to onboarding, our agents manage the entire recruitment pipeline for you.' },
              { icon: <TrendingUp size={24} className="text-red-500" />, title: 'Scalable Recruitment', desc: 'Need 2 or 200 workers? We handle bulk hiring needs with the same quality and care.' },
            ].map(b => (
              <div key={b.title} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                <div className="mb-3">{b.icon}</div>
                <h4 className="font-semibold text-slate-900">{b.title}</h4>
                <p className="text-sm text-slate-500 mt-1">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Graphic */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Your Hiring Timeline</h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-teal-200" />
            {[
              { day: 'Day 1', title: 'Submit Job Posting', desc: 'Fill out the job details form with requirements, salary, and location.', color: 'bg-teal-600' },
              { day: 'Day 2-3', title: 'Agent Reviews & Screens', desc: 'Our agent reviews your posting and begins matching with suitable candidates.', color: 'bg-blue-600' },
              { day: 'Day 4-5', title: 'Receive Shortlisted Profiles', desc: 'You receive 3-5 pre-screened candidate profiles that match your criteria.', color: 'bg-purple-600' },
              { day: 'Day 6-8', title: 'Interview Candidates', desc: 'Schedule and conduct interviews with shortlisted candidates. We coordinate logistics.', color: 'bg-amber-600' },
              { day: 'Day 9-10', title: 'Make Your Hire', desc: 'Select the best candidate, issue the offer letter, and onboard them with our support.', color: 'bg-green-600' },
            ].map((item, i) => (
              <div key={i} className="relative flex gap-6 pb-8 last:pb-0">
                <div className={`flex-shrink-0 w-12 h-12 ${item.color} text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg z-10`}>
                  {i + 1}
                </div>
                <div className="bg-slate-50 rounded-xl p-4 flex-1 border border-slate-100">
                  <div className="text-xs font-semibold text-slate-400 mb-1">{item.day}</div>
                  <h4 className="font-semibold text-slate-900">{item.title}</h4>
                  <p className="text-sm text-slate-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-10">Frequently Asked Questions</h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <FAQItem question="How do I post a job?" answer="Click 'Post a Job Requirement' and fill out the company and job details form. Once submitted, our agent will review it and begin matching candidates." />
            <FAQItem question="What are the costs and commissions?" answer="There are no upfront fees for posting jobs. We charge a commission only on successful placements. Contact us for specific pricing based on your hiring volume." />
            <FAQItem question="How quickly can I expect candidates?" answer="Most employers receive their first batch of shortlisted candidates within 3-5 business days of posting." />
            <FAQItem question="Can I post multiple job openings?" answer="Yes, you can post as many job openings as needed. Each posting is handled separately by our team." />
            <FAQItem question="How are candidates screened?" answer="Our agents verify candidate profiles, check qualifications and experience, and assess skill match before forwarding them to employers." />
            <FAQItem question="What if a placed candidate leaves?" answer="We offer a replacement guarantee period. If a candidate leaves within the first 30 days, we'll find a replacement at no additional cost." />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-teal-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Hire the Best Talent?</h2>
          <p className="mt-3 text-teal-100">Post your first job requirement and start receiving matched candidates</p>
          <Link to="/register/employer">
            <Button size="lg" className="mt-6 bg-white text-black hover:bg-slate-50 shadow-xl">
              Post a Job Requirement <ArrowRight size={18} className="ml-1" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default EmployerInfo;
