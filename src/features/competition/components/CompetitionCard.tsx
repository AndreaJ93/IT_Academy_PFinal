import { useAppSelector } from "../../../redux/hooks";

interface Props {
  name: string;
  img: string;
  totalPages: number;
  index: number;
}
const CompetitionCard = ({ name, img, totalPages, index }: Props) => {
  let firstLetter = name.split("")[0];
  const userName = useAppSelector((state) => state.user.userName);

  return (
    <div
      className={`${
        index === 0
          ? "border-4 border-yellow-300"
          : index === 1
          ? "border-4 border-stone-300"
          : index === 2
          ? "border-4 border-orange-200"
          : "border-4 border-[#9CBED3]"
      } rounded-3xl p-5 my-2 ${
        name == userName ? "bg-[#F1F7E4]" : "bg-white"
      } grid grid-cols-6 items-center`}
    >
      <h1 className="font-bold">{index + 1}#</h1>
      {img !== null ? (
        <div>
          <img src={img} className="mask mask-circle" />
        </div>
      ) : (
        <div className="">
          <div className="bg-neutral text-neutral-content rounded-full grid justify-center h-9 w-9">
            <span className="text-3xl">{firstLetter}</span>
          </div>
        </div>
      )}

      <h1 className="col-start-4 font-bold">{name}</h1>
      <p className="col-start-7">{totalPages} pág</p>
    </div>
  );
};

export default CompetitionCard;
