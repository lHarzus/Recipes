import React from "react";

export const Pagination = ({ totalPages, arrowPage, onChangePage, page }) => {
  return (
    <div>
      {totalPages > 1 ? (
        <div className="pages">
          <i
            className="bi bi-arrow-left-circle"
            onClick={() => arrowPage("left")}></i>
          {Array.from(Array(totalPages).keys()).map(i => (
            <p
              className={page === i + 1 ? "selected" : ""}
              key={i}
              onClick={() => onChangePage(i + 1)}>
              {i + 1}
            </p>
          ))}
          <i
            className="bi bi-arrow-right-circle"
            onClick={() => arrowPage("right")}></i>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
