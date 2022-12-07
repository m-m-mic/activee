import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { LoginHeader } from "../components/LoginHeader";

export default function LoginLayout() {
  return (
    <>
      <LoginHeader />
      <div id="content-body">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
