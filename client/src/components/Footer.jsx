import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Footer() {
  const { user } = useAuth()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-cream mt-24">
      <div className="px-6 sm:px-10 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Link to="/" className="font-serif text-2xl">
            Marketé
          </Link>
          <p className="text-cream/60 text-sm mt-3 max-w-xs">
            Everything, delivered better. A marketplace built around what you actually need.
          </p>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-wide text-cream/50 mb-4">Shop</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link to="/products" className="hover:text-terracotta transition-colors">
                All products
              </Link>
            </li>
            <li>
              <Link to="/products?category=Electronics" className="hover:text-terracotta transition-colors">
                Electronics
              </Link>
            </li>
            <li>
              <Link to="/products?category=Fashion" className="hover:text-terracotta transition-colors">
                Fashion
              </Link>
            </li>
            <li>
              <Link to="/products?category=Shoes" className="hover:text-terracotta transition-colors">
                Shoes
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-wide text-cream/50 mb-4">Account</h3>
          <ul className="flex flex-col gap-2 text-sm">
            {user ? (
              <>
                <li>
                  <Link to="/account" className="hover:text-terracotta transition-colors">
                    My orders
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="hover:text-terracotta transition-colors">
                    Cart
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="hover:text-terracotta transition-colors">
                    Log in
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-terracotta transition-colors">
                    Create an account
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-wide text-cream/50 mb-4">Payments</h3>
          <p className="text-cream/60 text-sm max-w-xs">
            Payments are processed securely by Flutterwave. Your card details never touch our servers.
          </p>
        </div>
      </div>

      <div className="border-t border-cream/10 px-6 sm:px-10 py-5 text-xs text-cream/50">
        © {year} Marketé. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer