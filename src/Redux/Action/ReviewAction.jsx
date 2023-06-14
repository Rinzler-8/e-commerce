import { getReviewAPIList, reviewProductAPI } from "../../API/ReviewAPI";
import * as Types from "../Contant/CheckoutActionType";

// Viết các Action liên quan đến Call API
export const actionReviewAPI = (item) => {
  return (dispatch) => {
    return reviewProductAPI(item).then((response) => {
      // dispatch(actionGetOrderInfoRedux(response));
    });
  };
};


export const actionGetOrderInfoAPI = (userId) => {
  return (dispatch) => {
    return getReviewAPIList(userId).then((response) => {
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
