import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { DocumentData, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Book, UserData, setRankingPosition } from "../../redux/userSlice";
import CompetitionCard from "./components/CompetitionCard";

interface ArrayFriendsAndPages {
  name: string;
  img: string;
  totalPages: number;
}
const Competition = () => {
  const [allFriendsData, setAllFriendsData] = useState<
    UserData[] | DocumentData | undefined
  >([]);
  const friends = useAppSelector((state) => state.user.friends);
  let arrayFriendsandPages: ArrayFriendsAndPages[] = [];
  const user = useAppSelector((state) => state.user);
  const myReadBooks = user.books.filter((book) => book.status === "read");
  let sumMyReadPages: number = 0;
  myReadBooks.map((book: Book) => (sumMyReadPages += book.pages));
  const dispatch = useAppDispatch();

  arrayFriendsandPages.push({
    name: user.userName,
    img: user.userImg,
    totalPages: sumMyReadPages,
  });

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

  allFriendsData &&
    allFriendsData.forEach((friend: UserData) => {
      const readBooks = friend.books.filter(
        (book: Book) => book.status === "read"
      );
      let sumReadPages: number = 0;
      readBooks.map((book: Book) => (sumReadPages += book.pages));
      arrayFriendsandPages.push({
        name: friend.userName,
        img: friend.userImg,
        totalPages: sumReadPages,
      });
    });

  const competitionArraySorted = arrayFriendsandPages.sort(
    (a: ArrayFriendsAndPages, b: ArrayFriendsAndPages) =>
      b.totalPages - a.totalPages
  );

  const indexRankingPosition: number = competitionArraySorted.findIndex(
    (person: ArrayFriendsAndPages) => person.name === user.userName
  );
  let userRankingPosition = indexRankingPosition + 1;

  useEffect(() => {
    const userRef = doc(db, "userData", user.userId);

    async function setRanking() {
      dispatch(setRankingPosition(userRankingPosition));
      await updateDoc(userRef, {
        userRanking: userRankingPosition,
      });
    }

    setRanking();
  }, [userRankingPosition]);

  return (
    <div className="p-3">
      <h1 className="text-xl font-bold text-center p-3">Ranking</h1>
      <div className="">
        {competitionArraySorted &&
          competitionArraySorted.map(
            (person: ArrayFriendsAndPages, index: number) => (
              <div>
                <CompetitionCard
                  name={person.name}
                  img={person.img}
                  index={index}
                  totalPages={person.totalPages}
                ></CompetitionCard>
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default Competition;
