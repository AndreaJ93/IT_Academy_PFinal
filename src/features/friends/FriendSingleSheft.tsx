import { useLocation } from "react-router-dom";
import Book from "../../components/Book";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useState } from "react";
import { setSelectedBook } from "../../redux/dataSlice";
import { Book as InterfaceBook } from "../../redux/userSlice";

const FriendSingleShelf = () => {
  const books = useAppSelector((state) => state.data.actualFriend?.books);
  const url = useLocation();
  const splitUrl = url.pathname.split("/");
  const [selected, setSelected] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.data.filter);
  let status = splitUrl[splitUrl.length - 1];

  if (status === "friendshelf") {
    status = "reading";
  }

  function handleSelected(book: Book) {
    setSelected(book.isbn);
    dispatch(setSelectedBook(book));
  }

  let shelfBooks = books;
  const booksSortByMonth =
    books && [...books].sort((a, b) => a.finalDate.localeCompare(b.finalDate));
  const booksSortByRating =
    books && [...books].sort((a, b) => a.rating - b.rating);

  if (status === "read") {
    if (filter === "months") {
      shelfBooks = booksSortByMonth;
    } else if (filter === "rating") {
      shelfBooks = booksSortByRating;
    } else {
      shelfBooks = books;
    }
  }

  return (
    <div>
      {shelfBooks &&
        shelfBooks
          .filter((book: InterfaceBook) => book.status === status)
          .map((book: InterfaceBook, index: number) => (
            <div key={index}>
              <Book
                index={index}
                book={book}
                handleSelected={() => handleSelected(book)}
              />
            </div>
          ))
          .reverse()}
    </div>
  );
};

export default FriendSingleShelf;
