import { getOrderStatusAPI, getUserStatusAPI, getRoleAPI } from "../../API/EnumAPI";
import * as Types from "../Contant/EnumActionType";

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

// Viết các Action liên quan đến Call API
export const actionFetchUserStatusAPI = () => {
  return (dispatch) => {
    return getUserStatusAPI().then((response) => {
      // console.log("status response", response);
      dispatch(actionFetchUserStatusRedux(response));
    });
  };
};

// Dispath action này tới redux để lưu list Account vào redux
export const actionFetchUserStatusRedux = (status) => {
  return {
    type: Types.FETCH_USER_STATUS,
    payload: status,
  };
};

export const actionFetchUserRolePI = () => {
  return (dispatch) => {
    return getRoleAPI().then((response) => {
      // console.log("status response", response);
      dispatch(actionFetchRoleRedux(response));
    });
  };
};

// Dispath action này tới redux để lưu list Account vào redux
export const actionFetchRoleRedux = (role) => {
  return {
    type: Types.FETCH_ROLE,
    payload: role,
  };
};
