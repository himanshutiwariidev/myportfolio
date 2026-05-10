import React, { useEffect, useState } from 'react';
import api from '../../lib/api';
import { BlogCard } from '../../components/blog/BlogCard';
import { useSeo } from '../../hooks/useSeo';

const getSiteUrl = () => {
  if (import.meta.env.VITE_SITE_URL) {
    return import.meta.env.VITE_SITE_URL.replace(/\/$/, '');
  }

  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  return 'https://technicaltiwariji.com';
};

export const BlogListingPage = ({ disableSeo = false }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useSeo(
    disableSeo
      ? {}
      : {
          title: 'Blog | TechnicalTiwarii',
          description: 'Explore the latest articles, tutorials, and website insights from TechnicalTiwarii.',
          canonical: `${getSiteUrl()}/blog`,
        }
  );

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get('/blogs');
        setBlogs(response.data.data || []);
      } catch (requestError) {
        setError(requestError.response?.data?.message || 'Unable to load blogs right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.16),_transparent_30%),linear-gradient(180deg,_#050505_0%,_#121212_100%)] px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="max-w-5xl space-y-4">
          <p className="text-sm uppercase tracking-[0.4em] text-orange-300">Insights & Articles</p>
         
        </div>

        {loading ? <p className="text-orange-100/75">Loading blogs...</p> : null}
        {error ? <p className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">{error}</p> : null}

        {!loading && !error ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};
