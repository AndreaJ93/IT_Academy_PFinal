import { SetStateAction } from "react";
import { useAppSelector } from "../../../redux/hooks";

interface Props {
  favGenres: string[];
  setfavGenres: React.Dispatch<SetStateAction<string[]>>;
}

const ChooseGenres = ({ favGenres, setfavGenres }: Props) => {
  const genres = useAppSelector((state) => state.data.genres);

  function handleGenre(genre: string) {
    if (favGenres.includes(genre)) {
      let deleteGenreArray = favGenres.filter(
        (favGenre: string) => favGenre !== genre
      );
      setfavGenres(deleteGenreArray);
    } else {
      const genreArray = [...favGenres, genre];
      setfavGenres(genreArray);
    }
  }
  return (
    <div>
      <div className="grid grid-cols-2">
        {genres.map((genre: string, index: number) => (
          <div className="form-control grid justify-start" key={index}>
            <label className="cursor-pointer label">
              <input
                type="checkbox"
                value={genre}
                checked={favGenres.includes(genre)}
                className="checkbox checkbox-accent me-2"
                onChange={() => handleGenre(genre)}
              />
              <span className="label-text">{genre}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseGenres;
