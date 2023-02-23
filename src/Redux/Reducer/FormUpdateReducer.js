import * as Types from "../Contant/FormUpdateActionType";

var initialState = {
  isShowFormUpdate: false,
  accountUpdateInfo: {},
  productUpdateInfo: {},
};

const formUpdateStatus = (state = initialState, action) => {
  switch (action.type) {
    case Types.TOGGLE_FORM_UPDATE:
      return {
        ...state,
        isShowFormUpdate: !state.isShowFormUpdate,
      };
    case Types.FETCH_ACCOUNT_UPDATE_INFO:
      console.log("account update payload: ", action.payload);
      return {
        ...state,
        accountUpdateInfo: action.payload,
      };
    case Types.FETCH_PRODUCT_UPDATE_INFO:
      return {
        ...state,
        productUpdateInfo: action.payload,
      };
    default:
      return { ...state };
  }
};

export default formUpdateStatus;
