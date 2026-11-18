"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

const QUICK_PICKS = [
  "Coconut Oil", "Turmeric", "Neem", "Sandalwood", "Aloe Vera",
  "Honey", "Rice Flour", "Hibiscus", "Amla", "Rose Water",
  "Ghee", "Jaggery", "Sesame Oil", "Fenugreek", "Tulsi",
  "Arrowroot", "Shea Butter", "Camphor", "Lavender", "Tea Tree",
];

export default function CreateStep2() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [custom, setCustom] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerLocation, setSellerLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [step1Data, setStep1Data] = useState<any>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("brand_step1");
    if (saved) setStep1Data(JSON.parse(saved));
  }, []);

  const togglePick = (ingredient: string) => {
    setSelected((prev) =>
      prev.includes(ingredient) ? prev.filter((i) => i !== ingredient) : [...prev, ingredient]
    );
  };

  const handleCreate = async () => {
    const allIngredients = [
      ...selected,
      ...custom.split(",").map((s) => s.trim()).filter(Boolean),
    ];
    if (allIngredients.length === 0) return;

    setLoading(true);
    try {
      const brand = await api.brand.create({
        productName: step1Data?.productName || undefined,
        price: step1Data?.price || 100,
        ingredients: allIngredients,
        sellerName: sellerName.trim() || undefined,
        sellerLocation: sellerLocation.trim() || undefined,
      });
      router.push(`/brand/view?id=${brand.id}`);
    } catch (err) {
      console.error("Failed to create brand:", err);
      setLoading(false);
    }
  };

  const inputStyle = {
    borderColor: "var(--gray-200)",
    color: "var(--gray-800)",
  };

  return (
    <div className="bg-hero min-h-[calc(100vh-64px)]">
      <div className="max-w-lg mx-auto px-6 py-10 sm:py-16">
        {/* Progress */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <Step num="1" done />
          <div className="w-10 h-0.5" style={{ background: "var(--primary)" }} />
          <Step num="2" active />
          <div className="w-10 h-0.5" style={{ background: "var(--gray-200)" }} />
          <Step num="3" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: "var(--primary)" }}>
          What&apos;s in your product?
        </h1>
        <p className="mb-6" style={{ color: "var(--gray-500)" }}>
          Tap ingredients below or type your own.
        </p>

        {/* Quick picks */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3" style={{ color: "var(--gray-700)" }}>
            Popular Ingredients <span style={{ color: "var(--gray-400)" }}>(tap to add)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {QUICK_PICKS.map((ingredient) => (
              <button
                key={ingredient}
                onClick={() => togglePick(ingredient)}
                className="px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all duration-200"
                style={{
                  background: selected.includes(ingredient) ? "var(--primary)" : "#fff",
                  color: selected.includes(ingredient) ? "#fff" : "var(--gray-700)",
                  borderColor: selected.includes(ingredient) ? "var(--primary)" : "var(--gray-200)",
                }}
              >
                {ingredient}{selected.includes(ingredient) ? " ✕" : ""}
              </button>
            ))}
          </div>
        </div>

        {/* Custom input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--gray-700)" }}>Or type your own</label>
          <textarea
            placeholder="e.g., cold-pressed sesame oil, kasturi manjal, rose water"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            rows={2}
            className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors resize-none"
            style={inputStyle}
            onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; }}
            onBlur={(e) => { e.target.style.borderColor = "var(--gray-200)"; }}
          />
        </div>

        {/* Selected display */}
        {selected.length > 0 && (
          <div className="mb-6 p-4 rounded-xl" style={{ background: "rgba(0,31,96,0.04)" }}>
            <p className="text-xs font-semibold mb-2" style={{ color: "var(--primary)" }}>
              Selected ({selected.length}):
            </p>
            <div className="flex flex-wrap gap-1.5">
              {selected.map((s) => (
                <span
                  key={s}
                  className="text-xs px-2.5 py-1 rounded-full cursor-pointer font-medium transition-colors"
                  style={{ background: "var(--primary)", color: "#fff" }}
                  onClick={() => togglePick(s)}
                >
                  {s} ✕
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Seller details */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--gray-700)" }}>
            Your Name <span style={{ color: "var(--gray-400)" }}>(for the brand story)</span>
          </label>
          <input
            type="text" placeholder="e.g., Lakshmi" value={sellerName}
            onChange={(e) => setSellerName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border text-base outline-none transition-colors"
            style={inputStyle}
            onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; }}
            onBlur={(e) => { e.target.style.borderColor = "var(--gray-200)"; }}
          />
        </div>
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--gray-700)" }}>Your Area / City</label>
          <input
            type="text" placeholder="e.g., Kukatpally, Hyderabad" value={sellerLocation}
            onChange={(e) => setSellerLocation(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border text-base outline-none transition-colors"
            style={inputStyle}
            onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; }}
            onBlur={(e) => { e.target.style.borderColor = "var(--gray-200)"; }}
          />
        </div>

        <button
          onClick={handleCreate}
          disabled={loading || (selected.length === 0 && !custom.trim())}
          className="btn-accent btn-lg w-full disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "Creating your brand..." : "Create My Brand Kit"}
        </button>

        <button onClick={() => router.back()} className="w-full mt-3 py-2 text-sm font-medium hover:underline" style={{ color: "var(--gray-500)" }}>
          Back
        </button>
      </div>
    </div>
  );
}

function Step({ num, active, done }: { num: string; active?: boolean; done?: boolean }) {
  return (
    <span
      className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
      style={{
        background: active ? "var(--primary)" : done ? "var(--success)" : "var(--gray-100)",
        color: active || done ? "#fff" : "var(--gray-400)",
      }}
    >
      {done ? "✓" : num}
    </span>
  );
}
