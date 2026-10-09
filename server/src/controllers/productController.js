const Product = require("../models/Product");

// @desc    Create a new product
// @route   POST /api/products
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: "Invalid product data", error: error.message });
  }
};

// @desc    Get all products
// @route   GET /api/products

const getProducts = async (req, res) => {
  try {
    const { search, category, sort, page = 1, limit = 8 } = req.query;

    const filter = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    let query = Product.find(filter);

    if (sort === "price-asc") {
      query = query.sort({ price: 1 });
    } else if (sort === "price-desc") {
      query = query.sort({ price: -1 });
    } else {
      query = query.sort({ createdAt: -1 });
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    query = query.skip(skip).limit(limitNumber);

    const products = await query;
    const totalProducts = await Product.countDocuments(filter);

  res.status(200).json({
    products,
    totalProducts,
    totalPages: Math.ceil(totalProducts / limitNumber),
    currentPage: pageNumber,
  });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// @desc Update a product
// @route PATCH /api/products/:id
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

//@desc Delete a product
//@route DELETE /api/products/:id
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found "});
    }

    res.status(200).json({ message: "Product deleted sucessfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { 
  getProducts, 
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};