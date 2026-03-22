import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import useThemeStore from '../store/themeStore';

const Layout = () => {
  const { theme } = useThemeStore();
  
  useEffect(() => {
    // Apply theme to document element
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 