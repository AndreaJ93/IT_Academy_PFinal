import { Link } from "react-router-dom";
import { star } from "../../assets/svgs";
import ActualReading from "../profile/components/ActualReading";
import BooksCounter from "../profile/components/BooksCounter";
import FavoriteGenres from "../profile/components/FavoriteGenres";
import Profile from "../profile/components/Profile";

import UserGoal from "../profile/components/UserGoal";
import { setIsFriendProfile } from "../../redux/dataSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const FriendProfile = () => {
  const friendData = useAppSelector((state) => state.data.actualFriend);
  const dispatch = useAppDispatch();
  return (
    <div className="p-3">
      {friendData ? (
        <>
          <div className="">
            <Profile
              img={friendData.userImg}
              name={friendData.userName}
            ></Profile>
          </div>
          <div className="flex col gap-2 my-3">
            <div className="rounded-3xl shadow-md bg-white p-2">
              <FavoriteGenres
                genres={friendData.favoriteGenres}
              ></FavoriteGenres>
            </div>
            <div className="h-full">
              <BooksCounter books={friendData.books}></BooksCounter>
            </div>
          </div>
          <div className="p-5 rounded-3xl shadow-md bg-white my-4">
            <ActualReading books={friendData.books}></ActualReading>
          </div>
          <div className="p-5 rounded-3xl shadow-md bg-white my-4">
            <div className="grid grid-cols-6">
              <h1 className="text-md font-bold text-center col-span-5">
                Desafío de lectura de 2024
              </h1>
              <div className="inline-block">{star}</div>
            </div>
            <UserGoal
              goal={friendData.userGoal}
              books={friendData.books}
            ></UserGoal>
          </div>

          <div>
            <button
              onClick={() => dispatch(setIsFriendProfile(true))}
              className="w-full bg-[#4DA2A9] p-3 rounded-3xl text-white font-bold text-lg my-4"
            >
              <Link to="/friendshelf">
                <div>Mostrar biblioteca</div>
              </Link>
            </button>
          </div>
        </>
      ) : (
        "No se puede mostrar el perfil"
      )}
    </div>
  );
};

export default FriendProfile;
