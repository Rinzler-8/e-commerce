import React from "react";
import AccountResultFormItem from "./AccountResultFormItem";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

function ListAccounts(props) {
  // Lấy các props từ bên trên truyền xuống
  let { onHandleDeactivateBtn, onHandleEditBtn } = props;
  let stateRedux = useSelector((state) => state);
  let listAccount = stateRedux.listAccountReducer;
  console.log("accounts", listAccount);
  // Hàm xử lý khi click vào nút Edit
  let handleUpdateAccountButton = (account) => {
    // dispatchRedux(actionShowUpdateForm());
    onHandleEditBtn(account);
  };
  // Hàm xử lý khi click vào nút Edit
  let handleDeactivateButton = (account) => {
    // dispatchRedux(actionShowDeactivateForm());
    onHandleDeactivateBtn(account);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listAccount.map((account, index) => (
            <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="account">
                {account.id}
              </TableCell>
              <TableCell component="th" scope="account">
                {account.username}
              </TableCell>
              <TableCell align="right">{account.email}</TableCell>
              <TableCell align="right">{account.mobile}</TableCell>
              <TableCell align="right">{account.role}</TableCell>
              <TableCell align="right">{account.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ListAccounts;
