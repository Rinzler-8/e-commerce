import { combineReducers } from "redux";
import formUpdateStatus from "./FormUpdateReducer";
import ListAccount from "./ListAccountReducer";
import pageFilter from "./PaginationReducer";
import ListCategory from "./ListCategoryReducer";
import ListProduct from "./ListProductReducer";
import ListOrder from "./ListOrderReducer";
import OrderStatus from "./OrderStatusReducer";
import SingleProduct from "./SingleProductReducer";
import SingleAccount from "./SingleAccountReducer";
import Cart from "./CartReducer";
import CartDrawerReducer from "./CartDrawerReducer";
import { OrderInfo, OrderItems } from "./CheckoutReducer";

const RootReducers = combineReducers({
  listAccountReducer: ListAccount,
  listProductReducer: ListProduct,
  listCategoryReducer: ListCategory,
  listOrderReducer: ListOrder,
  singleProductReducer: SingleProduct,
  singleAccountReducer: SingleAccount,
  cartReducer: Cart,
  CartDrawerReducer: CartDrawerReducer,
  checkoutReducer: OrderInfo,
  orderItemsReducer: OrderItems,
  pageFilterReducer: pageFilter,
  listCategoryReducer: ListCategory,
  orderStatusReducer: OrderStatus,
  formUpdateReducer: formUpdateStatus,
});

export default RootReducers;
