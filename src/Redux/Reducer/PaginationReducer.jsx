import { CHANGE_PAGE, SET_TOTAL_PAGE, CHANGE_SIZE, CHANGE_SORT_DIRECTION, CHANGE_SORT_FIELD, SEARCH, SET_TOTAL_ELEMENTS } from "../Contant/PageActionType";

var initialState = {
  page: 1,
  size: 6,
  totalPages: 0,
  sort: { sortField: "id", sortDirection: "ASC" },
  search: "",
  totalElements: null,
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
    case SET_TOTAL_ELEMENTS:
      return {
        ...state,
        totalElements: action.payload,
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
        page: 1,
      };
    default:
      return { ...state };
  }
};

export default pageFilter;
