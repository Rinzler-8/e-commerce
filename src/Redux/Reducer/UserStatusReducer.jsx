import * as Types from "../Contant/UserStatusActionType";

var initialState = [];

const UserStatus = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_USER_STATUS:
      // let listCategoryAPI = action.payload;
      // return listCategoryAPI;
      state = action.payload;
      return [...state];
    default:
      return [...state];
  }
};

export default UserStatus;
