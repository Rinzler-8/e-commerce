import { combineReducers } from "redux";
import formDeactivateStatus from "./FormDeactivateReducer";
import formUpdateStatus from "./FormUpdateReducer";
import ListAccount from "./ListAccountReducer";
import pageFilter from "./PaginationReducer";
import ListCategory from "./ListCategoryReducer";
import ListManufacturer from "./ListManufacturerReducer";
import ListProduct from "./ListProductReducer";
import SingleProduct from "./SingleProductReducer";
import Cart from "./CartReducer";

const RootReducers = combineReducers({
  listAccountReducer: ListAccount,
  listProductReducer: ListProduct,
  singleProductReducer: SingleProduct,
  cartReducer: Cart,
  pageFilterReducer: pageFilter,
  listCategoryReducer: ListCategory,
  listManufacturerReducer: ListManufacturer,
  formDeactivateReducer: formDeactivateStatus,
  formUpdateReducer: formUpdateStatus,
});

export default RootReducers;
