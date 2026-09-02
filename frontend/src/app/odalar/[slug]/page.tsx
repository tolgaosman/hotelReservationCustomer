import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoomDetailBand } from "@/components/rooms/RoomDetailBand";
import { RoomStage } from "@/components/rooms/stage/RoomStage";
import { StayProvider } from "@/components/rooms/stage/StayProvider";
import { tr } from "@/lib/dictionary";
import { getRoomBySlug, hotelSettings, rooms } from "@/lib/mock-data";

interface RoomPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({
  params,
}: RoomPageProps): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  return { title: room ? `${room.title} — ${tr.brand.name}` : tr.brand.name };
}

export default async function RoomDetailPage({ params }: RoomPageProps) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) notFound();

  return (
    <StayProvider room={room} taxRate={hotelSettings.taxRate}>
      <main>
        <RoomStage room={room} rooms={rooms} settings={hotelSettings} />
        <RoomDetailBand room={room} rooms={rooms} settings={hotelSettings} />
      </main>
    </StayProvider>
  );
}
