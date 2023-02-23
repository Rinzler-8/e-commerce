import { getManufacturerAPIList } from "../../API/ManufacturerAPI";
import * as Types from "../Contant/ManufacturerActionType";

// Viết các Action liên quan đến Call API
export const actionFetchManufacturerAPI = () => {
  return (dispatch) => {
    return getManufacturerAPIList().then((response) => {
      // console.log("reponseDepartmentAPI:", response);
      dispatch(actionFetchManufacturerRedux(response));
    });
  };
};

// Dispath action này tới redux để lưu list Account vào redux
export const actionFetchManufacturerRedux = (listManufacturer) => {
  return {
    type: Types.FETCH_MANUFACTURER_LIST,
    payload: listManufacturer,
  };
};
