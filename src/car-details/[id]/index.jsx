import HeadingDetails from "../components/HeadingDetails";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../../configs";
import { carImages, carListing } from "../../../configs/schema";
import { eq } from "drizzle-orm";
import service from "@/shared/service";
import ImageGallery from "../components/ImageGallery";
import Description from "../components/Description";
import Features from "../components/Features";
import OurPrice from "../components/OurPrice";
import Specification from "../components/Specification";
import OwnerDetails from "../components/OwnerDetails";
import MostSearchedCars from "../../components/MostSearchedCars";
import Header from "../../components/Header";
import Footer from "@/components/Footer";

const CarDetails = () => {
  const [carDetails, setCarDetails] = useState();
  const { id } = useParams();
  // Fetch car details based on id
  useEffect(() => {
    GetCarDetailsById();
  }, []);

  const GetCarDetailsById = async () => {
    const result = await db
      .select()
      .from(carListing)
      .innerJoin(carImages, eq(carListing.id, carImages.carListingId))
      .where(eq(carListing.id, id));

    const formatedResult = service.FormatResult(result);
    console.log(" Car Details result: ", formatedResult);
    setCarDetails(formatedResult[0]);
  };

  return (
    <div>
      <Header />
      <div className="px-10 md:px-20 my-10">
        {/* Header Details */}
        <HeadingDetails carDetails={carDetails} />

        <div className="grid grid-cols-1 md:grid-cols-3 w-full mt-10 gap-5">
          <div className="md:col-span-2">
            {/* Image Gallery */}
            <ImageGallery carDetails={carDetails} />

            {/* Description */}
            <Description carDetails={carDetails} />
            {/* Features */}
            <Features features={carDetails?.features} />
          </div>
          <div>
            {/* Our Price */}
            <OurPrice carDetails={carDetails} />
            {/* Specifications  */}
            <Specification carDetails={carDetails} />
            {/* Owner Details */}
            <OwnerDetails carDetails={carDetails} />
          </div>
        </div>
        <MostSearchedCars />
      </div>
      <Footer />
    </div>
  );
};

export default CarDetails;
