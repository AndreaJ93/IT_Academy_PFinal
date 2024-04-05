import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { GroupBy } from "../../../utils/list_utils";
import { ChartData, ChartOptions } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const ChartGenre = () => {
  const books = useAppSelector((state) => state.user.books);
  const readBooks = books.filter((book) => book.status === "read");
  const [readPerGenres, setReadPerGenres] = useState<number[]>([]);
  const [genres, setGenres] = useState<string[]>([]);

  // useEffect(() => {
  //   if (genres.length < 6) {
  //     setReadPerGenres(getReadBooksNumberByGenre());
  //   } else {
  //     const sixFirstGenresBooks = getReadBooksNumberByGenre().slice(0, 6);
  //     let sixFirstGenres = genres.slice(0, 6);
  //     let sumBooksFirstSixGenres = sixFirstGenresBooks.reduce(
  //       (total, book) => total + book
  //     );
  //     let allBooksnumbers = readBooks.length;
  //     let sumBooksOthersGenres = allBooksnumbers - sumBooksFirstSixGenres;

  //     if (sumBooksOthersGenres === 0) {
  //       setReadPerGenres(getReadBooksNumberByGenre());
  //     } else {
  //       const newGenres = [...sixFirstGenres, "Otros"];
  //       setGenres(newGenres);
  //       const newBooksGenres = [...sixFirstGenresBooks, sumBooksOthersGenres];
  //       setReadPerGenres(newBooksGenres);
  //     }
  //   }
  // }, []);

  // function getReadBooksNumberByGenre() {
  //   let currentYear = new Date().getFullYear();
  //   let currentYearReadBooks = readBooks.filter(
  //     (book) => currentYear === new Date(book.finalDate).getFullYear()
  //   );

  //   let readBooksByGenresMap = GroupBy(currentYearReadBooks, (book) => {
  //     return book.genre;
  //   });

  //   const sortedreadBooksByGenres = new Map(
  //     Array.from(readBooksByGenresMap).sort((a, b) => {
  //       // Comparar la longitud de los arrays
  //       return b[1].length - a[1].length;
  //     })
  //   );

  //   let setGenreArray = Array.from(sortedreadBooksByGenres.keys());
  //   setGenres(setGenreArray);

  //   return genres.map(
  //     (genre) => sortedreadBooksByGenres.get(genre)?.length ?? 0
  //   );
  // }

  const [printedReadPerGenres, setPrintedReadPerGenres] = useState(false);

  useEffect(() => {
    function getReadBooksNumberByGenre() {
      let currentYear = new Date().getFullYear();
      let currentYearReadBooks = readBooks.filter(
        (book) => currentYear === new Date(book.finalDate).getFullYear()
      );

      let readBooksByGenresMap = GroupBy(currentYearReadBooks, (book) => {
        return book.genre;
      });

      const sortedreadBooksByGenres = new Map(
        Array.from(readBooksByGenresMap).sort((a, b) => {
          // Comparar la longitud de los arrays
          return b[1].length - a[1].length;
        })
      );

      setGenres(Array.from(sortedreadBooksByGenres.keys()));

      return Array.from(sortedreadBooksByGenres.values()).map(
        (books) => books.length
      );
    }

    let currentReadPerGenres = [];
    if (genres.length < 6) {
      currentReadPerGenres = getReadBooksNumberByGenre();
    } else {
      const sixFirstGenresBooks = getReadBooksNumberByGenre().slice(0, 6);
      let sixFirstGenres = genres.slice(0, 6);
      let sumBooksFirstSixGenres = sixFirstGenresBooks.reduce(
        (total, book) => total + book
      );
      let allBooksnumbers = readBooks.length;
      let sumBooksOthersGenres = allBooksnumbers - sumBooksFirstSixGenres;

      if (sumBooksOthersGenres === 0) {
        currentReadPerGenres = getReadBooksNumberByGenre();
      } else {
        const newGenres = [...sixFirstGenres, "Otros"];
        setGenres(newGenres);
        const newBooksGenres = [...sixFirstGenresBooks, sumBooksOthersGenres];
        currentReadPerGenres = newBooksGenres;
      }
    }

    if (!printedReadPerGenres) {
      setReadPerGenres(currentReadPerGenres);
      setPrintedReadPerGenres(true);
    }
  }, [printedReadPerGenres]);

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
    labels: genres,
    datasets: [
      {
        label: "Number of Books Read",
        data: readPerGenres,
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
        Libros leídos por categoría
      </h1>
      <div className="">
        <Doughnut options={options} data={data} />
      </div>
    </div>
  );
};

export default ChartGenre;
