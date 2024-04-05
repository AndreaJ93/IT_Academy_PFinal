import { Link, useLocation } from "react-router-dom";
import { pencilSquare } from "../../../assets/svgs";

interface Props {
  img: string;
  name: string;
}
const Profile = ({ img, name }: Props) => {
  let firstLetter = name.split("")[0];
  const location = useLocation();

  return (
    <div className="grid grid-cols-2 py-2">
      <div className="pe-6">
        <Link to="/profile">
          {img !== "" && img !== null ? (
            <div className="rounded-full shadow-lg shadow-white border border-4 border-[#9CBED3]">
              <img src={img} className="rounded-full" />
            </div>
          ) : (
            <div className="border-4 border-[#9CBED3] rounded-full w-28 h-28 grid justify-center items-center bg-black">
              <span className="text-3xl text-bold text-white">
                {firstLetter}
              </span>
            </div>
          )}
        </Link>
      </div>
      <div className="grid items-center">
        <div className="grid grid-cols-4">
          <h1 className="font-bold text-xl col-span-3 text-center">
            {location.pathname === "/home" ? `¡Hola ${name}!` : name}
          </h1>
          <div>
            {location.pathname === "/profile" ? (
              <div>
                <Link to="/configprofile">
                  <button>{pencilSquare}</button>
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
