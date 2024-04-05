import { star } from "../../assets/svgs";
import ActualFriends from "./components/ActualFriends";
import ActualReading from "./components/ActualReading";
import BooksCounter from "./components/BooksCounter";
import FavoriteGenres from "./components/FavoriteGenres";
import Profile from "./components/Profile";
import RankingPosition from "./components/RankingPosition";
import UserGoal from "./components/UserGoal";
import { useAppSelector } from "../../redux/hooks";

const ProfilePage = () => {
  const user = useAppSelector((state) => state.user);

  return (
    <div className="p-3">
      <div>
        <Profile img={user.userImg} name={user.userName}></Profile>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="p-5 rounded-3xl shadow-md bg-white col-span-2">
          <FavoriteGenres genres={user.favoriteGenres}></FavoriteGenres>
        </div>
        <div className="p-3 rounded-3xl shadow-md bg-white">
          <ActualFriends friends={user.friends}></ActualFriends>
        </div>
      </div>

      <div className="p-5 rounded-3xl shadow-md bg-white my-4">
        <ActualReading books={user.books}></ActualReading>
      </div>
      <div className="p-5 rounded-3xl shadow-md bg-white my-4">
        <div className="grid grid-cols-6">
          <h1 className="text-md font-bold text-center col-span-5">
            Desafío de lectura de 2024
          </h1>
          <div className="inline-block">{star}</div>
        </div>
        <UserGoal goal={user.userGoal} books={user.books}></UserGoal>
      </div>
      <div className="grid grid-cols-2">
        <RankingPosition
          userRanking={user.userRanking}
          userId={user.userId}
        ></RankingPosition>
        <BooksCounter books={user.books}></BooksCounter>
      </div>
    </div>
  );
};

export default ProfilePage;
