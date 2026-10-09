const axios = require("axios");


// @desc Verify a flutterwave transaction
// @route GET /api/payment/verify/:transactionId
const verifyTransaction = async (req, res, next) => {
    try {
        const { transactionId } = req.params;

        const response = await axios.get(
            `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
                },
            }
        );

        const { status, data } = response.data;

        if(status !== "success" || data.status !== "successful") {
            return res.status(400).json({ message: "Payment verification failed" });
        }

        res.status(200).json({
            verified: true,
            amount: data.amount,
            currency: data.currency,
            customerEmail: data.customer.email,
            txRef: data.tx_ref,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { verifyTransaction };