import React from "react";

const RegistrationNewsletter: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-16 bg-gray-900">
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-purple-600 mb-4 animate-fade-in">
          Stay Updated
        </h2>
        <p className="text-gray-400 mb-6">
          Subscribe to our newsletter for the latest event updates and training opportunities.
        </p>
        <form className="space-y-4" aria-label="Newsletter Signup Form">
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-purple-600"
            required
          />
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-green-600 text-white font-medium rounded-md hover:from-purple-700 hover:to-green-700 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
          >
            Subscribe
          </button>
        </form>
      </div>
      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
      `}</style>
    </section>
  );
};

export default RegistrationNewsletter;