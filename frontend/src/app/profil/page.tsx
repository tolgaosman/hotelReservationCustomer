import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/layout/PageHero";
import {
  ProfileContent,
  ProfileSkeleton,
} from "@/components/profile/ProfileContent";
import { tr } from "@/lib/dictionary";
import { heroSlides } from "@/lib/hero-slides";

export const metadata: Metadata = {
  title: `${tr.profile.heading} — ${tr.brand.name}`,
};

export default function ProfilePage() {
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
