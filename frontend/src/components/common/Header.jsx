import {Link,NavLink} from 'react-router-dom'
import React, { useState,useRef, useEffect } from 'react';
import SearchInput from './SearchInput.jsx'; 
import {useWindowScroll} from 'react-use';
import gsap from 'gsap';

const navItems =['Explore', 'TV-Shows', 'Watchlist'];

function Header(){
    const [isAudioPlaying,setisAudioPlaying] = useState(false);
    const [isIndicatorActive,setisIndicatorActive] = useState(false);
    const [lastScrollY,setlastScrollY] = useState(0);
    const [isNavVisible,setisNavVisible] = useState(true);
    
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

    useEffect(()=> {
        if(isAudioPlaying){
            audioElementRef.current.play();
        } else {
            audioElementRef.current.pause();
        }
    }, [isAudioPlaying])

    return (
        <div ref={navContainerRef} className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6">
            <header className="absolute top-1/2 w-full -translate-y-1/2">
                <nav className="flex size-full items-center justify-between p-4">
                    <div className="flex items-center gap-7">
                        <Link to="/">
                            <img src="/img/logo.png" alt="Popcorn Picks" className="w-9 rounded-full" />
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
    );
}

export default Header
