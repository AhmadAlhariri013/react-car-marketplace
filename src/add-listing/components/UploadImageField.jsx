/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { db } from "../../../configs";
import { storage } from "../../../configs/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { carImages } from "../../../configs/schema";
import { eq } from "drizzle-orm";
const UploadImageField = ({
  triggerUploadImages,
  setLoader,
  carInfo,
  mode,
}) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [editCarImageList, setEditCarImageList] = useState([]);

  useEffect(() => {
    if (mode === "edit") {
      setEditCarImageList([]);
      carInfo?.images?.forEach((image) => {
        setEditCarImageList((prev) => [...prev, image?.imageUrl]);
      });
    }
  }, [carInfo]);

  useEffect(() => {
    if (triggerUploadImages) {
      console.log("selectedImages", selectedImages);
      UploadImages();
    }
  }, [triggerUploadImages]);

  const onFilesSelected = (event) => {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setSelectedImages((prev) => [...prev, file]);
    }
  };

  const onImageRemove = (image) => {
    const result = selectedImages.filter((item) => item != image);
    setSelectedImages(result);
  };

  const onImageRemoveFromDb = async (image, index) => {
    const result = await db
      .delete(carImages)
      .where(eq(carImages.id, carInfo?.images[index].id));
    const imageList = editCarImageList.filter((item) => item != image);
    setEditCarImageList(imageList);
  };

  const UploadImages = () => {
    setLoader(true);
    selectedImages.forEach((image) => {
      const fileName = Date.now() + ".jpeg";
      const storageRef = ref(storage, "car-marketplace/" + fileName);
      const metaData = { contentType: "image/jpeg" };
      uploadBytes(storageRef, image, metaData)
        .then((snapShot) => {
          console.log("Image Uploaded Successfully");
        })
        .then((resp) => {
          getDownloadURL(storageRef).then(async (downloadUrl) => {
            console.log("downloadUrl", downloadUrl);
            await db.insert(carImages).values({
              imageUrl: downloadUrl,
              carListingId: triggerUploadImages,
            });
          });
        });
    });
    setLoader(false);
    console.log("Image upload complete");
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
      {mode === "edit" &&
        editCarImageList.map((image, index) => (
          <div key={index}>
            <IoIosCloseCircle
              className="absolute m-2 text-lg text-red-400"
              onClick={() => onImageRemoveFromDb(image, index)}
            />
            <img
              src={image}
              alt={carInfo?.listingTitle}
              className="w-full h-[130px] object-cover rounded-xl"
            />
          </div>
        ))}
      {selectedImages.map((image, index) => (
        <div key={index}>
          <IoIosCloseCircle
            className="absolute m-2 text-lg text-red-400"
            onClick={() => onImageRemove(image)}
          />
          <img
            src={URL.createObjectURL(image)}
            alt={image}
            className="w-full h-[130px] object-cover rounded-xl"
          />
        </div>
      ))}
      <label htmlFor="upload-image">
        <div className="border rounded-xl border-dotted border-primary bg-blue-100 p-10 cursor-pointer hover:shadow-md h-[130px] flex items-center justify-center">
          <h2 className="text-lg text-center text-primary">+</h2>
        </div>
      </label>

      <input
        type="file"
        multiple={true}
        className="opacity-0"
        id="upload-image"
        onChange={onFilesSelected}
      />
    </div>
  );
};

export default UploadImageField;
