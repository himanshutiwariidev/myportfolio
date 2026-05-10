import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BlogForm } from '../../components/blog/BlogForm';
import api, { getAdminHeaders } from '../../lib/api';
import { useSeo } from '../../hooks/useSeo';

const initialFormState = {
  title: '',
  slug: '',
  metaTitle: '',
  metaDescription: '',
  shortDescription: '',
  author: 'Admin',
  imageAlt: '',
  content: '',
  isPublished: true,
};

const getImageUrl = (image) => {
  if (!image) return '';

  if (image.startsWith('http')) {
    return image;
  }

  return `https://technicaltiwariji.com${image}`;
};

export const AdminBlogFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState(initialFormState);
  const [imageFile, setImageFile] = useState(null);
  const [existingImage, setExistingImage] = useState('');
  const [loading, setLoading] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useSeo({
    title: isEditing ? 'Edit Blog | TechnicalTiwarii' : 'Create Blog | TechnicalTiwarii',
    description: isEditing ? 'Edit an existing blog article.' : 'Create a new blog article with rich content.',
  });

  useEffect(() => {
    if (!isEditing) {
      return;
    }

    const fetchBlogsForEdit = async () => {
      try {
        const response = await api.get('/admin/blogs', {
          headers: getAdminHeaders(),
        });
        const selectedBlog = (response.data.data || []).find((blog) => blog._id === id);

        if (!selectedBlog) {
          setError('Blog not found for editing.');
          return;
        }

        setFormData({
          title: selectedBlog.title || '',
          slug: selectedBlog.slug || '',
          metaTitle: selectedBlog.metaTitle || '',
          metaDescription: selectedBlog.metaDescription || '',
          shortDescription: selectedBlog.shortDescription || '',
          author: selectedBlog.author || 'Admin',
          imageAlt: selectedBlog.imageAlt || '',
          content: selectedBlog.content || '',
          isPublished: Boolean(selectedBlog.isPublished),
        });
        setExistingImage(selectedBlog.image || '');
      } catch (requestError) {
        setError(requestError.response?.data?.message || 'Unable to load blog data.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogsForEdit();
  }, [id, isEditing]);

  const previewImage = useMemo(() => {
    if (imageFile) {
      return URL.createObjectURL(imageFile);
    }

    if (existingImage) {
      return getImageUrl(existingImage);
    }

    return '';
  }, [existingImage, imageFile]);

  useEffect(() => {
    return () => {
      if (imageFile && previewImage.startsWith('blob:')) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [imageFile, previewImage]);

  const handleChange = ({ target }) => {
    setFormData((currentForm) => ({
      ...currentForm,
      [target.name]: target.value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    setImageFile(file || null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSaving(true);

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });

      if (imageFile) {
        payload.append('image', imageFile);
      }

      if (isEditing) {
        await api.put(`/blogs/${id}`, payload, {
          headers: {
            ...getAdminHeaders(),
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await api.post('/blogs', payload, {
          headers: {
            ...getAdminHeaders(),
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      navigate('/admin/blogs');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to save the blog.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="min-h-screen bg-[linear-gradient(180deg,_#080808_0%,_#141414_100%)] px-4 py-16 md:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-4">
          <Link to="/admin/blogs" className="inline-flex text-sm font-medium text-orange-300 transition hover:text-orange-200">
            Back to admin blogs
          </Link>
          <h1 className="text-4xl font-semibold text-white">{isEditing ? 'Edit blog article' : 'Create a new blog article'}</h1>
          <p className="max-w-3xl text-orange-50/70">
            Fill in your blog details, upload a cover image, and write long-form content using React Quill.
          </p>
        </div>

        {loading ? <p className="text-orange-100/75">Loading editor...</p> : null}
        {error ? <p className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">{error}</p> : null}

        {!loading ? (
          <BlogForm
            formData={formData}
            previewImage={previewImage}
            isEditing={isEditing}
            isSaving={isSaving}
            onChange={handleChange}
            onContentChange={(value) => setFormData((currentForm) => ({ ...currentForm, content: value }))}
            onImageChange={handleImageChange}
            onSubmit={handleSubmit}
          />
        ) : null}
      </div>
    </section>
  );
};
