import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { tr } from "@/lib/dictionary";
import { getSettings } from "@/lib/api";

export const metadata: Metadata = {
  title: `${tr.legal.kosullarTitle} — ${tr.brand.name}`,
};

export default async function TermsPage() {
  const settings = await getSettings();

  return (
    <LegalPage title={tr.legal.kosullarTitle}>
      <p>
        Bu web sitesi üzerinden yapılan rezervasyon talepleri, {settings.name}{" "}
        tarafından değerlendirildikten sonra e-posta veya telefon yoluyla
        onaylanır. Fiyatlar Türk Lirası (TRY) cinsindendir ve yürürlükteki
        vergileri içerir.
      </p>
      <p>
        Giriş saati {settings.checkInTime}, çıkış saati{" "}
        {settings.checkOutTime} olarak belirlenmiştir. Erken giriş veya
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
