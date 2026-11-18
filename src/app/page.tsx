"use client";

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-hero">
        <div className="max-w-[1280px] mx-auto px-6 py-20 sm:py-28 text-center">
          <div
            className="inline-block text-sm font-semibold px-5 py-2 rounded-full mb-6"
            style={{ background: "rgba(255,153,0,0.12)", color: "var(--accent-dark)", letterSpacing: "0.5px" }}
          >
            Now Live — Create Your Brand in 30 Seconds
          </div>
          <h1
            className="text-4xl sm:text-6xl font-extrabold leading-tight"
            style={{ color: "var(--primary)" }}
          >
            Turn Your Product
            <br />
            <span style={{ color: "var(--accent)" }}>Into a Brand</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto" style={{ color: "var(--gray-600)", lineHeight: 1.7 }}>
            Upload a photo. Add your ingredients. Get a complete branding kit —
            logo, label, descriptions, social media posts, WhatsApp messages.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/brand/create" className="btn-accent btn-lg">
              Start Free — No Signup Required
            </a>
          </div>
          <p className="mt-4 text-sm" style={{ color: "var(--gray-400)" }}>
            Starting at Rs.49 per brand kit &middot; Ready in 30 seconds
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20" style={{ background: "var(--gray-50)" }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 className="text-center text-3xl sm:text-4xl font-bold mb-4" style={{ color: "var(--primary)" }}>
            3 Steps. 30 Seconds. Your Brand.
          </h2>
          <p className="text-center mb-14" style={{ color: "var(--gray-500)" }}>
            The simplest way to go from product to professional brand.
          </p>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Upload Your Product", desc: "Take a photo and tell us the price. That's it." },
              { step: "2", title: "Add Ingredients", desc: "Type or speak your ingredients. We understand turmeric, neem, ghee — everything." },
              { step: "3", title: "Get Your Brand Kit", desc: "Logo, label, descriptions, social posts, WhatsApp messages — all ready." },
            ].map((item) => (
              <div key={item.step} className="card text-center relative pt-10">
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
                  style={{ background: "var(--accent)" }}
                >
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--primary)" }}>
                  {item.title}
                </h3>
                <p className="text-sm" style={{ color: "var(--gray-500)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 className="text-center text-3xl sm:text-4xl font-bold mb-4" style={{ color: "var(--primary)" }}>
            Your Complete Brand Kit
          </h2>
          <p className="text-center mb-14" style={{ color: "var(--gray-500)" }}>
            Everything a local seller needs to look professional.
          </p>
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
                className="rounded-2xl p-7 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "var(--gray-50)",
                  border: "1px solid transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--gray-50)";
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <h3 className="font-semibold text-base mb-1" style={{ color: "var(--primary)" }}>{item.title}</h3>
                <p className="text-sm" style={{ color: "var(--gray-500)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20" style={{ background: "var(--gray-50)" }}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-center text-3xl sm:text-4xl font-bold mb-4" style={{ color: "var(--primary)" }}>
            Simple Pricing
          </h2>
          <p className="text-center mb-14" style={{ color: "var(--gray-500)" }}>
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
                className="rounded-2xl p-8 transition-all duration-300"
                style={{
                  background: "#fff",
                  border: tier.highlight ? "2px solid var(--success)" : "2px solid var(--gray-200)",
                  boxShadow: tier.highlight ? "0 8px 32px rgba(34,197,94,0.12)" : "none",
                }}
              >
                {tier.highlight && (
                  <div
                    className="text-xs font-bold uppercase tracking-wider mb-3 inline-block px-3 py-1 rounded-full"
                    style={{ background: "rgba(34,197,94,0.1)", color: "var(--success)" }}
                  >
                    Most Popular
                  </div>
                )}
                <h3 className="font-bold text-xl" style={{ color: "var(--primary)" }}>{tier.name}</h3>
                <div className="mt-2 mb-5">
                  <span className="text-4xl font-extrabold" style={{ color: "var(--primary)" }}>
                    Rs.{tier.price}
                  </span>
                  <span className="text-sm" style={{ color: "var(--gray-400)" }}> /kit</span>
                </div>
                <ul className="space-y-3 text-sm mb-6" style={{ color: "var(--gray-600)" }}>
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 pb-3" style={{ borderBottom: "1px solid var(--gray-100)" }}>
                      <span style={{ color: "var(--success)" }}>&#10003;</span> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="/brand/create"
                  className={tier.highlight ? "btn-primary w-full text-sm" : "btn-outline w-full text-sm"}
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-sm mt-10" style={{ color: "var(--gray-400)" }}>
            Choose &quot;Download + Launch Store&quot; at checkout — same price, free online store included.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 text-center"
        style={{ background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)" }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Your product deserves a brand.
          </h2>
          <p className="text-lg mb-10" style={{ color: "rgba(255,255,255,0.7)" }}>
            Join local sellers who turned their homemade products into professional brands.
          </p>
          <a href="/brand/create" className="btn-accent btn-lg">
            Create Your Brand Now
          </a>
        </div>
      </section>
    </div>
  );
}
