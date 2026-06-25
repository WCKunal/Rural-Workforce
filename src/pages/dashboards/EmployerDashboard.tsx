import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, Briefcase, Users, MapPin, FileText, LogOut, ArrowRight, Eye, IndianRupee, CheckCircle, Clock, Plus } from 'lucide-react';
import { Card, Badge, Button, Modal } from '../../components/ui';
import { useData, JobPosting, JobSeeker } from '../../context/DataContext';

function EmployerLogin() {
  const { employerLogin } = useData();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const demoEmails = [
    { email: 'sanjay@bharatmfg.com', name: 'Sanjay Mehta — Bharat Mfg.' },
    { email: 'rohit@techrural.com', name: 'Rohit Agarwal — TechRural' },
    { email: 'krao@metrohospital.org', name: 'Dr. K. Rao — Metro Hospital' },
    { email: 'kapil@northernsteel.in', name: 'Kapil Sharma — Northern Steel' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900 flex items-center justify-center p-4" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-xl mb-3 shadow-lg"><Building2 size={28} className="text-teal-600" /></div>
          <h1 className="text-2xl font-bold text-white">Employer Login</h1>
          <p className="text-teal-200 text-sm mt-1">Manage your job postings and applicants</p>
        </div>
        <Card className="shadow-2xl">
          <form onSubmit={e => { e.preventDefault(); if (employerLogin(email)) navigate('/dashboard/employer'); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Contact Email</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="your@company.com" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none text-sm text-slate-900" />
            </div>
            <Button type="submit" fullWidth size="lg" className="bg-teal-600 hover:bg-teal-700">Sign In</Button>
          </form>
          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-400 mb-2 font-medium">Quick Demo Login:</p>
            <div className="space-y-1.5">
              {demoEmails.map(d => (
                <button key={d.email} onClick={() => { setEmail(d.email); employerLogin(d.email); navigate('/dashboard/employer'); }} className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-teal-50 text-slate-600 hover:text-teal-700 transition-colors flex items-center justify-between">
                  <span>{d.name}</span><ArrowRight size={14} />
                </button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function EmployerDashboard() {
  const { loggedEmployer, employerLogout, jobPostings, jobSeekers, matches, placements } = useData();
  const navigate = useNavigate();
  const [viewingApplicant, setViewingApplicant] = useState<JobSeeker | null>(null);
  const [showApplicantModal, setShowApplicantModal] = useState(false);
  const [viewingJob, setViewingJob] = useState<JobPosting | null>(null);

  if (!loggedEmployer) { navigate('/login/employer'); return null; }

  const employer = loggedEmployer;
  const myJobs = jobPostings.filter(j => j.employerId === employer.id);
  const myPlacements = placements.filter(p => p.employerId === employer.id);
  const totalApplicants = myJobs.reduce((sum, j) => sum + j.applicants.length, 0);
  const activeJobs = myJobs.filter(j => j.status === 'Open').length;

  const getApplicantsForJob = (jobId: string) => {
    const job = myJobs.find(j => j.id === jobId);
    if (!job) return [];
    return job.applicants.map(id => jobSeekers.find(s => s.id === id)).filter(Boolean) as JobSeeker[];
  };

  const getMatchesForJob = (jobId: string) => matches.filter(m => m.jobId === jobId);

  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-teal-600 rounded-lg flex items-center justify-center"><Building2 size={18} className="text-white" /></div>
            <div>
              <span className="font-bold text-slate-900 text-sm">{employer.companyName}</span>
              <span className="text-xs text-slate-400 ml-2">{employer.industry}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/register/employer" className="text-sm text-blue-600 font-medium hover:text-blue-700 hidden sm:block">+ Post New Job</Link>
            <button onClick={() => { employerLogout(); navigate('/'); }} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 transition-colors"><LogOut size={16} /> <span className="hidden sm:inline">Logout</span></button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl p-5 text-white shadow-lg">
            <Briefcase size={20} className="opacity-80" />
            <p className="text-2xl font-bold mt-2">{activeJobs}</p>
            <p className="text-teal-100 text-xs">Active Jobs</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg">
            <Users size={20} className="opacity-80" />
            <p className="text-2xl font-bold mt-2">{totalApplicants}</p>
            <p className="text-blue-100 text-xs">Total Applicants</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white shadow-lg">
            <CheckCircle size={20} className="opacity-80" />
            <p className="text-2xl font-bold mt-2">{myPlacements.length}</p>
            <p className="text-green-100 text-xs">Placements</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white shadow-lg">
            <IndianRupee size={20} className="opacity-80" />
            <p className="text-2xl font-bold mt-2">₹{myJobs.reduce((sum, j) => sum + parseInt(j.salaryMax), 0).toLocaleString()}</p>
            <p className="text-purple-100 text-xs">Max Salary Budget</p>
          </div>
        </div>

        {/* Company Info */}
        <Card className="mb-8">
          <h3 className="font-semibold text-slate-900 mb-3">Company Details</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div><p className="text-xs text-slate-400">Industry</p><p className="text-sm font-medium text-slate-900">{employer.industry}</p></div>
            <div><p className="text-xs text-slate-400">Size</p><p className="text-sm font-medium text-slate-900">{employer.companySize} employees</p></div>
            <div><p className="text-xs text-slate-400">Location</p><p className="text-sm font-medium text-slate-900">{employer.city}, {employer.state}</p></div>
            <div><p className="text-xs text-slate-400">Contact</p><p className="text-sm font-medium text-slate-900">{employer.contactName}</p></div>
          </div>
        </Card>

        {/* Job Postings with Applicants */}
        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2"><Briefcase size={22} className="text-teal-600" /> My Job Postings ({myJobs.length})</h3>
        {myJobs.length === 0 ? (
          <Card className="text-center py-12">
            <Briefcase size={40} className="text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No job postings yet</p>
            <Link to="/register/employer"><Button className="mt-3 gap-1"><Plus size={14} /> Post a Job</Button></Link>
          </Card>
        ) : (
          <div className="space-y-6">
            {myJobs.map(job => {
              const applicants = getApplicantsForJob(job.id);
              const jobMatches = getMatchesForJob(job.id);
              return (
                <Card key={job.id} className="!p-0 overflow-hidden">
                  {/* Job Header */}
                  <div className="p-5 border-b border-slate-200 bg-slate-50">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-lg font-bold text-slate-900">{job.jobTitle}</h4>
                          <Badge variant={job.status === 'Open' ? 'success' : 'default'}>{job.status}</Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                          <span className="flex items-center gap-1"><MapPin size={14} />{job.city}, {job.state}</span>
                          <span className="flex items-center gap-1"><IndianRupee size={14} />₹{parseInt(job.salaryMin).toLocaleString()} - ₹{parseInt(job.salaryMax).toLocaleString()}</span>
                          <span>{job.employmentType}</span>
                          <span>{job.numberOfOpenings} openings</span>
                          <span className="flex items-center gap-1"><Users size={14} />{applicants.length} applicants</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {job.skillsRequired.map(s => <Badge key={s} variant="info" className="text-[10px]">{s}</Badge>)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Applicants Section */}
                  <div className="p-5">
                    <h5 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                      <Users size={16} className="text-blue-600" /> Applicants ({applicants.length})
                    </h5>
                    {applicants.length === 0 ? (
                      <p className="text-sm text-slate-400 py-4 text-center">No applicants yet. Our agents are sourcing candidates for this role.</p>
                    ) : (
                      <div className="space-y-3">
                        {applicants.map(applicant => {
                          const match = jobMatches.find(m => m.candidateId === applicant.id);
                          return (
                            <div key={applicant.id} className="flex items-center gap-4 p-3 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                              <div className="w-11 h-11 bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                                {applicant.firstName[0]}{applicant.lastName[0]}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-900">{applicant.firstName} {applicant.lastName}</p>
                                <p className="text-xs text-slate-500">{applicant.qualification} • {applicant.totalExperience} yrs exp • {applicant.location}, {applicant.state}</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {applicant.skills.slice(0, 3).map(s => <Badge key={s} variant="default" className="text-[9px]">{s}</Badge>)}
                                </div>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                {match && (
                                  <div className={`text-center px-2.5 py-1 rounded-lg ${match.matchScore >= 80 ? 'bg-green-50 text-green-700' : match.matchScore >= 60 ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'}`}>
                                    <p className="text-lg font-bold leading-tight">{match.matchScore}%</p>
                                    <p className="text-[9px] font-medium">Match</p>
                                  </div>
                                )}
                                <Button variant="outline" size="sm" onClick={() => { setViewingApplicant(applicant); setShowApplicantModal(true); }}>
                                  <Eye size={14} className="mr-1" /> View
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Matched Candidates (not yet applied) */}
                    {jobMatches.filter(m => !job.applicants.includes(m.candidateId)).length > 0 && (
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <h5 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                          <Users size={16} className="text-amber-600" /> Matched Candidates (Not Yet Applied)
                        </h5>
                        <div className="space-y-2">
                          {jobMatches.filter(m => !job.applicants.includes(m.candidateId)).map(m => (
                            <div key={m.id} className="flex items-center justify-between p-2.5 rounded-lg bg-amber-50 border border-amber-100">
                              <div>
                                <p className="text-sm font-medium text-slate-900">{m.candidateName}</p>
                                <p className="text-xs text-slate-500">Match Score: {m.matchScore}%</p>
                              </div>
                              <Badge variant="warning">{m.status}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Applicant Detail Modal */}
      <Modal isOpen={showApplicantModal} onClose={() => setShowApplicantModal(false)} title="Applicant Full Profile" size="lg">
        {viewingApplicant && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-2xl font-bold">
                {viewingApplicant.firstName[0]}{viewingApplicant.lastName[0]}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{viewingApplicant.firstName} {viewingApplicant.lastName}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={viewingApplicant.status === 'Placed' ? 'success' : viewingApplicant.status === 'New' ? 'info' : 'warning'}>{viewingApplicant.status}</Badge>
                  <span className="text-xs text-slate-400">Registered {viewingApplicant.createdAt}</span>
                </div>
              </div>
            </div>

            {/* Complete Submission Data */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2"><FileText size={16} className="text-blue-600" /> Complete Form Submission</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Full Name', value: `${viewingApplicant.firstName} ${viewingApplicant.lastName}` },
                  { label: 'Phone Number', value: viewingApplicant.phone },
                  { label: 'Email Address', value: viewingApplicant.email },
                  { label: 'Date of Birth', value: viewingApplicant.dob },
                  { label: 'Age', value: `${Math.floor((Date.now() - new Date(viewingApplicant.dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000))} years` },
                  { label: 'Gender', value: viewingApplicant.gender },
                  { label: 'Current Location', value: `${viewingApplicant.location}, ${viewingApplicant.state}` },
                  { label: 'Highest Qualification', value: viewingApplicant.qualification },
                  { label: 'Previous Company', value: viewingApplicant.previousCompany || 'N/A (Fresher)' },
                  { label: 'Total Experience', value: `${viewingApplicant.totalExperience} years` },
                  { label: 'Expected Salary', value: `₹${parseInt(viewingApplicant.expectedSalary).toLocaleString()}/month` },
                  { label: 'Preferred Job Type', value: viewingApplicant.preferredJobType },
                  { label: 'Willing to Relocate', value: viewingApplicant.willingToRelocate ? 'Yes' : 'No' },
                ].map(f => (
                  <div key={f.label} className="bg-white rounded-lg p-2.5 border border-slate-100">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">{f.label}</p>
                    <p className="text-sm text-slate-900 font-medium mt-0.5">{f.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Preferred Locations */}
            {viewingApplicant.willingToRelocate && viewingApplicant.preferredLocations.length > 0 && (
              <div>
                <p className="text-xs text-slate-400 font-medium mb-1">Preferred Relocation Locations</p>
                <div className="flex flex-wrap gap-1.5">{viewingApplicant.preferredLocations.map(l => <Badge key={l} variant="info">{l}</Badge>)}</div>
              </div>
            )}

            {/* Skills */}
            <div>
              <p className="text-xs text-slate-400 font-medium mb-1.5">Key Skills</p>
              <div className="flex flex-wrap gap-1.5">{viewingApplicant.skills.map(s => <Badge key={s} variant="default">{s}</Badge>)}</div>
            </div>

            {/* Resume & Photo */}
            <div className="grid grid-cols-2 gap-3">
              {viewingApplicant.resumeFile && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                  <FileText size={20} className="text-green-600" />
                  <div>
                    <p className="text-xs text-green-600 font-medium">Resume Uploaded</p>
                    <p className="text-sm text-slate-900 font-medium">{viewingApplicant.resumeFile}</p>
                  </div>
                </div>
              )}
              {viewingApplicant.profilePhotoFile && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center gap-2">
                  <Users size={20} className="text-blue-600" />
                  <div>
                    <p className="text-xs text-blue-600 font-medium">Profile Photo</p>
                    <p className="text-sm text-slate-900 font-medium">{viewingApplicant.profilePhotoFile}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export { EmployerLogin, EmployerDashboard };
