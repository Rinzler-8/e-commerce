import * as Types from "../Contant/CartActionType";

var initialState = {
  open: false,
  quantity: 0,
  cartItems: [],
};

// var initialState = [{"name":"testname","quantity": 15, price: 150, "id":45}];
const Cart = (state = initialState, action) => {
  let cartListState = state;
  switch (action.type) {
    case Types.FETCH_CART_USER_ID:
      state = action.payload;
      return {
        quantity: 0,
        cartItems: [...state],
      };
    case Types.INC_ITEM_QTY:
      let idInc = action.payload.cart_id;
      let indexUp = cartListState.cartItems.findIndex((prod) => prod.cart_id === idInc);
      cartListState.cartItems[indexUp].quantity += 1;
      cartListState.cartItems[indexUp].total_price = cartListState.cartItems[indexUp].price * cartListState.cartItems[indexUp].quantity;
      return cartListState;
    case Types.DEC_ITEM_QTY:
      let idDec = action.payload.cart_id;
      let indexDown = cartListState.cartItems.findIndex((prod) => prod.cart_id === idDec);
      cartListState.cartItems[indexDown].quantity -= 1;
      cartListState.cartItems[indexDown].total_price = cartListState.cartItems[indexDown].price * cartListState.cartItems[indexDown].quantity;
      return cartListState;
    case Types.UPDATE_ITEM_QTY:
      let idUpdate = action.payload.cart_id;
      let indexUpdate = cartListState.cartItems.findIndex((prod) => prod.cart_id === idUpdate);
      cartListState.cartItems[indexUpdate].quantity = action.payload.quantity;
      cartListState.cartItems[indexUpdate].total_price = cartListState.cartItems[indexUpdate].price * cartListState.cartItems[indexUpdate].quantity;
      return cartListState;
    case Types.UPDATE_CART_QTY:
      cartListState.quantity += action.payload;
      cartListState.open = true;
      // console.log("update: ", cartListState)
    default:
      return { ...state };
  }
};

export default Cart;
