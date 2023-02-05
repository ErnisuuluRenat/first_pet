import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

type PaginationProp = {
  currentPage: number;
  setCurrentPage: (i: number) => void;
};

export const Pagination: React.FC<PaginationProp> = ({
  currentPage,
  setCurrentPage,
}) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => setCurrentPage(e.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={3}
      forcePage={currentPage - 1}
      previousLabel="<"
    />
  );
};
