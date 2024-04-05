import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { changeBook } from "../../../redux/userSlice";
import Rating from "../../../components/Rating";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { deleteSelectedBook } from "../../../redux/dataSlice";

interface Props {
  setOpenChangeStatusModal: (arg0: boolean) => void;
}
const ChangeBook = ({ setOpenChangeStatusModal }: Props) => {
  const genres = useAppSelector((state) => state.data.genres);
  const userId = useAppSelector((state) => state.user.userId);
  const [whereAddBook, setWhereAddBook] = useState<string>("wantToRead");
  const [initialDate, setInitialDate] = useState<string>("");
  const [finalDate, setFinalDate] = useState<string>("");
  const [principalGenre, setPrincipalGenre] = useState<string>("");
  const [starsRatingValue, setStarsRatingValue] = useState<number | undefined>(
    0
  );
  const dispatch = useAppDispatch();
  const selectedBook = useAppSelector((state) => state.data.selectedBook);

  async function handleChangeBook() {
    const userRef = doc(db, "userData", userId);

    let newInitialDate =
      selectedBook?.initialDate === ""
        ? initialDate
        : selectedBook?.initialDate;
    let newFinalDate =
      selectedBook?.finalDate === "" ? finalDate : selectedBook?.finalDate;
    let newGenre =
      selectedBook?.genre === "" ? principalGenre : selectedBook?.genre;
    let newRating =
      selectedBook?.rating === 0 ? starsRatingValue : selectedBook?.rating;

    let changeStatusBook = {
      ...selectedBook,
      status: whereAddBook,
      initialDate: newInitialDate,
      finalDate: newFinalDate,
      genre: newGenre,
      rating: newRating,
    };

    if (
      whereAddBook === "read" &&
      (changeStatusBook.initialDate === "" ||
        changeStatusBook.finalDate === "" ||
        changeStatusBook.rating === 0 ||
        changeStatusBook.genre === "")
    ) {
      alert("Por favor, introduzca todos los campos");
    } else if (
      whereAddBook === "reading" &&
      changeStatusBook.initialDate === ""
    ) {
      alert("Por favor, introduzca todos los campos");
    } else {
      await updateDoc(userRef, {
        books: arrayRemove(selectedBook),
      });

      await updateDoc(userRef, {
        books: arrayUnion(changeStatusBook),
      });

      dispatch(
        changeBook({ isbn: selectedBook?.isbn, newBook: changeStatusBook })
      );
      dispatch(deleteSelectedBook());
      setOpenChangeStatusModal(false);
    }
  }

  return (
    <div>
      <dialog className="modal modal-bottom sm:modal-middle" open>
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => setOpenChangeStatusModal(false)}
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
                value={selectedBook?.title}
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
                value={selectedBook?.author}
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
                defaultValue={selectedBook?.status}
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
                  value={selectedBook?.initialDate}
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
                    {genres.map((genre, index) => (
                      <option key={index} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>
                </label>

                <div>
                  <label className="form-control w-full max-w-xs py-1 text-sm">
                    Fecha de inicio de lectura:
                  </label>
                  <input
                    type="date"
                    className="input input-bordered w-full max-w-xs rounded-3xl"
                    defaultValue={selectedBook?.initialDate}
                    onChange={(e) => setInitialDate(e.target.value)}
                  />
                </div>

                <label className="form-control w-full max-w-xs py-1 text-sm">
                  Fecha final de lectura:
                </label>
                <input
                  type="date"
                  className="input input-bordered w-full max-w-xs  rounded-3xl"
                  min={selectedBook?.initialDate}
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
            onClick={() => {
              handleChangeBook();
            }}
          >
            Cambiar de estantería
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default ChangeBook;
