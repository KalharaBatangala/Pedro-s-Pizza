import { useMemo, useState } from 'react'
import { Flame, Leaf, Search, Sprout, X } from 'lucide-react'
import tablePizza from '../assets/images/table-pizza.webp'
import { CATEGORIES, MENU } from '../data/menu'
import ProductCard from '../components/ProductCard'
import '../styles/menu.css'

const DIET_FILTERS = [
  { id: 'veg', label: 'Vegetarian', icon: Leaf },
  { id: 'vegan', label: 'Vegan', icon: Sprout },
  { id: 'spicy', label: 'Spicy', icon: Flame },
]

export default function Menu() {
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [diets, setDiets] = useState([])

  const toggleDiet = (id) => setDiets((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]))

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return MENU.filter(
      (item) =>
        (category === 'all' || item.category === category) &&
        diets.every((d) => item.tags.includes(d)) &&
        (!q || `${item.name} ${item.description}`.toLowerCase().includes(q)),
    )
  }, [category, query, diets])

  const sections = CATEGORIES.map((cat) => ({ ...cat, items: results.filter((i) => i.category === cat.id) })).filter(
    (s) => s.items.length > 0,
  )

  const resetFilters = () => {
    setCategory('all')
    setQuery('')
    setDiets([])
  }

  return (
    <>
      <section className="page-hero" style={{ backgroundImage: `url(${tablePizza})` }}>
        <div className="container">
          <p className="script">Mangia, mangia!</p>
          <h1>Our Menu</h1>
          <p>Every pizza is made to order. Tap one to pick your size and pile on the extras.</p>
        </div>
      </section>

      <div className="menu-toolbar">
        <div className="container menu-toolbar__inner">
          <div className="category-tabs" role="tablist" aria-label="Menu categories">
            {[{ id: 'all', label: 'All' }, ...CATEGORIES].map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={category === cat.id}
                className={`chip ${category === cat.id ? 'is-active' : ''}`}
                onClick={() => setCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="menu-toolbar__filters">
            <label className="search">
              <Search size={18} />
              <input
                type="search"
                placeholder="Search pizzas, sides…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search the menu"
              />
            </label>
            {DIET_FILTERS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                className={`chip chip--diet chip--${id} ${diets.includes(id) ? 'is-active' : ''}`}
                aria-pressed={diets.includes(id)}
                onClick={() => toggleDiet(id)}
              >
                <Icon size={15} /> {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container menu-body">
        {sections.length === 0 ? (
          <div className="empty-state">
            <h2>No matches… yet</h2>
            <p>We couldn’t find anything for those filters. Our chefs suggest trying something else.</p>
            <button className="btn btn--outline" onClick={resetFilters}>
              <X size={16} /> Clear filters
            </button>
          </div>
        ) : (
          sections.map((section) => (
            <section key={section.id} className="menu-section" aria-labelledby={`cat-${section.id}`}>
              <header className="menu-section__head">
                <h2 id={`cat-${section.id}`}>{section.label}</h2>
                <p>{section.blurb}</p>
              </header>
              <div className="product-grid">
                {section.items.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </>
  )
}
