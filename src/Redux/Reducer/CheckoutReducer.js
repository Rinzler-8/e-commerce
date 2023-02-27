import * as Types from "../Contant/CheckoutActionType";

var orderInfo = {};
var orderItems = [];

const OrderInfo = (state, action) => {
  switch (action.type) {
    case Types.FETCH_CHECKOUT:
      state = action.payload;
      // state = orderInfo;
      console.log("order info state: ", state);
      return {...state};

    default:
      return {...state};
  }
};

const OrderItems = (state, action) => {
  switch (action.type) {
    case Types.FETCH_ORDER_ITEMS:
      orderItems = action.payload;
      // state = orderItems;
      console.log("order items state: ", action.payload);
      // return [...state];
      return orderItems;
    default:
      return [state];
  }
};

export { OrderInfo, OrderItems };
