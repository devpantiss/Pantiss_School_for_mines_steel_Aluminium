import React from 'react';

interface LoaderProps {
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        <div className="relative w-8 h-8">
          <div
            className="absolute w-full h-full rounded-full border-[2px] border-gray-100/10 border-r-[#0ff] border-b-[#0ff] animate-spin"
            style={{ animationDuration: '3s' }}
          ></div>
          <div
            className="absolute w-full h-full rounded-full border-[2px] border-gray-100/10 border-t-[#0ff] animate-spin"
            style={{ animationDuration: '2s', animationDirection: 'reverse' }}
          ></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0ff]/10 via-transparent to-[#0ff]/5 animate-pulse rounded-full blur-sm"></div>
      </div>
    </div>
  );
};

export default Loader;