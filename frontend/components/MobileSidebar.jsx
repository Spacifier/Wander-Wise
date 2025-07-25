import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import NavItems from './NavItems';

function MobileSidebar() {
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    if (sidebarRef.current) {
      sidebarRef.current.toggle();
    }
  };

  return (
    <div className="mobile-sidebar wrapper">
      <header className="flex justify-between items-center p-4 border-b">
        <Link to="/" className="flex items-center gap-2">
          <img src="/img/logo.png" alt="logo" className="size-[35px]" />
          <h1 className="text-xl font-bold">Wander Wise</h1>
        </Link>

        <button onClick={toggleSidebar}>
          <img src="/icons/menu.svg" alt="menu" className="size-7" />
        </button>
      </header>

      <SidebarComponent
        width={79}
        ref={sidebarRef}
        created={() => sidebarRef.current.hide()}
        closeOnDocumentClick={true}
        showBackdrop={true}
        type="Over"
      >
        <NavItems handleClick={toggleSidebar} />
      </SidebarComponent>
    </div>
  );
}

export default MobileSidebar;
