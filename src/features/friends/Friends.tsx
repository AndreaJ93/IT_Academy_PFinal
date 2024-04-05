import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Friends = () => {
  const [stateFriends, setStateFriends] = useState<string>("listoffriends");

  return (
    <div className="p-3">
      <div className="">
        <div className="grid grid-cols-2 text-center bg-white rounded-3xl shadow-md">
          <button
            className={`p-2 ${
              stateFriends === "listoffriends"
                ? " bg-[#D3E3EC] rounded-s-3xl font-bold"
                : null
            }`}
            onClick={() => setStateFriends("listoffriends")}
          >
            <Link to="/friends/listoffriends">
              <div>Mis amigos</div>
            </Link>
          </button>
          <button
            className={` p-2   ${
              stateFriends === "searchfriends"
                ? " bg-[#D3E3EC] rounded-e-3xl font-bold"
                : null
            }`}
            onClick={() => setStateFriends("searchfriends")}
          >
            <Link to="/friends/searchfriends">
              <div>Buscar amigos</div>
            </Link>
          </button>
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Friends;
