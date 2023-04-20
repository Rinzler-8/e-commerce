import { addToCartAPI, deleteAllCartItemsAPI, getCartAPIList, updateCartAPI, getCartByUserIdAPI, deleteCartItemAPI } from "../../API/CartAPI";
import * as Types from "../Contant/CartActionType";
import * as Types_Page from "../Contant/PageActionType";
import { actionChangePage, actionChangeSortDirection, actionChangeSortField } from "./PageAction";
// Viết các Action liên quan đến Call API
export const actionGetCartByUserIdAPI = (id) => {
  return (dispatch) => {
    return getCartByUserIdAPI(id).then((response) => {
      dispatch(actionGetCartByUserIdRedux(response));
      // console.log("Cart Redux: ", response);
    });
  };
};

// Dispath action này tới redux để lưu 1 Cart vào redux
export const actionGetCartByUserIdRedux = (cart) => {
  return {
    type: Types.FETCH_CART_USER_ID,
    payload: cart,
  };
};

export const actionAddItemQty = (product) => {
  return {
    type: Types.INC_ITEM_QTY,
    payload: product,
  };
};

export const actionDecItemQty = (product) => ({
  type: Types.DEC_ITEM_QTY,
  payload: product,
});

export const actionUpdateItemQty = (product) => ({
  type: Types.UPDATE_ITEM_QTY,
  payload: product,
});

export const actionUpdateCartQty = (qty) => ({
  type: Types.UPDATE_CART_QTY,
  payload: qty,
});

export const actionOpenCart = () => ({
  type: Types.OPEN_CART,
});

export const actionCloseCart = () => ({
  type: Types.CLOSE_CART,
});

// Acction thêm mới Cart
export const actionAddToCartAPI = (id, item) => {
  return (dispatch) => {
    return addToCartAPI(id, item).then((response) => {});
  };
};

// Acction Update Cart
export const actionUpdateCartAPI = (id, cartUpdate) => {
  return (dispatch) => {
    return updateCartAPI(id, cartUpdate).then((response) => {
      dispatch(actionUpdateItemQty(cartUpdate));
      // console.log("response sau khi Update Cart: ", response);
    });
  };
};
// Acction delete Cart items
export const actionDeleteCartItemAPI = (cartId, userId) => {
  return (dispatch) => {
    return deleteCartItemAPI(cartId, userId).then((response) => {
      dispatch(actionGetCartByUserIdRedux(response));
      // console.log("response sau khi delete Cart item: ", response);
    });
  };
};

// Acction delete Cart items
export const actionDeleteAllCartItemsAPI = (userId) => {
  return (dispatch) => {
    return deleteAllCartItemsAPI(userId).then((response) => {
      dispatch(actionGetCartByUserIdRedux(response));
      // console.log("response sau khi delete Cart item: ", response);
    });
  };
};
