import MainButton from "./components/MainButton";
import Profile from "../profile/components/Profile";
import {
  bookmarkBig,
  chartBig,
  friendsBig,
  searchBig,
  trophyBig,
} from "../../assets/svgs";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import UserGoal from "../profile/components/UserGoal";

const MainPage = () => {
  const img = useAppSelector((state) => state.user.userImg);
  const name = useAppSelector((state) => state.user.userName);
  const friends = useAppSelector((state) => state.user.friends);
  const books = useAppSelector((state) => state.user.books);
  const goal = useAppSelector((state) => state.user.userGoal);
  const sections = [
    {
      section: "Mi Biblioteca",
      icon: bookmarkBig,
      path: "/myshelf",
    },
    {
      section: "Competición",
      icon: trophyBig,
      path: "/competition",
    },
    {
      section: "Estadísticas",
      icon: chartBig,
      path: "/statistics",
    },
    {
      section: "Amigos",
      icon: friendsBig,
      path: "/friends",
    },
  ];

  return (
    <>
      <div>
        <div className=" ">
          <div className="p-3">
            <Profile img={img} name={name}></Profile>
          </div>
          <div className="bg-white rounded-3xl shadow-md mx-3">
            <UserGoal books={books} goal={goal}></UserGoal>
          </div>
        </div>
        <div className="p-3">
          <div className="grid grid-cols-2 gap-3 h-full">
            {sections.map((section) => (
              <MainButton
                section={section.section}
                icon={section.icon}
                key={section.section}
                path={section.path}
              ></MainButton>
            ))}
          </div>
        </div>
        <div className=" shadow-md p-3 rounded-3xl mx-3 grid justify-center bg-white">
          <button className="">
            <Link to="/search">
              <div className="grid grid-cols-3 ">
                <div>{searchBig}</div>
                <h1 className="font-semibold text-center self-center text-lg col-span-2">
                  Buscar libros
                </h1>
              </div>
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default MainPage;
