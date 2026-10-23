import { useState } from 'react'
import { Plus } from 'lucide-react'
import { isPizza } from '../data/menu'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/pricing'
import ProductModal from './ProductModal'
import TagList from './TagList'

export default function ProductCard({ item }) {
  const { addItem } = useCart()
  const [customising, setCustomising] = useState(false)
  const pizza = isPizza(item)

  const handleAdd = () => (pizza ? setCustomising(true) : addItem(item))

  return (
    <article className="product-card">
      <button className="product-card__media" onClick={handleAdd} tabIndex={-1} aria-hidden="true">
        <img src={item.image} alt="" loading="lazy" />
        {item.badge && <span className="product-card__badge">{item.badge}</span>}
      </button>
      <div className="product-card__body">
        <TagList tags={item.tags} />
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="product-card__footer">
          <span className="product-card__price">
            {pizza && <small>from</small>} {formatPrice(item.price)}
          </span>
          <button className="btn btn--primary btn--sm" onClick={handleAdd} aria-label={`Add ${item.name} to order`}>
            <Plus size={16} /> {pizza ? 'Customise' : 'Add'}
          </button>
        </div>
      </div>
      {pizza && <ProductModal item={item} open={customising} onClose={() => setCustomising(false)} />}
    </article>
  )
}
