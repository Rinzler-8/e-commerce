import * as Types from "../Contant/FormUpdateActionType";

var initialState = {
  isShowFormUpdate: false,
  accountUpdateInfo: {},
  productUpdateInfo: {},
  orderUpdateInfo: {},
};

const formUpdateStatus = (state = initialState, action) => {
  switch (action.type) {
    case Types.TOGGLE_FORM_UPDATE:
      return {
        ...state,
        isShowFormUpdate: !state.isShowFormUpdate,
      };
    case Types.FETCH_ACCOUNT_UPDATE_INFO:
      return {
        ...state,
        accountUpdateInfo: action.payload,
      };
    case Types.FETCH_PRODUCT_UPDATE_INFO:
      console.log("product update payload: ", action.payload);

      return {
        ...state,
        productUpdateInfo: action.payload,
      };
    case Types.FETCH_ORDER_UPDATE_INFO:
      // console.log("order update payload: ", action.payload);

      return {
        ...state,
        orderUpdateInfo: action.payload,
      };
    default:
      return { ...state };
  }
};

export default formUpdateStatus;
