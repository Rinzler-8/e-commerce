import * as Types from "../Contant/CheckoutActionType";
var orderItems = [];

const OrderInfo = (state, action) => {
  switch (action.type) {
    case Types.FETCH_CHECKOUT:
      state = action.payload;
      return {...state};

    default:
      return {...state};
  }
};

const OrderItems = (state, action) => {
  switch (action.type) {
    case Types.FETCH_ORDER_ITEMS:
      orderItems = action.payload;
      // return [...state];
      return orderItems;
    default:
      return [state];
  }
};

export { OrderInfo, OrderItems };
