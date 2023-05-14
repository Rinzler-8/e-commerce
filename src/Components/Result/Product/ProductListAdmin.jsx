import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import "./ProductListAdmin.css";
import { Button } from "reactstrap";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { actionToggleUpdateFormRedux } from "../../../Redux/Action/FormUpdateAction";
import DeleteDialog from "./DeleteDialog";
import { actionDeleteProductAPI } from "../../../Redux/Action/ProductAction";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "product_id",
    numeric: true,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "name",
    numeric: true,
    disablePadding: false,
    label: "Tên sản phẩm",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Giá",
  },
  {
    id: "detail",
    numeric: true,
    disablePadding: false,
    label: "Thông tin",
  },
  {
    id: "imageName",
    numeric: true,
    disablePadding: false,
    label: "Ảnh",
  },
  {
    id: "categoryName",
    numeric: true,
    disablePadding: false,
    label: "Danh mục",
  },
  {
    label: "Hành động",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const cellStyling = {
    paddingLeft: "15px",
    fontSize: "15px",
    fontWeight: "600",
    borderStyle: "solid",
  };

  const tableHeaderStyling = {
    zIndex: 1,
    overflowX: "auto",
  };

  return (
    <TableHead sx={{ ...tableHeaderStyling }}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell, index) => (
          <TableCell
            key={index}
            // align={headCell.numeric ? "right" : "left"}
            align={
              ["Ảnh", "Hành động",].includes(
                headCell.label
              )
                ? "center"
                : ["ID", "Tên sản phẩm", "Giá", "Thông tin"].includes(
                    headCell.label
                  )
                ? "left"
                : "right"
            }
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ ...cellStyling }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function ProductListAdmin(props) {
  let {
    onHandleEditBtn,
    onHandleChangeSize,
    onHandleChangePage,
    currentPage,
    onHandleChangeFieldSort,
    onHandleChangeDirectionSort,
  } = props;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("product_id");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatchRedux = useDispatch();
  const stateRedux = useSelector((state) => state);
  const listProduct = stateRedux.listProductReducer;
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedProductId, setSelectedProductId] = React.useState(null);
  let handleUpdateAccountButton = (event, product) => {
    // dispatchRedux(actionShowUpdateForm());
    event.stopPropagation();
    onHandleEditBtn(product);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    const newOrder = isAsc ? "desc" : "asc";
    setOrder(newOrder);
    setOrderBy(property);
    onHandleChangeDirectionSort(newOrder);
    onHandleChangeFieldSort(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = listProduct.map((n) => n.product_id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    event.stopPropagation();
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (newPage) => {
    onHandleChangePage(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    onHandleChangeSize(event.target.value);
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const getDisplayedRowsText = ({ from, to, count }) => {
    return `Trang ${from} trên tổng số ${count}`;
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const openDeleteDialog = (id) => {
    setSelectedProductId(id);
    setIsDialogOpen(!isDialogOpen);
  };

  let onHandleDelete = (id) => {
    dispatchRedux(actionDeleteProductAPI(id));
    setIsDialogOpen(!isDialogOpen);
  };

  const CustomPaginationBtn = () => {
    const handleChangePage = (page) => {
      onHandleChangePage(page);
    };

    const pages = [];
    for (let index = 1; index <= currentPage.totalPages; index++) {
      pages.push(
        <IconButton
          key={index}
          onClick={() => handleChangePage(index)}
          sx={{ ...paginationBtnStyling }}
          color={currentPage.page === index ? "primary" : "default"}
        >
          {index}
        </IconButton>
      );
    }
    return (
      <div style={{ marginLeft: "20px", minWidth: "250px", fontSize: "20px" }}>
        <IconButton
          disabled={currentPage.page === 1}
          onClick={() => handleChangePage(1)}
          aria-label="first page"
        >
          <FirstPageIcon sx={{ ...paginationBtnStyling }} />
        </IconButton>
        <IconButton
          disabled={currentPage.page === 1}
          onClick={() => handleChangePage(currentPage.page - 1)}
          aria-label="previous page"
        >
          <KeyboardArrowLeft sx={{ ...paginationBtnStyling }} />
        </IconButton>
        {pages}
        <IconButton
          disabled={currentPage.page === currentPage.totalPages}
          onClick={() => handleChangePage(currentPage.page + 1)}
          aria-label="next page"
        >
          <KeyboardArrowRight sx={{ ...paginationBtnStyling }} />
        </IconButton>
        <IconButton
          disabled={currentPage.page === currentPage.totalPages}
          onClick={() => handleChangePage(currentPage.totalPages)}
          aria-label="last page"
        >
          <LastPageIcon sx={{ ...paginationBtnStyling }} />
        </IconButton>
      </div>
    );
  };

  // Avoid a layout jump when reaching the last page with empty listProduct.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listProduct.length) : 0;
  const visibleRows = React.useMemo(() => {
    const sortedRows = stableSort(listProduct, getComparator(order, orderBy));
    return sortedRows.slice(
      page * rowsPerPage,
      page + 1 * rowsPerPage + rowsPerPage
    );
  }, [listProduct, order, orderBy, page, rowsPerPage]);

  const rowItemStyling = {
    marginLeft: "10px",
    transition: "background-color 0.2s ease-in-out", // optional: adds a smooth transition effect
    ":hover": {
      cursor: "pointer",
      backgroundColor: "lightgray",
    },
  };

  const paginationBtnStyling = {
    fontSize: "medium",
    ":hover": {
      cursor: "pointer",
    },
  };
  const tablePaginationStyle = {
    "& .MuiTablePagination-selectLabel": {
      marginTop: "0px",
      marginBottom: "0px",
    },
    "& .MuiTablePagination-displayedRows": {
      display: "none",
      marginTop: "0px",
      marginBottom: "0px",
    },
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="large"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={listProduct.length}
            />
            <TableBody>
              {visibleRows.map((product, index) => {
                const isItemSelected = isSelected(product.product_id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={product.product_id}
                    selected={isItemSelected}
                    sx={{ ...rowItemStyling }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onClick={(event) =>
                          handleClick(event, product.product_id)
                        }
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="product"
                      align="left"
                      sx={{ paddingLeft: "15px" }}
                    >
                      {product.product_id}
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      {product.price.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </TableCell>
                    <TableCell sx={{width: "500px"}}>{product.detail}</TableCell>
                    <TableCell>
                      <img
                        alt="Sample"
                        src={
                          "http://localhost:8080/api/v1/fileUpload/files/" +
                          product.imageName
                        }
                        style={{ width: "100px", height: "100px" }}
                      />
                    </TableCell>
                    <TableCell align="right">{product.categoryName}</TableCell>
                    <TableCell align="center" className="user-opertation-cell">
                      <div className="user-operation">
                        <Button
                          color="warning"
                          onClick={(event) =>
                            handleUpdateAccountButton(event, product)
                          }
                          className="btn-edit"
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          color="danger"
                          onClick={() => openDeleteDialog(product.product_id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
              <DeleteDialog
                toggle={openDeleteDialog}
                isDialogOpen={isDialogOpen}
                onHandleDelete={onHandleDelete}
                selectedProductId={selectedProductId}
              />
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          sx={{ ...tablePaginationStyle }}
          count={listProduct.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Hiển thị số dòng"
          labelDisplayedRows={getDisplayedRowsText}
          // showFirstButton="true"
          // showLastButton="true"
          ActionsComponent={CustomPaginationBtn}
        />
      </Paper>
    </Box>
  );
}
