// // useAlert.js
// 'use client';

// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// export const useAlert = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [alertType, setAlertType] = useState('info');
//   const [alertOptions, setAlertOptions] = useState({
//     title: '',
//     message: '',
//     confirmText: 'OK',
//     cancelText: 'Cancel',
//   });

//   const showAlert = (type, options) => {
//     setAlertType(type);
//     setAlertOptions({
//       title: options.title,
//       message: options.message,
//       confirmText: options.confirmText || 'OK',
//       cancelText: options.cancelText || 'Cancel',
//       onConfirm: options.onConfirm || (() => setIsOpen(false)),
//       onCancel: options.onCancel || (() => setIsOpen(false)),
//     });
//     setIsOpen(true);
//   };

//   const AlertDialog = () => {
//     // Static Tailwind mapping
//     const colorClasses = {
//       success: {
//         border: 'border-green-500',
//         button: 'bg-green-600 hover:bg-green-700',
//       },
//       error: {
//         border: 'border-red-500',
//         button: 'bg-red-600 hover:bg-red-700',
//       },
//       warning: {
//         border: 'border-amber-500',
//         button: 'bg-amber-600 hover:bg-amber-700',
//       },
//       info: {
//         border: 'border-blue-500',
//         button: 'bg-blue-600 hover:bg-blue-700',
//       },
//     };

//     const { border, button } = colorClasses[alertType] || colorClasses.info;

//     return (
//       <AnimatePresence>
//         {isOpen && (
//           <div className="fixed inset-0 z-[9999] flex items-center justify-center">
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 0.6 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black"
//               onClick={alertOptions.onCancel} // backdrop click = cancel
//             />

//             {/* Dialog */}
//             <motion.div
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.95, opacity: 0 }}
//               className={`relative z-[10000] bg-white rounded-lg border-l-4 ${border} shadow-xl max-w-md w-full p-6`}
//             >
//               {/* Title & Message */}
//               <h2 className="text-lg font-semibold text-gray-800">{alertOptions.title}</h2>
//               <p className="mt-2 text-gray-600">{alertOptions.message}</p>

//               {/* Buttons */}
//               <div className="mt-4 flex justify-end gap-2">
//                 {alertOptions.cancelText && (
//                   <button
//                     onClick={() => {
//                       alertOptions.onCancel();
//                       setIsOpen(false);
//                     }}
//                     className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
//                   >
//                     {alertOptions.cancelText}
//                   </button>
//                 )}
//                 <button
//                   onClick={() => {
//                     alertOptions.onConfirm();
//                     setIsOpen(false);
//                   }}
//                   className={`px-4 py-2 text-white rounded ${button}`}
//                 >
//                   {alertOptions.confirmText}
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     );
//   };

//   return {
//     showAlert,
//     AlertDialog,
//   };
// };







// 'use client';

// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// export const useAlert = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [alertType, setAlertType] = useState('info');
//   const [alertOptions, setAlertOptions] = useState({
//     title: '',
//     message: '',
//     confirmText: 'OK',
//     cancelText: 'Cancel',
//   });

//   const showAlert = (type, options) => {
//     setAlertType(type);
//     setAlertOptions({
//       title: options.title,
//       message: options.message,
//       confirmText: options.confirmText || 'OK',
//       cancelText: options.cancelText || 'Cancel',
//       onConfirm: options.onConfirm || (() => setIsOpen(false)),
//       onCancel: options.onCancel || (() => setIsOpen(false)),
//     });
//     setIsOpen(true);
//   };

//   const AlertDialog = ({ isDeleting }) => {
//     const colorClasses = {
//       success: { border: 'border-green-500', button: 'bg-green-600 hover:bg-green-700' },
//       error: { border: 'border-red-500', button: 'bg-red-600 hover:bg-red-700' },
//       warning: { border: 'border-amber-500', button: 'bg-amber-600 hover:bg-amber-700' },
//       info: { border: 'border-blue-500', button: 'bg-blue-600 hover:bg-blue-700' },
//     };

//     const { border, button } = colorClasses[alertType] || colorClasses.info;

//     return (
//       <AnimatePresence>
//         {isOpen && (
//           <div className="fixed inset-0 z-[9999] flex items-center justify-center">
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 0.6 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black"
//               onClick={alertOptions.onCancel}
//             />

//             {/* Dialog */}
//             <motion.div
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.95, opacity: 0 }}
//               className={`relative z-[10000] bg-white rounded-lg border-l-4 ${border} shadow-xl max-w-md w-full p-6`}
//             >
//               <h2 className="text-lg font-semibold text-gray-800">{alertOptions.title}</h2>
//               <p className="mt-2 text-gray-600">{alertOptions.message}</p>

//               {/* Buttons */}
//               <div className="mt-4 flex justify-end gap-2">
//                 {alertOptions.cancelText && !isDeleting && (
//                   <button
//                     onClick={alertOptions.onCancel}
//                     className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
//                   >
//                     {alertOptions.cancelText}
//                   </button>
//                 )}
//                 <button
//                   onClick={alertOptions.onConfirm}
//                   disabled={isDeleting}
//                   className={`px-4 py-2 text-white rounded ${button} ${isDeleting ? 'opacity-75 cursor-not-allowed' : ''}`}
//                 >
//                   {isDeleting ? (
//                     <div className="flex items-center">
//                       <svg
//                         className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 
//                           0 5.373 0 12h4zm2 5.291A7.962 7.962 
//                           0 014 12H0c0 3.042 1.135 5.824 3 
//                           7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       Deleting...
//                     </div>
//                   ) : (
//                     alertOptions.confirmText
//                   )}
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     );
//   };

//   return {
//     showAlert,
//     AlertDialog,
//     setIsOpen,
//   };
// };










'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const useAlert = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [alertType, setAlertType] = useState('info');
  const [alertOptions, setAlertOptions] = useState({
    title: '',
    message: '',
    confirmText: 'OK',
    cancelText: 'Cancel',
    onConfirm: () => setIsOpen(false),
    onCancel: () => setIsOpen(false),
  });

  const showAlert = (type, options) => {
    setAlertType(type);
    setAlertOptions({
      title: options.title,
      message: options.message,
      confirmText: options.confirmText || 'OK',
      cancelText: options.cancelText || 'Cancel',
      onConfirm: options.onConfirm
        ? () => {
            options.onConfirm();
            setIsOpen(false); // always close after confirm
          }
        : () => setIsOpen(false),
      onCancel: options.onCancel
        ? () => {
            options.onCancel();
            setIsOpen(false); // always close after cancel
          }
        : () => setIsOpen(false),
    });
    setIsOpen(true);
  };

  const AlertDialog = ({ isDeleting }) => {
    const colorClasses = {
      success: { border: 'border-green-500', button: 'bg-green-600 hover:bg-green-700' },
      error: { border: 'border-red-500', button: 'bg-red-600 hover:bg-red-700' },
      warning: { border: 'border-amber-500', button: 'bg-amber-600 hover:bg-amber-700' },
      info: { border: 'border-blue-500', button: 'bg-blue-600 hover:bg-blue-700' },
    };

    const { border, button } = colorClasses[alertType] || colorClasses.info;

    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black"
              onClick={alertOptions.onCancel}
            />

            {/* Dialog */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`relative z-[10000] bg-white rounded-lg border-l-4 ${border} shadow-xl max-w-md w-full p-6`}
            >
              <h2 className="text-lg font-semibold text-gray-800">{alertOptions.title}</h2>
              <p className="mt-2 text-gray-600">{alertOptions.message}</p>

              {/* Buttons */}
              <div className="mt-4 flex justify-end gap-2">
                {alertOptions.cancelText && !isDeleting && (
                  <button
                    onClick={alertOptions.onCancel}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                  >
                    {alertOptions.cancelText}
                  </button>
                )}
                <button
                  onClick={alertOptions.onConfirm}
                  disabled={isDeleting}
                  className={`px-4 py-2 text-white rounded ${button} ${
                    isDeleting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isDeleting ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 
                          0 5.373 0 12h4zm2 5.291A7.962 7.962 
                          0 014 12H0c0 3.042 1.135 5.824 3 
                          7.938l3-2.647z"
                        ></path>
                      </svg>
                      Deleting...
                    </div>
                  ) : (
                    alertOptions.confirmText
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  };

  return {
    showAlert,
    AlertDialog,
    setIsOpen,
  };
};
