interface Props {
  img: string;
  description: string;
  title: string;
}
const OnBoardingCard = ({ img, description, title }: Props) => {
  return (
    <div className="card bg-gradient-to-t from-white to-[#ACC7D9] shadow rounded-3xl mx-5">
      <figure className="">
        <img src={img} alt="onBoarging Image" />
      </figure>
      <div className="card-body rounded-3xl">
        <h2 className="card-title justify-center text-center">{title}</h2>
        <p className="text-justify">{description}</p>
      </div>
    </div>
  );
};

export default OnBoardingCard;
