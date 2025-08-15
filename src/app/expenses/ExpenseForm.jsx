'use client';

import { useState, useEffect } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import DatePicker from '../components/DatePicker';
import CategoryBadge from '../components/CategoryBadge';

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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {editingExpense ? 'Edit Expense' : 'Add New Expense'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.amount ? 'border-red-500' : 'border-gray-300'
            }`}
            step="0.01"
            min="0"
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
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
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="date">
            Date
          </label>
          <DatePicker
            selected={new Date(formData.date)}
            onChange={handleDateChange}
            className={`w-full p-2 border rounded ${
              errors.date ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date}</p>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          {editingExpense && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {editingExpense ? 'Update Expense' : 'Add Expense'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;