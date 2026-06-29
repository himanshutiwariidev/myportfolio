import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Navbar } from './components/Navbar';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import { BlogListingPage } from './pages/blog/BlogListingPage';
import { BlogSinglePage } from './pages/blog/BlogSinglePage';
import { AdminBlogListPage } from './pages/blog/AdminBlogListPage';
import { AdminBlogFormPage } from './pages/blog/AdminBlogFormPage';
import { AdminLoginPage } from './pages/blog/AdminLoginPage';
import { ProtectedAdminRoute } from './components/blog/ProtectedAdminRoute';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ContactPage } from './pages/ContactPage';
import { AboutFounderPage } from './pages/AboutFounderPage';
import { SeoHead } from './components/seo/SeoHead';
import { siteUrl } from './lib/siteConfig';
import { personSchema, websiteSchema } from './lib/schema';

export const App = () => {
  return (
    <>
      <SeoHead
        title="Himanshhu Tiwari | Best Website Developer in India | CRM & Ecommerce Developer"
        description="Himanshhu Tiwari delivers company-grade website development, ecommerce, Shopify, CRM, School ERP, and Android app development services for businesses and startups across India."
        canonical={`${siteUrl}/`}
        jsonLd={[personSchema(), websiteSchema()]}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about-himanshhu-tiwari" element={<AboutFounderPage />} />
        <Route path="/blog" element={<BlogListingPage />} />
        <Route path="/blog/:slug" element={<BlogSinglePage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin/blogs"
          element={
            <ProtectedAdminRoute>
              <AdminBlogListPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/blogs/new"
          element={
            <ProtectedAdminRoute>
              <AdminBlogFormPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/blogs/edit/:id"
          element={
            <ProtectedAdminRoute>
              <AdminBlogFormPage />
            </ProtectedAdminRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};
