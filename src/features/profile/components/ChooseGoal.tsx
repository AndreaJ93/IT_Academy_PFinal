interface Props {
  userGoals: number | string;
  setUserGoals: React.Dispatch<React.SetStateAction<number>>;
}

const ChooseGoal = ({ userGoals, setUserGoals }: Props) => {
  return (
    <div className="">
      <input
        className="block text-center w-full border p-1 rounded-3xl input-accent"
        type="number"
        value={Number(userGoals)}
        onChange={(e) => setUserGoals(parseInt(e.target.value))}
      ></input>
    </div>
  );
};

export default ChooseGoal;
