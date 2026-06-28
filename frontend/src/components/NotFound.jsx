import React from 'react';
import { FaSadTear, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SeoHead } from './seo/SeoHead';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-white px-6 py-12">
      <SeoHead
        title="Page Not Found | Himanshhu Tiwari"
        description="The page you're looking for doesn't exist or has been moved."
        robots="noindex, follow"
      />
      <div className="text-center animate-fade-in-up">
        <div className="mb-4 flex justify-center">
          <FaSadTear className="text-6xl text-cyan-500 animate-bounce" />
        </div>
        <h1 className="text-7xl font-extrabold text-cyan-600">404</h1>
        <h2 className="mt-2 text-2xl font-bold text-gray-800">Oops! Page Not Found</h2>
        <p className="mx-auto mt-3 max-w-md text-gray-600">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s help you get back on track.
        </p>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 rounded-full bg-cyan-600 px-5 py-2 font-medium text-white transition hover:bg-cyan-700">
          <FaArrowLeft /> Go Back Home
        </Link>
      </div>
    </main>
  );
}
