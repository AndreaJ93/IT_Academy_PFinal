interface Props {
  genres: string[];
}
const FavoriteGenres = ({ genres }: Props) => {
  return (
    <div className="py-2">
      <h1 className="text-center font-bold">Géneros preferidos:</h1>

      <div className="mx-auto">
        {genres.length === 0 ? (
          <ul>No has seleccionado ningún género preferido</ul>
        ) : (
          <ul className="list-disc list-inside text-sm gris justify-center">
            {genres && genres.map((genre: string) => <li>{genre}</li>)}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FavoriteGenres;
