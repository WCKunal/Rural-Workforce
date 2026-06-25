import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, LogIn, AlertCircle } from 'lucide-react';
import { Button, Input, Card } from '../../components/ui';
import { useData } from '../../context/DataContext';

function AdminLogin() {
  const { adminLogin, isAdminLoggedIn } = useData();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (isAdminLoggedIn) {
    navigate('/admin');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin(email, password)) {
      navigate('/admin');
    } else {
      setError('Invalid credentials. Try admin@ruralworkforce.com / admin123');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-xl mb-4 shadow-lg">
            <Briefcase size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-slate-400 mt-1">Rozgaar Hai</p>
        </div>
        <Card className="shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Email Address" type="email" required value={email} onChange={e => { setEmail(e.target.value); setError(''); }} placeholder="admin@rozgaarhai.com" />
            <Input label="Password" type="password" required value={password} onChange={e => { setPassword(e.target.value); setError(''); }} placeholder="Enter password" />
            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                <AlertCircle size={16} />
                {error}
              </div>
            )}
            <Button type="submit" fullWidth size="lg" className="gap-2">
              <LogIn size={18} /> Sign In
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-xs text-slate-400">Demo: admin@rozgaarhai.com / admin123</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default AdminLogin;
