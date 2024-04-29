import * as Types from "../Contant/AccountActionType";

var initialState = {};

const SingleAccount = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_SINGLE_ACCOUNT:
      state = action.payload;
      // console.log("after single: ", state)
      return { ...state };
    default:
      return { ...state };
  }
};

export default SingleAccount;
