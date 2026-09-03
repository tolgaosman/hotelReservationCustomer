import Image from "next/image";
import { Logo } from "./Logo";

interface AuthSplitLayoutProps {
  children: React.ReactNode;
  heading: string;
  subheading: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  overlayText: string;
}

export function AuthSplitLayout({
  children,
  heading,
  subheading,
  imageSrc,
  imageAlt,
  overlayText,
}: AuthSplitLayoutProps) {
  return (
    <div className="flex min-h-[calc(100vh-var(--nav-h))] items-center justify-center bg-[#f7f7f9] p-4 sm:p-8">
      <div className="flex w-full max-w-[1200px] flex-col overflow-hidden rounded-[40px] bg-white shadow-xl shadow-black/5 md:flex-row min-h-[720px]">
        {/* Left Side: Form */}
        <div className="flex flex-1 flex-col justify-center px-8 py-12 sm:px-16 lg:px-24">
          <div className="mb-12">
            <Logo />
          </div>

          <h1 className="mb-2 text-center font-serif text-3xl text-ink">
            {heading}
          </h1>
          <p className="mb-8 text-center text-sm text-label">
            {subheading}
          </p>

          {children}
        </div>

        {/* Right Side: Image Cover */}
        <div className="hidden flex-1 p-4 md:flex">
          <div className="relative h-full w-full overflow-hidden rounded-[32px] rounded-tl-[100px] rounded-br-[100px]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            <div className="absolute inset-x-0 bottom-0 p-12">
              <h2 className="font-serif text-3xl leading-snug text-white">
                {overlayText}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
