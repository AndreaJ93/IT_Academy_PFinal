interface Props {
  color: string;
}
const Loader = ({ color }: Props) => {
  return <span className={`loading loading-spinner ${color}`}></span>;
};

export default Loader;
