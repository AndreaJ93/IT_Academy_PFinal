import { signInWithEmailAndPassword } from "firebase/auth";
import { key, mail } from "../../assets/svgs";
import { useState } from "react";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteAllFriends,
  fetchDataFromFirestore,
  setAuthenticated,
  setBooks,
  setFavoriteGenres,
  setRankingPosition,
  setUser,
  setUserEmail,
  setUserGoal,
  setUserId,
  setUserImg,
} from "../../redux/userSlice";
import Loader from "../../components/Loader";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogIn = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    setLoading(true);
    e.preventDefault();

    dispatch(setFavoriteGenres([]));
    dispatch(setUserImg(""));
    dispatch(setUserGoal(0));
    dispatch(setUser(""));
    dispatch(deleteAllFriends());
    dispatch(setBooks([]));
    dispatch(setRankingPosition(1));

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      dispatch(setUser(user?.displayName));
      dispatch(setUserId(user?.uid));
      dispatch(setUserEmail(user?.email));
      user && dispatch<any>(fetchDataFromFirestore(user.uid));
      dispatch(setAuthenticated(true));
      //Guardar user en local:
      const userDataJSON = JSON.stringify({
        userName: user?.displayName,
        userId: user?.uid,
        userEmail: user?.email,
      });
      localStorage.setItem("userData", userDataJSON);
      //Navegar a la home:
      navigate("/home");
    } catch (error: any) {
      console.error("Error during sign-up:", error);
      if (error.code === "auth/invalid-credential") {
        alert(
          "Invalid email or password. Please enter the correct email or password."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 min-h-screen items-center grid">
      <form className="p-5 rounded-3xl shadow-md bg-white">
        <label className="input input-bordered flex items-center gap-2 rounded-3xl my-3">
          {mail}
          <input
            type="text"
            className="grow"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 rounded-3xl my-3">
          {key}
          <input
            type="password"
            className="grow"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          className="w-full bg-[#4DA2A9] p-3 rounded-3xl text-white font-bold text-lg"
          onClick={handleLogIn}
        >
          {loading ? <Loader color={"white"}></Loader> : "Log In"}
        </button>
        <div className="text-end">
          <p className="text-sm p-3">
            Si todavía no tienes una cuenta.<br></br> Regístrate
            <Link to="/signup">
              <span className="text-accent"> aquí</span>
            </Link>
            .
          </p>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
