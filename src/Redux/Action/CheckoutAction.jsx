import { getOrderInfoAPI, getOrderItemsAPI, checkoutAPI } from "../../API/CheckoutAPI";
import * as Types from "../Contant/CheckoutActionType";

// Viết các Action liên quan đến Call API
export const actionCheckoutAPI = (item) => {
  return (dispatch) => {
    return checkoutAPI(item).then((response) => {
      dispatch(actionGetOrderInfoRedux(response));
    });
  };
};


export const actionGetOrderInfoAPI = (userId) => {
  return (dispatch) => {
    return getOrderInfoAPI(userId).then((response) => {
      dispatch(actionGetOrderInfoRedux(response));
    });
  };
};

// Dispath action này tới redux để lưu 1 Cart vào redux
export const actionGetOrderInfoRedux = (checkout) => {
  return {
    type: Types.FETCH_CHECKOUT,
    payload: checkout,
  };
};

export const actionGetOrderItemsAPI = (sessionId) => {
  return (dispatch) => {
    return getOrderItemsAPI(sessionId).then((response) => {
      console.log("response",response)
      
      dispatch(actionGetOrderItemsRedux(response));
    });
  };
};

// Dispath action này tới redux để lưu 1 Cart vào redux
export const actionGetOrderItemsRedux = (items) => {
  return {
    type: Types.FETCH_ORDER_ITEMS,
    payload: items,
  };
};
