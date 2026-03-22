import { useState, useEffect, useRef } from 'react';
import { commentsAPI } from '../../api/apiService';
import { MessageSquare, Flag, Edit } from 'lucide-react';
import Gavatar from '../Gavatar';
import useUserStore from '../../store/userStore';

export default function SeminarComments({ seminarId, isHost = false }) {
  const { userData } = useUserStore();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const filters = { date: 'all', type: 'all', rating: 'all' };
  const commentFormRef = useRef(null);

  useEffect(() => {
    fetchComments();
  }, [seminarId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await commentsAPI.getComments({
        post_id: seminarId,
        ...filters
      });
      setComments(response?.comments);
      setError(null);
    } catch (err) {
      setError('Failed to load comments. Please try again later.');
      console.error('Error fetching comments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setSubmitting(true);
      if (editCommentId) {
        await commentsAPI.updateComment(editCommentId, newComment);
      } else {
        await commentsAPI.createComment({
          post_id: seminarId,
          content: newComment
        });
      }
      setNewComment('');
      setEditCommentId(null);
      fetchComments();
    } catch (err) {
      setError('Failed to post comment. Please try again later.');
      console.error('Error posting comment:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await commentsAPI.deleteComment(commentId);
      fetchComments();
    } catch (err) {
      setError('Failed to delete comment. Please try again later.');
      console.error('Error deleting comment:', err);
    }
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-32">
  //       <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="rounded-2xl border border-zinc-200/90 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center text-xl font-semibold text-zinc-950 dark:text-zinc-50">
          <MessageSquare className="mr-2 h-5 w-5 text-violet-600 dark:text-violet-400" />
          Comments
        </h3>
        {/* <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <Filter className="h-4 w-4 mr-1" />
            Filters
          </button>
          {isHost && (
            <button
              onClick={handleExportComments}
              className="flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </button>
          )}
        </div> */}
      </div>

      <form ref={commentFormRef} onSubmit={handleSubmitComment} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Leave a comment..."
          className="w-full rounded-xl border-2 border-zinc-200 bg-white p-3 text-zinc-900 placeholder:text-zinc-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
          rows="3"
        />
        <div className="mt-2 flex justify-end gap-2">
          {editCommentId ? (
            <button
              type="button"
              onClick={() => {
                setEditCommentId(null);
                setNewComment('');
              }}
              className="rounded-xl border-2 border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Cancel edit
            </button>
          ) : null}
          <button
            type="submit"
            disabled={submitting || !newComment.trim()}
            className="rounded-xl bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
          >
            {submitting ? 'Posting…' : editCommentId ? 'Update comment' : 'Post comment'}
          </button>
        </div>
      </form>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200/80 bg-red-50 p-4 text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
          {error}
        </div>
      )}

      {
        (() => {
          if (loading) {
            return (
              <div className="flex h-32 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-200 border-t-violet-600 dark:border-zinc-700 dark:border-t-violet-400" />
              </div>
            );
          } else {
            return <>
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="rounded-xl border border-zinc-200/90 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/60"
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <div className="flex items-center">
                        {/* <img
                          src={comment.author.avatar || 'https://via.placeholder.com/40'}
                          alt={comment.author.name}
                          className="h-8 w-8 rounded-full mr-3"
                        /> */}
                        <Gavatar email={comment.author.email} size={40} className="mr-3 h-8 w-8 rounded-full ring-2 ring-zinc-100 dark:ring-zinc-800" />
                        <div>
                          <div className="font-medium text-zinc-900 dark:text-white">{comment.author.name}</div>
                          <div className="text-sm text-zinc-500 dark:text-zinc-400">
                            {new Date(comment.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      {isHost && (
                        <button
                          type="button"
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-sm font-semibold text-rose-600 hover:text-rose-500 dark:text-rose-400"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                    <div className="prose prose-zinc mb-3 max-w-none dark:prose-invert">{comment.content}</div>
                    <div className="flex items-center space-x-4 text-sm text-zinc-500 dark:text-zinc-400">
                      {/* <button className="flex items-center hover:text-gray-700 dark:hover:text-gray-300">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Like
                      </button> */}
                      <button type="button" disabled className="flex cursor-not-allowed items-center text-zinc-400 dark:text-zinc-600">
                        <Flag className="h-4 w-4 mr-1" />
                        Report
                      </button>
                      {/* { JSON.stringify(comment.author.id) }
                      { JSON.stringify(userData.id) } */}
                      {parseInt(comment.author.id) === userData.id && (
                        <button onClick={ (e) => {
                          e.preventDefault();
                          setNewComment(comment.content);
                          setEditCommentId(comment.id);
                          commentFormRef.current.scrollIntoView({ behavior: 'smooth' });
                        } }
                          className="flex items-center font-semibold text-violet-600 hover:text-violet-500 dark:text-violet-400"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </button>
                      )}
                      {/* {comment.rating && (
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          {comment.rating}/5
                        </div>
                      )} */}
                    </div>
                  </div>
                ))}
              </div>
            </>
          }
        })()
      }
    </div>
  );
} 