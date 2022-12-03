import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";

const NoHeaderLayout = () => {
  return (
    <>
      <div id="content-body">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default NoHeaderLayout;
