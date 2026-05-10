import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import { HiMenu, HiX } from 'react-icons/hi';
import { IoLogoWhatsapp } from "react-icons/io";

import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-orange-500/20 bg-neutral-950/90 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-2 py-3 text-orange-50 md:px-8">
        <div className="flex items-center">
         <Link to="/"> <img src={logo} alt="Logo" className="h-12" /></Link>
        </div>

      
         <div className="hidden md:flex items-center gap-5">
         <Link to="https://wa.me/917633093222" target="_blank" rel="noopener noreferrer">
            <button>
              <IoLogoWhatsapp className="text-green-500 text-3xl cursor-pointer" />
            </button>
          </Link>

          <button >
            <a href="tel:+917633093222" className="bg-orange-500 text-sm text-white rounded-md p-2 font-medium transition hover:text-orange-200 cursor-pointer">+91 7633093222</a>
          </button>
        </div>
      </div> 

     
    </nav>
  );
};
