import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDashboardStats } from '../services/orderServices'

function AdminDashboardPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats()
        setStats(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="px-6 sm:px-10 py-12">
      <h1 className="font-serif text-3xl text-ink mb-8">Admin Dashboard</h1>

      {loading ? (
        <p className="text-ink-light">Loading stats...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          <div className="bg-white border border-border rounded-2xl p-6">
            <p className="text-ink-light text-sm">Total Orders</p>
            <p className="font-serif text-3xl text-ink mt-1">{stats.totalOrders}</p>
          </div>
          <div className="bg-white border border-border rounded-2xl p-6">
            <p className="text-ink-light text-sm">Total Products</p>
            <p className="font-serif text-3xl text-ink mt-1">{stats.totalProducts}</p>
          </div>
          <div className="bg-white border border-border rounded-2xl p-6">
            <p className="text-ink-light text-sm">Total Revenue</p>
            <p className="font-serif text-3xl text-terracotta mt-1">
              ₦{stats.totalRevenue.toLocaleString()}
            </p>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <Link
          to="/admin/products"
          className="bg-ink text-cream px-6 py-3 rounded-full hover:bg-terracotta transition-colors text-sm"
        >
          Manage Products
        </Link>
        <Link
          to="/admin/orders"
          className="bg-white border border-border text-ink px-6 py-3 rounded-full hover:border-terracotta transition-colors text-sm"
        >
          Manage Orders
        </Link>
      </div>
    </div>
  )
}

export default AdminDashboardPage