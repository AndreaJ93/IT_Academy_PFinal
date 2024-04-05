import { useLocation } from "react-router-dom";
import {
  changeIcon,
  filterIcon,
  pencilSquare,
  trash,
} from "../../../assets/svgs";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { deleteBook } from "../../../redux/userSlice";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import EditBook from "./EditBook";
import ChangeBook from "./ChangeBook";
import { deleteSelectedBook, setFilter } from "../../../redux/dataSlice";

const BottomFiltersBar = () => {
  const url = useLocation();
  const splitUrl = url.pathname.split("/");
  let status = splitUrl[splitUrl.length - 1];
  const userId = useAppSelector((state) => state.user.userId);
  const selectedBook = useAppSelector((state) => state.data.selectedBook);
  const dispatch = useAppDispatch();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openChangeStatusModal, setOpenChangeStatusModal] =
    useState<boolean>(false);
  const [openSortModal, setOpenSortModal] = useState<boolean>(false);
  const user = useAppSelector((state) => state.user);

  const userRef = doc(db, "userData", userId);

  async function deleteBooks() {
    await updateDoc(userRef, {
      books: arrayRemove(selectedBook),
    });

    dispatch(deleteBook(selectedBook?.isbn));
    dispatch(deleteSelectedBook());
  }

  return (
    <div>
      <div
        className={`btm-nav bg-white rounded-full my-4 shadow-lg ${
          status === "wantToRead" ? "w-2/4" : "w-11/12"
        } mx-auto ${
          selectedBook === null && status === "read"
            ? null
            : selectedBook === null
            ? "hidden"
            : null
        }`}
      >
        <button
          onClick={() => {
            setOpenDeleteModal(true);
          }}
          disabled={selectedBook === null}
          className={`rounded-l-full`}
        >
          {trash}
        </button>
        {status !== "wantToRead" ? (
          <button
            onClick={() => setOpenEditModal(true)}
            disabled={selectedBook === null}
          >
            {pencilSquare}
          </button>
        ) : null}
        <button
          disabled={selectedBook === null}
          onClick={() => setOpenChangeStatusModal(true)}
          className={`focus:shadow-inner ${
            status === "read" ? null : "rounded-r-full"
          }`}
        >
          {changeIcon}
        </button>
        {status === "read" ? (
          <div
            className={`dropdown dropdown-top dropdown-end flex ${
              openSortModal ? "bg-[#D3E3EC] rounded-e-full" : null
            }`}
          >
            <button onClick={() => setOpenSortModal(!openSortModal)}>
              {filterIcon}
            </button>
            {openSortModal && (
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 justify-center border"
              >
                <li className="">
                  <a
                    onClick={() => {
                      dispatch(setFilter("months"));
                      setOpenSortModal(false);
                    }}
                  >
                    Ordenar por fecha de lectura
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      dispatch(setFilter("rating"));
                      setOpenSortModal(false);
                    }}
                    className="border-t border-b"
                  >
                    Ordenar por valoración
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      dispatch(setFilter("update"));
                      setOpenSortModal(false);
                    }}
                  >
                    Ordenar por actualización
                  </a>
                </li>
              </ul>
            )}
          </div>
        ) : null}
      </div>
      {openDeleteModal && (
        <DeleteModal
          setOpenDeleteModal={setOpenDeleteModal}
          deleteBooks={deleteBooks}
        ></DeleteModal>
      )}
      {openEditModal && (
        <EditBook setOpenEditModal={setOpenEditModal}></EditBook>
      )}
      {openChangeStatusModal && (
        <ChangeBook
          setOpenChangeStatusModal={setOpenChangeStatusModal}
        ></ChangeBook>
      )}
    </div>
  );
};

export default BottomFiltersBar;
