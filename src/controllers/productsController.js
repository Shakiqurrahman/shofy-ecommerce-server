import { Product } from "../models/productModel.js";
export const AddProducts = async (req, res) => {
    const {
        productTitle,
        productCategory,
        productPrice,
        productImg,
        productDescription,
    } = req.body;

    try {
        const newProduct = new Product({
            name: productTitle,
            description: productDescription,
            price: productPrice,
            category: productCategory,
            imgUrl: productImg,
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
    const { productTitle, productDescription, productPrice, productCategory, productImg } = req.body;

    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        product.name = productTitle || product.name;
        product.description = productDescription || product.description;
        product.price = productPrice || product.price;
        product.imgUrl = productImg || product.imgUrl;
        product.category = productCategory || product.category;
        product.stock = productStock || product.stock;

        await product.save();
        res.json(product);
    } catch (err) {
        console.error('Error updating product:', err.message);
        res.status(500).send('Server error');
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
