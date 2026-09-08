import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/layout/PageHero";
import {
  ProfileContent,
  ProfileSkeleton,
} from "@/components/profile/ProfileContent";
import { getDictionary } from "@/lib/dictionary";
import { heroSlides } from "@/lib/hero-slides";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const tr = await getDictionary(params.lang as any);
  return {
  title: `${tr.profile.heading} — ${tr.brand.name}`,
};
}

export default async function ProfilePage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const tr = await getDictionary(resolvedParams.lang as any);
  return (
    <main>
      <PageHero
        title={tr.profile.heading}
        subtitle={tr.profile.subheading}
        image={heroSlides[1]}
      />

      <section className="mx-auto max-w-[1100px] px-6 py-16 lg:px-10 lg:py-20">
        <Suspense fallback={<ProfileSkeleton />}>
          <ProfileContent />
        </Suspense>
      </section>
    </main>
  );
}
