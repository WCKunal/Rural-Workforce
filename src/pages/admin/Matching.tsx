import { useState } from 'react';
import { GitMerge, Zap, CheckCircle } from 'lucide-react';
import { Card, Badge, Button, Modal, Select } from '../../components/ui';
import { useData, JobSeeker, JobPosting, CandidateMatch } from '../../context/DataContext';

function computeMatchScore(candidate: JobSeeker, job: JobPosting): number {
  let score = 0;
  // Skills overlap (40% weight)
  const skillOverlap = candidate.skills.filter(s => job.skillsRequired.some(js => js.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(js.toLowerCase())));
  score += (skillOverlap.length / Math.max(job.skillsRequired.length, 1)) * 40;
  // Salary match (20% weight)
  const expectedSalary = parseInt(candidate.expectedSalary) || 0;
  const salaryMin = parseInt(job.salaryMin) || 0;
  const salaryMax = parseInt(job.salaryMax) || 0;
  if (expectedSalary >= salaryMin && expectedSalary <= salaryMax) score += 20;
  else if (expectedSalary < salaryMin) score += 10;
  // Location (20% weight)
  if (candidate.state === job.state || candidate.location === job.city) score += 20;
  else if (candidate.willingToRelocate && candidate.preferredLocations.some(l => l === job.state || l === job.city)) score += 15;
  // Experience (10% weight)
  const expYears = parseInt(candidate.totalExperience) || 0;
  const reqExp = parseInt(job.experienceRequired) || 0;
  if (expYears >= reqExp - 1 && expYears <= reqExp + 3) score += 10;
  else if (expYears >= reqExp) score += 5;
  // Job type (10% weight)
  if (candidate.preferredJobType === job.employmentType) score += 10;
  return Math.min(Math.round(score), 100);
}

function getScoreColor(score: number) {
  if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
  if (score >= 60) return 'text-amber-600 bg-amber-50 border-amber-200';
  return 'text-red-600 bg-red-50 border-red-200';
}

const matchStatusVariant: Record<string, 'default' | 'success' | 'warning' | 'info' | 'danger'> = {
  'Pending': 'warning', 'Shortlisted': 'info', 'Interview Scheduled': 'default', 'Offered': 'success', 'Rejected': 'danger',
};

export default function Matching() {
  const { jobSeekers, jobPostings, matches, addMatch, updateMatchStatus } = useData();
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [matchResult, setMatchResult] = useState<{ score: number; candidate: JobSeeker; job: JobPosting } | null>(null);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [editingMatch, setEditingMatch] = useState<CandidateMatch | null>(null);

  const handleMatch = () => {
    const candidate = jobSeekers.find(c => c.id === selectedCandidate);
    const job = jobPostings.find(j => j.id === selectedJob);
    if (candidate && job) {
      const score = computeMatchScore(candidate, job);
      setMatchResult({ score, candidate, job });
    }
  };

  const confirmMatch = () => {
    if (matchResult) {
      const newMatch: CandidateMatch = {
        id: `CM${String(Date.now()).slice(-6)}`,
        candidateId: matchResult.candidate.id,
        jobId: matchResult.job.id,
        candidateName: matchResult.candidate.firstName + ' ' + matchResult.candidate.lastName,
        jobTitle: matchResult.job.jobTitle,
        companyName: matchResult.job.companyName,
        matchScore: matchResult.score,
        status: 'Pending',
        createdAt: new Date().toISOString().split('T')[0],
      };
      addMatch(newMatch);
      setMatchResult(null);
      setSelectedCandidate('');
      setSelectedJob('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Matching Engine</h2>
        <p className="text-sm text-slate-500 mt-1">Match candidates with job openings and track compatibility scores</p>
      </div>

      {/* Matching Tool */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><Zap size={20} /></div>
          <h3 className="font-semibold text-slate-900">Create New Match</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <Select
            label="Select Candidate"
            options={[{ value: '', label: 'Choose a candidate...' }, ...jobSeekers.map(c => ({ value: c.id, label: `${c.firstName} ${c.lastName} — ${c.skills.slice(0, 2).join(', ')}` }))]}
            value={selectedCandidate}
            onChange={e => setSelectedCandidate(e.target.value)}
          />
          <Select
            label="Select Job Opening"
            options={[{ value: '', label: 'Choose a job...' }, ...jobPostings.filter(j => j.status === 'Open').map(j => ({ value: j.id, label: `${j.jobTitle} at ${j.companyName}` }))]}
            value={selectedJob}
            onChange={e => setSelectedJob(e.target.value)}
          />
        </div>
        <Button onClick={handleMatch} disabled={!selectedCandidate || !selectedJob} className="gap-2">
          <GitMerge size={16} /> Calculate Match
        </Button>

        {/* Match Result */}
        {matchResult && (
          <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-slate-500">Match Result</p>
                <p className="font-semibold text-slate-900">{matchResult.candidate.firstName} {matchResult.candidate.lastName} ↔ {matchResult.job.jobTitle} at {matchResult.job.companyName}</p>
              </div>
              <div className={`text-2xl font-bold px-4 py-2 rounded-xl border ${getScoreColor(matchResult.score)}`}>
                {matchResult.score}%
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-slate-400">Skills Overlap:</span> <span className="text-slate-700 font-medium">{matchResult.candidate.skills.filter(s => matchResult.job.skillsRequired.some(js => js.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(js.toLowerCase()))).join(', ') || 'None'}</span></div>
              <div><span className="text-slate-400">Location Match:</span> <span className="text-slate-700 font-medium">{matchResult.candidate.state === matchResult.job.state ? 'Same state' : matchResult.candidate.willingToRelocate ? 'Willing to relocate' : 'Different state'}</span></div>
              <div><span className="text-slate-400">Salary Fit:</span> <span className="text-slate-700 font-medium">Expected ₹{parseInt(matchResult.candidate.expectedSalary).toLocaleString()} vs ₹{parseInt(matchResult.job.salaryMin).toLocaleString()}-{parseInt(matchResult.job.salaryMax).toLocaleString()}</span></div>
              <div><span className="text-slate-400">Experience:</span> <span className="text-slate-700 font-medium">{matchResult.candidate.totalExperience} yrs (Required: {matchResult.job.experienceRequired})</span></div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="success" onClick={confirmMatch} className="gap-1"><CheckCircle size={14} /> Confirm Match</Button>
              <Button size="sm" variant="ghost" onClick={() => setMatchResult(null)}>Cancel</Button>
            </div>
          </div>
        )}
      </Card>

      {/* Existing Matches */}
      <Card padding={false}>
        <div className="px-4 py-3 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900">All Matches ({matches.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Candidate</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Job</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Company</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Score</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {matches.map(match => (
                <tr key={match.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">{match.candidateName}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{match.jobTitle}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{match.companyName}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center justify-center w-12 text-sm font-bold rounded-lg border ${getScoreColor(match.matchScore)}`}>
                      {match.matchScore}%
                    </span>
                  </td>
                  <td className="px-4 py-3"><Badge variant={matchStatusVariant[match.status]}>{match.status}</Badge></td>
                  <td className="px-4 py-3">
                    <Select
                      options={[
                        { value: match.status, label: match.status },
                        { value: 'Pending', label: 'Pending' },
                        { value: 'Shortlisted', label: 'Shortlisted' },
                        { value: 'Interview Scheduled', label: 'Interview Scheduled' },
                        { value: 'Offered', label: 'Offered' },
                        { value: 'Rejected', label: 'Rejected' },
                      ]}
                      value={match.status}
                      onChange={e => updateMatchStatus(match.id, e.target.value as CandidateMatch['status'])}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
