import * as Types from "../Contant/ProductActionType";

var initialState = {};

const SingleProduct = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_SINGLE_PRODUCT:
      state = action.payload;
      console.log("single: ", state)
      return { ...state };
    default:
      return { ...state };
  }
};

export default SingleProduct;
