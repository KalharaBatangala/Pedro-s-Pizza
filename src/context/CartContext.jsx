import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { describeLine } from '../utils/pricing'

const STORAGE_KEY = 'vitos-cart-v1'
const MAX_QTY = 20

const CartContext = createContext(null)

const lineKey = (id, size, extras) => [id, size ?? '', [...extras].sort().join('+')].join('|')

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(saved) ? saved.filter((l) => l && l.key && l.qty > 0) : []
  } catch {
    return []
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { id, size = null, extras = [], qty = 1 } = action
      const key = lineKey(id, size, extras)
      const existing = state.find((l) => l.key === key)
      if (existing) {
        return state.map((l) => (l.key === key ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l))
      }
      return [...state, { key, id, size, extras: [...extras].sort(), qty: Math.min(MAX_QTY, qty) }]
    }
    case 'setQty':
      return action.qty <= 0
        ? state.filter((l) => l.key !== action.key)
        : state.map((l) => (l.key === action.key ? { ...l, qty: Math.min(MAX_QTY, action.qty) } : l))
    case 'remove':
      return state.filter((l) => l.key !== action.key)
    case 'clear':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [rawLines, dispatch] = useReducer(cartReducer, undefined, loadCart)
  const [isOpen, setOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const toastTimer = useRef()

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rawLines))
    } catch {
      // Storage can be unavailable (private mode); the cart still works in memory.
    }
  }, [rawLines])

  const lines = useMemo(() => rawLines.map(describeLine).filter(Boolean), [rawLines])
  const count = lines.reduce((n, l) => n + l.qty, 0)

  const showToast = useCallback((message) => {
    clearTimeout(toastTimer.current)
    setToast({ message, id: Date.now() })
    toastTimer.current = setTimeout(() => setToast(null), 2600)
  }, [])

  const addItem = useCallback(
    (item, { size, extras, qty = 1 } = {}) => {
      dispatch({ type: 'add', id: item.id, size, extras, qty })
      showToast(`${qty > 1 ? `${qty} × ` : ''}${item.name} added to your order`)
    },
    [showToast],
  )

  const value = useMemo(
    () => ({
      lines,
      count,
      addItem,
      setQty: (key, qty) => dispatch({ type: 'setQty', key, qty }),
      removeItem: (key) => dispatch({ type: 'remove', key }),
      clearCart: () => dispatch({ type: 'clear' }),
      isOpen,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      toast,
      dismissToast: () => setToast(null),
    }),
    [lines, count, addItem, isOpen, toast],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
