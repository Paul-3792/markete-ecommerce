import { useParams, Link } from 'react-router-dom'

function OrderConfirmationPage() {
    const { id } = useParams()

    return (
        <div className="p-8 max-w-lg mx-auto text-center">
            <h1 className="text-3xl font-bold text-green mb-4">Order Placed!</h1>
            <p className="text-gray-600 mb-2">Thank you for your order.</p>
            <p className="text-gray-500 text-sm mb-6">Order ID: {id}</p>
            <Link to="/products" className="text-indigo-700 hover:underline">
            Continue Shopping →
            </Link>
        </div>
    )
}

export default OrderConfirmationPage