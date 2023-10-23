const express = require("express");
const { getAllProducts } = require("../controllers/productController");
const { registerUser,
        loginUser,
        logout,
        forgotPassword,
        resetPassword,
        getUserDetails,
        updatePassword, 
        updateProfile,
        getAllUsers,
        getSingleUser,
        updateUserRole,
        RemoveUser} = require("../controllers/userController");
const { isUserLogin, authorizeRoles } = require("../middleware/userAccess");

const router = new express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);


router.route("/password/forgot").post(forgotPassword);
router.route("/password/:token").put(resetPassword);


router.route("/me").get(isUserLogin, getUserDetails);
router.route("/logout").get(logout);

router.route("/password/update").put(isUserLogin, updatePassword);
router.route("/me/update").put(isUserLogin, updateProfile);

router.route("/admin/users").get(isUserLogin, authorizeRoles("admin"), getAllUsers);
router.route("/admin/user/:id")
      .get(isUserLogin, authorizeRoles("admin"), getSingleUser)
      .put(isUserLogin, authorizeRoles("admin"),updateUserRole)
      .delete(isUserLogin, authorizeRoles("admin"),RemoveUser)





module.exports = router;