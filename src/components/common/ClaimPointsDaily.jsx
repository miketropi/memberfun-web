import React, { useState, useEffect, useRef } from 'react';
import Toast from '../Toast';
import { Diamond } from 'lucide-react';
import useUserStore from '../../store/userStore';
import { pointsAPI } from '../../api/apiService';

const RandomNumberRoller = ({ min = 1, max = 100, speed = 100, className = '' }) => {
  const [number, setNumber] = React.useState(Math.floor(Math.random() * (max - min + 1)) + min);
  const intervalRef = React.useRef(null);

  React.useEffect(() => {
    intervalRef.current = setInterval(() => {
      setNumber(Math.floor(Math.random() * (max - min + 1)) + min);
    }, speed);
    return () => clearInterval(intervalRef.current);
  }, [min, max, speed]);

  return (
    <div className={`animate-pulse ${className}`}>
      {number}
    </div>
  );
};

const ClaimPointsDaily = ( { lastClaimDate = null, serverCurrentDate = null, updatedUserPoints } ) => {
  const { userData } = useUserStore();
  const [canClaim, setCanClaim] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [number, setNumber] = useState(0);
  const toastRef = useRef();

  useEffect(() => {
    // validate lastClaimDate
    // if (!lastClaimDate) {
    //   // set lastClaimDate to today
    //   lastClaimDate = new Date().toISOString().split('T')[0];
    // }

    // Check if user has claimed today
    // today is in format YYYY-MM-DD

    if(!serverCurrentDate) {
      setCanClaim(false);
      return;
    }

    const today = serverCurrentDate.split(' ')[0];

    // lastClaimDate is in format 2025-03-30 08:54:56 convert to YYYY-MM-DD
    const lastClaim = lastClaimDate ? lastClaimDate.split(' ')[0] : null;

    if (lastClaim === today) {
      console.log('can\'t claim');
      setCanClaim(false);
    } else {
      console.log('can claim');
      setCanClaim(true);
    }
  }, [lastClaimDate, serverCurrentDate]);

  const handleClaim = async () => {
    try {
      setIsLoading(true);
      
      // Call API to claim points
      const response = await pointsAPI.claimDailyPoints(userData.id);
      console.log(response);
      if (response.success) {
        // Update last claim date
        // localStorage.setItem('lastClaimDate', response.last_claim_date);
        // setLastClaimDate(response.last_claim_date);
        setCanClaim(false);
        setNumber(response.claim_points);
        // Update user points in store
        // validate updatedUserPoints
        if (typeof updatedUserPoints === 'function') {
          updatedUserPoints(response.user_points);
        }

        // Show success message with claimed points
        toastRef.current.show(`Successfully claimed ${response.claim_points} points!`, {
          type: 'success',
          duration: 3000,
          position: 'top-right'
        });
      } else {
        throw new Error('Failed to claim points');
      }
    } catch {
      toastRef.current.show('Failed to claim points. Please try again.', {
        type: 'error',
        duration: 3000,
        position: 'top-right'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getNextClaimTime = () => {
    // console.log(lastClaimDate, serverCurrentDate);
    if (!lastClaimDate) return null;
    
    const lastClaim = new Date(lastClaimDate);
    const tomorrow = new Date(lastClaim);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    // now from serverCurrentDate and format to YYYY-MM-DD
    const now = new Date(serverCurrentDate);
    const timeLeft = tomorrow - now;
    
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <>
      <Toast ref={toastRef} />
      {/* { lastClaimDate } */}
      
      {/* { button test claim points } */}
      {/* <button onClick={handleClaim}>Test Claim Points</button> */}
      {/* <RandomNumberRoller onPick={ (refFn) => {
        console.log(refFn);
        setTimeout(() => {
          refFn._setIsRolling(false);
          refFn._setFinalNumber(5);
        }, 3000);
      } } /> */}
      {/* { lastClaimDate } - { serverCurrentDate } */}
      <div className="grid w-full grid-cols-1 gap-4 overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 md:grid-cols-2 md:gap-6">
        <div className="relative flex flex-col justify-center bg-gradient-to-br from-zinc-900 via-violet-950 to-zinc-950 p-4 text-white md:p-6">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-500/20 via-transparent to-transparent" />
          <div className="relative">
            <h2 className="mb-2 text-lg font-bold md:text-xl">Daily points reward</h2>
            <p className="text-sm text-zinc-300 md:text-base">
              🎁 Login every day to claim your random points bonus! ✨ 🏆 Become a host for a{' '}
              <strong className="text-white">Seminar</strong> or join <strong className="text-white">Challenges</strong>{' '}
              to get more points! 🚀
            </p>
            <div className="mt-3 flex items-center md:mt-4">
              <div className="mr-2 h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-medium text-emerald-200 md:text-sm">
                {canClaim ? 'Available to claim now' : `Next claim in: ${getNextClaimTime()}`}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center bg-white p-4 dark:bg-zinc-900/40 md:p-6">
          {canClaim ? (
            <>
              <div className="mb-3 text-center md:mb-4">
                <div className="mb-2 inline-block rounded-full bg-violet-100 p-2 dark:bg-violet-950/60 md:p-3">
                  <Diamond className="h-6 w-6 text-violet-600 dark:text-violet-400 md:h-8 md:w-8" />
                </div>
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 md:text-base">
                  Ready to claim your daily points?
                </p>
              </div>
              <button
                type="button"
                className={`relative w-full rounded-xl bg-zinc-950 py-2 px-4 text-sm font-semibold text-white transition-all duration-200 ease-in-out md:py-3 md:px-6 md:text-base dark:bg-white dark:text-zinc-950 ${
                  isLoading ? 'cursor-not-allowed opacity-75' : 'hover:bg-zinc-800 hover:shadow-md dark:hover:bg-zinc-100'
                } disabled:cursor-not-allowed disabled:bg-zinc-400 dark:disabled:bg-zinc-600`}
                onClick={handleClaim}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-4 w-4 md:h-5 md:w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...(+<RandomNumberRoller className="font-bold mr-1" /> points)
                  </span>
                ) : (
                  'Claim Your Daily Points'
                )}
              </button>
            </>
          ) : (
            <div className="text-center">
              <div className="mb-3 inline-block rounded-full bg-zinc-100 p-2 dark:bg-zinc-800 md:mb-4 md:p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-zinc-500 dark:text-zinc-400 md:h-8 md:w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-100 md:text-lg">Points already claimed</h3>
              <p className="mb-2 text-sm text-zinc-600 dark:text-zinc-400 md:text-base">
                {number > 0
                  ? `You've claimed +${number} points today!`
                  : "You've already claimed your daily points!"}
              </p>
              <p className="text-sm font-semibold text-violet-600 dark:text-violet-400 md:text-base">
                Come back in {getNextClaimTime()}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ClaimPointsDaily;
