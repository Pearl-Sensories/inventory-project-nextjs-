"use client";

import Image from "next/image";

export default function OutdoorTrendsBlog() {
  return (
    <div className="bg-[#F9F9F6] text-[#3E4E50] px-6 md:px-20 py-16">
      {/* Hero Image */}
      <div className="relative h-[60vh] w-full mb-10">
        <Image
          src="/image4.png" // Replace with your image
          alt="Outdoor Furniture Trends"
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-serif font-semibold text-[#F9F9F6] text-center px-4 drop-shadow-lg">
            Top Outdoor Furniture Trends You’ll Love This Season
          </h1>
        </div>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto space-y-8">
        <p className="text-[#A97C50] font-semibold uppercase tracking-wider text-sm">HOMENEST FURNISHINGS</p>
        <p className="text-lg leading-relaxed">
          As the seasons shift and the weather invites us outside, <strong>HOMENEST FURNISHINGS</strong> is here to guide you in transforming your outdoor areas into comfortable, stylish extensions of your home.
          Whether you're redesigning a spacious backyard or refreshing a petite patio, these curated trends will help you create an inviting outdoor escape.
        </p>

        <section>
          <h2 className="text-2xl font-semibold mb-2">🌿 Natural Textures & Earthy Tones</h2>
          <p>
            One of the most defining trends this year is the use of organic materials like rattan, teak, bamboo, and linen.
            These elements not only blend beautifully with the surrounding landscape but also create a sense of calm and authenticity.
            <br />
            <span className="italic">Pro Tip:</span> Pair walnut or caramel-toned frames with off-white cushions for a warm, grounded aesthetic.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">🧱 Modular & Multi-Functional Pieces</h2>
          <p>
            With more people entertaining at home, modular outdoor seating has become a staple.
            These versatile pieces can be rearranged to fit any layout or occasion — from cozy conversations to festive gatherings.
            <br />
            <span className="italic">Look for:</span> Sofas with detachable sections, nesting coffee tables, or ottomans that double as storage.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">🌅 Indoor-Outdoor Blending</h2>
          <p>
            Bringing indoor comfort outside is the ultimate luxury. Plush seating, weather-resistant throws, and decorative lighting are blurring the line between your living room and your patio.
            <br />
            <span className="italic">Try this:</span> Add soft accent pillows in slate gray or taupe to complement the warmth of your wooden furniture.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">🕯 Statement Lighting & Accessories</h2>
          <p>
            From lanterns to string lights and sculptural lamps, lighting is now a design focal point outdoors. Ambient lighting not only elevates the mood but also makes your space more usable after dark.
            <br />
            <span className="italic">Accent it with:</span> Metal finishes like bronze or matte black for a modern, elegant feel.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">🌸 Sustainable, Durable Designs</h2>
          <p>
            Eco-conscious furniture made from recycled materials or sustainably harvested wood is not just a trend — it's a lifestyle.
            These pieces are built to last and support a more mindful way of living.
            <br />
            <strong>HOMENEST FURNISHINGS</strong> proudly curates selections that are both beautiful and environmentally responsible.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">📦 Compact Comfort for Small Spaces</h2>
          <p>
            Even the smallest balconies can become a sanctuary. Bistro tables, foldable chairs, and wall-mounted planters are ideal for tight areas without compromising style.
            <br />
            <span className="italic">Design Tip:</span> Use vertical space to layer your look — think shelves, hanging lanterns, and plant ladders.
          </p>
        </section>

        <div className="text-center mt-12">
          <p className="text-xl font-semibold text-[#6C4F3D]">Discover comfort, elegance, and timeless outdoor charm at HOMENEST FURNISHINGS.</p>
        </div>
      </div>
    </div>
  );
}
