import { Link } from 'react-router-dom';
import { UserCheck, Search, Briefcase, MapPin, Shield, Clock, Heart, ArrowRight, CheckCircle } from 'lucide-react';
import { FAQItem, Button } from '../components/ui';

function JobSeekerInfo() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/30 border border-blue-400/30 rounded-full text-blue-200 text-sm font-medium mb-6">
            <UserCheck size={14} /> For Job Seekers
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">Your Next Career Starts Here</h1>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">Join thousands of skilled workers from rural India who have found meaningful employment through our platform. Free registration, personalized matching, and full support.</p>
          <Link to="/register/job-seeker">
            <Button size="lg" className="mt-8 bg-white text-black hover:bg-slate-50 shadow-xl">
              Register Now — It's Free <ArrowRight size={18} className="ml-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">How to Get Started</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: <UserCheck size={32} />, title: 'Create Your Profile', desc: 'Fill in your details — name, skills, experience, and job preferences. Takes less than 5 minutes.' },
              { step: '02', icon: <Search size={32} />, title: 'Get Matched', desc: 'Our team reviews your profile and matches you with the best-fit job openings from verified employers.' },
              { step: '03', icon: <Briefcase size={32} />, title: 'Get Hired', desc: 'Interview with employers, receive your offer letter, and start your new job with ongoing support.' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl mb-4">{s.icon}</div>
                <div className="text-xs font-bold text-blue-400 mb-2">STEP {s.step}</div>
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
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Why Join Rozgaar Hai?</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { icon: <CheckCircle size={22} className="text-green-600" />, title: '100% Free for Job Seekers', desc: 'No registration fees, no hidden charges. Our service is completely free for candidates.' },
              { icon: <Shield size={22} className="text-blue-600" />, title: 'Verified Employers Only', desc: 'Every company on our platform is vetted. You only interact with legitimate businesses.' },
              { icon: <MapPin size={22} className="text-amber-600" />, title: 'Local & Relocation Jobs', desc: 'Find opportunities near your hometown or explore jobs in new cities — your choice.' },
              { icon: <Clock size={22} className="text-purple-600" />, title: 'Quick Turnaround', desc: 'Most candidates get their first match within a week of registration.' },
              { icon: <Heart size={22} className="text-red-500" />, title: 'Career Support', desc: 'Our agents guide you through interviews, negotiations, and onboarding.' },
              { icon: <Briefcase size={22} className="text-teal-600" />, title: 'Diverse Industries', desc: 'Manufacturing, healthcare, IT, agriculture, logistics — opportunities across sectors.' },
            ].map(b => (
              <div key={b.title} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex gap-4">
                <div className="flex-shrink-0 mt-0.5">{b.icon}</div>
                <div>
                  <h4 className="font-semibold text-slate-900">{b.title}</h4>
                  <p className="text-sm text-slate-500 mt-1">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Form Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">Simple Registration Form</h2>
          <p className="text-center text-slate-500 mb-10">Our form is designed to be quick and easy. Here's what you'll need:</p>
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
            <div className="grid sm:grid-cols-2 gap-4">
              {['Full Name', 'Phone Number', 'Email Address', 'Date of Birth', 'Current Location', 'Gender', 'Highest Qualification', 'Key Skills', 'Experience (Years)', 'Preferred Job Type', 'Expected Salary', 'Willingness to Relocate'].map((field, i) => (
                <div key={i} className="bg-white rounded-lg p-3 border border-slate-200 flex items-center gap-2">
                  <CheckCircle size={16} className="text-blue-500 flex-shrink-0" />
                  <span className="text-sm text-slate-700">{field}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-4 text-center">Resume upload and profile photo are optional</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-10">Frequently Asked Questions</h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <FAQItem question="How do I apply for a job?" answer="Simply register on our platform by filling out the profile form. Our team will review your profile and match you with suitable job openings. You don't need to apply for individual jobs — we do the matching for you." />
            <FAQItem question="Do I need a resume to register?" answer="No, a resume is optional. You can fill in all your details directly in the registration form. However, if you have a resume, uploading it can speed up the process." />
            <FAQItem question="Is there any fee for registration?" answer="No, registration is completely free for job seekers. There are no charges at any stage of the process." />
            <FAQItem question="How will I know if I'm matched with a job?" answer="Once matched, our agent will contact you via phone or email with the job details. You can then decide to proceed with the interview." />
            <FAQItem question="Can I apply for jobs in another state?" answer="Yes! During registration, indicate your willingness to relocate and specify your preferred locations. We'll match you with opportunities in those areas." />
            <FAQItem question="What types of jobs are available?" answer="We have openings across manufacturing, healthcare, IT, agriculture, logistics, construction, education, and more. Both full-time and part-time positions are available." />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Find Your Next Job?</h2>
          <p className="mt-3 text-blue-100">Join 1,200+ candidates already registered on our platform</p>
          <Link to="/register/job-seeker">
            <Button size="lg" className="mt-6 bg-white text-black hover:bg-slate-50 shadow-xl">
              Register Now — Free <ArrowRight size={18} className="ml-1" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default JobSeekerInfo;
