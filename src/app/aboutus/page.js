"use client";

import { useState } from "react";
import Image from "next/image";

const AboutUs = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <>
      {/* Main About Section */}
      <section className="bg-[#F9F9F6] px-6 py-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#6C4F3D] mb-6">
              Who We Are at HomeNest Furnishings
            </h2>
            <p className="text-[#3E4E50] text-lg leading-relaxed">
              At <span className="text-[#A97C50] font-semibold">HomeNest</span>, we believe that every home deserves a personal touch — a place where warmth meets elegance, and comfort blends effortlessly with style.
              <br /><br />
              Born from a love for beautiful, functional living spaces, we are a passionate team of designers, artisans, and visionaries dedicated to transforming houses into homes. Whether you're styling a cozy apartment or furnishing a family home, our curated collections are crafted to fit seamlessly into your life.
            </p>
            <div className="mt-6 text-[#3E4E50] text-md space-y-1">
              <p><strong>Founded:</strong> 2020</p>
              <p><strong>Based in:</strong> Lagos, Nigeria</p>
              <p><strong>Our Promise:</strong> Reliable shipping, quality service, and furniture you’ll love coming home to.</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <Image
              src="/showroom.png"
              alt="Our Showroom"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>
      </section>

      {/* Accordion Section */}
      <section className="bg-white px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-serif font-semibold text-[#6C4F3D] mb-8 text-center">
            Learn More About Us
          </h3>

          {["Our Mission", "Our Vision", "Our Story"].map((title, index) => {
            const content = {
              "Our Mission": "To enrich homes with high-quality, elegant, and affordable furniture. We aim to make comfort and style accessible to everyone, one room at a time.",
              "Our Vision": "To be Africa’s leading furniture brand recognized for innovation, sustainability, and customer satisfaction — bringing warmth to every home we touch.",
              "Our Story": "HomeNest began with a small dream and a deep passion for design. What started as a local store has now grown into a trusted brand loved by families and decorators across the country. Every piece tells a story, and we’re proud to be part of yours."
            };

            return (
              <div key={title} className="mb-4 border-b pb-4">
                <button
                  className="w-full text-left font-semibold text-[#3E4E50] hover:text-[#A97C50] transition duration-300"
                  onClick={() => toggleSection(title)}
                >
                  {title}
                </button>
                {openSection === title && (
                  <p className="mt-2 text-[#3E4E50] text-sm">{content[title]}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default AboutUs;
