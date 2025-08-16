// 'use client';


// import Image from 'next/image';
// import { FiMenu, FiUser } from 'react-icons/fi';
// import clsx from 'clsx';
// import { useAuthProvider } from '@/components/context/AuthContext';


// export default function Topbar({ toggleSidebar }) {
//   const { user, loading } = useAuthProvider();

//   if (loading) {
//     return 'loading'
//   }

//   return (
//     <div
//       className={clsx(
//         "bg-white shadow px-6 py-4 flex justify-between items-center sticky top-0 z-40",
//         "transition-all duration-300 ease-in-out"
//       )}
//     >
//       <div className="flex items-center gap-4">
//         <button
//           className="text-2xl md:hidden text-gray-700 hover:text-indigo-600 transition-colors"
//           onClick={toggleSidebar}
//           aria-label="Toggle sidebar"
//         >
//           <FiMenu />
//         </button>
//         <h1 className="text-[13px] md:text-xl font-semibold text-gray-800 ml-[20px] md:ml-0">
//           {user?.role === 'user'
//             ? 'স্বাগতম ইউজার!'
//             : user?.role === 'admin'
//             ? 'স্বাগতম অ্যাডমিন!'
//             : 'Dashboard'}
//         </h1>
//       </div>

//       <div className="flex items-center gap-4">
//         {loading ? (
//           <div className="animate-pulse bg-gray-200 rounded-full w-32 h-8"></div>
//         ) : (
//           <>

//             <button
//               className={clsx(
//                 "flex items-center gap-2 px-4 py-2 rounded-full",
//                 "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors"
//               )}
//             >
//               {user?.image ? (
//                 <Image
//                   alt="profile"
//                   src={user.image}
//                   width={30}
//                   height={30}
//                   className="rounded-full w-7 h-7 object-cover"
//                 />
//               ) : (
//                 <FiUser className="text-indigo-600" />
//               )}
//               <span className="hidden md:inline-block font-medium">
//                 {user?.name || 'প্রোফাইল'}
//               </span>
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }













// 'use client';


// import Image from 'next/image';
// import { FiMenu, FiUser } from 'react-icons/fi';
// import clsx from 'clsx';
// import { useAuthProvider } from '../../../../src/components/context/AuthContext';


// export default function Topbar({ toggleSidebar }) {
//   const { user, loading } = useAuthProvider();

//   if (loading) {
//     return 'loading'
//   }

//   return (
//     <div
//       className={clsx(
//         " shadow px-6 py-4 flex justify-between items-center sticky top-0 z-40",
//         "transition-all duration-300 ease-in-out"
//       )}
//     >
//       <div className="flex items-center gap-4">
//         <button
//           className="text-2xl md:hidden text-gray-700 hover:text-indigo-600 transition-colors"
//           onClick={toggleSidebar}
//           aria-label="Toggle sidebar"
//         >
//           <FiMenu />
//         </button>
//         <h1 className="text-[13px] md:text-xl font-semibold text-gray-800 ml-[20px] md:ml-0">
//           {user?.role === 'user'
//             ? 'স্বাগতম ইউজার!'
//             : user?.role === 'admin'
//             ? 'স্বাগতম অ্যাডমিন!'
//             : 'Dashboard'}
//         </h1>
//       </div>

//       <div className="flex items-center gap-4">
//         {loading ? (
//           <div className="animate-pulse bg-gray-200 rounded-full w-32 h-8"></div>
//         ) : (
//           <>

//             <button
//               className={clsx(
//                 "flex items-center gap-2 px-4 py-2 rounded-full",
//                 "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors"
//               )}
//             >
//               {user?.image ? (
//                 <Image
//                   alt="profile"
//                   src={user.image}
//                   width={30}
//                   height={30}
//                   className="rounded-full w-7 h-7 object-cover"
//                 />
//               ) : (
//                 <FiUser className="text-indigo-600" />
//               )}
//               <span className="hidden md:inline-block font-medium">
//                 {user?.name || 'প্রোফাইল'}
//               </span>
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }



























'use client';

import Image from 'next/image';
import { FiMenu, FiUser, FiLogOut } from 'react-icons/fi';
import clsx from 'clsx';
import { useAuthProvider } from '../../../../src/components/context/AuthContext';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function Topbar({ toggleSidebar }) {
  const { user, loading, logout } = useAuthProvider();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      router.push('/login');
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
    <div className={clsx(
      "glass-container shadow px-6 py-[14px] flex justify-between items-center sticky top-0 z-40",
      "transition-all duration-300 ease-in-out border-b border-white/20"
    )}>
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
            : 'Dashboard'}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {loading ? (
          <div className="animate-pulse bg-white/20 rounded-full w-32 h-8"></div>
        ) : (
          <Menu as="div" className="relative">
            <Menu.Button className={clsx(
              "flex items-center gap-2 px-4 py-2 rounded-full",
              "bg-white/10 text-white hover:bg-white/20 transition-colors"
            )}>
              {user?.image ? (
                <Image
                  alt="profile"
                  src={user.image}
                  width={30}
                  height={30}
                  className="rounded-full w-7 h-7 object-cover"
                />
              ) : (
                <FiUser />
              )}
              <span className="hidden md:inline-block font-medium">
                {user?.name || 'Profile'}
              </span>
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right glass-container rounded-lg shadow-lg border border-white/20 focus:outline-none p-1">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-white/10 text-white' : 'text-white'
                        } group flex w-full items-center rounded-md px-4 py-2 text-sm gap-2`}
                        onClick={handleLogout}
                      >
                        <FiLogOut className="mr-2" />
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
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