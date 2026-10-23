import { Link } from 'react-router-dom'
import { ArrowRight, ChefHat, Heart, Sprout, Wheat } from 'lucide-react'
import chefFire from '../assets/images/chef-fire.webp'
import interior from '../assets/images/interior.webp'
import margherita from '../assets/images/margherita.webp'
import Reveal from '../components/Reveal'
import '../styles/pages.css'

const VALUES = [
  { icon: Wheat, title: 'Dough with patience', text: 'Italian “00” flour, water, salt, a pinch of yeast — and 72 hours of rest.' },
  { icon: Sprout, title: 'Honest ingredients', text: 'San Marzano tomatoes, fior di latte and basil from growers we know by name.' },
  { icon: ChefHat, title: 'Fire & skill', text: 'Every pie is hand-stretched and turned by a pizzaiolo, never a machine.' },
  { icon: Heart, title: 'Family first', text: 'Whether you’re a regular or a first-timer, you eat like one of the family.' },
]

export default function About() {
  return (
    <>
      <section className="page-hero page-hero--tall" style={{ backgroundImage: `url(${chefFire})` }}>
        <div className="container">
          <p className="script">La nostra storia</p>
          <h1>From Nonna’s kitchen to your table</h1>
        </div>
      </section>

      <section className="section">
        <div className="container story">
          <Reveal className="story__text">
            <p className="script">It started with a recipe</p>
            <h2>One oven, one dream, a whole lot of dough</h2>
            <p className="lead">
              In 1987, Vito arrived with little more than his grandmother Rosa’s handwritten recipe book and a stubborn belief
              that pizza should never be rushed.
            </p>
            <p>
              He built a wood-fired oven brick by brick in a tiny corner shop, and the neighbourhood followed its nose. Word
              spread about the blistered crusts, the bright tomato sauce, the cheese that stretched for days.
            </p>
            <p>
              Today the family still makes every pizza the same way: slow-proofed dough, the best tomatoes we can find, and
              a fire that never really goes out. The dining room is bigger, but the welcome is the same — come in, sit down,
              mangia.
            </p>
            <p className="signature">— The Vito family</p>
          </Reveal>
          <Reveal delay={120} className="story__images">
            <img src={interior} alt="Our warm, busy dining room" loading="lazy" />
            <img src={margherita} alt="A Margherita pizza fresh from the oven" loading="lazy" />
          </Reveal>
        </div>
      </section>

      <section className="section section--warm">
        <div className="container">
          <Reveal className="section-head">
            <p className="script">What we believe</p>
            <h2>Four things we never compromise on</h2>
          </Reveal>
          <div className="values">
            {VALUES.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 90} className="value">
                <span className="value__icon">
                  <Icon size={26} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <Reveal className="container cta-band__inner">
          <h2>Hungry yet?</h2>
          <p>The oven is hot. Your pizza is about 30 minutes away.</p>
          <Link to="/menu" className="btn btn--primary btn--lg">
            Order now <ArrowRight size={18} />
          </Link>
        </Reveal>
      </section>
    </>
  )
}
