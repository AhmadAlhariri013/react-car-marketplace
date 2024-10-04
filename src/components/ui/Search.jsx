import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "./separator";
import { CiSearch } from "react-icons/ci";
import data from "@/shared/data";
import { Link } from "react-router-dom";
import { useState } from "react";

const Search = () => {
  const [condition, setCondition] = useState();
  const [make, setMake] = useState();
  const [price, setPrice] = useState();
  return (
    <div className="flex flex-col md:flex-row justify-around items-center gap-10 w-[60%] p-2 md:p-5 px-5 md:rounded-full rounded-md bg-white ">
      <Select onValueChange={(value) => setCondition(value)}>
        <SelectTrigger className="outline-none md:border-none text-lg w-full shadow-none">
          <SelectValue placeholder="Cars" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="New">New</SelectItem>
          <SelectItem value="Old">Old</SelectItem>
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="hidden md:block" />
      <Select onValueChange={(value) => setMake(value)}>
        <SelectTrigger className="outline-none md:border-none text-lg w-full shadow-none">
          <SelectValue placeholder="Car Makes" />
        </SelectTrigger>
        <SelectContent>
          {data.CarMakes.map((carMake) => (
            <SelectItem value={carMake.name} key={carMake.id}>
              {carMake.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="hidden md:block" />
      <Select onValueChange={(value) => setPrice(value)}>
        <SelectTrigger className="outline-none md:border-none text-lg w-full shadow-none">
          <SelectValue placeholder="Pricing" />
        </SelectTrigger>
        <SelectContent>
          {data.Pricing.map((price) => (
            <SelectItem value={price.amount} key={price.id}>
              ${price.amount}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Link
        to={
          "/search?condition=" + condition + "&make=" + make + "&price=" + price
        }
      >
        <CiSearch className="text-[50px] bg-primary rounded-full p-3 text-white hover:scale-105 transition-all cursor-pointer" />
      </Link>
    </div>
  );
};

export default Search;
