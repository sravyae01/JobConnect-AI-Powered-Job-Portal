import Navbar from "../common/Navbar";
import Hero from "./Hero";
import TopCompanies from "./TopCompanies";
import FeaturedJobs from "./FeaturedJobs";
import Footer from "../common/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <TopCompanies />
      <FeaturedJobs />
      <Footer />
    </>
  );
};

export default Home;