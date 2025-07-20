import { Outlet } from "react-router-dom";
import {SidebarComponent} from '@syncfusion/ej2-react-navigations';
import { MobileSidebar, NavItems } from "../components";

function AdminLayout(){

    return (
        <div className="admin-layout">

            {/* small side bar for mobiles only */}
            <MobileSidebar />

            {/* sidebar for desktop and large screens */}
            <aside className=" w-full max-w-[270px] hidden lg:block">
                <SidebarComponent width={270} enableGestures={false}>
                    <NavItems />
                </SidebarComponent>
            </aside>
            
            <aside className="children">
                <Outlet />
            </aside>
        </div>
    );
}

export default AdminLayout