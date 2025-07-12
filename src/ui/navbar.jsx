'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';


export default function Navbar() {
  const [isAtTop, setIsAtTop] = useState(true);
  useEffect(() => {
    function handleScroll(){
      if(window.scrollY === 0){
        setIsAtTop(true);
      } else {
        setIsAtTop(false)
      }
    }
    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

return (
    <nav
    className={`fixed w-full bg-[#f7611c] text-white px-20 py-5 flex items-center justify-between z-50 transition-all duration-400
    ${isAtTop ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}
    >

        {/* Logo */}
        <div className="flex items-center">
            <Image
            src="/images/logo.png"
            alt="Logo"
            width={100}
            height={40}
            className=""
            />
        </div>

        {/* Navigation links */}
        <ul className="flex space-x-6 text-sm ">
            <li><a href="#">Work</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li className="relative">
                <a href="#">Ideas</a>
                <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-4 h-1 bg-white rounded"></div>
            </li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
    </nav>
);
}
