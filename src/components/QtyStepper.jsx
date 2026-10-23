import { Minus, Plus, Trash2 } from 'lucide-react'

// When `min` is 0, the minus button turns into a remove button at qty 1.
export default function QtyStepper({ value, onChange, min = 1, max = 20, label = 'quantity', small = false }) {
  const removes = min === 0 && value === 1
  return (
    <div className={`stepper ${small ? 'stepper--sm' : ''}`} role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={removes ? 'Remove item' : 'Decrease quantity'}
      >
        {removes ? <Trash2 size={small ? 14 : 16} /> : <Minus size={small ? 14 : 16} />}
      </button>
      <span aria-live="polite">{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="Increase quantity">
        <Plus size={small ? 14 : 16} />
      </button>
    </div>
  )
}
