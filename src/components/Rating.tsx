const Rating = ({
  stars,
  starsRatingValue,
}: {
  stars: number | null;
  starsRatingValue: React.Dispatch<
    React.SetStateAction<number | undefined>
  > | null;
}) => {
  function handleRatingValue(e: React.ChangeEvent<HTMLInputElement>) {
    starsRatingValue && starsRatingValue(Number(e.target.value));
  }
  return (
    <div className="rating rating-lg rating-half pb-4 w-10/12">
      <input
        type="radio"
        name="rating-10"
        className="rating-hidden"
        defaultChecked={stars === 0}
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-orange-400 mask mask-star-2 mask-half-1"
        id="0.5"
        value="0.5"
        defaultChecked={stars === 0.5}
        onChange={(e) => {
          handleRatingValue(e);
        }}
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-orange-400 mask mask-star-2 mask-half-2"
        id="1"
        value="1"
        defaultChecked={stars === 1}
        onChange={handleRatingValue}
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-orange-400 mask mask-star-2 mask-half-1"
        id="1.5"
        value="1.5"
        defaultChecked={stars === 1.5}
        onChange={handleRatingValue}
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-orange-400 mask mask-star-2 mask-half-2"
        id="2"
        value="2"
        defaultChecked={stars === 2}
        onChange={handleRatingValue}
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-orange-400 mask mask-star-2 mask-half-1"
        id="2.5"
        value="2.5"
        defaultChecked={stars === 2.5}
        onChange={handleRatingValue}
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-orange-400 mask mask-star-2 mask-half-2"
        id="3"
        value="3"
        defaultChecked={stars === 3}
        onChange={handleRatingValue}
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-orange-400 mask mask-star-2 mask-half-1"
        id="3.5"
        value="3.5"
        defaultChecked={stars === 3.5}
        onChange={handleRatingValue}
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-orange-400 mask mask-star-2 mask-half-2"
        id="4"
        value="4"
        defaultChecked={stars === 4}
        onChange={handleRatingValue}
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-orange-400 mask mask-star-2 mask-half-1"
        id="4.5"
        value="4.5"
        defaultChecked={stars === 4.5}
        onChange={handleRatingValue}
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-orange-400 mask mask-star-2 mask-half-2"
        id="5"
        value="5"
        defaultChecked={stars === 5}
        onChange={handleRatingValue}
      />
    </div>
  );
};

export default Rating;
