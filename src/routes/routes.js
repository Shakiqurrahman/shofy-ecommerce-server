import { Router } from "express";
import { AddProducts, GetProducts, deleteProduct, getSingleProduct, updateProduct } from "../controllers/productsController.js";

const router = Router();

router.get("/products", GetProducts);
router.get("/product:id", getSingleProduct);
router.post("/products", AddProducts);
router.put('/products/:id', updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;