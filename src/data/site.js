// Store details used across the site. Replace the placeholder contact
// details below with the real ones before going live.
export const SITE = {
  name: "Vito's Pizza House",
  tagline: 'Wood-fired since 1987',
  phone: '(555) 014-8848',
  email: 'ciao@vitospizzahouse.com',
  address: '214 Mulberry Lane, Little Italy',
  hours: [
    { days: 'Mon – Thu', time: '11:00 – 22:00' },
    { days: 'Fri – Sat', time: '11:00 – 23:30' },
    { days: 'Sunday', time: '12:00 – 21:00' },
  ],
  socials: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
  },
}

export const PRICING = {
  currency: 'USD',
  locale: 'en-US',
  deliveryFee: 3.99,
  freeDeliveryOver: 35,
  taxRate: 0.08,
  promoCodes: {
    VITO10: { label: '10% off your order', percent: 10 },
    FIRSTSLICE: { label: '15% off your first order', percent: 15 },
  },
}
