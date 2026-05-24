import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import { IoLogoWhatsapp } from "react-icons/io";
import { HiChevronDown, HiMenu, HiX } from 'react-icons/hi';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { services } from '../data/services';

export const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  const closeMenus = () => {
    setIsMobileOpen(false);
    setIsServicesOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-semibold transition hover:text-orange-300 ${
      isActive ? 'text-orange-300' : 'text-orange-50/80'
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-orange-500/20 bg-neutral-950/90 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-3 py-3 text-orange-50 md:px-8">
        <div className="flex items-center">
          <Link to="/" onClick={closeMenus}>
            <img src={logo} alt="Technical Tiwari Ji Logo" className="h-12" />
          </Link>
        </div>

        <div className="hidden items-center gap-7 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsServicesOpen((current) => !current)}
              className={`flex items-center gap-1 text-sm font-semibold transition hover:text-orange-300 ${
                location.pathname.startsWith('/services') ? 'text-orange-300' : 'text-orange-50/80'
              }`}
              aria-expanded={isServicesOpen}
            >
              Services
              <HiChevronDown className={`text-lg transition ${isServicesOpen ? 'rotate-180' : ''}`} />
            </button>

            {isServicesOpen && (
              <div className="absolute left-1/2 top-9 w-80 -translate-x-1/2 rounded-2xl border border-orange-500/20 bg-neutral-950 p-3 shadow-2xl shadow-black/40">
                <div className="grid gap-1">
                  {services.map((service) => {
                    const Icon = service.icon;
                    return (
                      <Link
                        key={service.slug}
                        to={`/services/${service.slug}`}
                        onClick={closeMenus}
                        className="group flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-orange-500/10"
                      >
                        <Icon className={`shrink-0 text-lg ${service.color}`} />
                        <span>
                          <span className="block text-sm font-semibold text-orange-50 group-hover:text-orange-300">
                            {service.shortTitle}
                          </span>
                          <span className="block text-xs text-orange-100/55">
                            {service.title}
                          </span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <NavLink to="/blog" className={navLinkClass}>
            Blog
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <a href="https://wa.me/917633093222" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
            <IoLogoWhatsapp className="text-3xl text-green-500 transition hover:text-green-400" />
          </a>
          <a href="tel:+917633093222" className="rounded-md bg-orange-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-orange-600">
            +91 7633093222
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileOpen((current) => !current)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-orange-500/20 bg-white/5 text-2xl text-orange-100 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {isMobileOpen && (
        <div className="border-t border-orange-500/15 bg-neutral-950 px-4 py-4 md:hidden">
          <div className="grid gap-2">
            <NavLink to="/" onClick={closeMenus} className={navLinkClass}>
              Home
            </NavLink>

            <button
              type="button"
              onClick={() => setIsServicesOpen((current) => !current)}
              className="flex w-full items-center justify-between py-2 text-left text-sm font-semibold text-orange-50/80"
              aria-expanded={isServicesOpen}
            >
              Services
              <HiChevronDown className={`text-lg transition ${isServicesOpen ? 'rotate-180' : ''}`} />
            </button>

            {isServicesOpen && (
              <div className="grid gap-1 rounded-2xl border border-orange-500/15 bg-white/5 p-2">
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <Link
                      key={service.slug}
                      to={`/services/${service.slug}`}
                      onClick={closeMenus}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-orange-100/80 transition hover:bg-orange-500/10"
                    >
                      <Icon className={`shrink-0 text-lg ${service.color}`} />
                      {service.title}
                    </Link>
                  );
                })}
              </div>
            )}

            <NavLink to="/blog" onClick={closeMenus} className={navLinkClass}>
              Blog
            </NavLink>
            <NavLink to="/contact" onClick={closeMenus} className={navLinkClass}>
              Contact
            </NavLink>
          </div>

          <div className="mt-4 grid grid-cols-[auto_1fr] items-center gap-3 border-t border-orange-500/15 pt-4">
            <a href="https://wa.me/917633093222" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
              <IoLogoWhatsapp className="text-3xl text-green-500" />
            </a>
            <a href="tel:+917633093222" className="rounded-md bg-orange-500 px-3 py-2 text-center text-sm font-semibold text-white">
              Call +91 7633093222
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
