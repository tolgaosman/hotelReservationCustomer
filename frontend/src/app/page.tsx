import { Hero } from "@/components/home/Hero";
import { BookingWidget } from "@/components/home/BookingWidget";
import { AboutSection } from "@/components/home/AboutSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <BookingWidget />
      <AboutSection />
    </main>
  );
}
