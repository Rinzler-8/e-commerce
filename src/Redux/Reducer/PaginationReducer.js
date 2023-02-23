import { CHANGE_PAGE, SET_TOTAL_PAGE, CHANGE_SIZE, CHANGE_SORT_DIRECTION, CHANGE_SORT_FIELD, SEARCH } from "./../Contant/PageActionType";

var initialState = {
  page: 0,
  size: 5,
  totalPages: 0,
  sort: { sortField: "id", sortDirection: "ASC" },
  // search: "",
};

const pageFilter = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case SET_TOTAL_PAGE:
      return {
        ...state,
        totalPages: action.payload,
      };
    case CHANGE_SIZE:
      return {
        ...state,
        size: action.payload,
      };
    case CHANGE_SORT_FIELD:
      return {
        ...state,
        sort: { ...state.sort, sortField: action.payload },
      };
    case CHANGE_SORT_DIRECTION:
      return {
        ...state,
        sort: { ...state.sort, sortDirection: action.payload },
      };
    case SEARCH:
      return {
        ...state,
        search: action.payload,
        page: 0,
      };
    default:
      return { ...state };
  }
};

export default pageFilter;
