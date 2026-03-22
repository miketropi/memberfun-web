import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useUserStore from '../store/userStore';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardTabs from '../components/dashboard/DashboardTabs';
import OverviewTab from '../components/dashboard/OverviewTab';
import DocumentsTab from '../components/dashboard/DocumentsTab';
import NotificationsTab from '../components/dashboard/NotificationsTab';
import SettingsTab from '../components/dashboard/SettingsTab';
import LoadingSpinner from '../components/dashboard/LoadingSpinner';
import SeminarsTab from '../components/dashboard/SeminarsTab';
import ChallengesTab from '../components/challenges/ChallengesTab';
import LeaderboardTab from '../components/dashboard/LeaderboardTab';

const Dashboard = () => {
  const { isAuthenticated } = useAuthStore();
  const { userData, isLoading: userLoading, fetchUserData } = useUserStore();
  const location = useLocation();
  
  // Extract the active tab from the URL path
  const getActiveTabFromPath = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'overview';
    
    const segments = path.split('/');
    if (segments.length > 2) {
      return segments[2];
    }
    
    return 'overview';
  };
  
  const activeTab = getActiveTabFromPath();
  
  // Sample data - in a real app, this would likely come from an API
  const [notifications, setNotifications] = useState([
    { id: 1, read: false, message: 'Welcome to your dashboard!', date: '2023-03-15' },
    { id: 2, read: false, message: 'Your membership will renew in 30 days', date: '2023-03-14' },
    { id: 3, read: true, message: 'New document added to your library', date: '2023-03-10' },
  ]);
  
  const [documents] = useState([
    { id: 1, title: 'Membership Agreement', type: 'PDF', date: '2023-01-15', size: '1.2 MB' },
    { id: 2, title: 'Welcome Package', type: 'PDF', date: '2023-01-15', size: '3.5 MB' },
    { id: 3, title: 'Member Benefits Guide', type: 'PDF', date: '2023-02-10', size: '2.1 MB' },
    { id: 4, title: 'Community Guidelines', type: 'DOC', date: '2023-02-15', size: '0.8 MB' },
  ]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated, fetchUserData]);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Redirect to overview if at /dashboard
  if (location.pathname === '/dashboard') {
    return <Navigate to="/dashboard/overview" replace />;
  }

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  if (userLoading) {
    return <LoadingSpinner />;
  }

  // Render the appropriate tab content based on the URL parameter
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab userData={userData} />;
      case 'challenges':
        return <ChallengesTab />;
      case 'seminars':
        return <SeminarsTab />;
      case 'documents':
        return <DocumentsTab documents={documents} />;
      case 'notifications':
        return (
          <NotificationsTab 
            notifications={notifications} 
            markAsRead={markAsRead} 
            markAllAsRead={markAllAsRead} 
          />
        );
      case 'leaderboard':
        return <LeaderboardTab />;
      case 'settings':
        return <SettingsTab userData={userData} />;
      default:
        return <Navigate to="/dashboard/overview" replace />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-8 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <DashboardHeader userData={userData} />

        <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/85">
          <DashboardTabs />

          <div className="p-6 sm:p-8">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 