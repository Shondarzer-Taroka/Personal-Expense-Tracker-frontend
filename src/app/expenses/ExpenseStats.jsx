'use client';
import { useExpenses } from "../context/ExpenseContext";
import { Fragment } from 'react';

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
    <div className="glass-container p-6 rounded-xl shadow-lg border border-white/20 backdrop-blur-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">Expense Summary</h2>
      <div className="space-y-4">
        <div className="glass-container-inner p-4 rounded-lg border border-white/10">
          <div className="flex justify-between items-center">
            <span className="font-medium text-white/80">Total Expenses:</span>
            <span className="text-2xl font-bold text-white">${total.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="glass-container-inner p-4 rounded-lg border border-white/10">
          <h3 className="font-medium mb-3 text-white/80">By Category</h3>
          <ul className="space-y-3">
            {Object.entries(categoryTotals).map(([category, amount]) => (
              <li key={category} className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-blue-400/80 mr-2"></div>
                  <span className="text-white/90">{category}</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">${amount.toFixed(2)}</div>
                  <div className="text-xs text-white/60">
                    {((amount/total)*100).toFixed(1)}% of total
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style jsx>{`
        .glass-container {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .glass-container-inner {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
      `}</style>
    </div>
  );
}