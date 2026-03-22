import { useState, useEffect } from 'react';
import { challengesAPI } from '../../api/apiService';
import CategoryFilter from './CategoryFilter';
import Pagination from '../common/Pagination';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { useNavigate, useLocation } from 'react-router-dom';
import ChallengeDetail from './ChallengeDetail';
import { format } from 'date-fns';
const ChallengesList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [challenges, setChallenges] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const getLocalPathname = () => {
    return location.pathname;
  }

  let localPathname = getLocalPathname();

  useEffect(() => {
    if (localPathname.includes('challenges')) {
      const challengeId = localPathname.split('/').pop();
      if(challengeId == 'challenges') {
        setSelectedChallenge(null);
        return;
      }
      setSelectedChallenge(challengeId);
    }

  }, [localPathname]);

  const fetchChallenges = async (page = 1, categoryId = null) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const params = {
        per_page: 12,
        page,
        ...(categoryId && { challenge_category: categoryId })
      };

      const response = await challengesAPI.getChallenges(params);
      setChallenges(response.data);
      // console.log(response.headers);
      // Update pagination from response headers
      setPagination({
        currentPage: page,
        totalPages: parseInt(response.headers['x-wp-totalpages']),
        total: parseInt(response.headers['x-wp-total'])
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch challenges');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenges(1, selectedCategory);
  }, [selectedCategory]);

  const handlePageChange = (page) => {
    fetchChallenges(page, selectedCategory);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  if (error) {
    return <ErrorMessage message={error} />;
  }

  const handleChallengeClick = (challengeId) => {
    navigate(`/dashboard/challenges/${challengeId}`);
  };

  return (
    <div className="w-full">
      {(() => {
        if (selectedChallenge) {
          return <ChallengeDetail challengeId={selectedChallenge} />;
        }
        return (
          <>
            <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />

            {isLoading ? (
              <div className="flex min-h-[12rem] items-center justify-center">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <>
                <div className="mb-8 overflow-x-auto rounded-2xl border border-zinc-200/90 dark:border-zinc-800">
                  <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
                    <thead className="bg-zinc-50 dark:bg-zinc-900/80">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
                        >
                          Challenge
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
                        >
                          Created
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
                        >
                          Points
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
                        >
                          Deadline
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-800 dark:bg-zinc-950/40">
                      {challenges.map((challenge) => (
                        <tr
                          key={challenge.id}
                          className="cursor-pointer transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/60"
                          onClick={() => handleChallengeClick(challenge.id)}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              {challenge.featured_media && (
                                <div className="mr-4 h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-zinc-200 dark:border-zinc-700">
                                  <img src={challenge.featured_media.thumbnail} alt="" className="h-full w-full object-cover" />
                                </div>
                              )}
                              <div
                                className="font-medium text-zinc-900 dark:text-zinc-100"
                                dangerouslySetInnerHTML={{ __html: challenge.title.rendered }}
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-300">
                            {format(new Date(challenge.date), 'dd/MM/yyyy HH:mm')}
                          </td>
                          <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-300">
                            {challenge.challenge_category && challenge.challenge_category.map((c) => c.name).join(', ')}
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold text-violet-600 dark:text-violet-400">
                            {challenge.max_score} pts
                          </td>
                          <td className="px-6 py-4 text-sm">
                            {challenge.submission_deadline_enabled ? (
                              new Date(challenge.submission_deadline) < new Date() ? (
                                <span className="font-medium text-rose-600 dark:text-rose-400">Expired</span>
                              ) : (
                                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                                  {new Date(challenge.submission_deadline).toLocaleDateString()}
                                </span>
                              )
                            ) : (
                              <span className="text-zinc-500 dark:text-zinc-400">No deadline</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                  
                {pagination.totalPages > 1 && (
                  <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </>
        );
      })()}
    </div>
  );
};

export default ChallengesList; 