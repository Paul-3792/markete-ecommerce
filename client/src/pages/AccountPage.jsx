import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMyOrders } from '../services/orderServices'
import { useAuth } from '../context/AuthContext'

function AccountPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders()
        setOrders(data)
      } catch (err) {
        setError('Failed to load your orders')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  return (
    <div className="px-6 sm:px-10 py-12 max-w-3xl mx-auto">
      <h1 className="font-serif text-3xl text-ink mb-2">My Account</h1>
      <p className="text-ink-light mb-10">{user.name} · {user.email}</p>

      <h2 className="text-ink mb-4">Order History</h2>

      {loading && <p className="text-ink-light">Loading orders...</p>}
      {error && <p className="text-terracotta">{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <p className="text-ink-light">
          You haven't placed any orders yet.{' '}
          <Link to="/products" className="text-terracotta hover:underline">
            Start shopping →
          </Link>
        </p>
      )}

      <div className="flex flex-col gap-3">
        {orders.map((order) => (
          <Link
            key={order._id}
            to={`/orders/${order._id}`}
            className="bg-white border border-border rounded-2xl p-5 flex justify-between items-center hover:border-terracotta transition-colors"
          >
            <div>
              <p className="text-ink text-sm">
                {order.items.length} item{order.items.length > 1 ? 's' : ''} ·{' '}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-ink-light text-xs mt-1 capitalize">{order.status}</p>
            </div>
            <p className="text-terracotta font-medium">
              ₦{order.totalPrice.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AccountPage