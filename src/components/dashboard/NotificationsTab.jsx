import React from 'react';

const NotificationsTab = ({ notifications = [], markAsRead, markAllAsRead }) => {
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">Notifications</h2>
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllAsRead}
            className="text-sm font-semibold text-violet-600 hover:text-violet-500 dark:text-violet-400"
          >
            Mark all as read
          </button>
        )}
      </div>
      
      {notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <NotificationItem 
              key={notification.id} 
              notification={notification} 
              markAsRead={markAsRead} 
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-200/90 bg-zinc-50/80 py-10 text-center dark:border-zinc-800 dark:bg-zinc-900/40">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4 h-12 w-12 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <p className="text-zinc-500 dark:text-zinc-400">No notifications to display.</p>
        </div>
      )}
    </div>
  );
};

const NotificationItem = ({ notification, markAsRead }) => {
  const formattedDate = new Date(notification.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  return (
    <div
      className={`rounded-xl border p-4 ${
        notification.read
          ? 'border-zinc-200/90 bg-white dark:border-zinc-800 dark:bg-zinc-900/40'
          : 'border-violet-200/80 bg-violet-50/90 dark:border-violet-900/50 dark:bg-violet-950/30'
      }`}
    >
      <div className="flex justify-between gap-4">
        <div>
          <p
            className={
              notification.read
                ? 'text-zinc-700 dark:text-zinc-300'
                : 'font-medium text-zinc-900 dark:text-zinc-50'
            }
          >
            {notification.message}
          </p>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{formattedDate}</p>
        </div>
        {!notification.read && (
          <button
            type="button"
            onClick={() => markAsRead(notification.id)}
            className="shrink-0 text-sm font-semibold text-violet-600 hover:text-violet-500 dark:text-violet-400"
          >
            Mark as read
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationsTab; 