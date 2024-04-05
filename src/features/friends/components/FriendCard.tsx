import { Link, useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { addUser, check, deleteUser } from "../../../assets/svgs";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { UserData, setFriends } from "../../../redux/userSlice";
import { setActualFriend } from "../../../redux/dataSlice";

interface Props {
  friendData: UserData | any;
  deleteUserFriend?: (arg0: string) => void;
}
const FriendCard = ({ friendData, deleteUserFriend }: Props) => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const userRef = doc(db, "userData", user.userId);
  const firstLetter = friendData?.userName.split("")[0];
  const location = useLocation();

  async function addFriend() {
    await updateDoc(userRef, {
      friends: arrayUnion(friendData?.userId),
    });
    dispatch(setFriends(friendData?.userId));
  }

  function getFriendData(friendData: UserData) {
    dispatch(setActualFriend(friendData));
  }

  return (
    <div className="p-5 rounded-3xl shadow-md bg-white mt-3 grid grid-cols-3">
      {friendData?.userImg ? (
        <img
          className="border-4 border-[#9CBED3] rounded-full"
          src={friendData?.userImg}
          alt="Friend Image"
        />
      ) : (
        <div className="border-4 border-[#9CBED3] rounded-full w-24 h-24 grid justify-center items-center bg-black">
          <span className="text-3xl text-bold text-white">{firstLetter}</span>
        </div>
      )}
      <div className="ps-3">
        <Link to="/friendprofile">
          <h1
            onClick={() => {
              friendData && getFriendData(friendData);
            }}
            className="font-bold text-lg"
          >
            {friendData?.userName}
          </h1>
        </Link>
        <p>{friendData?.userEmail}</p>
      </div>

      {location.pathname === "/friends/searchfriends" &&
      user.friends.some((friend) => friend === friendData?.userId) ? (
        <div className="col-start-3 flex items-end self-end justify-self-end">
          {check}
        </div>
      ) : location.pathname === "/friends/searchfriends" &&
        user.friends.some((friend) => friend === friendData?.userId) ===
          false ? (
        <div className="col-start-3 flex items-end self-end justify-self-end">
          <button onClick={addFriend}>{addUser}</button>
        </div>
      ) : location.pathname === "/friends/listoffriends" ||
        (location.pathname === "/friends" &&
          user.friends.some((friend) => friend === friendData?.userId)) ? (
        <div className="col-start-3 flex items-end self-end justify-self-end">
          <button
            onClick={() => {
              deleteUserFriend && deleteUserFriend(friendData?.userId);
            }}
          >
            {deleteUser}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default FriendCard;
