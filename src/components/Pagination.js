import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, loading }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 5);
      } else if (currentPage >= totalPages - 2) {
        pages.push(totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center space-x-2 mt-8 mb-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
        className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>

      {pageNumbers[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            1
          </button>
          {pageNumbers[0] > 2 && (
            <span className="px-2 text-gray-500">...</span>
          )}
        </>
      )}

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={loading}
          className={`px-3 py-2 rounded-md transition-colors ${
            page === currentPage
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          } ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          {page}
        </button>
      ))}

      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className="px-2 text-gray-500">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
        className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
