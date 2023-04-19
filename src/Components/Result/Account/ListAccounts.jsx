import React from "react";
import AccountResultFormItem from "./AccountResultFormItem";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "reactstrap";
import { useSelector } from "react-redux";
import { Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import "./ListAccounts.css";

function ListAccounts(props) {
  // Lấy các props từ bên trên truyền xuống
  let { onHandleDeactivateBtn, onHandleEditBtn } = props;
  let stateRedux = useSelector((state) => state);
  let listAccount = stateRedux.listAccountReducer;
  // console.log("accounts", listAccount);
  let handleUpdateAccountButton = (account) => {
    // dispatchRedux(actionShowUpdateForm());
    onHandleEditBtn(account);
  };
  let handleDeactivateButton = (account) => {
    // dispatchRedux(actionShowDeactivateForm());
    onHandleDeactivateBtn(account);
  };

  const cellStyling = {
    fontSize: "15px",
    fontWeight: "600",
    borderStyle: "solid",
  };

  const rowItemStyling = {
    marginLeft: "10px",
    transition: "background-color 0.2s ease-in-out", // optional: adds a smooth transition effect
    ":hover": {
      cursor: "pointer",
      backgroundColor: "lightgray",
    },
  };

  return (
    <TableContainer className="table-container">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ ...cellStyling }}>ID</TableCell>
            <TableCell sx={{ ...cellStyling }}>Tên tài khoản</TableCell>
            <TableCell sx={{ ...cellStyling }}>Email</TableCell>
            <TableCell sx={{ ...cellStyling }}>Số điện thoại</TableCell>
            <TableCell sx={{ ...cellStyling }} align="right">
              Phân Quyền
            </TableCell>
            <TableCell sx={{ ...cellStyling }} align="right">
              Trạng Thái
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listAccount.map((account) => (
            <TableRow key={account.id} sx={{...rowItemStyling}} onClick={() => handleUpdateAccountButton(account)}>
              <TableCell component="th" scope="account">
                {account.id}
              </TableCell>
              <TableCell>{account.username}</TableCell>
              <TableCell>{account.email}</TableCell>
              <TableCell>{account.mobile}</TableCell>
              <TableCell align="right">
                {account.role.map((role, roleindex) => {
                  return (
                    <div key={roleindex}>
                      <div>{role.name}</div>
                    </div>
                  );
                })}
              </TableCell>
              <TableCell align="right">{account.status == "ACTIVE" ? "Hoạt động" : "Không hoạt động"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ListAccounts;
