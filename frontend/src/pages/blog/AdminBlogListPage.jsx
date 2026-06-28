import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BlogAdminTable } from '../../components/blog/BlogAdminTable';
import api, { clearAdminToken, getAdminHeaders } from '../../lib/api';
import { SeoHead } from '../../components/seo/SeoHead';

export const AdminBlogListPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDeletingId, setIsDeletingId] = useState('');

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get('/admin/blogs', {
        headers: getAdminHeaders(),
      });
      setBlogs(response.data.data || []);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to load admin blogs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');

    if (!confirmDelete) {
      return;
    }

    try {
      setIsDeletingId(id);
      await api.delete(`/blogs/${id}`, {
        headers: getAdminHeaders(),
      });
      setBlogs((currentBlogs) => currentBlogs.filter((blog) => blog._id !== id));
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to delete the blog.');
    } finally {
      setIsDeletingId('');
    }
  };

  const handleLogout = () => {
    clearAdminToken();
    window.location.href = '/admin/login';
  };

  return (
    <section className="min-h-screen bg-[linear-gradient(180deg,_#080808_0%,_#141414_100%)] px-4 py-16 md:px-8">
      <SeoHead title="Admin Blogs | Himanshhu Tiwari" robots="noindex, nofollow" />
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-6 rounded-[2rem] border border-orange-500/20 bg-black/30 p-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.35em] text-orange-300">Admin Dashboard</p>
            <h1 className="text-4xl font-semibold text-white">Manage your blog articles</h1>
            <p className="max-w-2xl text-orange-50/70">
              Save the admin token once, then create, edit, publish, and delete blogs from this panel.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/blogs/new"
              className="inline-flex rounded-full bg-orange-400 px-6 py-3 font-semibold text-black transition hover:bg-orange-300"
            >
              Create Blog
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex rounded-full border border-orange-400 px-6 py-3 font-semibold text-orange-200 transition hover:bg-orange-400 hover:text-black"
            >
              Logout
            </button>
          </div>
        </div>

        {loading ? <p className="text-orange-100/75">Loading admin blogs...</p> : null}
        {error ? <p className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">{error}</p> : null}

        {!loading ? <BlogAdminTable blogs={blogs} onDelete={handleDelete} isDeletingId={isDeletingId} /> : null}
      </div>
    </section>
  );
};
