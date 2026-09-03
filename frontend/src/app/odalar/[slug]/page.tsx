import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoomDetailBand } from "@/components/rooms/RoomDetailBand";
import { RoomStage } from "@/components/rooms/stage/RoomStage";
import { StayProvider } from "@/components/rooms/stage/StayProvider";
import { tr } from "@/lib/dictionary";
import { getRoom, getRooms, getSettings } from "@/lib/api";

interface RoomPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const rooms = await getRooms();
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({
  params,
}: RoomPageProps): Promise<Metadata> {
  const { slug } = await params;
  const room = await getRoom(slug);
  return { title: room ? `${room.title} — ${tr.brand.name}` : tr.brand.name };
}

export default async function RoomDetailPage({ params }: RoomPageProps) {
  const { slug } = await params;
  const [room, rooms, settings] = await Promise.all([
    getRoom(slug),
    getRooms(),
    getSettings(),
  ]);
  if (!room) notFound();

  return (
    <StayProvider room={room} taxRate={settings.taxRate}>
      <main>
        <RoomStage room={room} rooms={rooms} />
        <RoomDetailBand room={room} rooms={rooms} settings={settings} />
      </main>
    </StayProvider>
  );
}
