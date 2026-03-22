import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import SocialLogin from '../components/SocialLogin';

const inputClass = (invalid) =>
  [
    'block w-full rounded-xl border-2 bg-white px-4 py-3 text-base text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500',
    invalid
      ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20 dark:border-red-600'
      : 'border-zinc-200 focus:border-violet-500 focus:ring-violet-500/20 dark:border-zinc-700',
  ].join(' ');

const labelClass = 'block text-sm font-semibold text-zinc-800 dark:text-zinc-200';

const Register = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated, isLoading, error: authError, clearError } = useAuthStore();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (authError) {
      setErrors({ form: authError });
    }
  }, [authError]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
      clearError();
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setSuccessMessage('');
      return;
    }

    setErrors({});

    try {
      const userData = {
        username: formData.email.split('@')[0] + Math.floor(Math.random() * 1000),
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`,
      };

      const success = await register(userData);

      if (success) {
        setSuccessMessage('Registration successful! You can now log in.');

        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          agreeToTerms: false,
        });

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      setErrors({ form: error.message || 'Registration failed. Please try again.' });
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        
        <h1 className="mt-8 text-center text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          Create your account
        </h1>
        <p className="mt-3 text-center text-base text-zinc-600 dark:text-zinc-400">
          Or{' '}
          <Link
            to="/login"
            className="font-semibold text-violet-600 hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300"
          >
            sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="rounded-2xl border border-zinc-200/90 bg-white px-6 py-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/85 sm:px-10">
          {successMessage && (
            <div
              className="mb-6 rounded-xl border border-emerald-200/80 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950/40"
              role="status"
            >
              <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">{successMessage}</p>
            </div>
          )}

          {errors.form && (
            <div
              className="mb-6 rounded-xl border border-red-200/80 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/40"
              role="alert"
            >
              <p className="text-sm font-medium text-red-800 dark:text-red-200">{errors.form}</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className={labelClass}>
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`${inputClass(!!errors.firstName)} mt-2`}
                />
                {errors.firstName && (
                  <p className="mt-1.5 text-sm font-medium text-red-600 dark:text-red-400">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className={labelClass}>
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`${inputClass(!!errors.lastName)} mt-2`}
                />
                {errors.lastName && (
                  <p className="mt-1.5 text-sm font-medium text-red-600 dark:text-red-400">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`${inputClass(!!errors.email)} mt-2`}
              />
              {errors.email && (
                <p className="mt-1.5 text-sm font-medium text-red-600 dark:text-red-400">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className={labelClass}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                className={`${inputClass(!!errors.password)} mt-2`}
              />
              {errors.password && (
                <p className="mt-1.5 text-sm font-medium text-red-600 dark:text-red-400">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className={labelClass}>
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`${inputClass(!!errors.confirmPassword)} mt-2`}
              />
              {errors.confirmPassword && (
                <p className="mt-1.5 text-sm font-medium text-red-600 dark:text-red-400">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="flex items-start gap-3">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className={`mt-1 h-4 w-4 rounded border-zinc-300 text-violet-600 focus:ring-violet-500 dark:border-zinc-600 dark:bg-zinc-900 ${
                  errors.agreeToTerms ? 'border-red-400' : ''
                }`}
              />
              <label htmlFor="agreeToTerms" className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                I agree to the{' '}
                <a href="#" className="font-semibold text-violet-600 hover:text-violet-500 dark:text-violet-400">
                  Terms
                </a>{' '}
                and{' '}
                <a href="#" className="font-semibold text-violet-600 hover:text-violet-500 dark:text-violet-400">
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-sm font-medium text-red-600 dark:text-red-400">{errors.agreeToTerms}</p>
            )}

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
                  Creating account…
                </>
              ) : (
                'Create account'
              )}
            </button>
          </form>

          <SocialLogin isRegister />
        </div>
      </div>
    </div>
  );
};

export default Register;
