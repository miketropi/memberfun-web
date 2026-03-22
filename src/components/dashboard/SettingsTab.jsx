import React, { useState, useRef } from 'react';
import PasswordUpdateForm from './PasswordUpdateForm';
import { usersAPI } from '../../api/apiService';
import useAuthStore from '../../store/authStore';
import Toast from '../../components/Toast';

const inputClass =
  'mt-2 block w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-2.5 text-zinc-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 disabled:opacity-70 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100';

const labelClass = 'block text-sm font-semibold text-zinc-800 dark:text-zinc-200';

const SettingsTab = ({ userData }) => {
  const { user, setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef(null);
  const [formData, setFormData] = useState({
    ID: userData?.id || '',
    first_name: userData?.first_name || '',
    last_name: userData?.last_name || '',
    email: userData?.email || '',
    description: userData?.description || '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let { email: _email, ...rest } = formData;
    void _email;
    const response = await usersAPI.updateUser(userData.id, rest);
    console.log(response);
    let message = response.message;
    if (response.status === "success") {
      setUser({
        ...user,
        name: `${rest.first_name} ${rest.last_name}`,
      });
      toastRef.current.show(message, { type: 'success' });
    } else {
      toastRef.current.show(message, { type: 'error' });
    }

    setIsLoading(false);
  };
  
  return (
    <div>

      {/* { JSON.stringify(userData) } */}
      <Toast ref={toastRef} />
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">Account settings</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
          <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Profile information</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="mb-4 md:col-span-2">
              <div className="rounded-xl border border-zinc-200/90 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/50">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  To update your profile picture, visit{' '}
                  <a
                    href="https://gravatar.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-violet-600 underline hover:text-violet-500 dark:text-violet-400"
                  >
                    Gravatar.com
                  </a>{' '}
                  and set up an avatar using your email address. The avatar will sync with your profile.
                </p>
              </div>
            </div>
            <div>
              <label htmlFor="first_name" className={labelClass}>
                First name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="last_name" className={labelClass}>
                Last name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="email" className={labelClass}>
                Email address
              </label>
              <input
                disabled
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="description" className={labelClass}>
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={inputClass}
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-xl bg-zinc-950 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
            disabled={isLoading}
          >
            {isLoading ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </form>

      <PasswordUpdateForm />
    </div>
  );
};

export default SettingsTab; 