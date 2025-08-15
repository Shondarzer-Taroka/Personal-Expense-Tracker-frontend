'use client';

import { useExpenses } from '../context/ExpenseContext';

const ExpenseStats = () => {
  const { expenses } = useExpenses();

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const categoryTotals = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="bg-blue-100 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          Total Expenses
        </h3>
        <p className="text-2xl font-bold text-blue-600">
          ${total.toFixed(2)}
        </p>
      </div>

      <div className="bg-green-100 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          By Category
        </h3>
        <ul className="space-y-1">
          {Object.entries(categoryTotals).map(([category, amount]) => (
            <li key={category} className="flex justify-between">
              <span className="font-medium">{category}:</span>
              <span>${amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseStats;