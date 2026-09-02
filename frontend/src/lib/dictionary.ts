/**
 * Single source of truth for every user-facing string, in Turkish.
 * Components import `tr` directly. A future EN/RU dictionary just needs to
 * satisfy `Dictionary` — no component changes required.
 */
export const tr = {
  brand: {
    name: "W-40.COM",
    tagline: "APARTMENTS",
  },
  nav: {
    lang: "TR",
    onlineBooking: "ONLİNE REZERVASYON",
    rooms: "ODALAR",
    gallery: "GALERİ",
    contact: "İLETİŞİM",
    info: "BİLGİ",
    bookNow: "REZERVE ET",
  },
  hero: {
    titleTop: "Ege'de Yaşam.",
    titleScript: "Yeniden Tanımlandı.",
    explore: "KEŞFET",
    tagline: "KIBRIS'IN KALBİNDE LÜKS KONAKLAMA",
  },
  booking: {
    heading: "Uygunluk Sorgula",
    arrival: "Giriş",
    departure: "Çıkış",
    guests: "Misafir",
    units: "Oda",
    submit: "Uygunluk Sorgula",
    pickDate: "Tarih seçin",
    guestCount: (n: number) => `${n} Misafir`,
    unitCount: (n: number) => `${n} Oda`,
  },
  about: {
    script: "Hakkımızda",
    heading: "W-40 Hakkında",
    body: "Kıbrıs'ın kuzey kıyısında, denize sıfır konumuyla W-40, modern konforu sıcak bir misafirperverlikle buluşturuyor. Her biri özenle tasarlanmış odalarımızda, unutulmaz bir tatilin tüm ayrıntılarını düşündük.",
    cta: "Daha Fazla Bilgi",
  },
  rooms: {
    heading: "Odalarımız",
    subheading: "Her ihtiyaca uygun, özenle tasarlanmış konaklama seçenekleri",
    capacity: (n: number) => `${n} Kişi`,
    size: (m: number) => `${m} m²`,
    perNight: "/ gece",
    viewDetails: "Detayları Gör",
    bookRoom: "Bu Odayı Rezerve Et",
    amenitiesHeading: "Oda Özellikleri",
    filterAll: "Tümü",
    noResults: "Bu kriterlere uygun oda bulunamadı.",
    priceSummaryHeading: "Fiyat Özeti",
    roomRate: "Oda Ücreti",
    taxLabel: (rate: number) => `Vergi (%${rate})`,
    total: "Toplam / gece",
    prevImage: "Önceki fotoğraf",
    nextImage: "Sonraki fotoğraf",
  },
  roomStage: {
    stageAria: (title: string) => `${title} — görsel tanıtım`,
    imageCounter: (i: number, total: number) => `Fotoğraf ${i} / ${total}`,
    roomNumber: (n: string) => `Oda ${n}`,
    statPill: (capacity: number, size: number) => `${capacity} Kişi • ${size} m²`,

    storyLabel: "ODANIN HİKÂYESİ",
    amenitiesRailAria: "Oda özellikleri",
    scrollHint: "AŞAĞI KAYDIRIN",

    tripPlanHeading: "KONAKLAMA PLANI",
    pickDatesHint: "Tarih seçin, toplam hesaplansın",
    nightsLine: (n: number) => `${n} gece`,
    dateRange: (from: string, to: string) => `${from} — ${to}`,
    taxIncluded: "Vergiler dahil",
    taxBreakdownAria: (roomPct: number, taxPct: number) =>
      `Toplamın %${roomPct}'i oda ücreti, %${taxPct}'i vergi`,

    stayCardHeading: "KONAKLAMA DETAYI",
    checkInOut: (inTime: string, outTime: string) =>
      `Giriş ${inTime} • Çıkış ${outTime}`,
    guestsLabel: "Misafir",
    areaLabel: "Alan",
    noSmokingBadge: "SİGARA YASAK",
    noPetsBadge: "EVCİL HAYVAN YOK",

    priceCompareHeading: "FİYAT KARŞILAŞTIRMA",
    compareChartAria: "Odaların gecelik fiyat karşılaştırması",
    compareBarAria: (title: string, price: string) => `${title} — ${price} / gece`,
    belowAverage: (pct: number) => `Ortalamanın %${pct} altında`,
    aboveAverage: (pct: number) => `Ortalamanın %${pct} üstünde`,
    atAverage: "Ortalama fiyat seviyesinde",
    lowestPrice: "EN UYGUN",

    detailsHeading: "Oda Detayları",
    policiesHeading: "Konaklama Kuralları",
    otherRooms: "Diğer Odalar",
  },
  reservation: {
    heading: "Online Rezervasyon",
    steps: {
      search: "Uygunluk",
      select: "Oda Seçimi",
      details: "Misafir Bilgileri",
      confirm: "Onay",
    },
    searchCta: "Uygun Odaları Göster",
    selectRoom: "Seç",
    selected: "Seçildi",
    back: "Geri",
    continue: "Devam Et",
    guestDetails: {
      fullName: "Ad Soyad",
      email: "E-posta",
      phone: "Telefon",
      identityNumber: "TC Kimlik / Pasaport No",
      country: "Ülke",
      note: "Özel İstekleriniz (opsiyonel)",
    },
    summary: {
      heading: "Rezervasyon Özeti",
      room: "Oda",
      dates: "Tarihler",
      nights: "Gece",
      guests: "Misafir",
      total: "Toplam Tutar",
      confirmCta: "Rezervasyonu Tamamla",
    },
    confirmed: {
      heading: "Rezervasyonunuz Alındı",
      body: "Rezervasyon talebiniz iletildi. Ekibimiz en kısa sürede sizinle iletişime geçecek.",
      backHome: "Ana Sayfaya Dön",
    },
  },
  gallery: {
    heading: "Galeri",
    subheading: "W-40'tan kareler",
  },
  info: {
    heading: "Bilgi",
    checkIn: "Giriş Saati",
    checkOut: "Çıkış Saati",
    facilities: "Olanaklar",
    policies: "Politikalar",
    policiesList: [
      "Evcil hayvan kabul edilmemektedir.",
      "Odalarda sigara içilmesi yasaktır.",
      "Erken giriş ve geç çıkış talebe bağlı olarak sağlanabilir.",
      "Rezervasyon iptali giriş tarihinden 48 saat öncesine kadar ücretsizdir.",
    ],
  },
  contact: {
    heading: "İletişim",
    subheading: "Sorularınız için bize ulaşın",
    form: {
      name: "Ad Soyad",
      email: "E-posta",
      message: "Mesajınız",
      submit: "Gönder",
    },
    address: "Adres",
    phone: "Telefon",
    email: "E-posta",
  },
  legal: {
    kvkkTitle: "Kişisel Verilerin Korunması",
    kosullarTitle: "Kullanım Koşulları",
  },
  footer: {
    rights: (year: number) => `© ${year} W-40 Hotel. Tüm hakları saklıdır.`,
    quickLinks: "Hızlı Bağlantılar",
    contact: "İletişim",
  },
  slider: {
    prefix: "",
  },
} as const;

export type Dictionary = typeof tr;
