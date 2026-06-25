import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Users, Briefcase, MapPin, Mail, Phone, Calendar, FileText, Award, Star, ArrowRight, LogOut, CheckCircle, Clock, AlertCircle, Eye, Building2, ChevronDown } from 'lucide-react';
import { Card, Badge, Button, Modal } from '../../components/ui';
import { useData, JobSeeker, JobPosting } from '../../context/DataContext';

function CandidateLogin() {
  const { candidateLogin } = useData();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const demoEmails = [
    { email: 'rajesh.kumar@email.com', name: 'Rajesh Kumar' },
    { email: 'priya.sharma@email.com', name: 'Priya Sharma' },
    { email: 'meera.reddy@email.com', name: 'Meera Reddy' },
    { email: 'vikram.singh@email.com', name: 'Vikram Singh' },
    { email: 'asha.bhosle@email.com', name: 'Asha Bhosle' },
  ];

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (candidateLogin(email)) {
      navigate('/dashboard/candidate');
    } else {
      setError('Candidate not found. Try a demo email below.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center p-4" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-xl mb-3 shadow-lg">
            <Users size={28} className="text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-white">Candidate Login</h1>
          <p className="text-blue-200 text-sm mt-1">Access your profile and job matches</p>
        </div>
        <Card className="shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
              <input type="email" required value={email} onChange={e => { setEmail(e.target.value); setError(''); }} placeholder="Enter your registered email" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-sm text-slate-900" />
            </div>
            {error && <p className="text-xs text-red-600">{error}</p>}
            <Button type="submit" fullWidth size="lg">Sign In</Button>
          </form>
          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-400 mb-2 font-medium">Quick Demo Login:</p>
            <div className="space-y-1.5">
              {demoEmails.map(d => (
                <button key={d.email} onClick={() => { setEmail(d.email); candidateLogin(d.email); navigate('/dashboard/candidate'); }} className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-blue-50 text-slate-600 hover:text-blue-700 transition-colors flex items-center justify-between">
                  <span>{d.name}</span>
                  <ArrowRight size={14} />
                </button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function CandidateDashboard() {
  const { loggedCandidate, candidateLogout, jobPostings, matches, placements, updateJobSeeker } = useData();
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [showJobModal, setShowJobModal] = useState(false);

  if (!loggedCandidate) { navigate('/login/candidate'); return null; }

  const candidate = loggedCandidate;
  const myMatches = matches.filter(m => m.candidateId === candidate.id);
  const myPlacements = placements.filter(p => p.candidateId === candidate.id);
  const appliedJobs = jobPostings.filter(j => j.applicants.includes(candidate.id));

  const profileCompletion = (() => {
    let score = 0;
    const fields: (string | boolean | string[])[] = [
      candidate.firstName, candidate.lastName, candidate.phone, candidate.email,
      candidate.dob, candidate.location, candidate.state,
      candidate.qualification, candidate.previousCompany, candidate.totalExperience,
      candidate.expectedSalary, candidate.preferredJobType,
    ];
    fields.forEach(f => { if (f && f !== 'N/A' && f !== 'Not Specified') score++; });
    if (candidate.skills.length > 0) score++;
    if (candidate.resumeFile) score++;
    return Math.round((score / 14) * 100);
  })();

  const statusSteps = [
    { label: 'Registered', done: true },
    { label: 'Contacted', done: ['Contacted', 'Interviewed', 'Placed'].includes(candidate.status) },
    { label: 'Interviewed', done: ['Interviewed', 'Placed'].includes(candidate.status) },
    { label: 'Placed', done: candidate.status === 'Placed' },
  ];

  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center"><Briefcase size={18} className="text-white" /></div>
            <span className="font-bold text-slate-900">My Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">{candidate.firstName[0]}{candidate.lastName[0]}</div>
              <span className="text-sm font-medium text-slate-700">{candidate.firstName} {candidate.lastName}</span>
            </div>
            <button onClick={() => { candidateLogout(); navigate('/'); }} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 transition-colors"><LogOut size={16} /> <span className="hidden sm:inline">Logout</span></button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome & Profile Card */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card className="!p-0 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl font-bold">{candidate.firstName[0]}{candidate.lastName[0]}</div>
                  <div>
                    <h1 className="text-2xl font-bold">{candidate.firstName} {candidate.lastName}</h1>
                    <p className="text-blue-100 flex items-center gap-2 mt-0.5"><MapPin size={14} />{candidate.location}, {candidate.state}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <div><p className="text-xs text-slate-400">Email</p><p className="text-sm font-medium text-slate-900 truncate">{candidate.email}</p></div>
                  <div><p className="text-xs text-slate-400">Phone</p><p className="text-sm font-medium text-slate-900">{candidate.phone}</p></div>
                  <div><p className="text-xs text-slate-400">Qualification</p><p className="text-sm font-medium text-slate-900">{candidate.qualification}</p></div>
                  <div><p className="text-xs text-slate-400">Experience</p><p className="text-sm font-medium text-slate-900">{candidate.totalExperience} years</p></div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.skills.map(s => <Badge key={s} variant="info">{s}</Badge>)}
                </div>
              </div>
            </Card>
          </div>

          {/* Profile Completion */}
          <div className="space-y-4">
            <Card>
              <p className="text-sm font-medium text-slate-700 mb-3">Profile Completion</p>
              <div className="relative w-24 h-24 mx-auto mb-3">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#E2E8F0" strokeWidth="8" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#2563EB" strokeWidth="8" strokeDasharray={`${profileCompletion * 2.64} 264`} strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-slate-900">{profileCompletion}%</span>
              </div>
              {!candidate.resumeFile && <p className="text-xs text-amber-600 text-center flex items-center justify-center gap-1"><AlertCircle size={12} /> Upload resume to improve</p>}
            </Card>
            <Card>
              <p className="text-sm font-medium text-slate-700 mb-3">Application Status</p>
              <div className="space-y-2">
                {statusSteps.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${s.done ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                      {s.done ? <CheckCircle size={14} /> : <span className="text-xs">{i + 1}</span>}
                    </div>
                    <span className={`text-sm ${s.done ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>{s.label}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Key Info Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <Card className="!p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{myMatches.length}</p>
            <p className="text-xs text-slate-500 mt-1">Job Matches</p>
          </Card>
          <Card className="!p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{myMatches.filter(m => ['Interview Scheduled', 'Offered', 'Hired'].includes(m.status)).length}</p>
            <p className="text-xs text-slate-500 mt-1">Interviews</p>
          </Card>
          <Card className="!p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">{myPlacements.length}</p>
            <p className="text-xs text-slate-500 mt-1">Placements</p>
          </Card>
          <Card className="!p-4 text-center">
            <p className="text-2xl font-bold text-amber-600">₹{parseInt(candidate.expectedSalary).toLocaleString()}</p>
            <p className="text-xs text-slate-500 mt-1">Expected Salary</p>
          </Card>
        </div>

        {/* My Matches & Applied Jobs */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* My Job Matches */}
          <Card>
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2"><Briefcase size={18} className="text-blue-600" /> My Job Matches</h3>
            {myMatches.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-8">No matches yet. Our agents are working on finding the right job for you!</p>
            ) : (
              <div className="space-y-3">
                {myMatches.map(m => (
                  <div key={m.id} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm ${m.matchScore >= 80 ? 'bg-green-500' : m.matchScore >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}>
                      {m.matchScore}%
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900">{m.jobTitle}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1"><Building2 size={12} />{m.companyName}</p>
                    </div>
                    <Badge variant={m.status === 'Hired' ? 'success' : m.status === 'Interview Scheduled' ? 'info' : m.status === 'Offered' ? 'success' : 'warning'}>{m.status}</Badge>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Applied Jobs */}
          <Card>
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2"><FileText size={18} className="text-teal-600" /> Jobs I Applied To</h3>
            {appliedJobs.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-8">No applications yet. Jobs you're matched with will appear here.</p>
            ) : (
              <div className="space-y-3">
                {appliedJobs.map(j => (
                  <div key={j.id} className="p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold text-slate-900">{j.jobTitle}</p>
                      <Badge variant={j.status === 'Open' ? 'success' : 'default'}>{j.status}</Badge>
                    </div>
                    <p className="text-xs text-slate-500">{j.companyName} • {j.city}, {j.state}</p>
                    <p className="text-xs text-green-600 font-medium mt-1">₹{parseInt(j.salaryMin).toLocaleString()} - ₹{parseInt(j.salaryMax).toLocaleString()}/month</p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {j.skillsRequired.slice(0, 3).map(s => <Badge key={s} variant="info" className="text-[9px]">{s}</Badge>)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* My Full Profile Details */}
        <Card className="mt-6">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2"><Users size={18} className="text-blue-600" /> My Submitted Profile</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            {[
              { label: 'Full Name', value: `${candidate.firstName} ${candidate.lastName}` },
              { label: 'Phone', value: candidate.phone },
              { label: 'Email', value: candidate.email },
              { label: 'Date of Birth', value: candidate.dob },
              { label: 'Gender', value: candidate.gender },
              { label: 'Location', value: `${candidate.location}, ${candidate.state}` },
              { label: 'Qualification', value: candidate.qualification },
              { label: 'Previous Company', value: candidate.previousCompany || 'N/A (Fresher)' },
              { label: 'Total Experience', value: `${candidate.totalExperience} years` },
              { label: 'Expected Salary', value: `₹${parseInt(candidate.expectedSalary).toLocaleString()}/month` },
              { label: 'Preferred Job Type', value: candidate.preferredJobType },
              { label: 'Willing to Relocate', value: candidate.willingToRelocate ? 'Yes' : 'No' },
            ].map(f => (
              <div key={f.label}>
                <p className="text-xs text-slate-400 font-medium">{f.label}</p>
                <p className="text-sm text-slate-900 font-medium mt-0.5">{f.value}</p>
              </div>
            ))}
            {candidate.willingToRelocate && candidate.preferredLocations.length > 0 && (
              <div>
                <p className="text-xs text-slate-400 font-medium">Preferred Locations</p>
                <div className="flex flex-wrap gap-1 mt-0.5">{candidate.preferredLocations.map(l => <Badge key={l} variant="info" className="text-[10px]">{l}</Badge>)}</div>
              </div>
            )}
            {candidate.resumeFile && (
              <div>
                <p className="text-xs text-slate-400 font-medium">Resume Uploaded</p>
                <p className="text-sm text-blue-600 font-medium mt-0.5 flex items-center gap-1"><FileText size={14} />{candidate.resumeFile}</p>
              </div>
            )}
            {candidate.profilePhotoFile && (
              <div>
                <p className="text-xs text-slate-400 font-medium">Profile Photo</p>
                <p className="text-sm text-blue-600 font-medium mt-0.5 flex items-center gap-1"><FileText size={14} />{candidate.profilePhotoFile}</p>
              </div>
            )}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-400 font-medium mb-1.5">Skills</p>
            <div className="flex flex-wrap gap-1.5">{candidate.skills.map(s => <Badge key={s} variant="default">{s}</Badge>)}</div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export { CandidateLogin, CandidateDashboard };
