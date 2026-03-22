import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import SocialLogin from '../components/SocialLogin';
import { authAPI } from '../api/apiService';

const inputClass =
  'block w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500';

const labelClass = 'block text-sm font-semibold text-zinc-800 dark:text-zinc-200';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading, error: authError, clearError } = useAuthStore();
  const { forgotPassword } = authAPI;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (error) {
      setError('');
      clearError();
    }
  };

  const handleForgotPasswordChange = (e) => {
    setForgotPasswordEmail(e.target.value);
    if (error) {
      setError('');
      clearError();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.email && formData.password) {
      try {
        const success = await login(formData.email, formData.password);
        if (success) {
          navigate('/dashboard');
        }
      } catch (err) {
        setError(err.message || 'Login failed. Please try again.');
      }
    } else {
      setError('Please enter both email and password.');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');

    if (!forgotPasswordEmail) {
      setError('Please enter your email address.');
      return;
    }

    try {
      const response = await forgotPassword(forgotPasswordEmail);
      if (response?.status === 'success') {
        setForgotPasswordSuccess(true);
        setTimeout(() => {
          setShowForgotPassword(false);
          setForgotPasswordEmail('');
          setForgotPasswordSuccess(false);
        }, 3000);
      } else {
        setError(response.message || 'Failed to send reset email. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Failed to send reset email. Please try again.');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        
        <h1 className="mt-8 text-center text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          {showForgotPassword ? 'Reset your password' : 'Sign in'}
        </h1>
        {!showForgotPassword && (
          <p className="mt-3 text-center text-base text-zinc-600 dark:text-zinc-400">
            Or{' '}
            <Link
              to="/register"
              className="font-semibold text-violet-600 hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300"
            >
              create an account
            </Link>
          </p>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-2xl border border-zinc-200/90 bg-white px-6 py-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/85 sm:px-10">
          {error && (
            <div
              className="mb-6 rounded-xl border border-red-200/80 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/40"
              role="alert"
            >
              <p className="text-sm font-medium text-red-800 dark:text-red-200" dangerouslySetInnerHTML={{ __html: error }} />
            </div>
          )}

          {forgotPasswordSuccess && (
            <div
              className="mb-6 rounded-xl border border-emerald-200/80 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950/40"
              role="status"
            >
              <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
                Password reset instructions have been sent to your email.
              </p>
            </div>
          )}

          {showForgotPassword ? (
            <form className="space-y-6" onSubmit={handleForgotPassword}>
              <div>
                <label htmlFor="forgot-email" className={labelClass}>
                  Email address
                </label>
                <input
                  id="forgot-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={forgotPasswordEmail}
                  onChange={handleForgotPasswordChange}
                  className={`${inputClass} mt-2`}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-zinc-950 py-3.5 text-base font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
              >
                {isLoading ? 'Sending…' : 'Send reset instructions'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="text-sm font-semibold text-violet-600 hover:text-violet-500 dark:text-violet-400"
                >
                  Back to sign in
                </button>
              </div>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`${inputClass} mt-2`}
                />
              </div>

              <div>
                <label htmlFor="password" className={labelClass}>
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`${inputClass} mt-2`}
                />
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-zinc-300 text-violet-600 focus:ring-violet-500 dark:border-zinc-600 dark:bg-zinc-900"
                  />
                  <label htmlFor="rememberMe" className="ml-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Remember me
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm font-semibold text-violet-600 hover:text-violet-500 dark:text-violet-400"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center rounded-xl bg-zinc-950 py-3.5 text-base font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="-ml-1 mr-2 h-5 w-5 animate-spin text-white dark:text-zinc-950"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Signing in…
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>
          )}

          {!showForgotPassword && <SocialLogin isRegister={false} />}
        </div>
      </div>
    </div>
  );
};

export default Login;
