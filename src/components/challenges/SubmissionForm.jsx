import { useState, useEffect } from 'react';
import { submissionsAPI } from '../../api/apiService';
import ErrorMessage from '../common/ErrorMessage';

const labelClass = 'mb-2 block text-sm font-semibold text-zinc-800 dark:text-zinc-200';

const inputClass =
  'w-full rounded-xl border-2 border-zinc-200 bg-white px-4 py-2.5 text-zinc-900 placeholder:text-zinc-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100';

const SubmissionForm = ({ challengeId, submissionId, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    demo_url: '',
    demo_video: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const fetchSubmission = async () => {
    const submission = await submissionsAPI.getSubmission(submissionId);
    setFormData({
      title: submission.__title.raw,
      content: submission.__content.raw,
      demo_url: submission.demo_url,
      demo_video: submission.demo_video,
    });
  };

  useEffect(() => {
    if (submissionId) {
      fetchSubmission();
    }
  }, [submissionId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Title is required');
      return false;
    }
    if (!formData.content.trim()) {
      setError('Description is required');
      return false;
    }
    if (formData.demo_url && !isValidUrl(formData.demo_url)) {
      setError('Please enter a valid demo URL');
      return false;
    }
    if (formData.demo_video && !isValidUrl(formData.demo_video)) {
      setError('Please enter a valid video URL');
      return false;
    }
    return true;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const submissionData = {
        title: formData.title,
        content: formData.content,
        status: 'publish',
        meta: {
          _submission_challenge_id: challengeId,
          _submission_demo_url: formData.demo_url,
          _submission_demo_video: formData.demo_video,
        },
      };

      let response;
      if (submissionId) {
        response = await submissionsAPI.updateSubmission(submissionId, submissionData);
      } else {
        response = await submissionsAPI.createSubmission(submissionData);
      }

      if (response.status === 'success') {
        setSuccess(true);
        onSuccess?.();
      } else {
        setError(response.message || 'Failed to submit solution');
      }
    } catch (err) {
      setError(err.message || 'Failed to submit solution');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50 p-6 text-center shadow-sm dark:border-emerald-900 dark:bg-emerald-950/30">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="rounded-full bg-emerald-100 p-3 dark:bg-emerald-900/40">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-emerald-600 dark:text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">Submission successful</h3>
          <p className="mb-2 text-zinc-600 dark:text-zinc-400">
            Your solution was submitted. Please wait for review.
          </p>
          <button
            type="button"
            onClick={() => setSuccess(false)}
            className="rounded-xl bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
          >
            Submit another solution
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60"
    >
      <div className="mb-6">
        <label htmlFor="title" className={labelClass}>
          Solution title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className={inputClass}
          placeholder="Title for your solution"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="content" className={labelClass}>
          Description
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={6}
          className={inputClass}
          placeholder="Describe your solution"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="demo_url" className={labelClass}>
          Demo URL (optional)
        </label>
        <input
          type="url"
          id="demo_url"
          name="demo_url"
          value={formData.demo_url}
          onChange={handleChange}
          className={inputClass}
          placeholder="https://…"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="demo_video" className={labelClass}>
          Video URL (optional)
        </label>
        <input
          type="url"
          id="demo_video"
          name="demo_video"
          value={formData.demo_video}
          onChange={handleChange}
          className={inputClass}
          placeholder="https://…"
        />
      </div>

      {error && (
        <div className="mb-6">
          <ErrorMessage message={error} />
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
      >
        {isSubmitting ? 'Submitting…' : submissionId ? 'Update solution' : 'Submit solution'}
      </button>
    </form>
  );
};

export default SubmissionForm;
