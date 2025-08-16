// statistics

'use client';

import ExpensePieChart from "../../../src/components/charts/ExpensePieChart";

import ExpenseStats from "../expenses/ExpenseStats";
import { useExpenses } from "../context/ExpenseContext";
import { ExpensePieChartSkeleton } from "../../components/SkeletoUI/SkeletonFilterAndPagination";


export default function StatisticsPage() {
  const { expenses, loading } = useExpenses();

  if (loading) return <div>
    <ExpensePieChartSkeleton/>
  </div>;

  return (
    <div className="space-y-6">
      {/* <h1 className="text-2xl font-bold text-white"></h1> */}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:p-4 rounded-lg shadow">
            <ExpensePieChart expenses={expenses} />
        </div>
        
        <div className="md:p-4 rounded-lg shadow">
          <ExpenseStats />
        </div>
      </div>
    </div>
  );
}