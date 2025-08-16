import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseStats from "./ExpenseStats";

export default function ExpensesPage() {
  return (
    <div className="container mx-auto lg:px-4 py-8 text-white">
      <h1 className="text-2xl font-bold mb-6">Expense Tracker</h1>
      <div className="grid grid-cols-1 gap-6">
        <div className="lg:col-span-2">
          <ExpenseList />
        </div>
      </div>
    </div>
  );
}