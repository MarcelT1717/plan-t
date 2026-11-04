// Single source of product information for the whole site.
// To add a flavour: add its label to public/royal-t/, any new ingredient to
// `ingredientCatalog`, and an entry to `barsData`. Paste each bar's Shopify
// variant ID into `shopifyVariantId` to turn on Add to Bag.

export const ingredientCatalog = {
  dates: {
    name: 'Dates',
    image: '/royal-t/ingredients/dates.webp',
    description: 'Whole dates form the base of every bar, giving natural sweetness and the chewy texture that holds it together.',
    nutrients: ['FIBRE', 'POTASSIUM', 'NATURAL SUGARS'],
  },
  honey: {
    name: 'Raw Honey',
    image: '/royal-t/ingredients/honey.webp',
    description: 'Unpasteurised, minimally filtered honey. Adds a floral sweetness and helps bind the bar.',
    nutrients: ['NATURAL SUGARS', 'TRACE MINERALS'],
    note: 'Bee product',
  },
  royalJelly: {
    name: 'Royal Jelly',
    image: '/royal-t/ingredients/royalJelly.webp',
    description: 'A creamy substance produced by worker honeybees to feed young larvae and the queen. Used in small amounts for a rich, slightly tangy note.',
    nutrients: ['PROTEIN', 'B-VITAMINS'],
    note: 'Bee product',
  },
  beets: {
    name: 'Beets',
    image: '/royal-t/ingredients/beets.webp',
    description: 'Beetroot, dried and ground. Earthy, gently sweet and the source of Red\'s deep colour.',
    nutrients: ['FOLATE', 'FIBRE'],
  },
  pomegranate: {
    name: 'Pomegranate',
    image: '/royal-t/ingredients/pomegranate.webp',
    description: 'Tart and jewel-bright, pomegranate gives Purple its fruity flavour and colour.',
    nutrients: ['POLYPHENOLS', 'VITAMIN C'],
  },
  turmeric: {
    name: 'Turmeric',
    image: '/royal-t/ingredients/turmeric.webp',
    description: 'Ground turmeric root. Warm, earthy and responsible for Orange\'s golden hue.',
    nutrients: ['CURCUMIN', 'MANGANESE'],
  },
  almonds: {
    name: 'Almonds',
    image: '/royal-t/ingredients/almonds.webp',
    description: 'Whole almonds for crunch and a mild, buttery flavour.',
    nutrients: ['VITAMIN E', 'MAGNESIUM'],
    note: 'Tree nut',
  },
  brazilNuts: {
    name: 'Brazil Nuts',
    image: '/royal-t/ingredients/brazilNuts.webp',
    description: 'Rich, creamy Brazil nuts with a distinctly buttery flavour.',
    nutrients: ['SELENIUM', 'MAGNESIUM'],
    note: 'Tree nut',
  },
  cashews: {
    name: 'Cashews',
    image: '/royal-t/ingredients/cashews.webp',
    description: 'Mild, creamy cashews that give Orange a smooth, rounded bite.',
    nutrients: ['COPPER', 'MAGNESIUM'],
    note: 'Tree nut',
  },
};

const ingredientList = (keys) =>
  keys.map((key) => ({ key, ...ingredientCatalog[key] }));

const shared = {
  name: 'Royal T',
  subtitle: "Men's Nutrition Bar",
  status: 'Coming Soon',
  netWeight: '2.1 oz (60 g)',
  produced: '7/10/2026',
  registration: '26-437',
  tags: ['Whole Food', 'Five Ingredients', 'No Artificial Additives', 'Small Batch', 'Handcrafted'],
};

export const barsData = {
  red: {
    ...shared,
    id: 'red',
    variant: 'RED',
    flavor: 'Beetroot',
    hex: '#A62D3B',
    label: '/royal-t/label-red.webp',
    // Product shot of the wrapped bar for the homepage hero. Add one per flavour;
    // flavours without one fall back to their label artwork.
    packImage: '/royal-t/pack-red.png',
    productImage: '/royal-t/label-red.webp',
    // Surface texture for the 3D unwrapped bar (cropped from the product photo).
    rawBar: '/royal-t/raw-bar-red.webp',
    shopifyVariantId: '', // e.g. 'gid://shopify/ProductVariant/1234567890'
    featured: 'beets',
    nut: 'almonds',
    tagline: 'Dates · Beets · Almonds · Raw Honey · Royal Jelly',
    description:
      'Earthy and gently sweet. Beetroot brings a deep red colour and rich flavour, with almonds for crunch and raw honey and royal jelly rounding it out.',
    allergens: 'Contains: Tree Nuts (Almonds). Contains bee products (raw honey, royal jelly).',
    ingredients: ingredientList(['dates', 'beets', 'almonds', 'honey', 'royalJelly']),
    keyNutrients: [
      { name: 'Fibre',           source: 'Dates',            description: 'Naturally present in whole dates' },
      { name: 'Potassium',       source: 'Dates',            description: 'A mineral naturally found in dates' },
      { name: 'Folate',          source: 'Beets',            description: 'A B-vitamin naturally found in beetroot' },
      { name: 'Vitamin E',       source: 'Almonds',          description: 'A fat-soluble vitamin found in almonds' },
      { name: 'Magnesium',       source: 'Almonds',          description: 'A mineral naturally abundant in nuts' },
      { name: 'Natural Sugars',  source: 'Dates and honey',  description: 'The only sweeteners in the bar' },
    ],
    color: {
      strip:  'from-red-900 via-red-500 to-red-900',
      text:   'text-red-400',
      border: 'border-red-500/40',
      glow:   'red-500/8',
      badge:  'bg-red-500/10 border-red-500/30 text-red-400',
    },
  },

  purple: {
    ...shared,
    id: 'purple',
    variant: 'PURPLE',
    flavor: 'Pomegranate',
    hex: '#7745A0',
    label: '/royal-t/label-purple.webp',
    packImage: '/royal-t/pack-purple.png',
    productImage: '/royal-t/label-purple.webp',
    rawBar: '/royal-t/raw-bar-purple.webp', // recoloured from the Red photo until a Purple photo exists
    shopifyVariantId: '', // e.g. 'gid://shopify/ProductVariant/1234567890'
    featured: 'pomegranate',
    nut: 'brazilNuts',
    tagline: 'Dates · Pomegranate · Brazil Nuts · Raw Honey · Royal Jelly',
    description:
      'Bright, tart and rich. Pomegranate sits over a base of dates and creamy Brazil nuts, finished with raw honey and royal jelly.',
    allergens: 'Contains: Tree Nuts (Brazil Nuts). Contains bee products (raw honey, royal jelly).',
    ingredients: ingredientList(['dates', 'pomegranate', 'brazilNuts', 'honey', 'royalJelly']),
    keyNutrients: [
      { name: 'Fibre',             source: 'Dates',            description: 'Naturally present in whole dates' },
      { name: 'Potassium',         source: 'Dates',            description: 'A mineral naturally found in dates' },
      { name: 'Selenium',          source: 'Brazil nuts',      description: 'Brazil nuts are one of the richest food sources of selenium' },
      { name: 'Polyphenols',       source: 'Pomegranate',      description: 'Plant compounds naturally found in pomegranate' },
      { name: 'Unsaturated Fats',  source: 'Brazil nuts',      description: 'The main type of fat in Brazil nuts' },
      { name: 'Natural Sugars',    source: 'Dates and honey',  description: 'The only sweeteners in the bar' },
    ],
    color: {
      strip:  'from-purple-900 via-purple-500 to-purple-900',
      text:   'text-purple-400',
      border: 'border-purple-500/40',
      glow:   'purple-500/8',
      badge:  'bg-purple-500/10 border-purple-500/30 text-purple-400',
    },
  },

  orange: {
    ...shared,
    id: 'orange',
    variant: 'ORANGE',
    flavor: 'Turmeric',
    hex: '#D77A24',
    label: '/royal-t/label-orange.webp',
    packImage: '/royal-t/pack-orange.png',
    productImage: '/royal-t/label-orange.webp',
    rawBar: '/royal-t/raw-bar-orange.webp', // recoloured from the Red photo until an Orange photo exists
    shopifyVariantId: '', // e.g. 'gid://shopify/ProductVariant/1234567890'
    featured: 'turmeric',
    nut: 'cashews',
    tagline: 'Dates · Turmeric · Cashews · Raw Honey · Royal Jelly',
    description:
      'Warm and golden. Turmeric gives an earthy, aromatic depth, with smooth cashews, dates, raw honey and royal jelly.',
    allergens: 'Contains: Tree Nuts (Cashews). Contains bee products (raw honey, royal jelly).',
    ingredients: ingredientList(['dates', 'turmeric', 'cashews', 'honey', 'royalJelly']),
    keyNutrients: [
      { name: 'Fibre',           source: 'Dates',            description: 'Naturally present in whole dates' },
      { name: 'Potassium',       source: 'Dates',            description: 'A mineral naturally found in dates' },
      { name: 'Curcumin',        source: 'Turmeric',         description: 'The compound that gives turmeric its colour' },
      { name: 'Copper',          source: 'Cashews',          description: 'A trace mineral naturally found in cashews' },
      { name: 'Magnesium',       source: 'Cashews',          description: 'A mineral naturally abundant in nuts' },
      { name: 'Natural Sugars',  source: 'Dates and honey',  description: 'The only sweeteners in the bar' },
    ],
    color: {
      strip:  'from-orange-900 via-orange-500 to-orange-900',
      text:   'text-orange-400',
      border: 'border-orange-500/40',
      glow:   'orange-500/8',
      badge:  'bg-orange-500/10 border-orange-500/30 text-orange-400',
    },
  },
};

export const flavorIds = Object.keys(barsData);

// "The Ingredient" feature on the homepage. Swap `image` paths for better
// photography when you have it; a card with `composition` draws a chart instead.
export const royalJellyFeature = {
  eyebrow: 'The Ingredient',
  headline: 'Royal jelly. Made by the hive, folded into every bar.',
  intro: 'The rare, creamy food honeybees make for their young and their queen, and the ingredient Royal T is named for.',
  cards: [
    {
      title: 'What it is',
      tag: 'Made by honeybees',
      image: '/royal-t/ingredients/royalJelly.webp',
      body: 'A creamy, slightly tangy substance produced by worker honeybees to feed young larvae. The queen bee eats it for her whole life.',
    },
    {
      title: 'How it\'s collected',
      tag: 'Gathered by hand',
      image: '/royal-t/ingredients/honey.webp',
      body: 'Beekeepers gather it from special cells inside the hive, a fraction of a gram at a time, then keep it cold so it stays fresh.',
    },
    {
      // Describe what royal jelly contains and why people seek it out; don't claim
      // it treats, prevents or improves anything.
      title: 'Why people take it',
      tag: 'Protein · B-vitamins · 10-HDA',
      // TODO: swap for a dedicated photo; this reuses card 1's, mirrored.
      image: '/royal-t/ingredients/royalJelly.webp',
      mirror: true,
      body: 'Prized for centuries and still being researched, royal jelly carries protein, B-vitamins and 10-HDA, a fatty acid found almost nowhere else in nature. Not suitable for anyone allergic to bees, honey or pollen.',
    },
  ],
};

// "The Difference" comparison on the homepage. Keep every Royal T entry something
// you can stand behind, and keep competitor columns general ("typical", "often").
// Add calories / sugar rows once you have lab-verified nutrition facts.
export const comparison = {
  eyebrow: 'The Difference',
  headline: 'Same snack. Shorter label.',
  intro: 'No isolates, no fillers, nothing to decode. Just the five ingredients that make the bar.',
  columns: ['Royal T', 'Typical protein bar', 'Typical candy bar'],
  rows: [
    { label: 'Ingredients', values: ['5', 'Often 15 or more', 'Often 10 or more'], check: false },
    { label: 'Sweetened with', values: ['Dates & raw honey', 'Sugar alcohols or sucralose', 'Sugar & corn syrup'], check: true },
    { label: 'Protein isolates', values: ['None', 'Usually', 'Rarely'], check: true },
    { label: 'Artificial flavors or colors', values: ['None', 'Often', 'Often'], check: true },
    { label: 'Every ingredient on the front', values: ['Yes', 'Rarely', 'Rarely'], check: true },
    { label: 'Made', values: ['By hand, small batches', 'Mass-produced', 'Mass-produced'], check: true },
  ],
  footnote: 'Comparisons describe typical products in each category; individual brands vary.',
};

// "How to Enjoy" timeline on the homepage. Keep these about when and how to eat
// a bar; avoid health or performance claims.
export const howToEnjoy = {
  eyebrow: 'How to Enjoy',
  headline: ['One for the morning.', 'One for the road.'],
  intro: 'Every bar is the same five ingredients, made by hand in small batches. Nothing to mix, measure or scoop. Unwrap it whenever you want real food fast.',
  pills: ['Five ingredients', 'No preservatives', 'Contains tree nuts & bee products'],
  steps: [
    {
      time: '7 AM',
      title: 'Breakfast',
      lead: 'Dates, honey and nuts. Nothing else.',
      body: 'Have one with your coffee or eat it on the way out the door. Nothing to blend, nothing to measure.',
    },
    {
      time: '11 AM',
      title: 'Between meetings',
      lead: 'Real food in a few bites.',
      body: 'Dense and chewy, and small enough for a pocket, a desk drawer or a gym bag.',
    },
    {
      time: '5 PM',
      title: 'Before the gym',
      lead: 'Sweetened only by dates and raw honey.',
      body: 'No sugar alcohols, no sucralose, no syrups. Eat it on the way in.',
    },
    {
      time: 'Any time',
      title: 'On the road',
      lead: 'No fridge needed.',
      body: 'Best within two weeks at room temperature, or up to two months in the fridge.',
    },
  ],
};

// Scrolling strip under the hero.
export const highlights = ['Five Ingredients', 'Raw Honey & Royal Jelly', 'Whole Food', 'No Artificial Additives', 'Small Batch', 'Handmade in Chicago'];
