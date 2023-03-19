import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
function PaginationButton(props) {
  let { onHandleChangePage, currentPage } = props;
  let handleChangePage = (page) => {
    onHandleChangePage(page);
  };

  let page = [];
  // let current = currentPage.page + 1;
  for (let index = 1; index <= currentPage.totalPages; index++) {
    page.push(
      <PaginationItem active={currentPage.page === index} key={index}>
        <PaginationLink onClick={() => handleChangePage(index)}>{index}</PaginationLink>
      </PaginationItem>
    );
  }

  return (
    <Pagination>
      <PaginationItem disabled={currentPage.page === 1}>
        <PaginationLink first onClick={() => handleChangePage(1)}></PaginationLink>
      </PaginationItem>
      <PaginationItem disabled={currentPage.page === 1}>
        <PaginationLink onClick={() => handleChangePage(currentPage.page - 1)} previous />
      </PaginationItem>
      {page}
      <PaginationItem disabled={currentPage.page === currentPage.totalPages}>
        <PaginationLink onClick={() => handleChangePage(currentPage.page + 1)} next />
      </PaginationItem>
      <PaginationItem disabled={currentPage.page === currentPage.totalPages}>
        <PaginationLink last onClick={() => handleChangePage(currentPage.totalPages)} />
      </PaginationItem>
    </Pagination>
  );
}

export default PaginationButton;
