import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import Rating from "../../../components/Rating";
import { changeBook } from "../../../redux/userSlice";
import { deleteSelectedBook } from "../../../redux/dataSlice";

interface Props {
  setOpenEditModal: (arg0: boolean) => void;
}

const EditBook = ({ setOpenEditModal }: Props) => {
  const genres = useAppSelector((state) => state.data.genres);
  const userId = useAppSelector((state) => state.user.userId);
  const selectedBook = useAppSelector((state) => state.data.selectedBook);

  const [initialDate, setInitialDate] = useState<string | undefined>(
    selectedBook?.initialDate
  );
  const [finalDate, setFinalDate] = useState<string | undefined>(
    selectedBook?.finalDate
  );
  const [principalGenre, setPrincipalGenre] = useState<string | undefined>(
    selectedBook?.genre
  );
  const [starsRatingValue, setStarsRatingValue] = useState<number | undefined>(
    selectedBook?.rating
  );
  const dispatch = useAppDispatch();

  async function handleEditBook() {
    const userRef = doc(db, "userData", userId);

    await updateDoc(userRef, {
      books: arrayRemove(selectedBook),
    });

    let newInitialDate = initialDate;

    let newFinalDate = finalDate;
    let newGenre = principalGenre;
    let newRating = starsRatingValue;

    let changeStatusBook = {
      ...selectedBook,
      status: selectedBook?.status,
      initialDate: newInitialDate,
      finalDate: newFinalDate,
      genre: newGenre,
      rating: newRating,
    };

    await updateDoc(userRef, {
      books: arrayUnion(changeStatusBook),
    });

    dispatch(
      changeBook({ isbn: selectedBook?.isbn, newBook: changeStatusBook })
    );
    dispatch(deleteSelectedBook());
  }

  return (
    <div>
      <dialog className="modal modal-bottom sm:modal-middle" open>
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => setOpenEditModal(false)}
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
            {selectedBook?.status === "reading" ? (
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
            ) : selectedBook?.status === "read" ? (
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
                      <option
                        key={index}
                        value={genre}
                        selected={genre === selectedBook.genre}
                      >
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
                  defaultValue={selectedBook?.finalDate}
                  onChange={(e) => setFinalDate(e.target.value)}
                />
                <div className="pt-4 text-center">
                  <p className="text-sm text-start">Valoración:</p>
                  <Rating
                    stars={selectedBook && selectedBook.rating}
                    starsRatingValue={setStarsRatingValue}
                  ></Rating>
                </div>
              </div>
            ) : null}
          </div>

          <button
            className="w-full bg-[#4DA2A9] p-3 rounded-3xl text-white text-lg"
            onClick={() => {
              handleEditBook();
              setOpenEditModal(false);
            }}
          >
            Editar
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default EditBook;
