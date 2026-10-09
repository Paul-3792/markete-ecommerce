import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllProducts, deleteProduct } from '../../services/productService'

function AdminProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const data = await getAllProducts({ limit: 50 })
      setProducts(data.products)
    } catch (err) {
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(`Delete "${name}"? This cannot be undone.`)
    if (!confirmed) return

    try {
      await deleteProduct(id)
      setProducts((prev) => prev.filter((p) => p._id !== id))
    } catch (err) {
      alert('Failed to delete product')
    }
  }

  if (loading) return <p className="px-6 sm:px-10 py-12 text-ink-light">Loading products...</p>
  if (error) return <p className="px-6 sm:px-10 py-12 text-terracotta">{error}</p>

  return (
    <div className="px-6 sm:px-10 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-3xl text-ink">Manage Products</h1>
        <Link
          to="/admin/products/new"
          className="bg-ink text-cream px-6 py-3 rounded-full hover:bg-terracotta transition-colors text-sm"
        >
          + Add Product
        </Link>
      </div>

      <div className="overflow-x-auto bg-white border border-border rounded-2xl">
        <table className="w-full text-left">
          <thead className="text-ink-light text-xs uppercase tracking-wide">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t border-border text-sm">
                <td className="p-4 text-ink">
  <div className="flex items-center gap-3">
    <div className="w-12 h-12 bg-cream border border-border rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
      {product.images?.[0] ? (
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-ink-light text-[10px]">No img</span>
      )}
    </div>
    <span>{product.name}</span>
  </div>
</td>
                <td className="p-4 text-ink-light">{product.category}</td>
                <td className="p-4 text-ink">₦{product.price.toLocaleString()}</td>
                <td className="p-4 text-ink-light">{product.stock}</td>
                <td className="p-4 flex gap-4">
                  <Link
                    to={`/admin/products/${product._id}/edit`}
                    className="text-terracotta hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id, product.name)}
                    className="text-ink-light hover:text-terracotta transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminProductsPage