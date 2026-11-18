"use client";

import { useEffect, useState } from "react";
import { api, BrandProfile } from "@/lib/api";

type Step = "preview" | "checkout" | "done";

export default function BrandPage() {
  const [brandId, setBrandId] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("preview");
  const [brand, setBrand] = useState<BrandProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const s = params.get("step") as Step;
    if (id) setBrandId(id);
    if (s) setStep(s);
  }, []);

  useEffect(() => {
    if (!brandId) return;
    setLoading(true);
    const poll = async () => {
      for (let i = 0; i < 30; i++) {
        const data = await api.brand.get(brandId);
        setBrand(data);
        if (data.status === "ready" || data.status === "paid") { setLoading(false); return; }
        await new Promise((r) => setTimeout(r, 1000));
      }
      setLoading(false);
    };
    poll();
  }, [brandId]);

  const goTo = (s: Step) => {
    setStep(s);
    window.history.pushState({}, "", `/brand/view?id=${brandId}&step=${s}`);
  };

  if (!brandId) {
    return (
      <div className="max-w-lg mx-auto px-6 py-16 text-center">
        <p style={{ color: "var(--gray-600)" }} className="mb-4">No brand ID provided.</p>
        <a href="/brand/create" className="btn-primary">Create a new brand kit</a>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-hero min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="max-w-md mx-auto px-6 text-center">
          <div className="text-5xl mb-6 animate-pulse">&#10024;</div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--primary)" }}>Creating your brand...</h2>
          <p className="mb-8" style={{ color: "var(--gray-500)" }}>This takes about 5-10 seconds</p>
          <div className="w-full rounded-full h-2.5" style={{ background: "var(--gray-200)" }}>
            <div className="h-2.5 rounded-full animate-pulse" style={{ width: "60%", background: "var(--accent)" }} />
          </div>
        </div>
      </div>
    );
  }

  if (!brand) return <div className="max-w-lg mx-auto px-6 py-16 text-center" style={{ color: "var(--gray-600)" }}>Brand not found.</div>;

  if (step === "done") return <DoneView brand={brand} />;
  if (step === "checkout") return <CheckoutView brand={brand} brandId={brandId} onDone={() => goTo("done")} />;
  return <PreviewView brand={brand} onCheckout={() => goTo("checkout")} />;
}

// ── PREVIEW ──
function PreviewView({ brand, onCheckout }: { brand: BrandProfile; onCheckout: () => void }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 sm:py-14">
      <div className="flex items-center justify-center gap-3 mb-10">
        <StepDot done /> <Bar done /> <StepDot done /> <Bar done /> <StepDot num="3" active />
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: "var(--primary)" }}>Your Brand Kit</h1>
      <p className="mb-8" style={{ color: "var(--gray-500)" }}>Review and edit. Then download or launch your store.</p>

      {/* Brand Identity */}
      <Section title="Brand Identity">
        <div className="flex items-center gap-4 mb-3">
          {brand.logoPngUrl && <img src={brand.logoPngUrl} alt="Logo" className="w-14 h-14 rounded-xl" />}
          <div>
            <h3 className="text-2xl font-bold" style={{ color: "var(--primary)" }}>{brand.brandName}</h3>
            <p style={{ color: "var(--gray-500)" }}>{brand.tagline}</p>
          </div>
        </div>
        {brand.colorPalette && (
          <div className="flex gap-2 mt-3">
            {Object.entries(brand.colorPalette).map(([name, color]) => (
              <div key={name} className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-lg border" style={{ backgroundColor: color, borderColor: "var(--gray-200)" }} />
                <span className="text-[10px]" style={{ color: "var(--gray-400)" }}>{name}</span>
              </div>
            ))}
          </div>
        )}
      </Section>

      {brand.labelPngUrl && (
        <Section title="Product Label">
          <img src={brand.labelPngUrl} alt="Label" className="max-w-xs mx-auto rounded-xl shadow-md" />
        </Section>
      )}

      <Section title="Product Description">
        <h3 className="font-bold text-lg mb-2" style={{ color: "var(--primary)" }}>{brand.productTitle}</h3>
        <p className="text-sm mb-3" style={{ color: "var(--gray-600)" }}>{brand.shortDescription}</p>
        <p className="text-sm mb-4" style={{ color: "var(--gray-500)" }}>{brand.fullDescription}</p>
        {brand.bulletPoints.length > 0 && (
          <ul className="space-y-1.5 text-sm" style={{ color: "var(--gray-600)" }}>
            {brand.bulletPoints.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <span style={{ color: "var(--success)" }}>&#10003;</span> {b}
              </li>
            ))}
          </ul>
        )}
      </Section>

      {brand.originStory && (
        <Section title="Your Story">
          {brand.storyHeadline && <p className="text-lg font-bold italic mb-2" style={{ color: "var(--primary)" }}>&ldquo;{brand.storyHeadline}&rdquo;</p>}
          <p className="text-sm" style={{ color: "var(--gray-600)" }}>{brand.originStory}</p>
        </Section>
      )}

      {brand.whatsappFull && (
        <Section title="WhatsApp Message">
          <div className="rounded-xl p-4 text-sm whitespace-pre-line" style={{ background: "#F0FFF0", border: "1px solid #C6F6D5" }}>
            {brand.whatsappFull}
          </div>
        </Section>
      )}

      {brand.badges.length > 0 && (
        <Section title="Trust Badges">
          <div className="flex flex-wrap gap-2">
            {brand.badges.map((b) => (
              <span key={b} className="px-3.5 py-1.5 rounded-full text-sm font-medium" style={{ background: "rgba(0,31,96,0.06)", color: "var(--primary)" }}>
                {b.replace(/_/g, " ")}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* CTA */}
      <div className="card mt-8 text-center" style={{ border: "2px solid var(--accent)", background: "var(--gray-50)" }}>
        <h2 className="font-bold text-lg mb-4" style={{ color: "var(--primary)" }}>Download Your Brand Kit</h2>
        <button onClick={onCheckout} className="btn-accent btn-lg w-full">
          Pay &amp; Download — Starting at Rs.49
        </button>
        <p className="text-xs mt-3" style={{ color: "var(--gray-400)" }}>
          Preview is watermarked. Payment removes watermarks and unlocks downloads.
        </p>
      </div>
    </div>
  );
}

// ── CHECKOUT ──
function CheckoutView({ brand, brandId, onDone }: { brand: BrandProfile; brandId: string; onDone: () => void }) {
  const [tier, setTier] = useState<"basic" | "pro" | "studio">("pro");
  const [phone, setPhone] = useState("");
  const [wantsStore, setWantsStore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const prices = { basic: 49, pro: 149, studio: 299 };

  const handlePay = async () => {
    if (!phone.match(/^[6-9]\d{9}$/)) { setError("Enter a valid 10-digit mobile number"); return; }
    setLoading(true); setError("");
    try {
      const checkout = await api.brand.checkout(brandId, { tier, phone, wantsStore });
      const rp = new (window as any).Razorpay({
        key: checkout.razorpayKeyId, amount: checkout.amount, currency: "INR",
        name: "Padose Brand Engine", description: `${tier} Brand Kit`,
        order_id: checkout.razorpayOrderId, prefill: { contact: `+91${phone}` },
        handler: async (res: any) => {
          try {
            await api.brand.verifyPayment(brandId, {
              razorpayOrderId: res.razorpay_order_id,
              razorpayPaymentId: res.razorpay_payment_id,
              razorpaySignature: res.razorpay_signature,
            });
            onDone();
          } catch (e: any) { setError(e.message); setLoading(false); }
        },
        theme: { color: "#001F60" },
      });
      rp.on("payment.failed", () => { setError("Payment failed."); setLoading(false); });
      rp.open();
    } catch (e: any) { setError(e.message); setLoading(false); }
  };

  return (
    <div className="bg-hero min-h-[calc(100vh-64px)]">
      <div className="max-w-lg mx-auto px-6 py-10 sm:py-14">
        <script src="https://checkout.razorpay.com/v1/checkout.js" async />
        <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--primary)" }}>Get Your Brand Kit</h1>

        {/* Tiers */}
        <div className="mb-6 space-y-3">
          {(["basic", "pro", "studio"] as const).map((t) => (
            <label key={t} className="flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all"
              style={{ borderColor: tier === t ? "var(--primary)" : "var(--gray-200)", background: tier === t ? "rgba(0,31,96,0.03)" : "#fff" }}>
              <input type="radio" checked={tier === t} onChange={() => setTier(t)} className="accent-[#001F60]" />
              <span className="flex-1 font-semibold capitalize" style={{ color: "var(--primary)" }}>{t}</span>
              <span className="font-bold" style={{ color: "var(--primary)" }}>Rs.{prices[t]}</span>
            </label>
          ))}
        </div>

        {/* Store pref */}
        <div className="mb-6 space-y-2">
          {[
            { val: true, label: "Download Kit + Launch Store", sub: "Free online store with branding applied" },
            { val: false, label: "Download Kit Only", sub: "Use on WhatsApp, Instagram, or any platform" },
          ].map((opt) => (
            <label key={String(opt.val)} className="flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all"
              style={{ borderColor: wantsStore === opt.val ? "var(--primary)" : "var(--gray-200)", background: wantsStore === opt.val ? "rgba(0,31,96,0.03)" : "#fff" }}>
              <input type="radio" checked={wantsStore === opt.val} onChange={() => setWantsStore(opt.val)} className="mt-0.5 accent-[#001F60]" />
              <div>
                <span className="font-semibold" style={{ color: "var(--primary)" }}>{opt.label}</span>
                <p className="text-xs mt-0.5" style={{ color: "var(--gray-500)" }}>{opt.sub}</p>
              </div>
            </label>
          ))}
        </div>

        {/* Phone */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--gray-700)" }}>
            Mobile Number <span style={{ color: "var(--error)" }}>*</span>
          </label>
          <div className="flex">
            <span className="px-4 py-3 border border-r-0 rounded-l-xl font-medium" style={{ background: "var(--gray-50)", borderColor: "var(--gray-200)", color: "var(--gray-500)" }}>+91</span>
            <input type="tel" placeholder="98765 43210" value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
              className="flex-1 px-4 py-3 rounded-r-xl border outline-none text-base"
              style={{ borderColor: "var(--gray-200)", color: "var(--gray-800)" }}
              onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; }}
              onBlur={(e) => { e.target.style.borderColor = "var(--gray-200)"; }}
            />
          </div>
        </div>

        {error && <div className="mb-4 p-3 rounded-xl text-sm" style={{ background: "rgba(239,68,68,0.08)", color: "var(--error)", border: "1px solid rgba(239,68,68,0.2)" }}>{error}</div>}

        <button onClick={handlePay} disabled={loading} className="btn-primary btn-lg w-full disabled:opacity-40">
          {loading ? "Processing..." : `Pay Rs.${prices[tier]}`}
        </button>
      </div>
    </div>
  );
}

// ── DONE ──
function DoneView({ brand }: { brand: BrandProfile }) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10 sm:py-14">
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl text-white" style={{ background: "var(--success)" }}>&#10003;</div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: "var(--primary)" }}>Your brand is live!</h1>
        <p style={{ color: "var(--gray-500)" }}>Download your assets below.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {brand.labelPngUrl && <AssetCard title="Product Label" url={brand.labelPngUrl} />}
        {brand.logoPngUrl && <AssetCard title="Brand Logo" url={brand.logoPngUrl} />}
        {brand.instagramPostUrl && <AssetCard title="Instagram Post" url={brand.instagramPostUrl} />}
        {brand.businessCardFrontUrl && <AssetCard title="Business Card" url={brand.businessCardFrontUrl} />}
      </div>

      {brand.whatsappFull && (
        <div className="card mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--accent-dark)" }}>WhatsApp Message</h3>
          <div className="rounded-xl p-4 text-sm whitespace-pre-line mb-3" style={{ background: "#F0FFF0", border: "1px solid #C6F6D5" }}>
            {brand.whatsappFull}
          </div>
          <button onClick={() => navigator.clipboard.writeText(brand.whatsappFull || "")}
            className="btn-primary text-sm py-2 px-4" style={{ background: "#22C55E" }}>
            Copy Message
          </button>
        </div>
      )}

      <div className="card text-center" style={{ background: "var(--gray-50)", border: "2px solid var(--gray-200)" }}>
        <p className="font-semibold mb-3" style={{ color: "var(--primary)" }}>Create another brand kit?</p>
        <a href="/brand/create" className="btn-accent">Brand Another Product</a>
      </div>
    </div>
  );
}

// ── Shared ──
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card mb-6">
      <h2 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "var(--accent-dark)", letterSpacing: "0.5px" }}>{title}</h2>
      {children}
    </section>
  );
}

function AssetCard({ title, url }: { title: string; url: string }) {
  return (
    <div className="card p-0 overflow-hidden">
      <img src={url} alt={title} className="w-full aspect-square object-contain p-3" style={{ background: "var(--gray-50)" }} />
      <div className="p-3.5 flex items-center justify-between" style={{ borderTop: "1px solid var(--gray-100)" }}>
        <span className="text-sm font-medium" style={{ color: "var(--primary)" }}>{title}</span>
        <a href={url} target="_blank" rel="noreferrer" download className="btn-outline text-xs py-1 px-3">Save</a>
      </div>
    </div>
  );
}

function StepDot({ num, active, done }: { num?: string; active?: boolean; done?: boolean }) {
  return (
    <span className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
      style={{ background: active ? "var(--primary)" : done ? "var(--success)" : "var(--gray-100)", color: active || done ? "#fff" : "var(--gray-400)" }}>
      {done ? "✓" : num}
    </span>
  );
}
function Bar({ done }: { done?: boolean }) {
  return <div className="w-10 h-0.5" style={{ background: done ? "var(--success)" : "var(--gray-200)" }} />;
}
