import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,

    CREATE_REVIEW_REQUEST,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_FAIL,

    CLEAR_ERRORS
} from "../constants/productConstants";

// passing variables in case value to avoid mistakes, if varaible not present will raise error
//initially paas empty array of prodcts in state parameter
export const productReducers = (state = { products: [] }, action) => {
    //action could be product fail, success , request
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            };

        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.allProducts,
                productsCount: action.payload.productsCount,
                resultPerPage: action.payload.resultPerPage,
                filteredProductsCount: action.payload.filteredProductsCount
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
};
//use productReducers in store

export const productDetailsReducers = (state = { product: {} }, action) => {
    //action could be product fail, success , request
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            };

        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload,
            };

        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            };

        case ALL_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            };

        case CREATE_REVIEW_REQUEST:
            return {
                loading: true,
            };

        case CREATE_REVIEW_SUCCESS:
            return {
                loading: false,
                message: action.payload

            };

        case CREATE_REVIEW_FAIL:
            return {
                loading: false,
                error: action.payload
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
};