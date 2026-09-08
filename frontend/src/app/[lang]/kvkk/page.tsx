import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { getDictionary } from "@/lib/dictionary";
import { getSettings } from "@/lib/api";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const tr = await getDictionary(params.lang as any);
  return {
  title: `${tr.legal.kvkkTitle} — ${tr.brand.name}`,
};
}

export default async function KvkkPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const tr = await getDictionary(resolvedParams.lang as any);
  const settings = await getSettings();

  return (
    <LegalPage title={tr.legal.kvkkTitle}>
      <p>
        {settings.name}, 6698 sayılı Kişisel Verilerin Korunması Kanunu
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
        Kanun kapsamındaki haklarınızı kullanmak için {settings.email}{" "}
        adresi üzerinden bizimle iletişime geçebilirsiniz.
      </p>
    </LegalPage>
  );
}
