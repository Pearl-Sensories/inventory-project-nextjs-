"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { FiCheck } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import { useRouter } from "next/navigation";


const videos = ["/landing.mp4", "/landing2.mp4"];

const products = [
  { image: "/card1.png", title: "Elegant Sofa",  price: "$1,299", description: "Soft and comfortable with a luxurious design." },
  { image: "/card2.png", title: "Modern Chair", price: "$849", description: "Stylish and elegant, perfect for your living room." },
  { image: "/card3.png", title: "White Armchair", price: "$699", description: "Supportive and long-lasting for a great relaxation." },
  { image: "/card4.png", title: "Black Mattress", price: "$459", description: "Perfect for relaxation with a contemporary touch." },
  { image: "/card5.png", title: "Brown wooden framed with white mattress hanging bed", price: "$299", description: "A comfortable bed for outdoor use" }
];

const messages = [
  "Crafted for Comfort, Designed for Elegance",
  "Your Dream Home Starts with HOMENEST",
  "Where Style Meets Serenity",
  "Luxury Living, Thoughtfully Delivered",
  "Because You Deserve the Best Rest",
];


const data = [
  {
    title: "What Products We Offer",
    content:
      "HOMENEST offers a thoughtfully curated selection of elegant furniture — from luxurious beds and modern sofas to memory foam mattresses and timeless coffee tables. Each piece is crafted to bring comfort, beauty, and durability into your home.",
  },
  {
    title: "Shipping Information",
    content:
      "We offer nationwide shipping across the UK. Once your order is confirmed, it is carefully packaged and dispatched within 2–3 business days. You’ll receive real-time updates and tracking links as your order moves toward delivery.",
  },
  {
    title: "How to Track Your Order",
    content:
      "After your purchase, you'll get a confirmation email with a tracking number. You can use that number on our 'Track Order' page anytime to monitor your shipment’s progress.",
  },
  {
    title: "Customer Service",
    content:
      "Our support team is always ready to help — whether it’s pre-order questions or post-purchase concerns. Reach us through our Contact page or live chat for prompt and friendly assistance.",
  },
  {
    title: "How Long Delivery Takes",
    content:
      "Most deliveries arrive within 3–7 business days, depending on your location. For remote areas, delivery may take slightly longer — but we’ll keep you updated every step of the way.",
  },
];

  const blogs = [
    {
      slug: "outdoor-trends",
      title: "Outdoor Furniture Trends",
      image: "/image4.png",
    },
    {
      slug: "office-furniture-guide",
      title: "Ultimate Guide to Choosing Office Furniture",
      image: "/image5.png",
    },
    {
      slug: "perfect-home-furniture",
      title: "Transform Your Home with the Perfect Furniture",
      image: "/image6.png",
    },
  ];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % videos.length);
    }, 8000); // Change video every 8 seconds

    return () => clearInterval(interval);
  }, []);

  const [index, setIndex] = useState(0);

  // Cycle the index every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000); // every 4 seconds
    return () => clearInterval(interval);
  }, []);

  

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  

  const handleAddToCart = async (product) => {
    console.log("Sending product to cart:", product); // Debugging
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        console.log("Product added to cart successfully");

        // Save the product to local storage
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));

        router.push("/shoppingcart");
      } else {
        const errorData = await response.json();
        console.error("Failed to add to cart:", errorData.message);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };


  const router = useRouter();

  const handleAddToWishlist = async (product) => {
    console.log("Sending product to wishlist:", product); // Debugging
    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        console.log("Product added to wishlist successfully");

        // Save the product to local storage
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        wishlist.push(product);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        router.push("/wishlist");
      } else {
        const errorData = await response.json();
        console.error("Failed to add to wishlist:", errorData.message);
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };
  

  return (

    <>
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Videos */}
      {videos.map((video, index) => (
        <video
          key={index}
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-20" />

      {/* Text + Button */}
      <div className="relative z-30 flex items-center justify-center h-full px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-center"
        >
          {/* Title Animation: Move from bottom */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-[#F9F9F6] drop-shadow-lg"
          >
            Welcome to HomeNest
          </motion.h1>

          {/* Paragraph Animation: Move from top */}
          <motion.p
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
            className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-[#D9CBB3] font-medium max-w-[90vw] mx-auto"
          >
            Elegant Living. Thoughtfully Crafted.
          </motion.p>

          {/* Shop Now Button Animation: Move from left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.6 }}
            className="mt-6"
          >
            <Link href="/beds">
              <button className="bg-[#A97C50] hover:bg-[#6C4F3D] text-white px-6 py-2 rounded-full text-base sm:text-lg font-medium transition-transform duration-300 transform hover:scale-105">
                Shop Now
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>

    <div className="px-6 py-16 bg-[#F9F9F6]">
      <h2 className="text-center text-4xl font-serif font-semibold text-[#6C4F3D] mb-12">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={index}
            className="relative group border-2 border-[#D9CBB3] rounded-lg overflow-hidden shadow-lg bg-white"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img src={product.image} alt={product.title} className="w-full h-64 object-cover" />

            {/* Hover Buttons */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-4 text-white">
                <button
                  onClick={() => handleAddToWishlist(product)} // Attach the handler for Wishlist
                  className="flex items-center bg-[#A97C50] hover:bg-[#6C4F3D] w-30 px-4 py-2 rounded-full"
                >
                  <FiHeart className="mr-2" /> Add to Wishlist
                </button>
                <button
                  onClick={() => handleAddToCart(product)} // Attach the handler for Cart
                  className="flex items-center bg-[#A97C50] hover:bg-[#6C4F3D] w-30 px-4 py-2 rounded-full"
                >
                  <FiShoppingCart className="mr-2" /> Add to Cart
                </button>
              </div>
            </div>

            {/* Product Description */}
            <div className="text-center p-4">
              <h3 className="text-lg font-semibold text-[#3E4E50]">{product.title}</h3>
              <p className="text-[#A97C50] font-medium mt-1">{product.price}</p>
              <p className="mt-2 text-sm text-[#6C4F3D]">{product.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    <div className="relative bg-[#F9F9F6] py-16 px-4 sm:px-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">

        {/* Left Image */}
        <div className="w-full lg:w-1/2 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
          <Image
            src="/image1.png"
            alt="Luxury Bed 1"
            width={600}
            height={400}
            className="rounded-2xl shadow-lg object-cover w-full h-auto"
          />
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-[40%] text-center space-y-4">
          <h3 className="text-[#A97C50] font-serif text-2xl font-semibold tracking-wide">
            HOMENEST
          </h3>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#6C4F3D]">
            Elevate Your Rest
          </h2>
          <p className="text-[#3E4E50] text-lg leading-relaxed">
            Discover the harmony of comfort and elegance with our handcrafted beds.
            At HOMENEST, we design each piece to cradle you in luxury while complementing your space with timeless style.
          </p>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2 transform rotate-6 hover:rotate-0 transition-transform duration-500">
          <Image
            src="/image2.png"
            alt="Luxury Bed 2"
            width={600}
            height={400}
            className="rounded-2xl shadow-lg object-cover w-full h-auto"
          />
        </div>
      </div>
    </div>

    <div className="bg-[#F9F9F6] px-6 py-12 text-center">
      <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#6C4F3D] mb-4">
        Sleep in Luxury
      </h2>
      <p className="text-[#3E4E50] text-lg max-w-3xl mx-auto mb-6">
        Indulge in superior comfort with our premium bed collection, crafted for restful sleep,
        elegant designs, and long-lasting durability to elevate your bedroom space.
      </p>

      <ul className="flex flex-col sm:flex-row justify-center items-center gap-4 text-[#3E4E50] font-medium">
        <li className="flex items-center gap-2">
          <FiCheck className="text-[#A97C50]" /> Premium Quality
        </li>
        <li className="flex items-center gap-2">
          <FiCheck className="text-[#A97C50]" /> Affordable Prices
        </li>
        <li className="flex items-center gap-2">
          <FiCheck className="text-[#A97C50]" /> Fast Delivery
        </li>
      </ul>
    </div>
    <div className="bg-[#6C4F3D] text-[#F9F9F6] py-8 px-4 text-center overflow-hidden">
      <div className="relative h-10 md:h-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={index} // important: this causes React to re-render on index change
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="absolute w-full text-lg md:text-xl font-serif font-medium"
          >
            {messages[index]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>

    <section className="bg-[#F9F9F6] px-6 py-16">
      <h2 className="text-3xl md:text-4xl text-center font-serif font-semibold text-[#6C4F3D] mb-10">
        Products & Services
      </h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {data.map((item, index) => (
          <div key={index} className="border border-[#D9CBB3] rounded-lg bg-white shadow-sm">
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center px-5 py-4 text-left font-medium text-[#3E4E50] hover:bg-[#f2ece4] transition-colors"
            >
              {item.title}
              <FiChevronDown
                className={`transform transition-transform ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {activeIndex === index && (
              <div className="px-5 pb-5 text-[#6C4F3D] transition-all">
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>


    <section className="bg-[#F9F9F6] px-6 py-16">
      <h2 className="text-3xl md:text-4xl text-center font-serif font-semibold text-[#6C4F3D] mb-10">
        Explore Our Blog
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {/* Featured Blog */}
        <Link href="/bloghero">
        <div className="relative group overflow-hidden rounded-lg shadow-md">
          <Image
            src="/image3.png" // Replace with your image
            alt="Featured Blog"
            width={800}
            height={500}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute bottom-0 left-0 p-6 z-20 text-white">
            <h3 className="text-2xl md:text-3xl font-semibold font-serif">
              Designing Spaces that Speak Elegance
            </h3>
            <p className="mt-2 text-sm text-[#D9CBB3]">
              Tips and inspiration to help you create a warm and stylish home with HOMENEST furnishings.
            </p>
          </div>
        </div>
        </Link>

        {/* Other Blogs */}
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            
            {
              title: "Outdoor Furniture Trends",
              image: "/image4.png",
            },
           
            {
              title: "Ultimate Guide to Choosing Office Furniture",
              image: "/image5.png",
            },
            {
              title: "Transform Your Home with the Perfect Furniture",
              image: "/image6.png",
            },
          ].map((blog, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg shadow-md"
            >
              <Image
                src={blog.image}
                alt={blog.title}
                width={400}
                height={300}
                className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 z-10" />
              <div className="absolute bottom-0 left-0 p-4 z-20 text-white">
                <h4 className="text-lg font-semibold font-serif">
                  {blog.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      
    </section>

    </>
  );
}
