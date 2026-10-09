const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 2000 ? 500 : res.statusCode;
    let message = err.message;

    if (err.name === "CastError") {
        statusCode = 404;
        message = "Invalid ID format";
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    });
};

module.exports = { errorHandler };