/* eslint-disable react/prop-types */
import IconField from "@/add-listing/components/IconField";
import CarSpecification from "@/shared/CarSpecification";

const Specification = ({ carDetails }) => {
  return (
    <div className="p-10 rounded-xl bg-white shadow-md border">
      <p className="my-2 font-medium text-2xl">Specifications</p>
      <div>
        {CarSpecification.map((item, index) => (
          <div key={index} className="mt-6 flex items-center justify-between">
            <h2 className="flex gap-2">
              <IconField icon={item?.icon} /> {item?.label}
            </h2>
            <h2>{carDetails?.[item.name]}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Specification;
