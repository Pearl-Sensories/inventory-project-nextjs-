import Link from "next/link";
import { FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#6C4F3D] text-[#F9F9F6] pt-12 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo & About */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Image src="/logo.png" alt="HomeNest Logo" width={40} height={40} />
            <span className="text-2xl font-serif font-semibold text-[#A97C50]">
              HomeNest
            </span>
          </div>
          <p className="text-sm text-[#D9CBB3]">
            HomeNest Furnishings brings elegance, comfort, and quality together.
            Explore timeless designs crafted for your living spaces.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#F9F9F6]">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-[#A97C50]">Home</Link></li>
            <li><Link href="/beds" className="hover:text-[#A97C50]">Beds</Link></li>
            <li><Link href="/sofas" className="hover:text-[#A97C50]">Sofas</Link></li>
            <li><Link href="/mattresses" className="hover:text-[#A97C50]">Mattresses</Link></li>
            <li><Link href="/about" className="hover:text-[#A97C50]">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-[#A97C50]">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#F9F9F6]">Contact</h4>
          <p className="text-sm text-[#D9CBB3]">Email: support@homenest.com</p>
          <p className="text-sm text-[#D9CBB3]">Phone: +233 501458413</p>
          <p className="text-sm text-[#D9CBB3]">Location: Accra, Ghana</p>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#F9F9F6]">Follow Us</h4>
          <div className="flex space-x-4 text-2xl text-[#D9CBB3]">
            <FiInstagram className="hover:text-[#A97C50] cursor-pointer" />
            <FiFacebook className="hover:text-[#A97C50] cursor-pointer" />
            <FiTwitter className="hover:text-[#A97C50] cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-[#A97C50]/30 mt-10 pt-4 text-center text-sm text-[#D9CBB3]">
        © {new Date().getFullYear()} HomeNest Furnishings. All rights reserved.
      </div>
    </footer>
  );
}
