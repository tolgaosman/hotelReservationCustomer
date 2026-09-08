"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/lib/DictionaryContext";

export function ContactForm() {
  const tr = useDictionary();
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p className="flex flex-1 items-center rounded-xl border border-line/40 bg-canvas p-8 text-sm leading-relaxed text-ink/80">
        {tr.reservation.confirmed.body}
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="grid gap-6"
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-name" className="text-[11px] font-semibold tracking-[0.14em] text-label uppercase">
          {tr.contact.form.name}
        </Label>
        <Input
          id="contact-name"
          required
          className="h-12 rounded-xl border-line/50 bg-canvas/30 px-4 focus-visible:border-brand focus-visible:ring-brand/20"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-email" className="text-[11px] font-semibold tracking-[0.14em] text-label uppercase">
          {tr.contact.form.email}
        </Label>
        <Input
          id="contact-email"
          type="email"
          required
          className="h-12 rounded-xl border-line/50 bg-canvas/30 px-4 focus-visible:border-brand focus-visible:ring-brand/20"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-message" className="text-[11px] font-semibold tracking-[0.14em] text-label uppercase">
          {tr.contact.form.message}
        </Label>
        <textarea
          id="contact-message"
          required
          rows={5}
          className="resize-none rounded-xl border border-line/50 bg-canvas/30 px-4 py-3 text-sm text-ink outline-none transition-colors focus-visible:border-brand"
        />
      </div>
      <Button
        type="submit"
        className="h-12 w-full rounded-xl bg-brand text-[11px] tracking-[0.14em] text-white hover:bg-brand-hover sm:w-fit sm:px-10"
      >
        {tr.contact.form.submit}
      </Button>
    </form>
  );
}
