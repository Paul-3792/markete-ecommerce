import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getOrderById } from '../services/orderServices'

function OrderDetailsPage() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(id)
        setOrder(data)
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load this order')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [id])

  if (loading) return <p className="px-6 sm:px-10 py-12 text-ink-light">Loading order...</p>
  if (error) return <p className="px-6 sm:px-10 py-12 text-terracotta">{error}</p>

  return (
    <div className="px-6 sm:px-10 py-12 max-w-2xl mx-auto">
      <Link to="/account" className="text-ink-light hover:text-terracotta text-sm transition-colors">
        ← Back to orders
      </Link>

      <h1 className="font-serif text-3xl text-ink mt-4 mb-1">Order Details</h1>
      <p className="text-ink-light text-sm mb-8">
        Placed {new Date(order.createdAt).toLocaleDateString()} · <span className="capitalize">{order.status}</span>
      </p>

      <div className="bg-white border border-border rounded-2xl p-5 mb-6">
        <h2 className="text-ink mb-3">Items</h2>
        {order.items.map((item) => (
          <div key={item._id} className="flex justify-between text-sm text-ink-light py-1.5">
            <span>{item.name} × {item.quantity}</span>
            <span>₦{(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
        <div className="flex justify-between font-medium text-ink mt-3 pt-3 border-t border-border">
          <span>Total</span>
          <span>₦{order.totalPrice.toLocaleString()}</span>
        </div>
      </div>

      <div className="bg-white border border-border rounded-2xl p-5">
        <h2 className="text-ink mb-3">Shipping Address</h2>
        <p className="text-sm text-ink-light">{order.shippingAddress.fullName}</p>
        <p className="text-sm text-ink-light">{order.shippingAddress.address}</p>
        <p className="text-sm text-ink-light">{order.shippingAddress.city}</p>
        <p className="text-sm text-ink-light">{order.shippingAddress.phone}</p>
      </div>
    </div>
  )
}

export default OrderDetailsPage