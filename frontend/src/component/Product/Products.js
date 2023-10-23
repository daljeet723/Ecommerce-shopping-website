import React, { Fragment, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import "./Products.css";
import { clearError, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "../layout/Metadata.js"
import Pagination from "react-js-pagination"
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import Rating from "react-rating-stars-component";

const categories = [
    "All",
    "Footwear",
    "Fashion",
    "Kitchen",
    "Home Decor",
    "Sports",
    "Laptop",
    "Health",
];

const Products = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
  
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedRating, setSelectedRating] = useState(0);

    const { loading, error, products, productsCount, resultPerPage, filteredProductsCount } = useSelector(
        state => state.products);

    const { keyword } = useParams();

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    }

    let count = filteredProductsCount;

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
          }
        dispatch(getProduct(keyword, currentPage, price, selectedCategory, selectedRating));
    }, [dispatch, keyword, currentPage, price, selectedCategory, selectedRating,alert, error]);



    return (
        <Fragment>

            {loading ? <Loader /> : (<Fragment>
                <Metadata title="PRODUCTS" />
                <h2 className="productsHeading">Products</h2>

                {/* DISPLAY PRODUCTS */}
                <div className="products">
                    {products && products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>

                {/* FILTERS SECTION  */}
                <div className="filterBox">
                    <Typography>Price</Typography>
                    <Slider
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={25000}
                    />
                    <Typography className="filterPrice">
                        <div>Rs:{price[0]}</div>
                        <div>Rs:{price[1]}</div>
                    </Typography>

                    <Typography className="categoryBox">Category</Typography>
                    <ul className="categoryList">

                        {/* loop through array */}
                        {categories.map((category) => {
                            return <li className="category-link"
                                key={category}
                                onClick={() => setSelectedCategory(category)}>
                                {category}
                            </li>
                        })}
                    </ul>

                    <Typography className="categoryBox">Rating</Typography>
                    <Rating
                        count={5}
                        value={selectedRating}
                        onChange={(rating) => setSelectedRating(rating)}
                        size={24}
                        activeColor="tomato"
                    />
                </div>

                {/* Below code : conditional rendering block in JSX,
                 which means it's used to conditionally render some JSX (HTML-like) elements based on a condition 
                 
                 Example : resultPerPage = 8 
                            productsCount = 12
                            
                it indictaes there are more items to display, 
                in this case Pagination is used */}
                {resultPerPage < count && (
                    <div className="paginationBox">
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={productsCount}
                            onChange={setCurrentPageNo}
                            nextPageText="Next"
                            prevPageText="Prev"
                            firstPageText="1st"
                            lastPageText="Last"
                            itemClass="page-item"
                            linkClass="page-link"
                            activeClass="pageItemActive"
                            activeLinkClass="pageLinkActive"
                        />
                    </div>
                )}

            </Fragment>)}
        </Fragment>

    )
}
export default Products
