import { Router } from "express";
import {
    AddProducts,
    GetProducts,
    deleteProduct,
    getSingleProduct,
    updateProduct,
} from "../controllers/productsController.js";
import { checkUser } from "../controllers/userController.js";
const router = Router();

// for product
router.get("/products", GetProducts);
router.get("/product:id", getSingleProduct);
router.post("/products", AddProducts);
router.put("/products/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

// for user__auth
router.post("/userauth", checkUser);

export default router;
