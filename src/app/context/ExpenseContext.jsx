'use client';
import { createContext, useContext, useState, useEffect } from 'react';
const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/expenses');
      const data = await response.json();
      if (data.success) {
        setExpenses(data.data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expense) => {
    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expense),
      });
      const data = await response.json();
      if (data.success) {
        await fetchExpenses();
        return { success: true };
      } else {
        return { success: false, errors: data.error };
      }
    } catch (error) {
      return { success: false, error: 'Failed to add expense' };
    }
  };

  const updateExpense = async (id, expense) => {
    try {
      const response = await fetch('/api/expenses', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...expense }),
      });
      const data = await response.json();
      if (data.success) {
        await fetchExpenses();
        return { success: true };
      } else {
        return { success: false, errors: data.error };
      }
    } catch (error) {
      return { success: false, error: 'Failed to update expense' };
    }
  };

  const deleteExpense = async (id) => {
    try {
      const response = await fetch('/api/expenses', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (data.success) {
        await fetchExpenses();
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: 'Failed to delete expense' };
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        loading,
        error,
        addExpense,
        updateExpense,
        deleteExpense,
        editingExpense,
        setEditingExpense,
        fetchExpenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpenseContext);