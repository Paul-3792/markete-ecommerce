import { useEffect, useState } from 'react'
import { getAllOrders, updateOrderStatus } from '../../services/orderServices'

const STATUS_OPTIONS = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

function AdminOrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingId, setUpdatingId] = useState(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders()
        setOrders(data)
      } catch (err) {
        setError('Failed to load orders')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId)
    try {
      await updateOrderStatus(orderId, newStatus)
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      )
    } catch (err) {
      alert('Failed to update order status')
    } finally {
      setUpdatingId(null)
    }
  }

  if (loading) return <p className="px-6 sm:px-10 py-12 text-ink-light">Loading orders...</p>
  if (error) return <p className="px-6 sm:px-10 py-12 text-terracotta">{error}</p>

  return (
    <div className="px-6 sm:px-10 py-12">
      <h1 className="font-serif text-3xl text-ink mb-8">Manage Orders</h1>

      <div className="overflow-x-auto bg-white border border-border rounded-2xl">
        <table className="w-full text-left">
          <thead className="text-ink-light text-xs uppercase tracking-wide">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Items</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4">Placed</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t border-border align-top text-sm">
                <td className="p-4">
                  <div className="text-ink">{order.user?.name}</div>
                  <div className="text-xs text-ink-light">{order.user?.email}</div>
                </td>
                <td className="p-4 text-ink-light">
                  {order.items.map((item) => (
                    <div key={item._id}>
                      {item.name} × {item.quantity}
                    </div>
                  ))}
                </td>
                <td className="p-4 text-ink">₦{order.totalPrice.toLocaleString()}</td>
                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    disabled={updatingId === order._id}
                    className="border border-border bg-cream rounded-full px-3 py-1.5 text-sm disabled:opacity-50 focus:outline-none focus:border-terracotta"
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  {updatingId === order._id && (
                    <span className="text-xs text-ink-light ml-2">Saving...</span>
                  )}
                </td>
                <td className="p-4 text-ink-light">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminOrdersPage