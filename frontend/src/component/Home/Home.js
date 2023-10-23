import React, { Fragment, useEffect } from "react";
import shoppingImage from "../../images/shop.jpg";
import ProductCard  from "./ProductCard.js";

import Loader from "../layout/Loader/Loader.js"
import "./Home.css";

import AOS from 'aos';
import 'aos/dist/aos.css';

import { clearError, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";

//to give alert messages...defined in index.js
import {useAlert }from "react-alert";
import Metadata from "../layout/Metadata.js"


//fragment is empty tag = <></>

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    //select things to display from store whuch has product state
    const { loading, error, products } = useSelector(
        state => state.products);
    //state.products name should be same as we use in reducer ALL_PRODUCTS_SUCCESS

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearError());
        }
        dispatch(getProduct());
    }, [dispatch, error, alert]);

    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <Fragment>
            {loading ? <Loader/> :
                <Fragment>
                    <Metadata title="D-Moon" />
                    <div className="homeContainer">
                        <div className="banner">
                            <div className="about">

                                <h2>Embrace Your Lifestyle With <span class="animate-charcter">D-Moon Collection</span></h2>


                                <p>We provide unmatched quality, comfort, and style across the country.
                                    Our experts function in bringing your vision to your life.</p>
                                <a href="#container">
                                    <button id="shopNow" >Shop Now </button>
                                </a>
                            </div>
                            <div className="homeImage">
                                <img src={shoppingImage} class="img-fluid" alt="shopping" />
                                <p >Get 30% Off on Top Brands</p>
                            </div>
                        </div>

                        <h4 data-aos="flip-left">Featured Products</h4>
                        <div className="productContainer" id="productContainer">
                            {products && products.map((product) => (<ProductCard  product={product} />))}
                        </div>
                    </div>
                </Fragment>}
        </Fragment>
    );
};
export default Home;