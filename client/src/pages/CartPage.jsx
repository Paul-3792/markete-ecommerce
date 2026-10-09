import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className="px-6 sm:px-10 py-24 text-center">
        <h1 className="font-serif text-2xl text-ink mb-3">Your cart is empty</h1>
        <Link to="/products" className="text-terracotta hover:underline">
          Browse products →
        </Link>
      </div>
    )
  }

  return (
    <div className="px-6 sm:px-10 py-12 max-w-3xl mx-auto">
      <h1 className="font-serif text-3xl text-ink mb-8">Your Cart</h1>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 bg-white border border-border rounded-2xl p-4"
          >
            <div className="w-20 h-20 bg-cream rounded-xl flex items-center justify-center flex-shrink-0">
              {item.images?.[0] ? (
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <span className="text-ink-light text-xs">No image</span>
              )}
            </div>

            <div className="flex-1">
              <h3 className="text-ink">{item.name}</h3>
              <p className="text-terracotta font-medium">
                ₦{item.price.toLocaleString()}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                className="w-8 h-8 border border-border rounded-full hover:border-terracotta transition-colors"
              >
                −
              </button>
              <span className="w-6 text-center text-sm">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                className="w-8 h-8 border border-border rounded-full hover:border-terracotta transition-colors"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeFromCart(item._id)}
              className="text-ink-light hover:text-terracotta text-sm transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-between items-center border-t border-border pt-6">
        <span className="text-xl font-serif text-ink">
          Total: ₦{totalPrice.toLocaleString()}
        </span>
        <Link
          to="/checkout"
          className="bg-ink text-cream px-7 py-3 rounded-full hover:bg-terracotta transition-colors"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}

export default CartPage