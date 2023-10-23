import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from "react-material-ui-carousel";
import ReactStars from "react-rating-stars-component";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearError, getProductDetails } from "../../actions/productAction.js";
import { Link } from "react-router-dom"
import ReviewCard from './ReviewCard';
import Loader from "../layout/Loader/Loader"
import {useAlert} from "react-alert"
import Metadata from '../layout/Metadata';


const ProductDetails = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { product, loading, error } = useSelector((state) => state.productDetail);

    const {id}= useParams();

    useEffect(
        () => {
            if(error){
                alert.error(error);
                dispatch(clearError());
            }
            dispatch(getProductDetails(id));
        },
        [dispatch, id, alert, error]
    );
    const options = {
        edit: false,
        color: "#434242",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,// window width < 600 px star size will be 20 else 25 
        value: product.ratings,
        isHalf: true,
        // isHalf ie take value with decimal value also 2.5
    };

    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleInputChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        if (!isNaN(newQuantity) && newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    const handleCreateReview = ()=>{
        <Link to="/review"></Link>
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                <Metadata title={product.name+ " - DMoon"}/>
                    <div className='ProductDetails'>
                        <div>
                            <Carousel>
                                {product.image &&
                                    product.image.map((item, i) => (
                                        <img
                                            className="CarouselImage"
                                            key={i}
                                            src={item.url}
                                            alt={`${i} Slide`}
                                        />
                                    ))}
                            </Carousel>
                        </div>

                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <ReactStars {...options} />
                                <span className="detailsBlock-2-span">
                                    {" "}
                                    ({product.numOfReviews} Reviews)
                                </span>
                            </div>
                            <div className='detailsBlock-3'>
                                <h1>&#8377;{product.price}</h1>
                                <div className='detailsBlock-3-1'>
                                    <div className='detailsBlock-3-1-1'>
                                        <button onClick={increaseQuantity}>+</button>
                                        <input
                                            type="number"
                                            value={quantity}
                                            onChange={handleInputChange}
                                            min="1"
                                        />
                                        <button onClick={decreaseQuantity}>-</button>
                                    </div>
                                    <button>Add to Cart</button>
                                </div>
                                <p>
                                    Status:
                                    <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                        {product.stock < 1 ? " Out of stock" : " In stock"}
                                    </b>
                                </p>
                            </div>
                            <div className='detailsBlock-4'>
                                Description : <p>{product.description}</p>
                            </div>

                            <button className='submitReview'
                            onClick={handleCreateReview}>
                            Submit Review</button>
                        </div>
                    </div>
                    <h3 className='reviewsHeading'> Reviews</h3>
                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews &&
                                product.reviews.map((review) => (
                                    <ReviewCard key={review._id} review={review} />
                                ))}
                        </div>
                    ) : (
                        <p className="noReviews">No Reviews Yet</p>
                    )}

                </Fragment>
            )}
        </Fragment>
    )
}

export default ProductDetails