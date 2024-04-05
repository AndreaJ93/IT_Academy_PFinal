import { Book } from "../../../redux/userSlice";

interface Props {
  books: Book[];
}
const ActualReading = ({ books }: Props) => {
  let readingBooks = books.filter((book: Book) => book.status === "reading");

  return (
    <div className="grid grid-cols-5">
      {readingBooks.length <= 0 ? undefined : (
        <div className="stack">
          {readingBooks.map((book: Book) => (
            <img
              src={book.img}
              alt="book image"
              className="rounded-xl border border-4 border-[#9CBED3]"
            ></img>
          ))}
        </div>
      )}
      <div className="col-span-4 px-3">
        <p>
          {readingBooks.length !== 0
            ? `Leyendo: ${readingBooks[0].title} - ${readingBooks[0].author} ${
                readingBooks.length > 1
                  ? `, y ${readingBooks.length - 1} más.`
                  : ""
              }`
            : "No estás leyendo ningún libro actualmente"}
        </p>
      </div>
    </div>
  );
};

export default ActualReading;
