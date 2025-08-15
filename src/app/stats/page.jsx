'use client';

import { useExpenses } from "../context/ExpenseContext";

export default function ExpenseStats() {
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
    <div>
      <h2 className="text-lg font-semibold mb-4">Summary</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="font-medium">Total Expenses:</span>
          <span className="font-bold">${total.toFixed(2)}</span>
        </div>
        
        <div className="mt-4">
          <h3 className="font-medium mb-2">By Category:</h3>
          <ul className="space-y-1">
            {Object.entries(categoryTotals).map(([category, amount]) => (
              <li key={category} className="flex justify-between">
                <span>{category}:</span>
                <span>${amount.toFixed(2)} (${((amount/total)*100).toFixed(1)}%)</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}