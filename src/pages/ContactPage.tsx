import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for Leaflet marker icon issue in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const ContactPage: React.FC = () => {
  // Placeholder coordinates for Pantiss School (replace with actual coordinates)
  const position: [number, number] = [22.5726, 88.3639]; // Example: Kolkata, India

  return (
    <section className="relative w-full py-16 pt-48 px-4 sm:px-6 lg:px-16 bg-gradient-to-b from-black to-black overflow-hidden">
      {/* Background with Subtle Particle Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-20 h-20 bg-purple-600 rounded-full opacity-20 blur-3xl top-10 left-10 animate-pulse-slow"></div>
        <div className="absolute w-32 h-32 bg-green-600 rounded-full opacity-20 blur-3xl top-1/4 right-12 animate-pulse-delayed"></div>
        <div className="absolute w-16 h-16 bg-purple-500 rounded-full opacity-25 blur-2xl bottom-20 left-1/3 animate-pulse-slow"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-transparent bg-clip-text bg-green-600 mb-12 animate-fade-in">
          Get in Touch
        </h2>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Contact Information and Form */}
          <div className="space-y-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            {/* Contact Details */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-green-600">Contact Us</h3>
              <div className="text-gray-300 text-base sm:text-lg">
                <p className="flex items-center gap-2">
                  <span className="text-green-600">📧</span>
                  <a href="mailto:info@pantisschool.org" className="hover:text-green-500 transition-colors">
                    info@pantisschool.org
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-green-600">📞</span>
                  <a href="tel:+91-123-456-7890" className="hover:text-green-500 transition-colors">
                    +91 123 456 7890
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-green-600">📍</span>
                  Pantiss School of Mines, Steel & Aluminium, Industrial Estate, Kolkata, India
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-purple-600">Send Us a Message</h3>
              <form className="space-y-4" aria-label="Contact Form">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                    placeholder="Your Message"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:from-purple-700 hover:to-green-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Right: Map */}
          <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <h3 className="text-2xl font-semibold text-purple-600 mb-4">Our Location</h3>
            <div className="w-full h-96 rounded-lg overflow-hidden shadow-xl border border-purple-600/30">
              <MapContainer
                center={position}
                zoom={15}
                style={{ height: "100%", width: "100%" }}
                aria-label="Map showing Pantiss School location"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                  <Popup>
                    Pantiss School of Mines, Steel & Aluminium
                    <br />
                    Industrial Estate, Kolkata, India
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for Animations */}
      <style>{`
        @keyframes pulse-slow {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translate(6px, -4px) scale(1.05);
            opacity: 0.3;
          }
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.2;
          }
        }

        @keyframes pulse-delayed {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translate(-6px, 4px) scale(0.95);
            opacity: 0.3;
          }
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.2;
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }

        .animate-pulse-delayed {
          animation: pulse-delayed 7s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default ContactPage;