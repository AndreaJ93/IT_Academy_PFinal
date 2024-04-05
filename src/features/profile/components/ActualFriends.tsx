import { useAppSelector } from "../../../redux/hooks";
import { UserData } from "../../../redux/userSlice";

interface Props {
  friends: string[];
}
const ActualFriends = ({ friends }: Props) => {
  const images = useAppSelector((state) => state.data.images);
  return (
    <div>
      <div className="stack border border-4 border-[#9CBED3] rounded-full">
        {images.map((img) => (
          <img src={img} className="mask mask-circle shadow"></img>
        ))}
      </div>
      <p className="py-2 text-center">
        {friends.length === 1
          ? `${friends.length} Amigo`
          : `${friends.length} Amigos`}{" "}
      </p>
    </div>
  );
};

export default ActualFriends;
