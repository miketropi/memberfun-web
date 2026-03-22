import { useEffect, useState } from 'react';
import { pointsAPI } from '../../api/apiService';
import UserRank from '../UserRank';
import Modal from '../Modal';
import UserHistoryActivityPoints from '../common/UserHistoryActivityPoints';
import Pagination from '../common/Pagination';

/**
 * Leaderboard Tab
 * @returns {JSX.Element}
 * 
 * leaderboard is a list of users with their points
 *  - rank
 *  - user_id
 *  - total
 *  - user_info
 *    - id
 *    - name
 *    - email
 *    - avatar
 * 
 * pagination is the total number of pages
 * page is the current page
 * perPage is the number of items per page
 */

export default function LeaderboardTab() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [perPage] = useState(20);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    useEffect(() => {
        const fetchLeaderboard = async () => {
            setLoading(true);
            try {
                const response = await pointsAPI.getLeaderboard({
                    page,
                    per_page: perPage,
                });
                console.log(response);
                setLeaderboard(response.leaderboard);
                setTotalPages(response.pagination.total_pages);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, [page, perPage]);

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-2 border-zinc-200 border-t-violet-600 dark:border-zinc-700 dark:border-t-violet-400" />
            </div>
        );
    }

    if (!leaderboard || leaderboard.length === 0) {
        return (
            <div className="rounded-2xl border border-zinc-200/90 bg-zinc-50/80 p-8 text-center dark:border-zinc-800 dark:bg-zinc-900/40">
                <p className="text-zinc-500 dark:text-zinc-400">No leaderboard data available.</p>
            </div>
        );
    }

    return (
        <>
          <div>
              <h1 className="mb-6 text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">Leaderboard</h1>

              <div className="overflow-x-auto rounded-2xl border border-zinc-200/90 dark:border-zinc-800">
                  <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
                      <thead className="bg-zinc-50 dark:bg-zinc-900/80">
                          <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                  Rank
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                  User
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                  Points
                              </th>
                              {/** history activity */}
                              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                  History
                              </th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-800 dark:bg-zinc-950/40">
                          {leaderboard.map((entry) => (
                              <tr key={entry.user_id} className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/60">
                                  <td className="px-6 py-4 whitespace-nowrap">
                                      <UserRank rank={entry.rank} />
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4">
                                      <div className="flex items-center">
                                          <div className="h-10 w-10 flex-shrink-0">
                                              <img
                                                  className="h-10 w-10 rounded-full ring-2 ring-zinc-100 dark:ring-zinc-800"
                                                  src={entry.user_info.avatar || 'default-avatar.png'}
                                                  alt=""
                                              />
                                          </div>
                                          <div className="ml-4">
                                              <div className="text-sm font-medium text-zinc-900 dark:text-white">{entry.user_info.name}</div>
                                              <div className="text-sm text-zinc-500 dark:text-zinc-400">{entry.user_info.email}</div>
                                          </div>
                                      </div>
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4">
                                      <div className="text-sm font-semibold text-zinc-900 dark:text-white">{entry.total} pts</div>
                                  </td>
                                  {/** history activity */}
                                  <td className="whitespace-nowrap px-6 py-4">
                                      <div className="text-sm font-semibold text-zinc-900 dark:text-white">
                                          <button
                                            type="button"
                                            className="font-semibold text-violet-600 hover:text-violet-500 dark:text-violet-400"
                                            onClick={() => {
                                                setSelectedUser(entry.user_id);
                                                setIsModalOpen(true);
                                            }}
                                          >
                                            View
                                          </button>
                                      </div>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8">
                  <Pagination
                    totalPages={totalPages}
                    currentPage={page}
                    onPageChange={setPage}
                  />
                </div>
              )}
              {/* <div className="flex justify-center mt-6">
                  <nav className="flex items-center space-x-2">
                      <button
                          onClick={() => setPage(Math.max(1, page - 1))}
                          disabled={page === 1}
                          className="px-3 py-1 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                      >
                          Previous
                      </button>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                          Page {page} of {totalPages}
                      </span>
                      <button
                          onClick={() => setPage(Math.min(totalPages, page + 1))}
                          disabled={page === totalPages}
                          className="px-3 py-1 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                      >
                          Next
                      </button>
                  </nav>
              </div> */}

          </div>
          <Modal 
            isOpen={isModalOpen} 
            size="xl"
            onClose={() => {
              setIsModalOpen(false);
              setSelectedUser(null);
            }}
            title={ `History Activity of ${leaderboard?.find(user => user.user_id === selectedUser)?.user_info?.name || 'User'}` }
          >
            {
              selectedUser && (
                <UserHistoryActivityPoints user_id={selectedUser} />
              )
            }
          </Modal>
        </>
    );
}