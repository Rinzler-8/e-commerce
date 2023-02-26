import * as Types from "../Contant/CheckoutActionType";

var orderInfo = [];
var orderItems = [];

const OrderInfo = (state, action) => {
  switch (action.type) {
    case Types.FETCH_CHECKOUT:
      orderInfo = action.payload;
      // console.log("order info state: ", orderInfo);
      return orderInfo;

    default:
      return orderInfo;
  }
};

const OrderItems = (state, action) => {
  switch (action.type) {
    case Types.FETCH_ORDER_ITEMS:
      orderItems = action.payload;
      console.log("order items state: ", orderItems);
      // return [...state];
      return action.payload;
    default:
      return orderItems;
  }
};

export { OrderInfo, OrderItems };
