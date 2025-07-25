import { Outlet } from "react-router-dom";
import {SidebarComponent} from '@syncfusion/ej2-react-navigations';
import { MobileSidebar, NavItems } from "../components";

function AdminLayout(){

    return (
        <div className="admin-layout">

            {/* small side bar for mobiles only */}
            <MobileSidebar />

            {/* sidebar for desktop and large screens */}
            <aside className=" w-[90px] m-3 hidden lg:block shadow-r-xl rounded-xl">
                    <NavItems />
            </aside>
            
            <aside className="children">
                <Outlet />
            </aside>
        </div>
    );
}

export default AdminLayout