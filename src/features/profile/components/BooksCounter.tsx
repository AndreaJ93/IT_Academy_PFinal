import { Book } from "../../../redux/userSlice";

interface Props {
  books: Book[];
}
const BooksCounter = ({ books }: Props) => {
  const readingNumber = books.filter(
    (book: Book) => book.status === "reading"
  ).length;
  const readNumber = books.filter(
    (book: Book) => book.status === "read"
  ).length;
  const wantToReadNumber = books.filter(
    (book: Book) => book.status === "wantToRead"
  ).length;
  return (
    <div className="px-5 py-5 rounded-3xl shadow-md bg-white ms-2 grid">
      <h1>
        Leyendo: <span className="font-bold">{readingNumber}</span>
      </h1>
      <h1>
        Libros leídos: <span className="font-bold">{readNumber}</span>
      </h1>
      <h1>
        Quiero leer: <span className="font-bold">{wantToReadNumber}</span>
      </h1>
    </div>
  );
};

export default BooksCounter;
