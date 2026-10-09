import { Link } from 'react-router-dom'

const CATEGORIES = [
  { name: 'Electronics', image: '/images/Headphoneone.jpg' },
  { name: 'Fashion', image: '/images/Fashion-studio.jpg' },
  { name: 'Shoes', image: '/images/Sneakers.jpg' },
  { name: 'Accessories', image: '/images/Female-accessories.jpg' },
  { name: 'Home & Kitchen', image: '/images/Cooking-set.jpg' },
  { name: 'Phones & Accessories', image: '/images/Phones.jpg' },
]

function HomePage() {
  return (
    <div>
      <section className="relative px-6 sm:px-10 py-24 sm:py-32 overflow-hidden">
        <img
          src="/images/fashionshop.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative max-w-3xl">
          <h1 className="font-serif text-5xl sm:text-6xl leading-tight text-ink">
            Everything, <span className="italic text-terracotta">delivered better.</span>
          </h1>
          <p className="text-ink-light text-lg mt-6 max-w-md">
            A marketplace built around what you actually need — fast browsing, honest prices, real quality.
          </p>
          <Link
            to="/products"
            className="inline-block mt-8 bg-ink text-cream px-7 py-3 rounded-full hover:bg-terracotta transition-colors"
          >
            Shop now
          </Link>
        </div>
      </section>

      <section className="px-6 sm:px-10 pb-24">
        <h2 className="font-serif text-2xl text-ink mb-6 mt-6">Shop By Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group block"
            >
              <div className="aspect-square bg-white border border-border rounded-2xl overflow-hidden">
                <img  
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-sm text-ink mt-2 text-center">{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage