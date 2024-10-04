import Search from "@/components/ui/Search";
import { db } from "../../../configs";
import { carImages, carListing } from "../../../configs/schema";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "@/shared/service";
import CarItem from "@/components/ui/CarItem";
import Header from "@/components/Header";

const SearchByCategory = () => {
  const [carList, setCarList] = useState();

  const { category } = useParams();

  useEffect(() => {
    GetCarListingByCategory();
  }, []);

  const GetCarListingByCategory = async () => {
    const result = await db
      .select()
      .from(carListing)
      .innerJoin(carImages, eq(carListing.id, carImages.carListingId))
      .where(eq(carListing.category, category));

    const formatedResult = service.FormatResult(result);
    console.log("My Listing result: ", formatedResult);
    setCarList(formatedResult);
  };
  return (
    <div>
      <Header />
      <div className="p-16 bg-black flex justify-center">
        <Search />
      </div>
      <div className="px-10 md:px-20 my-10">
        <h2 className="font-bold text-4xl">{category}</h2>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {carList?.length > 0
            ? carList?.map((car) => (
                <div key={car.id}>
                  <CarItem car={car} />
                </div>
              ))
            : [1, 2, 3, 4, 5].map((item, index) => (
                <div
                  key={index}
                  className="h-[356px] bg-slate-200 rounded-lg"
                ></div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default SearchByCategory;
