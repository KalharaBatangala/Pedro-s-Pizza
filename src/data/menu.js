import margherita from '../assets/images/margherita.webp'
import pepperoni from '../assets/images/pepperoni.webp'
import diavola from '../assets/images/diavola.webp'
import quattroFormaggi from '../assets/images/quattro-formaggi.webp'
import prosciuttoRucola from '../assets/images/prosciutto-rucola.webp'
import vitosSpecial from '../assets/images/vitos-special.webp'
import gardenVeggie from '../assets/images/garden-veggie.webp'
import fiorentina from '../assets/images/fiorentina.webp'
import capricciosa from '../assets/images/capricciosa.webp'
import hotHoney from '../assets/images/hot-honey.webp'
import bbqChicken from '../assets/images/bbq-chicken.webp'
import garlicBread from '../assets/images/garlic-bread.webp'
import wings from '../assets/images/wings.webp'
import truffleFries from '../assets/images/truffle-fries.webp'
import caesar from '../assets/images/caesar.webp'
import alfredo from '../assets/images/alfredo.webp'
import spaghetti from '../assets/images/spaghetti.webp'
import tiramisu from '../assets/images/tiramisu.webp'
import brownieSundae from '../assets/images/brownie-sundae.webp'
import brownies from '../assets/images/brownies.webp'
import oreoShake from '../assets/images/oreo-shake.webp'
import lemonade from '../assets/images/lemonade.webp'
import citrusSpritz from '../assets/images/citrus-spritz.webp'

export const CATEGORIES = [
  { id: 'pizza', label: 'Pizzas', blurb: 'Hand-stretched, 72-hour dough, blistered in our wood-fired oven.' },
  { id: 'pasta', label: 'Pasta', blurb: 'Fresh pasta, rolled every morning.' },
  { id: 'sides', label: 'Sides & Salads', blurb: 'Made for sharing (or not).' },
  { id: 'desserts', label: 'Desserts', blurb: 'Save room. Trust us.' },
  { id: 'drinks', label: 'Drinks', blurb: 'Squeezed, shaken and ice cold.' },
]

// Pizza size upcharges are added to the item's base (10") price.
export const PIZZA_SIZES = [
  { id: 'S', label: 'Personal', inches: 10, extra: 0 },
  { id: 'M', label: 'Medium', inches: 12, extra: 4 },
  { id: 'L', label: 'Large', inches: 14, extra: 7 },
]

export const PIZZA_EXTRAS = [
  { id: 'cheese', label: 'Extra mozzarella', price: 1.5 },
  { id: 'burrata', label: 'Whole burrata', price: 4 },
  { id: 'mushroom', label: 'Roasted mushrooms', price: 1.25 },
  { id: 'jalapeno', label: 'Jalapeños', price: 1 },
  { id: 'olives', label: 'Kalamata olives', price: 1 },
  { id: 'pepperoni', label: 'Cup & char pepperoni', price: 2 },
  { id: 'honey', label: 'Hot honey drizzle', price: 1 },
  { id: 'crust', label: 'Garlic-butter crust', price: 1.5 },
]

export const MENU = [
  // ---------- Pizzas ----------
  {
    id: 'margherita',
    category: 'pizza',
    name: 'Margherita',
    description: 'San Marzano tomato, fior di latte, fresh basil, Sicilian olive oil. The one that started it all.',
    price: 12.5,
    image: margherita,
    tags: ['veg'],
    badge: 'Classic',
  },
  {
    id: 'pepperoni',
    category: 'pizza',
    name: 'Pepperoni Classico',
    description: 'Cup & char pepperoni that curls into crispy little cups of flavour, mozzarella, oregano.',
    price: 14.5,
    image: pepperoni,
    tags: [],
    badge: 'Bestseller',
  },
  {
    id: 'vitos-special',
    category: 'pizza',
    name: "Vito's Special",
    description: 'Nonna Rosa’s recipe: Italian sausage, salami, peppers, red onion, olives and a secret tomato sauce.',
    price: 17,
    image: vitosSpecial,
    tags: [],
    badge: 'House favourite',
  },
  {
    id: 'diavola',
    category: 'pizza',
    name: 'Diavola',
    description: 'Spicy Calabrian salami, chilli flakes, smoked mozzarella and a drizzle of chilli oil.',
    price: 15.5,
    image: diavola,
    tags: ['spicy'],
  },
  {
    id: 'hot-honey',
    category: 'pizza',
    name: 'Hot Honey Pepperoni',
    description: 'Double pepperoni, whipped ricotta, pickled chillies and our chilli-infused wildflower honey.',
    price: 16.5,
    image: hotHoney,
    tags: ['spicy'],
    badge: 'New',
  },
  {
    id: 'quattro-formaggi',
    category: 'pizza',
    name: 'Quattro Formaggi',
    description: 'Mozzarella, gorgonzola dolce, fontina and aged parmigiano on a white garlic base.',
    price: 15,
    image: quattroFormaggi,
    tags: ['veg'],
  },
  {
    id: 'prosciutto-rucola',
    category: 'pizza',
    name: 'Prosciutto e Rucola',
    description: '24-month prosciutto di Parma, wild rocket, shaved parmigiano, cherry tomatoes.',
    price: 17.5,
    image: prosciuttoRucola,
    tags: [],
  },
  {
    id: 'fiorentina',
    category: 'pizza',
    name: 'Burrata Fiorentina',
    description: 'Garlic spinach, creamy burrata torn over the top, basil pesto and lemon zest.',
    price: 16.5,
    image: fiorentina,
    tags: ['veg'],
  },
  {
    id: 'capricciosa',
    category: 'pizza',
    name: 'Capricciosa',
    description: 'Cooked ham, artichokes, mushrooms, black olives and roasted tomatoes.',
    price: 15.5,
    image: capricciosa,
    tags: [],
  },
  {
    id: 'garden-veggie',
    category: 'pizza',
    name: 'Orto Garden',
    description: 'Charred courgette, peppers, cherry tomatoes, olives, basil and vegan mozzarella.',
    price: 14,
    image: gardenVeggie,
    tags: ['veg', 'vegan'],
  },
  {
    id: 'bbq-chicken',
    category: 'pizza',
    name: 'Smoky BBQ Chicken',
    description: 'Hickory-smoked chicken, red onion, sweet peppers, smoked gouda and BBQ glaze.',
    price: 16,
    image: bbqChicken,
    tags: [],
  },

  // ---------- Pasta ----------
  {
    id: 'spaghetti-pomodoro',
    category: 'pasta',
    name: 'Spaghetti Pomodoro',
    description: 'Slow-cooked tomato sugo, garlic, basil and a snowfall of parmigiano.',
    price: 13,
    image: spaghetti,
    tags: ['veg'],
  },
  {
    id: 'fettuccine-alfredo',
    category: 'pasta',
    name: 'Fettuccine Alfredo',
    description: 'Silky butter and parmigiano sauce, cracked black pepper, fresh parsley.',
    price: 14.5,
    image: alfredo,
    tags: ['veg'],
  },

  // ---------- Sides ----------
  {
    id: 'garlic-bread',
    category: 'sides',
    name: 'Cheesy Garlic Bread',
    description: 'Wood-fired focaccia, roasted garlic butter, melted mozzarella.',
    price: 6.5,
    image: garlicBread,
    tags: ['veg'],
    badge: 'Bestseller',
  },
  {
    id: 'wings',
    category: 'sides',
    name: 'Calabrian Chilli Wings',
    description: 'Eight crispy wings tossed in sticky chilli glaze, with blue cheese dip.',
    price: 10.5,
    image: wings,
    tags: ['spicy'],
  },
  {
    id: 'truffle-fries',
    category: 'sides',
    name: 'Truffle Parmesan Fries',
    description: 'Hand-cut fries, truffle oil, parmigiano and parsley.',
    price: 7,
    image: truffleFries,
    tags: ['veg'],
  },
  {
    id: 'caesar',
    category: 'sides',
    name: 'Chicken Caesar',
    description: 'Crisp romaine, grilled chicken, parmigiano, focaccia croutons, anchovy dressing.',
    price: 11,
    image: caesar,
    tags: [],
  },

  // ---------- Desserts ----------
  {
    id: 'tiramisu',
    category: 'desserts',
    name: 'Nonna’s Tiramisù',
    description: 'Espresso-soaked savoiardi, mascarpone cream, cocoa. Made fresh daily.',
    price: 7.5,
    image: tiramisu,
    tags: ['veg'],
    badge: 'Must try',
  },
  {
    id: 'brownie-sundae',
    category: 'desserts',
    name: 'Warm Brownie Sundae',
    description: 'Fudgy brownie straight from the oven, vanilla gelato and hot chocolate sauce.',
    price: 8,
    image: brownieSundae,
    tags: ['veg'],
  },
  {
    id: 'brownies',
    category: 'desserts',
    name: 'Salted Caramel Brownies',
    description: 'Two thick slabs with a salted caramel swirl. Perfect to share.',
    price: 6,
    image: brownies,
    tags: ['veg'],
  },
  {
    id: 'cookies-shake',
    category: 'desserts',
    name: 'Cookies & Cream Shake',
    description: 'Thick vanilla gelato shake, crushed chocolate cookies, whipped cream.',
    price: 6.5,
    image: oreoShake,
    tags: ['veg'],
  },

  // ---------- Drinks ----------
  {
    id: 'lemonade',
    category: 'drinks',
    name: 'Mint Lemonade',
    description: 'Fresh-squeezed Amalfi lemons, garden mint, a touch of cane sugar.',
    price: 4.5,
    image: lemonade,
    tags: ['veg', 'vegan'],
  },
  {
    id: 'blood-orange-spritz',
    category: 'drinks',
    name: 'Blood Orange Spritz',
    description: 'Sparkling blood orange soda with rosemary and dried citrus. Alcohol-free.',
    price: 5,
    image: citrusSpritz,
    tags: ['veg', 'vegan'],
  },
]

export const TAG_LABELS = {
  veg: 'Vegetarian',
  vegan: 'Vegan',
  spicy: 'Spicy',
}

export const isPizza = (item) => item.category === 'pizza'

export const findMenuItem = (id) => MENU.find((item) => item.id === id)
