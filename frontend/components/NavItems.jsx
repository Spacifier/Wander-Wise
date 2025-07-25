import {Link,NavLink} from 'react-router-dom';
import { sidebarItems } from '../src/constants';
import { cn } from '../src/lib/utils';
import { useAuth } from '../src/root/AuthProvider';
import { TbLogout } from "react-icons/tb";

function NavItems({handleClick}){
    const { user, logout } = useAuth();

    return (
        <section className="flex flex-col h-29/30 bg-gray-800 rounded-xl fixed z-2 w-20">
            <Link to='/' className='flex flex-center py-10' >
                <img src="/img/logo3.png" alt="logo" className='size-[45px] rounded-full invert'/>
            </Link> 
            <div className="flex flex-col justify-between h-full">
                <nav className='flex flex-col gap-3 pt-9'>
                    {sidebarItems.map(({ id, href, icon, label }) => (
                    <NavLink to={href} key={id}>
                        {({ isActive }) => (
                            <div
                            className={cn(
                                'group relative flex items-center justify-center w-full h-12 transition-all duration-300',
                                isActive ? 'bg-light-200 text-white rounded-r-full py-8' : 'rounded-full hover:bg-gray-900 hover:shadow-xl'
                            )}
                            onClick={handleClick}
                            >
                                <img
                                    src={icon}
                                    alt={label}
                                    className={cn('size-6 transition-all',
                                    isActive ? 'brightness-0' : 'brightness-100 invert'
                                    )}
                                />
                                {/* Tooltip Label on Hover */}
                                <span className="absolute left-22 bg-gray-800 text-white text-sm font-medium px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                                    {label}
                                </span>
                            </div>
                        )}
                    </NavLink>
                    ))}
                </nav>
                <footer className='nav-footer flex flex-center'>
                    {/* <img src={user?.avatar || getRandomAvatar()} alt={user?.username || 'WanderWise User'} />
                    <article>
                        <h2> {user?.username} </h2>
                        <p> {user?.email} </p>
                    </article> */}
                    <button 
                        onClick={logout}
                        className="p-2 rounded-full bg-gray-800 hover:bg-gray-600 transition-colors cursor-pointer"
                    >
                        <TbLogout  className="size-6 text-white"/>
                    </button>
                </footer>
            </div>
        </section>
    );
}

export default NavItems