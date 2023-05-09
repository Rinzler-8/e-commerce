import { getUserStatusAPI } from "../../API/UserStatusAPI";
import * as Types from "../Contant/UserStatusActionType";

// Viết các Action liên quan đến Call API
export const actionFetchUserStatusAPI = () => {
  return (dispatch) => {
    return getUserStatusAPI().then((response) => {
      console.log("status response", response);
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
