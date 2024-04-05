import { Book } from "../../../redux/userSlice";

interface Props {
  books: Book[];
  goal: number;
}
const UserGoal = ({ books, goal }: Props) => {
  const booksReadsNumber = books.filter(
    (book: Book) => book.status === "read"
  ).length;

  const progress = goal === 0 ? 0 : Math.round((booksReadsNumber / goal) * 100);

  return (
    <div className="mx-auto w-4/5 py-3">
      <p className="font-semibold">
        {`Has leído ${booksReadsNumber} de ${goal} libros:`}
      </p>
      <div className="grid grid-cols-4 items-center py-2">
        <progress
          className="progress progress-accent col-span-3"
          value={progress}
          max="100"
        ></progress>
        <p className="justify-self-center pb-1">{`${progress}%`}</p>
      </div>
    </div>
  );
};

export default UserGoal;
