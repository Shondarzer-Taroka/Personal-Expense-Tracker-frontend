// // app/components/Expenses/ExpensesListSkeleton.jsx
// 'use client';

// import React from 'react';

// // Filter & Pagination Skeleton
// export function SkeletonFilterAndPagination() {
//   return (
//     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gradient-to-r from-gray-50 to-gray-50 border-gray-300 border-b animate-pulse">
//       <div className="h-10 w-40 bg-gray-200 rounded-lg mb-4 sm:mb-0"></div>
//       <div className="flex items-center space-x-4">
//         <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
//         <div className="h-4 w-24 bg-gray-200 rounded"></div>
//         <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
//       </div>
//     </div>
//   );
// }

// // Table row skeleton
// export function SkeletonRow() {
//   return (
//     <tr className="animate-pulse">
//       <td className="px-6 py-4 whitespace-nowrap">
//         <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap">
//         <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap">
//         <div className="h-6 bg-gray-200 rounded-full w-20"></div>
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap">
//         <div className="h-4 bg-gray-200 rounded w-24"></div>
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap">
//         <div className="flex space-x-3">
//           <div className="h-8 w-8 bg-gray-200 rounded-md"></div>
//           <div className="h-8 w-8 bg-gray-200 rounded-md"></div>
//         </div>
//       </td>
//     </tr>
//   );
// }

// // Table footer skeleton
// export function SkeletonFooter() {
//   return (
//     <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-gray-300 border-t animate-pulse">
//       <div className="h-4 w-40 bg-gray-200 rounded mb-2 sm:mb-0"></div>
//       <div className="flex space-x-2">
//         {Array.from({ length: 3 }).map((_, i) => (
//           <div key={i} className="h-8 w-8 bg-gray-200 rounded-md"></div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // Full Expenses List Skeleton
// export function ExpensesListSkeleton() {
//   return (
//     <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
//       <SkeletonFilterAndPagination />

//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {Array.from({ length: 5 }).map((_, index) => (
//               <SkeletonRow key={index} />
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <SkeletonFooter />
//     </div>
//   );
// }



// // // full page skeleton for expenses list
// import { motion } from 'framer-motion';
// export const ExpensesFullSkeleton = () => {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.3 }}
//       className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
//     >
//       {/* Filter & Pagination Skeleton */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
//         {/* Filter Button Skeleton */}
//         <div className="relative mb-4 sm:mb-0 w-full sm:w-auto">
//           <div className="h-10 bg-gray-200 rounded-lg w-full sm:w-48"></div>
//         </div>
        
//         {/* Pagination Controls Skeleton */}
//         <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-normal">
//           <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
//           <div className="h-4 w-24 bg-gray-200 rounded"></div>
//           <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
//         </div>
//       </div>

//       {/* Table Skeleton */}
//       <div className="overflow-hidden">
//         <div className="min-w-full">
//           <div className="border-b border-gray-200">
//             <div className="grid grid-cols-5 gap-4 px-6 py-3 bg-gray-50">
//               {['Title', 'Amount', 'Category', 'Date', 'Actions'].map((text, index) => (
//                 <div
//                   key={index}
//                   className="text-left text-xs font-medium text-transparent uppercase tracking-wider"
//                 >
//                   <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           <div className="divide-y divide-gray-200">
//             {Array.from({ length: 5 }).map((_, rowIndex) => (
//               <div key={rowIndex} className="grid grid-cols-5 gap-4 px-6 py-4 animate-pulse">
//                 {/* Title */}
//                 <div className="flex items-center">
//                   <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//                 </div>
                
//                 {/* Amount */}
//                 <div className="flex items-center">
//                   <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//                 </div>
                
//                 {/* Category */}
//                 <div className="flex items-center">
//                   <div className="h-6 bg-gray-200 rounded-full w-20"></div>
//                 </div>
                
//                 {/* Date */}
//                 <div className="flex items-center">
//                   <div className="h-4 bg-gray-200 rounded w-24"></div>
//                 </div>
                
//                 {/* Actions */}
//                 <div className="flex items-center space-x-3">
//                   <div className="h-8 w-8 bg-gray-200 rounded-md"></div>
//                   <div className="h-8 w-8 bg-gray-200 rounded-md"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Footer Skeleton */}
//       <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
//         <div className="h-4 bg-gray-200 rounded w-40 mb-2 sm:mb-0"></div>
//         <div className="flex space-x-2">
//           {Array.from({ length: 5 }).map((_, i) => (
//             <div 
//               key={i}
//               className={`h-8 w-8 bg-gray-200 rounded-md ${i === 2 ? 'opacity-100' : 'opacity-50'}`}
//             ></div>
//           ))}
//         </div>
//       </div>
//     </motion.div>
//   );
// };



// // // skeleton for add form


// export const ExpenseFormSkeleton = () => {
//   return (
//     <div className="max-w-md mx-auto bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100 animate-pulse space-y-6">
      
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <div className="h-8 w-48 bg-gray-200 rounded-lg"></div>
//         <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
//       </div>

//       {/* Title Input */}
//       <div>
//         <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
//         <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
//       </div>

//       {/* Amount Input */}
//       <div>
//         <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
//         <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
//       </div>

//       {/* Category Select */}
//       <div>
//         <div className="h-4 w-28 bg-gray-200 rounded mb-1"></div>
//         <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
//       </div>

//       {/* Date Picker */}
//       <div>
//         <div className="h-4 w-20 bg-gray-200 rounded mb-1"></div>
//         <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
//       </div>

//       {/* Submit Button */}
//       <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
//     </div>
//   );
// };







// export const ExpensePieChartSkeleton = () => {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.3 }}
//       className="w-full h-full min-h-[300px] bg-gray-50 rounded-2xl p-4 shadow-sm border border-gray-200"
//     >
//       <div className="relative w-full h-full">
//         {/* Center circle */}
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 bg-gray-200 rounded-full animate-pulse"></div>
        
//         {/* Pie segments - matching the 6 colors from your actual chart */}
//         {[0, 1, 2, 3, 4, 5].map((i) => (
//           <div
//             key={i}
//             className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
//             style={{
//               width: '100%',
//               height: '100%',
//               clipPath: `polygon(50% 50%, 50% 0%, ${50 + Math.sin((i * 60 * Math.PI) / 180) * 40}% ${
//                 50 - Math.cos((i * 60 * Math.PI) / 180) * 40
//               }%)`,
//             }}
//           >
//             <div
//               className="w-full h-full opacity-70"
//               style={{
//                 backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'][i],
//               }}
//             ></div>
//           </div>
//         ))}
        
//         {/* Legend skeleton */}
//         <div className="absolute bottom-0 left-0 right-0 flex flex-wrap justify-center gap-2 mt-4">
//           {['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'].map((color, i) => (
//             <div key={i} className="flex items-center mr-4 animate-pulse">
//               <div
//                 className="w-3 h-3 rounded-full mr-2"
//                 style={{ backgroundColor: color }}
//               ></div>
//               <div className="h-3 bg-gray-200 rounded w-16"></div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </motion.div>
//   );
// };







// // // side bar skeleton
// import clsx from 'clsx';
// export function SidebarSkeleton({ isCollapsed = false }) {
//   return (
//     <div className={clsx(
//       'glass-container h-screen fixed md:sticky md:top-0 z-50',
//       'transition-all duration-300 ease-in-out',
//       'flex flex-col',
//       isCollapsed ? 'w-20' : 'w-64',
//       'border-r border-white/20'
//     )}>
//       {/* Sidebar Header Skeleton */}
//       <div className={clsx(
//         'glass-container-inner p-4 border-b border-white/20',
//         'flex items-center justify-between',
//         isCollapsed ? 'flex-col gap-4' : 'flex-row'
//       )}>
//         {!isCollapsed && (
//           <div className="h-6 w-32 bg-white/20 rounded animate-pulse"></div>
//         )}
//         <div className={clsx(
//           'flex items-center',
//           isCollapsed ? 'flex-col gap-4' : 'gap-2'
//         )}>
//           <div className="h-8 w-8 bg-white/20 rounded-full animate-pulse"></div>
//         </div>
//       </div>

//       {/* Sidebar Links Skeleton */}
//       <nav className="flex-1 overflow-y-auto custom-scrollbar">
//         <ul className={clsx(
//           'space-y-2',
//           isCollapsed ? 'px-2 py-4' : 'p-2'
//         )}>
//           {[1, 2, 3].map((item) => (
//             <li key={item}>
//               <div className={clsx(
//                 'flex items-center hover:bg-white/10 rounded-lg transition',
//                 isCollapsed ? 'justify-center p-3' : 'gap-3 p-2 md:p-3'
//               )}>
//                 <div className="h-5 w-5 bg-white/20 rounded-full animate-pulse"></div>
//                 {!isCollapsed && (
//                   <div className="h-4 w-24 bg-white/20 rounded animate-pulse"></div>
//                 )}
//               </div>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       {/* Sidebar Footer Skeleton */}
//       <div className={clsx(
//         'glass-container-inner p-4 border-t border-white/20',
//         'flex items-center',
//         isCollapsed ? 'justify-center' : 'justify-between'
//       )}>
//         {!isCollapsed && (
//           <div className="space-y-1">
//             <div className="h-4 w-24 bg-white/20 rounded animate-pulse"></div>
//           </div>
//         )}
//         <div className="w-8 h-8 rounded-full bg-white/20 animate-pulse"></div>
//       </div>

//       <style jsx>{`
//         .glass-container {
//           background: rgba(255, 255, 255, 0.1);
//           backdrop-filter: blur(12px);
//           -webkit-backdrop-filter: blur(12px);
//         }
//         .glass-container-inner {
//           background: rgba(255, 255, 255, 0.05);
//           backdrop-filter: blur(8px);
//           -webkit-backdrop-filter: blur(8px);
//         }
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 4px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: rgba(255, 255, 255, 0.1);
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: rgba(255, 255, 255, 0.2);
//           border-radius: 4px;
//         }
//       `}</style>
//     </div>
//   );
// }






// // for login 


// const SkeletonLogin = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
//       {/* Background (same as original) */}
//       <div className="absolute inset-0 overflow-hidden z-0">
//         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
//         <div className="absolute inset-0 bg-gradient-to-br"></div>
//       </div>

//       <div className="w-full max-w-md z-10">
//         <div className="glass-container p-8 rounded-2xl shadow-xl border border-white/20 backdrop-blur-lg">
//           {/* Title skeleton */}
//           <div className="h-8 w-32 bg-white/20 rounded-md mx-auto mb-6 animate-pulse"></div>
          
//           {/* Email field skeleton */}
//           <div className="space-y-2 mb-4">
//             <div className="h-4 w-16 bg-white/20 rounded-md animate-pulse"></div>
//             <div className="h-12 w-full bg-white/10 rounded-lg animate-pulse"></div>
//           </div>

//           {/* Password field skeleton */}
//           <div className="space-y-2 mb-6">
//             <div className="h-4 w-20 bg-white/20 rounded-md animate-pulse"></div>
//             <div className="h-12 w-full bg-white/10 rounded-lg animate-pulse"></div>
//           </div>

//           {/* Button skeleton */}
//           <div className="h-12 w-full bg-white/20 rounded-lg animate-pulse"></div>

//           {/* Link skeleton */}
//           <div className="mt-6 flex justify-center">
//             <div className="h-4 w-48 bg-white/10 rounded-md animate-pulse"></div>
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         .glass-container {
//           background: rgba(255, 255, 255, 0.1);
//           backdrop-filter: blur(10px);
//           -webkit-backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.2);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SkeletonLogin;

















'use client';

import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

// Filter & Pagination Skeleton with Glass Effect
export function SkeletonFilterAndPagination() {
  return (
    <div className="glass-container flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b border-white/20 animate-pulse">
      <div className="h-10 w-40 bg-white/20 rounded-lg mb-4 sm:mb-0"></div>
      <div className="flex items-center space-x-4">
        <div className="h-8 w-8 bg-white/20 rounded-full"></div>
        <div className="h-4 w-24 bg-white/20 rounded"></div>
        <div className="h-8 w-8 bg-white/20 rounded-full"></div>
      </div>
    </div>
  );
}

// Table row skeleton with Glass Effect
export function SkeletonRow() {
  return (
    <tr className="animate-pulse">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-white/20 rounded w-3/4"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-white/20 rounded w-1/2"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-6 bg-white/20 rounded-full w-20"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-white/20 rounded w-24"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex space-x-3">
          <div className="h-8 w-8 bg-white/20 rounded-md"></div>
          <div className="h-8 w-8 bg-white/20 rounded-md"></div>
        </div>
      </td>
    </tr>
  );
}

// Table footer skeleton with Glass Effect
export function SkeletonFooter() {
  return (
    <div className="glass-container flex flex-col sm:flex-row justify-between items-center p-4 border-t border-white/20 animate-pulse">
      <div className="h-4 w-40 bg-white/20 rounded mb-2 sm:mb-0"></div>
      <div className="flex space-x-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-8 w-8 bg-white/20 rounded-md"></div>
        ))}
      </div>
    </div>
  );
}

// Full Expenses List Skeleton with Glass Effect
export function ExpensesListSkeleton() {
  return (
    <div className="glass-container rounded-xl shadow-sm overflow-hidden border border-white/20">
      <SkeletonFilterAndPagination />

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/20">
          <thead className="bg-white/10">
            <tr>
              {['Title', 'Amount', 'Category', 'Date', 'Actions'].map((text, index) => (
                <th key={index} className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                  <div className="h-4 bg-white/20 rounded w-3/4"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/20">
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonRow key={index} />
            ))}
          </tbody>
        </table>
      </div>

      <SkeletonFooter />
    </div>
  );
}

// Full page skeleton for expenses list with Glass Effect
export const ExpensesFullSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="glass-container rounded-xl shadow-sm overflow-hidden border border-white/20"
    >
      {/* Filter & Pagination Skeleton */}
      <div className="glass-container-inner flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b border-white/20">
        {/* Filter Button Skeleton */}
        <div className="relative mb-4 sm:mb-0 w-full sm:w-auto">
          <div className="h-10 bg-white/20 rounded-lg w-full sm:w-48 animate-pulse"></div>
        </div>
        
        {/* Pagination Controls Skeleton */}
        <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-normal">
          <div className="h-8 w-8 bg-white/20 rounded-full animate-pulse"></div>
          <div className="h-4 w-24 bg-white/20 rounded animate-pulse"></div>
          <div className="h-8 w-8 bg-white/20 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="overflow-hidden">
        <div className="min-w-full">
          <div className="border-b border-white/20">
            <div className="grid grid-cols-5 gap-4 px-6 py-3 bg-white/10">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-4 bg-white/20 rounded w-3/4 animate-pulse"></div>
              ))}
            </div>
          </div>
          
          <div className="divide-y divide-white/20">
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-5 gap-4 px-6 py-4 animate-pulse">
                {Array.from({ length: 5 }).map((_, colIndex) => (
                  <div key={colIndex} className="flex items-center">
                    <div className={`h-4 bg-white/20 rounded ${
                      colIndex === 0 ? 'w-3/4' : 
                      colIndex === 1 ? 'w-1/2' : 
                      colIndex === 2 ? 'h-6 w-20 rounded-full' : 
                      colIndex === 3 ? 'w-24' : 
                      'flex space-x-3'
                    }`}>
                      {colIndex === 4 && (
                        <>
                          <div className="h-8 w-8 bg-white/20 rounded-md"></div>
                          <div className="h-8 w-8 bg-white/20 rounded-md"></div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="glass-container-inner flex flex-col sm:flex-row justify-between items-center p-4 border-t border-white/20">
        <div className="h-4 bg-white/20 rounded w-40 mb-2 sm:mb-0 animate-pulse"></div>
        <div className="flex space-x-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div 
              key={i}
              className={`h-8 w-8 bg-white/20 rounded-md ${i === 2 ? 'opacity-100' : 'opacity-50'} animate-pulse`}
            ></div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Skeleton for add form with Glass Effect
export const ExpenseFormSkeleton = () => {
  return (
    <div className="glass-container max-w-md mx-auto p-8 rounded-2xl shadow-lg border border-white/20 animate-pulse space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-8 w-48 bg-white/20 rounded-lg"></div>
        <div className="h-8 w-8 bg-white/20 rounded-full"></div>
      </div>

      {/* Input fields */}
      {['Title', 'Amount', 'Category', 'Date'].map((label) => (
        <div key={label}>
          <div className="h-4 w-24 bg-white/20 rounded mb-1"></div>
          <div className="h-10 bg-white/10 rounded-lg w-full"></div>
        </div>
      ))}

      {/* Submit Button */}
      <div className="h-12 bg-white/20 rounded-lg w-full"></div>
    </div>
  );
};

// Pie Chart Skeleton with Glass Effect
export const ExpensePieChartSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="glass-container w-full h-full min-h-[300px] rounded-2xl p-4 border border-white/20"
    >
      <div className="relative w-full h-full">
        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 bg-white/20 rounded-full animate-pulse"></div>
        
        {/* Pie segments */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '100%',
              height: '100%',
              clipPath: `polygon(50% 50%, 50% 0%, ${50 + Math.sin((i * 60 * Math.PI) / 180) * 40}% ${
                50 - Math.cos((i * 60 * Math.PI) / 180) * 40
              }%)`,
            }}
          >
            <div className="w-full h-full opacity-70 bg-white/20"></div>
          </div>
        ))}
        
        {/* Legend skeleton */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-wrap justify-center gap-2 mt-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center mr-4 animate-pulse">
              <div className="w-3 h-3 rounded-full mr-2 bg-white/20"></div>
              <div className="h-3 bg-white/20 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Sidebar Skeleton with Glass Effect
export function SidebarSkeleton({ isCollapsed = false }) {
  return (
    <div className={clsx(
      'glass-container h-screen fixed md:sticky md:top-0 z-50',
      'transition-all duration-300 ease-in-out',
      'flex flex-col',
      isCollapsed ? 'w-20' : 'w-64',
      'border-r border-white/20'
    )}>
      {/* Sidebar Header Skeleton */}
      <div className={clsx(
        'glass-container-inner p-4 border-b border-white/20',
        'flex items-center justify-between',
        isCollapsed ? 'flex-col gap-4' : 'flex-row'
      )}>
        {!isCollapsed && (
          <div className="h-6 w-32 bg-white/20 rounded animate-pulse"></div>
        )}
        <div className={clsx(
          'flex items-center',
          isCollapsed ? 'flex-col gap-4' : 'gap-2'
        )}>
          <div className="h-8 w-8 bg-white/20 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Sidebar Links Skeleton */}
      <nav className="flex-1 overflow-y-auto">
        <ul className={clsx(
          'space-y-2',
          isCollapsed ? 'px-2 py-4' : 'p-2'
        )}>
          {[1, 2, 3].map((item) => (
            <li key={item}>
              <div className={clsx(
                'flex items-center hover:bg-white/10 rounded-lg transition',
                isCollapsed ? 'justify-center p-3' : 'gap-3 p-2 md:p-3'
              )}>
                <div className="h-5 w-5 bg-white/20 rounded-full animate-pulse"></div>
                {!isCollapsed && (
                  <div className="h-4 w-24 bg-white/20 rounded animate-pulse"></div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer Skeleton */}
      <div className={clsx(
        'glass-container-inner p-4 border-t border-white/20',
        'flex items-center',
        isCollapsed ? 'justify-center' : 'justify-between'
      )}>
        {!isCollapsed && (
          <div className="space-y-1">
            <div className="h-4 w-24 bg-white/20 rounded animate-pulse"></div>
          </div>
        )}
        <div className="w-8 h-8 rounded-full bg-white/20 animate-pulse"></div>
      </div>
    </div>
  );
}

// Login Skeleton with Glass Effect
export const SkeletonLogin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-indigo-900/30"></div>
      </div>

      <div className="w-full max-w-md z-10">
        <div className="glass-container p-8 rounded-2xl shadow-xl border border-white/20 backdrop-blur-lg">
          {/* Title skeleton */}
          <div className="h-8 w-32 bg-white/20 rounded-md mx-auto mb-6 animate-pulse"></div>
          
          {/* Email field skeleton */}
          <div className="space-y-2 mb-4">
            <div className="h-4 w-16 bg-white/20 rounded-md animate-pulse"></div>
            <div className="h-12 w-full bg-white/10 rounded-lg animate-pulse"></div>
          </div>

          {/* Password field skeleton */}
          <div className="space-y-2 mb-6">
            <div className="h-4 w-20 bg-white/20 rounded-md animate-pulse"></div>
            <div className="h-12 w-full bg-white/10 rounded-lg animate-pulse"></div>
          </div>

          {/* Button skeleton */}
          <div className="h-12 w-full bg-white/20 rounded-lg animate-pulse"></div>

          {/* Link skeleton */}
          <div className="mt-6 flex justify-center">
            <div className="h-4 w-48 bg-white/10 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Global styles for glass effect
export const GlassStyles = () => (
  <style jsx global>{`
    .glass-container {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .glass-container-inner {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }
  `}</style>
);