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
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
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
  Tooltip
);

const ChartMonths = () => {
  const months = useAppSelector((state) => state.data.months);
  const books = useAppSelector((state) => state.user.books);
  const readBooks = books.filter((book) => book.status === "read");
  const [readPerMonth, setReadPerMonth] = useState<number[]>([]);

  let readBooksNumberByMonth: number[] = [];

  useEffect(() => {
    readBooksNumberByMonth = getReadBooksNumberByMonth();
    setReadPerMonth(readBooksNumberByMonth);
  }, []);

  function getReadBooksNumberByMonth() {
    let currentYear = new Date().getFullYear();
    let currentYearReadBooks = readBooks.filter(
      (book) => currentYear === new Date(book.finalDate).getFullYear()
    );

    let readBooksByMonthMap = GroupBy(currentYearReadBooks, (book) => {
      return new Date(book.finalDate).getMonth();
    });

    return months.map(
      (_, index) => readBooksByMonthMap.get(index)?.length ?? 0
    );
  }

  let options: ChartOptions<"bar"> = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Oculta las líneas de la cuadrícula en el eje X
        },
        ticks: {
          callback: function (value: number | string) {
            if (Number.isInteger(value)) {
              // Si es un número entero, devolverlo como está
              return value;
            } else {
              // Si no es un número entero, devolver una cadena vacía
              return "";
            }
          },
        },
      },
      y: {
        grid: {
          display: false, // Oculta las líneas de la cuadrícula en el eje Y
        },
      },
    },
  };

  let data: ChartData<"bar"> = {
    labels: months,
    datasets: [
      {
        data: readPerMonth,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FFD700",
          "#90EE90",
          "#8A2BE2",
          "#FF4500",
          "#7FFF00",
          "#87CEFA",
        ],
        borderColor: "#fff",
        borderRadius: 10,
        borderWidth: 1,
      },
    ],
  };
  return (
    <div
      className="grid justify-center bg-white rounded-3xl shadow-md my-3"
      style={{ height: "420px" }}
    >
      <h1 className="text-lg text-center p-3 font-bold underline">
        Libros leídos por mes
      </h1>
      <div className="h-full">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default ChartMonths;
