import Header from "@/components/Header";
import Search from "@/components/ui/Search";
import service from "@/shared/service";
import { db } from "../../configs";
import { carImages, carListing } from "../../configs/schema";
import { eq, lte } from "drizzle-orm";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CarItem from "@/components/ui/CarItem";

const SearchByOptions = () => {
  const [searchParams] = useSearchParams();
  const [carList, setCarList] = useState([]);

  const condition = searchParams.get("condition");
  const make = searchParams.get("make");
  const price = searchParams.get("price");

  // Fetch car list based on search conditions
  useEffect(() => {
    GetCarListingBasedOnSearchOptions();
  }, []);

  const GetCarListingBasedOnSearchOptions = async () => {
    const result = await db
      .select()
      .from(carListing)
      .innerJoin(carImages, eq(carListing.id, carImages.carListingId))
      .where(condition != undefined && eq(carListing.condition, condition))
      .where(make != undefined && eq(carListing.make, make))
      .where(price != undefined && lte(price, carListing.sellingPrice));

    const formatedResult = service.FormatResult(result);
    console.log(" Search Options result: ", formatedResult);
    setCarList(formatedResult);
  };
  return (
    <div>
      <Header />
      <div className="p-16 bg-black flex justify-center">
        <Search />
      </div>
      <div className="px-10 md:px-20 my-10">
        <h2 className="font-bold text-4xl">Search Result</h2>
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

export default SearchByOptions;
