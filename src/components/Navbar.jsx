import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu as MenuIcon, Phone, ShoppingBag, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { SITE } from '../data/site'
import Logo from './Logo'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'Our Story' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { count, openCart } = useCart()
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // The home page hero sits under a transparent navbar until you scroll.
  const overHero = pathname === '/' && !scrolled && !menuOpen

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <header className={`navbar ${overHero ? 'navbar--clear' : ''}`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__brand" aria-label="Vito's Pizza House home">
          <Logo light />
        </Link>

        <nav className={`navbar__links ${menuOpen ? 'is-open' : ''}`} aria-label="Main">
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'}>
              {link.label}
            </NavLink>
          ))}
          <a className="navbar__phone navbar__phone--mobile" href={`tel:${SITE.phone}`}>
            <Phone size={16} /> {SITE.phone}
          </a>
        </nav>

        <div className="navbar__actions">
          <a className="navbar__phone" href={`tel:${SITE.phone}`}>
            <Phone size={16} /> {SITE.phone}
          </a>
          <button className="cart-button" onClick={openCart} aria-label={`Open your order, ${count} items`}>
            <ShoppingBag size={20} />
            {count > 0 && (
              <span key={count} className="cart-button__badge">
                {count}
              </span>
            )}
          </button>
          <Link to="/menu" className="btn btn--primary btn--sm navbar__cta">
            Order now
          </Link>
          <button
            className="navbar__toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>
    </header>
  )
}
