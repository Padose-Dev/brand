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
    if (saved) {
      setStep1Data(JSON.parse(saved));
    }
  }, []);

  const togglePick = (ingredient: string) => {
    setSelected((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleCreate = async () => {
    const allIngredients = [
      ...selected,
      ...custom
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
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

      // Navigate to brand preview page
      router.push(`/brand?id=${brand.id}`);
    } catch (err) {
      console.error("Failed to create brand:", err);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8 sm:py-12">
      {/* Progress */}
      <div className="flex items-center justify-center gap-2 mb-8 text-sm text-amber-700">
        <span className="w-8 h-8 rounded-full bg-amber-200 text-amber-600 flex items-center justify-center font-bold">
          1
        </span>
        <span className="w-12 h-0.5 bg-amber-600" />
        <span className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold">
          2
        </span>
        <span className="w-12 h-0.5 bg-amber-200" />
        <span className="w-8 h-8 rounded-full bg-amber-200 text-amber-600 flex items-center justify-center font-bold">
          3
        </span>
      </div>

      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-amber-950 mb-2">
        What&apos;s in your product?
      </h1>
      <p className="text-amber-800/70 mb-6">
        Tap ingredients below or type your own.
      </p>

      {/* Quick picks */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-amber-900 mb-3">
          Popular Ingredients <span className="text-amber-600/60">(tap to add)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {QUICK_PICKS.map((ingredient) => (
            <button
              key={ingredient}
              onClick={() => togglePick(ingredient)}
              className={`px-3 py-1.5 rounded-full text-sm border transition ${
                selected.includes(ingredient)
                  ? "bg-amber-600 text-white border-amber-600"
                  : "bg-white text-amber-800 border-amber-200 hover:border-amber-400"
              }`}
            >
              {ingredient}
              {selected.includes(ingredient) && " ✕"}
            </button>
          ))}
        </div>
      </div>

      {/* Custom input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-amber-900 mb-2">
          Or type your own
        </label>
        <textarea
          placeholder="e.g., cold-pressed sesame oil, kasturi manjal, rose water"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          rows={2}
          className="w-full px-4 py-3 rounded-xl border border-amber-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-amber-950 placeholder:text-amber-400 resize-none"
        />
      </div>

      {/* Selected display */}
      {selected.length > 0 && (
        <div className="mb-6 p-3 bg-amber-50 rounded-xl">
          <p className="text-xs font-medium text-amber-700 mb-2">
            Selected ({selected.length}):
          </p>
          <div className="flex flex-wrap gap-1.5">
            {selected.map((s) => (
              <span
                key={s}
                className="text-xs bg-amber-600 text-white px-2 py-1 rounded-full cursor-pointer hover:bg-amber-700"
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
        <label className="block text-sm font-medium text-amber-900 mb-2">
          Your Name <span className="text-amber-600/60">(for the brand story)</span>
        </label>
        <input
          type="text"
          placeholder="e.g., Lakshmi"
          value={sellerName}
          onChange={(e) => setSellerName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-amber-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-amber-950 placeholder:text-amber-400"
        />
      </div>
      <div className="mb-8">
        <label className="block text-sm font-medium text-amber-900 mb-2">
          Your Area / City
        </label>
        <input
          type="text"
          placeholder="e.g., Kukatpally, Hyderabad"
          value={sellerLocation}
          onChange={(e) => setSellerLocation(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-amber-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-amber-950 placeholder:text-amber-400"
        />
      </div>

      {/* Create button */}
      <button
        onClick={handleCreate}
        disabled={loading || (selected.length === 0 && !custom.trim())}
        className="w-full bg-amber-600 text-white py-4 rounded-2xl text-lg font-semibold hover:bg-amber-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="animate-spin">&#9696;</span>
            Creating your brand...
          </>
        ) : (
          "Create My Brand Kit"
        )}
      </button>

      <button
        onClick={() => router.back()}
        className="w-full mt-3 text-amber-700 py-2 text-sm hover:underline"
      >
        Back
      </button>
    </div>
  );
}
