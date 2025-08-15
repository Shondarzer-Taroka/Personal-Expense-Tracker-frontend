// 'use client';

// import CustomDatePicker from '@/components/Expenses/DatePicker.jsx/DatePicker';
// import { useState, useEffect } from 'react';
// import { useExpenses } from '../context/ExpenseContext';

// const categories = [
//   'Food',
//   'Transport',
//   'Shopping',
//   'Entertainment',
//   'Utilities',
//   'Others',
// ];

// const ExpenseForm = () => {
//   const { addExpense, updateExpense, editingExpense, setEditingExpense } =
//     useExpenses();
//   const [formData, setFormData] = useState({
//     title: '',
//     amount: '',
//     category: '',
//     date: new Date().toISOString().split('T')[0],
//   });
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (editingExpense) {
//       setFormData({
//         title: editingExpense.title,
//         amount: editingExpense.amount.toString(),
//         category: editingExpense.category,
//         date: new Date(editingExpense.date).toISOString().split('T')[0],
//       });
//     }
//   }, [editingExpense]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleDateChange = (date) => {
//     setFormData({
//       ...formData,
//       date: date.toISOString().split('T')[0],
//     });
//   };

//   const validate = () => {
//     const newErrors = {};

//     if (!formData.title.trim()) {
//       newErrors.title = 'Title is required';
//     } else if (formData.title.trim().length < 3) {
//       newErrors.title = 'Title must be at least 3 characters';
//     }

//     if (!formData.amount) {
//       newErrors.amount = 'Amount is required';
//     } else if (isNaN(formData.amount)) {
//       newErrors.amount = 'Amount must be a number';
//     } else if (Number(formData.amount) <= 0) {
//       newErrors.amount = 'Amount must be greater than 0';
//     }

//     if (!formData.category) {
//       newErrors.category = 'Category is required';
//     }

//     if (!formData.date) {
//       newErrors.date = 'Date is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     const expense = {
//       title: formData.title.trim(),
//       amount: Number(formData.amount),
//       category: formData.category,
//       date: formData.date,
//     };

//     let result;
//     if (editingExpense) {
//       result = await updateExpense(editingExpense._id, expense);
//     } else {
//       result = await addExpense(expense);
//     }

//     if (result.success) {
//       setFormData({
//         title: '',
//         amount: '',
//         category: '',
//         date: new Date().toISOString().split('T')[0],
//       });
//       if (editingExpense) {
//         setEditingExpense(null);
//       }
//     } else if (result.errors) {
//       setErrors(result.errors);
//     }
//   };

//   const handleCancel = () => {
//     setEditingExpense(null);
//     setFormData({
//       title: '',
//       amount: '',
//       category: '',
//       date: new Date().toISOString().split('T')[0],
//     });
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">
//         {editingExpense ? 'Edit Expense' : 'Add New Expense'}
//       </h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2" htmlFor="title">
//             Title
//           </label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className={`w-full p-2 border rounded ${
//               errors.title ? 'border-red-500' : 'border-gray-300'
//             }`}
//           />
//           {errors.title && (
//             <p className="text-red-500 text-sm mt-1">{errors.title}</p>
//           )}
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2" htmlFor="amount">
//             Amount
//           </label>
//           <input
//             type="number"
//             id="amount"
//             name="amount"
//             value={formData.amount}
//             onChange={handleChange}
//             className={`w-full p-2 border rounded ${
//               errors.amount ? 'border-red-500' : 'border-gray-300'
//             }`}
//             step="0.01"
//             min="0"
//           />
//           {errors.amount && (
//             <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
//           )}
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2" htmlFor="category">
//             Category
//           </label>
//           <select
//             id="category"
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className={`w-full p-2 border rounded ${
//               errors.category ? 'border-red-500' : 'border-gray-300'
//             }`}
//           >
//             <option value="">Select a category</option>
//             {categories.map((category) => (
//               <option key={category} value={category}>
//                 {category}
//               </option>
//             ))}
//           </select>
//           {errors.category && (
//             <p className="text-red-500 text-sm mt-1">{errors.category}</p>
//           )}
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2" htmlFor="date">
//             Date
//           </label>
//           <CustomDatePicker
//             selected={new Date(formData.date)}
//             onChange={handleDateChange}
//             className={`w-full p-2 border rounded ${
//               errors.date ? 'border-red-500' : 'border-gray-300'
//             }`}
//           />
//           {errors.date && (
//             <p className="text-red-500 text-sm mt-1">{errors.date}</p>
//           )}
//         </div>

//         <div className="flex justify-end space-x-2">
//           {editingExpense && (
//             <button
//               type="button"
//               onClick={handleCancel}
//               className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//             >
//               Cancel
//             </button>
//           )}
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             {editingExpense ? 'Update Expense' : 'Add Expense'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ExpenseForm;


























'use client';

import CustomDatePicker from '@/components/Expenses/DatePicker.jsx/DatePicker';
import { useState, useEffect } from 'react';
import { useExpenses } from '../context/ExpenseContext';

const categories = [
  'Food',
  'Transport',
  'Shopping',
  'Entertainment',
  'Utilities',
  'Others',
];

const ExpenseForm = () => {
  const { addExpense, updateExpense, editingExpense, setEditingExpense } =
    useExpenses();
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        title: editingExpense.title,
        amount: editingExpense.amount.toString(),
        category: editingExpense.category,
        date: new Date(editingExpense.date).toISOString().split('T')[0],
      });
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: date.toISOString().split('T')[0],
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(formData.amount)) {
      newErrors.amount = 'Amount must be a number';
    } else if (Number(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const expense = {
      title: formData.title.trim(),
      amount: Number(formData.amount),
      category: formData.category,
      date: formData.date,
    };

    let result;
    if (editingExpense) {
      result = await updateExpense(editingExpense._id, expense);
    } else {
      result = await addExpense(expense);
    }

    if (result.success) {
      setFormData({
        title: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
      });
      if (editingExpense) {
        setEditingExpense(null);
      }
    } else if (result.errors) {
      setErrors(result.errors);
    }
  };

  const handleCancel = () => {
    setEditingExpense(null);
    setFormData({
      title: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {editingExpense ? 'Edit Expense' : 'Add New Expense'}
        </h2>
        {editingExpense && (
          <button
            onClick={handleCancel}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Cancel editing"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <div className="relative">
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Dinner with friends"
            />
            {errors.title && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className={`w-full pl-8 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                errors.amount ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0.00"
              step="0.01"
              min="0"
            />
            {errors.amount && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category}</p>
          )}
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <div className={`rounded-lg border ${
            errors.date ? 'border-red-500' : 'border-gray-300'
          }`}>
            <CustomDatePicker
              selected={new Date(formData.date)}
              onChange={handleDateChange}
              className="w-full px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none rounded-lg"
            />
          </div>
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date}</p>
          )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {editingExpense ? (
              <span className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Update Expense
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Expense
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;