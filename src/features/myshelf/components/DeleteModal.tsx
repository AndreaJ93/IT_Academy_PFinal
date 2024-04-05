import { useAppSelector } from "../../../redux/hooks";

interface Props {
  setOpenDeleteModal: (arg0: boolean) => void;
  deleteBooks: () => void;
}
const DeleteModal = ({ deleteBooks, setOpenDeleteModal }: Props) => {
  const selectedBook = useAppSelector((state) => state.data.selectedBook);

  return (
    <dialog className="modal" open>
      <div className="modal-box w-11/12 max-w-5xl text-center">
        <h3 className="font-bold text-lg">¡Atención!</h3>
        <p className="py-4">¿Estás seguro que quieres eliminar este libro?</p>
        <p className="py-4 font-bold">{selectedBook?.title}</p>
        <div className="">
          <button
            className="m-3 bg-[#4DA2A9] rounded-3xl text-white font-semibold text-lg py-2 px-4"
            onClick={() => {
              deleteBooks();
              setOpenDeleteModal(false);
            }}
          >
            Aceptar
          </button>
          <button
            className="m-3 py-2 px-4 bg-[#4DA2A9] rounded-3xl text-white font-semibold text-lg"
            onClick={() => setOpenDeleteModal(false)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteModal;
