import data from "@/shared/data";
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <div className="mt-40">
      <h2 className="font-bold text-3xl text-center mb-6 ">Browse By Type</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-6 px-20">
        {data.Category.map((Category, index) => (
          <Link key={index} to={"/search/" + Category.name}>
            <div className="flex flex-col items-center p-3 border rounded-xl hover:shadow-md cursor-pointer">
              <img
                src={Category.icon}
                alt={"Category" + Category.id}
                width={35}
                height={35}
              />
              <h2 className="mt-2">{Category.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
