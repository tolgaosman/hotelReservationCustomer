import type { HotelSettings, Room } from "./types";

/**
 * Placeholder catalog until the Laravel API exposes public room content.
 * Types, capacities and rates match the seeded admin data
 * (hotelReservation/backend/database/factories/RoomFactory.php) so numbers
 * stay believable; photography is stock Unsplash (already allowlisted in
 * next.config.ts).
 */
export const rooms: Room[] = [
  {
    id: 1,
    number: "101",
    type: "Standart",
    capacity: 2,
    nightlyRate: 1450,
    amenities: ["Klima", "Wi-Fi", "Kasa"],
    status: "available",
    slug: "standart",
    title: "Standart Oda",
    description:
      "Kompakt ve konforlu, kısa konaklamalar için ideal. Şehir manzaralı, günlük ihtiyaçlarınızı karşılayan sade bir oda.",
    size: 24,
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2400",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2400",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2400",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2400",
    ],
  },
  {
    id: 2,
    number: "205",
    type: "Deluxe",
    capacity: 3,
    nightlyRate: 2200,
    amenities: ["Deniz Manzarası", "Balkon", "Klima", "Wi-Fi"],
    status: "available",
    slug: "deluxe",
    title: "Deluxe Oda",
    description:
      "Geniş balkonu ve deniz manzarasıyla öne çıkan, çiftler ve küçük aileler için tasarlanmış ferah bir oda.",
    size: 32,
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2400",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2400",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2400",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2400",
    ],
  },
  {
    id: 3,
    number: "310",
    type: "Aile Odası",
    capacity: 4,
    nightlyRate: 2800,
    amenities: ["Balkon", "Klima", "Mini Bar", "Wi-Fi", "Kasa"],
    status: "available",
    slug: "aile-odasi",
    title: "Aile Odası",
    description:
      "İki ayrı yatak alanı ile ailelere özel konfor. Geniş oturma köşesi ve depolama alanı içerir.",
    size: 42,
    images: [
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=2400",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=2400",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2400",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2400",
    ],
  },
  {
    id: 4,
    number: "412",
    type: "Suite",
    capacity: 4,
    nightlyRate: 3600,
    amenities: [
      "Deniz Manzarası",
      "Balkon",
      "Klima",
      "Mini Bar",
      "Jakuzi",
      "Wi-Fi",
    ],
    status: "available",
    slug: "suite",
    title: "Suite Oda",
    description:
      "Ayrı oturma alanı, jakuzi ve panoramik deniz manzarasıyla üst düzey bir konaklama deneyimi.",
    size: 58,
    images: [
      "https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?q=80&w=2400",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2400",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=2400",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2400",
    ],
  },
  {
    id: 5,
    number: "501",
    type: "King Suite",
    capacity: 5,
    nightlyRate: 5500,
    amenities: [
      "Deniz Manzarası",
      "Balkon",
      "Klima",
      "Mini Bar",
      "Jakuzi",
      "Wi-Fi",
      "Kasa",
    ],
    status: "available",
    slug: "king-suite",
    title: "King Suite",
    description:
      "Otelin en geniş odası. Özel jakuzili teras, geniş salon ve eksiksiz donanımla kusursuz bir tatil.",
    size: 78,
    images: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2400",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=2400",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2400",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2400",
    ],
  },
];

export const hotelSettings: HotelSettings = {
  name: "W-40 Hotel",
  email: "info@w40hotel.com",
  phone: "+90 542 000 00 00",
  taxRate: 18,
  checkInTime: "14:00",
  checkOutTime: "12:00",
  address: "Sahil Cadde No. 40, Girne, KKTC",
  location: "Girne, Kuzey Kıbrıs",
};

export const heroSlides = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2400",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2400",
  "https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?q=80&w=2400",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2400",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2400",
];

export function getRoomBySlug(slug: string): Room | undefined {
  return rooms.find((room) => room.slug === slug);
}
