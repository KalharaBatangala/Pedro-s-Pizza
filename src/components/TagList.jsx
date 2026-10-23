import { Flame, Leaf, Sprout } from 'lucide-react'
import { TAG_LABELS } from '../data/menu'

const ICONS = { veg: Leaf, vegan: Sprout, spicy: Flame }

export default function TagList({ tags }) {
  if (!tags?.length) return null
  return (
    <ul className="tags">
      {tags.map((tag) => {
        const Icon = ICONS[tag]
        return (
          <li key={tag} className={`tag tag--${tag}`}>
            <Icon size={13} /> {TAG_LABELS[tag]}
          </li>
        )
      })}
    </ul>
  )
}
