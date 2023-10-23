const { application } = require("express");
const { geoSearch } = require("../models/productModel");

class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr
    }


    //to search specific product
    search() {
        const keyword = this.queryStr.keyword
            ?//if keyword found
            {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i" //case insensitive
                }

            } : {}
        this.query = this.query.find({ ...keyword });
        return this
    }

    filter() {
        //in javascript cannot directly copy as it takes refernce, so use {...}
        const queryStrCopy = { ...this.queryStr };
        const removeFields = ["keyword", "page", "limit"]; //page ,limit from pagination
        removeFields.forEach((key) => delete queryStrCopy[key]);

        //filter for price and rating
        let queryStr = JSON.stringify(queryStrCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => '$' + key);

        //gt = greatr than less than and equal to 
        // replace string with $ bcz fileter works with gt lt for proce less than , greater than

        this.query = this.query.find(JSON.parse(queryStr)); //this.query = product.find()
        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1; //default at page 1
        const skipPage = resultPerPage * (currentPage - 1);
        //if at page 2 limit 10 per page, page 2 starts from product 11 
        this.query = this.query.limit(resultPerPage).skip(skipPage);
        return this
    }
}
module.exports = ApiFeatures

// use in productController
//http://localhost/products?keyword=laptop
//anything after ? is query and laptop is quervyStr