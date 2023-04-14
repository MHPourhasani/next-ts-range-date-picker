import Image from "next/image";

// interface
import { ArrowProps } from "./ArrowInterface";

// icons
import ArrowRight from "../../assets/svg/arrow-right.svg";

const Arrow: React.FC<ArrowProps> = ({ direction, onClick, disabled }) => {
  return (
    <span
      onClick={onClick}
      className={`flex cursor-pointer items-center justify-center rounded-full hover:text-primary ${direction} ${
        disabled ? "text-secondary400" : ""
      }`}
    >
      {direction === "right" ? (
        <Image src={ArrowRight} alt="Arrow Right" />
      ) : (
        <Image src={ArrowRight} alt="Arrow Left" className="rotate-180" />
      )}
    </span>
  );
};

export default Arrow;
