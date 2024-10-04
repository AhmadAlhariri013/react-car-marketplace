import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CarItem from "./ui/CarItem";

import { db } from "../../configs";
import { carImages, carListing } from "../../configs/schema";
import { desc, eq } from "drizzle-orm";
import service from "@/shared/service";
import { useEffect, useState } from "react";

const MostSearchedCars = () => {
  const [carList, setCarList] = useState();

  useEffect(() => {
    GetMostPopularCarListing();
  }, []);

  const GetMostPopularCarListing = async () => {
    const result = await db
      .select()
      .from(carListing)
      .leftJoin(carImages, eq(carListing.id, carImages.carListingId))
      .orderBy(desc(carListing.id));

    const formatedResult = service.FormatResult(result);
    console.log("result: ", formatedResult);
    setCarList(formatedResult);
  };

  return (
    <div className="mx-24 hidden md:block">
      <h2 className="text-center text-3xl font-bold mt-16 mb-7">
        Most Searched Cars
      </h2>

      <Carousel>
        <CarouselContent>
          {carList?.map((car, index) => (
            <CarouselItem key={index} className="  basis-2/4 lg:basis-1/4">
              <CarItem car={car} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default MostSearchedCars;
