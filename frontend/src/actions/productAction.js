import axios from "axios";

import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,

    CLEAR_ERRORS
} from "../constants/productConstants";


export const getProduct = (keyword = "", currentPage = 1, price = [0, 25000], selectedCategory, selectedRating = 0) => async (dispatch) => {
    //searchItemKeyword by default empty that comes from products.js

    try {
        dispatch({
            type: ALL_PRODUCT_REQUEST
        });
        //now send request to allProucts API using axios
        let link = "/api/v1/products?keyword=" + keyword + "&page=" + currentPage + "&price[gt]=" + price[0] + "&price[lt]=" + price[1] + "&ratings[gt]=" + selectedRating

        if (selectedCategory) {
            if (selectedCategory === "All") {
                link = "/api/v1/products?keyword=" + keyword + "&page=" + currentPage + "&price[gt]=" + price[0] + "&price[lt]=" + price[1] + "&ratings[gte]=" + selectedRating
            }
            else {
                link = "/api/v1/products?keyword=" + keyword + "&page=" + currentPage + "&price[gt]=" + price[0] + "&price[lt]=" + price[1] + "&category=" + selectedCategory + "&ratings[gte]=" + selectedRating
            }

        }
        const { data } = await axios.get(link);

        //after getting all products send data and success
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
            //id product fail it will handle error and send payload error msg to reducer
        });
    }
};

// GET SINGLE PRODUCT DETAIL
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        });

        const { data } = await axios.get('/api/v1/product/' + id);
        console.warn(data);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.productDetail // in productController. js returning productDetail
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        });
    }
};

export const createReview = (rating, comment, productId) => async (dispatch) => {
    try {
        dispatch({
            type: "CREATE_REVIEW_REQUEST"
        });
        const { data } = await axios.get("/api/v1/review", {
            rating, comment, productId
        });

        dispatch({
            type: "CREATE_REVIEW_SUCCESS",
            payload: data.message
        });

    } catch (error) {
        dispatch({
            type: "CREATE_REVIEW_FAILURE",
            payload: error.response.data.message
        })
    }
}
//CLEARING ERRORS
export const clearError = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
}

//TO CONNECT BACKEND WITH FRONTEND
//BOTH ARE RUNNING ON DIFF PORT
//FRONTEND == 3000, BACKEND ==4000

//SO WILL ADD PROXY IN PACKAGE.JSON
//PROXY : FRONTED HOST/ BACKEND PORT

//ADD TRIGGER IN HOME.JS TO FETCH DATA
