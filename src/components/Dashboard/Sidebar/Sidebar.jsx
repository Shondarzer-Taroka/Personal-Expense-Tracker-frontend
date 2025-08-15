'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

import { 
  FiHome, FiEdit, FiUsers, FiPaperclip, FiUser,
  FiChevronLeft, FiChevronRight 
} from 'react-icons/fi';
import { 
  BookOpenCheck, BookOpenText, ClipboardPen, Newspaper, UserRoundPen 
} from 'lucide-react';
import { FaSquarePollVertical } from 'react-icons/fa6';
import { MdClose } from 'react-icons/md';
import { useAuthProvider } from '@/components/context/AuthContext';

const allLinks = [
  { label: 'Home', icon: <FiHome size={20} />, href: '/' },
  { label: 'Expenses Overview', icon: <UserRoundPen size={20} />, href: '/news/dashboard/myProfile'},
  { label: 'Add expenses', icon: <FiEdit size={20} />, href: '/news/dashboard/createNews' },
  { label: 'All expenses', icon: <FiUsers size={20} />, href: '/news/dashboard/allUsers'},
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
        'bg-indigo-900 text-white h-screen fixed md:sticky md:top-0 z-50',
        'transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-20' : 'w-64'
      )}>
        <div className="flex justify-center items-center h-full">
          <div className="animate-pulse">লোড হচ্ছে...</div>
        </div>
      </div>
    );
  }

  if (!user) return null;

//   const filteredLinks = allLinks.filter(link => link.roles.includes(user.role));

  return (
    <aside className={clsx(
      'bg-indigo-900 text-white h-screen fixed md:sticky md:top-0 z-50',
      'transition-all duration-300 ease-in-out',
      'flex flex-col',
      isCollapsed ? 'w-20' : 'w-64'
    )}>
      {/* Sidebar Header */}
      <div className={clsx(
        'p-4 border-b border-indigo-800',
        'flex items-center justify-between',
        isCollapsed ? 'flex-col gap-4' : 'flex-row'
      )}>
        {!isCollapsed && (
          <h2 className="text-xl font-bold whitespace-nowrap">
            <Link href={'/news/dashboard'}> ড্যাশবোর্ড </Link>
          </h2>
        )}

        <div className={clsx(
          'flex items-center',
          isCollapsed ? 'flex-col gap-4' : 'gap-2'
        )}>
          {isMobile && showCloseIcon && (
            <button
              onClick={toggleSidebarLayout}
              className="p-2 rounded-full hover:bg-indigo-800 transition-colors"
              aria-label="Close sidebar"
            >
              <MdClose size={20} />
            </button>
          )}

          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-indigo-800 transition-colors"
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
                  'flex items-center hover:bg-indigo-800 rounded-lg transition',
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
        'p-4 border-t border-indigo-800',
        'flex items-center',
        isCollapsed ? 'justify-center' : 'justify-between'
      )}>
        {!isCollapsed && (
          <div className="text-sm">
            <p className="font-medium">{user.name}</p>
            {/* <p className="text-indigo-300">{user.role}</p> */}
          </div>
        )}
        <div className="w-8 h-8 rounded-full bg-indigo-700 flex items-center justify-center">
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
    </aside>
  );
}
