import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { db } from "../../../configs";
import { carImages, carListing } from "../../../configs/schema";
import { desc, eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import service from "@/shared/service";
import CarItem from "@/components/ui/CarItem";
import { MdDeleteSweep } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const MyListing = () => {
  const { user } = useUser();
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    user && GetUserCarListing();
  }, [user]);

  const GetUserCarListing = async () => {
    const result = await db
      .select()
      .from(carListing)
      .leftJoin(carImages, eq(carListing.id, carImages.carListingId))
      .where(eq(carListing.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(carListing.id));

    const formatedResult = service.FormatResult(result);
    console.log("My Listing result: ", formatedResult);
    setCarList(formatedResult);
  };

  const onDeleteCarListing = async (id) => {
    await db
      .delete(carImages)
      .where(eq(carImages.carListingId, id))
      .returning({ deletedId: carImages.carListingId });

    const deleteResult = await db
      .delete(carListing)
      .where(eq(carListing.id, id))
      .returning({ deletedId: carListing.id });

    const result = carList.filter(
      (item) => item.id != deleteResult[0].deletedId
    );
    setCarList(result);

    console.log("delete Result:", deleteResult);
  };

  return (
    <div>
      <div className="flex items-center justify-between mt-10">
        <h2 className="font-bold text-4xl">My Listing</h2>
        <Link to={"/addListing"}>
          <Button>+ Add New Listing</Button>
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {carList?.map((item, index) => (
          <div key={index}>
            <CarItem car={item} />
            <div className="flex justify-between p-2 bg-gray-50 rounded-lg gap-2">
              <Link
                to={"/addListing?mode=edit&id=" + item?.id}
                className="w-full"
              >
                <Button variant="outline" className="w-full">
                  Edit
                </Button>
              </Link>

              <AlertDialog>
                <AlertDialogTrigger>
                  <Button variant="destructive">
                    <MdDeleteSweep />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete{" "}
                      <span className="text-red-500"> {item.listingTitle}</span>{" "}
                      Car Listing and remove data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-500"
                      onClick={() => onDeleteCarListing(item.id)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListing;
