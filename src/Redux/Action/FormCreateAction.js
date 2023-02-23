import { SHOW_PRODUCT_FORM, CLOSE_PRODUCT_FORM } from "../Contant/ProductActionType";
import { SHOW_ACCOUNT_FORM, CLOSE_ACCOUNT_FORM } from "./../Contant/AccountActionType";
export const actionShowAccountForm = () => {
  return {
    type: SHOW_ACCOUNT_FORM,
  };
};
export const actionShowProductForm = () => {
  return {
    type: SHOW_PRODUCT_FORM,
  };
};

export const actionCloseAccountForm = () => {
  return {
    type: CLOSE_ACCOUNT_FORM,
  };
};

export const actionCloseProductForm = () => {
  return {
    type: CLOSE_PRODUCT_FORM,
  };
};
