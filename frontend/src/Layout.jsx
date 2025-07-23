import { Outlet } from "react-router-dom";
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";

function Layout(){

    return (
        <div className="overflow-hidden">
        <Header />
        <Outlet />
        <Footer />
        </div>
    );
}

export default Layout