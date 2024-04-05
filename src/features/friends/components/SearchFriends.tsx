import { useState } from "react";
import { search } from "../../../assets/svgs";
import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";

import FriendCard from "./FriendCard";

const SearchFriends = () => {
  const [friendEmail, setFriendEmail] = useState<string>("");

  const [friendData, setFriendData] = useState<DocumentData>({});
  const [friendId, setFriendId] = useState<string>("");

  const usersRef = collection(db, "userData");

  async function searchFriends() {
    const friend = query(usersRef, where("userEmail", "==", friendEmail));
    const querySnapshot = await getDocs(friend);
    querySnapshot.forEach((doc) => {
      setFriendId(doc.id);
      setFriendData(doc.data());
    });

    setFriendEmail("");
  }

  return (
    <div className="py-3">
      <label className="input input-bordered flex items-center gap-2 rounded-3xl">
        <input
          type="text"
          className="grow"
          placeholder="Busca amigos por su email"
          value={friendEmail}
          onChange={(e) => {
            setFriendEmail(e.target.value);
          }}
        />
        <button onClick={searchFriends}>{search}</button>
      </label>
      <div>
        {Object.keys(friendData).length > 0 && (
          <FriendCard
            deleteUserFriend={undefined}
            friendData={friendData}
          ></FriendCard>
        )}
      </div>
    </div>
  );
};

export default SearchFriends;
