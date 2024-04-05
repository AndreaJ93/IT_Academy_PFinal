import { Link, Outlet, useLocation } from "react-router-dom";
import { home } from "../assets/svgs";
import { useEffect, useState } from "react";
import LogOut from "../features/auth/LogOut";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setIsFriendProfile, setSelectedBook } from "../redux/dataSlice";

const Config = () => {
  const location = useLocation();
  const [title, setTitle] = useState("Menú");
  const dispatch = useAppDispatch();
  const FriendData = useAppSelector((state) => state.data.actualFriend);

  useEffect(() => {
    if (location.pathname === "/home") {
      setTitle("Menú");
    } else if (location.pathname === "/profile") {
      setTitle("Mi Perfil");
    } else if (location.pathname === "/statistics") {
      setTitle("Estadísticas");
    } else if (location.pathname === "/myshelf") {
      setTitle("Mi Biblioteca");
    } else if (location.pathname === "/competition") {
      setTitle("Competición");
    } else if (location.pathname === "/search") {
      setTitle("Búsqueda");
    } else if (location.pathname === "/friends") {
      setTitle("Amigos");
    } else if (location.pathname === "/friendshelf") {
      setTitle(`Biblioteca de ${FriendData?.userName}`);
    }
  }, [location]);

  return (
    <div className="">
      <div className="p-3 grid grid-cols-5 navbar bg-white shadow rounded-bl-3xl">
        <button
          className="rounded-tl-3xl ps-3 text-[#1397AD] underline underline-offset-4"
          onClick={() => {
            dispatch(setIsFriendProfile(false));
            dispatch(setSelectedBook(null));
          }}
        >
          <Link to="/home">{home}</Link>
        </button>
        <h1
          className={`btm-nav-label ps-2 font-semibold justify-center text-[#1397AD] col-span-3`}
        >
          {title}
        </h1>
        <div className="text-xl ms-auto">
          <div className="ps-3 text-[#1397AD]">
            <LogOut></LogOut>
          </div>
        </div>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default Config;
