import React, { useEffect, useState } from 'react';
import api from '../../lib/api';
import { BlogCard } from '../../components/blog/BlogCard';
import { SeoHead } from '../../components/seo/SeoHead';
import { siteUrl } from '../../lib/siteConfig';
import { breadcrumbSchema, collectionPageSchema } from '../../lib/schema';

export const BlogListingPage = ({ disableSeo = false }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const canonical = `${siteUrl}/blog`;
  const Heading = disableSeo ? 'h2' : 'h1';

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
    <section className=" bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.16),_transparent_30%),linear-gradient(180deg,_#050505_0%,_#121212_100%)] px-4 py-16 md:px-8">
      {disableSeo ? null : (
        <SeoHead
          title="Web Development, CRM & Ecommerce Blog | Himanshhu Tiwari"
          description="Articles, tutorials, and insights on website development, ecommerce, CRM, School ERP, and Android app development from Himanshhu Tiwari."
          canonical={canonical}
          jsonLd={[
            collectionPageSchema({
              name: 'Himanshhu Tiwari Blog',
              description: 'Articles and tutorials on website development, ecommerce, CRM, and app development.',
              url: canonical,
            }),
            breadcrumbSchema([
              { name: 'Home', url: `${siteUrl}/` },
              { name: 'Blog', url: canonical },
            ]),
          ]}
        />
      )}
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="max-w-5xl space-y-4">
          <p className="text-sm uppercase tracking-[0.4em] text-orange-300">Insights & Articles</p>
          <Heading className="text-2xl font-bold text-white md:text-4xl">
            Web Development, CRM & Ecommerce Insights
          </Heading>
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
