import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FunctionComponent<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="flex flex-row gap-3 justify-between items-center w-[90%] my-4">
      <span className="pagination-page">
        Page {currentPage} of {totalPages}
      </span>
      <div className="flex flex-row gap-3 justify-end items-center w-1/2">
        <button
          className={`${currentPage === 1 ? 'bg-gray-400 text-gray-100 cursor-auto hover:bg-gray-400' : ''} py-2 px-4 text-black bg-[--plum-200] rounded text-sm font-bold hover:bg-[--plum-400] transition-all duration-[400ms]`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className={`${currentPage === totalPages ? 'bg-gray-400 text-gray-100 cursor-auto hover:bg-gray-400' : ''} py-2 px-4 text-black bg-[--plum-200] rounded text-sm font-bold hover:bg-[--plum-400] transition-all duration-[400ms]`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
