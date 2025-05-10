import { useEffect } from "react";
import Autoslide from "../Components/Autoslide";
import Body from "../Components/Body";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <Autoslide />
      <Body />
    </>
  );
};

export default Home;
