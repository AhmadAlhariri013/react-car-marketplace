/* eslint-disable react/prop-types */
import { IoIosCheckmarkCircle } from "react-icons/io";
const Features = ({ features }) => {
  return (
    <div>
      <div className="p-10 rounded-xl bg-white shadow-md mt-6 border">
        <p className="my-2 font-medium text-2xl">Features</p>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-5">
          {features &&
            Object?.entries(features).map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <IoIosCheckmarkCircle className="text-blue-400 text-lg" />
                <p>{feature}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
