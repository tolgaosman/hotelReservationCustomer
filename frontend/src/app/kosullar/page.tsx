import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { tr } from "@/lib/dictionary";
import { hotelSettings } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: `${tr.legal.kosullarTitle} — ${tr.brand.name}`,
};

export default function TermsPage() {
  return (
    <LegalPage title={tr.legal.kosullarTitle}>
      <p>
        Bu web sitesi üzerinden yapılan rezervasyon talepleri, {hotelSettings.name}{" "}
        tarafından değerlendirildikten sonra e-posta veya telefon yoluyla
        onaylanır. Fiyatlar Türk Lirası (TRY) cinsindendir ve yürürlükteki
        vergileri içerir.
      </p>
      <p>
        Giriş saati {hotelSettings.checkInTime}, çıkış saati{" "}
        {hotelSettings.checkOutTime} olarak belirlenmiştir. Erken giriş veya
        geç çıkış talepleri uygunluğa bağlı olarak ek ücrete tabi olabilir.
      </p>
      <p>
        Rezervasyon iptalleri giriş tarihinden 48 saat öncesine kadar
        ücretsizdir; bu süre sonrasında yapılan iptallerde ilk gece bedeli
        tahsil edilir.
      </p>
    </LegalPage>
  );
}
