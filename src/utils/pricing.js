import { PRICING } from '../data/site'
import { PIZZA_EXTRAS, PIZZA_SIZES, findMenuItem } from '../data/menu'

const formatter = new Intl.NumberFormat(PRICING.locale, {
  style: 'currency',
  currency: PRICING.currency,
})

export const formatPrice = (amount) => formatter.format(amount)

const round2 = (n) => Math.round(n * 100) / 100

export function unitPrice(item, sizeId, extraIds = []) {
  const size = PIZZA_SIZES.find((s) => s.id === sizeId)
  const extras = PIZZA_EXTRAS.filter((e) => extraIds.includes(e.id))
  return round2(item.price + (size?.extra ?? 0) + extras.reduce((sum, e) => sum + e.price, 0))
}

// Turn a stored cart line ({ id, size, extras, qty }) into everything the UI
// needs. Returns null if the item no longer exists on the menu.
export function describeLine(line) {
  const item = findMenuItem(line.id)
  if (!item) return null
  const size = PIZZA_SIZES.find((s) => s.id === line.size)
  const extras = PIZZA_EXTRAS.filter((e) => line.extras?.includes(e.id))
  const price = unitPrice(item, line.size, line.extras)
  return {
    ...line,
    item,
    sizeLabel: size ? `${size.label} ${size.inches}"` : null,
    extrasLabel: extras.map((e) => e.label).join(', '),
    unitPrice: price,
    lineTotal: round2(price * line.qty),
  }
}

export function computeTotals(lines, { method = 'delivery', promoCode = '' } = {}) {
  const subtotal = round2(lines.reduce((sum, l) => sum + l.lineTotal, 0))
  const promo = PRICING.promoCodes[promoCode.trim().toUpperCase()]
  const discount = promo ? round2((subtotal * promo.percent) / 100) : 0
  const afterDiscount = subtotal - discount
  const delivery =
    method === 'delivery' && subtotal > 0 && afterDiscount < PRICING.freeDeliveryOver
      ? PRICING.deliveryFee
      : 0
  const tax = round2(afterDiscount * PRICING.taxRate)
  const total = round2(afterDiscount + delivery + tax)
  return { subtotal, discount, promo, delivery, tax, total }
}
