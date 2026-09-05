import shirts from "@/assets/cat-shirts.jpg";
import trousers from "@/assets/cat-trousers.jpg";
import shoes from "@/assets/cat-shoes.jpg";
import belts from "@/assets/cat-belts.jpg";
import caps from "@/assets/cat-caps.jpg";
import bags from "@/assets/cat-bags.jpg";

export type CategorySlug = "mens-shirts" | "trousers" | "shoes" | "belts" | "caps" | "bags";

export type CategoryPath = "/mens-shirts" | "/trousers" | "/shoes" | "/belts" | "/caps" | "/bags";

export type Category = {
  slug: CategorySlug;
  name: string;
  path: CategoryPath;
  image: string;
  blurb: string;
};

export const categories: Category[] = [
  {
    slug: "mens-shirts",
    name: "Men's Shirts",
    path: "/mens-shirts",
    image: shirts,
    blurb: "Long-staple cotton, precision collars, an immaculate drape.",
  },
  {
    slug: "trousers",
    name: "Trousers",
    path: "/trousers",
    image: trousers,
    blurb: "Tailored lines and fluid movement, cut for the modern day.",
  },
  {
    slug: "shoes",
    name: "Shoes",
    path: "/shoes",
    image: shoes,
    blurb: "Hand-finished leather, built on lasts that flatter every step.",
  },
  {
    slug: "belts",
    name: "Belts",
    path: "/belts",
    image: belts,
    blurb: "Full-grain leather with quiet, sculpted hardware.",
  },
  {
    slug: "caps",
    name: "Caps",
    path: "/caps",
    image: caps,
    blurb: "Structured crowns and clean embroidery for everyday edge.",
  },
  {
    slug: "bags",
    name: "Bags",
    path: "/bags",
    image: bags,
    blurb: "Considered carry, engineered for travel and the working week.",
  },
];

export const categoryBySlug = (slug: CategorySlug) =>
  categories.find((c) => c.slug === slug) as Category;

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  compareAt?: number;
  rating: number;
  image: string;
  tags: ("best-seller" | "new")[];
  sizes?: string[];
  colors: { name: string; value: string }[];
  description: string;
  details: string[];
};

const navy = { name: "Deep Navy", value: "#0B1020" };
const violet = { name: "Electric Violet", value: "#7C3AED" };
const white = { name: "White", value: "#FFFFFF" };

const apparelSizes = ["XS", "S", "M", "L", "XL", "XXL"];
const waistSizes = ["28", "30", "32", "34", "36", "38"];
const shoeSizes = ["7", "8", "9", "10", "11", "12"];
const beltSizes = ["30", "32", "34", "36", "38"];

const img: Record<CategorySlug, string> = {
  "mens-shirts": shirts,
  trousers,
  shoes,
  belts,
  caps,
  bags,
};

type Seed = Omit<Product, "id" | "slug" | "image"> & { slug?: string };

const seeds: Seed[] = [
  // Shirts
  {
    name: "Meridian Poplin Shirt",
    category: "mens-shirts",
    price: 128,
    rating: 4.8,
    tags: ["best-seller"],
    sizes: apparelSizes,
    colors: [white, navy],
    description:
      "A crisp two-ply poplin shirt with a cutaway collar and a clean, close-to-body line.",
    details: ["100% long-staple cotton poplin", "Cutaway collar, single-button cuff", "Machine wash cold"],
  },
  {
    name: "Nocturne Satin Shirt",
    category: "mens-shirts",
    price: 165,
    compareAt: 195,
    rating: 4.7,
    tags: ["new"],
    sizes: apparelSizes,
    colors: [navy, violet],
    description: "An evening shirt in fluid satin-finish cotton with a soft, unlined collar.",
    details: ["Satin-finish cotton blend", "Concealed placket", "Dry clean recommended"],
  },
  {
    name: "Atlas Oxford Shirt",
    category: "mens-shirts",
    price: 112,
    rating: 4.6,
    tags: [],
    sizes: apparelSizes,
    colors: [white, navy],
    description: "The everyday oxford, rebuilt with a heavier yarn and a relaxed shoulder.",
    details: ["Washed oxford cotton", "Relaxed shoulder, boxy hem", "Machine wash cold"],
  },
  {
    name: "Ridge Linen Shirt",
    category: "mens-shirts",
    price: 138,
    rating: 4.5,
    tags: ["new"],
    sizes: apparelSizes,
    colors: [white, navy],
    description: "European linen with a breathable open weave and a camp collar.",
    details: ["100% European linen", "Camp collar", "Cool iron"],
  },
  {
    name: "Signature Twill Shirt",
    category: "mens-shirts",
    price: 145,
    rating: 4.9,
    tags: ["best-seller"],
    sizes: apparelSizes,
    colors: [navy, white],
    description: "A structured twill with a mother-of-pearl button placket and a sharp point collar.",
    details: ["Compact twill cotton", "Mother-of-pearl buttons", "Machine wash cold"],
  },
  // Trousers
  {
    name: "Meridian Wool Trouser",
    category: "trousers",
    price: 198,
    rating: 4.8,
    tags: ["best-seller"],
    sizes: waistSizes,
    colors: [navy],
    description: "A high-twist wool trouser with a single forward pleat and a tapered break.",
    details: ["High-twist Italian wool", "Single forward pleat", "Dry clean only"],
  },
  {
    name: "Studio Pleated Trouser",
    category: "trousers",
    price: 176,
    compareAt: 210,
    rating: 4.6,
    tags: ["new"],
    sizes: waistSizes,
    colors: [navy, white],
    description: "Wide through the thigh, clean at the ankle — an easy architectural silhouette.",
    details: ["Cotton-wool blend", "Double pleat, side adjusters", "Dry clean only"],
  },
  {
    name: "Course Tapered Chino",
    category: "trousers",
    price: 132,
    rating: 4.5,
    tags: [],
    sizes: waistSizes,
    colors: [navy, white],
    description: "A garment-dyed chino with a soft hand and a modern taper.",
    details: ["Garment-dyed cotton twill", "Modern taper", "Machine wash cold"],
  },
  {
    name: "Voltage Tech Trouser",
    category: "trousers",
    price: 188,
    rating: 4.7,
    tags: ["new"],
    sizes: waistSizes,
    colors: [navy, violet],
    description: "Four-way stretch technical fabric with a matte finish and hidden zip pockets.",
    details: ["Recycled technical stretch", "Hidden zip pockets", "Machine wash cold"],
  },
  // Shoes
  {
    name: "Ismail Derby Oxford",
    category: "shoes",
    price: 285,
    rating: 4.9,
    tags: ["best-seller"],
    sizes: shoeSizes,
    colors: [navy],
    description: "A cap-toe oxford on a slim last, hand-burnished and leather-soled.",
    details: ["Full-grain calf leather", "Leather sole, Blake stitch", "Includes dust bag"],
  },
  {
    name: "Court Low Sneaker",
    category: "shoes",
    price: 215,
    rating: 4.7,
    tags: ["best-seller"],
    sizes: shoeSizes,
    colors: [white, navy],
    description: "A minimal court sneaker in tumbled leather with a cupsole in bright white.",
    details: ["Tumbled leather upper", "Vulcanised cupsole", "Removable insole"],
  },
  {
    name: "Nocturne Chelsea Boot",
    category: "shoes",
    price: 320,
    compareAt: 375,
    rating: 4.8,
    tags: ["new"],
    sizes: shoeSizes,
    colors: [navy],
    description: "A sleek Chelsea with elastic gores and a stacked leather heel.",
    details: ["Polished calf leather", "Stacked leather heel", "Includes dust bag"],
  },
  {
    name: "Drift Leather Loafer",
    category: "shoes",
    price: 245,
    rating: 4.6,
    tags: [],
    sizes: shoeSizes,
    colors: [navy],
    description: "An unlined loafer built for warm months and long evenings.",
    details: ["Unlined suede-touch leather", "Flexible rubber sole", "Includes dust bag"],
  },
  // Belts
  {
    name: "Signature Buckle Belt",
    category: "belts",
    price: 96,
    rating: 4.8,
    tags: ["best-seller"],
    sizes: beltSizes,
    colors: [navy],
    description: "A 35mm full-grain belt with a brushed rectangular buckle.",
    details: ["Full-grain leather", "Brushed nickel buckle", "35mm width"],
  },
  {
    name: "Meridian Dress Belt",
    category: "belts",
    price: 110,
    rating: 4.7,
    tags: ["new"],
    sizes: beltSizes,
    colors: [navy],
    description: "A slim 30mm dress belt with an edge-painted finish.",
    details: ["Box-calf leather", "Edge-painted finish", "30mm width"],
  },
  {
    name: "Voltage Woven Belt",
    category: "belts",
    price: 84,
    rating: 4.4,
    tags: [],
    sizes: beltSizes,
    colors: [navy, violet],
    description: "A stretch-woven belt with leather tipping for weekend tailoring.",
    details: ["Woven stretch cotton", "Leather tipping", "35mm width"],
  },
  // Caps
  {
    name: "Monogram Structured Cap",
    category: "caps",
    price: 68,
    rating: 4.7,
    tags: ["best-seller"],
    colors: [navy, white],
    description: "A six-panel cap in heavy twill with raised monogram embroidery.",
    details: ["Heavy cotton twill", "Raised embroidery", "Adjustable metal clasp"],
  },
  {
    name: "Atlas Canvas Cap",
    category: "caps",
    price: 58,
    rating: 4.5,
    tags: [],
    colors: [white, navy],
    description: "A washed canvas cap with an unstructured crown and a curved brim.",
    details: ["Washed cotton canvas", "Unstructured crown", "Adjustable strap"],
  },
  {
    name: "Voltage Nylon Cap",
    category: "caps",
    price: 74,
    compareAt: 88,
    rating: 4.6,
    tags: ["new"],
    colors: [navy, violet],
    description: "A water-repellent nylon cap with tonal violet piping.",
    details: ["Water-repellent nylon", "Tonal piping", "Adjustable strap"],
  },
  // Bags
  {
    name: "Meridian Weekender",
    category: "bags",
    price: 395,
    rating: 4.9,
    tags: ["best-seller"],
    colors: [navy],
    description: "A structured 40L holdall in pebbled leather with a detachable strap.",
    details: ["Pebbled leather", "40L capacity", "Detachable shoulder strap"],
  },
  {
    name: "Atlas Daily Backpack",
    category: "bags",
    price: 265,
    rating: 4.7,
    tags: ["new"],
    colors: [navy],
    description: "A clean-lined backpack with a padded 16-inch laptop sleeve.",
    details: ["Pebbled leather", "16in padded sleeve", "Water-resistant lining"],
  },
  {
    name: "Studio Document Case",
    category: "bags",
    price: 230,
    compareAt: 275,
    rating: 4.6,
    tags: [],
    colors: [navy],
    description: "A slim portfolio case for the essentials and nothing more.",
    details: ["Box-calf leather", "Two internal sleeves", "Magnetic closure"],
  },
];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const products: Product[] = seeds.map((s, i) => ({
  ...s,
  id: `ism-${String(i + 1).padStart(3, "0")}`,
  slug: slugify(s.name),
  image: img[s.category],
}));

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const byCategory = (slug: CategorySlug) => products.filter((p) => p.category === slug);
export const bestSellers = products.filter((p) => p.tags.includes("best-seller"));
export const newArrivals = products.filter((p) => p.tags.includes("new"));

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
