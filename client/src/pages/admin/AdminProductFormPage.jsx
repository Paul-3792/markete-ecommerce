import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductById, createProduct, updateProduct } from '../../services/productService'

const CATEGORIES = ['Electronics', 'Phones & Accessories', 'Fashion', 'Shoes', 'Beauty', 'Home & Kitchen', 'Computers', 'Groceries', 'Sports', 'Accessories']

function AdminProductFormPage() {
  const { id } = useParams()
  const isEditMode = Boolean(id)
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [stock, setStock] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const [loading, setLoading] = useState(isEditMode)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isEditMode) return

    const fetchProduct = async () => {
      try {
        const product = await getProductById(id)
        setName(product.name)
        setDescription(product.description)
        setPrice(product.price)
        setCategory(product.category)
        setStock(product.stock)
        setImageUrl(product.images?.[0] || '')
      } catch (err) {
        setError('Failed to load product')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id, isEditMode])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      stock: Number(stock),
      images: imageUrl ? [imageUrl] : [],
    }

    try {
      if (isEditMode) {
        await updateProduct(id, productData)
      } else {
        await createProduct(productData)
      }
      navigate('/admin/products')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="px-6 sm:px-10 py-12 text-ink-light">Loading product...</p>

  return (
    <div className="px-6 sm:px-10 py-12 max-w-xl">
      <h1 className="font-serif text-3xl text-ink mb-8">
        {isEditMode ? 'Edit Product' : 'Add Product'}
      </h1>

      {error && <p className="text-terracotta mb-4 text-sm">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-border bg-white rounded-full px-5 py-2.5 text-sm focus:outline-none focus:border-terracotta"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          className="border border-border bg-white rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-terracotta"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min="0"
          className="border border-border bg-white rounded-full px-5 py-2.5 text-sm focus:outline-none focus:border-terracotta"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-border bg-white rounded-full px-5 py-2.5 text-sm focus:outline-none focus:border-terracotta"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Stock quantity"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
          min="0"
          className="border border-border bg-white rounded-full px-5 py-2.5 text-sm focus:outline-none focus:border-terracotta"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border border-border bg-white rounded-full px-5 py-2.5 text-sm focus:outline-none focus:border-terracotta"
        />
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-xl border border-border"
            onError={(e) => { e.target.style.display = 'none' }}
          />
        )}

        <button
          type="submit"
          disabled={saving}
          className="bg-ink text-cream py-3 rounded-full hover:bg-terracotta transition-colors disabled:opacity-50 mt-2"
        >
          {saving ? 'Saving...' : isEditMode ? 'Update Product' : 'Create Product'}
        </button>
      </form>
    </div>
  )
}

export default AdminProductFormPage