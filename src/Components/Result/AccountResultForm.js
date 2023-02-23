import React from "react";
import { Table, Container } from "reactstrap";
import AccountResultFormItem from "./AccountResultFormItem";

function AccountResultForm(props) {
  // Lấy các props từ bên trên truyền xuống
  let { onHandleDeactivateBtn, onHandleEditBtn } = props;

  return (
    <Container>
      <br />
      <h3>Danh sách Account</h3>
      <Table hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Role</th>
            <th>Status</th>
            <th>Ban Days</th>
            <th>Deactivate</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          <AccountResultFormItem onHandleDeactivateBtn={onHandleDeactivateBtn} onHandleEditBtn={onHandleEditBtn} />
        </tbody>
      </Table>
    </Container>
  );
}

export default AccountResultForm;
