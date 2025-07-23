import {Link,NavLink} from 'react-router-dom';
import { sidebarItems } from '../src/constants';
import { cn, getRandomAvatar } from '../src/lib/utils';
import { useEffect, useState } from 'react';
import { useAuth } from '../src/root/AuthProvider';

function NavItems({handleClick}){
    const { user, logout } = useAuth();

    return (
        <section className="nav-items">
            <Link to='/' className='link-logo' >
                <img src="/img/logo.png" alt="logo" className='size-[35px]'/>
                <h1>Wander Wise</h1>
            </Link> 
            <div className="container">
                <nav>
                    {sidebarItems.map(({id, href, icon, label}) => (
                        <NavLink to={href} key={id}> 
                            {({isActive}) => (
                                <div className={cn('group nav-item', {
                                    'bg-primary-100 !text-white': isActive
                                })} onClick={handleClick}>
                                    <img src={icon} alt={label} className={`group-hover:brightness-0 size-5 group-hover:invert ${isActive? 'brightness-0 invert' : 'text-dark-200'}`} />
                                    {label}
                                </div>
                            )}
                        </NavLink>
                    ))}
                </nav>
                <footer className='nav-footer'>
                    <img src={user?.avatar || getRandomAvatar()} alt={user?.username || 'WanderWise User'} />
                    <article>
                        <h2> {user?.username} </h2>
                        <p> {user?.email} </p>
                    </article>
                    <button 
                        onClick={logout}
                        className='cursor-pointer'
                    >
                        <img src="/icons/logout.svg" alt="logout" className='size-6'/>
                    </button>
                </footer>
            </div>
        </section>
    );
}

export default NavItems