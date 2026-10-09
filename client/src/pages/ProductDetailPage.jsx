import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById } from '../services/productService'
import { useCart } from '../context/CartContext'

function ProductDetailPage() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id)
        setProduct(data)
      } catch (err) {
        setError('Product not found')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  if (loading) return <p className="px-6 sm:px-10 py-12 text-ink-light">Loading product...</p>
  if (error) return <p className="px-6 sm:px-10 py-12 text-terracotta">{error}</p>

  return (
    <div className="px-6 sm:px-10 py-12 max-w-5xl mx-auto">
      <Link to="/products" className="text-ink-light hover:text-terracotta text-sm transition-colors">
        ← Back to shop
      </Link>

      <div className="grid md:grid-cols-2 gap-12 mt-6">
        <div className="aspect-square bg-white border border-border rounded-2xl flex items-center justify-center">
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            <span className="text-ink-light text-sm">No image</span>
          )}
        </div>

        <div>
          <p className="text-ink-light text-sm uppercase tracking-wide">{product.category}</p>
          <h1 className="font-serif text-3xl text-ink mt-2">{product.name}</h1>
          <p className="text-terracotta text-2xl font-medium mt-4">
            ₦{product.price.toLocaleString()}
          </p>
          <p className="text-ink-light mt-6 leading-relaxed">{product.description}</p>
          <p className="text-sm text-ink-light mt-6">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="mt-6 bg-ink text-cream px-7 py-3 rounded-full hover:bg-terracotta transition-colors disabled:opacity-30"
          >
            {added ? 'Added ✓' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage