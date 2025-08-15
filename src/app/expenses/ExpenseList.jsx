'use client';

import CategoryBadge from '@/components/Expenses/CategoryBadge/CategoryBadge';
import { useExpenses } from '../context/ExpenseContext';
import { format } from 'date-fns';

const ExpenseList = () => {
  const {
    expenses,
    loading,
    error,
    deleteExpense,
    setEditingExpense,
    fetchExpenses,
  } = useExpenses();

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      await deleteExpense(id);
      await fetchExpenses();
    }
  };

  if (loading) return <p className="text-center py-4">Loading expenses...</p>;
  if (error) return <p className="text-center py-4 text-red-500">{error}</p>;
  if (expenses.length === 0)
    return <p className="text-center py-4">No expenses found. Add one!</p>;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {expenses.map((expense) => (
              <tr key={expense._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {expense.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ${expense.amount.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <CategoryBadge category={expense.category} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {format(new Date(expense.date), 'MMM dd, yyyy')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setEditingExpense(expense)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(expense._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;