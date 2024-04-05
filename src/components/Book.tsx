import { starSolid } from "../assets/svgs";
import { useAppSelector } from "../redux/hooks";
import { Book } from "../redux/userSlice";

import { useLocation } from "react-router-dom";

interface Proops {
  index: number;
  book: Book;
  handleSelected: (book: Book) => void;
}
const Book = ({ index, book, handleSelected }: Proops) => {
  const url = useLocation();
  const splitUrl = url.pathname.split("/");
  let status = splitUrl[splitUrl.length - 1];
  const selectedBook = useAppSelector((state) => state.data.selectedBook);

  if (status === "myshelf") {
    status = "reading";
  }

  return (
    <>
      <div
        className={`mt-3 grid grid-cols-3 bg-white rounded-3xl shadow-md p-4 ${
          selectedBook?.isbn === book.isbn
            ? "border border-4 border-[#79ABC7]"
            : null
        }`}
        key={index}
        onClick={() => handleSelected(book)}
      >
        <img
          className={`rounded-2xl`}
          src={book.img}
          alt={`Thumbnail for ${book.title}`}
        />
        <div className="col-span-2 ps-3">
          <h1 className="font-bold text-lg">{book.title}</h1>
          <p>{book.author}</p>
          <p>Pag: {book.pages}</p>
          {status === "read" ? (
            <div className="inline-flex gap-1">
              {book.rating}
              {starSolid}
            </div>
          ) : null}
        </div>
        {status === "read" ? (
          <div className="col-span-3 pt-2 text-end">
            <p>
              Fecha inicio de lectura:{" "}
              <span className="font-semibold">{book.initialDate}</span>
            </p>
            <p>
              Fecha final de lectura:{" "}
              <span className="font-semibold">{book.finalDate}</span>
            </p>
          </div>
        ) : status === "reading" ? (
          <p className="col-span-3 pt-2 text-end">
            Fecha inicio de lectura:{" "}
            <span className="font-semibold">{book.initialDate}</span>
          </p>
        ) : null}
      </div>
    </>
  );
};

export default Book;
