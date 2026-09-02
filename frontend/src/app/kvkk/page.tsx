import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { tr } from "@/lib/dictionary";
import { hotelSettings } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: `${tr.legal.kvkkTitle} — ${tr.brand.name}`,
};

export default function KvkkPage() {
  return (
    <LegalPage title={tr.legal.kvkkTitle}>
      <p>
        {hotelSettings.name}, 6698 sayılı Kişisel Verilerin Korunması Kanunu
        kapsamında, rezervasyon ve iletişim formları aracılığıyla topladığı ad
        soyad, e-posta, telefon ve kimlik bilgilerini yalnızca konaklama
        hizmetinin sunulması, rezervasyon süreçlerinin yürütülmesi ve yasal
        yükümlülüklerin yerine getirilmesi amacıyla işler.
      </p>
      <p>
        Kişisel verileriniz, açık rızanız olmaksızın üçüncü taraflarla
        paylaşılmaz. Verileriniz, ilgili mevzuatta öngörülen süreler boyunca
        güvenli sunucularda saklanır ve süre sonunda imha edilir.
      </p>
      <p>
        Kanun kapsamındaki haklarınızı kullanmak için {hotelSettings.email}{" "}
        adresi üzerinden bizimle iletişime geçebilirsiniz.
      </p>
    </LegalPage>
  );
}
