import { CircleCheck } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Toast() {
  const { toast, openCart, dismissToast } = useCart()

  return (
    <div className="toast-region" aria-live="polite">
      {toast && (
        <div className="toast" key={toast.id}>
          <CircleCheck size={20} className="toast__icon" />
          <span>{toast.message}</span>
          <button
            className="toast__action"
            onClick={() => {
              dismissToast()
              openCart()
            }}
          >
            View order
          </button>
        </div>
      )}
    </div>
  )
}
