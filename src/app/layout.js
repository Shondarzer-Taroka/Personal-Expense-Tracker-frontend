'use client';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { FaSpinner } from 'react-icons/fa';
import Sidebar from '../../src/components/Dashboard/Sidebar/Sidebar';
import Topbar from '../../src/components/Dashboard/Sidebar/Topbar';
import { AuthProvider, useAuthProvider } from '../../src/components/context/AuthContext';
import './globals.css';
import { ExpenseProvider } from './context/ExpenseContext';
import bgImage  from "../assets/44417037_9057765.jpg";

import SkeletonLogin, { ExpenseFormSkeleton, ExpensePieChartSkeleton, ExpensesFullSkeleton } from "../components/SkeletoUI/SkeletonFilterAndPagination";

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
      <div className="flex min-h-screen overflow-hidden">
        {/* Sidebar skeleton */}
        <div className="w-64 bg-gray-100 p-4 animate-pulse hidden md:block">
          <div className="h-10 bg-gray-300 rounded mb-6"></div>
          <div className="space-y-4">
            <div className="h-6 bg-gray-300 rounded"></div>
            <div className="h-6 bg-gray-300 rounded"></div>
            <div className="h-6 bg-gray-300 rounded"></div>
            <div className="h-6 bg-gray-300 rounded"></div>
            <div className="h-6 bg-gray-300 rounded"></div>
          </div>
        </div>

        {/* Main content skeleton */}
        <div className="flex-1 flex flex-col animate-pulse overflow-hidden">
          {/* Topbar skeleton */}
          <div className="flex items-center justify-between px-6 py-4 border-gray-300 border-b">
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>
            <div className="h-10 w-32 bg-gray-300 rounded-full"></div>
          </div>

          {/* Content area */}
          <div className="p-6">
            <div className="flex-1 p-6">
              {pathname === "/expenses" && <ExpensesFullSkeleton />}
              {pathname === "/createExpenses" && <ExpenseFormSkeleton />}
              {pathname === "/" && <ExpensePieChartSkeleton />}
              {/* {pathname === "/login" && <SkeletonLogin />} */}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (pathname.startsWith('/') && user?.email) {
    return (
      <>
        {/* 🔥 Background Image Layer */}
        <div
          className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${'https://i.ibb.co.com/MkjbGZXc/15364605-5607654.jpg'})` }} 
        >
          {/* Overlay for dim/blur effect */}
          <div className="absolute inset-0  backdrop-blur-sm"></div>
        </div>

        <div className="flex min-h-screen">
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
            <main className="flex-1 p-4 md:p-6  backdrop-blur-sm rounded-tl-lg shadow-sm md:w-full">
              {children}
            </main>
          </div>
        </div>
      </>
    );
  }

  // Otherwise just render the page content
  return children;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-poppins">
        <AuthProvider>
          <ExpenseProvider>
            <DashboardLayout>{children}</DashboardLayout>
          </ExpenseProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
