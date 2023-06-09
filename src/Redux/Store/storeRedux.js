import { createStore, applyMiddleware, compose } from "redux";
import RootReducers from "./../Reducer/RootReducer";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to storage for web
// import { composeWithDevTools } from 'redux-devtools-extension';

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, RootReducers);

const middleware = compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const storeRedux = createStore(persistedReducer, middleware);
const persistor = persistStore(storeRedux);

export {storeRedux, persistor};
