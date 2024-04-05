import { trophy } from "../../../assets/svgs";
import { useAppDispatch } from "../../../redux/hooks";
import { fetchSpecificDataFromFirestore } from "../../../redux/userSlice";

interface Props {
  userRanking: number;
  userId: string;
}
const RankingPosition = ({ userRanking, userId }: Props) => {
  const dispatch = useAppDispatch();
  dispatch(
    fetchSpecificDataFromFirestore({ userId: userId, field: "userRanking" })
  );
  return (
    <div className="p-5 rounded-3xl shadow-md bg-white me-2">
      <div className="grid grid-cols-6 items-center">
        <div className="">{trophy}</div>
        <h1 className="text-md font-bold text-center col-span-5">
          Posición en el ranking:
        </h1>
      </div>
      <p className="py-3 text-center">{`¡${userRanking}ª posición!`}</p>
    </div>
  );
};

export default RankingPosition;
