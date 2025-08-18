import React, { useState, useRef } from "react";
import target from "../../assets/target.svg";
import skill from "../../assets/skill.svg";
import Code from "../../assets/Code.svg";
import podium from "../../assets/podium.png";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import SvgAnimator from "../../Components/SvgAnimator/SvgAnimator";
import "./HomePage.css";
import MovableDiv from "./MovableDiv";

const HomePage = () => {
  const parentRef = useRef(null);
  const [flippedCards, setFlippedCards] = useState([false, false, false]);

  const cardWidth = 600;
  const movableWidth = 50;

  const handleMovableMove = (pos) => {
    const parentRect = parentRef.current.getBoundingClientRect();
    const movableCenter = pos.x + movableWidth / 2;

    // Card positions (adjust offsets according to your layout)
    const leftSmall = 50 / 2;
    const leftBig = 50 + cardWidth / 2;
    const rightBig = 50 + cardWidth + 20 + cardWidth / 2; // 20 = gap

    setFlippedCards([
      movableCenter >= leftSmall,
      movableCenter >= leftBig,
      movableCenter >= rightBig,
    ]);
  };

  return (
    <div className="bg-[#DDD9D6] min-h-screen">
      <div className="max-w-screen-2xl mx-auto flex gap-5 relative">
        {/* Left Section */}
        <div className="relative w-fit h-fit">
          <div className="relative top-50 left-20">
            <h1 className="fjalla text-6xl">
              BATTLE YOUR FRIENDS AND
              <br />
              LEARN SIMULTANEOUSLY
            </h1>

            <div className="flex gap-9 relative top-7 left-4">
              <button className="transform-transition hover:scale-110 duration-300 text-white p-2 px-4 bg-black fjalla text-lg">
                Create Group
              </button>

              <div className="transform-transition hover:scale-110 duration-300 flex gap-2 justify-center items-center">
                <img src={target} alt="target img" className="h-5" />
                <button className="underline text-lg fjalla">Join Group</button>
              </div>
            </div>

            <div className="relative top-22 left-8 bg-gradient-to-br from-[#a8927d] to-[#5b4a3a] rounded-xl w-80">
              <h1 className="text-2xl fjalla pr-17 pl-7 py-2">
                Know more
                <br />
                About Us!
              </h1>
            </div>

            {/* SVGs and ProfileCards */}
            <div className="relative top-22 left-16 min-h-[400px]">
              <SvgAnimator
                pathData="M3.9998 0.960349 L12.0295 810.96"
                stroke="black"
                strokeWidth={8}
                viewBox="0 0 17 811"
                className="absolute w-3 left-150 top-40 h-270"
              />
              <SvgAnimator
                pathData="M220.964 5.99983 L0.963631 3.99983"
                stroke="black"
                strokeWidth={6}
                viewBox="0 0 221 10"
                className="absolute  top-80 -right-4"
              />
              <div className="absolute top-48 left-3 autoShow">
                <ProfileCard />
              </div>
              <SvgAnimator
                pathData="M0.964914 6.00015 L228.965 4.00015"
                stroke="black"
                strokeWidth={6}
                viewBox="0 0 229 10"
                className="absolute top-140 -right-80"
              />
              <div className="absolute top-98 -right-150 autoShow">
                <ProfileCard />
              </div>
              <SvgAnimator
                pathData="M217 4 L0 4"
                stroke="black"
                strokeWidth={6}
                viewBox="0 0 217 8"
                className="absolute top-200 -right-5"
              />
              <div className="absolute top-168 left-3 autoShow">
                <ProfileCard />
              </div>
              <SvgAnimator
                pathData="M0.947373 7.00035 L228.947 4.00035"
                stroke="black"
                strokeWidth={6}
                viewBox="0 0 229 11"
                className="absolute top-250 -right-80"
              />
              <div className="absolute top-218 -right-150 autoShow">
                <ProfileCard />
              </div>

            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="h-fit relative left-60 top-27 flex">
          <div className="h-fit z-20">
            <img src={skill} alt="skill" className="h-50 p-3 bg-[#f2ece8] rounded-xl -rotate-20 transform transition-all duration-300 hover:scale-110 hover:rotate-8 hover:shadow-2xl " />
            <img src={podium} alt="podium" className="relative h-60 w-50 p-3 bg-[#EE9755] rounded-xl transform transition-all duration-300 hover:scale-110 hover:rotate-6 hover:shadow-2xl" />
          </div>
          <div className="h-fit">
            {/* Grow */}
            <div className="flex">
              <div className="h-1 relative top-4 -left-6 w-30 bg-black z-10"></div>
              <img src={target} alt="target" className="h-5 top-2 -left-6 relative" />
              <h1 className="fjalla text-2xl relative top-1 -left-3 underline"> Grow </h1>
            </div>
            <div className="relative top-2 left-17">
              <h1 className="fjalla text-lg">
                Grow and improve your skills
                <br /> along with others.
              </h1>
            </div>
            {/* Learn portion */}
            <div className="flex">
              <div className="relative top-10 left-10">
                <div className="relative z-20">
                  <img src={Code} alt="code" className="h-45 bg-white border-15 rounded-xl rotate-20 p-3 transition-transform duration-500 hover:[transform:rotateX(15deg)rotateY(15deg)scale(1.1)] hover:shadow-2xl" />
                </div>
                <div className="h-1 absolute top-10 left-30 w-40 bg-black z-10"></div>
              </div>
              <div>
                <div className="w-1 h-6 bg-black relative left-35 top-20"></div>
                <img src={target} alt="target" className="h-5 relative left-33 top-20" />
                <h1 className="fjalla relative left-30 top-20 text-2xl underline"> Learn </h1>
                <h1 className="fjalla text-lg relative top-22 left-19">
                  Learn new concepts
                  <br />
                  you are interested in.
                </h1>
              </div>
            </div>
            {/* Compete Portion */}
            <div className="flex">
              <div className="h-1 relative top-35 -left-6 w-35 bg-black "></div>
              <img src={target} alt="target" className="h-5 relative -left-6 top-33" />
              <h1 className="fjalla relative top-32 underline -left-4 text-2xl"> Compete </h1>
            </div>
            <div>
              <h1 className="relative fjalla text-lg top-34 left-7">
                Share your progress with friends and compete
                <br />
                to stay on top of the leaderboard.
              </h1>
            </div>
          </div>
        </div>
      </div>
      {/* Flippable Cards with MovableDiv */}
      <div
        ref={parentRef}
        className="flex absolute w-full mt-285 gap-10 p-25 autoShow"
      >
        <MovableDiv
          parentRef={parentRef}
          onMove={handleMovableMove}
          width={movableWidth}
          height={550}
        />

        {/* Left Big Card */}
        <div
          className="relative w-[600px] h-[550px] border-2 mx-5"
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
            transform: flippedCards[1] ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <div className="absolute w-full h-full bg-red-400 flex items-center justify-center backface-hidden">
            Front Content
          </div>
          <div
            className="absolute w-full h-full bg-green-400 flex items-center justify-center backface-hidden"
            style={{ transform: "rotateY(180deg)" }}
          >
            Back Content
          </div>
        </div>

        {/* Right Big Card */}
        <div
          className="relative w-[600px] h-[550px] border-2 mx-5"
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
            transform: flippedCards[2] ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <div className="absolute w-full h-full bg-orange-500 flex items-center justify-center backface-hidden">
            Front Content
          </div>
          <div
            className="absolute w-full h-full bg-blue-500 flex items-center justify-center backface-hidden"
            style={{ transform: "rotateY(180deg)" }}
          >
            Back Content
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
