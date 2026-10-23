import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import CartDrawer from './CartDrawer'
import Toast from './Toast'

const TITLES = {
  '/': "Vito's Pizza House · Wood-Fired Pizza",
  '/menu': "Menu · Vito's Pizza House",
  '/about': "Our Story · Vito's Pizza House",
  '/contact': "Contact · Vito's Pizza House",
  '/checkout': "Checkout · Vito's Pizza House",
  '/order-confirmed': "Order confirmed · Vito's Pizza House",
}

export default function Layout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    document.title = TITLES[pathname] ?? "Page not found · Vito's Pizza House"
    if (!hash) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <Toast />
    </>
  )
}
