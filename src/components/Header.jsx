import {
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  const { isSignedIn } = useUser();
  return (
    <div className="flex justify-between items-center p-5 shadow-sm">
      <a href="/" className="flex items-center">
        <img src="./logo.svg" alt="logo" width={35} height={10} />{" "}
        <span className="text-xl font-bold ml-1 ">Aliens</span>
      </a>

      <ul className="hidden md:flex gap-16">
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
          <Link to={"/"}>Home</Link>
        </li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
          Search
        </li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
          New
        </li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
          Preowned
        </li>
      </ul>

      {isSignedIn ? (
        <div className="flex items-center gap-5">
          <UserButton />
          <Link to="/profile">
            <Button> Submit Listing</Button>
          </Link>
        </div>
      ) : (
        <>
          <Link to="/profile">
            <Button> Submit Listing</Button>
          </Link>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </>
      )}
    </div>
  );
};

export default Header;
