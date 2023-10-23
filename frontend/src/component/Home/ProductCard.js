import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import AOS from 'aos';
import 'aos/dist/aos.css';

// options for rating stars


const ProductCard  = ({ product }) => {

    const options = {
        edit: false,
        // color: "#434242",
        color: "#B4B4B3",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,// window width < 600 px star size will be 20 else 25 
        value: product.ratings,
        isHalf: true,
        // isHalf ie take value with decimal value also 2.5
    };
    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <Link className="productCard" to={'/product/'+product._id}
            data-aos="zoom-in"
            data-aos-delay="40"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
        >
            {/* product id that comes from home.js will go to product.id */}
            <img src={product.image[0].url} alt={product.name} />
            <p>{product.name}</p>

            <div>
                <ReactStars {...options} /> <span> ({product.numberOfReviews} Reviews) </span>
            </div>
            <span>&#8377;{product.price}</span>
        </Link>
    );
}

export default ProductCard ;