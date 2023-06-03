import { addProductNewAPI, deleteProductAPI, getProductAPIList, updateProductAPI, getSingleProductAPI, getProductByCatAPI, importXLSXProductAPI } from "../../API/ProductAPI";
import * as Types from "../Contant/ProductActionType";
import * as Types_Page from "../Contant/PageActionType";
import { actionToggleUpdateFormRedux } from "./FormUpdateAction";
import { actionChangePage, actionChangeSortDirection, actionChangeSortField } from "./PageAction";
// Viết các Action liên quan đến Call API
export const actionFetchProductAPI = (filter) => {
  return (dispatch) => {
    return getProductAPIList(filter).then((response) => {
      // console.log("reponseAPI:", response);
      dispatch(actionFetchProductRedux(response.content));
      dispatch(actionSetTotalPageProductRedux(response.totalPages));
      dispatch(actionSetTotalElementsProductRedux(response.totalElements));
    });
  };
};
export const actionFetchProductByCatAPI = (category) => {
  return (dispatch) => {
    return getProductByCatAPI(category).then((response) => {
      // console.log("reponseAPI:", response);
      dispatch(actionFetchProductCatRedux(response.content));
      dispatch(actionSetTotalPageProductRedux(response.totalPages));
      dispatch(actionSetTotalElementsProductRedux(response.totalElements));
    });
  };
};
export const actionFetchSingleProductAPI = (id) => {
  return (dispatch) => {
    return getSingleProductAPI(id).then((response) => {
      dispatch(actionFetchSingleProductRedux(response));
      // console.log("single Product Redux: ", response);
    });
  };
};

// Dispath action này tới redux để lưu list Product vào redux
export const actionFetchProductRedux = (products) => {
  return {
    type: Types.FETCH_PRODUCT_LIST,
    payload: products,
  };
};

// Dispath action này tới redux để lưu list Product vào redux
export const actionFetchProductCatRedux = (productCat) => {
  return {
    type: Types.FETCH_PRODUCT_CAT,
    payload: productCat,
  };
};

// Dispath action này tới redux để lưu 1 Product vào redux
export const actionFetchSingleProductRedux = (product) => {
  return {
    type: Types.FETCH_SINGLE_PRODUCT,
    payload: product,
  };
};

// Dispath action này tới redux để lấy tổng số trang Product
export const actionSetTotalPageProductRedux = (totalPage) => {
  return {
    type: Types_Page.SET_TOTAL_PAGE,
    payload: totalPage,
  };
};
// Dispath action này tới redux để lấy tổng số trang Product
export const actionSetTotalElementsProductRedux = (totalElements) => {
  return {
    type: Types_Page.SET_TOTAL_ELEMENTS,
    payload: totalElements,
  };
};

// Acction thêm mới Product
export const actionAddProductAPI = (ProductNew) => {
  return (dispatch) => {
    return addProductNewAPI(ProductNew).then((response) => {
      console.log("reponseAPI After add New Product:", response);
      alert("Tao san pham thanh cong");
      dispatch(actionFetchProductAPI());
      dispatch(actionChangePage(0)); // Chuyển về trang 1 sau khi thêm mới thành công
      dispatch(actionChangeSortField("id")); // Thay đổi trường sort về id
      dispatch(actionChangeSortDirection("DESC")); // Sort theo chiều giảm dần
    });
  };
};

// Acction xóa Product
export const actionDeleteProductAPI = (id) => {
  // console.log("deleteProductById: ", id);
  return (dispatch) => {
    return deleteProductAPI(id).then((response) => {
      console.log("response sau khi xóa Product: ", response);
      dispatch(actionFetchProductAPI());
      dispatch(actionChangePage(0)); 
      dispatch(actionChangeSortField("id")); 
      dispatch(actionChangeSortDirection("DESC")); 
    });
  };
};

// Acction Update Product
export const actionUpdateProductAPI = (id, productUpdate) => {
  // console.log("productUpdate: ", productUpdate);
  // console.log("id: ", id);
  return (dispatch) => {
    return updateProductAPI(id, productUpdate).then((response) => {
      console.log("response sau khi Update Product: ", response);
      dispatch(actionFetchProductAPI()); // Load lại dữ liệu API
      dispatch(actionToggleUpdateFormRedux()); // Đóng FormUpdate
    });
  };
};

export const actionImportProductAPI = (file) => {
  // console.log("productUpdate: ", productUpdate);
  return (dispatch) => {
    return importXLSXProductAPI(file).then((response) => {
      dispatch(actionFetchProductAPI());
      dispatch(actionChangeSortField("id")); 
      dispatch(actionChangeSortDirection("DESC")); 
    });
  };
};
