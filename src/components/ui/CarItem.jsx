import { Separator } from "@radix-ui/react-select";
import { PiGasPumpFill } from "react-icons/pi";
import { BsSpeedometer } from "react-icons/bs";
import { GiGearStick } from "react-icons/gi";
import { RxOpenInNewWindow } from "react-icons/rx";
import { Link } from "react-router-dom";
/* eslint-disable react/prop-types */
const CarItem = ({ car }) => {
  return (
    <Link to={"/carDetails/" + car.id}>
      <div className="rounded-xl bg-white border hover:shadow-md cursor-pointer">
        <h2 className="absolute bg-primary text-white m-2 rounded-xl text-sm p-2">
          New
        </h2>
        {car.images[0] && (
          <img
            src={car?.images[0]?.imageUrl}
            alt={car?.listingTitle}
            width={"100%"}
            height={250}
            className="rounded-t-xl object-cover h-[180px]"
          />
        )}

        <div className="p-4">
          <h2 className="text-lg font-bold mb-2 line-clamp-1">
            {car?.listingTitle}
          </h2>
          <Separator className="my-2" />
          <div className="grid grid-cols-3 mt-5">
            <div className="flex flex-col items-center justify-center">
              <PiGasPumpFill className="text-lg mb-2 text-primary" />
              <span>{car?.mileage}</span>
            </div>

            <div className="flex flex-col items-center justify-center">
              <BsSpeedometer className="text-primary text-lg mb-2" />
              <span>{car?.fuelType}</span>
            </div>

            <div className="flex flex-col items-center justify-center">
              <GiGearStick className="text-primary text-lg mb-2" />
              <span>{car?.transmission}</span>
            </div>
          </div>

          <Separator className="shrink-0 bg-border h-[1px] w-full my-2" />

          <div className="flex items-center justify-between gap-3">
            <h2 className="font-bold text-xl">{car.sellingPrice}$</h2>
            <h2 className="text-primary text-sm flex items-center">
              View Details
              <RxOpenInNewWindow />
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CarItem;
