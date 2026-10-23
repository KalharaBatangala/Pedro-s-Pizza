import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Banknote, Bike, CreditCard, Lock, ShoppingBag, Store, Tag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { PRICING, SITE } from '../data/site'
import { computeTotals, formatPrice } from '../utils/pricing'
import { submitNetlifyForm } from '../utils/netlifyForm'
import QtyStepper from '../components/QtyStepper'
import '../styles/pages.css'

export const LAST_ORDER_KEY = 'vitos-last-order'

const makeOrderNumber = () => `VP-${Date.now().toString(36).slice(-5).toUpperCase()}`

export default function Checkout() {
  const { lines, setQty, clearCart } = useCart()
  const navigate = useNavigate()
  const [method, setMethod] = useState('delivery')
  const [payment, setPayment] = useState('card')
  const [details, setDetails] = useState({ name: '', phone: '', email: '', address: '', notes: '' })
  const [promoInput, setPromoInput] = useState('')
  const [promoCode, setPromoCode] = useState('')
  const [promoError, setPromoError] = useState('')
  const [status, setStatus] = useState('idle') // idle | placing | error

  const totals = computeTotals(lines, { method, promoCode })
  const update = (e) => setDetails({ ...details, [e.target.name]: e.target.value })

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase()
    if (PRICING.promoCodes[code]) {
      setPromoCode(code)
      setPromoError('')
    } else {
      setPromoCode('')
      setPromoError(code ? 'That code isn’t valid. Try FIRSTSLICE or VITO10.' : '')
    }
  }

  const placeOrder = async (e) => {
    e.preventDefault()
    setStatus('placing')
    const order = {
      number: makeOrderNumber(),
      placedAt: new Date().toISOString(),
      method,
      payment,
      ...details,
      lines: lines.map((l) => ({
        key: l.key,
        name: l.item.name,
        qty: l.qty,
        detail: [l.sizeLabel, l.extrasLabel && `+ ${l.extrasLabel}`].filter(Boolean).join(' · '),
        lineTotal: l.lineTotal,
      })),
      totals,
    }
    try {
      await submitNetlifyForm('order', {
        orderNumber: order.number,
        method,
        name: details.name,
        phone: details.phone,
        email: details.email,
        address: method === 'delivery' ? details.address : 'Pickup',
        payment: payment === 'card' ? 'Card on arrival' : 'Cash on arrival',
        notes: details.notes,
        items: order.lines.map((l) => `${l.qty} × ${l.name}${l.detail ? ` (${l.detail})` : ''} — ${formatPrice(l.lineTotal)}`).join('\n'),
        total: formatPrice(totals.total),
      })
      try {
        sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order))
      } catch {
        // Not fatal: the confirmation page also receives the order via router state.
      }
      clearCart()
      navigate('/order-confirmed', { state: { order } })
    } catch {
      setStatus('error')
    }
  }

  if (lines.length === 0) {
    return (
      <section className="section checkout-empty">
        <div className="container empty-state">
          <ShoppingBag size={44} />
          <h1>Your order is empty</h1>
          <p>Add a pizza or two and come back — we’ll keep the oven warm.</p>
          <Link to="/menu" className="btn btn--primary btn--lg">
            Browse the menu
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="section checkout">
      <div className="container">
        <Link to="/menu" className="back-link">
          <ArrowLeft size={16} /> Back to menu
        </Link>
        <h1 className="checkout__title">Checkout</h1>

        <form className="checkout__grid" onSubmit={placeOrder}>
          <div className="checkout__main">
            <fieldset className="card checkout__block">
              <legend>1. How would you like it?</legend>
              <div className="choice-grid">
                <label className={`choice ${method === 'delivery' ? 'is-selected' : ''}`}>
                  <input type="radio" name="method" checked={method === 'delivery'} onChange={() => setMethod('delivery')} />
                  <Bike size={24} />
                  <span>
                    <strong>Delivery</strong>
                    <small>30–40 min · free over {formatPrice(PRICING.freeDeliveryOver)}</small>
                  </span>
                </label>
                <label className={`choice ${method === 'pickup' ? 'is-selected' : ''}`}>
                  <input type="radio" name="method" checked={method === 'pickup'} onChange={() => setMethod('pickup')} />
                  <Store size={24} />
                  <span>
                    <strong>Pickup</strong>
                    <small>Ready in 15–20 min</small>
                  </span>
                </label>
              </div>
            </fieldset>

            <fieldset className="card checkout__block">
              <legend>2. Your details</legend>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="o-name">Full name</label>
                  <input id="o-name" name="name" value={details.name} onChange={update} required autoComplete="name" />
                </div>
                <div className="field">
                  <label htmlFor="o-phone">Phone</label>
                  <input id="o-phone" name="phone" type="tel" value={details.phone} onChange={update} required autoComplete="tel" minLength={7} />
                </div>
              </div>
              <div className="field">
                <label htmlFor="o-email">Email</label>
                <input id="o-email" name="email" type="email" value={details.email} onChange={update} required autoComplete="email" />
              </div>
              {method === 'delivery' ? (
                <div className="field">
                  <label htmlFor="o-address">Delivery address</label>
                  <textarea
                    id="o-address"
                    name="address"
                    rows={2}
                    value={details.address}
                    onChange={update}
                    required
                    autoComplete="street-address"
                    placeholder="Street, apartment, city"
                  />
                </div>
              ) : (
                <p className="pickup-note">
                  <Store size={16} /> Pick up from <strong>{SITE.address}</strong>
                </p>
              )}
              <div className="field">
                <label htmlFor="o-notes">
                  Notes for the kitchen or rider <span>optional</span>
                </label>
                <input id="o-notes" name="notes" value={details.notes} onChange={update} placeholder="Extra crispy, ring the bell twice…" />
              </div>
            </fieldset>

            <fieldset className="card checkout__block">
              <legend>3. Payment</legend>
              <div className="choice-grid">
                <label className={`choice ${payment === 'card' ? 'is-selected' : ''}`}>
                  <input type="radio" name="payment" checked={payment === 'card'} onChange={() => setPayment('card')} />
                  <CreditCard size={24} />
                  <span>
                    <strong>Card on {method === 'delivery' ? 'delivery' : 'pickup'}</strong>
                    <small>Tap or chip with our rider</small>
                  </span>
                </label>
                <label className={`choice ${payment === 'cash' ? 'is-selected' : ''}`}>
                  <input type="radio" name="payment" checked={payment === 'cash'} onChange={() => setPayment('cash')} />
                  <Banknote size={24} />
                  <span>
                    <strong>Cash</strong>
                    <small>Pay when it arrives</small>
                  </span>
                </label>
              </div>
            </fieldset>
          </div>

          <aside className="card summary">
            <h2>Your order</h2>
            <ul className="summary__lines">
              {lines.map((line) => (
                <li key={line.key}>
                  <img src={line.item.image} alt="" />
                  <div className="summary__info">
                    <strong>{line.item.name}</strong>
                    {(line.sizeLabel || line.extrasLabel) && (
                      <small>{[line.sizeLabel, line.extrasLabel && `+ ${line.extrasLabel}`].filter(Boolean).join(' · ')}</small>
                    )}
                    <QtyStepper small min={0} value={line.qty} onChange={(q) => setQty(line.key, q)} label={`${line.item.name} quantity`} />
                  </div>
                  <span className="summary__price">{formatPrice(line.lineTotal)}</span>
                </li>
              ))}
            </ul>

            <div className="promo-field">
              <label htmlFor="promo" className="visually-hidden">
                Promo code
              </label>
              <Tag size={16} />
              <input
                id="promo"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    applyPromo()
                  }
                }}
                placeholder="Promo code"
              />
              <button type="button" className="btn btn--dark btn--sm" onClick={applyPromo}>
                Apply
              </button>
            </div>
            {promoError && <p className="form-error">{promoError}</p>}
            {totals.promo && (
              <p className="promo-applied">
                🎉 <strong>{promoCode}</strong> — {totals.promo.label}
              </p>
            )}

            <dl className="totals">
              <div>
                <dt>Subtotal</dt>
                <dd>{formatPrice(totals.subtotal)}</dd>
              </div>
              {totals.discount > 0 && (
                <div className="totals__discount">
                  <dt>Discount</dt>
                  <dd>−{formatPrice(totals.discount)}</dd>
                </div>
              )}
              {method === 'delivery' && (
                <div>
                  <dt>Delivery</dt>
                  <dd>{totals.delivery === 0 ? <span className="free">Free</span> : formatPrice(totals.delivery)}</dd>
                </div>
              )}
              <div>
                <dt>Tax ({Math.round(PRICING.taxRate * 100)}%)</dt>
                <dd>{formatPrice(totals.tax)}</dd>
              </div>
              <div className="totals__grand">
                <dt>Total</dt>
                <dd>{formatPrice(totals.total)}</dd>
              </div>
            </dl>

            {status === 'error' && (
              <p className="form-error" role="alert">
                We couldn’t place your order. Please try again, or call us on {SITE.phone}.
              </p>
            )}
            <button className="btn btn--primary btn--block btn--lg" disabled={status === 'placing'}>
              <Lock size={18} /> {status === 'placing' ? 'Placing order…' : `Place order · ${formatPrice(totals.total)}`}
            </button>
            <p className="summary__fine">You’ll pay when your order arrives. No card details are taken online.</p>
          </aside>
        </form>
      </div>
    </section>
  )
}
