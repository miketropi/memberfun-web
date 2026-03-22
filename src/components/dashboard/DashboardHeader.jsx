import React from 'react';

const DashboardHeader = ({ userData }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-gradient-to-br from-zinc-950 via-violet-950 to-zinc-900 p-6 text-white shadow-lg ring-1 ring-white/10 sm:p-8">
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="relative flex items-center justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-200/90">Member dashboard</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Welcome back, {userData?.name || 'User'}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-zinc-300 sm:text-base">
            Your membership is{' '}
            <span className="font-semibold text-white">
              {userData?.membershipStatus?.toLowerCase() || 'active'}
            </span>
            . Manage challenges, points, and account settings from here.
          </p>
        </div>
        {userData?.avatar && (
          <div className="hidden shrink-0 md:block">
            <img
              src={userData.avatar}
              alt={userData.name}
              className="h-16 w-16 rounded-full border-2 border-white/30 shadow-lg ring-2 ring-violet-400/40"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader; 