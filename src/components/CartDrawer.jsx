import { Link, useNavigate } from 'react-router-dom'
import { Plus, ShoppingBag, Trash2, Truck, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { findMenuItem } from '../data/menu'
import { PRICING } from '../data/site'
import { computeTotals, formatPrice } from '../utils/pricing'
import Dialog from './Dialog'
import QtyStepper from './QtyStepper'

const UPSELL_IDS = ['garlic-bread', 'tiramisu', 'lemonade', 'truffle-fries']

export default function CartDrawer() {
  const { lines, count, isOpen, closeCart, setQty, removeItem, addItem } = useCart()
  const navigate = useNavigate()
  const { subtotal } = computeTotals(lines)
  const toFreeDelivery = Math.max(0, PRICING.freeDeliveryOver - subtotal)
  const progress = Math.min(100, (subtotal / PRICING.freeDeliveryOver) * 100)
  const upsells = UPSELL_IDS.filter((id) => !lines.some((l) => l.id === id))
    .slice(0, 2)
    .map(findMenuItem)

  return (
    <Dialog open={isOpen} onClose={closeCart} className="drawer" aria-labelledby="cart-title">
      <div className="drawer__panel">
        <header className="drawer__header">
          <h2 id="cart-title">
            Your order {count > 0 && <span className="drawer__count">{count}</span>}
          </h2>
          <button className="icon-button" onClick={closeCart} aria-label="Close order">
            <X size={22} />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="drawer__empty">
            <div className="drawer__empty-icon">
              <ShoppingBag size={36} />
            </div>
            <h3>Your box is empty</h3>
            <p>Our oven is hot and ready. Let’s fix that.</p>
            <Link to="/menu" className="btn btn--primary" onClick={closeCart}>
              Browse the menu
            </Link>
          </div>
        ) : (
          <>
            <div className="drawer__delivery">
              <Truck size={18} />
              {toFreeDelivery > 0 ? (
                <span>
                  Add <strong>{formatPrice(toFreeDelivery)}</strong> more for <strong>free delivery</strong>
                </span>
              ) : (
                <span>
                  <strong>You’ve unlocked free delivery!</strong>
                </span>
              )}
              <div className="progress" aria-hidden="true">
                <div className="progress__bar" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <ul className="drawer__lines">
              {lines.map((line) => (
                <li key={line.key} className="cart-line">
                  <img src={line.item.image} alt="" className="cart-line__img" />
                  <div className="cart-line__info">
                    <div className="cart-line__top">
                      <h3>{line.item.name}</h3>
                      <button className="cart-line__remove" onClick={() => removeItem(line.key)} aria-label={`Remove ${line.item.name}`}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                    {line.sizeLabel && <p className="cart-line__meta">{line.sizeLabel}</p>}
                    {line.extrasLabel && <p className="cart-line__meta">+ {line.extrasLabel}</p>}
                    <div className="cart-line__bottom">
                      <QtyStepper small min={0} value={line.qty} onChange={(q) => setQty(line.key, q)} label={`${line.item.name} quantity`} />
                      <strong>{formatPrice(line.lineTotal)}</strong>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {upsells.length > 0 && (
              <div className="drawer__upsell">
                <h3>Goes perfectly with…</h3>
                <div className="upsell-list">
                  {upsells.map((item) => (
                    <button key={item.id} className="upsell" onClick={() => addItem(item)}>
                      <img src={item.image} alt="" />
                      <span>
                        <span className="upsell__name">{item.name}</span>
                        <span className="upsell__price">{formatPrice(item.price)}</span>
                      </span>
                      <Plus size={18} className="upsell__plus" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <footer className="drawer__footer">
              <div className="drawer__subtotal">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <p className="drawer__note">Delivery, tax and promo codes are applied at checkout.</p>
              <button
                className="btn btn--primary btn--block btn--lg"
                onClick={() => {
                  closeCart()
                  navigate('/checkout')
                }}
              >
                Go to checkout · {formatPrice(subtotal)}
              </button>
              <button className="btn btn--ghost btn--block" onClick={closeCart}>
                Keep browsing
              </button>
            </footer>
          </>
        )}
      </div>
    </Dialog>
  )
}
