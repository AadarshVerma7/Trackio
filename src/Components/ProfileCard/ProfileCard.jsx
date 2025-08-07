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
}) => {
  return (
    <>
      {/* card outer */}
      <div
        className="h-120 w-85 rounded-3xl bg-cover bg-center"
        style={{ backgroundImage: `url(${ProfilePicture})` }}
      >
        <div className="relative left-29 px-2 py-1 rounded-lg top-6 bg-[#9a9a98] w-fit">
          <div className="flex gap-1">
            <img src={star} alt="star" className="h-4" />
            <h1 className="text-white text-xs">{role}</h1>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <h1 className="text-white font-medium text-3xl">{Name}</h1>
        </div>

        <div className="flex justify-between items-center p-3 relative top-75 py-3 bg-white/10 backdrop-blur rounded-full mx-4">
          <div className="flex gap-2 z-10 items-center">
            <img src={github} alt="github" className="h-5" />
            <h1 className="text-white font-semibold">{github_id}</h1>
          </div>
          <a href={linkedinUrl} target="blank" rel="noopener noreferrer">
            <div className="z-20 flex gap-2">
              <button className="bg-white py-3 px-4 flex  items-center gap-2 font-medium rounded-full">
                <img src={linkedin} alt="linkedin" className="h-5 " />
                Connect
              </button>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
