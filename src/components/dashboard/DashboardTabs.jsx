import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, FileText, Bell, Settings, Calendar, Gamepad2, Trophy } from 'lucide-react';

const DashboardTabs = () => {
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'home', path: '/dashboard/overview' },
    { id: 'challenges', label: 'Challenges', icon: 'gamepad', path: '/dashboard/challenges' },
    { id: 'seminars', label: 'Seminars', icon: 'calendar', path: '/dashboard/seminars' },
    // { id: 'documents', label: 'Documents', icon: 'document', path: '/dashboard/documents' },
    // { id: 'notifications', label: 'Notifications', icon: 'bell', badge: unreadCount, path: '/dashboard/notifications' },
    { id: 'leaderboard', label: 'Leaderboard', icon: 'trophy', path: '/dashboard/leaderboard' },
    { id: 'settings', label: 'Settings', icon: 'settings', path: '/dashboard/settings' }
  ];
  
  return (
    <div className="flex overflow-x-auto border-b border-zinc-200/90 bg-zinc-50/90 dark:border-zinc-800 dark:bg-zinc-950/40">
      {tabs.map((tab) => (
        <NavLink
          key={tab.id}
          to={tab.path}
          className={({ isActive }) =>
            [
              'relative flex shrink-0 items-center whitespace-nowrap border-b-2 px-5 py-4 text-sm font-semibold transition-colors sm:px-6',
              isActive
                ? 'border-violet-600 text-violet-700 dark:border-violet-400 dark:text-violet-300'
                : 'border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-200',
            ].join(' ')
          }
        >
          {getIcon(tab.icon)}
          <span className="ml-2">{tab.label}</span>
          {tab.badge > 0 && (
            <span className="ml-2 rounded-full bg-rose-500 px-2 py-0.5 text-xs font-semibold text-white">
              {tab.badge}
            </span>
          )}
        </NavLink>
      ))}
    </div>
  );
};

const getIcon = (iconName) => {
  switch (iconName) {
    case 'home':
      return <Home className="h-5 w-5" />;
    case 'gamepad':
      return <Gamepad2 className="h-5 w-5" />;
    case 'document':
      return <FileText className="h-5 w-5" />;
    case 'bell':
      return <Bell className="h-5 w-5" />;
    case 'settings':
      return <Settings className="h-5 w-5" />;
    case 'calendar':
      return <Calendar className="h-5 w-5" />;
    case 'trophy':
      return <Trophy className="h-5 w-5" />;
    default:
      return null;
  }
};

export default DashboardTabs;