import React, { useEffect, useMemo, useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';
const slugify = (value = '') =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const inputClassName =
  'w-full rounded-2xl border border-orange-500/20 bg-neutral-950/80 px-4 py-3 text-white outline-none transition placeholder:text-orange-50/35 focus:border-orange-400';

export const BlogForm = ({
  formData,
  previewImage,
  isEditing,
  isSaving,
  onChange,
  onContentChange,
  onImageChange,
  onSubmit,
}) => {
  const [ReactQuillComponent, setReactQuillComponent] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadEditor = async () => {
      if (typeof window === 'undefined') {
        return;
      }

      const quillModule = await import('react-quill-new');

      if (isMounted) {
        setReactQuillComponent(() => quillModule.default);
      }
    };

    loadEditor();

    return () => {
      isMounted = false;
    };
  }, []);

  const quillModules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
      ],
    }),
    []
  );

  return (
    <form onSubmit={onSubmit} className="space-y-6 rounded-[2rem] border border-orange-500/20 bg-black/40 p-6 md:p-8">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-orange-200">Blog Title</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={(event) => {
              onChange(event);
              if (!isEditing || !formData.slug) {
                onChange({
                  target: {
                    name: 'slug',
                    value: slugify(event.target.value),
                  },
                });
              }
            }}
            className={inputClassName}
            placeholder="Write your blog title"
            required
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-orange-200">URL Slug</span>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={onChange}
            className={inputClassName}
            placeholder="seo-friendly-blog-url"
            required
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-orange-200">Meta Title</span>
          <input
            type="text"
            name="metaTitle"
            value={formData.metaTitle}
            onChange={onChange}
            className={inputClassName}
            placeholder="Meta title for SEO"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-orange-200">Author</span>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={onChange}
            className={inputClassName}
            placeholder="Admin"
          />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-orange-200">Meta Description</span>
          <textarea
            name="metaDescription"
            value={formData.metaDescription}
            onChange={onChange}
            rows="3"
            className={inputClassName}
            placeholder="Short SEO summary"
          />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-orange-200">Short Description</span>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={onChange}
            rows="4"
            className={inputClassName}
            placeholder="Small intro that appears in blog cards"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-orange-200">Image Upload</span>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={onImageChange}
            className={`${inputClassName} file:mr-4 file:rounded-full file:border-0 file:bg-orange-400 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black`}
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-orange-200">Image Alt Text</span>
          <input
            type="text"
            name="imageAlt"
            value={formData.imageAlt}
            onChange={onChange}
            className={inputClassName}
            placeholder="Describe the blog image"
          />
        </label>
      </div>

      {previewImage ? (
        <div className="overflow-hidden rounded-3xl border border-orange-500/20 bg-neutral-950/70">
          <img
            src={previewImage}
            alt={formData.imageAlt || formData.title || 'Blog preview'}
            className="h-72 w-full object-cover"
          />
        </div>
      ) : null}

      <label className="flex items-center gap-3 rounded-2xl border border-orange-500/20 bg-neutral-950/70 px-4 py-3 text-orange-100">
        <input
          type="checkbox"
          name="isPublished"
          checked={formData.isPublished}
          onChange={(event) =>
            onChange({
              target: {
                name: 'isPublished',
                value: event.target.checked,
              },
            })
          }
          className="h-4 w-4 accent-orange-400"
        />
        Publish this blog
      </label>

      <div className="space-y-3">
        <p className="text-sm font-medium text-orange-200">Blog Content</p>
        <div className="blog-editor overflow-hidden rounded-3xl border border-orange-500/20 bg-white text-black">
          {ReactQuillComponent ? (
            <ReactQuillComponent
              theme="snow"
              value={formData.content}
              onChange={onContentChange}
              modules={quillModules}
              placeholder="Write your SEO content here..."
            />
          ) : (
            <textarea
              value={formData.content}
              onChange={(event) => onContentChange(event.target.value)}
              className="min-h-[22rem] w-full resize-y p-4 outline-none"
              placeholder="Loading editor..."
            />
          )}
        </div>
        <p className="text-sm text-orange-50/60">
          Content is stored as HTML for SEO-friendly blog rendering.
        </p>
      </div>

      <button
        type="submit"
        disabled={isSaving}
        className="rounded-full bg-orange-400 px-6 py-3 font-semibold text-black transition hover:bg-orange-300 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSaving ? 'Saving...' : isEditing ? 'Update Blog' : 'Create Blog'}
      </button>
    </form>
  );
};
