import {Link,useNavigate, NavLink} from 'react-router-dom'
import React, { useState,useRef, useEffect } from 'react';
import SearchInput from './SearchInput.jsx'; 
import {useWindowScroll} from 'react-use';
import gsap from 'gsap';
import { useAuth } from '../../root/AuthProvider.jsx';
import { TbLogout } from 'react-icons/tb';
import { getRandomAvatar } from '../../lib/utils.js';

const navItems =['Explore'];

function Header(){
    const navigate = useNavigate();
    const [isAudioPlaying,setisAudioPlaying] = useState(false);
    const [isIndicatorActive,setisIndicatorActive] = useState(false);
    const [lastScrollY,setlastScrollY] = useState(0);
    const [isNavVisible,setisNavVisible] = useState(true);
    const { user, logout } = useAuth();
    
    
    const navContainerRef = useRef(null);
    const audioElementRef = useRef(null);
    const {y: currentScrollY }= useWindowScroll();

    //to make nav visible when move up
    useEffect(()=> {
        if(currentScrollY === 0){
            setisNavVisible(true);
            navContainerRef.current.classList.remove('floating-nav');
        }else if(currentScrollY > lastScrollY){
            setisNavVisible(false);
            navContainerRef.current.classList.add('floating-nav');
        }else if(currentScrollY < lastScrollY){
            setisNavVisible(true);
            navContainerRef.current.classList.add('floating-nav');
        }

        setlastScrollY(currentScrollY);
    },  [currentScrollY, lastScrollY])

    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible? 0: -100,
            opacity: isNavVisible? 1: 0,
            duration: 0.2,
        })
    }, [isNavVisible])

    //for audio controlls
    const toggleAudioIndicator =() => {
        setisAudioPlaying((prev) => !prev);
        setisIndicatorActive((prev) => !prev); 
    }

    //for profile
    const openProfile = () => {
        navigate('/')
    }

    useEffect(()=> {
        if(isAudioPlaying){
            audioElementRef.current.play();
        } else {
            audioElementRef.current.pause();
        }
    }, [isAudioPlaying])

    return (
        <>
        <div ref={navContainerRef} className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6">
            <header className="absolute top-1/2 w-full -translate-y-1/2">
                <nav className="flex size-full items-center justify-between p-4">
                    <div className="flex items-center gap-7">
                        <Link to="/">
                            <img src="/img/logo3.png" alt="Wander Wise" className="w-9 rounded-full invert" />
                        </Link>
                        <SearchInput containerClass="!bg-blue-50 md:flex hidden items-center justify-center gap-1" />
                    </div>
                    <div className="flex h-full items-center">
                        <div className="hidden md:block">
                            <NavLink to="/" className="nav-hover-btn">
                                Home
                            </NavLink>
                            {navItems.map((item) => (
                                <NavLink key={item} to={`/${item.toLowerCase()}`} className="nav-hover-btn">
                                    {item}
                                </NavLink>
                            ))}
                            <button 
                                onClick={logout}
                                className="nav-hover-btn"
                            >
                                Logout
                            </button>
                        </div>
                        <button title='bg-music' className="ml-10 flex items-center space-x-0.5 cursor-pointer" onClick={toggleAudioIndicator}>
                            <audio src="/audio/loop.mp3" ref={audioElementRef} className="hidden" loop />
                                {[1,2,3,4].map((bar) => (
                                    <div key={bar} 
                                        className={`indicator-line ${isIndicatorActive? 'active' : ''}`}
                                        style={{animationDelay: `${bar*0.1}s`}}
                                    />
                                ))}
                        </button>
                    </div>
                </nav>
            </header>
        </div>
        <div className='fixed bottom-10 ml-8 z-50'>
            <div className='group relative transition-all duration-300 w-10 hover:w-55 h-10 bg-[#4d4d4d90] rounded-full flex items-center overflow-hidden'>
                <img 
                    src={user?.avatar || getRandomAvatar()} 
                    alt={user?.username || 'WanderWise User'} 
                    onClick={openProfile}
                    className='w-10 h-10 rounded-full transition-all duration-300'
                />
                <div className='m-2 text-white text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap'>
                    <h2 className="font-semibold">{user?.username || 'WanderWise User'}</h2>
                    <p className="text-xs">{user?.email}</p>
                </div>
            </div>
        </div>
        </>
    );
}

export default Header
