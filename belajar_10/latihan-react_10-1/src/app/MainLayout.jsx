import { Outlet } from "react-router-dom";
import NavbarComponent from "../pages/layouts/Navbar";
import FooterComponent from "../pages/layouts/Footer";

export default function MainLayout() {
  return (
    <>
      <NavbarComponent />
      <main className="my-4">
        <Outlet />
      </main>
      <FooterComponent />
    </>
  );
}
