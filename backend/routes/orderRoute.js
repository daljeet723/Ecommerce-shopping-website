const express = require("express");
const { createOrder, 
        getSingleOrder,
        myOrders, 
        getAllOrders,
        updateOrderStatus,
        deleteOrder} = require("../controllers/orderController");
const { isUserLogin, authorizeRoles } = require("../middleware/userAccess");
const router =new express.Router();

router.route("/order/new").post( isUserLogin,createOrder);
router.route("/order/:id").get(isUserLogin, getSingleOrder);
router.route("/orders/me").get(isUserLogin,myOrders)

router.route("/admin/order").get(isUserLogin, authorizeRoles("admin"),getAllOrders)
router.route("/admin/order/:id")
    .put(isUserLogin, authorizeRoles("admin"),updateOrderStatus)
    .delete(isUserLogin, authorizeRoles("admin"),deleteOrder)

module.exports = router;