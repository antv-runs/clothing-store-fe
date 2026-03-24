import type { Product, ProductDetail } from "../types/product";

export const products: Product[] = [
  {
    id: "180",
    name: "Sport Straight Jeans Jersey 172",
    slug: "sport-straight-jeans-jersey-172",
    description:
      "Sport Straight Jeans Jersey 172 for Jeans looks, designed for daily comfort and versatile styling.",
    details:
      "Relaxed straight fit jeans with a soft jersey blend. Ideal for daily wear and clean street styling.",
    pricing: {
      currency: "USD",
      current: 192,
      original: 200,
      discountPercent: 4,
    },
    thumbnail:
      "https://shop-admin-s3-antv.s3.amazonaws.com/products/m45esUrF32ZsYQEzinp8nfIGFw9sNpkBBZ1QFBw1.png",
    thumbnailAlt: "Sport Straight Jeans Jersey 172",
    images: [
      {
        id: "44",
        image_url:
          "https://shop-admin-s3-antv.s3.amazonaws.com/products/m45esUrF32ZsYQEzinp8nfIGFw9sNpkBBZ1QFBw1.png",
        url: "https://shop-admin-s3-antv.s3.amazonaws.com/products/m45esUrF32ZsYQEzinp8nfIGFw9sNpkBBZ1QFBw1.png",
        alt_text: null,
        alt: "Sport Straight Jeans Jersey front view",
        is_primary: true,
        sort_order: 1,
      },
      {
        id: "23",
        image_url:
          "https://shop-admin-s3-antv.s3.amazonaws.com/products/3NKQJI9wHE73KAK00rfT4GrhyYL7ExB9iHwc8Vuo.png",
        url: "https://shop-admin-s3-antv.s3.amazonaws.com/products/3NKQJI9wHE73KAK00rfT4GrhyYL7ExB9iHwc8Vuo.png",
        alt_text: null,
        alt: "Sport Straight Jeans Jersey side view",
        is_primary: false,
        sort_order: 2,
      },
      {
        id: "45",
        image_url:
          "https://shop-admin-s3-antv.s3.amazonaws.com/products/E3D63CunE3xzWAd1L6ELTMmWZ4fRQDM0FtBw8rKY.png",
        url: "https://shop-admin-s3-antv.s3.amazonaws.com/products/E3D63CunE3xzWAd1L6ELTMmWZ4fRQDM0FtBw8rKY.png",
        alt_text: null,
        alt: "Sport Straight Jeans Jersey back view",
        is_primary: false,
        sort_order: 3,
      },
    ],
    category: {
      id: "12",
      name: "Jeans",
      slug: "jeans",
    },
    variants: {
      colors: [
        { id: "white", label: "White", colorCode: "#f5f5f5" },
        { id: "green", label: "Green", colorCode: "#405b4a" },
        { id: "gray", label: "Gray", colorCode: "#707277" },
        { id: "beige", label: "Beige", colorCode: "#b9a17d" },
      ],
      sizes: [
        { id: "Large", label: "Large", inStock: true },
        { id: "X-Large", label: "X-Large", inStock: true },
      ],
    },
    rating: 3.6,
    reviewCount: 30,
    breadcrumb: ["Home", "Shop", "Jeans", "Sport Straight Jeans Jersey 172"],
    faqs: [
      {
        question: "How does the fit run?",
        answer: "This item has a straight fit and runs true to size.",
      },
      {
        question: "Can I machine wash this product?",
        answer: "Yes, cold machine wash and low tumble dry are recommended.",
      },
    ],
    relatedProductIds: ["168", "171", "179"],
    stock: {
      inStock: true,
      quantity: 42,
    },
  },
  {
    id: "179",
    name: "Modern Oxford Shirt Fleece 171",
    slug: "modern-oxford-shirt-fleece-171",
    description:
      "Modern Oxford Shirt Fleece 171 for Shirts looks, designed for daily comfort and versatile styling.",
    details:
      "Soft oxford weave with fleece interior and a structured collar for smart casual looks.",
    pricing: {
      currency: "USD",
      current: 296,
      original: 296,
      discountPercent: null,
    },
    thumbnail:
      "https://shop-admin-s3-antv.s3.amazonaws.com/products/kVCNr0oweat06Eyhs5BXZZspTe6nIy8TOq9KrhKh.png",
    thumbnailAlt: "Modern Oxford Shirt Fleece 171",
    images: [
      {
        id: "24",
        image_url:
          "https://shop-admin-s3-antv.s3.amazonaws.com/products/kVCNr0oweat06Eyhs5BXZZspTe6nIy8TOq9KrhKh.png",
        url: "https://shop-admin-s3-antv.s3.amazonaws.com/products/kVCNr0oweat06Eyhs5BXZZspTe6nIy8TOq9KrhKh.png",
        alt_text: null,
        alt: "Modern Oxford Shirt Fleece",
        is_primary: true,
        sort_order: 1,
      },
    ],
    category: {
      id: "11",
      name: "Shirts",
      slug: "shirts",
    },
    variants: {
      colors: [
        { id: "red", label: "Red", colorCode: "#9a2f2f" },
        { id: "gray", label: "Gray", colorCode: "#7a7d85" },
      ],
      sizes: [
        { id: "Medium", label: "Medium", inStock: true },
        { id: "Large", label: "Large", inStock: true },
        { id: "X-Large", label: "X-Large", inStock: false },
      ],
    },
    rating: 3.4,
    reviewCount: 22,
    breadcrumb: ["Home", "Shop", "Shirts", "Modern Oxford Shirt Fleece 171"],
    faqs: [],
    relatedProductIds: ["180", "171"],
    stock: {
      inStock: true,
      quantity: 18,
    },
  },
  {
    id: "171",
    name: "Classic Crew Tee Cotton 163",
    slug: "classic-crew-tee-cotton-163",
    description:
      "Classic crew-neck tee with breathable cotton and clean silhouette for everyday layering.",
    details:
      "Mid-weight cotton jersey, straight hem, and reinforced neckline for shape retention.",
    pricing: {
      currency: "USD",
      current: 89,
      original: 110,
      discountPercent: 19,
    },
    thumbnail:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    thumbnailAlt: "Classic Crew Tee Cotton",
    images: [
      {
        id: "171-1",
        image_url:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
        alt_text: null,
        alt: "Classic Crew Tee front",
      },
    ],
    category: {
      id: "9",
      name: "T-Shirts",
      slug: "t-shirts",
    },
    variants: {
      colors: [
        { id: "black", label: "Black", colorCode: "#111111" },
        { id: "white", label: "White", colorCode: "#ffffff" },
      ],
      sizes: [
        { id: "Small", label: "Small", inStock: true },
        { id: "Medium", label: "Medium", inStock: true },
        { id: "Large", label: "Large", inStock: true },
      ],
    },
    rating: 4.2,
    reviewCount: 47,
    breadcrumb: ["Home", "Shop", "T-Shirts", "Classic Crew Tee Cotton 163"],
    faqs: [],
    relatedProductIds: ["168", "179"],
  },
  {
    id: "168",
    name: "Relaxed Cargo Pants Linen 160",
    slug: "relaxed-cargo-pants-linen-160",
    description:
      "Utility-inspired cargo pants in a breathable linen blend with tapered leg opening.",
    details:
      "Features side patch pockets, adjustable waist tabs, and ankle drawcords.",
    pricing: {
      currency: "USD",
      current: 134,
      original: null,
      discountPercent: null,
    },
    thumbnail:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80",
    thumbnailAlt: "Relaxed Cargo Pants Linen",
    images: [
      {
        id: "168-1",
        image_url:
          "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80",
        url: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80",
        alt_text: null,
        alt: "Relaxed Cargo Pants",
      },
    ],
    category: {
      id: "12",
      name: "Jeans",
      slug: "jeans",
    },
    variants: {
      colors: [{ id: "khaki", label: "Khaki", colorCode: "#8b7f67" }],
      sizes: [
        { id: "Medium", label: "Medium", inStock: true },
        { id: "Large", label: "Large", inStock: true },
      ],
    },
    rating: 4.1,
    reviewCount: 12,
    breadcrumb: ["Home", "Shop", "Jeans", "Relaxed Cargo Pants Linen 160"],
    faqs: [],
    relatedProductIds: ["180", "171"],
  },
  {
    id: "166",
    name: "Urban Zip Hoodie Knit 158",
    slug: "urban-zip-hoodie-knit-158",
    description:
      "Lightweight knit hoodie with front zip and soft brushed interior.",
    details:
      "Ribbed cuff and hem construction with a modern regular fit.",
    pricing: {
      currency: "USD",
      current: 121,
      original: 145,
      discountPercent: 17,
    },
    thumbnail:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
    thumbnailAlt: "Urban Zip Hoodie Knit",
    images: [
      {
        id: "166-1",
        image_url:
          "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
        url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
        alt_text: null,
        alt: "Urban Zip Hoodie",
      },
    ],
    category: {
      id: "13",
      name: "Hoodies",
      slug: "hoodies",
    },
    variants: {
      colors: [
        { id: "charcoal", label: "Charcoal", colorCode: "#2c2c2c" },
        { id: "stone", label: "Stone", colorCode: "#d0c8bc" },
      ],
      sizes: [
        { id: "Small", label: "Small", inStock: true },
        { id: "Medium", label: "Medium", inStock: false },
        { id: "Large", label: "Large", inStock: true },
      ],
    },
    rating: 4.0,
    reviewCount: 18,
    breadcrumb: ["Home", "Shop", "Hoodies", "Urban Zip Hoodie Knit 158"],
    faqs: [],
    relatedProductIds: ["171", "179"],
  },
  {
    id: "162",
    name: "Tailored Blazer Stretch 154",
    slug: "tailored-blazer-stretch-154",
    description:
      "Single-breasted stretch blazer with slim modern tailoring and structured shoulder.",
    details:
      "Breathable lining and two-button closure suited for smart office layering.",
    pricing: {
      currency: "USD",
      current: 238,
      original: 278,
      discountPercent: 14,
    },
    thumbnail:
      "https://images.unsplash.com/photo-1593032465171-8bd9f2ff1668?auto=format&fit=crop&w=900&q=80",
    thumbnailAlt: "Tailored Blazer Stretch",
    images: [
      {
        id: "162-1",
        image_url:
          "https://images.unsplash.com/photo-1593032465171-8bd9f2ff1668?auto=format&fit=crop&w=900&q=80",
        url: "https://images.unsplash.com/photo-1593032465171-8bd9f2ff1668?auto=format&fit=crop&w=900&q=80",
        alt_text: null,
        alt: "Tailored Blazer",
      },
    ],
    category: {
      id: "17",
      name: "Blazers",
      slug: "blazers",
    },
    variants: {
      colors: [{ id: "navy", label: "Navy", colorCode: "#1f2a44" }],
      sizes: [
        { id: "Medium", label: "Medium", inStock: true },
        { id: "Large", label: "Large", inStock: true },
      ],
    },
    rating: 4.7,
    reviewCount: 9,
    breadcrumb: ["Home", "Shop", "Blazers", "Tailored Blazer Stretch 154"],
    faqs: [],
    relatedProductIds: ["179", "180"],
  },
];

export const productDetailsById: Record<string, ProductDetail> = Object.fromEntries(
  products.map((product) => [product.id, product]),
);
