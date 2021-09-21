import { useEffect, useMemo, useState } from 'react';

/**
 * @function usePagination
 * @description A custom hook used for table pagination
 * @param {Number} defaultPage - initial default page
 * @param {Number} rowPerPage - initial row per page
 * @param {Number} totalRecords - initial total records to show
 */
const usePagination = (defaultPage, rowPerPage, totalRecords) => {
  const [pagination, setPagination] = useState({
    activePage: defaultPage,
    rowPerPage,
  });
  const totalPages = useMemo(() => Math.ceil(totalRecords / rowPerPage) || 1, [
    totalRecords,
    rowPerPage,
  ]);

  useEffect(() => {
    setPagination({ ...pagination, activePage: defaultPage, rowPerPage });
  }, [defaultPage, rowPerPage]);

  const goToNextPage = (callback) => {
    const nextPage = pagination.activePage + 1;
    if (nextPage > totalPages) return;
    const newPagination = { ...pagination, activePage: nextPage };
    setPagination(newPagination);
    if (typeof callback === 'function') {
      callback(newPagination);
    }
  };

  const goToPreviousPage = (callback) => {
    const previousPage = pagination.activePage - 1;
    if (previousPage < 1) return;
    const newPagination = { ...pagination, activePage: previousPage };
    setPagination(newPagination);
    if (typeof callback === 'function') {
      callback(newPagination);
    }
  };

  const goToPage = (page, callback) => {
    if (page < 1 || page > totalPages) return;
    const newPagination = { ...pagination, activePage: page };
    setPagination(newPagination);
    if (typeof callback === 'function') {
      callback(newPagination);
    }
  };

  return {
    activePage: pagination.activePage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  };
};

export default usePagination;
