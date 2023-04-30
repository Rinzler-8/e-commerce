import { getOrderStatusAPI } from "../../API/OrderStatusAPI";
import * as Types from "../Contant/OrderStatusActionType";

// Viết các Action liên quan đến Call API
export const actionFetchStatusAPI = () => {
  return (dispatch) => {
    return getOrderStatusAPI().then((response) => {
      // console.log("status response", response);
      dispatch(actionFetchOrderStatusRedux(response));
    });
  };
};

// Dispath action này tới redux để lưu list Account vào redux
export const actionFetchOrderStatusRedux = (orderStatus) => {
  return {
    type: Types.FETCH_ORDER_STATUS,
    payload: orderStatus,
  };
};
