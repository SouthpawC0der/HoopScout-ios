"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Send, Mail, MessageCircle, CheckCircle, Loader2 } from "lucide-react";

const reasons = [
  { icon: MessageCircle, title: "General Inquiry", desc: "Questions about HoopScout" },
  { icon: Mail, title: "Support", desc: "Help with the mobile app" },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        toast.error(data.error ?? "Something went wrong. Please try again.");
      } else {
        setSubmitted(true);
        toast.success("Message sent! We'll get back to you soon.");
      }
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-16 px-6 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(148, 163, 184, 0.08) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-6xl mx-auto">
          <Badge
            className="mb-6 px-4 py-1.5 text-sm font-medium border border-[#94A3B8]/30 text-[#94A3B8]"
            style={{ backgroundColor: "rgba(148, 163, 184, 0.10)" }}
          >
            Get In Touch
          </Badge>
          <h1 className="font-heading font-black text-white text-6xl sm:text-8xl leading-none mb-4">
            CONTACT<br />
            <span style={{ color: "#94A3B8" }}>US</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl">
            Have a question, feedback, or need help? We&apos;re here for you. Fill out the
            form and we&apos;ll get back to you ASAP.
          </p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_2fr] gap-12">
          {/* Left: contact info */}
          <div className="space-y-6">
            <h2 className="font-heading font-bold text-white text-3xl">
              How can we help?
            </h2>
            {reasons.map((r) => (
              <div
                key={r.title}
                className="flex gap-4 p-5 rounded-2xl border border-white/8 bg-surface-elevated"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(148, 163, 184, 0.12)" }}
                >
                  <r.icon className="w-5 h-5 text-[#94A3B8]" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{r.title}</div>
                  <div className="text-white/40 text-sm">{r.desc}</div>
                </div>
              </div>
            ))}
            <div className="p-5 rounded-2xl border border-white/8 bg-surface-elevated">
              <div className="text-white/40 text-xs mb-1 uppercase tracking-wider font-heading">
                Email
              </div>
              <a
                href="mailto:support@hoopscoutapp.com"
                className="text-white hover:text-[#94A3B8] transition-colors duration-200 text-sm cursor-pointer"
              >
                support@hoopscoutapp.com
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div
            className="rounded-2xl border border-white/8 p-8"
            style={{ backgroundColor: "var(--hs-surface)" }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: "rgba(148, 163, 184, 0.12)" }}
                >
                  <CheckCircle className="w-8 h-8 text-[#94A3B8]" aria-hidden="true" />
                </div>
                <h3 className="font-heading font-bold text-white text-3xl">
                  Message Sent!
                </h3>
                <p className="text-white/50 text-sm max-w-sm">
                  Thanks for reaching out. We&apos;ll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="mt-2 text-[#94A3B8] hover:text-white text-sm transition-colors duration-200 cursor-pointer underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white/70 text-sm">
                      Name <span className="text-[#94A3B8]">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#94A3B8]/50 focus:ring-[#94A3B8]/20 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white/70 text-sm">
                      Email <span className="text-[#94A3B8]">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#94A3B8]/50 focus:ring-[#94A3B8]/20 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-white/70 text-sm">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#94A3B8]/50 focus:ring-[#94A3B8]/20 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white/70 text-sm">
                    Message <span className="text-[#94A3B8]">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us how we can help..."
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#94A3B8]/50 focus:ring-[#94A3B8]/20 rounded-xl resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full font-bold py-6 rounded-xl hover:opacity-90 transition-opacity duration-200 cursor-pointer disabled:cursor-not-allowed text-[#0C1428]"
                  style={{ background: "linear-gradient(135deg, #E2E8F0, #94A3B8)" }}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
