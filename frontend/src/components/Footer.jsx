import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { services } from '../data/services';
import { siteConfig } from '../lib/siteConfig';

export default function Footer() {
  return (
    <footer className="border-t border-orange-500/20 bg-neutral-950 py-12 text-orange-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 text-sm sm:grid-cols-2 md:grid-cols-4">
        <div>
          <h3 className="mb-3 inline-block border-b-2 border-orange-400 text-lg font-semibold text-orange-400">
            About Us
          </h3>
          <p className="mt-2 leading-relaxed text-orange-100/75">
            I specialize in full-stack MERN development, crafting dynamic web applications tailored to your business needs.
            Our expertise ensures seamless integration of MongoDB, Express.js, React, and Node.js for optimal performance.
          </p>
          <p className="mt-3 leading-relaxed text-orange-100/75">
            <Link to="/about-himanshhu-tiwari" className="font-semibold text-orange-300 transition hover:text-orange-400">
              Meet Himanshhu Tiwari
            </Link>
            , Full Stack Web Developer.
          </p>
        </div>

        <div>
          <h3 className="mb-3 inline-block border-b-2 border-orange-400 text-lg font-semibold text-orange-400">
            Quick Links
          </h3>
          <ul className="mt-2 space-y-2">
            <li><Link to="/" className="transition hover:text-orange-400">Home</Link></li>
            <li><Link to="/blog" className="transition hover:text-orange-400">Blog</Link></li>
            <li><Link to="/contact" className="transition hover:text-orange-400">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 inline-block border-b-2 border-orange-400 text-lg font-semibold text-orange-400">
            Services
          </h3>
          <ul className="mt-2 space-y-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link to={`/services/${service.slug}`} className="transition hover:text-orange-400">
                  {service.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 inline-block border-b-2 border-orange-400 text-lg font-semibold text-orange-400">
            Contact Info
          </h3>
          <div className="mt-3 flex items-start gap-2 text-orange-100/75">
            <FaMapMarkerAlt className="mt-1 text-orange-400" />
            <p>C-546 New Ashok Nagar, New Delhi</p>
          </div>
          <div className="mt-3 flex items-center gap-2 text-orange-100/75">
            <FaEnvelope className="text-orange-400" />
            <p>{siteConfig.email}</p>
          </div>
          <div className="mt-4 flex gap-4 text-lg text-orange-400">
            <FaFacebookF className="cursor-pointer transition hover:text-orange-200" />
            <FaTwitter className="cursor-pointer transition hover:text-orange-200" />
            <FaInstagram className="cursor-pointer transition hover:text-orange-200" />
            <FaLinkedinIn className="cursor-pointer transition hover:text-orange-200" />
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-orange-500/10 pt-4 text-center text-sm text-orange-100/55">
        © 2025@TechnicalTiwarii. All rights reserved.
      </div>
    </footer>
  );
}
