import React from 'react';
import { Link } from 'react-router-dom';

const getImageUrl = (image) => {
  if (!image) {
    return 'https://placehold.co/1200x700/1f1f1f/f3f4f6?text=Blog+Image';
  }

  if (image.startsWith('http')) {
    return image;
  }

  const apiBase = (import.meta.env.VITE_API_URL || '/api').replace('/api', '');
  return `${apiBase}${image}`;
};

export const BlogCard = ({ blog }) => {
  return (
    <article className="overflow-hidden rounded-3xl border border-orange-500/20 bg-neutral-950/80 shadow-lg shadow-orange-950/20 transition hover:-translate-y-1 hover:border-orange-400/40">
      <img
        src={getImageUrl(blog.image)}
        alt={blog.imageAlt || blog.title}
        className="h-56 w-full object-cover"
      />
      <div className="space-y-4 p-6">
        <p className="text-sm uppercase tracking-[0.3em] text-orange-300">
          {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}
        </p>
        <h2 className="text-2xl font-semibold text-white">
          <Link to={`/blog/${blog.slug}`} className="transition hover:text-orange-300">
            {blog.title}
          </Link>
        </h2>
        <p className="line-clamp-3 text-orange-50/75">{blog.shortDescription}</p>
        <Link
          to={`/blog/${blog.slug}`}
          className="inline-flex items-center rounded-full border border-orange-400 px-4 py-2 text-sm font-medium text-orange-200 transition hover:bg-orange-400 hover:text-neutral-950"
        >
          Read article
        </Link>
      </div>
    </article>
  );
};
