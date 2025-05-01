import Image from "next/image";

export default function BlogHero() {
  return (
    <section className="relative h-auto min-h-[85vh] w-full overflow-hidden bg-[#F9F9F6]">
      {/* Image Background */}
      <div className="relative h-[65vh] w-full fixed">
        <Image
          src="/image7.png" // Your hero image here
          alt="Well-styled small space with elegant furniture"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
          priority
        />
        {/* Overlay Content */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="text-center text-[#F9F9F6] max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-serif font-bold drop-shadow-lg">
              Smart Ways to Make Small Spaces Look Bigger with the Right Furniture
            </h1>
            <p className="mt-4 text-lg md:text-xl text-[#D9CBB3] font-medium">
              Discover how thoughtful furniture choices and clever design strategies
              can turn even the tiniest rooms into warm, inviting, and spacious
              sanctuaries of style and comfort.
            </p>
          </div>
        </div>
      </div>

      {/* Rich Intro Paragraph */}
      <div className="max-w-4xl mx-auto px-6 py-10 text-[#3E4E50]">
        <h2 className="text-2xl md:text-3xl font-serif text-[#6C4F3D] font-semibold mb-4">
          Creating Room to Breathe — Even in Small Spaces
        </h2>
        <p className="text-lg leading-relaxed mb-6">
          Small homes and compact apartments don’t have to feel cramped. With the right
          design elements and a thoughtful approach to furniture selection, you can unlock
          every square inch of your home’s potential. At <span className="text-[#A97C50] font-bold">HOME NEST FURNISHINGS</span>,
          we believe small spaces deserve just as much elegance and intention as larger ones —
          maybe even more.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Whether you're furnishing a studio flat, a cozy guest room, or optimizing your urban
          living area, the furniture you choose plays a key role in shaping how large and livable
          a space feels. From multipurpose pieces to clever visual tricks that expand the eye’s
          perspective, this guide will help you style smarter — not bigger.
        </p>
        <p className="text-lg leading-relaxed">
          In this blog, we’ll explore key furniture features that amplify the feel of your space:
          open frames, sleek silhouettes, reflective surfaces, and practical yet beautiful layouts.
          We’ll also share tips on choosing colors, arranging pieces, and incorporating texture and
          light to elevate your small-space living into a true design statement.
        </p>
      </div>
    </section>
  );
}
