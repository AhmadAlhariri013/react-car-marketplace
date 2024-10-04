/* eslint-disable react/prop-types */
import { SlCalender } from "react-icons/sl";
import { IoMdSpeedometer } from "react-icons/io";
import { GiGearStickPattern } from "react-icons/gi";
import { LiaGasPumpSolid } from "react-icons/lia";
const HeadingDetails = ({ carDetails }) => {
  return (
    <div>
      <h2 className="font-bold text-3xl">{carDetails?.listingTitle}</h2>
      <p className="text-sm mt-1">{carDetails?.tagline}</p>

      <div className="mt-3 flex items-center gap-2">
        <div className="flex gap-2 items-center bg-blue-50 rounded-full py-2 px-3  ">
          <SlCalender className="w-5 h-5 text-primary" />
          <p className="text-primary text-sm">{carDetails?.year}</p>
        </div>
        <div className="flex gap-2 items-center bg-blue-50 rounded-full py-2 px-3  ">
          <IoMdSpeedometer className="w-5 h-5 text-primary" />
          <p className="text-primary text-sm">{carDetails?.mileage}</p>
        </div>
        <div className="flex gap-2 items-center bg-blue-50 rounded-full py-2 px-3  ">
          <GiGearStickPattern className="w-5 h-5 text-primary" />
          <p className="text-primary text-sm">{carDetails?.transmission}</p>
        </div>
        <div className="flex gap-2 items-center bg-blue-50 rounded-full py-2 px-3  ">
          <LiaGasPumpSolid className="w-5 h-5 text-primary" />
          <p className="text-primary text-sm">{carDetails?.fuelType}</p>
        </div>
      </div>
    </div>
  );
};

export default HeadingDetails;
