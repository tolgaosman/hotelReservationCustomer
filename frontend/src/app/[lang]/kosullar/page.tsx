import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { getDictionary } from "@/lib/dictionary";
import { getSettings } from "@/lib/api";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const tr = await getDictionary(params.lang as any);
  return {
  title: `${tr.legal.kosullarTitle} — ${tr.brand.name}`,
};
}

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const tr = await getDictionary(resolvedParams.lang as any);
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
