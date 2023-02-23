import * as Types from "../Contant/FormDeactivateActionType";

var initialState = {
  isShowFormDeactivate: false,
  accountDeactivateInfo: {},
};

const formDeactivateStatus = (state = initialState, action) => {
  switch (action.type) {
    case Types.TOGGLE_FORM_DEACTIVATE:
      return {
        ...state,
        isShowFormDeactivate: !state.isShowFormDeactivate,
      };
    case Types.FETCH_ACCOUNT_DEACTIVATE_INFO:
      return {
        ...state,
        accountDeactivateInfo: action.payload,
      };
    default:
      return { ...state };
  }
};

export default formDeactivateStatus;
