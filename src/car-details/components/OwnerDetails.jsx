import { Button } from "@/components/ui/button";

/* eslint-disable react/prop-types */
const OwnerDetails = ({ carDetails }) => {
  return (
    <div className="p-10 rounded-xl bg-white shadow-md border mt-6">
      <p className="my-2 font-medium text-2xl">Owner / Deal</p>
      {carDetails?.userImageUrl ? (
        <img
          src={carDetails?.userImageUrl}
          alt={carDetails?.userName + " Image"}
          className="w-[70px] h-[70px] rounded-full"
        />
      ) : (
        <div className="bg-slate-200 rounded-full h-[70px] w-[70px]"></div>
      )}

      <h2 className="mt-2 font-bold text-xl">{carDetails?.userName}</h2>
      <h2 className="mt-2 text-gray-500">{carDetails?.createdBy}</h2>
      <Button className="w-full mt-6">Message Owner</Button>
    </div>
  );
};

export default OwnerDetails;
