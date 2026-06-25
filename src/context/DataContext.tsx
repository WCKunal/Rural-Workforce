import { createContext, useContext, useState, ReactNode } from 'react';

// Types
export interface JobSeeker {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dob: string;
  location: string;
  state: string;
  gender: string;
  qualification: string;
  skills: string[];
  previousCompany: string;
  totalExperience: string;
  willingToRelocate: boolean;
  preferredLocations: string[];
  expectedSalary: string;
  preferredJobType: string;
  resumeUrl?: string;
  profilePhoto?: string;
  status: 'New' | 'Contacted' | 'Interviewed' | 'Placed' | 'Inactive';
  createdAt: string;
  // Full submission data
  resumeFile?: string;
  profilePhotoFile?: string;
}

export interface Employer {
  id: string;
  companyName: string;
  industry: string;
  companySize: string;
  yearEstablished: string;
  website: string;
  address: string;
  city: string;
  state: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  gstNumber: string;
  createdAt: string;
}

export interface JobPosting {
  id: string;
  employerId: string;
  companyName: string;
  jobTitle: string;
  numberOfOpenings: number;
  city: string;
  state: string;
  salaryMin: string;
  salaryMax: string;
  employmentType: string;
  qualificationRequired: string;
  experienceRequired: string;
  skillsRequired: string[];
  jobDescription: string;
  benefits: string;
  joiningTimeline: string;
  accommodationProvided: boolean;
  transportationProvided: boolean;
  additionalNotes: string;
  status: 'Open' | 'Closed' | 'On Hold';
  createdAt: string;
  applicants: string[]; // candidate IDs
}

export interface CandidateMatch {
  id: string;
  candidateId: string;
  jobId: string;
  candidateName: string;
  jobTitle: string;
  companyName: string;
  matchScore: number;
  status: 'Pending' | 'Shortlisted' | 'Interview Scheduled' | 'Offered' | 'Hired' | 'Rejected';
  createdAt: string;
}

export interface Communication {
  id: string;
  date: string;
  type: 'Email' | 'Call' | 'SMS' | 'In-Person';
  contactType: 'Candidate' | 'Employer';
  contactName: string;
  subject: string;
  notes: string;
  outcome: string;
  agentName: string;
}

export interface Placement {
  id: string;
  candidateId: string;
  candidateName: string;
  jobId: string;
  jobTitle: string;
  employerId: string;
  companyName: string;
  placementDate: string;
  handoverDate: string;
  commission: number;
  commissionStatus: 'Paid' | 'Unpaid' | 'Partial';
  status: 'Active' | 'Completed' | 'Terminated';
}

// ─── MOCK DATA ────────────────────────────────────────────────

const mockJobSeekers: JobSeeker[] = [
  { id: 'JS001', firstName: 'Rajesh', lastName: 'Kumar', phone: '+91-9876543210', email: 'rajesh.kumar@email.com', dob: '1995-03-15', location: 'Jaipur', state: 'Rajasthan', gender: 'Male', qualification: 'B.Com', skills: ['Accounting', 'Tally', 'Excel'], previousCompany: 'Local Traders Pvt Ltd', totalExperience: '3', willingToRelocate: true, preferredLocations: ['Delhi', 'Mumbai', 'Ahmedabad'], expectedSalary: '18000', preferredJobType: 'Full-time', status: 'New', createdAt: '2024-01-15', resumeFile: 'Rajesh_Kumar_Resume.pdf', profilePhotoFile: 'rajesh_photo.jpg' },
  { id: 'JS002', firstName: 'Priya', lastName: 'Sharma', phone: '+91-9876543211', email: 'priya.sharma@email.com', dob: '1998-07-22', location: 'Lucknow', state: 'Uttar Pradesh', gender: 'Female', qualification: 'B.Sc Nursing', skills: ['Nursing', 'Patient Care', 'First Aid', 'ICU'], previousCompany: 'City Hospital', totalExperience: '2', willingToRelocate: true, preferredLocations: ['Delhi', 'Bangalore'], expectedSalary: '20000', preferredJobType: 'Full-time', status: 'Contacted', createdAt: '2024-01-18', resumeFile: 'Priya_Sharma_Resume.pdf' },
  { id: 'JS003', firstName: 'Amit', lastName: 'Patel', phone: '+91-9876543212', email: 'amit.patel@email.com', dob: '1992-11-08', location: 'Ahmedabad', state: 'Gujarat', gender: 'Male', qualification: 'ITI Electrician', skills: ['Electrical Wiring', 'Motor Repair', 'Maintenance'], previousCompany: 'Gujarat Electrics', totalExperience: '5', willingToRelocate: false, preferredLocations: [], expectedSalary: '22000', preferredJobType: 'Full-time', status: 'Interviewed', createdAt: '2024-01-20', resumeFile: 'Amit_Patel_Resume.pdf', profilePhotoFile: 'amit_photo.jpg' },
  { id: 'JS004', firstName: 'Sunita', lastName: 'Devi', phone: '+91-9876543213', email: 'sunita.devi@email.com', dob: '1997-05-30', location: 'Patna', state: 'Bihar', gender: 'Female', qualification: 'BA', skills: ['Teaching', 'Hindi', 'English'], previousCompany: 'Govt School', totalExperience: '4', willingToRelocate: true, preferredLocations: ['Delhi', 'Pune', 'Hyderabad'], expectedSalary: '16000', preferredJobType: 'Full-time', status: 'Placed', createdAt: '2024-01-22' },
  { id: 'JS005', firstName: 'Vikram', lastName: 'Singh', phone: '+91-9876543214', email: 'vikram.singh@email.com', dob: '1990-09-12', location: 'Chandigarh', state: 'Punjab', gender: 'Male', qualification: 'Diploma Mechanical', skills: ['Welding', 'Fabrication', 'CNC Operation'], previousCompany: 'Auto Parts Ltd', totalExperience: '7', willingToRelocate: true, preferredLocations: ['Chennai', 'Pune', 'Manesar'], expectedSalary: '25000', preferredJobType: 'Full-time', status: 'New', createdAt: '2024-01-25', resumeFile: 'Vikram_Singh_Resume.pdf' },
  { id: 'JS006', firstName: 'Meera', lastName: 'Reddy', phone: '+91-9876543215', email: 'meera.reddy@email.com', dob: '1999-01-18', location: 'Hyderabad', state: 'Telangana', gender: 'Female', qualification: 'B.Tech', skills: ['Python', 'Data Entry', 'MS Office'], previousCompany: '', totalExperience: '0', willingToRelocate: true, preferredLocations: ['Bangalore', 'Hyderabad', 'Chennai'], expectedSalary: '15000', preferredJobType: 'Full-time', status: 'New', createdAt: '2024-02-01', resumeFile: 'Meera_Reddy_Resume.pdf', profilePhotoFile: 'meera_photo.jpg' },
  { id: 'JS007', firstName: 'Ramesh', lastName: 'Yadav', phone: '+91-9876543216', email: 'ramesh.yadav@email.com', dob: '1993-06-25', location: 'Bhopal', state: 'Madhya Pradesh', gender: 'Male', qualification: '12th Pass', skills: ['Driving', 'Delivery', 'Warehouse'], previousCompany: 'LogiTrans', totalExperience: '6', willingToRelocate: true, preferredLocations: ['Delhi', 'Mumbai', 'Indore'], expectedSalary: '14000', preferredJobType: 'Full-time', status: 'Contacted', createdAt: '2024-02-03' },
  { id: 'JS008', firstName: 'Kavita', lastName: 'Verma', phone: '+91-9876543217', email: 'kavita.verma@email.com', dob: '1996-12-03', location: 'Indore', state: 'Madhya Pradesh', gender: 'Female', qualification: 'MBA', skills: ['HR', 'Recruitment', 'Payroll'], previousCompany: 'StartupHR', totalExperience: '3', willingToRelocate: true, preferredLocations: ['Pune', 'Mumbai', 'Bangalore'], expectedSalary: '28000', preferredJobType: 'Full-time', status: 'New', createdAt: '2024-02-05', resumeFile: 'Kavita_Verma_CV.pdf' },
  { id: 'JS009', firstName: 'Suresh', lastName: 'Naik', phone: '+91-9876543218', email: 'suresh.naik@email.com', dob: '1991-04-14', location: 'Goa', state: 'Goa', gender: 'Male', qualification: 'ITI Fitter', skills: ['Machine Operation', 'Quality Check', 'Assembly'], previousCompany: 'Goa Industries', totalExperience: '8', willingToRelocate: true, preferredLocations: ['Pune', 'Chennai', 'Bangalore'], expectedSalary: '20000', preferredJobType: 'Contract', status: 'Interviewed', createdAt: '2024-02-07', resumeFile: 'Suresh_Naik_Resume.pdf' },
  { id: 'JS010', firstName: 'Anita', lastName: 'Kumari', phone: '+91-9876543219', email: 'anita.kumari@email.com', dob: '2000-08-20', location: 'Ranchi', state: 'Jharkhand', gender: 'Female', qualification: 'B.A', skills: ['Tailoring', 'Handicraft', 'Embroidery'], previousCompany: '', totalExperience: '2', willingToRelocate: false, preferredLocations: [], expectedSalary: '10000', preferredJobType: 'Part-time', status: 'New', createdAt: '2024-02-10' },
  { id: 'JS011', firstName: 'Deepak', lastName: 'Mishra', phone: '+91-9876543220', email: 'deepak.mishra@email.com', dob: '1989-02-28', location: 'Varanasi', state: 'Uttar Pradesh', gender: 'Male', qualification: 'B.Ed', skills: ['Teaching', 'Mathematics', 'Science'], previousCompany: 'Saraswati Vidya Mandir', totalExperience: '5', willingToRelocate: true, preferredLocations: ['Delhi', 'Lucknow', 'Bhopal'], expectedSalary: '22000', preferredJobType: 'Full-time', status: 'New', createdAt: '2024-02-12', resumeFile: 'Deepak_Mishra_Resume.pdf' },
  { id: 'JS012', firstName: 'Lakshmi', lastName: 'Naidu', phone: '+91-9876543221', email: 'lakshmi.naidu@email.com', dob: '1994-10-09', location: 'Visakhapatnam', state: 'Andhra Pradesh', gender: 'Female', qualification: 'B.Pharm', skills: ['Pharmacy', 'Drug Dispensing', 'Patient Counseling'], previousCompany: 'Apollo Pharmacy', totalExperience: '4', willingToRelocate: true, preferredLocations: ['Hyderabad', 'Chennai', 'Bangalore'], expectedSalary: '24000', preferredJobType: 'Full-time', status: 'Contacted', createdAt: '2024-02-14', resumeFile: 'Lakshmi_Naidu_Resume.pdf' },
  { id: 'JS013', firstName: 'Mohan', lastName: 'Das', phone: '+91-9876543222', email: 'mohan.das@email.com', dob: '1993-07-05', location: 'Kochi', state: 'Kerala', gender: 'Male', qualification: 'Diploma Electrical', skills: ['Electrical Wiring', 'PLC Programming', 'Maintenance', 'Safety'], previousCompany: 'Kerala Power Ltd', totalExperience: '6', willingToRelocate: true, preferredLocations: ['Chennai', 'Bangalore', 'Mumbai'], expectedSalary: '23000', preferredJobType: 'Full-time', status: 'New', createdAt: '2024-02-16', resumeFile: 'Mohan_Das_Resume.pdf' },
  { id: 'JS014', firstName: 'Geeta', lastName: 'Rani', phone: '+91-9876543223', email: 'geeta.rani@email.com', dob: '1997-03-19', location: 'Gurgaon', state: 'Haryana', gender: 'Female', qualification: 'BBA', skills: ['Sales', 'Customer Service', 'CRM', 'Communication'], previousCompany: 'RetailMax', totalExperience: '3', willingToRelocate: false, preferredLocations: [], expectedSalary: '20000', preferredJobType: 'Full-time', status: 'Contacted', createdAt: '2024-02-18' },
  { id: 'JS015', firstName: 'Sanjay', lastName: 'Gupta', phone: '+91-9876543224', email: 'sanjay.gupta@email.com', dob: '1988-11-30', location: 'Kolkata', state: 'West Bengal', gender: 'Male', qualification: 'ITI Welder', skills: ['Welding', 'Fabrication', 'Blueprint Reading', 'Safety'], previousCompany: 'Bengal Heavy Engineering', totalExperience: '10', willingToRelocate: true, preferredLocations: ['Pune', 'Jamshedpur', 'Ranchi'], expectedSalary: '28000', preferredJobType: 'Contract', status: 'Interviewed', createdAt: '2024-02-20', resumeFile: 'Sanjay_Gupta_Resume.pdf' },
  { id: 'JS016', firstName: 'Pooja', lastName: 'Thakur', phone: '+91-9876543225', email: 'pooja.thakur@email.com', dob: '1999-09-08', location: 'Dehradun', state: 'Uttarakhand', gender: 'Female', qualification: 'B.Sc IT', skills: ['JavaScript', 'HTML', 'CSS', 'React'], previousCompany: '', totalExperience: '1', willingToRelocate: true, preferredLocations: ['Bangalore', 'Noida', 'Pune'], expectedSalary: '18000', preferredJobType: 'Full-time', status: 'New', createdAt: '2024-02-22', resumeFile: 'Pooja_Thakur_Resume.pdf', profilePhotoFile: 'pooja_photo.jpg' },
  { id: 'JS017', firstName: 'Ravi', lastName: 'Kumar', phone: '+91-9876543226', email: 'ravi.kumar@email.com', dob: '1991-05-14', location: 'Ranchi', state: 'Jharkhand', gender: 'Male', qualification: '12th Pass', skills: ['Driving', 'Warehouse', 'Loading', 'Inventory'], previousCompany: 'Jharkhand Logistics', totalExperience: '8', willingToRelocate: true, preferredLocations: ['Delhi', 'Kolkata', 'Mumbai'], expectedSalary: '16000', preferredJobType: 'Full-time', status: 'New', createdAt: '2024-02-24' },
  { id: 'JS018', firstName: 'Nandini', lastName: 'Patil', phone: '+91-9876543227', email: 'nandini.patil@email.com', dob: '1996-01-25', location: 'Kolhapur', state: 'Maharashtra', gender: 'Female', qualification: 'B.Sc Agriculture', skills: ['Agriculture', 'Crop Management', 'Soil Testing', 'Irrigation'], previousCompany: 'AgriTech Solutions', totalExperience: '4', willingToRelocate: true, preferredLocations: ['Pune', 'Nashik', 'Ahmedabad'], expectedSalary: '19000', preferredJobType: 'Full-time', status: 'Contacted', createdAt: '2024-02-26', resumeFile: 'Nandini_Patil_Resume.pdf' },
  { id: 'JS019', firstName: 'Arjun', lastName: 'Meena', phone: '+91-9876543228', email: 'arjun.meena@email.com', dob: '1994-08-11', location: 'Udaipur', state: 'Rajasthan', gender: 'Male', qualification: 'Diploma Civil', skills: ['Construction', 'Site Management', 'AutoCAD', 'Surveying'], previousCompany: 'Rajasthan Builders', totalExperience: '5', willingToRelocate: true, preferredLocations: ['Jaipur', 'Delhi', 'Ahmedabad'], expectedSalary: '24000', preferredJobType: 'Full-time', status: 'New', createdAt: '2024-02-28' },
  { id: 'JS020', firstName: 'Savita', lastName: 'Jadhav', phone: '+91-9876543229', email: 'savita.jadhav@email.com', dob: '1998-04-02', location: 'Nagpur', state: 'Maharashtra', gender: 'Female', qualification: 'B.Com', skills: ['Accounting', 'Tally', 'GST Filing', 'Excel', 'Banking'], previousCompany: 'Nagpur Finance Corp', totalExperience: '2', willingToRelocate: false, preferredLocations: [], expectedSalary: '17000', preferredJobType: 'Full-time', status: 'New', createdAt: '2024-03-01' },
  { id: 'JS021', firstName: 'Manoj', lastName: 'Tiwari', phone: '+91-9876543230', email: 'manoj.tiwari@email.com', dob: '1990-12-17', location: 'Allahabad', state: 'Uttar Pradesh', gender: 'Male', qualification: 'ITI Fitter', skills: ['Machine Operation', 'Assembly', 'Quality Check', 'Maintenance', 'Safety'], previousCompany: 'UP Manufacturing Co', totalExperience: '9', willingToRelocate: true, preferredLocations: ['Pune', 'Manesar', 'Chennai'], expectedSalary: '26000', preferredJobType: 'Full-time', status: 'Placed', createdAt: '2024-03-03', resumeFile: 'Manoj_Tiwari_Resume.pdf' },
  { id: 'JS022', firstName: 'Rekha', lastName: 'Chauhan', phone: '+91-9876543231', email: 'rekha.chauhan@email.com', dob: '1995-06-23', location: 'Jodhpur', state: 'Rajasthan', gender: 'Female', qualification: 'ANM', skills: ['Nursing', 'Patient Care', 'Vaccination', 'First Aid'], previousCompany: 'Jodhpur Community Health Center', totalExperience: '3', willingToRelocate: true, preferredLocations: ['Jaipur', 'Delhi', 'Ahmedabad'], expectedSalary: '18000', preferredJobType: 'Full-time', status: 'New', createdAt: '2024-03-05', resumeFile: 'Rekha_Chauhan_Resume.pdf' },
  { id: 'JS023', firstName: 'Kiran', lastName: 'Naik', phone: '+91-9876543232', email: 'kiran.naik@email.com', dob: '1992-02-09', location: 'Margao', state: 'Goa', gender: 'Male', qualification: 'Diploma Mechanical', skills: ['Welding', 'Fabrication', 'CNC Operation', 'Blueprint Reading'], previousCompany: 'Goa Shipyard', totalExperience: '7', willingToRelocate: true, preferredLocations: ['Mumbai', 'Pune', 'Chennai'], expectedSalary: '27000', preferredJobType: 'Full-time', status: 'Contacted', createdAt: '2024-03-07', resumeFile: 'Kiran_Naik_Resume.pdf' },
  { id: 'JS024', firstName: 'Suman', lastName: 'Kumari', phone: '+91-9876543233', email: 'suman.kumari@email.com', dob: '2001-10-15', location: 'Darbhanga', state: 'Bihar', gender: 'Female', qualification: '12th Pass', skills: ['Data Entry', 'Typing', 'MS Office'], previousCompany: '', totalExperience: '0', willingToRelocate: true, preferredLocations: ['Delhi', 'Patna'], expectedSalary: '12000', preferredJobType: 'Full-time', status: 'New', createdAt: '2024-03-09' },
  { id: 'JS025', firstName: 'Ganesh', lastName: 'Patel', phone: '+91-9876543234', email: 'ganesh.patel@email.com', dob: '1987-09-03', location: 'Surat', state: 'Gujarat', gender: 'Male', qualification: 'ITI Turner', skills: ['Lathe Operation', 'Machine Operation', 'Precision Tools', 'Quality Control'], previousCompany: 'Surat Diamond Tools', totalExperience: '12', willingToRelocate: false, preferredLocations: [], expectedSalary: '30000', preferredJobType: 'Full-time', status: 'Interviewed', createdAt: '2024-03-11', resumeFile: 'Ganesh_Patel_Resume.pdf' },
  { id: 'JS026', firstName: 'Asha', lastName: 'Bhosle', phone: '+91-9876543235', email: 'asha.bhosle@email.com', dob: '1996-07-28', location: 'Aurangabad', state: 'Maharashtra', gender: 'Female', qualification: 'B.Sc Nursing', skills: ['Nursing', 'ICU', 'Emergency Care', 'Patient Counseling'], previousCompany: 'Aurangabad General Hospital', totalExperience: '5', willingToRelocate: true, preferredLocations: ['Pune', 'Mumbai', 'Hyderabad'], expectedSalary: '26000', preferredJobType: 'Full-time', status: 'New', createdAt: '2024-03-13', resumeFile: 'Asha_Bhosle_Resume.pdf' },
  { id: 'JS027', firstName: 'Dinesh', lastName: 'Yadav', phone: '+91-9876543236', email: 'dinesh.yadav@email.com', dob: '1993-04-16', location: 'Gwalior', state: 'Madhya Pradesh', gender: 'Male', qualification: 'BA', skills: ['Sales', 'Field Sales', 'Customer Relationship', 'Team Handling'], previousCompany: 'MP Consumer Goods', totalExperience: '4', willingToRelocate: true, preferredLocations: ['Indore', 'Bhopal', 'Delhi'], expectedSalary: '19000', preferredJobType: 'Full-time', status: 'New', createdAt: '2024-03-15' },
  { id: 'JS028', firstName: 'Usha', lastName: 'Devi', phone: '+91-9876543237', email: 'usha.devi@email.com', dob: '1999-12-01', location: 'Shimla', state: 'Himachal Pradesh', gender: 'Female', qualification: 'B.Ed', skills: ['Teaching', 'English', 'Mathematics', 'Classroom Management'], previousCompany: 'Himachal Govt School', totalExperience: '2', willingToRelocate: true, preferredLocations: ['Delhi', 'Chandigarh', 'Dehradun'], expectedSalary: '20000', preferredJobType: 'Full-time', status: 'Contacted', createdAt: '2024-03-17' },
  { id: 'JS029', firstName: 'Balaji', lastName: 'Rao', phone: '+91-9876543238', email: 'balaji.rao@email.com', dob: '1991-08-20', location: 'Tirupati', state: 'Andhra Pradesh', gender: 'Male', qualification: 'Diploma Electrical', skills: ['Electrical Wiring', 'Transformer Maintenance', 'Safety', 'Troubleshooting'], previousCompany: 'AP Power Distribution', totalExperience: '6', willingToRelocate: true, preferredLocations: ['Hyderabad', 'Chennai', 'Bangalore'], expectedSalary: '24000', preferredJobType: 'Full-time', status: 'New', createdAt: '2024-03-19' },
  { id: 'JS030', firstName: 'Kamla', lastName: 'Sharma', phone: '+91-9876543239', email: 'kamla.sharma@email.com', dob: '1995-03-07', location: 'Jabalpur', state: 'Madhya Pradesh', gender: 'Female', qualification: 'MBA', skills: ['HR', 'Payroll', 'Compliance', 'Employee Relations'], previousCompany: 'Jabalpur Industries', totalExperience: '4', willingToRelocate: true, preferredLocations: ['Mumbai', 'Pune', 'Bangalore'], expectedSalary: '30000', preferredJobType: 'Full-time', status: 'New', createdAt: '2024-03-21', resumeFile: 'Kamla_Sharma_CV.pdf' },
];

const mockEmployers: Employer[] = [
  { id: 'EM001', companyName: 'Bharat Manufacturing Co.', industry: 'Manufacturing', companySize: '50-200', yearEstablished: '2010', website: 'bharatmfg.com', address: 'Plot 45, Industrial Area', city: 'Pune', state: 'Maharashtra', contactName: 'Sanjay Mehta', contactEmail: 'sanjay@bharatmfg.com', contactPhone: '+91-9812345001', gstNumber: '27AABCB1234F1Z5', createdAt: '2024-01-10' },
  { id: 'EM002', companyName: 'Greenfield Agro Pvt Ltd', industry: 'Agriculture', companySize: '20-50', yearEstablished: '2015', website: 'greenfieldagro.in', address: '56, Agri Park', city: 'Nashik', state: 'Maharashtra', contactName: 'Anita Deshmukh', contactEmail: 'anita@greenfieldagro.in', contactPhone: '+91-9812345002', gstNumber: '', createdAt: '2024-01-12' },
  { id: 'EM003', companyName: 'TechRural Solutions', industry: 'IT Services', companySize: '10-20', yearEstablished: '2018', website: 'techrural.com', address: '12, Tech Hub', city: 'Jaipur', state: 'Rajasthan', contactName: 'Rohit Agarwal', contactEmail: 'rohit@techrural.com', contactPhone: '+91-9812345003', gstNumber: '08AABCT5678G1Z3', createdAt: '2024-01-15' },
  { id: 'EM004', companyName: 'Metro Hospital Group', industry: 'Healthcare', companySize: '200-500', yearEstablished: '2005', website: 'metrohospital.org', address: '78, Health City', city: 'Hyderabad', state: 'Telangana', contactName: 'Dr. K. Rao', contactEmail: 'krao@metrohospital.org', contactPhone: '+91-9812345004', gstNumber: '36AABCM9012H1Z7', createdAt: '2024-01-18' },
  { id: 'EM005', companyName: 'QuickDel Logistics', industry: 'Logistics', companySize: '50-200', yearEstablished: '2012', website: 'quickdel.in', address: '23, Transport Nagar', city: 'Delhi', state: 'Delhi', contactName: 'Manish Gupta', contactEmail: 'manish@quickdel.in', contactPhone: '+91-9812345005', gstNumber: '07AABCQ3456K1Z9', createdAt: '2024-01-22' },
  { id: 'EM006', companyName: 'Sunrise Construction', industry: 'Construction', companySize: '100-500', yearEstablished: '2008', website: 'sunrisecon.com', address: '45, Builder Colony', city: 'Bangalore', state: 'Karnataka', contactName: 'Venkat Reddy', contactEmail: 'venkat@sunrisecon.com', contactPhone: '+91-9812345006', gstNumber: '29AABCS7890L1Z1', createdAt: '2024-02-01' },
  { id: 'EM007', companyName: 'Apex Pharma Industries', industry: 'Healthcare', companySize: '50-200', yearEstablished: '2011', website: 'apexpharma.co.in', address: '89, Pharma Zone', city: 'Hyderabad', state: 'Telangana', contactName: 'Dr. Sandhya Nair', contactEmail: 'sandhya@apexpharma.co.in', contactPhone: '+91-9812345007', gstNumber: '36AABCA4567B1Z4', createdAt: '2024-02-05' },
  { id: 'EM008', companyName: 'Northern Steel Works', industry: 'Manufacturing', companySize: '200-500', yearEstablished: '2003', website: 'northernsteel.in', address: '12, Industrial Estate', city: 'Manesar', state: 'Haryana', contactName: 'Kapil Sharma', contactEmail: 'kapil@northernsteel.in', contactPhone: '+91-9812345008', gstNumber: '06AABCN8901C1Z8', createdAt: '2024-02-08' },
  { id: 'EM009', companyName: 'FreshBasket Agro', industry: 'Agriculture', companySize: '20-50', yearEstablished: '2019', website: 'freshbasket.in', address: '34, Farm Hub', city: 'Nashik', state: 'Maharashtra', contactName: 'Prashant Kulkarni', contactEmail: 'prashant@freshbasket.in', contactPhone: '+91-9812345009', gstNumber: '', createdAt: '2024-02-12' },
  { id: 'EM010', companyName: 'CareWell Hospitals', industry: 'Healthcare', companySize: '100-500', yearEstablished: '2007', website: 'carewellhospitals.com', address: '55, Medical District', city: 'Chennai', state: 'Tamil Nadu', contactName: 'Dr. Revathi Subramaniam', contactEmail: 'revathi@carewellhospitals.com', contactPhone: '+91-9812345010', gstNumber: '33AABCC2345D1Z2', createdAt: '2024-02-15' },
];

const mockJobPostings: JobPosting[] = [
  { id: 'JP001', employerId: 'EM001', companyName: 'Bharat Manufacturing Co.', jobTitle: 'Machine Operator', numberOfOpenings: 5, city: 'Pune', state: 'Maharashtra', salaryMin: '18000', salaryMax: '22000', employmentType: 'Full-time', qualificationRequired: 'ITI', experienceRequired: '2-5 years', skillsRequired: ['Machine Operation', 'Quality Check', 'CNC'], jobDescription: 'Operate and maintain CNC machines. Ensure quality standards. Shift-based work.', benefits: 'PF, ESI, Accommodation', joiningTimeline: 'Immediate', accommodationProvided: true, transportationProvided: true, additionalNotes: 'Rotational shifts', status: 'Open', createdAt: '2024-01-15', applicants: ['JS003', 'JS009', 'JS021', 'JS025'] },
  { id: 'JP002', employerId: 'EM002', companyName: 'Greenfield Agro Pvt Ltd', jobTitle: 'Field Supervisor', numberOfOpenings: 3, city: 'Nashik', state: 'Maharashtra', salaryMin: '15000', salaryMax: '20000', employmentType: 'Full-time', qualificationRequired: 'B.Sc Agriculture', experienceRequired: '1-3 years', skillsRequired: ['Agriculture', 'Team Management', 'Crop Management'], jobDescription: 'Supervise field operations, manage farm workers, monitor crop health.', benefits: 'Housing, Medical', joiningTimeline: '1 month', accommodationProvided: true, transportationProvided: false, additionalNotes: '', status: 'Open', createdAt: '2024-01-18', applicants: ['JS018'] },
  { id: 'JP003', employerId: 'EM003', companyName: 'TechRural Solutions', jobTitle: 'Data Entry Operator', numberOfOpenings: 10, city: 'Jaipur', state: 'Rajasthan', salaryMin: '12000', salaryMax: '16000', employmentType: 'Full-time', qualificationRequired: '12th Pass', experienceRequired: '0-2 years', skillsRequired: ['Data Entry', 'MS Office', 'Typing'], jobDescription: 'Enter and verify data in systems. Maintain records and generate reports.', benefits: 'PF, Annual Bonus', joiningTimeline: 'Immediate', accommodationProvided: false, transportationProvided: false, additionalNotes: 'Freshers welcome', status: 'Open', createdAt: '2024-01-22', applicants: ['JS001', 'JS024', 'JS006'] },
  { id: 'JP004', employerId: 'EM004', companyName: 'Metro Hospital Group', jobTitle: 'Staff Nurse', numberOfOpenings: 8, city: 'Hyderabad', state: 'Telangana', salaryMin: '20000', salaryMax: '28000', employmentType: 'Full-time', qualificationRequired: 'B.Sc Nursing', experienceRequired: '2-5 years', skillsRequired: ['Nursing', 'Patient Care', 'ICU'], jobDescription: 'Provide patient care in ward/ICU. Assist doctors. Maintain patient records.', benefits: 'PF, ESI, Accommodation, Meals', joiningTimeline: '2 weeks', accommodationProvided: true, transportationProvided: true, additionalNotes: 'Night shift allowance extra', status: 'Open', createdAt: '2024-01-25', applicants: ['JS002', 'JS012', 'JS026'] },
  { id: 'JP005', employerId: 'EM005', companyName: 'QuickDel Logistics', jobTitle: 'Delivery Executive', numberOfOpenings: 20, city: 'Delhi', state: 'Delhi', salaryMin: '14000', salaryMax: '18000', employmentType: 'Full-time', qualificationRequired: '10th Pass', experienceRequired: '0-2 years', skillsRequired: ['Driving', 'Navigation', 'Customer Service'], jobDescription: 'Deliver packages across the city. Use app for route optimization.', benefits: 'Incentives, Fuel Allowance', joiningTimeline: 'Immediate', accommodationProvided: false, transportationProvided: false, additionalNotes: 'Own two-wheeler preferred', status: 'Open', createdAt: '2024-01-28', applicants: ['JS007', 'JS017'] },
  { id: 'JP006', employerId: 'EM006', companyName: 'Sunrise Construction', jobTitle: 'Site Supervisor', numberOfOpenings: 2, city: 'Bangalore', state: 'Karnataka', salaryMin: '22000', salaryMax: '30000', employmentType: 'Full-time', qualificationRequired: 'Diploma Civil', experienceRequired: '5-8 years', skillsRequired: ['Construction', 'Site Management', 'Safety'], jobDescription: 'Supervise construction sites. Ensure safety compliance.', benefits: 'PF, Accommodation, Medical', joiningTimeline: '1 month', accommodationProvided: true, transportationProvided: true, additionalNotes: '', status: 'Open', createdAt: '2024-02-02', applicants: ['JS019'] },
  { id: 'JP007', employerId: 'EM001', companyName: 'Bharat Manufacturing Co.', jobTitle: 'Quality Inspector', numberOfOpenings: 2, city: 'Pune', state: 'Maharashtra', salaryMin: '20000', salaryMax: '26000', employmentType: 'Full-time', qualificationRequired: 'B.Sc', experienceRequired: '3-5 years', skillsRequired: ['Quality Control', 'Inspection', 'ISO Standards'], jobDescription: 'Inspect products for quality.', benefits: 'PF, ESI, Bonus', joiningTimeline: '2 weeks', accommodationProvided: false, transportationProvided: true, additionalNotes: '', status: 'Open', createdAt: '2024-02-05', applicants: ['JS009'] },
  { id: 'JP008', employerId: 'EM003', companyName: 'TechRural Solutions', jobTitle: 'Junior Developer', numberOfOpenings: 3, city: 'Jaipur', state: 'Rajasthan', salaryMin: '15000', salaryMax: '22000', employmentType: 'Full-time', qualificationRequired: 'B.Tech/BCA', experienceRequired: '0-1 years', skillsRequired: ['Python', 'JavaScript', 'SQL'], jobDescription: 'Develop web applications.', benefits: 'PF, Learning Budget', joiningTimeline: '1 month', accommodationProvided: false, transportationProvided: false, additionalNotes: 'Remote work possible', status: 'Open', createdAt: '2024-02-08', applicants: ['JS006', 'JS016'] },
  { id: 'JP009', employerId: 'EM007', companyName: 'Apex Pharma Industries', jobTitle: 'Pharmacy Technician', numberOfOpenings: 4, city: 'Hyderabad', state: 'Telangana', salaryMin: '18000', salaryMax: '24000', employmentType: 'Full-time', qualificationRequired: 'B.Pharm/D.Pharm', experienceRequired: '1-3 years', skillsRequired: ['Pharmacy', 'Drug Dispensing', 'Quality Control'], jobDescription: 'Dispense medications, maintain inventory.', benefits: 'PF, ESI, Medical', joiningTimeline: '2 weeks', accommodationProvided: false, transportationProvided: false, additionalNotes: '', status: 'Open', createdAt: '2024-02-10', applicants: ['JS012'] },
  { id: 'JP010', employerId: 'EM008', companyName: 'Northern Steel Works', jobTitle: 'Welder', numberOfOpenings: 6, city: 'Manesar', state: 'Haryana', salaryMin: '20000', salaryMax: '28000', employmentType: 'Full-time', qualificationRequired: 'ITI Welder', experienceRequired: '3-8 years', skillsRequired: ['Welding', 'Fabrication', 'Blueprint Reading', 'Safety'], jobDescription: 'Perform MIG/TIG welding on structural steel.', benefits: 'PF, ESI, Accommodation, Transport', joiningTimeline: 'Immediate', accommodationProvided: true, transportationProvided: true, additionalNotes: 'Overtime available', status: 'Open', createdAt: '2024-02-13', applicants: ['JS005', 'JS015', 'JS023'] },
  { id: 'JP011', employerId: 'EM009', companyName: 'FreshBasket Agro', jobTitle: 'Agriculture Officer', numberOfOpenings: 2, city: 'Nashik', state: 'Maharashtra', salaryMin: '16000', salaryMax: '22000', employmentType: 'Full-time', qualificationRequired: 'B.Sc Agriculture', experienceRequired: '2-4 years', skillsRequired: ['Agriculture', 'Soil Testing', 'Irrigation', 'Crop Management'], jobDescription: 'Oversee farming operations.', benefits: 'Housing, Medical, Bonus', joiningTimeline: '1 month', accommodationProvided: true, transportationProvided: false, additionalNotes: '', status: 'Open', createdAt: '2024-02-16', applicants: ['JS018'] },
  { id: 'JP012', employerId: 'EM010', companyName: 'CareWell Hospitals', jobTitle: 'ANM / GNM Nurse', numberOfOpenings: 10, city: 'Chennai', state: 'Tamil Nadu', salaryMin: '15000', salaryMax: '20000', employmentType: 'Full-time', qualificationRequired: 'ANM/GNM', experienceRequired: '1-3 years', skillsRequired: ['Nursing', 'Patient Care', 'Vaccination', 'First Aid'], jobDescription: 'Provide basic nursing care.', benefits: 'PF, ESI, Meals', joiningTimeline: 'Immediate', accommodationProvided: true, transportationProvided: false, additionalNotes: 'Rotational shifts', status: 'Open', createdAt: '2024-02-19', applicants: ['JS022'] },
];

const mockMatches: CandidateMatch[] = [
  { id: 'CM001', candidateId: 'JS001', jobId: 'JP003', candidateName: 'Rajesh Kumar', jobTitle: 'Data Entry Operator', companyName: 'TechRural Solutions', matchScore: 72, status: 'Shortlisted', createdAt: '2024-02-01' },
  { id: 'CM002', candidateId: 'JS002', jobId: 'JP004', candidateName: 'Priya Sharma', jobTitle: 'Staff Nurse', companyName: 'Metro Hospital Group', matchScore: 88, status: 'Interview Scheduled', createdAt: '2024-02-03' },
  { id: 'CM003', candidateId: 'JS003', jobId: 'JP001', candidateName: 'Amit Patel', jobTitle: 'Machine Operator', companyName: 'Bharat Manufacturing Co.', matchScore: 91, status: 'Offered', createdAt: '2024-02-05' },
  { id: 'CM004', candidateId: 'JS005', jobId: 'JP010', candidateName: 'Vikram Singh', jobTitle: 'Welder', companyName: 'Northern Steel Works', matchScore: 65, status: 'Pending', createdAt: '2024-02-07' },
  { id: 'CM005', candidateId: 'JS006', jobId: 'JP008', candidateName: 'Meera Reddy', jobTitle: 'Junior Developer', companyName: 'TechRural Solutions', matchScore: 79, status: 'Shortlisted', createdAt: '2024-02-09' },
  { id: 'CM006', candidateId: 'JS007', jobId: 'JP005', candidateName: 'Ramesh Yadav', jobTitle: 'Delivery Executive', companyName: 'QuickDel Logistics', matchScore: 83, status: 'Interview Scheduled', createdAt: '2024-02-10' },
  { id: 'CM007', candidateId: 'JS009', jobId: 'JP007', candidateName: 'Suresh Naik', jobTitle: 'Quality Inspector', companyName: 'Bharat Manufacturing Co.', matchScore: 70, status: 'Pending', createdAt: '2024-02-12' },
  { id: 'CM008', candidateId: 'JS012', jobId: 'JP009', candidateName: 'Lakshmi Naidu', jobTitle: 'Pharmacy Technician', companyName: 'Apex Pharma Industries', matchScore: 85, status: 'Shortlisted', createdAt: '2024-02-14' },
  { id: 'CM009', candidateId: 'JS015', jobId: 'JP010', candidateName: 'Sanjay Gupta', jobTitle: 'Welder', companyName: 'Northern Steel Works', matchScore: 94, status: 'Hired', createdAt: '2024-02-16' },
  { id: 'CM010', candidateId: 'JS018', jobId: 'JP011', candidateName: 'Nandini Patil', jobTitle: 'Agriculture Officer', companyName: 'FreshBasket Agro', matchScore: 89, status: 'Interview Scheduled', createdAt: '2024-02-18' },
  { id: 'CM011', candidateId: 'JS022', jobId: 'JP012', candidateName: 'Rekha Chauhan', jobTitle: 'ANM / GNM Nurse', companyName: 'CareWell Hospitals', matchScore: 82, status: 'Shortlisted', createdAt: '2024-02-20' },
  { id: 'CM012', candidateId: 'JS026', jobId: 'JP004', candidateName: 'Asha Bhosle', jobTitle: 'Staff Nurse', companyName: 'Metro Hospital Group', matchScore: 92, status: 'Pending', createdAt: '2024-02-22' },
];

const mockCommunications: Communication[] = [
  { id: 'CO001', date: '2024-02-01', type: 'Email', contactType: 'Candidate', contactName: 'Rajesh Kumar', subject: 'Job Opportunity - Data Entry Operator', notes: 'Sent job details for TechRural Solutions.', outcome: 'Interested', agentName: 'Admin' },
  { id: 'CO002', date: '2024-02-02', type: 'Call', contactType: 'Employer', contactName: 'Dr. K. Rao', subject: 'Candidate Shortlist for Nurse Position', notes: 'Discussed 3 shortlisted candidates.', outcome: 'Interview to be scheduled', agentName: 'Admin' },
  { id: 'CO003', date: '2024-02-03', type: 'Email', contactType: 'Candidate', contactName: 'Priya Sharma', subject: 'Interview Scheduled - Metro Hospital', notes: 'Confirmed interview date.', outcome: 'Interview Confirmed', agentName: 'Admin' },
  { id: 'CO004', date: '2024-02-05', type: 'Call', contactType: 'Candidate', contactName: 'Amit Patel', subject: 'Offer Discussion - Machine Operator', notes: 'Candidate accepted verbally.', outcome: 'Offer Accepted', agentName: 'Admin' },
  { id: 'CO005', date: '2024-02-06', type: 'Email', contactType: 'Employer', contactName: 'Sanjay Mehta', subject: 'Candidate Acceptance - Amit Patel', notes: 'Requested offer letter.', outcome: 'Offer letter pending', agentName: 'Admin' },
  { id: 'CO006', date: '2024-02-08', type: 'SMS', contactType: 'Candidate', contactName: 'Meera Reddy', subject: 'Shortlist Notification', notes: 'SMS sent about shortlisting.', outcome: 'Acknowledged', agentName: 'Admin' },
  { id: 'CO007', date: '2024-02-10', type: 'Call', contactType: 'Candidate', contactName: 'Ramesh Yadav', subject: 'Interview Prep', notes: 'Prepped candidate for interview.', outcome: 'Candidate ready', agentName: 'Admin' },
  { id: 'CO008', date: '2024-02-16', type: 'Call', contactType: 'Candidate', contactName: 'Sanjay Gupta', subject: 'Offer for Welder Position', notes: '₹26,000/month + accommodation.', outcome: 'Offer Accepted', agentName: 'Admin' },
];

const mockPlacements: Placement[] = [
  { id: 'PL001', candidateId: 'JS004', candidateName: 'Sunita Devi', jobId: 'JP003', jobTitle: 'Data Entry Operator', employerId: 'EM003', companyName: 'TechRural Solutions', placementDate: '2024-02-01', handoverDate: '2024-02-15', commission: 4000, commissionStatus: 'Paid', status: 'Completed' },
  { id: 'PL002', candidateId: 'JS003', candidateName: 'Amit Patel', jobId: 'JP001', jobTitle: 'Machine Operator', employerId: 'EM001', companyName: 'Bharat Manufacturing Co.', placementDate: '2024-02-10', handoverDate: '2024-03-01', commission: 5000, commissionStatus: 'Unpaid', status: 'Active' },
  { id: 'PL003', candidateId: 'JS021', candidateName: 'Manoj Tiwari', jobId: 'JP001', jobTitle: 'Machine Operator', employerId: 'EM001', companyName: 'Bharat Manufacturing Co.', placementDate: '2024-02-20', handoverDate: '2024-03-05', commission: 4500, commissionStatus: 'Unpaid', status: 'Active' },
  { id: 'PL004', candidateId: 'JS015', candidateName: 'Sanjay Gupta', jobId: 'JP010', jobTitle: 'Welder', employerId: 'EM008', companyName: 'Northern Steel Works', placementDate: '2024-02-25', handoverDate: '2024-03-10', commission: 5000, commissionStatus: 'Partial', status: 'Active' },
];

// ─── Context ──────────────────────────────────────────────────

interface DataContextType {
  jobSeekers: JobSeeker[];
  employers: Employer[];
  jobPostings: JobPosting[];
  matches: CandidateMatch[];
  communications: Communication[];
  placements: Placement[];
  addJobSeeker: (seeker: JobSeeker) => void;
  addEmployer: (employer: Employer) => void;
  addJobPosting: (job: JobPosting) => void;
  addMatch: (match: CandidateMatch) => void;
  addCommunication: (comm: Communication) => void;
  addPlacement: (placement: Placement) => void;
  updateMatchStatus: (id: string, status: CandidateMatch['status']) => void;
  updatePlacement: (id: string, updates: Partial<Placement>) => void;
  updateJobPosting: (id: string, updates: Partial<JobPosting>) => void;
  updateJobSeeker: (id: string, updates: Partial<JobSeeker>) => void;
  hireCandidate: (candidateId: string, jobId: string) => void;
  isAdminLoggedIn: boolean;
  adminLogin: (email: string, password: string) => boolean;
  adminLogout: () => void;
  isCandidateLoggedIn: boolean;
  loggedCandidate: JobSeeker | null;
  candidateLogin: (email: string) => boolean;
  candidateLogout: () => void;
  isEmployerLoggedIn: boolean;
  loggedEmployer: Employer | null;
  employerLogin: (email: string) => boolean;
  employerLogout: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [jobSeekers, setJobSeekers] = useState<JobSeeker[]>(mockJobSeekers);
  const [employers, setEmployers] = useState<Employer[]>(mockEmployers);
  const [jobPostings, setJobPostings] = useState<JobPosting[]>(mockJobPostings);
  const [matches, setMatches] = useState<CandidateMatch[]>(mockMatches);
  const [communications, setCommunications] = useState<Communication[]>(mockCommunications);
  const [placements, setPlacements] = useState<Placement[]>(mockPlacements);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isCandidateLoggedIn, setIsCandidateLoggedIn] = useState(false);
  const [loggedCandidate, setLoggedCandidate] = useState<JobSeeker | null>(null);
  const [isEmployerLoggedIn, setIsEmployerLoggedIn] = useState(false);
  const [loggedEmployer, setLoggedEmployer] = useState<Employer | null>(null);

  const addJobSeeker = (seeker: JobSeeker) => setJobSeekers(prev => [...prev, seeker]);
  const addEmployer = (employer: Employer) => setEmployers(prev => [...prev, employer]);
  const addJobPosting = (job: JobPosting) => setJobPostings(prev => [...prev, job]);
  const addMatch = (match: CandidateMatch) => setMatches(prev => [...prev, match]);
  const addCommunication = (comm: Communication) => setCommunications(prev => [...prev, comm]);
  const addPlacement = (placement: Placement) => setPlacements(prev => [...prev, placement]);

  const updateMatchStatus = (id: string, status: CandidateMatch['status']) => {
    setMatches(prev => prev.map(m => m.id === id ? { ...m, status } : m));
  };

  const updatePlacement = (id: string, updates: Partial<Placement>) => {
    setPlacements(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const updateJobPosting = (id: string, updates: Partial<JobPosting>) => {
    setJobPostings(prev => prev.map(j => j.id === id ? { ...j, ...updates } : j));
  };

  const updateJobSeeker = (id: string, updates: Partial<JobSeeker>) => {
    setJobSeekers(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const hireCandidate = (candidateId: string, jobId: string) => {
    const candidate = jobSeekers.find(c => c.id === candidateId);
    const job = jobPostings.find(j => j.id === jobId);
    const employer = employers.find(e => e.id === job?.employerId);
    if (candidate && job && employer) {
      // Update candidate status
      updateJobSeeker(candidateId, { status: 'Placed' });
      // Update match status
      setMatches(prev => prev.map(m =>
        m.candidateId === candidateId && m.jobId === jobId ? { ...m, status: 'Hired' as const } : m
      ));
      // Create placement
      const placement: Placement = {
        id: `PL${String(Date.now()).slice(-6)}`,
        candidateId,
        candidateName: `${candidate.firstName} ${candidate.lastName}`,
        jobId,
        jobTitle: job.jobTitle,
        employerId: employer.id,
        companyName: employer.companyName,
        placementDate: new Date().toISOString().split('T')[0],
        handoverDate: '',
        commission: 4000,
        commissionStatus: 'Unpaid',
        status: 'Active',
      };
      addPlacement(placement);
      // Add communication
      addCommunication({
        id: `CO${String(Date.now()).slice(-6)}`,
        date: new Date().toISOString().split('T')[0],
        type: 'Email',
        contactType: 'Candidate',
        contactName: `${candidate.firstName} ${candidate.lastName}`,
        subject: `Hired for ${job.jobTitle} at ${employer.companyName}`,
        notes: `Candidate hired for ${job.jobTitle} position at ${employer.companyName}. Salary: ₹${job.salaryMin}-${job.salaryMax}/month. Placement recorded.`,
        outcome: 'Hired',
        agentName: 'Admin',
      });
    }
  };

  const adminLogin = (email: string, password: string) => {
    if (email === 'admin@ruralworkforce.com' && password === 'admin123') {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };
  const adminLogout = () => setIsAdminLoggedIn(false);

  const candidateLogin = (email: string) => {
    const c = jobSeekers.find(s => s.email.toLowerCase() === email.toLowerCase());
    if (c) { setIsCandidateLoggedIn(true); setLoggedCandidate(c); return true; }
    return false;
  };
  const candidateLogout = () => { setIsCandidateLoggedIn(false); setLoggedCandidate(null); };

  const employerLogin = (email: string) => {
    const e = employers.find(em => em.contactEmail.toLowerCase() === email.toLowerCase());
    if (e) { setIsEmployerLoggedIn(true); setLoggedEmployer(e); return true; }
    return false;
  };
  const employerLogout = () => { setIsEmployerLoggedIn(false); setLoggedEmployer(null); };

  return (
    <DataContext.Provider value={{
      jobSeekers, employers, jobPostings, matches, communications, placements,
      addJobSeeker, addEmployer, addJobPosting, addMatch, addCommunication, addPlacement,
      updateMatchStatus, updatePlacement, updateJobPosting, updateJobSeeker, hireCandidate,
      isAdminLoggedIn, adminLogin, adminLogout,
      isCandidateLoggedIn, loggedCandidate, candidateLogin, candidateLogout,
      isEmployerLoggedIn, loggedEmployer, employerLogin, employerLogout,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
}
