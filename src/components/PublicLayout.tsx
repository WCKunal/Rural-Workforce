import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Briefcase, Users, Phone, Building2, ChevronDown, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function PublicLayout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminDropdown, setAdminDropdown] = useState(false);
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/job-seeker-info', label: 'For Job Seekers' },
    { to: '/employer-info', label: 'For Employers' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                <Briefcase size={20} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-slate-900 dark:text-white leading-tight tracking-tight">Rozgaar Hai</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <Link key={link.to} to={link.to} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(link.to) ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-2">
              <Link to="/register/job-seeker" className="px-4 py-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                I'm a Job Seeker
              </Link>
              <Link to="/register/employer" className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm">
                I'm an Employer
              </Link>

              {/* Theme Toggle */}
              <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400" title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <div className="relative">
                <button onClick={() => setAdminDropdown(!adminDropdown)} className="px-3 py-2 text-xs font-medium text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors flex items-center gap-1">
                  Portals <ChevronDown size={12} />
                </button>
                {adminDropdown && (
                  <div className="absolute right-0 top-full mt-1 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 w-48 z-50">
                    <Link to="/login/candidate" onClick={() => setAdminDropdown(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700">
                      <Users size={14} className="text-blue-500" /> Candidate Portal
                    </Link>
                    <Link to="/login/employer" onClick={() => setAdminDropdown(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-slate-700">
                      <Building2 size={14} className="text-teal-500" /> Employer Portal
                    </Link>
                    <hr className="my-1 border-slate-100 dark:border-slate-700" />
                    <Link to="/admin/login" onClick={() => setAdminDropdown(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">
                      Admin Dashboard
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400">
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                {mobileOpen ? <X size={24} className="text-slate-600 dark:text-slate-300" /> : <Menu size={24} className="text-slate-600 dark:text-slate-300" />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map(link => (
                <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${isActive(link.to) ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-700 space-y-2">
                <Link to="/register/job-seeker" onClick={() => setMobileOpen(false)} className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30">
                  I'm a Job Seeker
                </Link>
                <Link to="/register/employer" onClick={() => setMobileOpen(false)} className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  I'm an Employer
                </Link>
                <div className="flex gap-2 justify-center pt-1">
                  <Link to="/login/candidate" onClick={() => setMobileOpen(false)} className="px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50">Candidate Portal</Link>
                  <Link to="/login/employer" onClick={() => setMobileOpen(false)} className="px-3 py-1.5 text-xs font-medium text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/50">Employer Portal</Link>
                </div>
                <Link to="/admin/login" onClick={() => setMobileOpen(false)} className="block text-center px-4 py-2 text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400">
                  Admin Dashboard
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 border-t border-slate-800 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Link to="/" className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center"><Briefcase size={20} className="text-white" /></div>
                <div className="flex flex-col"><span className="text-lg font-bold text-white leading-tight">Rozgaar Hai</span></div>
              </Link>
              <p className="text-sm leading-relaxed">Connecting skilled rural talent with businesses across India.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">For Job Seekers</h4>
              <ul className="space-y-2">
                <li><Link to="/job-seeker-info" className="text-sm hover:text-white transition-colors">How It Works</Link></li>
                <li><Link to="/register/job-seeker" className="text-sm hover:text-white transition-colors">Register Now</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">For Employers</h4>
              <ul className="space-y-2">
                <li><Link to="/employer-info" className="text-sm hover:text-white transition-colors">How It Works</Link></li>
                <li><Link to="/register/employer" className="text-sm hover:text-white transition-colors">Post a Job</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/contact" className="text-sm hover:text-white transition-colors">Contact Us</Link></li>
                <li><a href="#" className="text-sm hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-sm hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">© 2024 Rozgaar Hai. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">Twitter</a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">LinkedIn</a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">Facebook</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PublicLayout;
