import React from "react";

const FooterCTA: React.FC = () => {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-16 bg-black border-t border-gray-800">
      <div className="text-center">
        <p className="text-gray-400 mb-4 animate-fade-in">
          Ready to participate? Contact us at <a href="mailto:info@pantisschool.org" className="text-purple-600 hover:text-purple-500">info@pantisschool.org</a>
        </p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="text-purple-600 hover:text-purple-500 transition" aria-label="Twitter">
            Twitter
          </a>
          <a href="#" className="text-green-600 hover:text-green-500 transition" aria-label="LinkedIn">
            LinkedIn
          </a>
          <a href="#" className="text-purple-600 hover:text-purple-500 transition" aria-label="Facebook">
            Facebook
          </a>
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
      `}</style>
    </footer>
  );
};

export default FooterCTA;