import React from 'react'
import ReactStars from "react-rating-stars-component";
import profilePng from "../../images/Profile.png";

const ReviewCard = ({ review }) => {

    const options = {
        edit: false,
        color: "#434242",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,// window width < 600 px star size will be 20 else 25 
        value: review.rating,
        isHalf: true,
        // isHalf ie take value with decimal value also 2.5
    };
    return (
        <div className="reviewCard">
            <img src={profilePng} alt="User" />
            <p>{review.name}</p>
            <ReactStars {...options} />
            <span className="reviewCardComment">{review.comment}</span>
        </div>
    );
};

export default ReviewCard
