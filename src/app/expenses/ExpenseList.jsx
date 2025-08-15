// 'use client';

// import CategoryBadge from '@/components/Expenses/CategoryBadge/CategoryBadge';
// import { useExpenses } from '../context/ExpenseContext';
// import { format } from 'date-fns';

// const ExpenseList = () => {
//   const {
//     expenses,
//     loading,
//     error,
//     deleteExpense,
//     setEditingExpense,
//     fetchExpenses,
//   } = useExpenses();

//   const handleDelete = async (id) => {
//     if (confirm('Are you sure you want to delete this expense?')) {
//       await deleteExpense(id);
//       await fetchExpenses();
//     }
//   };

//   if (loading) return <p className="text-center py-4">Loading expenses...</p>;
//   if (error) return <p className="text-center py-4 text-red-500">{error}</p>;
//   if (expenses.length === 0)
//     return <p className="text-center py-4">No expenses found. Add one!</p>;

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Title
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Amount
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Category
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Date
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {expenses.map((expense) => (
//               <tr key={expense._id}>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm font-medium text-gray-900">
//                     {expense.title}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-900">
//                     ${expense.amount.toFixed(2)}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <CategoryBadge category={expense.category} />
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-900">
//                     {format(new Date(expense.date), 'MMM dd, yyyy')}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <button
//                     onClick={() => setEditingExpense(expense)}
//                     className="text-blue-600 hover:text-blue-900 mr-3"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(expense._id)}
//                     className="text-red-600 hover:text-red-900"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ExpenseList;









'use client';

import CategoryBadge from '@/components/Expenses/CategoryBadge/CategoryBadge';
import { useExpenses } from '../context/ExpenseContext';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { FaFilter, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ExpenseList = () => {
  const {
    expenses,
    loading,
    error,
    deleteExpense,
    setEditingExpense,
    fetchExpenses,
  } = useExpenses();

  // State for filtering and pagination
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // You can adjust this number

  // Get all unique categories from expenses
  const categories = ['All', ...new Set(expenses.map(expense => expense.category))];

  // Filter expenses by category and update pagination when expenses or filter changes
  useEffect(() => {
    const filtered = selectedCategory === 'All' 
      ? expenses 
      : expenses.filter(expense => expense.category === selectedCategory);
    setFilteredExpenses(filtered);
    setCurrentPage(1); // Reset to first page when filter changes
  }, [expenses, selectedCategory]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredExpenses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      await deleteExpense(id);
      await fetchExpenses();
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowFilterDropdown(false);
  };

  if (loading) return <p className="text-center py-4">Loading expenses...</p>;
  if (error) return <p className="text-center py-4 text-red-500">{error}</p>;
  if (expenses.length === 0) {
    return <p className="text-center py-4">No expenses found. Add one!</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Filter and Pagination Controls */}
      <div className="flex justify-between items-center p-4 bg-gray-50 border-b">
        <div className="relative">
          <button
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className="flex items-center space-x-2 px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-100"
          >
            <FaFilter />
            <span>Filter: {selectedCategory}</span>
          </button>
          
          {showFilterDropdown && (
            <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
              <div className="py-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      selectedCategory === category
                        ? 'bg-blue-100 text-blue-800'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-full ${currentPage === 1 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-200'}`}
          >
            <FaChevronLeft />
          </button>
          
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-full ${currentPage === totalPages ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-200'}`}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Expense Table */}
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
            {currentItems.map((expense) => (
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

      {/* Pagination footer */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center p-4 bg-gray-50 border-t">
          <div className="text-sm text-gray-700">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredExpenses.length)} of {filteredExpenses.length} expenses
          </div>
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-200'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;