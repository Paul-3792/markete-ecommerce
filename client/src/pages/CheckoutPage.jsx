import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { createOrder } from '../services/orderServices'
import { verifyPayment } from '../services/paymentService'

function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [processing, setProcessing] = useState(false)

  const config = {
    public_key: import.meta.env.VITE_FLW_PUBLIC_KEY,
    tx_ref: Date.now().toString(),
    amount: totalPrice,
    currency: 'NGN',
    payment_options: 'card',
    customer: {
      email: user.email,
      name: fullName || user.name,
    },
    customizations: {
      title: 'Marketé',
      description: 'Payment for your order',
    },
  }

  const handleFlutterPayment = useFlutterwave(config)

  const handlePayment = (e) => {
    e.preventDefault()
    setError('')

    if (!fullName || !address || !city || !phone) {
      setError('Please fill in all shipping details before paying')
      return
    }

    handleFlutterPayment({
      callback: async (response) => {
        closePaymentModal()
        setProcessing(true)

        try {
          const verification = await verifyPayment(response.transaction_id)

          if (!verification.verified) {
            setError('Payment could not be verified')
            setProcessing(false)
            return
          }

          const orderData = {
            items: items.map((item) => ({
              productId: item._id,
              quantity: item.quantity,
            })),
            shippingAddress: { fullName, address, city, phone },
          }

          const order = await createOrder(orderData)
          clearCart()
          navigate(`/order-confirmation/${order._id}`)
        } catch (err) {
          setError('Something went wrong confirming your payment')
        } finally {
          setProcessing(false)
        }
      },
      onClose: () => {},
    })
  }

  if (items.length === 0) {
    return (
      <div className="px-6 sm:px-10 py-24 text-center">
        <p className="text-ink-light">Your cart is empty.</p>
      </div>
    )
  }

  return (
    <div className="px-6 sm:px-10 py-12 max-w-xl mx-auto">
      <h1 className="font-serif text-3xl text-ink mb-8">Checkout</h1>

      <div className="bg-white border border-border rounded-2xl p-5 mb-8">
        <h2 className="text-ink mb-3">Order Summary</h2>
        {items.map((item) => (
          <div key={item._id} className="flex justify-between text-sm text-ink-light py-1">
            <span>{item.name} × {item.quantity}</span>
            <span>₦{(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
        <div className="flex justify-between font-medium text-ink mt-3 pt-3 border-t border-border">
          <span>Total</span>
          <span>₦{totalPrice.toLocaleString()}</span>
        </div>
      </div>

      {error && <p className="text-terracotta mb-4 text-sm">{error}</p>}

      <form onSubmit={handlePayment} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="border border-border bg-white rounded-full px-5 py-2.5 text-sm focus:outline-none focus:border-terracotta"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="border border-border bg-white rounded-full px-5 py-2.5 text-sm focus:outline-none focus:border-terracotta"
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          className="border border-border bg-white rounded-full px-5 py-2.5 text-sm focus:outline-none focus:border-terracotta"
        />
        <input
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="border border-border bg-white rounded-full px-5 py-2.5 text-sm focus:outline-none focus:border-terracotta"
        />

        <button
          type="submit"
          disabled={processing}
          className="bg-ink text-cream py-3 rounded-full hover:bg-terracotta transition-colors disabled:opacity-50 mt-2"
        >
          {processing ? 'Confirming payment...' : `Pay — ₦${totalPrice.toLocaleString()}`}
        </button>
      </form>
    </div>
  )
}

export default CheckoutPage