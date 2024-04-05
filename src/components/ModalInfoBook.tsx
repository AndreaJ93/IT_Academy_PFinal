import { useGetBookQuery } from "../redux/apiSlice";
import Loader from "./Loader";
import Rating from "./Rating";

interface Props {
  closeModal: () => void;
  id: string;
}

const ModalInfoBook = ({ closeModal, id }: Props) => {
  const { data: book, isLoading } = useGetBookQuery(id);

  if (isLoading) {
    return <Loader color={"text-accent"}></Loader>;
  }

  if (!book || !book.items || book.items.length === 0) {
    return <div>No book found.</div>;
  }

  const bookInfo = book.items[0].volumeInfo;

  return (
    <dialog
      className="modal"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      open
    >
      <div className="modal-box text-center">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={closeModal}
        >
          ✕
        </button>
        <img src={bookInfo.imageLinks.thumbnail} className="mx-auto pb-3"></img>
        <h3 className="font-bold text-lg">{bookInfo.title}</h3>
        <p className="">{bookInfo.authors}</p>
        <p className="text-xs py-2">
          Fecha de publicación: {bookInfo.publishedDate}
        </p>
        <p className="text-xs">Nº de páginas: {bookInfo.pageCount}</p>
        <div className="grid grid-cols-3 pt-3">
          <div className="col-span-2">
            <Rating
              stars={
                bookInfo.averageRating === undefined
                  ? 0
                  : bookInfo.averageRating
              }
              starsRatingValue={null}
            ></Rating>
          </div>
          <p className="pt-4 text-slate-400 text-xs">
            {`${bookInfo.ratingsCount === undefined ? 0 : bookInfo.ratingsCount}
            valoraciones`}
          </p>
        </div>
        <p className="text-justify">{bookInfo.description}</p>
        <div className="modal-action">
          <form method="dialog"></form>
        </div>
      </div>
    </dialog>
  );
};

export default ModalInfoBook;
