import React, { useEffect, useMemo, useState } from 'react';
import DOMPurify from 'dompurify';
import { Link, useParams } from 'react-router-dom';
import api from '../../lib/api';
import { SeoHead } from '../../components/seo/SeoHead';
import { siteUrl } from '../../lib/siteConfig';
import { blogPostingSchema, breadcrumbSchema } from '../../lib/schema';

const getImageUrl = (image) => {
  if (!image) {
    return '';
  }

  if (image.startsWith('http')) {
    return image;
  }

  const apiBase = (import.meta.env.VITE_API_URL || 'http://localhost:5001/api').replace('/api', '');
  return `${apiBase}${image}`;
};

export const BlogSinglePage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.get(`/blogs/${slug}`);
        setBlog(response.data.data);
      } catch (requestError) {
        setError(requestError.response?.data?.message || 'Blog not found.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  const canonical = blog?.slug ? `${siteUrl}/blog/${blog.slug}` : `${siteUrl}/blog`;

  const safeHtml = useMemo(() => {
    const content = blog?.content || '';
    return typeof window === 'undefined' ? content : DOMPurify.sanitize(content);
  }, [blog?.content]);

  if (loading) {
    return (
      <section className="min-h-screen px-4 py-16 text-orange-100">
        <SeoHead title="Loading blog... | Himanshhu Tiwari" canonical={canonical} />
        Loading blog...
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen px-4 py-16">
        <SeoHead title="Blog Not Found | Himanshhu Tiwari" robots="noindex, follow" />
        <div className="mx-auto max-w-4xl rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-red-200">
          {error}
        </div>
      </section>
    );
  }

  return (
    <article className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.14),_transparent_30%),linear-gradient(180deg,_#060606_0%,_#111111_100%)] px-4 py-16 md:px-8">
      <SeoHead
        title={blog.metaTitle || blog.title}
        description={blog.metaDescription || blog.shortDescription || `Read ${blog.title} on the Himanshhu Tiwari blog.`}
        canonical={canonical}
        ogType="article"
        ogImage={blog.image ? getImageUrl(blog.image) : undefined}
        jsonLd={[
          blogPostingSchema(blog, canonical),
          breadcrumbSchema([
            { name: 'Home', url: `${siteUrl}/` },
            { name: 'Blog', url: `${siteUrl}/blog` },
            { name: blog.title, url: canonical },
          ]),
        ]}
      />
      <div className="mx-auto max-w-4xl space-y-8">
        <Link to="/blog" className="inline-flex text-sm font-medium text-orange-300 transition hover:text-orange-200">
          Back to all blogs
        </Link>

        <header className="space-y-5">
          <p className="text-sm uppercase tracking-[0.35em] text-orange-300">
            {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-white md:text-4xl">{blog.title}</h1>
          {blog.shortDescription ? (
            <p className="text-xl leading-8 text-orange-50/75">{blog.shortDescription}</p>
          ) : null}
        </header>

        {blog.image ? (
          <img
            src={getImageUrl(blog.image)}
            alt={blog.imageAlt || blog.title}
            className="h-[420px] w-full rounded-[2rem] object-cover shadow-xl shadow-orange-950/30"
          />
        ) : null}

        <section
          className="blog-content rounded-[2rem] border border-orange-500/20 bg-black/30 p-6 text-orange-50/85 md:p-8"
          dangerouslySetInnerHTML={{ __html: safeHtml }}
        />
      </div>
    </article>
  );
};
