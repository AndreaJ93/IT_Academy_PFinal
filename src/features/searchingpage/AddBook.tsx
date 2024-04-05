import { useState } from "react";
import { addCircle } from "../../assets/svgs";
import Rating from "../../components/Rating";
import { useDispatch } from "react-redux";
import { Book, addBook } from "../../redux/userSlice";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAppSelector } from "../../redux/hooks";

interface BookProps {
  title: string;
  author: string;
  pages: number;
  img: string;
  isbn: string;
}

const AddBook = ({ title, author, pages, img, isbn }: BookProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [whereAddBook, setWhereAddBook] = useState<string>("wantToRead");
  const [starsRatingValue, setStarsRatingValue] = useState<number | undefined>(
    0
  );
  const [principalGenre, setPrincipalGenre] = useState<string>("");
  const [initialDate, setInitialDate] = useState<string>("");
  const [finalDate, setFinalDate] = useState<string>("");
  const dispatch = useDispatch();
  const userId = useAppSelector((state) => state.user.userId);
  const books = useAppSelector((state) => state.user.books);
  const genres = useAppSelector((state) => state.data.genres);

  function openAddModal() {
    setOpenModal(true);
  }

  const userRef = doc(db, "userData", userId);

  async function handleAddBook() {
    let book = {
      title: title,
      author: author,
      pages: pages,
      img: img,
      isbn: isbn,
      status: whereAddBook,
      initialDate: initialDate,
      finalDate: finalDate,
      rating: starsRatingValue,
      genre: principalGenre,
    };

    if (books.some((item: Book) => item.isbn === book.isbn)) {
      alert("Este libro ya está en tu estantería");
    } else {
      if (
        whereAddBook === "read" &&
        (initialDate === "" ||
          finalDate === "" ||
          starsRatingValue === 0 ||
          principalGenre === "")
      ) {
        alert("Por favor, introduzca todos los campos");
      } else if (whereAddBook === "reading" && initialDate === "") {
        alert("Por favor, introduzca todos los campos");
      } else {
        await updateDoc(userRef, {
          books: arrayUnion(book),
        });

        dispatch(addBook(book));
        setOpenModal(false);
        setWhereAddBook("WantToRead");
      }
    }
  }

  return (
    <div>
      <button onClick={openAddModal} className="cursor-pointer">
        {addCircle}
      </button>
      {openModal && (
        <dialog className="modal modal-bottom sm:modal-middle" open>
          <div
            className={`modal-box ${
              whereAddBook === "read" ? "min-h-screen" : null
            }`}
          >
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setOpenModal(false)}
            >
              ✕
            </button>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Título del libro:</span>
                </div>
                <input
                  type="text"
                  value={title}
                  readOnly={true}
                  className="input input-bordered w-full max-w-xs  rounded-3xl"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Autor/a:</span>
                </div>
                <input
                  type="text"
                  value={author}
                  readOnly={true}
                  className="input input-bordered w-full max-w-xs  rounded-3xl"
                />
              </label>
              <label className="form-control w-full max-w-xs pb-4">
                <div className="label">
                  <span className="label-text">Agregar a:</span>
                </div>
                <select
                  className="select select-bordered w-full max-w-xs rounded-3xl"
                  onChange={(e) => setWhereAddBook(e.target.value)}
                  defaultValue={whereAddBook}
                >
                  <option value="wantToRead">Quiero leer</option>
                  <option value="reading">Leyendo</option>
                  <option value="read">Leído</option>
                </select>
              </label>
              {whereAddBook === "reading" ? (
                <div className="w-9/12 mx-auto pb-4">
                  <label className="form-control w-full max-w-xs py-1 text-sm">
                    Fecha de inicio de lectura:
                  </label>
                  <input
                    type="date"
                    className="input input-bordered w-full max-w-xs rounded-3xl"
                    value={initialDate}
                    onChange={(e) => setInitialDate(e.target.value)}
                  />
                </div>
              ) : whereAddBook === "read" ? (
                <div className="w-9/12 mx-auto">
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Género principal:</span>
                    </div>

                    <select
                      className="select select-bordered rounded-3xl"
                      onChange={(e) => setPrincipalGenre(e.target.value)}
                    >
                      <option disabled selected>
                        Selecciona un género
                      </option>
                      {genres.map((genre) => (
                        <option className="text-sm" value={genre}>
                          {genre}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="form-control w-full max-w-xs py-1 text-sm">
                    Fecha de inicio de lectura:
                  </label>
                  <input
                    type="date"
                    className="input input-bordered w-full max-w-xs rounded-3xl"
                    value={initialDate}
                    onChange={(e) => setInitialDate(e.target.value)}
                  />
                  <label className="form-control w-full max-w-xs py-1 text-sm">
                    Fecha final de lectura:
                  </label>
                  <input
                    type="date"
                    className="input input-bordered w-full max-w-xs  rounded-3xl"
                    min={initialDate}
                    onChange={(e) => setFinalDate(e.target.value)}
                  />
                  <div className="pt-4 text-center">
                    <p className="text-sm text-start">Valoración:</p>
                    <Rating
                      stars={0}
                      starsRatingValue={setStarsRatingValue}
                    ></Rating>
                  </div>
                </div>
              ) : null}
            </div>

            <button
              className="w-full bg-[#4DA2A9] p-3 rounded-3xl text-white text-lg"
              onClick={handleAddBook}
            >
              Agregar Libro
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AddBook;
