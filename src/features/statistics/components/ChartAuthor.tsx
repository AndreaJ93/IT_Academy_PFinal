import {
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useAppSelector } from "../../../redux/hooks";
import { useEffect, useState } from "react";
import { GroupBy } from "../../../utils/list_utils";

ChartJS.register(
  CategoryScale,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  ChartDataLabels
);

const ChartAuthor = () => {
  const books = useAppSelector((state) => state.user.books);
  const readBooks = books.filter((book) => book.status === "read");
  const [readPerAuthors, setReadPerAuthors] = useState<number[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);

  const [printedReadPerAuthors, setPrintedReadPerAuthors] = useState(false);

  useEffect(() => {
    function getReadBooksNumberByAuthor() {
      let currentYear = new Date().getFullYear();
      let currentYearReadBooks = readBooks.filter(
        (book) => currentYear === new Date(book.finalDate).getFullYear()
      );

      let readBooksByAuthorsMap = GroupBy(currentYearReadBooks, (book) => {
        return book.author[0];
      });

      const sortedreadBooksByAuthors = new Map(
        Array.from(readBooksByAuthorsMap).sort((a, b) => {
          // Comparar la longitud de los arrays
          return b[1].length - a[1].length;
        })
      );

      setAuthors(Array.from(sortedreadBooksByAuthors.keys()));

      return Array.from(sortedreadBooksByAuthors.values()).map(
        (books) => books.length
      );
    }

    let currentReadPerAuthors = [];
    if (authors.length < 6) {
      currentReadPerAuthors = getReadBooksNumberByAuthor();
    } else {
      const sixFirstAuthorsBooks = getReadBooksNumberByAuthor().slice(0, 6);
      let sixFirstAuthors = authors.slice(0, 6);
      let sumBooksFirstSixAuthors = sixFirstAuthorsBooks.reduce(
        (total, book) => total + book
      );
      let allBooksnumbers = readBooks.length;
      let sumBooksOthersAuthors = allBooksnumbers - sumBooksFirstSixAuthors;

      if (sumBooksOthersAuthors === 0) {
        currentReadPerAuthors = getReadBooksNumberByAuthor();
      } else {
        const newAuthors = [...sixFirstAuthors, "Otros"];
        setAuthors(newAuthors);
        const newBooksAuthors = [
          ...sixFirstAuthorsBooks,
          sumBooksOthersAuthors,
        ];
        currentReadPerAuthors = newBooksAuthors;
      }
    }

    if (!printedReadPerAuthors) {
      setReadPerAuthors(currentReadPerAuthors);
      setPrintedReadPerAuthors(true);
    }
  }, [printedReadPerAuthors]);

  let options: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
    },
    layout: {},
  };

  let data: ChartData<"doughnut"> = {
    labels: authors,
    datasets: [
      {
        label: "Number of Books Read",
        data: readPerAuthors,
        backgroundColor: [
          "rgba(255, 204, 204, 0.6)", // Rosa claro
          "rgba(204, 255, 204, 0.6)", // Verde claro
          "rgba(255, 255, 204, 0.6)", // Amarillo claro
          "rgba(204, 204, 255, 0.6)", // Azul claro
          "rgba(255, 204, 255, 0.6)", // Lila claro
          "rgba(204, 255, 255, 0.6)", // Celeste claro
          "rgba(255, 230, 204, 0.6)",
        ],
        borderColor: [
          "rgba(255, 153, 153, 1)", // Rosa claro
          "rgba(153, 255, 153, 1)", // Verde claro
          "rgba(255, 255, 153, 1)", // Amarillo claro
          "rgba(153, 153, 255, 1)", // Azul claro
          "rgba(255, 153, 255, 1)", // Lila claro
          "rgba(153, 255, 255, 1)", // Celeste claro
          "rgba(255, 204, 153, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };
  return (
    <div className="grid justify-center bg-white rounded-3xl shadow-md my-3">
      <h1 className="text-lg text-center p-3 font-bold underline">
        Libros leídos por autor/a
      </h1>
      <div className="">
        <Doughnut options={options} data={data} />
      </div>
    </div>
  );
};

export default ChartAuthor;
