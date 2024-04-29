import * as Types from "../Contant/CartActionType";

const initialState = {
  isOpen: false,
};

const CartDrawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.OPEN_CART:
      return {
        ...state,
        isOpen: true,
      };
    case Types.CLOSE_CART:
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
};

export default CartDrawerReducer;