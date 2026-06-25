import { Users, Building2, Briefcase, Award, MessageSquare, TrendingUp, IndianRupee, ArrowUpRight, ArrowDownRight, Clock, MapPin, Calendar, Zap, BarChart3, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Card, Badge, Button } from '../../components/ui';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';

const COLORS = ['#2563EB', '#0D9488', '#16A34A', '#D97706', '#DC2626', '#7C3AED', '#EC4899', '#F59E0B'];
const statusColors: Record<string, string> = {
  'New': 'bg-blue-500', 'Contacted': 'bg-amber-500', 'Interviewed': 'bg-purple-500', 'Placed': 'bg-green-500', 'Inactive': 'bg-slate-400',
};

export default function Dashboard() {
  const { jobSeekers, employers, jobPostings, matches, communications, placements } = useData();

  const totalCandidates = jobSeekers.length;
  const totalJobs = jobPostings.length;
  const activeJobs = jobPostings.filter(j => j.status === 'Open').length;
  const totalMatches = matches.length;
  const totalPlacements = placements.length;
  const totalRevenue = placements.reduce((sum, p) => sum + p.commission, 0);
  const unpaidCommission = placements.filter(p => p.commissionStatus === 'Unpaid' || p.commissionStatus === 'Partial').reduce((sum, p) => sum + p.commission, 0);
  const paidCommission = placements.filter(p => p.commissionStatus === 'Paid').reduce((sum, p) => sum + p.commission, 0);
  const newThisWeek = jobSeekers.filter(j => j.status === 'New').length;

  // Chart data
  const candidatesByStatus = [
    { name: 'New', value: jobSeekers.filter(j => j.status === 'New').length, color: '#2563EB' },
    { name: 'Contacted', value: jobSeekers.filter(j => j.status === 'Contacted').length, color: '#D97706' },
    { name: 'Interviewed', value: jobSeekers.filter(j => j.status === 'Interviewed').length, color: '#7C3AED' },
    { name: 'Placed', value: jobSeekers.filter(j => j.status === 'Placed').length, color: '#16A34A' },
  ].filter(d => d.value > 0);

  const jobsByIndustry = Object.entries(
    jobPostings.reduce((acc: Record<string, number>, j) => {
      const employer = employers.find(e => e.id === j.employerId);
      const industry = employer?.industry || 'Other';
      acc[industry] = (acc[industry] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, count]) => ({ name, count }));

  const monthlyData = [
    { month: 'Sep', candidates: 45, placements: 8, revenue: 24000 },
    { month: 'Oct', candidates: 62, placements: 12, revenue: 36000 },
    { month: 'Nov', candidates: 78, placements: 15, revenue: 45000 },
    { month: 'Dec', candidates: 95, placements: 18, revenue: 54000 },
    { month: 'Jan', candidates: 120, placements: 22, revenue: 66000 },
    { month: 'Feb', candidates: 110, placements: 25, revenue: 75000 },
  ];

  const recentCandidates = [...jobSeekers].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 6);
  const recentJobs = [...jobPostings].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 4);
  const recentMatches = [...matches].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-2xl p-6 sm:p-8 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-white/5 rounded-full translate-y-1/2" />
        <div className="relative">
          <p className="text-blue-200 text-sm font-medium">{today}</p>
          <h2 className="text-2xl sm:text-3xl font-bold mt-1">Welcome back, Admin 👋</h2>
          <p className="text-blue-100 mt-2 max-w-lg">You have <span className="font-semibold text-white">{newThisWeek} new candidates</span> and <span className="font-semibold text-white">{matches.filter(m => m.status === 'Pending').length} pending matches</span> to review today.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/admin/matching">
              <Button size="sm" className="bg-white text-black hover:bg-blue-50 gap-1.5 shadow-lg">
                <Zap size={14} /> Review Matches
              </Button>
            </Link>
            <Link to="/admin/candidates">
              <Button size="sm" variant="ghost" className="text-white border border-white/30 hover:bg-white/10 gap-1.5">
                <Users size={14} /> View Candidates
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: <Users size={20} />, label: 'Total Candidates', value: totalCandidates, change: '+12%', up: true, bg: 'from-blue-500 to-blue-600', iconBg: 'bg-blue-400/30' },
          { icon: <Briefcase size={20} />, label: 'Active Jobs', value: activeJobs, change: `${totalJobs} total`, up: true, bg: 'from-teal-500 to-teal-600', iconBg: 'bg-teal-400/30' },
          { icon: <Award size={20} />, label: 'Placements', value: totalPlacements, change: '+3 this week', up: true, bg: 'from-green-500 to-green-600', iconBg: 'bg-green-400/30' },
          { icon: <IndianRupee size={20} />, label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, change: `₹${unpaidCommission.toLocaleString()} pending`, up: true, bg: 'from-purple-500 to-purple-600', iconBg: 'bg-purple-400/30' },
        ].map((kpi, i) => (
          <div key={i} className={`relative overflow-hidden bg-gradient-to-br ${kpi.bg} rounded-xl p-5 text-white shadow-lg`}>
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-6 translate-x-6" />
            <div className="relative">
              <div className={`inline-flex p-2.5 rounded-lg ${kpi.iconBg} mb-3`}>{kpi.icon}</div>
              <p className="text-white/80 text-xs font-medium">{kpi.label}</p>
              <p className="text-2xl sm:text-3xl font-bold mt-0.5">{kpi.value}</p>
              <p className="text-white/70 text-xs mt-1 flex items-center gap-1">
                {kpi.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {kpi.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: <Building2 size={18} />, label: 'Employers', value: employers.length, color: 'text-amber-600 bg-amber-50' },
          { icon: <Target size={18} />, label: 'Total Matches', value: totalMatches, color: 'text-blue-600 bg-blue-50' },
          { icon: <MessageSquare size={18} />, label: 'Communications', value: communications.length, color: 'text-teal-600 bg-teal-50' },
          { icon: <BarChart3 size={18} />, label: 'Conversion Rate', value: `${totalCandidates > 0 ? Math.round((totalPlacements / totalCandidates) * 100) : 0}%`, color: 'text-green-600 bg-green-50' },
        ].map((kpi, i) => (
          <Card key={i} className="flex items-center gap-3 !p-4">
            <div className={`p-2 rounded-lg ${kpi.color}`}>{kpi.icon}</div>
            <div>
              <p className="text-xs text-slate-500">{kpi.label}</p>
              <p className="text-lg font-bold text-slate-900">{kpi.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Monthly Trend - 2 cols */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Growth Trend</h3>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Candidates</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-500" /> Placements</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorCandidates" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPlacements" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16A34A" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94A3B8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94A3B8" />
              <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #E2E8F0', fontSize: '13px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
              <Area type="monotone" dataKey="candidates" stroke="#2563EB" strokeWidth={2.5} fill="url(#colorCandidates)" name="Candidates" />
              <Area type="monotone" dataKey="placements" stroke="#16A34A" strokeWidth={2.5} fill="url(#colorPlacements)" name="Placements" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Candidates by Status - 1 col */}
        <Card>
          <h3 className="font-semibold text-slate-900 mb-4">Candidate Pipeline</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={candidatesByStatus} cx="50%" cy="50%" outerRadius={70} innerRadius={45} dataKey="value" strokeWidth={0}>
                {candidatesByStatus.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #E2E8F0', fontSize: '13px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {candidatesByStatus.map(d => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-sm text-slate-600">{d.name}</span>
                </div>
                <span className="text-sm font-semibold text-slate-900">{d.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Candidates & Recent Matches */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Candidates */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Recent Candidates</h3>
            <Link to="/admin/candidates" className="text-xs text-blue-600 font-medium hover:text-blue-700">View All →</Link>
          </div>
          <div className="space-y-3">
            {recentCandidates.map(c => (
              <div key={c.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {c.firstName[0]}{c.lastName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{c.firstName} {c.lastName}</p>
                  <p className="text-xs text-slate-400 flex items-center gap-1"><MapPin size={10} />{c.location}, {c.state} • {c.qualification}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <Badge variant={c.status === 'New' ? 'info' : c.status === 'Placed' ? 'success' : c.status === 'Contacted' ? 'warning' : 'default'} className="text-[10px]">{c.status}</Badge>
                  <p className="text-[10px] text-slate-400 mt-0.5">{c.totalExperience} yrs exp</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Matches */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Recent Matches</h3>
            <Link to="/admin/matching" className="text-xs text-blue-600 font-medium hover:text-blue-700">View All →</Link>
          </div>
          <div className="space-y-3">
            {recentMatches.map(m => (
              <div key={m.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 text-white ${
                  m.matchScore >= 80 ? 'bg-green-500' : m.matchScore >= 60 ? 'bg-amber-500' : 'bg-red-500'
                }`}>
                  {m.matchScore}%
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{m.candidateName}</p>
                  <p className="text-xs text-slate-400 truncate">→ {m.jobTitle} at {m.companyName}</p>
                </div>
                <Badge variant={m.status === 'Offered' ? 'success' : m.status === 'Pending' ? 'warning' : 'info'} className="text-[10px]">
                  {m.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Jobs by Industry & Revenue */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Jobs by Industry */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Jobs by Industry</h3>
            <Link to="/admin/employers" className="text-xs text-blue-600 font-medium hover:text-blue-700">View Employers →</Link>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={jobsByIndustry} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#94A3B8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94A3B8" allowDecimals={false} />
              <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #E2E8F0', fontSize: '13px' }} />
              <Bar dataKey="count" fill="#0D9488" radius={[6, 6, 0, 0]} name="Open Jobs" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Commission Overview */}
        <Card>
          <h3 className="font-semibold text-slate-900 mb-4">Commission Overview</h3>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
              <p className="text-xs text-green-600 font-medium">Paid</p>
              <p className="text-2xl font-bold text-green-700 mt-1">₹{paidCommission.toLocaleString()}</p>
              <div className="mt-2 w-full bg-green-200 rounded-full h-1.5">
                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${totalRevenue > 0 ? (paidCommission / totalRevenue) * 100 : 0}%` }} />
              </div>
            </div>
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100">
              <p className="text-xs text-amber-600 font-medium">Unpaid / Partial</p>
              <p className="text-2xl font-bold text-amber-700 mt-1">₹{unpaidCommission.toLocaleString()}</p>
              <div className="mt-2 w-full bg-amber-200 rounded-full h-1.5">
                <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${totalRevenue > 0 ? (unpaidCommission / totalRevenue) * 100 : 0}%` }} />
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <p className="text-xs text-slate-500 font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">₹{totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-slate-400 mt-1">{placements.length} placements</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Job Postings */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900">Recent Job Postings</h3>
          <Link to="/admin/employers" className="text-xs text-blue-600 font-medium hover:text-blue-700">View All →</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentJobs.map(job => (
            <div key={job.id} className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all hover:-translate-y-0.5">
              <div className="flex items-start justify-between mb-2">
                <Badge variant={job.status === 'Open' ? 'success' : 'default'} className="text-[10px]">{job.status}</Badge>
                <span className="text-[10px] text-slate-400">{job.numberOfOpenings} openings</span>
              </div>
              <h4 className="font-semibold text-slate-900 text-sm">{job.jobTitle}</h4>
              <p className="text-xs text-slate-500 mt-0.5">{job.companyName}</p>
              <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
                <MapPin size={12} />{job.city}, {job.state}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-green-600">₹{parseInt(job.salaryMin).toLocaleString()} - ₹{parseInt(job.salaryMax).toLocaleString()}</span>
                <span className="text-[10px] text-slate-400">{job.employmentType}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {job.skillsRequired.slice(0, 3).map(s => (
                  <Badge key={s} variant="info" className="text-[9px]">{s}</Badge>
                ))}
                {job.skillsRequired.length > 3 && <Badge className="text-[9px]">+{job.skillsRequired.length - 3}</Badge>}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Activity Timeline */}
      <Card>
        <h3 className="font-semibold text-slate-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { icon: <Users size={14} />, text: 'New candidate registered: Kamla Sharma (MBA, HR)', time: '2 hours ago', color: 'bg-blue-500' },
            { icon: <Target size={14} />, text: 'Match created: Asha Bhosle → Staff Nurse at Metro Hospital (92%)', time: '4 hours ago', color: 'bg-green-500' },
            { icon: <MessageSquare size={14} />, text: 'Communication logged: Call with Dr. Revathi Subramaniam', time: '6 hours ago', color: 'bg-purple-500' },
            { icon: <Award size={14} />, text: 'Placement confirmed: Sanjay Gupta → Welder at Northern Steel Works', time: '1 day ago', color: 'bg-amber-500' },
            { icon: <Briefcase size={14} />, text: 'New job posted: ANM/GNM Nurse at CareWell Hospitals (10 openings)', time: '1 day ago', color: 'bg-teal-500' },
            { icon: <Building2 size={14} />, text: 'New employer registered: CareWell Hospitals, Chennai', time: '2 days ago', color: 'bg-red-500' },
            { icon: <IndianRupee size={14} />, text: 'Commission received: ₹4,000 from TechRural Solutions (Sunita Devi)', time: '3 days ago', color: 'bg-green-600' },
          ].map((activity, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-8 h-8 ${activity.color} text-white rounded-lg flex items-center justify-center shadow-sm`}>
                {activity.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700 leading-snug">{activity.text}</p>
                <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1"><Clock size={10} />{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
