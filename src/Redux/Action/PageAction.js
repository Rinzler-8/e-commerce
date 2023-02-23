import * as Types from "../Contant/PageActionType";

export const actionChangePage = (page) => {
  return {
    type: Types.CHANGE_PAGE,
    payload: page,
  };
};

export const actionChangeSize = (size) => {
  return {
    type: Types.CHANGE_SIZE,
    payload: size,
  };
};

export const actionChangeSortField = (field) => {
  return {
    type: Types.CHANGE_SORT_FIELD,
    payload: field,
  };
};

export const actionChangeSortDirection = (direction) => {
  return {
    type: Types.CHANGE_SORT_DIRECTION,
    payload: direction,
  };
};

export const actionSearch = (valueSearch) => {
  return {
    type: Types.SEARCH,
    payload: valueSearch,
  };
};
