import { useState } from 'react'
import { X } from 'lucide-react'
import { PIZZA_EXTRAS, PIZZA_SIZES } from '../data/menu'
import { useCart } from '../context/CartContext'
import { formatPrice, unitPrice } from '../utils/pricing'
import Dialog from './Dialog'
import QtyStepper from './QtyStepper'
import TagList from './TagList'

export default function ProductModal({ item, open, onClose }) {
  const { addItem } = useCart()
  const [size, setSize] = useState('M')
  const [extras, setExtras] = useState([])
  const [qty, setQty] = useState(1)

  const toggleExtra = (id) =>
    setExtras((current) => (current.includes(id) ? current.filter((e) => e !== id) : [...current, id]))

  const total = unitPrice(item, size, extras) * qty

  const handleAdd = () => {
    addItem(item, { size, extras, qty })
    onClose()
    setSize('M')
    setExtras([])
    setQty(1)
  }

  return (
    <Dialog open={open} onClose={onClose} className="modal" aria-labelledby={`modal-${item.id}`}>
      <div className="modal__panel">
        <button className="icon-button modal__close" onClick={onClose} aria-label="Close">
          <X size={22} />
        </button>
        <div className="modal__media">
          <img src={item.image} alt={item.name} />
        </div>
        <div className="modal__body">
          <TagList tags={item.tags} />
          <h2 id={`modal-${item.id}`}>{item.name}</h2>
          <p className="modal__desc">{item.description}</p>

          <fieldset className="option-group">
            <legend>Choose your size</legend>
            <div className="size-options">
              {PIZZA_SIZES.map((s) => (
                <label key={s.id} className={`size-option ${size === s.id ? 'is-selected' : ''}`}>
                  <input type="radio" name={`size-${item.id}`} value={s.id} checked={size === s.id} onChange={() => setSize(s.id)} />
                  <span className="size-option__pie" style={{ '--scale': s.inches / 14 }} aria-hidden="true" />
                  <span className="size-option__label">{s.label}</span>
                  <span className="size-option__inches">{s.inches}"</span>
                  <span className="size-option__price">{formatPrice(item.price + s.extra)}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="option-group">
            <legend>
              Make it yours <span>optional</span>
            </legend>
            <div className="extra-options">
              {PIZZA_EXTRAS.map((e) => (
                <label key={e.id} className={`extra-option ${extras.includes(e.id) ? 'is-selected' : ''}`}>
                  <input type="checkbox" checked={extras.includes(e.id)} onChange={() => toggleExtra(e.id)} />
                  <span>{e.label}</span>
                  <span className="extra-option__price">+{formatPrice(e.price)}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <footer className="modal__footer">
          <QtyStepper value={qty} onChange={setQty} label="Quantity" />
          <button className="btn btn--primary btn--lg modal__add" onClick={handleAdd}>
            Add to order · {formatPrice(total)}
          </button>
        </footer>
      </div>
    </Dialog>
  )
}
