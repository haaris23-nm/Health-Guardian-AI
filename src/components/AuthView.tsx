import React, { useState } from 'react';
import { HeartPulse, Mail, Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight, Sparkles, CheckCircle2, AlertCircle, KeyRound } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthViewProps {
  onLoginSuccess: (user: UserProfile) => void;
  defaultEmail?: string;
}

export const AuthView: React.FC<AuthViewProps> = ({ onLoginSuccess, defaultEmail = 'alex.johnson@healthmate.ai' }) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState<string>(defaultEmail);
  const [loginPassword, setLoginPassword] = useState<string>('password123');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  // Register form state
  const [regName, setRegName] = useState<string>('');
  const [regEmail, setRegEmail] = useState<string>('');
  const [regPassword, setRegPassword] = useState<string>('');
  const [regConfirmPassword, setRegConfirmPassword] = useState<string>('');
  const [agreeTerms, setAgreeTerms] = useState<boolean>(true);

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState<string>('');
  const [forgotSent, setForgotSent] = useState<boolean>(false);

  // Status/Error messages
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Quick 1-Click Demo Login
  const handleQuickDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const demoUser: UserProfile = {
        id: 'usr_demo_1',
        name: 'Alex Johnson',
        email: 'alex.johnson@healthmate.ai',
        age: 28,
        gender: 'male',
        heightCm: 178,
        weightKg: 74,
        goal: 'maintain',
        activityLevel: 'moderate',
      };
      onLoginSuccess(demoUser);
      setLoading(false);
    }, 400);
  };

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!loginEmail || !loginPassword) {
      setErrorMessage('Please enter both email address and password.');
      return;
    }

    if (loginPassword.length < 4) {
      setErrorMessage('Password must be at least 4 characters.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      // Create user profile based on input email or use demo if matching
      const userName = loginEmail.split('@')[0].replace('.', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
      const user: UserProfile = {
        id: `usr_${Date.now()}`,
        name: userName || 'Authenticated Patient',
        email: loginEmail,
        age: 30,
        gender: 'male',
        heightCm: 175,
        weightKg: 72,
        goal: 'maintain',
        activityLevel: 'moderate',
      };

      if (rememberMe) {
        localStorage.setItem('health_guardian_auth_user', JSON.stringify(user));
      }

      onLoginSuccess(user);
      setLoading(false);
    }, 600);
  };

  // Handle Register
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!regName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!regEmail || !regEmail.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (regPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Passwords do not match. Please check again.');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage('You must agree to the Terms of Service & Privacy Policy.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newRegisteredUser: UserProfile = {
        id: `usr_${Date.now()}`,
        name: regName.trim(),
        email: regEmail.trim(),
        age: 25,
        gender: 'other',
        heightCm: 170,
        weightKg: 68,
        goal: 'maintain',
        activityLevel: 'moderate',
      };

      localStorage.setItem('health_guardian_auth_user', JSON.stringify(newRegisteredUser));
      onLoginSuccess(newRegisteredUser);
      setLoading(false);
    }, 700);
  };

  // Handle Forgot Password
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!forgotEmail || !forgotEmail.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setForgotSent(true);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex flex-col justify-center items-center p-4 sm:p-6 font-sans">
      
      {/* Top Header Branding */}
      <div className="max-w-md w-full text-center mb-8 space-y-3">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-none mb-2">
          <HeartPulse className="w-9 h-9" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Health Guardian <span className="text-blue-600 font-black">AI</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm font-medium max-w-sm mx-auto">
          Secure, Medical-Grade Health & Wellness AI Platform. Sign in with your email to access your personal dashboard.
        </p>
      </div>

      {/* Auth Card */}
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl border border-blue-100 dark:border-slate-800 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
        
        {/* Navigation Tabs (Sign In / Register) */}
        {mode !== 'forgot' && (
          <div className="grid grid-cols-2 p-1.5 bg-blue-50/80 dark:bg-slate-800 rounded-2xl border border-blue-100/80 dark:border-slate-700">
            <button
              onClick={() => { setMode('login'); setErrorMessage(''); }}
              className={`py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('register'); setErrorMessage(''); }}
              className={`py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                mode === 'register'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* --- MODE 1: LOGIN FORM --- */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-blue-600 dark:text-blue-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="alex.johnson@healthmate.ai"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-blue-100 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-hidden transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => { setMode('forgot'); setErrorMessage(''); }}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-blue-600 dark:text-blue-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-2xl border border-blue-100 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-hidden transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-blue-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded-md accent-blue-600 cursor-pointer"
                />
                Remember me on this browser
              </label>
            </div>

            {/* Submit Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-blue-200 dark:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {loading ? (
                <span>Authenticating User...</span>
              ) : (
                <>
                  <span>Sign In to Health Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative my-4 flex items-center justify-center">
              <div className="border-t border-blue-100 dark:border-slate-800 w-full"></div>
              <span className="bg-white dark:bg-slate-900 px-3 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest absolute">
                OR
              </span>
            </div>

            {/* 1-Click Demo Access Button */}
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              disabled={loading}
              className="w-full py-3 px-4 rounded-2xl bg-blue-50 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700 border border-blue-100 dark:border-slate-700 text-blue-700 dark:text-blue-300 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>1-Click Instant Demo Login (Alex Johnson)</span>
            </button>

          </form>
        )}

        {/* --- MODE 2: REGISTER FORM --- */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-blue-600 dark:text-blue-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Dr. Sarah Connor"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-blue-100 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-hidden transition-all"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-blue-600 dark:text-blue-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-blue-100 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-hidden transition-all"
                />
              </div>
            </div>

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-3 rounded-2xl border border-blue-100 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-hidden transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-3 rounded-2xl border border-blue-100 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-hidden transition-all"
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                required
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded-md accent-blue-600 cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs text-slate-600 dark:text-slate-400 leading-tight cursor-pointer">
                I agree to the <span className="font-bold text-blue-600 dark:text-blue-400">Terms of Service</span> and <span className="font-bold text-blue-600 dark:text-blue-400">Health Data Privacy Policy</span>.
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-blue-200 dark:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {loading ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Complete Registration</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* --- MODE 3: FORGOT PASSWORD FORM --- */}
        {mode === 'forgot' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
              <KeyRound className="w-5 h-5" />
              <span>Password Recovery</span>
            </div>

            {forgotSent ? (
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-blue-600 mx-auto" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Reset Instructions Sent!</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  We have dispatched password recovery instructions to <strong>{forgotEmail}</strong>. Please check your inbox.
                </p>
                <button
                  onClick={() => { setMode('login'); setForgotSent(false); }}
                  className="mt-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  ← Back to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Enter your registered email address below, and we will send you a secure link to reset your Health Guardian password.
                </p>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Your Registered Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-blue-600 dark:text-blue-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="alex.johnson@healthmate.ai"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border border-blue-100 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-hidden transition-all"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => { setMode('login'); setErrorMessage(''); }}
                    className="flex-1 py-3 rounded-2xl border border-blue-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                  >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </div>

      {/* Footer Info */}
      <div className="mt-8 text-center space-y-1">
        <div className="flex items-center justify-center gap-1.5 text-xs text-blue-700 dark:text-blue-400 font-bold">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>HIPAA & GDPR Compliant Medical Encryption</span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-500">
          Health Guardian AI © 2026. All medical data is stored securely.
        </p>
      </div>

    </div>
  );
};
