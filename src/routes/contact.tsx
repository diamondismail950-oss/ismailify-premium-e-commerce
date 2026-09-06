import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact ISMAILIFY" },
      {
        name: "description",
        content: "Questions about sizing, orders or a piece in the ISMAILIFY collection? Send us a message.",
      },
      { property: "og:title", content: "Contact ISMAILIFY" },
      { property: "og:description", content: "Reach the ISMAILIFY client care team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="shell grid gap-14 py-20 lg:grid-cols-[1fr_1.1fr]">
      <div className="min-w-0">
        <p className="text-eyebrow">Client care</p>
        <h1 className="mt-5 text-4xl md:text-5xl">Let's talk.</h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
          Sizing advice, order questions, styling help — send a note and a member of the ISMAILIFY team will
          reply.
        </p>

        <div className="mt-10 grid gap-5">
          {[
            { icon: Mail, label: "Email", value: "Add your brand email here" },
            { icon: MessageCircle, label: "Social", value: "Add your social handle here" },
            { icon: Clock, label: "Hours", value: "Add your support hours here" },
          ].map((c) => (
            <div key={c.label} className="flex items-start gap-4 border-b border-border pb-5">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-[image:var(--gradient-violet)]">
                <c.icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-eyebrow">{c.label}</p>
                <p className="mt-2 text-sm text-muted-foreground">{c.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
          toast.success("Message sent — we'll be in touch.");
        }}
        className="card-lux grid gap-5 p-7 md:p-10"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" id="name" />
          <Field label="Email" id="email" type="email" />
        </div>
        <Field label="Subject" id="subject" />
        <div className="grid gap-2">
          <label htmlFor="message" className="text-eyebrow">
            Message
          </label>
          <textarea
            id="message"
            required
            rows={6}
            className="rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
          />
        </div>
        <button type="submit" className="btn-violet mt-2">
          {sent ? "Message sent" : "Send message"}
        </button>
        <p className="text-xs text-muted-foreground">
          This form is a front-end demo — connect it to your inbox when you're ready to take live enquiries.
        </p>
      </form>
    </div>
  );
}

function Field({ label, id, type = "text" }: { label: string; id: string; type?: string }) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-eyebrow">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        className="rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
      />
    </div>
  );
}
