import { Link, Navigate, useLocation } from 'react-router-dom'
import { Bike, ChefHat, CircleCheck, ClipboardCheck, Flame, Store } from 'lucide-react'
import { SITE } from '../data/site'
import { formatPrice } from '../utils/pricing'
import { LAST_ORDER_KEY } from './Checkout'
import '../styles/pages.css'

function readLastOrder() {
  try {
    return JSON.parse(sessionStorage.getItem(LAST_ORDER_KEY))
  } catch {
    return null
  }
}

export default function OrderConfirmed() {
  const { state } = useLocation()
  const order = state?.order ?? readLastOrder()

  if (!order) return <Navigate to="/menu" replace />

  const delivery = order.method === 'delivery'
  const firstName = order.name.split(' ')[0]
  const steps = [
    { icon: ClipboardCheck, label: 'Order received' },
    { icon: ChefHat, label: 'Being prepared' },
    { icon: Flame, label: 'In the oven' },
    { icon: delivery ? Bike : Store, label: delivery ? 'On its way' : 'Ready for pickup' },
  ]

  return (
    <section className="section confirmed">
      <div className="container confirmed__inner">
        <div className="confirmed__check">
          <CircleCheck size={64} />
        </div>
        <p className="script">Grazie, {firstName}!</p>
        <h1>Your order is in the oven</h1>
        <p className="confirmed__lead">
          Order <strong>{order.number}</strong> ·{' '}
          {delivery ? (
            <>arriving in about <strong>30–40 minutes</strong></>
          ) : (
            <>ready for pickup in about <strong>15–20 minutes</strong></>
          )}
        </p>

        <ol className="tracker">
          {steps.map(({ icon: Icon, label }, i) => (
            <li key={label} className={i === 0 ? 'is-done' : i === 1 ? 'is-active' : ''}>
              <span className="tracker__dot">
                <Icon size={20} />
              </span>
              <span>{label}</span>
            </li>
          ))}
        </ol>

        <div className="card receipt">
          <h2>Order summary</h2>
          <ul>
            {order.lines.map((l) => (
              <li key={l.key}>
                <span>
                  <strong>
                    {l.qty} × {l.name}
                  </strong>
                  {l.detail && <small>{l.detail}</small>}
                </span>
                <span>{formatPrice(l.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <dl className="totals">
            <div>
              <dt>Subtotal</dt>
              <dd>{formatPrice(order.totals.subtotal)}</dd>
            </div>
            {order.totals.discount > 0 && (
              <div className="totals__discount">
                <dt>Discount</dt>
                <dd>−{formatPrice(order.totals.discount)}</dd>
              </div>
            )}
            {delivery && (
              <div>
                <dt>Delivery</dt>
                <dd>{order.totals.delivery === 0 ? 'Free' : formatPrice(order.totals.delivery)}</dd>
              </div>
            )}
            <div>
              <dt>Tax</dt>
              <dd>{formatPrice(order.totals.tax)}</dd>
            </div>
            <div className="totals__grand">
              <dt>Total · pay {order.payment === 'card' ? 'by card' : 'in cash'} on arrival</dt>
              <dd>{formatPrice(order.totals.total)}</dd>
            </div>
          </dl>
          <p className="receipt__where">
            {delivery ? (
              <>Delivering to <strong>{order.address}</strong></>
            ) : (
              <>Collect from <strong>{SITE.address}</strong></>
            )}
          </p>
        </div>

        <p className="confirmed__help">
          Need to change something? Call us on <a href={`tel:${SITE.phone}`}>{SITE.phone}</a>.
        </p>
        <Link to="/menu" className="btn btn--outline btn--lg">
          Back to the menu
        </Link>
      </div>
    </section>
  )
}
