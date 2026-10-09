import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

function Navbar() {
  const { user, logout } = useAuth()
  const { totalItems } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-cream border-b border-border px-6 sm:px-10 py-5 flex items-center justify-between">
      <Link to="/" className="font-serif text-2xl text-ink tracking-tight">
        Marketé
      </Link>

      <div className="flex items-center gap-6 text-sm">
        <Link to="/" className="text-ink-light hover:text-terracotta transition-colors">
          Home
        </Link>
        <Link to="/products" className="text-ink-light hover:text-terracotta transition-colors">
          Shop
        </Link>
        <Link to="/cart" className="text-ink-light hover:text-terracotta transition-colors">
          Cart{totalItems > 0 && ` (${totalItems})`}
        </Link>

        {user ? (
          <>
            <Link to="/account" className="text-ink-light hover:text-terracotta transition-colors">
              Account
            </Link>
            {user.role === 'admin' && (
              <Link to="/admin" className="text-ink-light hover:text-terracotta transition-colors">
                Admin
              </Link>
            )}
            <span className="text-ink-light hidden sm:inline">Hi, {user.name.split(' ')[0]}</span>
            <button
              onClick={handleLogout}
              className="text-ink-light hover:text-terracotta transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-ink-light hover:text-terracotta transition-colors">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-terracotta text-cream px-4 py-2 rounded-full hover:bg-terracotta-dark transition-colors"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar