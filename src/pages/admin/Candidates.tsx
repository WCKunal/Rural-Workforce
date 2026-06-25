import { useState } from 'react';
import { Search, Eye, Mail, Phone as PhoneIcon, MapPin, FileText, UserCheck, Briefcase, IndianRupee, Calendar, Award, Download } from 'lucide-react';
import { Card, Badge, Button, Modal, Select, Toast } from '../../components/ui';
import { useData, JobSeeker, JobPosting } from '../../context/DataContext';

const statusVariant: Record<string, 'default' | 'success' | 'warning' | 'info' | 'danger'> = {
  'New': 'info', 'Contacted': 'warning', 'Interviewed': 'default', 'Placed': 'success', 'Inactive': 'danger',
};

export default function Candidates() {
  const { jobSeekers, jobPostings, matches, hireCandidate } = useData();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<JobSeeker | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showHireModal, setShowHireModal] = useState(false);
  const [hireJobId, setHireJobId] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const filtered = jobSeekers.filter(c => {
    const matchSearch = !search ||
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase()) ||
      c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = !statusFilter || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const openDetail = (candidate: JobSeeker) => {
    setSelectedCandidate(candidate);
    setShowDetailModal(true);
  };

  const openHire = (candidate: JobSeeker) => {
    setSelectedCandidate(candidate);
    setHireJobId('');
    setShowHireModal(true);
  };

  const handleHire = () => {
    if (!selectedCandidate || !hireJobId) return;
    hireCandidate(selectedCandidate.id, hireJobId);
    const job = jobPostings.find(j => j.id === hireJobId);
    setToast({ message: `${selectedCandidate.firstName} ${selectedCandidate.lastName} has been hired for ${job?.jobTitle} at ${job?.companyName}!`, type: 'success' });
    setShowHireModal(false);
    setSelectedCandidate(null);
  };

  const getCandidateMatches = (candidateId: string) => matches.filter(m => m.candidateId === candidateId);

  const openJobs = jobPostings.filter(j => j.status === 'Open');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Candidates</h2>
          <p className="text-sm text-slate-500 mt-1">{jobSeekers.length} total candidates • View submissions, hire for jobs</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="!p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email, location, or skills..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-sm text-slate-900" />
          </div>
          <Select options={[{ value: '', label: 'All Statuses' }, { value: 'New', label: 'New' }, { value: 'Contacted', label: 'Contacted' }, { value: 'Interviewed', label: 'Interviewed' }, { value: 'Placed', label: 'Placed' }, { value: 'Inactive', label: 'Inactive' }]} value={statusFilter} onChange={e => setStatusFilter(e.target.value)} />
        </div>
      </Card>

      {/* Table */}
      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Candidate</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Skills</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Salary Exp.</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Resume</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(candidate => (
                <tr key={candidate.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">{candidate.firstName[0]}{candidate.lastName[0]}</div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900">{candidate.firstName} {candidate.lastName}</p>
                        <p className="text-xs text-slate-400">{candidate.qualification} • {candidate.totalExperience}yrs • <MapPin size={10} className="inline" />{candidate.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <div className="flex flex-wrap gap-1">{candidate.skills.slice(0, 2).map(s => <Badge key={s} variant="info" className="text-[10px]">{s}</Badge>)}{candidate.skills.length > 2 && <Badge className="text-[10px]">+{candidate.skills.length - 2}</Badge>}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 hidden md:table-cell">₹{parseInt(candidate.expectedSalary).toLocaleString()}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {candidate.resumeFile ? <Badge variant="success" className="text-[10px]">📄 {candidate.resumeFile}</Badge> : <Badge variant="default" className="text-[10px]">Not uploaded</Badge>}
                  </td>
                  <td className="px-4 py-3"><Badge variant={statusVariant[candidate.status]}>{candidate.status}</Badge></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" onClick={() => openDetail(candidate)} title="View Submission"><Eye size={16} /></Button>
                      {candidate.status !== 'Placed' && (
                        <Button variant="ghost" size="sm" onClick={() => openHire(candidate)} title="Hire" className="text-green-600 hover:text-green-700"><UserCheck size={16} /></Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-12 text-slate-400"><p className="text-sm">No candidates found</p></div>}
        </div>
      </Card>

      {/* ═══ FULL SUBMISSION DETAIL MODAL ═══ */}
      <Modal isOpen={showDetailModal} onClose={() => setShowDetailModal(false)} title="Full Candidate Submission" size="lg">
        {selectedCandidate && (
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-2xl font-bold">{selectedCandidate.firstName[0]}{selectedCandidate.lastName[0]}</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{selectedCandidate.firstName} {selectedCandidate.lastName}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={statusVariant[selectedCandidate.status]}>{selectedCandidate.status}</Badge>
                  <span className="text-xs text-slate-400">ID: {selectedCandidate.id} • Registered: {selectedCandidate.createdAt}</span>
                </div>
              </div>
            </div>

            {/* Personal Information Section */}
            <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2"><span className="w-5 h-5 bg-blue-600 text-white rounded text-[10px] flex items-center justify-center font-bold">1</span> Personal Information</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'First Name', value: selectedCandidate.firstName, icon: <UserCheck size={12} /> },
                  { label: 'Last Name', value: selectedCandidate.lastName, icon: <UserCheck size={12} /> },
                  { label: 'Phone Number', value: selectedCandidate.phone, icon: <PhoneIcon size={12} /> },
                  { label: 'Email Address', value: selectedCandidate.email, icon: <Mail size={12} /> },
                  { label: 'Date of Birth', value: selectedCandidate.dob, icon: <Calendar size={12} /> },
                  { label: 'Age', value: `${Math.floor((Date.now() - new Date(selectedCandidate.dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000))} years`, icon: <Calendar size={12} /> },
                  { label: 'Gender', value: selectedCandidate.gender, icon: <UserCheck size={12} /> },
                ].map(f => (
                  <div key={f.label} className="bg-white rounded-lg p-2.5 border border-slate-100">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium flex items-center gap-1">{f.icon}{f.label}</p>
                    <p className="text-sm text-slate-900 font-medium mt-0.5">{f.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Details Section */}
            <div className="bg-teal-50/50 rounded-xl p-4 border border-teal-100">
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2"><span className="w-5 h-5 bg-teal-600 text-white rounded text-[10px] flex items-center justify-center font-bold">2</span> Professional Details</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Current Location', value: `${selectedCandidate.location}, ${selectedCandidate.state}`, icon: <MapPin size={12} /> },
                  { label: 'Highest Qualification', value: selectedCandidate.qualification, icon: <Award size={12} /> },
                  { label: 'Previous Company', value: selectedCandidate.previousCompany || 'N/A (Fresher)', icon: <Briefcase size={12} /> },
                  { label: 'Total Experience', value: `${selectedCandidate.totalExperience} years`, icon: <Briefcase size={12} /> },
                ].map(f => (
                  <div key={f.label} className="bg-white rounded-lg p-2.5 border border-slate-100">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium flex items-center gap-1">{f.icon}{f.label}</p>
                    <p className="text-sm text-slate-900 font-medium mt-0.5">{f.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium mb-1.5">Key Skills</p>
                <div className="flex flex-wrap gap-1.5">{selectedCandidate.skills.map(s => <Badge key={s} variant="default">{s}</Badge>)}</div>
              </div>
            </div>

            {/* Preferences Section */}
            <div className="bg-purple-50/50 rounded-xl p-4 border border-purple-100">
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2"><span className="w-5 h-5 bg-purple-600 text-white rounded text-[10px] flex items-center justify-center font-bold">3</span> Job Preferences</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Expected Salary', value: `₹${parseInt(selectedCandidate.expectedSalary).toLocaleString()}/month`, icon: <IndianRupee size={12} /> },
                  { label: 'Preferred Job Type', value: selectedCandidate.preferredJobType, icon: <Briefcase size={12} /> },
                  { label: 'Willing to Relocate', value: selectedCandidate.willingToRelocate ? 'Yes' : 'No', icon: <MapPin size={12} /> },
                ].map(f => (
                  <div key={f.label} className="bg-white rounded-lg p-2.5 border border-slate-100">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium flex items-center gap-1">{f.icon}{f.label}</p>
                    <p className="text-sm text-slate-900 font-medium mt-0.5">{f.value}</p>
                  </div>
                ))}
              </div>
              {selectedCandidate.willingToRelocate && selectedCandidate.preferredLocations.length > 0 && (
                <div className="mt-3">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium mb-1.5">Preferred Locations</p>
                  <div className="flex flex-wrap gap-1.5">{selectedCandidate.preferredLocations.map(l => <Badge key={l} variant="info">{l}</Badge>)}</div>
                </div>
              )}
            </div>

            {/* Uploaded Documents */}
            <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-100">
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2"><span className="w-5 h-5 bg-amber-600 text-white rounded text-[10px] flex items-center justify-center font-bold">4</span> Uploaded Documents</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className={`rounded-lg p-3 border ${selectedCandidate.resumeFile ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'}`}>
                  <p className="text-[10px] uppercase tracking-wider font-medium flex items-center gap-1 mb-1">
                    <FileText size={12} /> Resume
                  </p>
                  {selectedCandidate.resumeFile ? (
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-slate-900 font-medium">{selectedCandidate.resumeFile}</p>
                      <Badge variant="success" className="text-[9px]">Uploaded</Badge>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-400">Not uploaded</p>
                  )}
                </div>
                <div className={`rounded-lg p-3 border ${selectedCandidate.profilePhotoFile ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'}`}>
                  <p className="text-[10px] uppercase tracking-wider font-medium flex items-center gap-1 mb-1">
                    <UserCheck size={12} /> Profile Photo
                  </p>
                  {selectedCandidate.profilePhotoFile ? (
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-slate-900 font-medium">{selectedCandidate.profilePhotoFile}</p>
                      <Badge variant="success" className="text-[9px]">Uploaded</Badge>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-400">Not uploaded</p>
                  )}
                </div>
              </div>
            </div>

            {/* Current Matches */}
            {getCandidateMatches(selectedCandidate.id).length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3">Current Matches ({getCandidateMatches(selectedCandidate.id).length})</h4>
                <div className="space-y-2">
                  {getCandidateMatches(selectedCandidate.id).map(m => (
                    <div key={m.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm ${m.matchScore >= 80 ? 'bg-green-500' : m.matchScore >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}>{m.matchScore}%</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">{m.jobTitle}</p>
                        <p className="text-xs text-slate-500">{m.companyName}</p>
                      </div>
                      <Badge variant={m.status === 'Hired' ? 'success' : m.status === 'Offered' ? 'success' : m.status === 'Interview Scheduled' ? 'info' : 'warning'}>{m.status}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4 border-t border-slate-200">
              {selectedCandidate.status !== 'Placed' && (
                <Button variant="success" className="gap-1.5" onClick={() => { setShowDetailModal(false); openHire(selectedCandidate); }}>
                  <UserCheck size={16} /> Hire for Job
                </Button>
              )}
              <Button variant="outline" className="gap-1.5"><Mail size={14} /> Send Email</Button>
              <Button variant="ghost" className="gap-1.5"><PhoneIcon size={14} /> Log Call</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* ═══ HIRE MODAL ═══ */}
      <Modal isOpen={showHireModal} onClose={() => setShowHireModal(false)} title="Hire Candidate for Job" size="md">
        {selectedCandidate && (
          <div className="space-y-5">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <p className="text-xs text-blue-600 font-medium">Candidate</p>
              <p className="text-lg font-bold text-slate-900">{selectedCandidate.firstName} {selectedCandidate.lastName}</p>
              <p className="text-sm text-slate-500">{selectedCandidate.qualification} • {selectedCandidate.totalExperience} yrs • ₹{parseInt(selectedCandidate.expectedSalary).toLocaleString()}/month</p>
              <div className="flex flex-wrap gap-1 mt-2">{selectedCandidate.skills.map(s => <Badge key={s} variant="info" className="text-[10px]">{s}</Badge>)}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Select Job to Hire For <span className="text-red-500">*</span></label>
              <Select
                options={[
                  { value: '', label: 'Choose a job opening...' },
                  ...openJobs.map(j => ({ value: j.id, label: `${j.jobTitle} at ${j.companyName} (₹${parseInt(j.salaryMin).toLocaleString()}-${parseInt(j.salaryMax).toLocaleString()})` }))
                ]}
                value={hireJobId}
                onChange={e => setHireJobId(e.target.value)}
              />
            </div>

            {hireJobId && (() => {
              const job = jobPostings.find(j => j.id === hireJobId);
              if (!job) return null;
              const salaryFit = parseInt(selectedCandidate.expectedSalary) >= parseInt(job.salaryMin) && parseInt(selectedCandidate.expectedSalary) <= parseInt(job.salaryMax);
              return (
                <div className={`rounded-xl p-4 border ${salaryFit ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
                  <h4 className="text-sm font-bold text-slate-900 mb-2">Salary Match</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500">Candidate expects</p>
                      <p className="text-sm font-bold text-slate-900">₹{parseInt(selectedCandidate.expectedSalary).toLocaleString()}/mo</p>
                    </div>
                    <div className="text-2xl text-slate-300">↔</div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">Job offers</p>
                      <p className="text-sm font-bold text-slate-900">₹{parseInt(job.salaryMin).toLocaleString()} - ₹{parseInt(job.salaryMax).toLocaleString()}/mo</p>
                    </div>
                  </div>
                  <p className={`text-xs mt-2 font-medium ${salaryFit ? 'text-green-700' : 'text-amber-700'}`}>
                    {salaryFit ? '✓ Salary expectation is within the job range' : '⚠ Salary expectation is outside the job range'}
                  </p>
                </div>
              );
            })()}

            {hireJobId && (
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <h4 className="text-sm font-bold text-slate-900 mb-2">Hire Summary</h4>
                <p className="text-sm text-slate-600">You are about to hire <span className="font-semibold">{selectedCandidate.firstName} {selectedCandidate.lastName}</span> for the position of <span className="font-semibold">{jobPostings.find(j => j.id === hireJobId)?.jobTitle}</span> at <span className="font-semibold">{jobPostings.find(j => j.id === hireJobId)?.companyName}</span>.</p>
                <p className="text-xs text-slate-400 mt-1">This will: update candidate status to "Placed", mark the match as "Hired", and create a placement record with ₹4,000 commission.</p>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Button variant="success" onClick={handleHire} disabled={!hireJobId} className="gap-1.5">
                <UserCheck size={16} /> Confirm Hiring
              </Button>
              <Button variant="ghost" onClick={() => setShowHireModal(false)}>Cancel</Button>
            </div>
          </div>
        )}
      </Modal>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
