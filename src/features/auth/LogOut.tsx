import { useNavigate } from "react-router-dom";
import { logout } from "../../assets/svgs";
import { auth } from "../../firebase";
import { useAppDispatch } from "../../redux/hooks";
import {
  deleteAllFriends,
  setAuthenticated,
  setBooks,
  setFavoriteGenres,
  setRankingPosition,
  setUser,
  setUserGoal,
  setUserImg,
} from "../../redux/userSlice";

const LogOut = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch(setAuthenticated(false));
      dispatch(setFavoriteGenres([]));
      dispatch(setUserImg(""));
      dispatch(setUser(""));
      dispatch(setUserGoal(0));
      dispatch(deleteAllFriends());
      dispatch(setBooks([]));
      dispatch(setRankingPosition(1));
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="p-3 font-semibold hover:text-white"
    >
      {logout}
    </button>
  );
};

export default LogOut;
