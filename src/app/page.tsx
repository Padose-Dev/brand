export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 py-16 sm:py-24 text-center">
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-amber-950 leading-tight">
          Turn Your Product
          <br />
          <span className="text-amber-600">Into a Brand</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-amber-800/80 max-w-2xl mx-auto">
          Upload a photo. Add your ingredients. Get a complete branding kit —
          logo, label, descriptions, social media posts, WhatsApp messages — in
          30 seconds.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/create"
            className="bg-amber-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-amber-700 transition shadow-lg shadow-amber-600/20"
          >
            Start Free — No Signup Required
          </a>
        </div>
        <p className="mt-4 text-sm text-amber-700/60">
          Starting at Rs.49 per brand kit &middot; Ready in 30 seconds
        </p>
      </section>

      {/* How it works */}
      <section className="bg-white border-y border-amber-200/50 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-center font-serif text-3xl font-bold text-amber-950 mb-12">
            3 Steps. 30 Seconds. Your Brand.
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Upload Your Product", desc: "Take a photo and tell us the price. That's it.", icon: "1" },
              { step: "2", title: "Add Ingredients", desc: "Type or speak your ingredients. We understand turmeric, neem, ghee — everything.", icon: "2" },
              { step: "3", title: "Get Your Brand Kit", desc: "Logo, label, descriptions, social posts, WhatsApp messages — all ready.", icon: "3" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-amber-950 text-lg mb-2">{item.title}</h3>
                <p className="text-amber-800/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-center font-serif text-3xl font-bold text-amber-950 mb-12">
          Your Complete Brand Kit
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Product Labels", desc: "Print-ready labels in 12+ templates (PDF + PNG)" },
            { title: "Brand Logo", desc: "Your brand identity — monogram or AI-generated" },
            { title: "Descriptions", desc: "SEO-optimized title, bullets, and full description" },
            { title: "Origin Story", desc: "Emotional narrative that connects with buyers" },
            { title: "Social Media Kit", desc: "Instagram post, WhatsApp status, Facebook cover" },
            { title: "WhatsApp Messages", desc: "Ready-to-send selling messages with CTA" },
            { title: "Business Card", desc: "Digital card with QR code for your store" },
            { title: "Trust Badges", desc: "Natural, Handmade, Chemical-Free — auto-detected" },
            { title: "Discovery Tags", desc: "20+ search and local SEO tags" },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl p-6 border border-amber-200/50 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-amber-950 mb-1">{item.title}</h3>
              <p className="text-sm text-amber-800/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-white border-y border-amber-200/50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-center font-serif text-3xl font-bold text-amber-950 mb-4">
            Simple Pricing
          </h2>
          <p className="text-center text-amber-800/70 mb-12">
            Pay per brand kit. No subscription required.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                name: "Basic", price: "49", highlight: false,
                features: ["Product label (1 template)", "Title + description", "Discovery tags", "WhatsApp message"],
              },
              {
                name: "Pro", price: "149", highlight: true,
                features: ["Everything in Basic", "Brand logo", "Social media kit (4 images)", "Origin story", "Business card", "No watermark"],
              },
              {
                name: "Studio", price: "299", highlight: false,
                features: ["Everything in Pro", "3 label variants", "Multi-language labels", "Festival editions", "3 re-generations"],
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-6 border-2 ${
                  tier.highlight ? "border-amber-600 bg-amber-50 shadow-lg" : "border-amber-200/50 bg-white"
                }`}
              >
                {tier.highlight && (
                  <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">Most Popular</div>
                )}
                <h3 className="font-bold text-xl text-amber-950">{tier.name}</h3>
                <div className="mt-2 mb-4">
                  <span className="text-3xl font-bold text-amber-950">Rs.{tier.price}</span>
                  <span className="text-amber-700/60 text-sm"> /kit</span>
                </div>
                <ul className="space-y-2 text-sm text-amber-800/80">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">&#10003;</span> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="/create"
                  className={`mt-6 block text-center py-2.5 rounded-xl font-semibold text-sm transition ${
                    tier.highlight ? "bg-amber-600 text-white hover:bg-amber-700" : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                  }`}
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="font-serif text-3xl font-bold text-amber-950 mb-4">
          Your product deserves a brand.
        </h2>
        <p className="text-amber-800/70 mb-8">
          Join local sellers who turned their homemade products into professional brands.
        </p>
        <a
          href="/create"
          className="inline-block bg-amber-600 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-amber-700 transition shadow-lg shadow-amber-600/20"
        >
          Create Your Brand Now
        </a>
      </section>
    </div>
  );
}
