// statistics

'use client';

import ExpensePieChart from "../../../src/components/charts/ExpensePieChart";

import ExpenseStats from "../expenses/ExpenseStats";
import { useExpenses } from "../context/ExpenseContext";


export default function StatisticsPage() {
  const { expenses, loading } = useExpenses();

  if (loading) return <div>Loading statistics...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Expense Statistics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 rounded-lg shadow">
            <ExpensePieChart expenses={expenses} />
        </div>
        
        <div className=" p-4 rounded-lg shadow">
          <ExpenseStats />
        </div>
      </div>
    </div>
  );
}