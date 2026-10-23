import { useEffect, useRef } from 'react'

// Thin wrapper over the native <dialog> element, which gives us focus
// trapping, Escape-to-close and an accessible modal for free.
export default function Dialog({ open, onClose, className = '', children, ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className={className}
      onClose={onClose}
      // Clicking the dimmed backdrop (the dialog element itself) closes it.
      onMouseDown={(e) => e.target === ref.current && onClose()}
      {...rest}
    >
      {children}
    </dialog>
  )
}
