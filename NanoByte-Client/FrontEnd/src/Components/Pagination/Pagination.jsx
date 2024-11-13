import React from 'react';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Calculate the start and end page numbers to display
  const maxVisiblePages = 3;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  // If there are too many pages to display all, adjust the start page
  if (endPage - startPage + 1 < maxVisiblePages && endPage !== totalPages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  return (
    <div className="flex flex-col text-sm items-center justify-center">

<div className="flex items-center justify-center space-x-2">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`
          px-2.5 py-0.5 rounded bg-blue-500 hover:bg-blue-600 text-white transition-colors
          ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        &laquo;
      </button>

      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`
            px-2.5 py-0.5 rounded transition-colors
            ${page === currentPage
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }
          `}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`
          px-2.5 py-0.5 rounded bg-blue-500 hover:bg-blue-600 text-white transition-colors
          ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        &raquo;
      </button>
    </div>
    {/* <div className="text-gray-300 text-sm mt-2">
        الصفحة {currentPage} من {totalPages}
      </div> */}
    </div>
  );
};

export default Pagination;
