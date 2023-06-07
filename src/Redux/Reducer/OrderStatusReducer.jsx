import * as Types from "../Contant/EnumActionType";

var initialState = [];

const OrderStatus = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_ORDER_STATUS:
      // let listCategoryAPI = action.payload;
      // return listCategoryAPI;
      state = action.payload;
      return [...state];
    default:
      return [...state];
  }
};

export default OrderStatus;
