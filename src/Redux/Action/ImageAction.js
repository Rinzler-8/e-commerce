import { readImgAPI, uploadImgAPI } from "../API/ImageAPI";
import * as Types from "../Contant/ProductActionType";
import * as Types_Page from "../Contant/PageActionType";
import { actionToggleUpdateFormRedux } from "./FormUpdateAction";
import { actionChangePage, actionChangeSortDirection, actionChangeSortField } from "./PageAction";
// Viết các Action liên quan đến Call API
export const actionUploadAPI = (image) => {
  return (dispatch) => {
    return uploadImgAPI(image).then((response) => {
    });
  };
};


// Acction thêm mới Product
export const actionReadAPI = (image) => {
  return (dispatch) => {
    return readImgAPI(image).then((response) => {
    });
  };
};

