import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Clock, Award, Tag, Undo2, FileText, ExternalLink, Play, Pencil, MessageCircle } from 'lucide-react';
import SubmissionForm from './SubmissionForm';
import { challengesAPI, submissionsAPI } from '../../api/apiService';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import Popover from '../Popover';
import Modal from '../Modal';
import Comment from '../common/Comment';
import useUserStore from '../../store/userStore';


const ChallengeDetail = ({ challengeId }) => {
  // const { id } = useParams();
  const navigate = useNavigate();
  const { userData } = useUserStore();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [submissionIdForComment, setSubmissionIdForComment] = useState(null);
  const [submissionIdForEdit, setSubmissionIdForEdit] = useState(null);
  const fetchSubmissions = async () => {
    try {
      const response = await submissionsAPI.getSubmissions(challengeId);
      console.log('submissions', response);
      // if (!response.ok) throw new Error('Failed to fetch submissions');
      // const data = await response.json();
      setSubmissions(response);
    } catch (err) {
      console.error('Error fetching submissions:', err);
    }
  };

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await challengesAPI.getChallenge(challengeId);
        // console.log('challenge', response);
        // if (!response.ok) throw new Error('Failed to fetch challenge');
        // const data = await response.json(); 
        setChallenge(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
    fetchSubmissions();
  }, [challengeId]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl animate-pulse px-4 py-8">
        <div className="mb-4 h-8 w-3/4 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        <div className="mb-8 h-4 w-1/2 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        <div className="mb-8 h-64 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
        <div className="space-y-4">
          <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-5/6 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-4/6 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-xl border border-red-200/80 bg-red-50 p-4 text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
          {error}
        </div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <p className="text-zinc-600 dark:text-zinc-400">Challenge not found.</p>
      </div>
    );
  }

  const {
    title,
    content,
    featured_media,
    max_score,
    submission_deadline_enabled,
    submission_deadline,
    challenge_category
  } = challenge;

  const deadline = submission_deadline_enabled ? new Date(submission_deadline) : null;
  const isExpired = deadline && deadline < new Date();

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-zinc-200/90 bg-white sm:p-6 md:p-8 dark:border-zinc-800 dark:bg-zinc-900/60">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard/challenges')}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-zinc-950 px-4 py-2.5 font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
            >
              <Undo2 className="h-5 w-5" />
              Back
            </button>
            <h1
              className="text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-2xl"
              dangerouslySetInnerHTML={{ __html: title.rendered }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-5">
          <div className="col-span-1 md:col-span-8">
            <div
              className="prose prose-zinc mb-6 max-w-none dark:prose-invert sm:mb-8"
              dangerouslySetInnerHTML={{ __html: content.rendered }}
            />

            <div className="mb-6 space-y-4 rounded-2xl border border-zinc-200/80 bg-zinc-50 p-4 sm:mb-8 sm:p-6 dark:border-zinc-800 dark:bg-zinc-950/50">
              {max_score && (
                <div className="flex items-center text-zinc-800 dark:text-zinc-200">
                  <Award className="mr-3 h-5 w-5 shrink-0 text-violet-600 dark:text-violet-400" />
                  <span className="font-medium">Max score: {max_score}</span>
                </div>
              )}

              {deadline && (
                <div
                  className={`flex items-center text-zinc-800 dark:text-zinc-200 ${isExpired ? 'text-rose-600 dark:text-rose-400' : ''}`}
                >
                  <Clock className="mr-3 h-5 w-5 shrink-0 text-violet-600 dark:text-violet-400" />
                  <span className="font-medium">
                    {isExpired ? 'Expired' : formatDistanceToNow(deadline, { addSuffix: true })}
                  </span>
                </div>
              )}

              {challenge_category && (
                <div className="flex items-center text-zinc-800 dark:text-zinc-200">
                  <Tag className="mr-3 h-5 w-5 shrink-0 text-violet-600 dark:text-violet-400" />
                  <span className="font-medium">{challenge_category.map((c) => c.name).join(', ')}</span>
                </div>
              )}
            </div>

            {submissions.length > 0 && (
              <>
                <div className="mb-8 overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950/40">
                  <div className="border-b border-zinc-200 p-5 dark:border-zinc-800">
                    <h3 className="flex items-center text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                      <FileText className="mr-2 h-5 w-5 shrink-0 text-violet-600 dark:text-violet-400" />
                      Submissions
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-zinc-50 dark:bg-zinc-900/80">
                        <tr>
                          <th
                            style={{ width: '35%' }}
                            className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
                          >
                            Title
                          </th>
                          <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Description
                          </th>
                          <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Author
                          </th>
                          <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Demo URL
                          </th>
                          <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Video
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {submissions.map((submission) => (
                          <tr key={submission.id} className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/60">
                            <td className="px-5 py-4">
                              <div className="text-sm font-medium text-zinc-900 dark:text-white">
                                <h4 className="text-md mb-2 font-bold text-zinc-950 dark:text-zinc-50">{submission.title}</h4>
                                <span className="text-sm text-zinc-600 dark:text-zinc-300">
                                  {format(new Date(submission.date), 'MMMM d, yyyy • h:mm a')}
                                </span>
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {userData?.id == submission.author?.id && (
                                    <button
                                      type="button"
                                      className="inline-flex items-center rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-zinc-800 shadow-sm transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-violet-800 dark:hover:bg-violet-950/40"
                                      title="Edit submission"
                                      onClick={() => {
                                        setShowSubmissionForm(true);
                                        setSubmissionIdForEdit(submission.id);
                                      }}
                                    >
                                      <Pencil className="mr-1.5 h-3.5 w-3.5" /> Edit
                                    </button>
                                  )}
                                  {/* <button 
                                    className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded text-gray-700 bg-gray-100 hover:bg-red-100 hover:text-red-700 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-red-900 dark:hover:text-red-200 transition-all duration-200 shadow-sm"
                                    title="Delete submission"
                                  >
                                    <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Delete
                                  </button> */}
                                  {/* { button comment } */}
                                  <button
                                    type="button"
                                    className="inline-flex items-center rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-zinc-800 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/30"
                                    title="Comment"
                                    onClick={() => {
                                      setShowCommentModal(true);
                                      setSubmissionIdForComment(submission.id);
                                    }}
                                  >
                                    <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                      {submission.count_comments > 0 ? `${submission.count_comments} ` : ''}
                                      comment(s)
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <Popover
                                width={400}
                                content={
                                  <div
                                    className="prose prose-sm prose-zinc max-w-none px-4 text-sm dark:prose-invert"
                                    dangerouslySetInnerHTML={{ __html: submission.content }}
                                  />
                                }
                              >
                                <button
                                  type="button"
                                  className="flex items-center text-sm font-semibold text-violet-600 transition hover:text-violet-500 dark:text-violet-400"
                                >
                                  <FileText className="mr-1 h-4 w-4" />
                                  View
                                </button>
                              </Popover>
                            </td>
                            <td className="whitespace-nowrap px-5 py-4">
                              <div className="flex items-center">
                                <img
                                  src={submission.author?.gravatar}
                                  alt={submission.author?.display_name}
                                  className="mr-2 h-6 w-6 rounded-full object-cover shadow-sm ring-2 ring-zinc-100 dark:ring-zinc-800"
                                />
                                <span className="truncate text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                  {submission.author?.display_name || 'Anonymous'}
                                </span>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-5 py-4">
                              <div className="text-sm text-zinc-600 dark:text-zinc-300">
                                {submission.demo_url && (
                                  <a
                                    href={submission.demo_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold text-violet-600 hover:text-violet-500 dark:text-violet-400"
                                  >
                                    <ExternalLink className="mr-1 inline-block h-4 w-4" /> Demo
                                  </a>
                                )}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-5 py-4">
                              <div className="text-sm text-zinc-600 dark:text-zinc-300">
                                {submission.demo_video && (
                                  <a
                                    href={submission.demo_video}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold text-violet-600 hover:text-violet-500 dark:text-violet-400"
                                  >
                                    <Play className="mr-1 inline-block h-4 w-4" /> Video
                                  </a>
                                )}
                              </div>
                            </td>
                            
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* { comment } */}
                <Modal 
                  title={ `Comments for "${submissions.find(submission => submission.id === submissionIdForComment)?.title}"` } 
                  isOpen={showCommentModal} 
                  size="xl"
                  onClose={() => setShowCommentModal(false)}>
                  {
                    submissionIdForComment && (
                      <Comment postId={submissionIdForComment} />
                    )
                  }
                </Modal>
              </>
            )}

            {!isExpired && (
              <div className="mb-12">
                <button
                  type="button"
                  onClick={() => {
                    setShowSubmissionForm(!showSubmissionForm);
                    setSubmissionIdForEdit(null);
                  }}
                  className="rounded-xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
                >
                  {showSubmissionForm ? 'Cancel submission' : 'Submit solution'}
                </button>
                
                {showSubmissionForm && (
                  <div className="mt-6">
                    <SubmissionForm challengeId={challengeId} submissionId={submissionIdForEdit} onSuccess={() => {
                      // setShowSubmissionForm(false);
                      console.log('submission success');
                      fetchSubmissions();
                    }} />
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="col-span-1 md:col-span-4">
            {featured_media && (
              <div className="mb-6 sm:mb-8">
                <img
                  src={featured_media.source_url}
                  alt={title.rendered}
                  className="h-auto w-full rounded-2xl border border-zinc-200/90 object-cover shadow-md dark:border-zinc-800"
                  loading="lazy"
                />
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail; 