import React from "react";

const ContactUs = () => {
  return (
    <section className="bg-[#F9F9F6] px-6 py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <div>
          <h2 className="text-3xl font-serif font-semibold text-[#6C4F3D] mb-6">
            Get in Touch
          </h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A97C50]"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A97C50]"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A97C50]"
            />
            <button
              type="submit"
              className="bg-[#6C4F3D] text-white px-6 py-3 rounded hover:bg-[#A97C50] transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-serif font-semibold text-[#6C4F3D] mb-2">
              Contact Information
            </h3>
            <p className="text-[#3E4E50]">
              <strong>Email:</strong> support@homenest.com
            </p>
            <p className="text-[#3E4E50]">
              <strong>Phone:</strong> +233 50 145 8413
            </p>
            <p className="text-[#3E4E50]">
              <strong>Location:</strong> Accra, Ghana
            </p>
          </div>

          {/* Google Map for Accra, Ghana */}
          <div className="rounded overflow-hidden shadow-md">
            <iframe
              title="Google Map - Accra Ghana"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15883.362093977227!2d-0.2058745!3d5.5600089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf8503a54a0a41%3A0x3fb9e5375bc74b95!2sAccra%2C%20Ghana!5e0!3m2!1sen!2sgh!4v1684097742726!5m2!1sen!2sgh"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
