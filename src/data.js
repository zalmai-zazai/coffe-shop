export const CATS = ['Hot', 'Iced', 'Bakery', 'Beans']
export const ARTS = ['cup', 'iced', 'croissant', 'muffin', 'cake', 'bean']

let n = 0
const m = (name, desc, price, cat, art, color) => ({ id: ++n, name, desc, price, cat, art, color })

export const MENU = [
  m('Espresso', 'Double shot, dark and syrupy', 3.5, 'Hot', 'cup', '#3b2314'),
  m('Americano', 'Espresso lengthened with hot water', 3.75, 'Hot', 'cup', '#4a2c1a'),
  m('Cappuccino', 'Equal parts espresso, milk and foam', 4.5, 'Hot', 'cup', '#b88a5e'),
  m('Flat White', 'Ristretto with velvety microfoam', 4.75, 'Hot', 'cup', '#c49a6c'),
  m('Latte', 'Silky milk, soft foam', 5, 'Hot', 'cup', '#c9a57b'),
  m('Mocha', 'Espresso with dark chocolate', 5.5, 'Hot', 'cup', '#6b3f2a'),
  m('Matcha Latte', 'Stone-ground, lightly sweet', 5.5, 'Hot', 'cup', '#8a9a5b'),
  m('Chai Latte', 'Spiced black tea and steamed milk', 5, 'Hot', 'cup', '#a8794a'),
  m('Cold Brew', 'Steeped 18 hours over ice', 5, 'Iced', 'iced', '#4a2a18'),
  m('Iced Latte', 'Espresso, cold milk, lots of ice', 5.25, 'Iced', 'iced', '#c49a6c'),
  m('Iced Matcha', 'Ceremonial matcha shaken with oat milk', 5.75, 'Iced', 'iced', '#8a9a5b'),
  m('Croissant', 'Baked at 6am, still warm', 4, 'Bakery', 'croissant', ''),
  m('Blueberry Muffin', 'Brown butter and lemon zest', 3.75, 'Bakery', 'muffin', ''),
  m('Cheesecake Slice', 'Baked vanilla with berry compote', 6, 'Bakery', 'cake', ''),
  m('House Blend 250g', 'Chocolate and toasted hazelnut notes', 14, 'Beans', 'bean', ''),
  m('Single Origin 250g', 'Rotating farm lot, light roast', 17, 'Beans', 'bean', ''),
]

export const REVIEWS = [
  { name: 'Maya R.', role: 'Regular since 2019', text: 'The flat white here is the reason I stopped making coffee at home. Smooth, never bitter, and the staff remember my order.' },
  { name: 'Daniel K.', role: 'Freelance designer', text: 'Quiet mornings, fast wifi and a croissant that is actually warm. I do half my week from the corner table.' },
  { name: 'Priya S.', role: 'Cold brew convert', text: 'I came for the cheesecake and left with a bag of single origin beans. Their cold brew is dangerously good.' },
  { name: 'Tom W.', role: 'Weekend visitor', text: 'Friendly baristas who explain the beans without making you feel clueless. The mocha is rich without being sweet.' },
]

export const GALLERY = [
  ['cup', '#c49a6c', 'Morning latte', 'from-amber/50 to-roast'],
  ['iced', '#4a2a18', 'Cold brew', 'from-sage/40 to-roast'],
  ['croissant', '', 'Fresh croissant', 'from-amber/40 to-espresso'],
  ['muffin', '', 'Blueberry muffin', 'from-latte/30 to-roast'],
  ['cup', '#8a9a5b', 'Matcha ritual', 'from-sage/50 to-espresso'],
  ['cake', '', 'Cheesecake', 'from-crema/20 to-roast'],
  ['bean', '', 'Small-batch beans', 'from-amber/30 to-espresso'],
  ['cup', '#3b2314', 'Double espresso', 'from-latte/40 to-roast'],
]
