// Mock data for Project T website

export const heroData = {
  title: "PROJECT T",
  subtitle: "Fuel Your Power",
  description: "The ultimate protein bar engineered with testosterone-boosting superfoods. Beets, spinach, and nature's most powerful ingredients combined.",
  cta: "Discover Your Strength"
};

export const benefitsData = [
  {
    id: 1,
    title: "Natural Testosterone Support",
    description: "Packed with scientifically-backed ingredients that naturally support healthy testosterone levels.",
    icon: "Zap"
  },
  {
    id: 2,
    title: "Peak Performance",
    description: "Optimize your workouts and recovery with premium protein and nutrient-dense superfoods.",
    icon: "TrendingUp"
  },
  {
    id: 3,
    title: "Clean Energy",
    description: "No artificial ingredients. Just pure, natural fuel to power your day.",
    icon: "Flame"
  },
  {
    id: 4,
    title: "Science-Backed Formula",
    description: "Every ingredient is chosen based on research to support men's health and vitality.",
    icon: "Atom"
  }
];

export const ingredientsData = [
  {
    id: 1,
    number: "01",
    name: "BEETROOT",
    compound: "Nitric Oxide Precursors",
    description: "Rich in dietary nitrates that convert to nitric oxide, significantly enhancing cardiovascular performance and supports the endocrine system's natural hormone production pathways.",
    benefits: ["Enhances circulation", "Increases stamina", "Supports cardiovascular health"],
    nutrients: ["NITRATES", "FOLATE", "IRON", "VITAMIN C"],
    image: "https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzV8MHwxfHNlYXJjaHwzfHxiZWV0c3xlbnwwfHx8fDE3NzMyNzE1MzB8MA&ixlib=rb-4.1.0&q=85"
  },
  {
    id: 2,
    name: "SPINACH",
    number: "02",
    compound: "Magnesium & Zinc",
    description: "A powerhouse of minerals essential for hormone production. Spinach delivers magnesium and zinc — two minerals directly correlated with testosterone levels in clinical studies.",
    benefits: ["Boosts testosterone", "Rich in minerals", "Supports muscle function"],
    nutrients: ["MAGNESIUM", "ZINC", "IRON", "VITAMIN K"],
    image: "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHwyfHxzcGluYWNofGVufDB8fHx8MTc3MzI3MTUzM3ww&ixlib=rb-4.1.0&q=85"
  },
  {
    id: 3,
    name: "POMEGRANATE",
    number: "03",
    compound: "Ellagic Acid",
    description: "Ancient superfruit packed with punicalagins and ellagic acid. Research shows pomegranate can increase salivary testosterone levels by an average of 24% while reducing cortisol.",
    benefits: ["Increases testosterone", "Reduces cortisol", "Antioxidant power"],
    nutrients: ["ELLAGIC ACID", "PUNICALAGINS", "VITAMIN C", "POTASSIUM"],
    image: "https://images.unsplash.com/photo-1663961355715-cf362778dc0e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzV8MHwxfHNlYXJjaHwyfHxiZWV0c3xlbnwwfHx8fDE3NzMyNzE1MzB8MA&ixlib=rb-4.1.0&q=85"
  },
  {
    id: 4,
    name: "PUMPKIN SEEDS",
    number: "04",
    compound: "Zinc & Omega Fatty Acids",
    description: "Loaded with zinc and essential fatty acids that support optimal testosterone production. Contains phytosterols that help maintain healthy hormone balance.",
    benefits: ["Hormone optimization", "Prostate health", "Zinc delivery"],
    nutrients: ["ZINC", "OMEGA-3", "MAGNESIUM", "VITAMIN E"],
    image: "https://images.unsplash.com/photo-1542990253-a781e04c0082?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTZ8MHwxfHNlYXJjaHwxfHxzdXBlcmZvb2RzfGVufDB8fHx8MTc3MzI3MTUzN3ww&ixlib=rb-4.1.0&q=85"
  },
  {
    id: 5,
    name: "GINGER ROOT",
    number: "05",
    compound: "Gingerol & Shogaol",
    description: "Bioactive compounds that enhance testosterone synthesis and reduce inflammation. Studies show ginger can increase testosterone by up to 17% while improving sperm quality.",
    benefits: ["T-boosting compounds", "Anti-inflammatory", "Metabolic support"],
    nutrients: ["GINGEROL", "SHOGAOL", "ANTIOXIDANTS", "MINERALS"],
    image: "https://images.unsplash.com/photo-1494597564530-871f2b93ac55?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTZ8MHwxfHNlYXJjaHwyfHxzdXBlcmZvb2RzfGVufDB8fHx8MTc3MzI3MTUzN3ww&ixlib=rb-4.1.0&q=85"
  },
  {
    id: 6,
    name: "DARK CACAO",
    number: "06",
    compound: "Flavonoids & Theobromine",
    description: "Rich in flavonoids that improve blood flow and contain mood-enhancing compounds. Dark cacao supports cardiovascular health and provides sustained energy without crashes.",
    benefits: ["Enhances blood flow", "Mood elevation", "Sustained energy"],
    nutrients: ["FLAVONOIDS", "THEOBROMINE", "MAGNESIUM", "IRON"],
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHwxfHxzcGluYWNofGVufDB8fHx8MTc3MzI3MTUzM3ww&ixlib=rb-4.1.0&q=85"
  }
];

export const testosteroneData = {
  title: "The Testosterone Crisis",
  subtitle: "Men's testosterone levels have been declining for decades",
  description: "Studies show that average testosterone levels in men have dropped significantly over the past 40 years. This decline affects energy, muscle mass, mood, and overall vitality.",
  chartData: [
    { year: "1980", level: 605, label: "605 ng/dL" },
    { year: "1990", level: 580, label: "580 ng/dL" },
    { year: "2000", level: 550, label: "550 ng/dL" },
    { year: "2010", level: 510, label: "510 ng/dL" },
    { year: "2020", level: 450, label: "450 ng/dL" },
    { year: "2024", level: 420, label: "420 ng/dL" }
  ],
  stats: [
    { value: "25%", label: "Decrease since 1980", icon: "TrendingDown" },
    { value: "300-1000", label: "Normal range ng/dL", icon: "Activity" },
    { value: "40+", label: "Years of research", icon: "BookOpen" }
  ]
};

export const aboutContent = {
  mission: "Our mission is to help men reclaim their vitality through nature's most powerful testosterone-supporting ingredients.",
  story: "Project T was born from a simple observation: modern life is working against men's health. Stress, poor nutrition, and environmental factors are contributing to declining testosterone levels across all age groups.",
  solution: "We created the T Bar as a convenient, delicious way to fight back. Every bar is packed with scientifically-proven ingredients that support natural testosterone production, helping you perform at your peak.",
  values: [
    {
      title: "Science-First",
      description: "Every ingredient is backed by peer-reviewed research",
      icon: "Microscope"
    },
    {
      title: "Natural Power",
      description: "No synthetic hormones, only nature's best",
      icon: "Leaf"
    },
    {
      title: "Performance Focus",
      description: "Built for men who demand more from life",
      icon: "Target"
    }
  ]
};
