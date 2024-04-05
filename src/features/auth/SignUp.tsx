import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { key, mail, user } from "../../assets/svgs";
import { useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteAllFriends,
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

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignUp = async (
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
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await updateProfile(user, {
          displayName: userName,
        });
        dispatch(setUser(user.displayName));
        dispatch(setUserId(user.uid));
        dispatch(setUserEmail(user.email));
      }
      navigate("/configprofile");
    } catch (error: any) {
      console.error("Error during sign-up:", error);
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already in use. Please enter another email.");
      }
      if (error.code === "auth/invalid-email") {
        alert("This email is invalid. Please enter a correct email.");
      }
      if (error.code === "auth/weak-password") {
        alert("Password should be at least 6 characters.");
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
          {user}
          <input
            type="text"
            className="grow"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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
          onClick={handleSignUp}
        >
          {loading ? <Loader color={"white"}></Loader> : "Crear Cuenta"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
