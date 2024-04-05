import { useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import ChooseImageProfile from "./ChooseImageProfile";

interface Props {
  setOpenEditModal: (arg0: boolean) => void;
}
const EditProfileModal = ({ setOpenEditModal }: Props) => {
  const user = useAppSelector((state) => state.user);
  const [imgProfile, setImgProfile] = useState<string>(user.userImg);
  const [userNameProfile, setUserNameProfile] = useState<string>(user.userName);
  return (
    <dialog className="modal" open>
      <div className="modal-box w-11/12 max-w-5xl text-center">
        <ChooseImageProfile
          name={user.userName}
          img={user.userImg}
          imgProfile={imgProfile}
          setImgProfile={setImgProfile}
        ></ChooseImageProfile>
        <p className="py-4 font-bold"></p>
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
        <div className="modal-action mx-auto">
          <button className="btn">Aceptar</button>
          <button className="btn" onClick={() => setOpenEditModal(false)}>
            Cancelar
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default EditProfileModal;
