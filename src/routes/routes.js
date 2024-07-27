import { Router } from "express";
import {
    AddProducts,
    GetProducts,
    deleteProduct,
    getSingleProduct,
    updateProduct,
} from "../controllers/productsController.js";
import {
    getAllUsers,
    loginUser,
    registerUser,
} from "../controllers/userController.js";
const router = Router();

// for product
router.get("/products", GetProducts);
router.get("/product:id", getSingleProduct);
router.post("/products", AddProducts);
router.put("/products/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

// for user__auth
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/users", getAllUsers);

export default router;
