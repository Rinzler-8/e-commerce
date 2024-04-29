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
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import "./OrderList.css";
import { Button } from "reactstrap";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelDialog from "./CancelDialog";
import ReviewDialog from "./ReviewDialog";
import {
  actionFetchOrderAPI,
  actionUpdateOrderAPI,
} from "../../../redux/Action/OrderAction";
import { useEffect } from "react";
import storage from "../../../Storage/Storage";
import { actionReviewAPI } from "../../../redux/Action/ReviewAction";
import AppContext from "../../../AppContext";
import { useContext } from "react";

const headCells = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "sessionId",
    numeric: true,
    disablePadding: false,
    label: "Phiên",
  },
  {
    id: "firstName",
    numeric: true,
    disablePadding: false,
    label: "Tên",
  },
  {
    id: "lastName",
    numeric: true,
    disablePadding: false,
    label: "Họ",
  },
  {
    id: "mobile",
    numeric: true,
    disablePadding: false,
    label: "Số điện thoại",
  },
  {
    id: "delivery_address",
    numeric: true,
    disablePadding: false,
    label: "Địa chỉ nhận hàng",
  },
  {
    id: "paymentType",
    numeric: true,
    disablePadding: false,
    label: "Phương thức thanh toán",
  },
  {
    id: "orderStatus",
    numeric: true,
    disablePadding: false,
    label: "Trạng thái",
  },
  {
    id: "created_At",
    numeric: true,
    disablePadding: false,
    label: "Tạo ngày",
  },
  {
    id: "note",
    numeric: true,
    disablePadding: false,
    label: "Ghi chú",
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
              headCell.label === "Hành động"
                ? "center"
                : [
                    "ID",
                    "Phiên",
                    "Họ",
                    "Tên",
                    "Số điện thoại",
                    "Địa chỉ nhận hàng",
                    "Phương thức thanh toán",
                  ].includes(headCell.label)
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

export default function OrderList(props) {
  let {
    onHandleEditBtn,
    onHandleChangeSize,
    onHandleChangePage,
    currentPage,
    onHandleChangeFieldSort,
    onHandleChangeDirectionSort,
  } = props;
  const id = storage.getItem("id");
  const role = storage.getItem("role");
  let [sortOrder, setSortOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { dispatchRedux } = useContext(AppContext);
  const stateRedux = useSelector((state) => state);
  const listOrder = stateRedux.listOrderReducer;
  const [isCancelOpen, setIsCancelOpen] = React.useState(false);
  const [isReviewOpen, setIsReviewOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState();

  let handleUpdateStatusButton = (event, order) => {
    // dispatchRedux(actionShowUpdateForm());
    event.stopPropagation();
    onHandleEditBtn(order);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && sortOrder === "asc";
    const newOrder = isAsc ? "desc" : "asc";
    setSortOrder(newOrder);
    setOrderBy(property);
    onHandleChangeDirectionSort(newOrder);
    onHandleChangeFieldSort(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = listOrder.map((n) => n.id);
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
    // setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    onHandleChangeSize(event.target.value);
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const toggleCancelDialog = (orderDetail) => {
    setSelectedOrder(orderDetail);
    setIsCancelOpen(!isCancelOpen);
  };
  const toggleReviewDialog = (orderDetail) => {
    setSelectedOrder(orderDetail);
    setIsReviewOpen(!isReviewOpen);
  };

  let onHandleCancel = (orderId) => {
    const jsonBody = {
      orderStatus: "CANCELED",
    };
    dispatchRedux(actionUpdateOrderAPI(orderId, jsonBody));
    setIsCancelOpen(!isCancelOpen);
  };

  let onHandleReview = (review) => {
    dispatchRedux(actionReviewAPI(review));
    setIsReviewOpen(!isReviewOpen);
  };

  const CustomPaginationBtn = () => {
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

  // Avoid a layout jump when reaching the last page with empty listOrder.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listOrder.length) : 0;
  let filter = {
    page: stateRedux.pageFilterReducer.page,
    size: stateRedux.pageFilterReducer.size,
    sort: stateRedux.pageFilterReducer.sort,
    search: stateRedux.pageFilterReducer.search,
  };
  useEffect(() => {
    dispatchRedux(actionFetchOrderAPI(filter));
  }, [
    stateRedux.pageFilterReducer.page,
    stateRedux.pageFilterReducer.size,
    stateRedux.pageFilterReducer.sort,
    stateRedux.pageFilterReducer.search,
  ]);

  return (
    <Box sx={{ width: "100%", maxHeight: "700px" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="large"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={sortOrder}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={listOrder.length}
            />
            <TableBody>
              {listOrder.map((order, index) => {
                const isItemSelected = isSelected(order.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return order.user_id == id || role === "ADMIN" ? (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={order.id}
                    selected={isItemSelected}
                    sx={{ ...rowItemStyling }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onClick={(event) => handleClick(event, order.id)}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="order"
                      align="left"
                      sx={{ paddingLeft: "15px" }}
                    >
                      {order.id}
                    </TableCell>
                    <TableCell>{order.sessionId}</TableCell>
                    <TableCell>{order.firstName}</TableCell>
                    <TableCell>{order.lastName}</TableCell>
                    <TableCell>{order.mobile}</TableCell>
                    <TableCell>{order.delivery_address}</TableCell>
                    <TableCell>{order.paymentType}</TableCell>
                    <TableCell align="right">
                      {order.orderStatus === "PENDING"
                        ? "Đang chờ"
                        : order.orderStatus === "CONFIRMED"
                        ? "Đã xác nhận"
                        : order.orderStatus === "SHIPPED"
                        ? "Đã giao cho vận chuyển"
                        : order.orderStatus === "DELIVERING"
                        ? "Đang giao hàng"
                        : order.orderStatus === "DELIVERED"
                        ? "Đã giao cho khách"
                        : order.orderStatus === "CANCELED"
                        ? "Đã hủy"
                        : "Chuyển trạng thái"}
                    </TableCell>
                    <TableCell align="right">{order.created_At}</TableCell>
                    <TableCell align="right">{order.note}</TableCell>
                    <TableCell align="center" className="user-opertation-cell">
                      <div className="user-operation">
                        {storage.getItem("role") === "ADMIN" &&
                        !["DELIVERED", "CANCELED"].includes(
                          order.orderStatus
                        ) ? (
                          <Button
                            color="warning"
                            onClick={(event) =>
                              handleUpdateStatusButton(event, order)
                            }
                            className="btn-edit"
                          >
                            <EditIcon />
                          </Button>
                        ) : null}
                        {storage.getItem("role") === "USER" &&
                        ["PENDING", "CONFIRMED"].includes(order.orderStatus) ? (
                          <Button
                            color="danger"
                            onClick={() => toggleCancelDialog(order)}
                          >
                            <DeleteIcon />
                          </Button>
                        ) : null}
                        {storage.getItem("role") === "USER" &&
                        order.orderStatus === "DELIVERED" ? (
                          <Button
                            color="primary"
                            onClick={() => toggleReviewDialog(order)}
                          >
                            <EditIcon />
                          </Button>
                        ) : null}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
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
              <CancelDialog
                toggle={toggleCancelDialog}
                isCancelOpen={isCancelOpen}
                onHandleCancel={onHandleCancel}
                selectedOrder={selectedOrder}
              />
              <ReviewDialog
                toggle={toggleReviewDialog}
                isReviewOpen={isReviewOpen}
                onHandleReview={onHandleReview}
                selectedOrder={selectedOrder}
              />
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          sx={{ ...tablePaginationStyle }}
          count={listOrder.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Hiển thị số dòng"
          ActionsComponent={CustomPaginationBtn}
        />
      </Paper>
    </Box>
  );
}
