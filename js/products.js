/* ============================================================
   PRODUCT DATA — single source of truth
   ============================================================ */
const PRODUCTS = [
  {
    id: "physics-11",
    title: "Physics Class 11",
    short: "Mechanics to thermodynamics, distilled into exam-ready notes.",
    price: 99,
    was: null,
    page: "product-physics-11.html",
    img: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=1000&auto=format&fit=crop",
    rating: 4.8,
    reviews: 312,
    tag: null
  },
  {
    id: "physics-12",
    title: "Physics Class 12",
    short: "Electrostatics, optics and modern physics — mapped to NEET weightage.",
    price: 99,
    was: null,
    page: "product-physics-12.html",
    img: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    reviews: 287,
    tag: null
  },
  {
    id: "physical-chemistry",
    title: "Physical Chemistry",
    short: "Every formula and derivation you need, nothing you don't.",
    price: 99,
    was: null,
    page: "product-physical-chemistry.html",
    img: "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?q=80&w=1000&auto=format&fit=crop",
    rating: 4.9,
    reviews: 401,
    tag: "Bestseller"
  },
  {
    id: "organic-chemistry",
    title: "Organic Chemistry",
    short: "Reaction mechanisms and named reactions, made to actually stick.",
    price: 99,
    was: null,
    page: "product-organic-chemistry.html",
    img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1000&auto=format&fit=crop",
    rating: 4.8,
    reviews: 356,
    tag: null
  },
  {
    id: "inorganic-chemistry",
    title: "Inorganic Chemistry",
    short: "The periodic table, decoded into pattern-based recall notes.",
    price: 99,
    was: null,
    page: "product-inorganic-chemistry.html",
    img: "https://images.unsplash.com/photo-1628863353691-0071c8c1874c?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    reviews: 264,
    tag: null
  },
  {
    id: "complete-bundle",
    title: "Complete NEET Bundle",
    short: "All five subjects in one set — the highest-yield way to revise.",
    price: 249,
    was: 495,
    page: "product-bundle.html",
    img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop",
    rating: 4.9,
    reviews: 892,
    tag: "Best Value",
    featured: true
  }
];

function findProduct(id) {
  return PRODUCTS.find(p => p.id === id);
}

function relatedProducts(currentId, count = 3) {
  return PRODUCTS.filter(p => p.id !== currentId && p.id !== "complete-bundle").slice(0, count);
}
