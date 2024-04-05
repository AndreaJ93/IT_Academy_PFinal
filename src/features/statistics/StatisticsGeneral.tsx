import { useAppSelector } from "../../redux/hooks";
import { Book } from "../../redux/userSlice";
import { book, bookmark, heart } from "../../assets/svgs";

const StatisticsGeneral = () => {
  const books = useAppSelector((state) => state.user.books);
  const readBooks = books.filter((book) => book.status === "read");
  let totalPages: number = readBooks.reduce(
    (total, pag) => total + pag.pages,
    0
  );
  let fiveStarsBooks: number = readBooks.filter(
    (book) => book.rating == 5
  ).length;

  const sortPagesBooks: Book[] = [...readBooks].sort(
    (a, b) => a.pages - b.pages
  );

  //calcular tiempo más corto:
  let leastTimeToread = Infinity;
  let longestTimeToread = -1;
  let indexShortestBook = -1;
  let indexLongestBook = -1;

  // Iteramos sobre el array de objetos para calcular las diferencias
  readBooks.forEach((book, index) => {
    // Convertimos las cadenas de fecha en objetos Date
    if (book.initialDate && book.finalDate) {
      const initialDateBook = new Date(book.initialDate).getTime();
      const finalDateBook = new Date(book.finalDate).getTime();

      // Calculamos la diferencia en milisegundos
      const timeToRead = finalDateBook - initialDateBook;

      // Si la diferencia actual es menor que la diferencia más corta encontrada hasta ahora, la actualizamos
      if (timeToRead < leastTimeToread) {
        leastTimeToread = timeToRead;
        indexShortestBook = index;
      }
      if (timeToRead > longestTimeToread) {
        longestTimeToread = timeToRead;
        indexLongestBook = index;
      }
    }
  });

  // Convertimos la diferencia más corta a días
  const daysToReadShortest = leastTimeToread / (1000 * 60 * 60 * 24);
  const daysToReadLongest = longestTimeToread / (1000 * 60 * 60 * 24);

  return (
    <div className="py-3">
      {books &&
      books.length > 0 &&
      readBooks &&
      sortPagesBooks &&
      sortPagesBooks.length > 0 ? (
        <div>
          <div className="grid grid-cols-2 gap-2">
            <div className="shadow-lg bg-[#F2F2F2] my-1 rounded-3xl p-3">
              <div className="grid grid-cols-4">
                <div className="text-[#4DA2A9]">{bookmark}</div>
                <div className="font-semibold col-span-3">Libros leídos</div>
              </div>
              <div className="text-center text-2xl font-bold">
                {readBooks.length}
              </div>
            </div>
            <div className="shadow-lg bg-[#F2F2F2] my-1 rounded-3xl p-3">
              <div className="text-center font-semibold">Páginas leídas</div>
              <div className="grid grid-cols-3">
                <div className="text-[#4DA2A9]">{book}</div>
                <div className="col-span-2 text-2xl font-bold">
                  {totalPages}
                </div>
              </div>
            </div>
            <div className="text-center col-span-2 grid grid-cols-2 shadow-lg bg-[#F2F2F2] my-1 rounded-3xl p-3">
              {indexShortestBook !== -1 && (
                <img
                  src={readBooks && readBooks[indexShortestBook].img}
                  className="rounded-3xl ms-2"
                  alt="No hay imagen"
                ></img>
              )}
              <div className="grid items-center content-center">
                <h1 className="text-center text-lg">
                  El libro que has tardado menos en leer
                </h1>
                <p className="text-2xl font-bold">{daysToReadShortest} días</p>
              </div>
            </div>
          </div>
          <div className="shadow-lg bg-[#F2F2F2] rounded-3xl p-3  my-3">
            <div className="grid grid-cols-12 items-center">
              <div className="text-[#4DA2A9] self-end">{heart}</div>
              <div className="font-semibold col-span-4 col-start-3 pt-2">
                Nº Favoritos:
              </div>
              <div className="text-center text-2xl font-bold">
                {fiveStarsBooks}
              </div>
              <div className="text-sm text-center col-span-5">
                (Con 5 estrellas)
              </div>
            </div>
          </div>
          <div className="text-center grid grid-cols-2 gap-2 justify-center">
            <div className="shadow-lg bg-[#F2F2F2] my-1 rounded-3xl p-3">
              {sortPagesBooks && sortPagesBooks.length > 0 ? (
                <img
                  src={sortPagesBooks[0].img}
                  className="rounded-3xl mx-auto"
                  alt="No hay imagen"
                ></img>
              ) : null}
              <div className="">
                <h1 className="text-center text-lg">El libro más corto</h1>
                <div className="text-2xl font-bold">
                  {sortPagesBooks &&
                    sortPagesBooks.length > 0 &&
                    sortPagesBooks[0].pages}{" "}
                  pág
                </div>
              </div>
            </div>
            <div className="shadow-lg bg-[#F2F2F2] my-1 rounded-3xl p-3">
              {sortPagesBooks && sortPagesBooks.length > 0 ? (
                <img
                  src={sortPagesBooks[sortPagesBooks.length - 1].img}
                  className="rounded-3xl mx-auto"
                ></img>
              ) : null}
              <div className="">
                <h1 className="text-center text-lg">El libro más largo</h1>
                <div className="text-2xl font-bold">
                  {sortPagesBooks &&
                    sortPagesBooks.length > 0 &&
                    sortPagesBooks[sortPagesBooks.length - 1].pages}{" "}
                  pág
                </div>
              </div>
            </div>
          </div>
          <div className="text-center col-span-2 grid grid-cols-2 shadow-lg bg-[#F2F2F2] my-1 rounded-3xl p-3">
            {indexLongestBook !== -1 && (
              <img
                src={readBooks && readBooks[indexLongestBook].img}
                className="rounded-3xl ms-2"
              ></img>
            )}
            <div className="grid items-center content-center">
              <h1 className="text-center text-lg">
                El libro que más has tardado en leer
              </h1>
              <p className="text-2xl font-bold">{daysToReadLongest} días</p>
            </div>
          </div>
        </div>
      ) : (
        "No tienes estadísticas"
      )}
    </div>
  );
};

export default StatisticsGeneral;
