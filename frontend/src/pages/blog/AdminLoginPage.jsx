import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api, { clearAdminToken, saveAdminToken } from '../../lib/api';
import { SeoHead } from '../../components/seo/SeoHead';

export const AdminLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    adminId: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const redirectPath = location.state?.from || '/admin/blogs';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/admin/login', {
        adminId: formData.adminId,
        password: formData.password,
      });

      saveAdminToken(response.data.token);

      navigate(redirectPath, { replace: true });
    } catch (requestError) {
      clearAdminToken();
      setError(requestError.response?.data?.message || 'Invalid admin ID or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.18),_transparent_28%),linear-gradient(180deg,_#050505_0%,_#131313_100%)] px-4 py-16 md:px-8">
      <SeoHead title="Admin Login | Himanshhu Tiwari" robots="noindex, nofollow" />
      <div className="mx-auto max-w-xl space-y-8">
        <div className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-orange-300">Admin Access</p>
          <h1 className="text-3xl font-semibold text-white md:text-4xl">Login to manage blog posts</h1>
          <p className="text-orange-50/70">
            Enter your admin credentials to access the blog dashboard.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-[2rem] border border-orange-500/20 bg-black/35 p-8 shadow-2xl shadow-orange-950/20"
        >
          <label className="block space-y-2">
            <span className="text-sm font-medium text-orange-200">Admin ID</span>
            <input
              type="text"
              autoComplete="username"
              value={formData.adminId}
              onChange={(event) =>
                setFormData((currentForm) => ({
                  ...currentForm,
                  adminId: event.target.value,
                }))
              }
              placeholder="Enter ADMIN_ID "
              className="w-full rounded-2xl border border-orange-500/20 bg-neutral-950/80 px-4 py-3 text-white outline-none transition focus:border-orange-400"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-orange-200">Password</span>
            <input
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={(event) =>
                setFormData((currentForm) => ({
                  ...currentForm,
                  password: event.target.value,
                }))
              }
              placeholder="Enter ADMIN_PASSWORD"
              className="w-full rounded-2xl border border-orange-500/20 bg-neutral-950/80 px-4 py-3 text-white outline-none transition focus:border-orange-400"
              required
            />
          </label>

          {error ? (
            <p className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-orange-400 px-6 py-3 font-semibold text-black transition hover:bg-orange-300 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Checking credentials...' : 'Login to Admin'}
          </button>

          <div className="text-center text-sm text-orange-50/60">
            <Link to="/blog" className="transition hover:text-orange-300">
              Back to public blog
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};
