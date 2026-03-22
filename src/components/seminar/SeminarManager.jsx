import { useState, useEffect } from 'react';
import { seminarsAPI } from '../../api/apiService';
import { isPast, parseISO } from 'date-fns';
import SeminarTabs from './SeminarTabs';
import SeminarList from './SeminarList';
import SeminarDetails from './SeminarDetails';

export default function SeminarManager() {
  const [upcomingSeminars, setUpcomingSeminars] = useState([]);
  const [pastSeminars, setPastSeminars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedSeminar, setSelectedSeminar] = useState(null);
  const [registeredSeminars, setRegisteredSeminars] = useState([]);
  const [registrationLoading, setRegistrationLoading] = useState(false);
  const [, setPagination] = useState({
    total: 0,
    pages: 0,
    page: 1,
  });

  useEffect(() => {
    fetchSeminars();
  }, []);

  const fetchSeminars = async () => {
    try {
      setLoading(true);
      
      // Fetch upcoming seminars
      const upcomingData = await seminarsAPI.getUpcomingSeminars({
        limit: 10,
        offset: 0
      });
      setUpcomingSeminars(upcomingData || []);
      
      // Set pagination data if available
      if (upcomingData && upcomingData.length > 0 && 'total' in upcomingData) {
        setPagination({
          total: upcomingData.total || 0,
          pages: upcomingData.pages || 0,
          page: upcomingData.page || 1
        });
      }
      
      // Fetch past seminars (we'll need to create a custom endpoint for this or filter client-side)
      // For now, we'll just use the upcoming endpoint and filter client-side
      const allSeminars = await seminarsAPI.getUpcomingSeminars({
        limit: 50, // Get more to have enough past seminars
        offset: 0
      });
      
      // Filter past seminars client-side
      const past = (allSeminars || []).filter(seminar => 
        isPast(parseISO(seminar.date))
      );
      setPastSeminars(past);
      
      // // Fetch registered seminars
      // try {
      //   const registered = await seminarsAPI.getRegisteredSeminars();
      //   setRegisteredSeminars(registered.map(reg => reg.id));
      // } catch (regErr) {
      //   console.error('Error fetching registered seminars:', regErr);
      //   // Non-critical error, continue without registered seminars
      // }
      
      setLoading(false);
    } catch (err) {
      setError('Failed to load seminars. Please try again later.');
      setLoading(false);
      console.error('Error fetching seminars:', err);
    }
  };

  const handleSeminarClick = (seminar) => {
    setSelectedSeminar(seminar);
  };

  const handleRegister = async (seminarId) => {
    try {
      setRegistrationLoading(true);
      await seminarsAPI.registerForSeminar(seminarId, {});
      setRegisteredSeminars([...registeredSeminars, seminarId]);
      setRegistrationLoading(false);
    } catch (err) {
      console.error('Error registering for seminar:', err);
      setRegistrationLoading(false);
    }
  };

  const handleCancelRegistration = async (seminarId) => {
    try {
      setRegistrationLoading(true);
      await seminarsAPI.cancelRegistration(seminarId);
      setRegisteredSeminars(registeredSeminars.filter(id => id !== seminarId));
      setRegistrationLoading(false);
    } catch (err) {
      console.error('Error canceling registration:', err);
      setRegistrationLoading(false);
    }
  };

  const handleExportCalendar = async (seminarId) => {
    try {
      const blob = await seminarsAPI.exportToIcal(seminarId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `seminar-${seminarId}.ics`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error exporting calendar:', err);
    }
  };

  const isRegistered = (seminarId) => {
    return registeredSeminars.includes(seminarId);
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
        className="relative rounded-xl border border-red-200/80 bg-red-50 px-4 py-3 text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200"
        role="alert"
      >
        <strong className="font-semibold">Error</strong>
        <span className="mt-1 block sm:mt-0 sm:inline sm:before:content-['—_']">{error}</span>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-transparent">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
            Learning
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">Member seminars</h1>
        </div>
        <SeminarTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {selectedSeminar ? (
        <SeminarDetails
          seminar={selectedSeminar}
          onClose={() => setSelectedSeminar(null)}
          isRegistered={isRegistered(selectedSeminar.id)}
          onRegister={handleRegister}
          onCancelRegistration={handleCancelRegistration}
          onExportCalendar={handleExportCalendar}
          registrationLoading={registrationLoading}
        />
      ) : (
        <div>
          {activeTab === 'upcoming' && (
            <>
              <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">Upcoming seminars</h2>
              <SeminarList
                seminars={upcomingSeminars}
                onSeminarClick={handleSeminarClick}
                emptyMessage="No upcoming seminars available."
              />
            </>
          )}

          {activeTab === 'past' && (
            <>
              <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">Past seminars</h2>
              <SeminarList
                seminars={pastSeminars}
                onSeminarClick={handleSeminarClick}
                isPast={true}
                emptyMessage="No past seminars available."
              />
            </>
          )}
        </div>
      )}
    </div>
  );
} 