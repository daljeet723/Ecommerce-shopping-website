import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducers, productReducers } from "./reducers/productReducers";


//reducers can be product, etc, so combining in one reducer
const reducer = combineReducers({
    products: productReducers,
    productDetail: productDetailsReducers
})

let initialState = {};

const middleware = [thunk];

//will connect to redux devtools to see real time data/ to fetch from database
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
//for store maintain 3 things --> reducers, actions, constants