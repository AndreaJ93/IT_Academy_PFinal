import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

type statusBook = "wantToRead" | "read" | "reading";

const FriendShelf = () => {
  const [stateShelf, setStateShelf] = useState<statusBook>("reading");

  return (
    <div className="p-3 pb-24">
      <div className="">
        <div className="grid grid-cols-3 text-center bg-white rounded-3xl shadow-md">
          <button
            className={`p-2 ${
              stateShelf === "reading"
                ? " bg-[#D3E3EC] rounded-s-3xl font-bold"
                : null
            }`}
            onClick={() => setStateShelf("reading")}
          >
            <Link to="/friendshelf/reading">Leyendo</Link>
          </button>
          <button
            className={` p-2   ${
              stateShelf === "read" ? " bg-[#D3E3EC] font-bold" : null
            }`}
            onClick={() => setStateShelf("read")}
          >
            <Link to="/friendshelf/read">Leídos</Link>
          </button>
          <button
            className={` p-2  ${
              stateShelf === "wantToRead"
                ? " bg-[#D3E3EC] rounded-e-3xl font-bold"
                : null
            }`}
            onClick={() => setStateShelf("wantToRead")}
          >
            <Link to="/friendshelf/wantToRead">Pendientes</Link>
          </button>
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default FriendShelf;
