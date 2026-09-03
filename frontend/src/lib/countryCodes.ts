/**
 * ISO 3166-1 alpha-2 + E.164 çağrı kodu listesi. Telefon alanının başındaki
 * ülke kodu dropdown'ı için kullanılır (bkz. PhoneNumberField). Türkiye ve
 * KKTC üstte sabitlenir; geri kalanı isme göre alfabetiktir.
 */
export interface CountryCode {
  name: string;
  iso2: string;
  dial: string;
}

export const countryCodes: CountryCode[] = [
  { name: "Türkiye", iso2: "TR", dial: "+90" },
  { name: "Afganistan", iso2: "AF", dial: "+93" },
  { name: "Almanya", iso2: "DE", dial: "+49" },
  { name: "Amerika Birleşik Devletleri", iso2: "US", dial: "+1" },
  { name: "Andorra", iso2: "AD", dial: "+376" },
  { name: "Angola", iso2: "AO", dial: "+244" },
  { name: "Arjantin", iso2: "AR", dial: "+54" },
  { name: "Arnavutluk", iso2: "AL", dial: "+355" },
  { name: "Avustralya", iso2: "AU", dial: "+61" },
  { name: "Avusturya", iso2: "AT", dial: "+43" },
  { name: "Azerbaycan", iso2: "AZ", dial: "+994" },
  { name: "Bahamalar", iso2: "BS", dial: "+1242" },
  { name: "Bahreyn", iso2: "BH", dial: "+973" },
  { name: "Bangladeş", iso2: "BD", dial: "+880" },
  { name: "Barbados", iso2: "BB", dial: "+1246" },
  { name: "Belarus", iso2: "BY", dial: "+375" },
  { name: "Belçika", iso2: "BE", dial: "+32" },
  { name: "Belize", iso2: "BZ", dial: "+501" },
  { name: "Benin", iso2: "BJ", dial: "+229" },
  { name: "Bhutan", iso2: "BT", dial: "+975" },
  { name: "Bolivya", iso2: "BO", dial: "+591" },
  { name: "Bosna Hersek", iso2: "BA", dial: "+387" },
  { name: "Botsvana", iso2: "BW", dial: "+267" },
  { name: "Brezilya", iso2: "BR", dial: "+55" },
  { name: "Brunei", iso2: "BN", dial: "+673" },
  { name: "Bulgaristan", iso2: "BG", dial: "+359" },
  { name: "Burkina Faso", iso2: "BF", dial: "+226" },
  { name: "Burundi", iso2: "BI", dial: "+257" },
  { name: "Butan", iso2: "BT", dial: "+975" },
  { name: "Cezayir", iso2: "DZ", dial: "+213" },
  { name: "Cibuti", iso2: "DJ", dial: "+253" },
  { name: "Çad", iso2: "TD", dial: "+235" },
  { name: "Çekya", iso2: "CZ", dial: "+420" },
  { name: "Çin", iso2: "CN", dial: "+86" },
  { name: "Danimarka", iso2: "DK", dial: "+45" },
  { name: "Dominik Cumhuriyeti", iso2: "DO", dial: "+1809" },
  { name: "Ekvador", iso2: "EC", dial: "+593" },
  { name: "Endonezya", iso2: "ID", dial: "+62" },
  { name: "Ermenistan", iso2: "AM", dial: "+374" },
  { name: "Estonya", iso2: "EE", dial: "+372" },
  { name: "Etiyopya", iso2: "ET", dial: "+251" },
  { name: "Fas", iso2: "MA", dial: "+212" },
  { name: "Fiji", iso2: "FJ", dial: "+679" },
  { name: "Fildişi Sahili", iso2: "CI", dial: "+225" },
  { name: "Filipinler", iso2: "PH", dial: "+63" },
  { name: "Filistin", iso2: "PS", dial: "+970" },
  { name: "Finlandiya", iso2: "FI", dial: "+358" },
  { name: "Fransa", iso2: "FR", dial: "+33" },
  { name: "Gabon", iso2: "GA", dial: "+241" },
  { name: "Gambiya", iso2: "GM", dial: "+220" },
  { name: "Gana", iso2: "GH", dial: "+233" },
  { name: "Gine", iso2: "GN", dial: "+224" },
  { name: "Gine-Bissau", iso2: "GW", dial: "+245" },
  { name: "Grenada", iso2: "GD", dial: "+1473" },
  { name: "Guatemala", iso2: "GT", dial: "+502" },
  { name: "Guyana", iso2: "GY", dial: "+592" },
  { name: "Güney Afrika", iso2: "ZA", dial: "+27" },
  { name: "Güney Kore", iso2: "KR", dial: "+82" },
  { name: "Güney Sudan", iso2: "SS", dial: "+211" },
  { name: "Gürcistan", iso2: "GE", dial: "+995" },
  { name: "Haiti", iso2: "HT", dial: "+509" },
  { name: "Hindistan", iso2: "IN", dial: "+91" },
  { name: "Hırvatistan", iso2: "HR", dial: "+385" },
  { name: "Hollanda", iso2: "NL", dial: "+31" },
  { name: "Honduras", iso2: "HN", dial: "+504" },
  { name: "Irak", iso2: "IQ", dial: "+964" },
  { name: "İran", iso2: "IR", dial: "+98" },
  { name: "İrlanda", iso2: "IE", dial: "+353" },
  { name: "İspanya", iso2: "ES", dial: "+34" },
  { name: "İsrail", iso2: "IL", dial: "+972" },
  { name: "İsveç", iso2: "SE", dial: "+46" },
  { name: "İsviçre", iso2: "CH", dial: "+41" },
  { name: "İtalya", iso2: "IT", dial: "+39" },
  { name: "İzlanda", iso2: "IS", dial: "+354" },
  { name: "Jamaika", iso2: "JM", dial: "+1876" },
  { name: "Japonya", iso2: "JP", dial: "+81" },
  { name: "Kamboçya", iso2: "KH", dial: "+855" },
  { name: "Kamerun", iso2: "CM", dial: "+237" },
  { name: "Kanada", iso2: "CA", dial: "+1" },
  { name: "Karadağ", iso2: "ME", dial: "+382" },
  { name: "Katar", iso2: "QA", dial: "+974" },
  { name: "Kazakistan", iso2: "KZ", dial: "+7" },
  { name: "Kenya", iso2: "KE", dial: "+254" },
  { name: "Kırgızistan", iso2: "KG", dial: "+996" },
  { name: "Kolombiya", iso2: "CO", dial: "+57" },
  { name: "Komorlar", iso2: "KM", dial: "+269" },
  { name: "Kongo", iso2: "CG", dial: "+242" },
  { name: "Kongo Demokratik Cumhuriyeti", iso2: "CD", dial: "+243" },
  { name: "Kosova", iso2: "XK", dial: "+383" },
  { name: "Kosta Rika", iso2: "CR", dial: "+506" },
  { name: "Kuveyt", iso2: "KW", dial: "+965" },
  { name: "Küba", iso2: "CU", dial: "+53" },
  { name: "Laos", iso2: "LA", dial: "+856" },
  { name: "Lesotho", iso2: "LS", dial: "+266" },
  { name: "Letonya", iso2: "LV", dial: "+371" },
  { name: "Liberya", iso2: "LR", dial: "+231" },
  { name: "Libya", iso2: "LY", dial: "+218" },
  { name: "Liechtenstein", iso2: "LI", dial: "+423" },
  { name: "Litvanya", iso2: "LT", dial: "+370" },
  { name: "Lübnan", iso2: "LB", dial: "+961" },
  { name: "Lüksemburg", iso2: "LU", dial: "+352" },
  { name: "Macaristan", iso2: "HU", dial: "+36" },
  { name: "Madagaskar", iso2: "MG", dial: "+261" },
  { name: "Makedonya", iso2: "MK", dial: "+389" },
  { name: "Malavi", iso2: "MW", dial: "+265" },
  { name: "Maldivler", iso2: "MV", dial: "+960" },
  { name: "Malezya", iso2: "MY", dial: "+60" },
  { name: "Mali", iso2: "ML", dial: "+223" },
  { name: "Malta", iso2: "MT", dial: "+356" },
  { name: "Mısır", iso2: "EG", dial: "+20" },
  { name: "Meksika", iso2: "MX", dial: "+52" },
  { name: "Moğolistan", iso2: "MN", dial: "+976" },
  { name: "Moldova", iso2: "MD", dial: "+373" },
  { name: "Monako", iso2: "MC", dial: "+377" },
  { name: "Mozambik", iso2: "MZ", dial: "+258" },
  { name: "Myanmar", iso2: "MM", dial: "+95" },
  { name: "Namibya", iso2: "NA", dial: "+264" },
  { name: "Nepal", iso2: "NP", dial: "+977" },
  { name: "Nijer", iso2: "NE", dial: "+227" },
  { name: "Nijerya", iso2: "NG", dial: "+234" },
  { name: "Nikaragua", iso2: "NI", dial: "+505" },
  { name: "Norveç", iso2: "NO", dial: "+47" },
  { name: "Özbekistan", iso2: "UZ", dial: "+998" },
  { name: "Pakistan", iso2: "PK", dial: "+92" },
  { name: "Panama", iso2: "PA", dial: "+507" },
  { name: "Papua Yeni Gine", iso2: "PG", dial: "+675" },
  { name: "Paraguay", iso2: "PY", dial: "+595" },
  { name: "Peru", iso2: "PE", dial: "+51" },
  { name: "Polonya", iso2: "PL", dial: "+48" },
  { name: "Portekiz", iso2: "PT", dial: "+351" },
  { name: "Ruanda", iso2: "RW", dial: "+250" },
  { name: "Romanya", iso2: "RO", dial: "+40" },
  { name: "Rusya", iso2: "RU", dial: "+7" },
  { name: "Samoa", iso2: "WS", dial: "+685" },
  { name: "San Marino", iso2: "SM", dial: "+378" },
  { name: "Senegal", iso2: "SN", dial: "+221" },
  { name: "Sırbistan", iso2: "RS", dial: "+381" },
  { name: "Sierra Leone", iso2: "SL", dial: "+232" },
  { name: "Singapur", iso2: "SG", dial: "+65" },
  { name: "Slovakya", iso2: "SK", dial: "+421" },
  { name: "Slovenya", iso2: "SI", dial: "+386" },
  { name: "Somali", iso2: "SO", dial: "+252" },
  { name: "Sri Lanka", iso2: "LK", dial: "+94" },
  { name: "Sudan", iso2: "SD", dial: "+249" },
  { name: "Surinam", iso2: "SR", dial: "+597" },
  { name: "Suriye", iso2: "SY", dial: "+963" },
  { name: "Suudi Arabistan", iso2: "SA", dial: "+966" },
  { name: "Şili", iso2: "CL", dial: "+56" },
  { name: "Tacikistan", iso2: "TJ", dial: "+992" },
  { name: "Tanzanya", iso2: "TZ", dial: "+255" },
  { name: "Tayland", iso2: "TH", dial: "+66" },
  { name: "Tayvan", iso2: "TW", dial: "+886" },
  { name: "Togo", iso2: "TG", dial: "+228" },
  { name: "Tonga", iso2: "TO", dial: "+676" },
  { name: "Trinidad ve Tobago", iso2: "TT", dial: "+1868" },
  { name: "Tunus", iso2: "TN", dial: "+216" },
  { name: "Türkmenistan", iso2: "TM", dial: "+993" },
  { name: "Uganda", iso2: "UG", dial: "+256" },
  { name: "Ukrayna", iso2: "UA", dial: "+380" },
  { name: "Umman", iso2: "OM", dial: "+968" },
  { name: "Uruguay", iso2: "UY", dial: "+598" },
  { name: "Ürdün", iso2: "JO", dial: "+962" },
  { name: "Vanuatu", iso2: "VU", dial: "+678" },
  { name: "Vatikan", iso2: "VA", dial: "+379" },
  { name: "Venezuela", iso2: "VE", dial: "+58" },
  { name: "Vietnam", iso2: "VN", dial: "+84" },
  { name: "Yemen", iso2: "YE", dial: "+967" },
  { name: "Yeni Zelanda", iso2: "NZ", dial: "+64" },
  { name: "Yunanistan", iso2: "GR", dial: "+30" },
  { name: "Zambiya", iso2: "ZM", dial: "+260" },
  { name: "Zimbabve", iso2: "ZW", dial: "+263" },
  { name: "Birleşik Arap Emirlikleri", iso2: "AE", dial: "+971" },
  { name: "Birleşik Krallık", iso2: "GB", dial: "+44" },
];

/**
 * Kayıtlı tek parça telefonu ("+90 5551112233") ülke kodu + numara olarak
 * ayırır — profil ekranı kayıtlı değeri dropdown'a yerleştirebilsin diye.
 * En uzun eşleşen kod seçilir (+1 ile +1876 karışmasın). Kod bulunamazsa
 * (ör. eski "05551112233" kayıtları) numara olduğu gibi bırakılır.
 */
export function splitPhoneNumber(
  phone: string | undefined,
  fallbackDial = "+90",
): { dial: string; number: string } {
  const trimmed = (phone ?? "").trim();
  if (!trimmed.startsWith("+")) return { dial: fallbackDial, number: trimmed };

  const compact = trimmed.replace(/\s+/g, "");
  const match = countryCodes
    .map((country) => country.dial)
    .sort((a, b) => b.length - a.length)
    .find((dial) => compact.startsWith(dial));

  return match
    ? { dial: match, number: compact.slice(match.length) }
    : { dial: fallbackDial, number: trimmed };
}

/** ISO2 kodundan bayrak emojisi üretir (bkz. Unicode Regional Indicator Symbols). */
export function flagEmoji(iso2: string): string {
  if (iso2.length !== 2) return "🏳️";
  const codePoints = [...iso2.toUpperCase()].map(
    (char) => 0x1f1e6 - 65 + char.charCodeAt(0),
  );
  return String.fromCodePoint(...codePoints);
}
