/* eslint-disable react/prop-types */
const Description = ({ carDetails }) => {
  return (
    <>
      {carDetails?.listingDescription ? (
        <div className="p-10 rounded-xl bg-white shadow-md mt-6 border">
          <p className="my-2 font-medium text-2xl">Description</p>
          <p>{carDetails?.listingDescription}</p>
        </div>
      ) : (
        <div className="bg-slate-200 w-full h-[150px] animate-pulse rounded-xl"></div>
      )}
    </>
  );
};

export default Description;
