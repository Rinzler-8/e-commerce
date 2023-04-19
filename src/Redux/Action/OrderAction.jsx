import { addOrderNewAPI, deleteOrderAPI, getOrderAPIList, updateOrderAPI, getSingleOrderAPI } from "../../API/OrderAPI";
import * as Types from "../Contant/CheckoutActionType";
import * as Types_Page from "../Contant/PageActionType";
import { actionToggleUpdateFormRedux } from "./FormUpdateAction";
import { actionChangePage, actionChangeSortDirection, actionChangeSortField } from "./PageAction";
// Viết các Action liên quan đến Call API
export const actionFetchOrderAPI = (filter) => {
  return (dispatch) => {
    return getOrderAPIList(filter).then((response) => {
      // console.log("reponseAPI:", response);
      dispatch(actionFetchOrderRedux(response.content));
      dispatch(actionSetTotalPageOrderRedux(response.totalPages));
      // console.log("Orders Redux: ", response);
    });
  };
};


// Dispath action này tới redux để lưu list order vào redux
export const actionFetchOrderRedux = (Orders) => {
  return {
    type: Types.FETCH_ORDER_LIST,
    payload: Orders,
  };
};


// Dispath action này tới redux để lấy tổng số trang order
export const actionSetTotalPageOrderRedux = (totalPage) => {
  return {
    type: Types_Page.SET_TOTAL_PAGE,
    payload: totalPage,
  };
};

// Acction thêm mới order
export const actionAddOrderAPI = (OrderNew) => {
  return (dispatch) => {
    return addOrderNewAPI(OrderNew).then((response) => {
      console.log("reponseAPI After add New order:", response);
      alert("Tao san pham thanh cong");
      dispatch(actionFetchOrderAPI());
      dispatch(actionChangePage(0)); // Chuyển về trang 1 sau khi thêm mới thành công
      dispatch(actionChangeSortField("id")); // Thay đổi trường sort về id
      dispatch(actionChangeSortDirection("DESC")); // Sort theo chiều giảm dần
    });
  };
};

// Acction xóa order
export const actionDeleteOrderAPI = (id) => {
  // console.log("deleteOrderById: ", id);
  return (dispatch) => {
    return deleteOrderAPI(id).then((response) => {
      console.log("response sau khi xóa order: ", response);
      alert("Xoa san pham thanh cong");
      dispatch(actionFetchOrderAPI());
      dispatch(actionChangePage(0)); // Chuyển về trang 1 sau khi thêm mới thành công
      dispatch(actionChangeSortField("id")); // Thay đổi trường sort về id
      dispatch(actionChangeSortDirection("DESC")); // Sort theo chiều giảm dần
    });
  };
};

// Acction Update order
export const actionUpdateOrderAPI = (id, OrderUpdate) => {
  // console.log("OrderUpdate: ", OrderUpdate);
  // console.log("id: ", id);
  return (dispatch) => {
    return updateOrderAPI(id, OrderUpdate).then((response) => {
      console.log("response sau khi Update order: ", response);
      dispatch(actionFetchOrderAPI()); // Load lại dữ liệu API
      dispatch(actionToggleUpdateFormRedux()); // Đóng FormUpdate
    });
  };
};
