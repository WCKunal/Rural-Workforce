import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, Building2, FileText, Briefcase } from 'lucide-react';
import { Button, Input, Select, Textarea, ProgressBar, StepIndicator, Toggle, SkillTags, FileUpload, Toast } from '../components/ui';
import { useData, Employer, JobPosting } from '../context/DataContext';

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Chandigarh',
];

const skillSuggestions = [
  'Accounting', 'Agriculture', 'Assembly', 'AutoCAD', 'CNC Operation', 'Construction', 'Cooking',
  'Customer Service', 'Data Entry', 'Driving', 'Electrical Wiring', 'Fabrication', 'First Aid',
  'Java', 'JavaScript', 'Machine Operation', 'Maintenance', 'Microsoft Office', 'Motor Repair',
  'Nursing', 'Patient Care', 'Python', 'Quality Control', 'Quality Check', 'SQL', 'Safety',
  'Sales', 'Team Management', 'Welding', 'Warehouse', 'Typing', 'Teaching',
];

function EmployerRegistration() {
  const { addEmployer, addJobPosting } = useData();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [companyForm, setCompanyForm] = useState({
    companyName: '', industry: '', companySize: '', yearEstablished: '',
    website: '', address: '', city: '', state: '',
    contactName: '', contactEmail: '', contactPhone: '', gstNumber: '',
  });

  const [jobForm, setJobForm] = useState({
    jobTitle: '', numberOfOpenings: '', city: '', state: '',
    salaryMin: '', salaryMax: '', employmentType: '',
    qualificationRequired: '', experienceRequired: '',
    skillsRequired: [] as string[], jobDescription: '',
    benefits: '', joiningTimeline: '',
    accommodationProvided: false, transportationProvided: false,
    additionalNotes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateCompany = (field: string, value: string) => {
    setCompanyForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  };

  const updateJob = (field: string, value: any) => {
    setJobForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  };

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!companyForm.companyName.trim()) e.companyName = 'Company name is required';
    if (!companyForm.industry) e.industry = 'Industry is required';
    if (!companyForm.companySize) e.companySize = 'Company size is required';
    if (!companyForm.yearEstablished) e.yearEstablished = 'Year established is required';
    if (!companyForm.contactName.trim()) e.contactName = 'Contact person name is required';
    if (!companyForm.contactEmail.trim()) e.contactEmail = 'Contact email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(companyForm.contactEmail)) e.contactEmail = 'Enter a valid email';
    if (!companyForm.contactPhone.trim()) e.contactPhone = 'Contact phone is required';
    else if (!/^[+]?[\d\s-]{10,}$/.test(companyForm.contactPhone)) e.contactPhone = 'Enter a valid phone number';
    if (companyForm.website && !/^https?:\/\/.+\..+/.test(companyForm.website) && !/^[a-zA-Z0-9].*\..+/.test(companyForm.website)) {
      e.website = 'Enter a valid website URL';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!jobForm.jobTitle.trim()) e.jobTitle = 'Job title is required';
    if (!jobForm.numberOfOpenings || parseInt(jobForm.numberOfOpenings) < 1) e.numberOfOpenings = 'Enter number of openings';
    if (!jobForm.city.trim()) e.city = 'Job location city is required';
    if (!jobForm.state) e.state = 'Job location state is required';
    if (!jobForm.salaryMin || !jobForm.salaryMax) e.salaryMin = 'Salary range is required';
    else if (parseInt(jobForm.salaryMin) > parseInt(jobForm.salaryMax)) e.salaryMin = 'Min salary cannot exceed max';
    if (!jobForm.employmentType) e.employmentType = 'Employment type is required';
    if (!jobForm.qualificationRequired.trim()) e.qualificationRequired = 'Qualification required is needed';
    if (!jobForm.experienceRequired.trim()) e.experienceRequired = 'Experience required is needed';
    if (jobForm.skillsRequired.length === 0) e.skillsRequired = 'At least one skill is required';
    if (!jobForm.jobDescription.trim()) e.jobDescription = 'Job description is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
  };

  const handleSubmit = () => {
    if (!validateStep2()) return;

    const employerId = `EM${String(Date.now()).slice(-6)}`;
    const newEmployer: Employer = {
      id: employerId,
      companyName: companyForm.companyName,
      industry: companyForm.industry,
      companySize: companyForm.companySize,
      yearEstablished: companyForm.yearEstablished,
      website: companyForm.website,
      address: companyForm.address,
      city: companyForm.city,
      state: companyForm.state,
      contactName: companyForm.contactName,
      contactEmail: companyForm.contactEmail,
      contactPhone: companyForm.contactPhone,
      gstNumber: companyForm.gstNumber,
      createdAt: new Date().toISOString().split('T')[0],
    };
    addEmployer(newEmployer);

    const newJob: JobPosting = {
      id: `JP${String(Date.now()).slice(-6)}`,
      employerId,
      companyName: companyForm.companyName,
      jobTitle: jobForm.jobTitle,
      numberOfOpenings: parseInt(jobForm.numberOfOpenings),
      city: jobForm.city,
      state: jobForm.state,
      salaryMin: jobForm.salaryMin,
      salaryMax: jobForm.salaryMax,
      employmentType: jobForm.employmentType,
      qualificationRequired: jobForm.qualificationRequired,
      experienceRequired: jobForm.experienceRequired,
      skillsRequired: jobForm.skillsRequired,
      jobDescription: jobForm.jobDescription,
      benefits: jobForm.benefits,
      joiningTimeline: jobForm.joiningTimeline || 'Not specified',
      accommodationProvided: jobForm.accommodationProvided,
      transportationProvided: jobForm.transportationProvided,
      additionalNotes: jobForm.additionalNotes,
      status: 'Open',
      createdAt: new Date().toISOString().split('T')[0],
      applicants: [],
    };
    addJobPosting(newJob);
    setSubmitted(true);
  };

  const stepLabels = ['Company Details', 'Job Details'];

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4" style={{ fontFamily: "'Inter', sans-serif" }}>
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Job Posting Submitted!</h1>
          <p className="text-slate-500 mt-3 leading-relaxed">
            Thank you, {companyForm.contactName}! Your job posting for "{jobForm.jobTitle}" at {companyForm.companyName} has been received and is under review.
          </p>
          <div className="mt-6 bg-white rounded-xl p-5 border border-slate-200 text-left">
            <h3 className="font-semibold text-slate-900 mb-3">What Happens Next?</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2"><CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" /> A confirmation email has been sent to {companyForm.contactEmail}</li>
              <li className="flex items-start gap-2"><CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" /> Our agent will review your posting within 24 hours</li>
              <li className="flex items-start gap-2"><CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" /> You'll receive matched candidate profiles within 3-5 business days</li>
              <li className="flex items-start gap-2"><CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" /> Our agent will contact you to discuss shortlisted candidates</li>
            </ul>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/"><Button variant="outline">Back to Home</Button></Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
              <ArrowLeft size={18} />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
            <h1 className="text-lg font-bold text-slate-900">Post a Job</h1>
            <div className="w-20" />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <ProgressBar current={step} total={2} />
          <div className="mt-4">
            <StepIndicator steps={stepLabels} currentStep={step} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
          {/* Step 1: Company Details */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-teal-50 rounded-lg text-teal-600"><Building2 size={22} /></div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Company Details</h2>
                  <p className="text-sm text-slate-500">Tell us about your organization</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Company Name" required value={companyForm.companyName} onChange={e => updateCompany('companyName', e.target.value)} error={errors.companyName} placeholder="e.g. Bharat Manufacturing Co." />
                <Select
                  label="Industry / Domain"
                  required
                  options={[
                    { value: '', label: 'Select Industry' },
                    { value: 'Manufacturing', label: 'Manufacturing' },
                    { value: 'Agriculture', label: 'Agriculture' },
                    { value: 'IT Services', label: 'IT Services' },
                    { value: 'Healthcare', label: 'Healthcare' },
                    { value: 'Logistics', label: 'Logistics' },
                    { value: 'Construction', label: 'Construction' },
                    { value: 'Education', label: 'Education' },
                    { value: 'Retail', label: 'Retail' },
                    { value: 'Hospitality', label: 'Hospitality' },
                    { value: 'Finance', label: 'Finance' },
                    { value: 'Other', label: 'Other' },
                  ]}
                  value={companyForm.industry}
                  onChange={e => updateCompany('industry', e.target.value)}
                  error={errors.industry}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Select
                  label="Company Size (Employees)"
                  required
                  options={[
                    { value: '', label: 'Select Size' },
                    { value: '1-10', label: '1-10' },
                    { value: '10-20', label: '10-20' },
                    { value: '20-50', label: '20-50' },
                    { value: '50-200', label: '50-200' },
                    { value: '200-500', label: '200-500' },
                    { value: '500-1000', label: '500-1000' },
                    { value: '1000+', label: '1000+' },
                  ]}
                  value={companyForm.companySize}
                  onChange={e => updateCompany('companySize', e.target.value)}
                  error={errors.companySize}
                />
                <Select
                  label="Year Established"
                  required
                  options={[
                    { value: '', label: 'Select Year' },
                    ...Array.from({ length: 30 }, (_, i) => {
                      const y = 2024 - i;
                      return { value: String(y), label: String(y) };
                    }),
                  ]}
                  value={companyForm.yearEstablished}
                  onChange={e => updateCompany('yearEstablished', e.target.value)}
                  error={errors.yearEstablished}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Company Website" value={companyForm.website} onChange={e => updateCompany('website', e.target.value)} error={errors.website} placeholder="e.g. company.com" hint="Optional" />
                <Input label="GST Number" value={companyForm.gstNumber} onChange={e => updateCompany('gstNumber', e.target.value)} placeholder="e.g. 27AABCB1234F1Z5" hint="Optional" />
              </div>
              <Input label="Company Address" value={companyForm.address} onChange={e => updateCompany('address', e.target.value)} placeholder="Street address" hint="Optional" />
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="City" value={companyForm.city} onChange={e => updateCompany('city', e.target.value)} placeholder="e.g. Pune" />
                <Select
                  label="State"
                  options={[{ value: '', label: 'Select State' }, ...indianStates.map(s => ({ value: s, label: s }))]}
                  value={companyForm.state}
                  onChange={e => updateCompany('state', e.target.value)}
                />
              </div>
              <hr className="border-slate-200" />
              <h3 className="font-semibold text-slate-900">Contact Person</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Contact Person Name" required value={companyForm.contactName} onChange={e => updateCompany('contactName', e.target.value)} error={errors.contactName} placeholder="e.g. Sanjay Mehta" />
                <Input label="Contact Email" required type="email" value={companyForm.contactEmail} onChange={e => updateCompany('contactEmail', e.target.value)} error={errors.contactEmail} placeholder="sanjay@company.com" />
              </div>
              <Input label="Contact Phone" required type="tel" value={companyForm.contactPhone} onChange={e => updateCompany('contactPhone', e.target.value)} error={errors.contactPhone} placeholder="+91-9812345001" />
            </div>
          )}

          {/* Step 2: Job Details */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Briefcase size={22} /></div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Job Details</h2>
                  <p className="text-sm text-slate-500">Describe the position you're hiring for</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Job Title" required value={jobForm.jobTitle} onChange={e => updateJob('jobTitle', e.target.value)} error={errors.jobTitle} placeholder="e.g. Machine Operator" />
                <Input label="Number of Openings" required type="number" min="1" value={jobForm.numberOfOpenings} onChange={e => updateJob('numberOfOpenings', e.target.value)} error={errors.numberOfOpenings} placeholder="e.g. 5" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Job Location (City)" required value={jobForm.city} onChange={e => updateJob('city', e.target.value)} error={errors.city} placeholder="e.g. Pune" />
                <Select
                  label="State"
                  required
                  options={[{ value: '', label: 'Select State' }, ...indianStates.map(s => ({ value: s, label: s }))]}
                  value={jobForm.state}
                  onChange={e => updateJob('state', e.target.value)}
                  error={errors.state}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Salary Range (₹/month) <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Min (e.g. 18000)" type="number" value={jobForm.salaryMin} onChange={e => updateJob('salaryMin', e.target.value)} />
                  <Input placeholder="Max (e.g. 25000)" type="number" value={jobForm.salaryMax} onChange={e => updateJob('salaryMax', e.target.value)} />
                </div>
                {errors.salaryMin && <p className="mt-1 text-xs text-red-600">{errors.salaryMin}</p>}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Select
                  label="Employment Type"
                  required
                  options={[
                    { value: '', label: 'Select Type' },
                    { value: 'Full-time', label: 'Full-time' },
                    { value: 'Part-time', label: 'Part-time' },
                    { value: 'Contract', label: 'Contract' },
                  ]}
                  value={jobForm.employmentType}
                  onChange={e => updateJob('employmentType', e.target.value)}
                  error={errors.employmentType}
                />
                <Select
                  label="Joining Timeline"
                  options={[
                    { value: '', label: 'Select Timeline' },
                    { value: 'Immediate', label: 'Immediate' },
                    { value: '1 week', label: 'Within 1 week' },
                    { value: '2 weeks', label: 'Within 2 weeks' },
                    { value: '1 month', label: 'Within 1 month' },
                    { value: 'Flexible', label: 'Flexible' },
                  ]}
                  value={jobForm.joiningTimeline}
                  onChange={e => updateJob('joiningTimeline', e.target.value)}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Qualification Required" required value={jobForm.qualificationRequired} onChange={e => updateJob('qualificationRequired', e.target.value)} error={errors.qualificationRequired} placeholder="e.g. ITI / Diploma" />
                <Input label="Experience Required" required value={jobForm.experienceRequired} onChange={e => updateJob('experienceRequired', e.target.value)} error={errors.experienceRequired} placeholder="e.g. 2-5 years" />
              </div>
              <SkillTags
                label="Skills Required"
                value={jobForm.skillsRequired}
                onChange={tags => updateJob('skillsRequired', tags)}
                suggestions={skillSuggestions}
                placeholder="Type a skill and press Enter"
              />
              {errors.skillsRequired && <p className="text-xs text-red-600">{errors.skillsRequired}</p>}
              <Textarea
                label="Job Description"
                required
                value={jobForm.jobDescription}
                onChange={e => updateJob('jobDescription', e.target.value)}
                error={errors.jobDescription}
                placeholder="Describe the role, responsibilities, and work environment..."
              />
              <Textarea
                label="Benefits / Perks"
                value={jobForm.benefits}
                onChange={e => updateJob('benefits', e.target.value)}
                placeholder="e.g. PF, ESI, Accommodation, Meals, Annual Bonus..."
                hint="Optional"
              />
              <div className="grid sm:grid-cols-2 gap-4">
                <Toggle label="Accommodation Provided?" checked={jobForm.accommodationProvided} onChange={v => updateJob('accommodationProvided', v)} />
                <Toggle label="Transportation Provided?" checked={jobForm.transportationProvided} onChange={v => updateJob('transportationProvided', v)} />
              </div>
              <Textarea
                label="Additional Notes"
                value={jobForm.additionalNotes}
                onChange={e => updateJob('additionalNotes', e.target.value)}
                placeholder="Any other information..."
                hint="Optional"
              />
            </div>
          )}

          <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200">
            {step > 1 ? (
              <Button variant="ghost" onClick={() => setStep(step - 1)} className="gap-1">
                <ArrowLeft size={16} /> Previous
              </Button>
            ) : <div />}
            {step < 2 ? (
              <Button onClick={handleNext} className="gap-1">
                Next <ArrowRight size={16} />
              </Button>
            ) : (
              <Button variant="success" onClick={handleSubmit} size="lg" className="gap-2">
                <FileText size={18} /> Submit Job Posting
              </Button>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1">🔒 Your data is secure</span>
          <span className="flex items-center gap-1">✓ No upfront fees</span>
          <span className="flex items-center gap-1">📧 Email confirmation</span>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default EmployerRegistration;
