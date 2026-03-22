import React, { useState } from 'react';
import { usersAPI } from '../../api/apiService';
import useUserStore from '../../store/userStore';
import { CheckCircle, AlertCircle } from 'lucide-react';

const inputClass =
  'mt-2 block w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-2.5 text-zinc-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100';

const labelClass = 'block text-sm font-semibold text-zinc-800 dark:text-zinc-200';

const PasswordUpdateForm = () => {
  const { userData } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
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
    
    // Validate passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('New passwords do not match!');
      setMessageType('error');
      return;
    }
    
    setIsLoading(true);

    // updatePassword
    try {
      const response = await usersAPI.updatePassword(userData.id, formData.newPassword);
      console.log(response);
      setMessage('Password updated successfully!');
      setMessageType('success');
    } catch (error) {
      console.error(error);
      setMessage('Failed to update password. Please try again.');
      setMessageType('error');
    }

    setIsLoading(false);
    
    // Reset form
    setFormData({
      newPassword: '',
      confirmPassword: ''
    });
  };
  
  return (
    <div>
      <h2 className="mb-6 mt-12 text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">Update password</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        {message && (
          <div
            className={`mb-4 flex items-center rounded-xl border p-4 ${
              messageType === 'success'
                ? 'border-emerald-200/80 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100'
                : 'border-red-200/80 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950/40 dark:text-red-100'
            }`}
          >
            <div className="flex-shrink-0">
              {messageType === 'success' ? (
                <CheckCircle size={16} className="text-emerald-600 dark:text-emerald-400" />
              ) : (
                <AlertCircle size={16} className="text-red-600 dark:text-red-400" />
              )}
            </div>
            <p className="ml-3 text-sm font-medium">{message}</p>
          </div>
        )}
        <section className="rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
          <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Change password</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="newPassword" className={labelClass}>
                New password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className={labelClass}>
                Confirm new password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-xl bg-zinc-950 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
          >
            {isLoading ? 'Updating…' : 'Update password'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordUpdateForm; 