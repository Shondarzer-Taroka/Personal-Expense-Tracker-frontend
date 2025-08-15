// statistics

'use client';

import ExpensePieChart from "@/components/charts/ExpensePieChart";

import ExpenseStats from "../expenses/ExpenseStats";
import { useExpenses } from "../context/ExpenseContext";


export default function StatisticsPage() {
  const { expenses, loading } = useExpenses();

  if (loading) return <div>Loading statistics...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Expense Statistics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Spending by Category</h2>
          <div className="h-64">
            <ExpensePieChart expenses={expenses} />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <ExpenseStats />
        </div>
      </div>
    </div>
  );
}