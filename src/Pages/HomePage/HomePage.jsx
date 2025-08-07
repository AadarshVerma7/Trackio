import React from "react";
import target from "../../assets/target.svg";
import skill from "../../assets/skill.svg";
import Code from "../../assets/Code.svg";
import podium from "../../assets/podium.png";

const HomePage = () => {
  return (
    <div className="bg-[#DDD9D6] min-h-screen flex gap-5">
      {/* left section  */}
      <div className="relative top-65 left-20 w-fit h-fit">
        <h1 className="fjalla text-6xl">
          BATTLE YOUR FRIENDS AND
          <br />
          LEARN SIMULTANEOUSLY
        </h1>

        {/* buttons */}
        <div className="flex gap-9 relative top-7 left-4">
          <button className="transform-transition hover:scale-110 duration-300 text-white p-2 px-4 bg-black fjalla text-lg">
            Create Group
          </button>

          <div className="transform-transition hover:scale-110 duration-300 flex gap-2 justify-center items-center">
            <img src={target} alt="target img" className="h-5" />
            <button className="underline text-lg fjalla">Join Group</button>
          </div>
        </div>

        {/* know about us div  */}

        <div className="relative top-22 left-8 bg-gradient-to-br from-[#a8927d] to-[#5b4a3a] rounded-xl w-fit">
          <h1 className="text-2xl fjalla pr-17 pl-7 py-2">
            Know more
            <br />
            About Us!
          </h1>
        </div>
      </div>

      {/* right section  */}
      <div className="h-fit relative left-60 top-47 flex">
        {/* left section */}
        <div className="h-fit z-20">
          <img
            src={skill}
            alt="skill"
            className="h-50 p-3 bg-[#f2ece8] rounded-xl transform -rotate-20 transform transition-all duration-300 hover:scale-110 hover:rotate-8 hover:shadow-2xl "
          />
          <img
            src={podium}
            alt="podium"
            className="h-30 relative h-60 w-50 p-3 bg-[#EE9755] rounded-xl transform transition-all duration-300 hover:scale-110 hover:rotate-6 hover:shadow-2xl"
          />
        </div>

        {/* Right section */}
        <div className="h-fit">
          {/* Grow - Grow and improve your skills*/}
          <div className="flex">
            <div className="h-1 relative top-4 -left-6 w-30 bg-black z-10"></div>
            <img
              src={target}
              alt="target"
              className="h-5 top-2 -left-6 relative"
            />
            <h1 className="fjalla text-2xl relative top-1 -left-3 underline">
              Grow
            </h1>
          </div>

          {/* Grow Tagline  */}
          <div className="relative top-2 left-17">
            <h1 className="fjalla text-lg">
              Grow and improve your skills <br />
              along with others.
            </h1>
          </div>


          {/* Learn portion */}
          <div className="flex">
            <div className="relative top-10 left-10">
              <div className="relative z-20">
                <img src={Code} alt="code" className="h-45 bg-white border-15 rounded-xl rotate-20 p-3 transition-transform duration-500 hover:[transform:rotateX(15deg)rotateY(15deg)scale(1.1)] hover:shadow-2xl"/>
              </div>
              <div className="h-1 absolute top-10 left-30 w-40 bg-black z-10"></div>
            </div>

            <div>
              <div className="w-1 h-6 bg-black relative left-35 top-20"></div>
              <img src={target} alt="target" className="h-5 relative left-33 top-20"/>
              <h1 className="fjalla relative left-30 top-20 text-2xl underline">Learn</h1>
              <h1 className="fjalla text-lg relative top-22 left-19">Learn new concepts <br />you are interested in.</h1>
            </div>
          </div>

          {/* Compete Portion  */}
          <div className="flex">
            <div className="h-1 relative top-35 -left-6 w-35 bg-black "></div>
            <img src={target} alt="target" className="h-5 relative -left-6 top-33"/>
            <h1 className="fjalla relative top-32 underline -left-4 text-2xl">Compete</h1>
          </div>
          <div>
            <h1 className="relative fjalla text-lg top-34 left-7">Share your progress with friends and compete <br />to stay on top of the leaderboard.</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
