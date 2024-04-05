import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import BottomFiltersBar from "./components/BottomFiltersBar";
import { useAppDispatch } from "../../redux/hooks";
import { deleteSelectedBook, setSelectedBook } from "../../redux/dataSlice";

type statusBook = "wantToRead" | "read" | "reading";

const MyShelf = () => {
  const [stateShelf, setStateShelf] = useState<statusBook>("reading");
  const dispatch = useAppDispatch();

  return (
    <div className="p-3 pb-24">
      <div className="">
        <div className="grid grid-cols-3 text-center bg-white rounded-3xl shadow-md">
          <button
            className={` ${
              stateShelf === "reading"
                ? " bg-[#D3E3EC] rounded-s-3xl font-bold"
                : null
            }`}
            onClick={() => {
              setStateShelf("reading");
              dispatch(deleteSelectedBook());
            }}
          >
            <Link to="/myshelf/reading">
              <div className="p-2">Leyendo</div>
            </Link>
          </button>
          <button
            className={`   ${
              stateShelf === "read" ? " bg-[#D3E3EC] font-bold" : null
            }`}
            onClick={() => {
              setStateShelf("read");
              dispatch(deleteSelectedBook());
            }}
          >
            <Link to="/myshelf/read">
              <div className="p-2">Leídos</div>
            </Link>
          </button>
          <button
            className={`  ${
              stateShelf === "wantToRead"
                ? " bg-[#D3E3EC] rounded-e-3xl font-bold"
                : null
            }`}
            onClick={() => {
              setStateShelf("wantToRead");
              dispatch(deleteSelectedBook());
            }}
          >
            <Link to="/myshelf/wantToRead">
              <div className="p-2">Pendientes</div>
            </Link>
          </button>
        </div>
        <Outlet></Outlet>
      </div>
      <BottomFiltersBar></BottomFiltersBar>
    </div>
  );
};

export default MyShelf;
