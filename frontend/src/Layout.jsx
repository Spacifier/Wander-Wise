import { Outlet } from "react-router-dom";
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";

function Layout(){

    return (
        <>
        <Header />
        <Outlet />
        <Footer />
        </>
    );
}

export default Layout