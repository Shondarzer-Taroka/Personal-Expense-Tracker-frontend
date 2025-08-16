

'use client';

import Image from 'next/image';
import { FiMenu, FiUser, FiLogOut } from 'react-icons/fi';
import clsx from 'clsx';
import { useAuthProvider } from '../../../../src/components/context/AuthContext';
import { toast } from 'react-hot-toast';

export default function Topbar({ toggleSidebar }) {
  const { user, loading } = useAuthProvider();
  console.log(user,'user');
  
  const handleLogout = async () => {
    try {
       const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/logout`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        credentials: "include", 
      
       })
      toast.success('Logged out successfully');
            window.location.href = "/login";
    } catch (error) {
      toast.error('Error logging out');
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="glass-container shadow px-6 py-4 flex justify-between items-center sticky top-0 z-40">
        <div className="animate-pulse text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "glass-container shadow px-6 py-[14px] flex justify-between items-center sticky top-0 z-40",
        "transition-all duration-300 ease-in-out border-b border-white/20"
      )}
    >
      {/* Left side */}
      <div className="flex items-center gap-4">
        <button
          className="text-2xl md:hidden text-white hover:text-white/80 transition-colors"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <FiMenu />
        </button>
        <h1 className="text-[13px] md:text-xl font-semibold text-white ml-[20px] md:ml-0">
          {user?.role === 'user'
            ? 'স্বাগতম ইউজার!'
            : user?.role === 'admin'
            ? 'স্বাগতম অ্যাডমিন!'
            : ''}
        </h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {user?.email ? (
          <div className="flex items-center gap-3">
            {/* Profile */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white">
              {user?.photo ? (
                <Image
                  alt="profile"
                  src={user?.photo}
                  width={30}
                  height={30}
                  className="rounded-full w-7 h-7 object-cover"
                />
              ) : (
                <FiUser className="text-lg" />
              )}
              <span className="hidden md:inline-block font-medium">
                {user?.name || 'Profile'}
              </span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white/10 t hover:bg-white/15 text-white text-sm transition"
            >
              <FiLogOut className="text-base" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        ) : (
          <div className="text-white">Please login</div>
        )}
      </div>

      <style jsx>{`
        .glass-container {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
      `}</style>
    </div>
  );
}
