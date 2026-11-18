"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateStep1() {
  const router = useRouter();
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [previews, setPreviews] = useState<string[]>([]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 5);
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const handleNext = () => {
    if (!price || isNaN(Number(price))) return;
    sessionStorage.setItem(
      "brand_step1",
      JSON.stringify({ productName: productName.trim() || null, price: Number(price), photoCount: previews.length })
    );
    router.push("/brand/create/ingredients");
  };

  return (
    <div className="bg-hero min-h-[calc(100vh-64px)]">
      <div className="max-w-lg mx-auto px-6 py-10 sm:py-16">
        {/* Progress */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <Step num="1" active />
          <div className="w-10 h-0.5" style={{ background: "var(--gray-200)" }} />
          <Step num="2" />
          <div className="w-10 h-0.5" style={{ background: "var(--gray-200)" }} />
          <Step num="3" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: "var(--primary)" }}>
          Upload Your Product
        </h1>
        <p className="mb-8" style={{ color: "var(--gray-500)" }}>
          Add photos of your product and tell us the price.
        </p>

        {/* Photo upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--gray-700)" }}>
            Product Photos
          </label>
          <label
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
            style={{ borderColor: "var(--gray-300)", background: "#fff" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--gray-300)"; }}
          >
            {previews.length > 0 ? (
              <div className="flex gap-2 p-4 overflow-x-auto">
                {previews.map((src, i) => (
                  <img key={i} src={src} alt={`Product ${i + 1}`} className="w-24 h-24 object-cover rounded-xl" />
                ))}
              </div>
            ) : (
              <div className="text-center">
                <div className="text-4xl mb-2">📷</div>
                <p className="text-sm" style={{ color: "var(--gray-500)" }}>Tap to add product photos</p>
                <p className="text-xs mt-1" style={{ color: "var(--gray-400)" }}>Up to 5 photos</p>
              </div>
            )}
            <input type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoChange} />
          </label>
        </div>

        {/* Product name */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--gray-700)" }}>
            Product Name <span style={{ color: "var(--gray-400)" }}>(optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g., Haldi Soap, Amma's Mango Pickle"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border text-base outline-none transition-colors"
            style={{ borderColor: "var(--gray-200)", color: "var(--gray-800)" }}
            onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(0,31,96,0.08)"; }}
            onBlur={(e) => { e.target.style.borderColor = "var(--gray-200)"; e.target.style.boxShadow = "none"; }}
          />
          <p className="text-xs mt-1.5" style={{ color: "var(--gray-400)" }}>
            Don&apos;t have a name? We&apos;ll suggest one for you.
          </p>
        </div>

        {/* Price */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--gray-700)" }}>
            Price (Rs.) <span style={{ color: "var(--error)" }}>*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3 font-medium" style={{ color: "var(--gray-500)" }}>Rs.</span>
            <input
              type="number"
              placeholder="80"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border text-base outline-none transition-colors"
              style={{ borderColor: "var(--gray-200)", color: "var(--gray-800)" }}
              onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(0,31,96,0.08)"; }}
              onBlur={(e) => { e.target.style.borderColor = "var(--gray-200)"; e.target.style.boxShadow = "none"; }}
              min="1"
            />
          </div>
        </div>

        <button onClick={handleNext} disabled={!price} className="btn-primary btn-lg w-full disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none">
          Next: Add Ingredients
        </button>
      </div>
    </div>
  );
}

function Step({ num, active }: { num: string; active?: boolean }) {
  return (
    <span
      className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all"
      style={{
        background: active ? "var(--primary)" : "var(--gray-100)",
        color: active ? "#fff" : "var(--gray-400)",
      }}
    >
      {num}
    </span>
  );
}
