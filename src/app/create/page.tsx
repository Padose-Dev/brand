"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateStep1() {
  const router = useRouter();
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 5);
    setPhotos(files);
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const handleNext = () => {
    if (!price || isNaN(Number(price))) return;

    // Store in sessionStorage for Step 2
    sessionStorage.setItem(
      "brand_step1",
      JSON.stringify({
        productName: productName.trim() || null,
        price: Number(price),
        photoCount: photos.length,
      })
    );
    router.push("/create/ingredients");
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8 sm:py-12">
      {/* Progress */}
      <div className="flex items-center justify-center gap-2 mb-8 text-sm text-amber-700">
        <span className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold">
          1
        </span>
        <span className="w-12 h-0.5 bg-amber-200" />
        <span className="w-8 h-8 rounded-full bg-amber-200 text-amber-600 flex items-center justify-center font-bold">
          2
        </span>
        <span className="w-12 h-0.5 bg-amber-200" />
        <span className="w-8 h-8 rounded-full bg-amber-200 text-amber-600 flex items-center justify-center font-bold">
          3
        </span>
      </div>

      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-amber-950 mb-2">
        Upload Your Product
      </h1>
      <p className="text-amber-800/70 mb-8">
        Add photos of your product and tell us the price.
      </p>

      {/* Photo upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-amber-900 mb-2">
          Product Photos
        </label>
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-amber-300 rounded-2xl cursor-pointer hover:border-amber-500 hover:bg-amber-50 transition">
          {previews.length > 0 ? (
            <div className="flex gap-2 p-4 overflow-x-auto">
              {previews.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Product ${i + 1}`}
                  className="w-24 h-24 object-cover rounded-xl"
                />
              ))}
            </div>
          ) : (
            <div className="text-center">
              <div className="text-4xl mb-2">📷</div>
              <p className="text-sm text-amber-700">
                Tap to add product photos
              </p>
              <p className="text-xs text-amber-600/60 mt-1">Up to 5 photos</p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handlePhotoChange}
          />
        </label>
      </div>

      {/* Product name */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-amber-900 mb-2">
          Product Name <span className="text-amber-600/60">(optional)</span>
        </label>
        <input
          type="text"
          placeholder="e.g., Haldi Soap, Amma's Mango Pickle"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-amber-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-amber-950 placeholder:text-amber-400"
        />
        <p className="text-xs text-amber-600/60 mt-1">
          Don&apos;t have a name? We&apos;ll suggest one for you.
        </p>
      </div>

      {/* Price */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-amber-900 mb-2">
          Price (Rs.) <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-3 text-amber-700 font-medium">
            Rs.
          </span>
          <input
            type="number"
            placeholder="80"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-amber-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-amber-950 placeholder:text-amber-400"
            min="1"
          />
        </div>
      </div>

      {/* Next button */}
      <button
        onClick={handleNext}
        disabled={!price}
        className="w-full bg-amber-600 text-white py-4 rounded-2xl text-lg font-semibold hover:bg-amber-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next: Add Ingredients
      </button>
    </div>
  );
}
