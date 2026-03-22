import { useState, useEffect } from 'react';
import { seminarsAPI } from '../../api/apiService';
import { format, parseISO } from 'date-fns';
import { Calendar, Clock, MapPin, User, Users, CheckCircle, AlertCircle } from 'lucide-react';

const labelClass = 'mb-1 block text-sm font-semibold text-zinc-800 dark:text-zinc-200';

const inputClass = (invalid) =>
  [
    'mt-1 block w-full rounded-xl border-2 px-4 py-2.5 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:bg-zinc-950 dark:text-zinc-100',
    invalid ? 'border-red-500 focus:border-red-500' : 'border-zinc-200 focus:border-violet-500 dark:border-zinc-700',
  ].join(' ');

export default function SeminarRegistrationForm({ 
  seminarId, 
  onRegistrationComplete,
  initialData = {}
}) {
  const [seminar, setSeminar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registrationData, setRegistrationData] = useState({
    name: initialData.name || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    company: initialData.company || '',
    dietary_requirements: initialData.dietary_requirements || '',
    special_requests: initialData.special_requests || ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchSeminarDetails = async () => {
      try {
        setLoading(true);
        // We need to get the seminar details first
        // This would typically use a different endpoint than what we have in the API docs
        // For now, we'll assume we can get a single seminar by ID
        const upcomingSeminars = await seminarsAPI.getUpcomingSeminars();
        const seminarDetails = upcomingSeminars.find(s => s.id === parseInt(seminarId));
        
        if (seminarDetails) {
          setSeminar(seminarDetails);
        } else {
          setError('Seminar not found');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load seminar details. Please try again later.');
        setLoading(false);
        console.error('Error fetching seminar details:', err);
      }
    };

    if (seminarId) {
      fetchSeminarDetails();
    }
  }, [seminarId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when field is edited
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!registrationData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!registrationData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(registrationData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!registrationData.phone.trim()) {
      errors.phone = 'Phone number is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setSubmitting(true);
      await seminarsAPI.registerForSeminar(seminarId, registrationData);
      setSuccess(true);
      setSubmitting(false);
      
      // Notify parent component that registration is complete
      if (onRegistrationComplete) {
        onRegistrationComplete(seminarId);
      }
    } catch (err) {
      setError('Failed to register for seminar. Please try again later.');
      setSubmitting(false);
      console.error('Error registering for seminar:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-zinc-200 border-t-violet-600 dark:border-zinc-700 dark:border-t-violet-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="rounded-xl border border-red-200/80 bg-red-50 px-4 py-3 text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200"
        role="alert"
      >
        <strong className="font-semibold">Error</strong>
        <span className="mt-1 block sm:mt-0 sm:inline sm:before:content-['—_']">{error}</span>
      </div>
    );
  }

  if (!seminar) {
    return (
      <div
        className="rounded-xl border border-amber-200/80 bg-amber-50 px-4 py-3 text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200"
        role="alert"
      >
        <strong className="font-semibold">Notice</strong>
        <span className="mt-1 block sm:mt-0 sm:inline sm:before:content-['—_']">Seminar not found.</span>
      </div>
    );
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50 px-6 py-8 text-center dark:border-emerald-900 dark:bg-emerald-950/30">
        <CheckCircle className="mx-auto mb-4 h-16 w-16 text-emerald-600 dark:text-emerald-400" />
        <h2 className="mb-2 text-2xl font-bold text-zinc-950 dark:text-zinc-50">Registration successful</h2>
        <p className="mb-6 text-zinc-700 dark:text-zinc-300">You have registered for &quot;{seminar.title}&quot;.</p>
        <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">A confirmation email has been sent to your address.</p>
        <button
          type="button"
          onClick={() => onRegistrationComplete && onRegistrationComplete(seminarId)}
          className="rounded-xl bg-zinc-950 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
        >
          Return to seminars
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">Register for seminar</h1>

      <div className="mb-6 rounded-2xl border border-zinc-200/80 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-950/50">
        <h2 className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-100">{seminar.title}</h2>

        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-3 text-zinc-600 dark:text-zinc-300">
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-violet-600 dark:text-violet-400" />
              <span>{seminar.formatted_date || format(parseISO(seminar.date), 'MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-violet-600 dark:text-violet-400" />
              <span>{seminar.formatted_time || seminar.time}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-violet-600 dark:text-violet-400" />
              <span>{seminar.location}</span>
            </div>
          </div>

          <div className="space-y-3 text-zinc-600 dark:text-zinc-300">
            <div className="flex items-center">
              <User className="mr-2 h-5 w-5 text-violet-600 dark:text-violet-400" />
              <span>Host: {seminar.host?.name || 'Unknown'}</span>
            </div>
            {seminar.capacity && (
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-violet-600 dark:text-violet-400" />
                <span>Capacity: {seminar.capacity}</span>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-zinc-200 pt-6 dark:border-zinc-700">
          <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Your details</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelClass}>
                  Full name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={registrationData.name}
                  onChange={handleInputChange}
                  className={inputClass(!!validationErrors.name)}
                  placeholder="Enter your full name"
                />
                {validationErrors.name && (
                  <p className="mt-1 flex items-center text-sm text-red-600 dark:text-red-400">
                    <AlertCircle className="mr-1 h-4 w-4" />
                    {validationErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={registrationData.email}
                  onChange={handleInputChange}
                  className={inputClass(!!validationErrors.email)}
                  placeholder="Enter your email"
                />
                {validationErrors.email && (
                  <p className="mt-1 flex items-center text-sm text-red-600 dark:text-red-400">
                    <AlertCircle className="mr-1 h-4 w-4" />
                    {validationErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={registrationData.phone}
                  onChange={handleInputChange}
                  className={inputClass(!!validationErrors.phone)}
                  placeholder="Enter your phone number"
                />
                {validationErrors.phone && (
                  <p className="mt-1 flex items-center text-sm text-red-600 dark:text-red-400">
                    <AlertCircle className="mr-1 h-4 w-4" />
                    {validationErrors.phone}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="company" className={labelClass}>
                  Company / organization
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={registrationData.company}
                  onChange={handleInputChange}
                  className={inputClass(false)}
                  placeholder="Optional"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="dietary_requirements" className={labelClass}>
                Dietary requirements
              </label>
              <input
                type="text"
                id="dietary_requirements"
                name="dietary_requirements"
                value={registrationData.dietary_requirements}
                onChange={handleInputChange}
                className={inputClass(false)}
                placeholder="Allergies or preferences"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="special_requests" className={labelClass}>
                Special requests
              </label>
              <textarea
                id="special_requests"
                name="special_requests"
                value={registrationData.special_requests}
                onChange={handleInputChange}
                rows={3}
                className={inputClass(false)}
                placeholder="Accommodations or notes"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => onRegistrationComplete && onRegistrationComplete()}
                className="rounded-xl border-2 border-zinc-200 px-4 py-2.5 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center rounded-xl bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-60 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
              >
                {submitting ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent dark:border-zinc-950 dark:border-t-transparent" />
                    Processing…
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Complete registration
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 