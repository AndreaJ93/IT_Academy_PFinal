import { useAppSelector } from "../../redux/hooks";

import ChartAuthor from "./components/ChartAuthor";
import ChartMonths from "./components/ChartMonths";
import ChartGenre from "./components/ChartGenre";

const StatisticsCharts = () => {
  const books = useAppSelector((state) => state.user.books);
  const readBooks = books.filter((book) => book.status === "read");
  return (
    <div>
      {books && books.length > 0 && readBooks && readBooks.length > 0 ? (
        <div>
          <ChartAuthor></ChartAuthor>
          <ChartMonths></ChartMonths>
          <ChartGenre></ChartGenre>
        </div>
      ) : (
        "No tienes estadísticas"
      )}
    </div>
  );
};

export default StatisticsCharts;
