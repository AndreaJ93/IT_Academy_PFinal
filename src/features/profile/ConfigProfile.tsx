import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";

import { useState } from "react";
import {
  setAuthenticated,
  setFavoriteGenres,
  setUser,
  setUserGoal,
  setUserImg,
} from "../../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import ChooseImageProfile from "./components/ChooseImageProfile";
import ChooseGenres from "./components/ChooseGenres";
import ChooseGoal from "./components/ChooseGoal";

const ConfigProfile = () => {
  const user = useAppSelector((state) => state.user);
  const [imgProfile, setImgProfile] = useState<string>(user.userImg);
  const [favGenres, setfavGenres] = useState<string[]>(user.favoriteGenres);
  const [userGoals, setUserGoals] = useState<number>(user.userGoal);
  const [userNameProfile, setUserNameProfile] = useState<string>(user.userName);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleAddConfigProfile() {
    dispatch(setFavoriteGenres(favGenres));
    dispatch(setUserImg(imgProfile));
    dispatch(setUserGoal(userGoals));
    dispatch(setUser(userNameProfile));
    //Añadir información de perfil en la BBDD:
    !user.isAuthenticated
      ? await setDoc(doc(db, "userData", user.userId), {
          userName: userNameProfile,
          userId: user.userId,
          userImg: imgProfile,
          userEmail: user.userEmail,
          userGoal: userGoals,
          favoriteGenres: favGenres,
          friends: [],
          books: [],
          userRanking: 1,
        })
      : await updateDoc(doc(db, "userData", user.userId), {
          userName: userNameProfile,
          userImg: imgProfile,
          userGoal: userGoals,
          favoriteGenres: favGenres,
        });

    dispatch(setAuthenticated(true));
    navigate("/home");
  }

  return (
    <div className="p-3 min-h-screen items-center grid">
      <div className="p-5 rounded-3xl shadow-md bg-white">
        {!user.isAuthenticated ? (
          <div>
            <h1 className="font-semibold text-xl text-center">
              ¡Bienvenido/a {userNameProfile}!
            </h1>
            <p className="py-3 text-justify">
              Escoge una imagen de perfil haciendo click en el avatar.
            </p>
          </div>
        ) : (
          <div>
            <button className="block btn btn-sm btn-circle btn-ghost ms-auto">
              <Link to="/profile">✕</Link>
            </button>

            <h1 className="font-semibold text-xl text-center pb-3">
              Editar Perfil
            </h1>
          </div>
        )}
        <ChooseImageProfile
          name={user.userName}
          img={user.userImg}
          imgProfile={imgProfile}
          setImgProfile={setImgProfile}
        ></ChooseImageProfile>
        <div>
          {user.isAuthenticated ? (
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Nombre de usuario:</span>
              </div>
              <input
                type="text"
                value={userNameProfile}
                className="input input-bordered w-full max-w-xs  rounded-3xl"
                onChange={(e) => setUserNameProfile(e.target.value)}
              />
            </label>
          ) : null}
        </div>
        <p className="py-3 text-justify">
          ¿Qué categorías literarias prefieres? Escoge tus favoritas.
        </p>
        <ChooseGenres
          favGenres={favGenres}
          setfavGenres={setfavGenres}
        ></ChooseGenres>
        <div>
          <p className="py-3 text-justify">¿Qué meta anual quieres ponerte?</p>
          <ChooseGoal
            userGoals={userGoals}
            setUserGoals={setUserGoals}
          ></ChooseGoal>
        </div>
      </div>
      <button
        className="w-full bg-[#4DA2A9] p-3 rounded-3xl text-white font-semibold text-lg mt-4"
        onClick={handleAddConfigProfile}
      >
        Guardar cambios
      </button>
    </div>
  );
};

export default ConfigProfile;
