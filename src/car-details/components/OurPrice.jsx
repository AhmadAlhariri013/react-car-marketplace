import { Button } from "@/components/ui/button";
import { MdOutlineLocalOffer } from "react-icons/md";
/* eslint-disable react/prop-types */
const OurPrice = ({ carDetails }) => {
  return (
    <>
      <div className="p-10 rounded-xl bg-white shadow-md border">
        <p className="my-2 font-medium text-2xl">Our Price</p>
        <p className="font-bold text-4xl">${carDetails?.sellingPrice}</p>
        <Button className="w-full mt-6" size="lg">
          <MdOutlineLocalOffer className="mr-2 text-lg" /> Make an Offer Price
        </Button>
      </div>
    </>
  );
};

export default OurPrice;
