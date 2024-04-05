import { useState } from "react";
import OnBoardingCard from "./components/OnBoargingCard";
import { useAppSelector } from "../../redux/hooks";
import { Link } from "react-router-dom";

const OnBoarding = () => {
  const [active, setActive] = useState<string>("");
  const onBoardingData = useAppSelector((state) => state.data.onboardingArray);
  return (
    <div className="mx-auto pt-6">
      <div className="carousel w-full">
        {onBoardingData.map((item, index) => (
          <div id={`${index}`} className="carousel-item w-full">
            <OnBoardingCard
              img={item.onBoardingImages}
              title={item.onboardingTitle}
              description={item.onBoardingDescription}
            ></OnBoardingCard>
          </div>
        ))}
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        {onBoardingData.map((_, index) => (
          <a
            href={`#${index}`}
            className="btn btn-xs bg-transparent border-none shadow-none"
            onClick={() => {
              setActive(`${index}`);
            }}
          >
            <div
              className={`${
                active === `${index}` ? "bg-black" : "bg-[#7F7F7F]"
              } rounded-full`}
              style={{ width: "10px", height: "10px" }}
            ></div>
          </a>
        ))}
      </div>
      <div className="px-6">
        <Link to="/login">
          <button className="w-full bg-[#4DA2A9] p-3 rounded-3xl text-white font-bold text-lg">
            Comenzar{" "}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OnBoarding;
