const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const paymentRoutes = require("./routes/paymentRoutes");


//Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
// app.use(errorHandler);

//Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);


// Test Routes
app.get("/api/health", (req,res) => {
    res.status(200).json({status: "okay", message: "Server is running"});
});
app.get("/api/version", (req,res) => {
    res.status(200).json({status: "version", message: "1.0.0"});
});

app.use(errorHandler);

module.exports = app;