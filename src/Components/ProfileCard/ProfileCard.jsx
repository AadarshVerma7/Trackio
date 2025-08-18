import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Picture_Aadarsh from "../../assets/Picture_Aadarsh.jpg";
import star from "../../assets/star.svg";
import github from "../../assets/github.svg";
import linkedin from "../../assets/linkedin.svg";

export const ProfileCard = ({
  ProfilePicture = Picture_Aadarsh,
  Name = "Aadarsh Verma",
  role = "Frontend Dev",
  github_id = "AadarshVerma7",
  linkedinUrl = "https://www.linkedin.com/in/aadarsh-verma-59323134a",
  description = "Passionate frontend developer with expertise in React and modern web technologies. Creating beautiful, responsive interfaces with attention to detail and user experience."
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="group relative w-74 h-96 cursor-pointer transform transition-all duration-300 hover:scale-110 hover:shadow-2xl"
      style={{ perspective: "1000px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-750 ${isFlipped ? 'rotate-y-180' : ''}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <div 
          className="absolute inset-0 rounded-3xl overflow-hidden shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${ProfilePicture})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          <div className="relative px-2 py-1 rounded-lg top-6 left-6 bg-[#9a9a98] w-fit z-10">
            <div className="flex gap-1 items-center">
              <img src={star} alt="star" className="h-4" />
              <span className="text-white text-xs">{role}</span>
            </div>
          </div>

          <div className="relative flex justify-center mt-48">
            <h1 className="text-white font-medium text-3xl">{Name}</h1>
          </div>

          {/* Social Popup */}
          <div 
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 translate-y-7 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-1000 ease-in-out"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg flex gap-4">
              <Link 
                to={{ pathname: linkedinUrl }} 
                target="_blank" 
                className="hover:scale-110 transition-transform"
              >
                <img src={linkedin} alt="linkedin" className="h-6 w-8" />
              </Link>
              <Link 
                to={{ pathname: `https://github.com/${github_id}` }} 
                target="_blank" 
                className="hover:scale-110 transition-transform"
              >
                <img src={github} alt="github" className="h-6 w-8" />
              </Link>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div 
          className="absolute inset-0 bg-white rounded-3xl p-6 overflow-hidden"
          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
        >
          <div className="h-full flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{Name}</h2>
            <p className="text-sm text-gray-600 mb-1">{role}</p>
            
            <div className="flex-grow overflow-y-auto py-2">
              <p className="text-gray-700 text-sm">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;