import { Star } from "lucide-react";
import { useDictionary } from "@/lib/DictionaryContext";
import type { Room, Review } from "@/lib/types";

function generateDummyReviews(room: Room): Review[] {
  if (room.reviews && room.reviews.length > 0) {
    return room.reviews;
  }

  return [
    {
      id: 1,
      reservation_id: 101,
      rating: 5,
      comment: `Oda ${room.number} gerçekten çok temiz ve düzenliydi. ${room.title} için verdiğimiz ücrete kesinlikle değdi. Şehir manzarası harikaydı, herkese tavsiye ederim.`,
      is_approved: true,
      created_at: "2023-10-12",
      reservation: {
        guest: {
          full_name: "Ahmet Y."
        }
      }
    },
    {
      id: 2,
      reservation_id: 102,
      rating: 4,
      comment: `Oda ${room.number} kısa konaklamamız için gayet yeterliydi. Yataklar çok rahattı, otel personeline ilgilerinden dolayı teşekkürler.`,
      is_approved: true,
      created_at: "2023-09-28",
      reservation: {
        guest: {
          full_name: "Ayşe K."
        }
      }
    },
  ];
}

export function RoomReviews({ room }: { room: Room }) {
  const tr = useDictionary();
  const reviews = generateDummyReviews(room);

  return (
    <div className="mx-auto max-w-[1200px] px-6 lg:px-10 py-16">
      <h2 className="font-serif text-2xl text-ink text-center lg:text-left mb-10">
        {tr.rooms.reviewsHeading}
      </h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {reviews.map((review) => {
          const author = review.reservation?.guest?.full_name || "Misafir";
          const date = review.created_at;
          const text = review.comment;
          
          return (
          <div
            key={review.id}
            className="rounded-xl border border-line bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-brand/10 text-brand font-medium">
                  {author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-ink">{author}</h4>
                  <p className="text-xs text-label">{date}</p>
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
            <p className="text-[13px] leading-relaxed text-ink/80">&ldquo;{text}&rdquo;</p>
          </div>
        )})}
      </div>
    </div>
  );
}
