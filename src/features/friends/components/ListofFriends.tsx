import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  DocumentData,
  arrayRemove,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import FriendCard from "./FriendCard";

import { UserData, deleteFriend } from "../../../redux/userSlice";

const ListofFriends = () => {
  const [allFriendsData, setAllFriendsData] = useState<
    (UserData | DocumentData | undefined)[]
  >([]);
  const friends = useAppSelector((state) => state.user.friends);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const userRef = doc(db, "userData", user.userId);

  useEffect(() => {
    const fetchFriendsData = async () => {
      const promises = friends.map(async (friend) => {
        const friendRef = doc(db, "userData", friend);
        const docSnap = await getDoc(friendRef);
        return docSnap.data();
      });

      const allFriendsData = await Promise.all(promises);
      setAllFriendsData(allFriendsData);
    };

    fetchFriendsData();
  }, []);

  async function deleteUserFriend(friendId: string) {
    await updateDoc(userRef, {
      friends: arrayRemove(friendId),
    });
    dispatch(deleteFriend(friendId));
    const newAllFriendsData = allFriendsData.filter(
      (friend) => friend?.userId !== friendId
    );
    setAllFriendsData(newAllFriendsData);
  }

  return (
    <div>
      {allFriendsData.length > 0 ? (
        allFriendsData.map((friend, index) => (
          <div key={index} className="">
            <FriendCard
              deleteUserFriend={deleteUserFriend}
              friendData={friend}
            ></FriendCard>
          </div>
        ))
      ) : (
        <div className="text-center p-4">
          No tienes amigos agregados todavía
        </div>
      )}
    </div>
  );
};

export default ListofFriends;
