import React, { memo } from "react";
import Marquee from "react-fast-marquee";

// Partner arrays
const governmentPartners: string[] = [
  "https://res.cloudinary.com/dgtc2fvgu/image/upload/c_scale,w_200/v1735042390/Ministry_of_Heavy_Industries_India.svg_fhp1cc.png",
  "https://res.cloudinary.com/dgtc2fvgu/image/upload/c_scale,w_200/v1735042392/ombadc_rmdidp.png",
  "https://res.cloudinary.com/dgtc2fvgu/image/upload/c_scale,w_200/v1735042389/Ministry_of_Coal_India.svg_fyx0tc.png",
  "https://res.cloudinary.com/dgtc2fvgu/image/upload/c_scale,w_200/v1735041145/NSDC_luqbyd.png",
  "https://res.cloudinary.com/dgtc2fvgu/image/upload/c_scale,w_200/v1735042390/Ministry_of_Mines_India.svg_hpnvzl.png",
  "https://res.cloudinary.com/dgtc2fvgu/image/upload/c_scale,w_200/v1735042395/IISSSc_zizo9i.jpg",
  "https://res.cloudinary.com/dgtc2fvgu/image/upload/c_scale,w_200/v1735042391/Ministry_of_Skill_Development_and_Entrepreneurship.svg_sbogu0.png",
  "https://res.cloudinary.com/dgtc2fvgu/image/upload/c_scale,w_200/v1735042394/logo_1_gmmcfc.png",
  "https://res.cloudinary.com/dgtc2fvgu/image/upload/c_scale,w_200/v1735042396/scms_arwl5f.png",
  "https://res.cloudinary.com/dgtc2fvgu/image/upload/c_scale,w_200/v1735042585/Screenshot_2024-12-24_at_5.37.59_PM_eyqoun.png",
  "https://res.cloudinary.com/dgtc2fvgu/image/upload/c_scale,w_200/v1735042586/Screenshot_2024-12-24_at_5.35.44_PM_c0akgs.png",
];

const corporatePartners: string[] = [
  "https://res.cloudinary.com/dgtc2fvgu/image/upload/c_scale,w_200/v1735042701/asci_xexfdv.png",
  "https://res.cloudinary.com/dgtc2fvgu/image/upload/c_scale,w_200/v1735041141/JINDAL_STEEL_wpau1m.png",
  "https://res.cloudinary.com/dgtc2fvgu/image/upload/c_scale,w_200/v1735041151/TATA_STEEL_hoirtn.png",
  "https://res.cloudinary.com/dgtc2fvgu/image/upload/c_scale,w_200/v1735041150/TATA_POWER_uayv1g.png",
  "https://res.cloudinary.com/dgtc2fvgu/image/upload/c_scale,w_200/v1735043985/Coal_India_Logo.svg_wwns1e.png",
  "https://res.cloudinary.com/dgtc2fvgu/image/upload/c_scale,w_200/v1735043985/Adani_2012_logo_tt0z21.png",
  "https://res.cloudinary.com/dgtc2fvgu/image/upload/c_scale,w_200/v1735044118/mcl_kjvbs7.png",
  "https://res.cloudinary.com/dgtc2fvgu/image/upload/c_scale,w_200/v1735044295/NLC_India_Limited.svg_ks2rjp.png",
  "https://res.cloudinary.com/dgtc2fvgu/image/upload/c_scale,w_200/v1735044515/Tata_Chemicals_Limited_-_Logo.svg_s5e9qn.png",
  "https://res.cloudinary.com/dgtc2fvgu/image/upload/c_scale,w_200/v1735044527/pngwing.com_bt3ngg.png",
];

const multilateralPartners: string[] = [
  "https://res.cloudinary.com/dgtc2fvgu/image/upload/c_scale,w_200/v1735041153/UNICEF_bgidzk.png",
  "https://res.cloudinary.com/dgtc2fvgu/image/upload/c_scale,w_200/v1735041138/GIZ_bsb7es.png",
  "https://res.cloudinary.com/dgtc2fvgu/image/upload/c_scale,w_200/v1735045063/United_Nations_Environment_Programme_Logo.svg_rp7oev.png",
  "https://res.cloudinary.com/dgtc2fvgu/image/upload/c_scale,w_200/v1735045063/UNIDO_Logo.svg_khx62n.png",
  "https://res.cloudinary.com/dgtc2fvgu/image/upload/c_scale,w_200/v1735045063/International_Labour_Organization_Logo.svg_fukuuq.png",
  "https://res.cloudinary.com/dgtc2fvgu/image/upload/c_scale,w_200/v1735045062/undp-logo-blue_wrebhi.svg",
];

interface PartnerSectionProps {
  title: string;
  partners: string[];
  direction: "left" | "right";
  borderSide: "r" | "l";
}

// Partner Section
const PartnerSection: React.FC<PartnerSectionProps> = memo(
  ({ title, partners, direction, borderSide }) => {
    const borderClass =
      borderSide === "r" ? "border-r-4 border-green-600" : "border-l-4 border-green-600";

    return (
      <div className="relative flex justify-center items-center py-24">
        <div className="w-full relative z-10">
          <div className="flex flex-col items-center justify-center">
            <div className="absolute z-20 h-44 w-44 rounded-full bg-black -top-10 flex flex-col justify-center items-center">
              {/* Circle border */}
              <div className={`absolute top-0 left-0 w-full h-full rounded-full ${borderClass}`}></div>
              {/* Top & bottom dots */}
              <div className="absolute -top-[5px] h-3 w-3 rounded-full bg-green-600"></div>
              <div className="absolute -bottom-[5px] h-3 w-3 rounded-full bg-green-600"></div>
              {/* Inner circle with title */}
              <div className="w-36 h-36 py-16 px-8 bg-green-600 rounded-full flex justify-center items-center">
                <span className="text-xl text-white font-bold">{title}</span>
              </div>
            </div>
          </div>
          {/* Logos Marquee */}
          <Marquee gradient={false} speed={50} direction={direction} pauseOnHover>
            {partners.map((logo, index) => (
              <div
                key={index}
                className="mx-6"
                style={{ width: "200px", height: "80px" }}
              >
                <img
                  src={logo}
                  alt={`${title} Partner ${index + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  loading="lazy"
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/150")
                  }
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    );
  }
);
PartnerSection.displayName = "PartnerSection";

// Our Partners Section
const Partners: React.FC = () => {
  return (
    <div className="relative bg-black flex flex-col justify-center items-center py-14 px-4 sm:px-12 overflow-hidden">
      {/* Background Blurred Color Circles */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-pink-500 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-32 right-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute top-1/2 left-1/4 w-28 h-28 bg-green-400 rounded-full blur-2xl opacity-30"></div>
      <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-yellow-500 rounded-full blur-2xl opacity-20"></div>

      {/* Extra small blurred circles for depth */}
      <div className="absolute top-10 right-1/3 w-16 h-16 bg-purple-500 rounded-full blur-xl opacity-40"></div>
      <div className="absolute top-1/4 right-10 w-12 h-12 bg-purple-500 rounded-full blur-lg opacity-40"></div>
      <div className="absolute bottom-20 left-10 w-14 h-14 bg-blue-400 rounded-full blur-lg opacity-30"></div>
      <div className="absolute bottom-1/4 right-1/2 w-10 h-10 bg-green-500 rounded-full blur-md opacity-40"></div>
      <div className="absolute top-2/3 left-1/5 w-20 h-20 bg-orange-500 rounded-full blur-2xl opacity-30"></div>

      {/* Heading */}
      <div className="flex justify-center mb-6 relative z-10">
        <h1 className="text-4xl sm:text-4xl font-bold text-green-600 px-6 py-2 rounded-lg shadow-lg">
          OUR PARTNERS
        </h1>
      </div>

      {/* Timeline with Sections */}
      <div className="relative w-full">
        {/* Vertical Dashed Line */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-[3px] h-[550px] border-l-[3px] border-dashed border-green-600 z-0"></div>

        <PartnerSection
          title="Government"
          partners={governmentPartners}
          direction="left"
          borderSide="r"
        />
        <PartnerSection
          title="Corporate"
          partners={corporatePartners}
          direction="right"
          borderSide="l"
        />
        <PartnerSection
          title="Multilaterals"
          partners={multilateralPartners}
          direction="left"
          borderSide="r"
        />
      </div>
    </div>
  );
};

export default memo(Partners);
