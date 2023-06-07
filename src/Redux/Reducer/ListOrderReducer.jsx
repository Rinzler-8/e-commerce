import * as Types from "../Contant/CheckoutActionType";

var initialState = [];

const ListOrder = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_ORDER_LIST:
      state = action.payload;
      // console.log("payload: ", state);
      return [...state];
    case Types.DELETE_ORDER:
      let idDel = action.payload;
      let listOrderState = state;

      let indexDel = listOrderState.findIndex((order) => order.id === idDel);
      listOrderState.splice(indexDel, 1);

      return listOrderState;
    default:
      return [...state];
  }
};

export default ListOrder;
