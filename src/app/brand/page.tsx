"use client";

import { useEffect, useState } from "react";
import { api, BrandProfile } from "@/lib/api";

/**
 * Single-page brand viewer/checkout flow.
 * URL: /brand?id=<brandId>&step=preview|checkout|done
 *
 * This avoids dynamic [brandId] routes so the app works as a static export
 * on GitHub Pages. The brandId is passed as a query parameter.
 */

type Step = "preview" | "checkout" | "done";

export default function BrandPage() {
  const [brandId, setBrandId] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("preview");
  const [brand, setBrand] = useState<BrandProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Read brandId from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const s = params.get("step") as Step;
    if (id) setBrandId(id);
    if (s) setStep(s);
  }, []);

  // Load brand data
  useEffect(() => {
    if (!brandId) return;
    setLoading(true);

    // Poll until ready
    const poll = async () => {
      for (let i = 0; i < 30; i++) {
        const data = await api.brand.get(brandId);
        setBrand(data);
        if (data.status === "ready" || data.status === "paid") {
          setLoading(false);
          return;
        }
        await new Promise((r) => setTimeout(r, 1000));
      }
      setLoading(false);
    };
    poll();
  }, [brandId]);

  const goTo = (s: Step) => {
    setStep(s);
    window.history.pushState({}, "", `/brand?id=${brandId}&step=${s}`);
  };

  if (!brandId) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <p className="text-amber-800 mb-4">No brand ID provided.</p>
        <a href="/create" className="text-amber-600 hover:underline">
          Create a new brand kit
        </a>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="text-4xl mb-4 animate-pulse">&#10024;</div>
        <h2 className="font-serif text-2xl font-bold text-amber-950 mb-2">
          Creating your brand...
        </h2>
        <div className="w-full bg-amber-100 rounded-full h-3 mt-6">
          <div className="bg-amber-600 h-3 rounded-full animate-pulse" style={{ width: "60%" }} />
        </div>
        <p className="text-sm text-amber-600/60 mt-4">This takes about 5-10 seconds</p>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <p className="text-amber-800">Brand not found.</p>
      </div>
    );
  }

  if (step === "done") return <DoneView brand={brand} />;
  if (step === "checkout") return <CheckoutView brand={brand} brandId={brandId} onDone={() => goTo("done")} />;
  return <PreviewView brand={brand} onCheckout={() => goTo("checkout")} />;
}

// ── PREVIEW VIEW ──
function PreviewView({ brand, onCheckout }: { brand: BrandProfile; onCheckout: () => void }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-amber-950 mb-1">
        Your Brand Kit
      </h1>
      <p className="text-amber-800/70 mb-8">Review your brand. Then download or launch your store.</p>

      {/* Brand Identity */}
      <Section title="Brand Identity">
        <h3 className="text-2xl font-bold text-amber-950">{brand.brandName}</h3>
        <p className="text-amber-700/70">{brand.tagline}</p>
        {brand.colorPalette && (
          <div className="flex gap-2 mt-3">
            {Object.entries(brand.colorPalette).map(([name, color]) => (
              <div key={name} className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-lg border border-amber-200" style={{ backgroundColor: color }} />
                <span className="text-[10px] text-amber-600/60">{name}</span>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* Label */}
      {brand.labelPngUrl && (
        <Section title="Product Label">
          <img src={brand.labelPngUrl} alt="Label" className="max-w-xs mx-auto rounded-xl shadow-md" />
        </Section>
      )}

      {/* Description */}
      <Section title="Product Description">
        <h3 className="font-bold text-lg text-amber-950 mb-2">{brand.productTitle}</h3>
        <p className="text-amber-800/80 text-sm mb-3">{brand.shortDescription}</p>
        <p className="text-amber-800/70 text-sm mb-4">{brand.fullDescription}</p>
        {brand.bulletPoints.length > 0 && (
          <ul className="space-y-1 text-sm text-amber-800/80">
            {brand.bulletPoints.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-amber-600">&#10003;</span> {b}
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* Story */}
      {brand.originStory && (
        <Section title="Your Story">
          {brand.storyHeadline && (
            <p className="font-serif text-lg font-bold text-amber-950 mb-2 italic">
              &ldquo;{brand.storyHeadline}&rdquo;
            </p>
          )}
          <p className="text-amber-800/80 text-sm">{brand.originStory}</p>
        </Section>
      )}

      {/* WhatsApp */}
      {brand.whatsappFull && (
        <Section title="WhatsApp Message">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm whitespace-pre-line">
            {brand.whatsappFull}
          </div>
        </Section>
      )}

      {/* Badges */}
      {brand.badges.length > 0 && (
        <Section title="Trust Badges">
          <div className="flex flex-wrap gap-2">
            {brand.badges.map((b) => (
              <span key={b} className="px-3 py-1.5 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                {b.replace(/_/g, " ")}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* CTA */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 mt-8">
        <h2 className="font-bold text-lg text-amber-950 mb-4 text-center">Download Your Brand Kit</h2>
        <button
          onClick={onCheckout}
          className="w-full bg-amber-600 text-white py-4 rounded-2xl text-lg font-semibold hover:bg-amber-700 transition"
        >
          Pay &amp; Download — Starting at Rs.49
        </button>
        <p className="text-center text-xs text-amber-700/60 mt-2">
          Preview is watermarked. Payment removes watermarks and unlocks downloads.
        </p>
      </div>
    </div>
  );
}

// ── CHECKOUT VIEW ──
function CheckoutView({ brand, brandId, onDone }: { brand: BrandProfile; brandId: string; onDone: () => void }) {
  const [tier, setTier] = useState<"basic" | "pro" | "studio">("pro");
  const [phone, setPhone] = useState("");
  const [wantsStore, setWantsStore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const prices = { basic: 49, pro: 149, studio: 299 };

  const handlePay = async () => {
    if (!phone.match(/^[6-9]\d{9}$/)) { setError("Enter a valid 10-digit mobile number"); return; }
    setLoading(true);
    setError("");
    try {
      const checkout = await api.brand.checkout(brandId, { tier, phone, wantsStore });
      const options = {
        key: checkout.razorpayKeyId, amount: checkout.amount, currency: "INR",
        name: "Padose Brand Engine", description: `${tier} Brand Kit`,
        order_id: checkout.razorpayOrderId,
        prefill: { contact: `+91${phone}` },
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
        theme: { color: "#D97706" },
      };
      const rp = new (window as any).Razorpay(options);
      rp.on("payment.failed", () => { setError("Payment failed."); setLoading(false); });
      rp.open();
    } catch (e: any) { setError(e.message); setLoading(false); }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8 sm:py-12">
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />
      <h1 className="font-serif text-2xl font-bold text-amber-950 mb-6">Get Your Brand Kit</h1>

      {/* Tiers */}
      <div className="mb-6 space-y-3">
        {(["basic", "pro", "studio"] as const).map((t) => (
          <label key={t} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer ${tier === t ? "border-amber-600 bg-amber-50" : "border-amber-200/50 bg-white"}`}>
            <input type="radio" checked={tier === t} onChange={() => setTier(t)} className="accent-amber-600" />
            <span className="flex-1 font-semibold text-amber-950 capitalize">{t}</span>
            <span className="font-bold text-amber-950">Rs.{prices[t]}</span>
          </label>
        ))}
      </div>

      {/* Store pref */}
      <div className="mb-6 space-y-2">
        <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer ${wantsStore ? "border-amber-600 bg-amber-50" : "border-amber-200/50"}`}>
          <input type="radio" checked={wantsStore} onChange={() => setWantsStore(true)} className="accent-amber-600" />
          <div><span className="font-semibold text-amber-950">Download Kit + Launch Store</span><p className="text-xs text-amber-700/70">Free online store with branding applied</p></div>
        </label>
        <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer ${!wantsStore ? "border-amber-600 bg-amber-50" : "border-amber-200/50"}`}>
          <input type="radio" checked={!wantsStore} onChange={() => setWantsStore(false)} className="accent-amber-600" />
          <div><span className="font-semibold text-amber-950">Download Kit Only</span></div>
        </label>
      </div>

      {/* Phone */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-amber-900 mb-2">Mobile Number *</label>
        <div className="flex">
          <span className="px-4 py-3 bg-amber-100 border border-r-0 border-amber-200 rounded-l-xl text-amber-700">+91</span>
          <input type="tel" placeholder="98765 43210" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            className="flex-1 px-4 py-3 rounded-r-xl border border-amber-200 focus:border-amber-500 outline-none text-amber-950" />
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>}

      <button onClick={handlePay} disabled={loading}
        className="w-full bg-amber-600 text-white py-4 rounded-2xl text-lg font-semibold hover:bg-amber-700 transition disabled:opacity-50">
        {loading ? "Processing..." : `Pay Rs.${prices[tier]}`}
      </button>
    </div>
  );
}

// ── DONE VIEW ──
function DoneView({ brand }: { brand: BrandProfile }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">&#10004;&#65039;</div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-amber-950 mb-2">Your brand is live!</h1>
        <p className="text-amber-800/70">Download your assets below.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {brand.labelPngUrl && <AssetCard title="Product Label" url={brand.labelPngUrl} />}
        {brand.logoPngUrl && <AssetCard title="Brand Logo" url={brand.logoPngUrl} />}
        {brand.instagramPostUrl && <AssetCard title="Instagram Post" url={brand.instagramPostUrl} />}
        {brand.businessCardFrontUrl && <AssetCard title="Business Card" url={brand.businessCardFrontUrl} />}
      </div>

      {brand.whatsappFull && (
        <div className="bg-white rounded-2xl border border-amber-200/50 p-6 mb-6">
          <h3 className="text-xs font-bold text-amber-600 uppercase mb-3">WhatsApp Message</h3>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm whitespace-pre-line mb-3">
            {brand.whatsappFull}
          </div>
          <button onClick={() => navigator.clipboard.writeText(brand.whatsappFull || "")}
            className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm hover:bg-green-700">
            Copy Message
          </button>
        </div>
      )}

      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 text-center">
        <p className="font-medium text-amber-950 mb-2">Create another brand kit?</p>
        <a href="/create" className="inline-block bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-700">
          Brand Another Product
        </a>
      </div>
    </div>
  );
}

// ── Shared Components ──
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-2xl border border-amber-200/50 p-6 mb-6">
      <h2 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-4">{title}</h2>
      {children}
    </section>
  );
}

function AssetCard({ title, url }: { title: string; url: string }) {
  return (
    <div className="bg-white rounded-xl border border-amber-200/50 overflow-hidden">
      <img src={url} alt={title} className="w-full aspect-square object-contain bg-amber-50 p-2" />
      <div className="p-3 flex items-center justify-between">
        <span className="text-sm font-medium text-amber-950">{title}</span>
        <a href={url} target="_blank" rel="noreferrer" download
          className="text-xs px-3 py-1 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200">
          Save
        </a>
      </div>
    </div>
  );
}
