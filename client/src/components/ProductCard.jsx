import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product._id}`}
      className="group block"
    >
      <div className="aspect-square bg-white border border-border rounded-2xl overflow-hidden flex items-center justify-center">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <span className="text-ink-light text-xs">No image</span>
        )}
      </div>
      <div className="pt-3">
        <h3 className="text-ink text-sm truncate">{product.name}</h3>
        <p className="text-terracotta font-medium mt-1">
          ₦{product.price.toLocaleString()}
        </p>
      </div>
    </Link>
  )
}

export default ProductCard