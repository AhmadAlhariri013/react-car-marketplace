import Category from "./components/Category";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MostSearchedCars from "./components/MostSearchedCars";
import NewCollection from "./components/NewCollection";

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Category />
      <MostSearchedCars />
      <NewCollection />
      <Footer />
    </div>
  );
};

export default Home;
