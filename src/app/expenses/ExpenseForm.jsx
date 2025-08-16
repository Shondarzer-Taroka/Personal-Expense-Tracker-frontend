'use client';
import DatePicker from '../../../src/components/Expenses/DatePicker/DatePicker';
import { useState, useEffect } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { toast, Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: date.toISOString().split('T')[0],
    });
    if (errors.date) {
      setErrors({
        ...errors,
        date: null,
      });
    }
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

    setIsSubmitting(true);
    
    const expense = {
      title: formData.title.trim(),
      amount: Number(formData.amount),
      category: formData.category,
      date: formData.date,
    };

    try {
      let result;
      if (editingExpense) {
        result = await updateExpense(editingExpense._id, expense);
      } else {
        result = await addExpense(expense);
      }

      if (result.success) {
        toast.success(
          editingExpense 
            ? 'Expense updated successfully!' 
            : 'Expense added successfully!',
          {
            position: 'bottom-right',
            style: {
              background: '#4BB543',
              color: '#fff',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#4BB543',
            },
          }
        );
        
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
        toast.error('Failed to save expense. Please check the form.', {
          position: 'bottom-right',
        });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.', {
        position: 'bottom-right',
      });
    } finally {
      setIsSubmitting(false);
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full md:w-[448px] mx-auto bg-white/10 backdrop-blur-lg p-4 md:p-8 rounded-2xl shadow-lg border border-white/20"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          {editingExpense ? 'Edit Expense' : 'Add New Expense'}
        </h2>
        {editingExpense && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCancel}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Cancel editing"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-white/80 mb-1">
            Title
          </label>
          <div className="relative">
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all bg-white/10 text-white ${
                errors.title ? 'border-red-400' : 'border-white/20'
              }`}
              placeholder="Dinner with friends"
            />
            {errors.title && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          {errors.title && (
            <p className="mt-1 text-sm text-red-400">{errors.title}</p>
          )}
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-white/80 mb-1">
            Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-white/70">$</span>
            </div>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className={`w-full pl-8 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all bg-white/10 text-white ${
                errors.amount ? 'border-red-400' : 'border-white/20'
              }`}
              placeholder="0.00"
              step="0.01"
              min="0"
            />
            {errors.amount && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          {errors.amount && (
            <p className="mt-1 text-sm text-red-400">{errors.amount}</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-white/80 mb-1">
            Category
          </label>
          <div className="relative">
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all appearance-none bg-white/10 text-white ${
                errors.category ? 'border-red-400' : 'border-white/20'
              }`}
            >
              <option value="" className="bg-gray-800">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category} className="bg-gray-800">
                  {category}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white/70">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          {errors.category && (
            <p className="mt-1 text-sm text-red-400">{errors.category}</p>
          )}
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-white/80 mb-1">
            Date
          </label>
          <div className={`rounded-lg border ${
            errors.date ? 'border-red-400' : 'border-white/20'
          }`}>
            <DatePicker 
              selected={new Date(formData.date)}
              onChange={handleDateChange}
              className="w-full px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none rounded-lg bg-white/10 text-white"
            />
          </div>
          {errors.date && (
            <p className="mt-1 text-sm text-red-400">{errors.date}</p>
          )}
        </div>

        <div className="pt-2">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative w-full bg-gradient-to-r bg-white/10 border border-white/20 text-white hover:bg-white/20 cursor-pointer  font-medium py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2  focus:ring-offset-white/10 overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {editingExpense ? 'Updating...' : 'Adding...'}
              </span>
            ) : editingExpense ? (
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
          </motion.button>
        </div>
      </form>

        
    </motion.div>
  );
};

export default ExpenseForm;