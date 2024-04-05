import { SetStateAction, useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";

interface Props {
  name: string;
  img: string;
  imgProfile: string;
  setImgProfile: React.Dispatch<SetStateAction<string>>;
}

const ChooseImageProfile = ({
  name,
  img,
  imgProfile,
  setImgProfile,
}: Props) => {
  const images = useAppSelector((state) => state.data.images);
  const firtsLetter = name.substring(0, 1);
  const [openImages, setOpenImages] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setOpenImages(false);
      }
    }

    if (openImages) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openImages]);

  return (
    <div className="block rounded-full mx-auto w-2/6">
      <div role="button" className="">
        <div className="rounded-full">
          <div
            className="bg-neutral text-neutral-content rounded-full w-24 h-24 border border-4 border-[#9CBED3] grid"
            onClick={() => setOpenImages(true)}
          >
            {imgProfile === "" ? (
              <span className="text-3xl rounded-full grid justify-center self-center items-center">
                {img ? (
                  <img src={img} className="rounded-full"></img>
                ) : (
                  firtsLetter
                )}
              </span>
            ) : (
              <img src={imgProfile} className="rounded-full"></img>
            )}
          </div>
        </div>
      </div>
      {openImages && (
        <div
          ref={divRef}
          className="absolute left-2 p-2 shadow-lg bg-base-100 rounded-box w-56 m-2 grid grid-cols-2 gap-2 border"
        >
          {images.map((foto) => (
            <div
              className="m-1"
              onClick={() => {
                setImgProfile(foto);
                setOpenImages(false);
              }}
            >
              <img
                src={foto}
                className="rounded-full border border-4 border-[#9CBED3]"
              ></img>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChooseImageProfile;
