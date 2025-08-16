'use client';
import CategoryBadge from '../../../src/components/Expenses/CategoryBadge/CategoryBadge';
import { useExpenses } from '../context/ExpenseContext';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { FaFilter, FaChevronLeft, FaChevronRight, FaEdit, FaTrash } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import ExpenseForm from './ExpenseForm';
import { useAlert } from '../../../src/components/Alert/useAlert';
import { toast, Toaster } from 'react-hot-toast';
import { Dialog, Transition, Menu } from '@headlessui/react';
import { Fragment } from 'react';

const ExpenseList = () => {
  const {
    expenses,
    loading,
    error,
    deleteExpense,
    setEditingExpense,
    fetchExpenses,
    editingExpense,
  } = useExpenses();

  const { showAlert, AlertDialog, setIsOpen } = useAlert();
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // State for filtering and pagination
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Get all unique categories from expenses
  const categories = ['All', ...new Set(expenses.map(expense => expense.category))];

  // Filter expenses by category and update pagination when expenses or filter changes
  useEffect(() => {
    const filtered = selectedCategory === 'All' 
      ? expenses 
      : expenses.filter(expense => expense.category === selectedCategory);
    setFilteredExpenses(filtered);
    setCurrentPage(1);
  }, [expenses, selectedCategory]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredExpenses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    showAlert('error', {
      title: 'Delete Expense',
      message: 'Are you sure you want to delete this expense?',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm:()=> confirmDelete(id),
      onCancel: () => {
        setDeleteId(null);
        setIsOpen(false);
        toast('Deletion cancelled', {
          icon: 'ℹ️',
          position: 'bottom-right',
        });
      }
    });
  };

  const confirmDelete = async (id) => {
    setIsDeleting(true);
    try {
      if (id) {
        await deleteExpense(id);
        await fetchExpenses();
        setDeleteId(null);
        toast.success('Expense deleted successfully!', {
          position: 'bottom-right',
        });
      }
    } catch (err) {
      toast.error('Failed to delete expense. Please try again.', {
        position: 'bottom-right',
      });
      showAlert('error', {
        title: 'Error',
        message: 'Failed to delete expense. Please try again.',
        confirmText: 'OK'
      });
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const closeModal = () => {
    setEditingExpense(null);
  };

  // Skeleton Loading Component
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-white/20 rounded w-3/4"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-white/20 rounded w-1/2"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-6 bg-white/20 rounded-full w-20"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-white/20 rounded w-24"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex space-x-3">
          <div className="h-8 w-8 bg-white/20 rounded-md"></div>
          <div className="h-8 w-8 bg-white/20 rounded-md"></div>
        </div>
      </td>
    </tr>
  );

  if (error) return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-container bg-red-500/10 border-l-4 border-red-500 p-4 rounded-lg shadow-sm"
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-white">{error}</p>
        </div>
      </div>
    </motion.div>
  );

  if (expenses.length === 0 && !loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-12 glass-container rounded-lg shadow-sm"
      >
        <svg className="h-16 w-16 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-white">No expenses found</h3>
        <p className="mt-1 text-sm text-white/70">Get started by adding a new expense.</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setEditingExpense({})}
          className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600/90 hover:bg-blue-700/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/50"
        >
          Add Expense
        </motion.button>
      </motion.div>
    );
  }

  return (
    <>
      <AlertDialog isDeleting={isDeleting} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="glass-container custom-scrollbar rounded-xl shadow-sm overflow-hidden border border-white/20"
      >
        {/* Filter and Pagination Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-white/10 border-b">
          <Menu as="div" className="relative mb-4 sm:mb-0 w-full sm:w-auto">
            {({ open }) => (
              <>
                <Menu.Button as={Fragment}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-2 px-4 py-2 glass-container border border-white/20 rounded-lg shadow-sm hover:bg-white/10 w-full sm:w-auto justify-between"
                  >
                    <div className="flex items-center">
                      <FaFilter className="text-blue-300" />
                      <span className="ml-2 text-white">Filter: {selectedCategory}</span>
                    </div>
                    <svg className={`h-5 w-5 text-white/70 transform transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute z-10 mt-2 w-full sm:w-48  rounded-lg shadow-lg border bg-gradient-to-b from-[#320c49] to-[#5f0c6af6] border-white/20 backdrop-blur-xl">
                    <div className="py-1 max-h-60 overflow-y-auto">
                      {categories.map((category) => (
                        <Menu.Item key={category}>
                          {({ active }) => (
                            <motion.button
                              whileHover={{ x: 5 }}
                              onClick={() => handleCategorySelect(category)}
                              className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                                selectedCategory === category
                                  ? 'bg-blue-500/20 text-white'
                                  : 'text-white hover:bg-white/10'
                              }`}
                            >
                              {category}
                            </motion.button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>

          <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-normal">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-full ${currentPage === 1 ? 'text-white/40' : 'text-white hover:bg-white/10'}`}
            >
              <FaChevronLeft />
            </motion.button>
            
            <span className="text-sm font-medium text-white/80">
              Page {currentPage} of {totalPages}
            </span>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full ${currentPage === totalPages ? 'text-white/40' : 'text-white hover:bg-white/10'}`}
            >
              <FaChevronRight />
            </motion.button>
          </div>
        </div>

        {/* Expense Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/20">
            <thead className="bg-white/10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="glass-container divide-y divide-white/20">
              {loading ? (
                <>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <SkeletonRow key={index} />
                  ))}
                </>
              ) : (
                currentItems.map((expense) => (
                  <motion.tr 
                    key={expense._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-white/10"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">
                        {expense.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white font-semibold">
                        ${expense.amount.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <CategoryBadge category={expense.category} glass />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white/80">
                        {format(new Date(expense.date), 'MMM dd, yyyy')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setEditingExpense(expense)}
                          className="text-blue-300 hover:text-blue-200 p-1 rounded-full hover:bg-white/10"
                          title="Edit"
                        >
                          <FaEdit />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteClick(expense._id)}
                          className="text-red-300 hover:text-red-200 p-1 rounded-full hover:bg-white/10"
                          title="Delete"
                        >
                          <FaTrash />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-white/10 border-t"
          >
            <div className="text-sm text-white/80 mb-2 sm:mb-0">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredExpenses.length)} of {filteredExpenses.length} expenses
            </div>
            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <motion.button
                  key={page}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    currentPage === page
                      ? 'bg-blue-600/90 text-white shadow-md'
                      : 'glass-container text-white hover:bg-white/10 border border-white/20'
                  }`}
                >
                  {page}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Modal for editing expense */}
        <Transition appear show={!!editingExpense} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden text-left align-middle shadow-xl transition-all ">
                 
                    <ExpenseForm />
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
        <Toaster position="top-center" />
      </motion.div>

      <style jsx global>{`
        .glass-container {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        body {
          background: linear-gradient(135deg, #1e3a8a 0%, #7e22ce 100%);
        }
      `}</style>
    </>
  );
};

export default ExpenseList;