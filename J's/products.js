/**
 * Remleys Arts — products.js
 *
 * HOW TO ADD A NEW TEE:
 * 1. Add the photo to images/products/
 * 2. Copy an entry below and fill in the details.
 *    Leave a field as null if you don't have it — it won't show.
 *
 * FIELDS:
 *   id         — unique number (just increment)
 *   name       — product title (required)
 *   category   — "custom" | "printed" | "commission"  (required)
 *   technique  — e.g. "Hand-painted", "Vinyl cut", "DTF print" (or null)
 *   design     — franchise/character, e.g. "Naruto" (or null)
 *   price      — number in KSH (or null → shows "Negotiable")
 *   image      — filename only, inside images/products/ (or null → placeholder)
 *   notes      — short note, e.g. "One of one" (or null)
 *   ctaLabel   — override button text (or null → "Order Now")
 */

const PRODUCTS = [
  {
    id: 1,
    name: "\u201cGo To Church\u201d Tee",
    category: "custom",
    technique: "Hand-painted",
    design: null,
    price: null,
    image: "shirt-gotochurch.jpg",
    notes: "One of one",
    ctaLabel: null
  },
  {
    id: 2,
    name: "Death the Kid Tee",
    category: "custom",
    technique: "Vinyl cut",
    design: "Soul Eater",
    price: 550,
    image: "shirt-deaththekid.jpg",
    notes: "Custom-made",
    ctaLabel: null
  },
  {
    id: 3,
    name: "Naruto Squad Tee",
    category: "printed",
    technique: "DTF print",
    design: "Naruto",
    price: 1350,
    image: "shirt-naruto.jpg",
    notes: null,
    ctaLabel: null
  },
  {
    id: 4,
    name: "Gear 5 Luffy Tee",
    category: "printed",
    technique: "DTF print",
    design: "One Piece",
    price: 1350,
    image: "shirt-gear5luffy.jpg",
    notes: null,
    ctaLabel: null
  },
  {
    id: 5,
    name: "Attack on Titan Tee",
    category: "printed",
    technique: "DTF print",
    design: "Attack on Titan",
    price: 1350,
    image: "shirt-attackontitan.jpg",
    notes: null,
    ctaLabel: null
  },
  {
    id: 6,
    name: "Commission Your Own Art",
    category: "commission",
    technique: "Your design, hand-painted",
    design: null,
    price: null,
    image: "shirt-customart-sample.jpg",
    notes: "Send a sketch or reference",
    ctaLabel: "Start a Commission"
  }
];
