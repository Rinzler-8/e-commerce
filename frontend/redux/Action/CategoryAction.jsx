import { getCategoryAPIList } from "../../api/CategoryAPI";
import * as Types from "../Contant/CategoryActionType";

// Viết các Action liên quan đến Call API
export const actionFetchCategoryAPI = () => {
  return (dispatch) => {
    return getCategoryAPIList().then((response) => {
      dispatch(actionFetchCategoryRedux(response));
    });
  };
};

// Dispath action này tới redux để lưu list Account vào redux
export const actionFetchCategoryRedux = (listCategory) => {
  return {
    type: Types.FETCH_CATEGORY_LIST,
    payload: listCategory,
  };
};
