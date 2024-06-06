import { Product } from "../models/productModel.js";
export const AddProducts = async (req, res) => {
    const { name, category, price, productImg, description } = req.body;

    try {
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            productImg,
        });

        const product = await newProduct.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error when product is adding");
    }
};

export const GetProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error when product is getting");
    }
};

export const getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }
        res.json(product);
    } catch (err) {
        console.error("Error fetching product:", err.message);
        res.status(500).send("Server error");
    }
};

export const updateProduct = async (req, res) => {
    const { name, description, price, category, productImg } = req.body;

    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.productImg = productImg || product.productImg;
        product.category = category || product.category;
        product.stock = productStock || product.stock;

        await product.save();
        res.json(product);
    } catch (err) {
        console.error("Error updating product:", err.message);
        res.status(500).send("Server error");
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }
        res.json({ msg: "Product deleted", product });
    } catch (err) {
        console.error("Error deleting product:", err.message);
        res.status(500).send("not deleting product");
    }
};
