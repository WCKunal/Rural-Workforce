import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { Button, Input, Textarea, Card, FAQItem } from '../components/ui';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">Contact & Support</h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">Have questions or need help? Our team is here to assist you. Reach out and we'll get back to you within 24 hours.</p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600"><Phone size={22} /></div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Phone</h3>
                    <p className="text-sm text-slate-500 mt-1">+91-1800-123-4567</p>
                    <p className="text-xs text-slate-400 mt-0.5">Toll-free, Mon–Sat 9am–6pm</p>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-green-50 rounded-xl text-green-600"><Mail size={22} /></div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Email</h3>
                    <p className="text-sm text-slate-500 mt-1">support@ruralworkforce.com</p>
                    <p className="text-xs text-slate-400 mt-0.5">We respond within 24 hours</p>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-purple-50 rounded-xl text-purple-600"><MapPin size={22} /></div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Office</h3>
                    <p className="text-sm text-slate-500 mt-1">42, Rajiv Gandhi Nagar<br />Jaipur, Rajasthan 302015</p>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600"><Clock size={22} /></div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Working Hours</h3>
                    <p className="text-sm text-slate-500 mt-1">Monday – Saturday<br />9:00 AM – 6:00 PM IST</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                {submitted ? (
                  <div className="text-center py-8">
                    <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-900">Message Sent!</h3>
                    <p className="text-slate-500 mt-2">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                    <Button variant="outline" className="mt-4" onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}>Send Another Message</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Send Us a Message</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input label="Your Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Enter your full name" />
                      <Input label="Email Address" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="you@email.com" />
                    </div>
                    <Input label="Subject" required value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} placeholder="How can we help?" />
                    <Textarea label="Message" required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="Describe your query or concern..." />
                    <Button type="submit" size="lg" className="gap-2">
                      <Send size={18} /> Send Message
                    </Button>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-10">Common Questions</h2>
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <FAQItem question="How do I register as a job seeker?" answer="Click the 'I'm a Job Seeker' button on the homepage, then fill out the registration form. It takes less than 5 minutes and is completely free." />
            <FAQItem question="How do I post a job as an employer?" answer="Click 'I'm an Employer' on the homepage, then fill out your company details and job requirements. Our team will review and start matching candidates." />
            <FAQItem question="What areas do you serve?" answer="We serve all states across India, with a focus on connecting rural talent with opportunities in both urban and rural areas." />
            <FAQItem question="Is my personal information secure?" answer="Yes, we take data privacy seriously. All personal information is encrypted and stored securely. We never share your data with third parties without consent." />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
