import { Link } from 'react-router-dom'
import { ArrowRight, Bike, Clock, Flame, MapPin, Quote, Star, Wheat } from 'lucide-react'
import heroOven from '../assets/images/hero-oven.webp'
import cheesePull from '../assets/images/cheese-pull.webp'
import steamSlice from '../assets/images/steam-slice.webp'
import sharing from '../assets/images/sharing.webp'
import { MENU } from '../data/menu'
import { PRICING, SITE } from '../data/site'
import { formatPrice } from '../utils/pricing'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import '../styles/home.css'

const FEATURED_IDS = ['pepperoni', 'vitos-special', 'margherita', 'hot-honey']

const INGREDIENTS = [
  'San Marzano tomatoes',
  'Fior di latte',
  'Fresh basil',
  '72-hour dough',
  'Oak-wood fire',
  'Sicilian olive oil',
  'Aged parmigiano',
  'Nonna’s secret sauce',
]

const STEPS = [
  {
    icon: Wheat,
    title: '72 hours of patience',
    text: 'Our dough rests for three full days. It’s what gives every crust that airy, leopard-spotted chew.',
  },
  {
    icon: Flame,
    title: '90 seconds of fire',
    text: 'Into a 450°C oak-wood oven. Blistered crust, bubbling cheese, a whisper of smoke.',
  },
  {
    icon: Bike,
    title: '30 minutes to your door',
    text: 'Boxed hot and rushed over by our riders, so it tastes like you’re sitting in our dining room.',
  },
]

// Placeholder reviews — swap these for real customer quotes before launch.
const REVIEWS = [
  {
    quote: 'The crust is unreal — crispy, chewy, smoky. We order the Hot Honey every Friday now.',
    name: 'Amara J.',
    detail: 'Ordered for delivery',
  },
  {
    quote: 'Tastes exactly like the pizza I had in Naples. The tiramisù alone is worth the trip.',
    name: 'Daniel R.',
    detail: 'Dined in',
  },
  {
    quote: 'Arrived piping hot in 25 minutes. The garlic bread disappeared before I took a photo.',
    name: 'Priya S.',
    detail: 'Ordered for delivery',
  },
]

export default function Home() {
  const featured = FEATURED_IDS.map((id) => MENU.find((item) => item.id === id))

  return (
    <>
      <section className="hero">
        <img className="hero__bg" src={heroOven} alt="" fetchPriority="high" />
        <div className="hero__shade" />
        <div className="container hero__content">
          <p className="script hero__eyebrow">Benvenuti a casa!</p>
          <h1>
            Pizza worth <em>slowing down</em> for.
          </h1>
          <p className="hero__lead">
            Hand-stretched dough, San Marzano tomatoes and a roaring oak-wood fire. Hot and bubbling at your door in about
            30 minutes.
          </p>
          <div className="hero__actions">
            <Link to="/menu" className="btn btn--primary btn--lg">
              Order now <ArrowRight size={18} />
            </Link>
            <Link to="/about" className="btn btn--outline-light btn--lg">
              Our story
            </Link>
          </div>
          <ul className="hero__facts">
            <li>
              <Flame size={18} /> 450°C wood fire
            </li>
            <li>
              <Clock size={18} /> ~30 min delivery
            </li>
            <li>
              <Star size={18} /> Family recipes since 1987
            </li>
          </ul>
        </div>
      </section>

      <div className="marquee-wrap" aria-hidden="true">
        <div className="marquee">
          <div className="marquee__track">
            {[...INGREDIENTS, ...INGREDIENTS].map((word, i) => (
              <span key={i}>
                {word} <span className="marquee__dot">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <p className="script">Straight from the oven</p>
            <h2>Our most-loved pies</h2>
            <p>The ones our regulars can’t stop ordering. Pick your size, add your toppings, done.</p>
          </Reveal>
          <div className="product-grid">
            {featured.map((item, i) => (
              <Reveal key={item.id} delay={i * 80}>
                <ProductCard item={item} />
              </Reveal>
            ))}
          </div>
          <div className="center">
            <Link to="/menu" className="btn btn--outline btn--lg">
              See the full menu <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--dark craft">
        <div className="container craft__grid">
          <Reveal className="craft__media">
            <img src={cheesePull} alt="A slice of pizza being lifted with long strands of melted cheese" loading="lazy" />
            <div className="craft__stamp">
              <span>Since</span>
              <strong>1987</strong>
            </div>
          </Reveal>
          <div>
            <Reveal className="section-head section-head--left">
              <p className="script">The Vito way</p>
              <h2>Simple ingredients. Serious craft.</h2>
            </Reveal>
            <ol className="steps">
              {STEPS.map(({ icon: Icon, title, text }, i) => (
                <Reveal as="li" key={title} delay={i * 120} className="step">
                  <span className="step__icon">
                    <Icon size={22} />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="promo" style={{ backgroundImage: `url(${steamSlice})` }}>
        <Reveal className="container promo__inner">
          <p className="script">First time here?</p>
          <h2>
            Take <span className="highlight">15% off</span> your first order
          </h2>
          <p>
            Use code <code className="promo__code">FIRSTSLICE</code> at checkout. Free delivery on orders over {formatPrice(PRICING.freeDeliveryOver)}.
          </p>
          <Link to="/menu" className="btn btn--primary btn--lg">
            Claim my slice <ArrowRight size={18} />
          </Link>
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <p className="script">Grazie mille!</p>
            <h2>What our guests are saying</h2>
          </Reveal>
          <div className="reviews">
            {REVIEWS.map((r, i) => (
              <Reveal as="figure" key={r.name} delay={i * 100} className="review">
                <Quote size={28} className="review__mark" />
                <div className="review__stars" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }, (_, s) => (
                    <Star key={s} size={16} fill="currentColor" />
                  ))}
                </div>
                <blockquote>{r.quote}</blockquote>
                <figcaption>
                  <strong>{r.name}</strong>
                  <span>{r.detail}</span>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--warm visit">
        <div className="container visit__grid">
          <Reveal>
            <p className="script">Come hungry</p>
            <h2>Pull up a chair</h2>
            <p className="visit__lead">
              Prefer it straight from the oven? Our dining room is warm, loud and smells incredible. Walk-ins always welcome.
            </p>
            <ul className="visit__info">
              <li>
                <MapPin size={18} /> {SITE.address}
              </li>
              {SITE.hours.map((h) => (
                <li key={h.days}>
                  <Clock size={18} /> <strong>{h.days}</strong> {h.time}
                </li>
              ))}
            </ul>
            <div className="hero__actions">
              <Link to="/contact" className="btn btn--dark">
                Get directions
              </Link>
              <a href={`tel:${SITE.phone}`} className="btn btn--outline">
                Call {SITE.phone}
              </a>
            </div>
          </Reveal>
          <Reveal delay={120} className="visit__media">
            <img src={sharing} alt="Friends sharing a pizza at a wooden table" loading="lazy" />
          </Reveal>
        </div>
      </section>
    </>
  )
}
