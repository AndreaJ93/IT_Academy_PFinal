import { ReactElement } from "react";
import { Link } from "react-router-dom";

const MainButton = ({
  section,
  icon,
  path,
}: {
  section: string;
  icon: ReactElement;
  path: string;
}) => {
  return (
    <button
      className={`bg-white px-4 py-8 rounded-3xl shadow-lg h-full grid content-evenly`}
    >
      <Link to={path}>
        <div className="mx-auto grid justify-center">{icon}</div>
        <h1 className="font-semibold text-center self-center text-lg">
          {section}
        </h1>
      </Link>
    </button>
  );
};

export default MainButton;
