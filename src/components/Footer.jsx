import { Link } from 'react-router-dom'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { SITE } from '../data/site'
import Logo from './Logo'

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
)

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M14 8.5V6.8c0-.8.5-1 1-1h2V2.2h-2.8C11.1 2.2 10 4.4 10 6.4v2.1H7.5V12H10v9.8h4V12h2.8l.4-3.5H14z" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo light />
          <p>
            Wood-fired pizza, slow-proofed dough and family recipes, served with a whole lot of love since 1987.
          </p>
          <div className="footer__social">
            <a href={SITE.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href={SITE.socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
              <FacebookIcon />
            </a>
          </div>
        </div>

        <div>
          <h3>Explore</h3>
          <ul>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/about">Our Story</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/checkout">Checkout</Link></li>
          </ul>
        </div>

        <div>
          <h3>Visit</h3>
          <ul className="footer__contact">
            <li><MapPin size={16} /> {SITE.address}</li>
            <li><Phone size={16} /> <a href={`tel:${SITE.phone}`}>{SITE.phone}</a></li>
            <li><Mail size={16} /> <a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
          </ul>
        </div>

        <div>
          <h3>Hours</h3>
          <ul className="footer__hours">
            {SITE.hours.map((h) => (
              <li key={h.days}>
                <Clock size={16} /> <span>{h.days}</span> <span>{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} {SITE.name}. Made with ♥ and mozzarella.</p>
        <p>Designed &amp; built by Kalhara Batangala</p>
      </div>
    </footer>
  )
}
