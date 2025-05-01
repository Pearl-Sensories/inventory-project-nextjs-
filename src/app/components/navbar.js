"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiShoppingCart, FiUser, FiMenu, FiX, FiHeart } from "react-icons/fi"; // <- added FiHeart

const navItems = [
  { label: "Home", href: "/" },
  { label: "Beds", href: "/bed" },
  { label: "Sofas", href: "/sofas" },
  { label: "Mattresses", href: "/mattresses" },
  { label: "About Us", href: "/aboutus" },
  { label: "Contact Us", href: "/contactus" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-[#F9F9F6] shadow-md px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Image src="/logo.png" alt="HomeNest Logo" width={40} height={40} />
          <span className="text-xl font-serif font-semibold text-[#6C4F3D]">
            HomeNest
          </span>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex space-x-6 text-lg font-medium text-[#3E4E50]">
          {navItems.map(({ label, href }, idx) => (
            <li key={idx}>
              <Link href={href} className="hover:text-[#A97C50] transition-colors">
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-4 text-xl text-[#3E4E50]">
          
          <Link href="/wishlist">
            <FiHeart className="cursor-pointer hover:text-[#A97C50]" />
          </Link>
          <Link href="/shoppingcart">
            <FiShoppingCart className="cursor-pointer hover:text-[#A97C50]" />
          </Link>
          <Link href="/signin">
            <FiUser className="cursor-pointer hover:text-[#A97C50]" />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden text-2xl text-[#3E4E50]" onClick={toggleMenu}>
          {menuOpen ? <FiX className="cursor-pointer" /> : <FiMenu className="cursor-pointer" />}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4 text-[#3E4E50] text-lg font-medium">
          {navItems.map(({ label, href }, idx) => (
            <Link
              key={idx}
              href={href}
              className="block hover:text-[#A97C50] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}

          <div className="flex items-center space-x-4 text-xl mt-4">
            <FiSearch className="cursor-pointer hover:text-[#A97C50]" />
            <Link href="/wishlist">
              <FiHeart className="cursor-pointer hover:text-[#A97C50]" />
            </Link>
            <Link href="/shoppingcart">
              <FiShoppingCart className="cursor-pointer hover:text-[#A97C50]" />
            </Link>
            <Link href="/signup">
              <FiUser className="cursor-pointer hover:text-[#A97C50]" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
