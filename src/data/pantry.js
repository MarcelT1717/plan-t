// Every ingredient available in the homepage bar builder, keyed by id.
// `allergen` feeds the live "Contains" line; `bee` marks non-vegan bee products.

export const pantry = {
  dates: {
    name: 'Dates', color: '#a0522d', role: 'Base & Binder',
    description: 'Whole Medjool dates: soft, naturally sweet and unrefined. The foundation of every bar.',
    nutrients: ['NATURAL SUGARS', 'FIBRE', 'POTASSIUM', 'MAGNESIUM'],
  },
  almonds: {
    name: 'Almonds', color: '#d2a679', role: 'Texture', allergen: 'Tree Nuts (Almonds)',
    description: 'Whole blanched almonds for a satisfying crunch and a mild, buttery flavour.',
    nutrients: ['VITAMIN E', 'HEALTHY FATS', 'MAGNESIUM', 'PROTEIN'],
  },
  brazilNuts: {
    name: 'Brazil Nuts', color: '#b08968', role: 'Base', allergen: 'Tree Nuts (Brazil Nuts)',
    description: 'Whole Brazil nuts with a rich, creamy texture and a distinctly buttery flavour.',
    nutrients: ['SELENIUM', 'HEALTHY FATS', 'MAGNESIUM', 'PROTEIN'],
  },
  pumpkinSeeds: {
    name: 'Pumpkin Seeds', color: '#7a9a3a', role: 'Texture',
    description: 'Whole pumpkin seeds. Lightly nutty with a satisfying bite and a naturally mineral-dense profile.',
    nutrients: ['ZINC', 'OMEGA-3', 'MAGNESIUM', 'PROTEIN'],
  },
  beets: {
    name: 'Beets', color: '#b0193a', role: 'Flavour & Colour',
    description: 'Whole beetroot dried and ground to a fine powder. Earthy, slightly sweet and deep red.',
    nutrients: ['FOLATE', 'IRON', 'VITAMIN C', 'FIBRE'],
  },
  spinach: {
    name: 'Spinach', color: '#2e7d32', role: 'Flavour & Colour',
    description: 'Whole spinach leaves dried and ground. Mild, earthy and naturally green.',
    nutrients: ['IRON', 'VITAMIN K', 'FOLATE', 'MAGNESIUM'],
  },
  turmeric: {
    name: 'Turmeric', color: '#e3a008', role: 'Spice & Colour',
    description: 'Whole ground turmeric root. Earthy, slightly bitter and a warm golden colour.',
    nutrients: ['CURCUMIN', 'MANGANESE', 'IRON'],
  },
  ginger: {
    name: 'Ginger', color: '#d4a373', role: 'Spice',
    description: 'Whole dried ginger root. Warm, fiery and aromatic.',
    nutrients: ['GINGEROL', 'SHOGAOL', 'MINERALS'],
  },
  maca: {
    name: 'Maca', color: '#c8b08a', role: 'Depth',
    description: 'Whole maca root dried and ground. Earthy and malty with a subtle sweetness.',
    nutrients: ['IRON', 'CALCIUM', 'AMINO ACIDS', 'B-VITAMINS'],
  },
  pomegranate: {
    name: 'Pomegranate', color: '#a4133c', role: 'Flavour & Colour',
    description: 'Whole pomegranate dried and ground. Tart, bright and intensely fruity.',
    nutrients: ['ELLAGIC ACID', 'PUNICALAGINS', 'VITAMIN C'],
  },
  cacao: {
    name: 'Cacao', color: '#6d4c41', role: 'Flavour',
    description: 'Minimally processed whole cacao. Deeply bitter, complex and roasted.',
    nutrients: ['FLAVONOIDS', 'THEOBROMINE', 'MAGNESIUM', 'IRON'],
  },
  coconutOil: {
    name: 'Coconut Oil', color: '#e8e2d0', role: 'Binding Fat',
    description: 'Unrefined cold-pressed coconut oil. Holds the bar together and adds a clean richness.',
    nutrients: ['MCT', 'HEALTHY FATS', 'LAURIC ACID'],
  },
  rawHoney: {
    name: 'Raw Honey', color: '#f0a500', role: 'Sweetener', bee: true,
    description: 'Unfiltered, unheated raw honey. Floral and complex, adds gentle sweetness and helps bind.',
    nutrients: ['NATURAL SUGARS', 'ENZYMES', 'TRACE MINERALS'],
  },
  royalJelly: {
    name: 'Royal Jelly', color: '#f3e5ab', role: 'Richness', bee: true,
    description: 'A creamy substance made by worker honeybees. Rich and slightly tangy, used in small amounts.',
    nutrients: ['PROTEIN', 'B-VITAMINS', 'AMINO ACIDS'],
  },
  propolis: {
    name: 'Propolis', color: '#8d5524', role: 'Accent', bee: true,
    description: 'A resin honeybees collect from tree buds. Bold, resinous and slightly bitter, used in tiny amounts.',
    nutrients: ['POLYPHENOLS', 'FLAVONOIDS'],
  },
  seaSalt: {
    name: 'Sea Salt', color: '#cfd8dc', role: 'Finish',
    description: 'A touch of sea salt to balance the sweetness and bring the flavours into focus.',
    nutrients: ['SODIUM', 'TRACE MINERALS'],
  },
};

// Maps ingredient names used in barsData to pantry ids.
const aliases = { 'Maca Powder': 'maca', Salt: 'seaSalt' };

export const pantryKey = (name) =>
  aliases[name] ?? Object.keys(pantry).find((key) => pantry[key].name === name);
