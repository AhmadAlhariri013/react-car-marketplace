/* eslint-disable react/prop-types */
const ImageGallery = ({ carDetails }) => {
  return (
    <div>
      {carDetails?.images[0] ? (
        <img
          src={carDetails?.images[0].imageUrl}
          alt={carDetails?.listingTitle + "Image"}
          className=" w-full h-[500px] object-cover rounded-lg"
        />
      ) : (
        <div className="bg-slate-200 rounded-xl h-[500px] w-full animate-pulse mb-10"></div>
      )}
    </div>
  );
};

export default ImageGallery;
