import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { GroupBy } from "../utils/list_utils";
import { ChartData, ChartOptions } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const ChartRating = () => {
  const books = useAppSelector((state) => state.user.books);
  const readBooks = books.filter((book) => book.status === "read");
  const [readPerRating, setReadPerRating] = useState<number[]>([]);
  const rating: number[] = [0, 1, 2, 3, 4, 5];

  useEffect(() => {
    setReadPerRating(getReadBooksNumberByRating());
  }, []);

  function getReadBooksNumberByRating() {
    let currentYear = new Date().getFullYear();
    let currentYearReadBooks = readBooks.filter(
      (book) => currentYear === new Date(book.finalDate).getFullYear()
    );

    let readBooksByRatingMap = GroupBy(currentYearReadBooks, (book) => {
      return Math.floor(book.rating);
    });
    console.log(readBooksByRatingMap);

    return rating.map(
      (_, index) => readBooksByRatingMap.get(index)?.length ?? 0
    );
  }

  let options: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
    },
  };

  let data: ChartData<"doughnut"> = {
    labels: rating,
    datasets: [
      {
        data: readPerRating,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div style={{ height: "280px" }}>
      <Doughnut options={options} data={data} />
    </div>
  );
};

export default ChartRating;
