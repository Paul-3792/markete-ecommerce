import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getAllProducts } from '../services/productService'
import ProductCard from '../components/ProductCard'

const CATEGORIES = ['Electronics', 'Phones & Accessories', 'Fashion', 'Shoes', 'Beauty', 'Home & Kitchen', 'Computers', 'Groceries', 'Sports', 'Accessories']

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalPages, setTotalPages] = useState(1)

  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || ''
  const sort = searchParams.get('sort') || ''
  const page = Number(searchParams.get('page')) || 1

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const data = await getAllProducts({ search, category, sort, page, limit: 8 })
        setProducts(data.products)
        setTotalPages(data.totalPages)
      } catch (err) {
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [search, category, sort, page])

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    next.set('page', '1')
    setSearchParams(next)
  }

  const goToPage = (newPage) => {
    const next = new URLSearchParams(searchParams)
    next.set('page', newPage)
    setSearchParams(next)
  }

  return (
    <div className="px-6 sm:px-10 py-12">
      <h1 className="font-serif text-3xl text-ink mb-8">Shop</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-10">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => updateParam('search', e.target.value)}
          className="border border-border bg-white rounded-full px-5 py-2.5 flex-1 text-sm focus:outline-none focus:border-terracotta"
        />
        <select
          value={category}
          onChange={(e) => updateParam('category', e.target.value)}
          className="border border-border bg-white rounded-full px-5 py-2.5 text-sm focus:outline-none focus:border-terracotta"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => updateParam('sort', e.target.value)}
          className="border border-border bg-white rounded-full px-5 py-2.5 text-sm focus:outline-none focus:border-terracotta"
        >
          <option value="">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {loading && <p className="text-ink-light">Loading products...</p>}
      {error && <p className="text-terracotta">{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p className="text-ink-light">No products found.</p>
      )}

      {!loading && !error && products.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-14">
            <button
              onClick={() => goToPage(Math.max(page - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 border border-border rounded-full text-sm disabled:opacity-30 hover:border-terracotta transition-colors"
            >
              Previous
            </button>
            <span className="text-sm text-ink-light">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => goToPage(Math.min(page + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 border border-border rounded-full text-sm disabled:opacity-30 hover:border-terracotta transition-colors"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default ProductsPage