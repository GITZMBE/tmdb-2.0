import { Outlet } from "react-router-dom";
import Header from "../components/connectors/Layout/Header";
import Footer from "../components/connectors/Layout/Footer";

export const Layer = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layer;
