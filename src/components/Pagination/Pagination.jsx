import React from "react";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 4;
    const half = Math.floor(maxVisiblePages / 2);

    let start = Math.max(2, currentPage - half);
    let end = Math.min(totalPages - 1, currentPage + half);

    if (currentPage <= half + 1) {
      end = Math.min(totalPages - 1, maxVisiblePages);
    }

    if (currentPage >= totalPages - half) {
      start = Math.max(2, totalPages - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center flex-wrap">
        {/* Previous */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
            &laquo;
          </button>
        </li>

        {/* First Page */}
        <li className={`page-item ${currentPage === 1 ? "active" : ""}`}>
          <button className="page-link" onClick={() => setCurrentPage(1)}>
            1
          </button>
        </li>

        {/* Left Ellipsis */}
        {pageNumbers[0] > 2 && (
          <li className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        )}

        {/* Middle Page Numbers */}
        {pageNumbers.map((num) => (
          <li key={num} className={`page-item ${currentPage === num ? "active" : ""}`}>
            <button className="page-link" onClick={() => setCurrentPage(num)}>
              {num}
            </button>
          </li>
        ))}

        {/* Right Ellipsis */}
        {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
          <li className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        )}

        {/* Last Page */}
        {totalPages > 1 && (
          <li className={`page-item ${currentPage === totalPages ? "active" : ""}`}>
            <button className="page-link" onClick={() => setCurrentPage(totalPages)}>
              {totalPages}
            </button>
          </li>
        )}

        {/* Next */}
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
