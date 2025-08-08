import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";

function MainLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout;