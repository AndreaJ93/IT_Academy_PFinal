import { useState } from "react";
import { search } from "../../assets/svgs";
import ModalInfoBook from "../../components/ModalInfoBook";
import { useGetAllBooksQuery } from "../../redux/apiSlice";
import AddBook from "./AddBook";

const SearchBooks = () => {
  interface Book {
    id: string;

    volumeInfo: {
      industryIdentifiers: [
        {
          identifier: string;
        }
      ];
      title: string;
      authors: string;
      averageRating: number;
      ratingsCount: number;
      pageCount: number;
      publishedDate: string;
      description: string;
      imageLinks: {
        thumbnail: string;
        smallThumbnail: string;
      };
    };
  }
  const [bookTitle, setBookTitle] = useState("");
  const [bookSearched, setBookSearched] = useState<Book[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [bookId, setBookId] = useState("id");
  let intitle = "";
  intitle = bookTitle.split(" ").join("+");
  const [maxResults, setMaxResults] = useState<number>(20);
  const { data: books } = useGetAllBooksQuery(
    intitle + `&maxResults=${maxResults}`
  );

  function searchBook() {
    setBookSearched(books.items);
    setBookTitle("");
  }

  function openModal() {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="p-3">
      <label className="input input-bordered flex items-center gap-2 rounded-3xl">
        <input
          type="text"
          className="grow"
          placeholder="Search"
          value={bookTitle}
          onChange={(e) => {
            setBookTitle(e.target.value);
          }}
        />
        <button onClick={searchBook}>{search}</button>
      </label>
      <div>
        {bookSearched &&
          bookSearched.map((book, index) =>
            book.volumeInfo.imageLinks &&
            book.volumeInfo.authors &&
            book.volumeInfo.pageCount &&
            book.volumeInfo.imageLinks.smallThumbnail &&
            book.volumeInfo.industryIdentifiers ? (
              <div
                className="p-5 rounded-3xl shadow-md bg-white mt-3 grid grid-cols-3"
                key={index}
              >
                <img
                  className="rounded-2xl"
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={`Thumbnail for ${book.volumeInfo.title}`}
                />
                <div className="col-span-2 ps-3 relative">
                  <h1
                    className="font-bold text-lg"
                    onClick={() => {
                      openModal();
                      setBookId(
                        `${book.volumeInfo.industryIdentifiers[0].identifier}`
                      );
                    }}
                  >
                    {book.volumeInfo.title}
                  </h1>
                  <p>{book.volumeInfo.authors}</p>
                  <div className="flex justify-end absolute bottom-0 right-0">
                    <AddBook
                      title={book.volumeInfo.title}
                      author={book.volumeInfo.authors}
                      pages={book.volumeInfo.pageCount}
                      img={book.volumeInfo.imageLinks.smallThumbnail}
                      isbn={book.volumeInfo.industryIdentifiers[0].identifier}
                    ></AddBook>
                  </div>
                </div>
              </div>
            ) : null
          )}
        {/* {bookSearched.length > 0 && (
          <button
            onClick={viewMore}
            className="w-full bg-[#4DA2A9] p-3 rounded-3xl text-white font-bold text-lg my-4"
          >
            Ver Más
          </button>
        )} */}
      </div>
      <div>
        {modalOpen && (
          <ModalInfoBook closeModal={closeModal} id={bookId}></ModalInfoBook>
        )}
      </div>
    </div>
  );
};

export default SearchBooks;
