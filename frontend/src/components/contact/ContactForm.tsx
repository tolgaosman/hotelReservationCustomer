"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { tr } from "@/lib/dictionary";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p className="border border-line p-8 text-sm leading-relaxed text-ink/80">
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
        <Label htmlFor="contact-name" className="text-[11px] tracking-[0.1em] text-label">
          {tr.contact.form.name}
        </Label>
        <Input
          id="contact-name"
          required
          className="h-11 rounded-none border-0 border-b border-line px-0 focus-visible:ring-0"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-email" className="text-[11px] tracking-[0.1em] text-label">
          {tr.contact.form.email}
        </Label>
        <Input
          id="contact-email"
          type="email"
          required
          className="h-11 rounded-none border-0 border-b border-line px-0 focus-visible:ring-0"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-message" className="text-[11px] tracking-[0.1em] text-label">
          {tr.contact.form.message}
        </Label>
        <textarea
          id="contact-message"
          required
          rows={5}
          className="resize-none border-0 border-b border-line bg-transparent px-0 py-2 text-sm text-ink outline-none focus-visible:border-ink"
        />
      </div>
      <Button
        type="submit"
        className="h-11 w-full rounded-none bg-brand text-[11px] tracking-[0.14em] text-white hover:bg-brand-hover sm:w-fit sm:px-10"
      >
        {tr.contact.form.submit}
      </Button>
    </form>
  );
}
