import * as Types from "../Contant/EnumActionType";

var initialState = [];

const Role = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_ROLE:
      // let listCategoryAPI = action.payload;
      // return listCategoryAPI;
      state = action.payload;

      return [...state];
    default:
      return [...state];
  }
};

export default Role;
