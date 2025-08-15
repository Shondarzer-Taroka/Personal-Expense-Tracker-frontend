'use client';

const CategoryBadge = ({ category }) => {
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Food':
        return 'bg-yellow-100 text-yellow-800';
      case 'Transport':
        return 'bg-blue-100 text-blue-800';
      case 'Shopping':
        return 'bg-purple-100 text-purple-800';
      case 'Entertainment':
        return 'bg-pink-100 text-pink-800';
      case 'Utilities':
        return 'bg-green-100 text-green-800';
      case 'Others':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
        category
      )}`}
    >
      {category}
    </span>
  );
};

export default CategoryBadge;