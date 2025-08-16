'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { 
  FiHome, FiEdit, FiUsers, FiPaperclip, FiUser,
  FiChevronLeft, FiChevronRight 
} from 'react-icons/fi';
import { 
  BookOpenCheck, BookOpenText, ClipboardPen, Newspaper, UserRoundPen, 
  Wallet
} from 'lucide-react';
import { FaSquarePollVertical } from 'react-icons/fa6';
import { MdClose } from 'react-icons/md';
import { useAuthProvider } from '../../../../src/components/context/AuthContext';

const allLinks = [
  { label: 'Over View', icon: <FiHome size={20} />, href: '/' },
  { label: 'Add expenses', icon: <FiEdit size={20} />, href: '/createExpenses' },
  { label: 'All expenses', icon: <Wallet size={20} />, href: '/expenses'},
];

export default function Sidebar({ isMobile, toggleSidebarLayout }) {
  const { loading, user } = useAuthProvider();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showCloseIcon, setShowCloseIcon] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    setShowCloseIcon(!showCloseIcon);
  };

  if (loading) {
    return (
      <div className={clsx(
        'glass-container h-screen fixed md:sticky md:top-0 z-50',
        'transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-20' : 'w-64',
        'border-r border-white/20'
      )}>
        <div className="flex justify-center items-center h-full">
          <div className="animate-pulse text-white">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <aside className={clsx(
      'glass-container h-screen fixed md:sticky md:top-0 z-50',
      'transition-all duration-300 ease-in-out',
      'flex flex-col',
      isCollapsed ? 'w-20' : 'w-64',
      'border-r border-white/20'
    )}>
      {/* Sidebar Header */}
      <div className={clsx(
        'glass-container-inner p-4 border-b border-white/20',
        'flex items-center justify-between',
        isCollapsed ? 'flex-col gap-4' : 'flex-row'
      )}>
        {!isCollapsed && (
          <h2 className="text-xl font-bold whitespace-nowrap text-white">
            <Link href={'/news/dashboard'}> Dashboard </Link>
          </h2>
        )}

        <div className={clsx(
          'flex items-center',
          isCollapsed ? 'flex-col gap-4' : 'gap-2'
        )}>
          {isMobile && showCloseIcon && (
            <button
              onClick={toggleSidebarLayout}
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
              aria-label="Close sidebar"
            >
              <MdClose size={20} />
            </button>
          )}

          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <FiChevronRight size={20} />
            ) : (
              <FiChevronLeft size={20} />
            )}
          </button>
        </div>
      </div>

      {/* Sidebar Links */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar">
        <ul className={clsx(
          'space-y-2',
          isCollapsed ? 'px-2 py-4' : 'p-2'
        )}>
          {allLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={clsx(
                  'flex items-center hover:bg-white/10 rounded-lg transition text-white',
                  isCollapsed ? 'justify-center p-3' : 'gap-3 p-2 md:p-3'
                )}
                title={isCollapsed ? link.label : undefined}
              >
                <span className="flex-shrink-0">{link.icon}</span>
                {!isCollapsed && (
                  <span className="whitespace-nowrap overflow-hidden">
                    {link.label}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className={clsx(
        'glass-container-inner p-4 border-t border-white/20',
        'flex items-center',
        isCollapsed ? 'justify-center' : 'justify-between'
      )}>
        {!isCollapsed && (
          <div className="text-sm text-white">
            <p className="font-medium">{user.name}</p>
          </div>
        )}
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
          {user.image ? (
            <Image
              src={user.image}
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full w-[32px] h-[32px]"
            />
          ) : (
            <FiUser size={16} />
          )}
        </div>
      </div>

      <style jsx>{`
        .glass-container {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .glass-container-inner {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
      `}</style>
    </aside>
  );
}