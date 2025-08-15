'use client';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { FaSpinner } from 'react-icons/fa';
import Sidebar from '@/components/Dashboard/Sidebar/Sidebar';
import Topbar from '@/components/Dashboard/Sidebar/Topbar';
import { AuthProvider, useAuthProvider } from '@/components/context/AuthContext';
import './globals.css';

function DashboardLayout({ children }) {
  const { user, loading } = useAuthProvider();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-3xl text-blue-600" />
      </div>
    );
  }


  if (pathname.startsWith('/') && user?.email) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <div className={clsx(isSidebarOpen ? 'block' : 'hidden', 'md:block')}>
          <Sidebar isMobile={isMobile} toggleSidebarLayout={toggleSidebar} />
        </div>
        <div
          className={clsx(
            'flex-1 flex flex-col',
            'transition-all duration-300 ease-in-out',
            'mr-1 lg:ml-0 overflow-x-hidden'
          )}
        >
          <Topbar toggleSidebar={toggleSidebar} />
          <main className="flex-1 p-4 md:p-6 bg-gray-50 md:w-full">{children}</main>
        </div>
      </div>
    );
  }

  // Otherwise just render the page content
  return children;
}




// Root layout wraps everything with AuthProvider
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='font-poppins'>
        <AuthProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
