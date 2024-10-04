/* eslint-disable no-unused-vars */

import carDetails from "@/shared/carDetails";
import features from "@/shared/features";
import InputField from "./components/InputField";
import DropdownField from "./components/DropdownField";
import TextAreaFeild from "./components/TextAreaFeild";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { db } from "../../configs";
import UploadImageField from "./components/UploadImageField";
import { TbLoader3 } from "react-icons/tb";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import moment from "moment";
import { toast } from "sonner";
import { carImages, carListing } from "../../configs/schema";
import { desc, eq } from "drizzle-orm";
import service from "@/shared/service";
import Header from "@/components/Header";

const AddListing = () => {
  const [formData, setFormData] = useState([]);
  const [carInfo, setCarInfo] = useState();
  const [featuresData, setFeaturesData] = useState([]);
  const [triggerUploadImagesOnAdd, setTriggerUploadImagesOnAdd] = useState();
  const [triggerUploadImagesOnEdit, setTriggerUploadImagesOnEdit] = useState();
  const [loader, setLoader] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const mode = searchParams.get("mode");
  const recordId = searchParams.get("id");

  useEffect(() => {
    if (mode === "edit") {
      GetListingDetails();
    }
  }, [mode]);

  const GetListingDetails = async () => {
    const result = await db
      .select()
      .from(carListing)
      .innerJoin(carImages, eq(carListing.id, carImages.carListingId))
      .where(eq(carListing.id, recordId))
      .orderBy(desc(carListing.id));

    const formatedResult = service.FormatResult(result);
    console.log("Final result: ", formatedResult);
    setCarInfo(formatedResult[0]);
    setFormData(formatedResult[0]);
    setFeaturesData(formatedResult[0]?.features);
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    console.log(formData);
  };

  const handleFeaturesChange = (name, value) => {
    setFeaturesData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    console.log(formData);
  };

  const onSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    console.log(formData);
    toast("please wait...");
    if (mode === "edit") {
      const result = await db
        .update(carListing)
        .set({
          ...formData,
          features: featuresData,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          userName: user?.fullName,
          userImageUrl: user?.imageUrl,
          createdDate: moment().format("MM/DD/YYYY"),
        })
        .where(eq(carListing.id, recordId))
        .returning({ id: carListing.id });

      if (result) {
        console.log("updated result", result);
        setTriggerUploadImagesOnEdit(result[0]?.id);
        setLoader(false);
      }

      setLoader(false);
    } else {
      try {
        const result = await db
          .insert(carListing)
          .values({
            ...formData,
            features: featuresData,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdDate: moment().format("MM/DD/YYYY"),
          })
          .returning({ id: carListing.id });

        if (result) {
          console.log("Saved", result);
          setTriggerUploadImagesOnAdd(result[0]?.id);
          setLoader(false);
        }
      } catch (err) {
        console.log("Error", err);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="px-10 md:px-20 my-10">
        <h2 className="font-bold text-4xl">Add New Listing</h2>
        <form className="p-10 border rounded-xl mt-10">
          <div>
            <h2 className="font-medium text-xl mb-6">Car Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {carDetails.carDetails.map((item, index) => (
                <div key={index}>
                  <div>
                    <label className="text-sm">
                      {item.label}{" "}
                      {item.required && <span className="text-red-600">*</span>}
                    </label>
                  </div>

                  {item.fieldType === "text" || item.fieldType === "number" ? (
                    <InputField
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : item.fieldType == "dropdown" ? (
                    <DropdownField
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : item.fieldType == "textarea" ? (
                    <TextAreaFeild
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />
          <div>
            <h2 className="font-medium text-xl my-6">Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {features.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Checkbox
                    checked={featuresData?.[feature.name]}
                    onCheckedChange={(value) =>
                      handleFeaturesChange(feature.name, value)
                    }
                  />{" "}
                  <h2>{feature.label}</h2>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />
          <div>
            <h2 className="font-medium text-xl my-6">Upload Images</h2>
            <UploadImageField
              carInfo={carInfo}
              mode={mode}
              triggerUploadImages={
                mode == "edit"
                  ? triggerUploadImagesOnEdit
                  : triggerUploadImagesOnAdd
              }
              setLoader={(val) => {
                setLoader(val);
                // navigate("/profile");
              }}
            />
          </div>

          <div className="mt-10 flex justify-end items-center">
            <Button
              type="submit"
              onClick={(e) => onSubmit(e)}
              disabled={loader}
            >
              {!loader ? (
                "Submit"
              ) : (
                <TbLoader3 className="animate-spin text-lg" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListing;
