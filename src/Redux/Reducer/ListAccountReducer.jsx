import * as Types from "../Contant/AccountActionType";

var initialState = [];

const ListAccount = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_ACCOUNT_LIST:
      console.log("payload: ", action.payload);
      // let listAccountAPI = action.payload;
      // return listAccountAPI;
      state = action.payload;
      return [...state];
    case Types.DELETE_ACCOUNT:
      let idDel = action.payload;
      let listAccountState = state;
      let indexDel = listAccountState.findIndex((account) => account.id === idDel);
      listAccountState.splice(indexDel, 1);

      return listAccountState;
    default:
      return [...state];
  }
};

export default ListAccount;
