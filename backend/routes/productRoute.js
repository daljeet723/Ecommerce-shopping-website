const express = require("express");
const { getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct, 
    getProductDetail, 
    CreateProductReview, 
    getProductReview,
    deleteReview} = require("../controllers/productController");

const { isUserLogin, authorizeRoles } = require("../middleware/userAccess");

const router =new express.Router();

router.route("/products").get(getAllProducts);
router.route("/admin/product/new").post(isUserLogin,authorizeRoles('admin'),createProduct);
router
    .route("/admin/product/:id")
    .put(isUserLogin,authorizeRoles('admin'),updateProduct)
    .delete(isUserLogin,authorizeRoles('admin'),deleteProduct)

router.route("/product/:id").get(getProductDetail);
    
// router.route("/products/:id").put(updateProduct);
// router.route("/products/:id").delete(deleteProduct);
// can combine update, delete, get single product as path is same

router.route("/review").put(isUserLogin, CreateProductReview);
router.route("/review").get(getProductReview).delete( isUserLogin,deleteReview);





module.exports = router