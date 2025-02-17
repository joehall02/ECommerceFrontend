import React from "react";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        {/* Previous page button */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button className="page-link" aria-label="Previous" onClick={() => setCurrentPage(currentPage - 1)}>
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>

        {/* Create a list of page numbers, with the current page highlighted */}
        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
            <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </button>
          </li>
        ))}

        {/* Next page button */}
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button className="page-link" aria-label="Next" onClick={() => setCurrentPage(currentPage + 1)}>
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
