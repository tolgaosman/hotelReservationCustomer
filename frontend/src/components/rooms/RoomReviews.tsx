import { Star } from "lucide-react";
import { tr } from "@/lib/dictionary";
import type { Room, Review } from "@/lib/types";

function generateDummyReviews(room: Room): Review[] {
  if (room.reviews && room.reviews.length > 0) {
    return room.reviews;
  }

  return [
    {
      id: "r1",
      author: "Ahmet Y.",
      date: "2023-10-12",
      rating: 5,
      text: `Oda ${room.number} gerçekten çok temiz ve düzenliydi. ${room.title} için verdiğimiz ücrete kesinlikle değdi. Şehir manzarası harikaydı, herkese tavsiye ederim.`,
    },
    {
      id: "r2",
      author: "Ayşe K.",
      date: "2023-09-28",
      rating: 4,
      text: `Oda ${room.number} kısa konaklamamız için gayet yeterliydi. Yataklar çok rahattı, otel personeline ilgilerinden dolayı teşekkürler.`,
    },
  ];
}

export function RoomReviews({ room }: { room: Room }) {
  const reviews = generateDummyReviews(room);

  return (
    <div className="mx-auto max-w-[1200px] px-6 lg:px-10 py-16">
      <h2 className="font-serif text-2xl text-ink text-center lg:text-left mb-10">
        {tr.rooms.reviewsHeading}
      </h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-xl border border-line bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-brand/10 text-brand font-medium">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-ink">{review.author}</h4>
                  <p className="text-xs text-label">{review.date}</p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-3.5 ${
                      i < review.rating
                        ? "fill-brand text-brand"
                        : "fill-line text-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-[13px] leading-relaxed text-ink/80">&ldquo;{review.text}&rdquo;</p>
          </div>
        ))}
      </div>
    </div>
  );
}
