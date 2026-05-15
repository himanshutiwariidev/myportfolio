const fs = require('fs');
const path = require('path');
const Blog = require('../models/Blog');

const createSlug = (value = '') =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const buildImagePath = (req) => {
  if (!req.file) {
    return '';
  }

  return `/uploads/${req.file.filename}`;
};

const removeUploadedFile = (imagePath) => {
  if (!imagePath) {
    return;
  }

  const fileName = imagePath.replace('/uploads/', '');
  const fullPath = path.join(__dirname, '..', 'uploads', fileName);

  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};

const ensureUniqueSlug = async (slug, blogId) => {
  const existingBlog = await Blog.findOne({ slug });

  if (existingBlog && existingBlog._id.toString() !== blogId) {
    throw new Error('Slug already exists. Please use a different slug.');
  }
};

const createBlog = async (req, res, next) => {
  try {
    const slug = createSlug(req.body.slug || req.body.title);
    const image = buildImagePath(req);

    if (!slug) {
      res.status(400);
      throw new Error('Slug is required');
    }

    await ensureUniqueSlug(slug);

    const blog = await Blog.create({
      title: req.body.title,
      slug,
      metaTitle: req.body.metaTitle,
      metaDescription: req.body.metaDescription,
      content: req.body.content,
      shortDescription: req.body.shortDescription,
      image,
      imageAlt: req.body.imageAlt,
      author: req.body.author || 'TechnicalTiwariji',
      isPublished:
        req.body.isPublished === undefined ? true : String(req.body.isPublished) === 'true',
    });

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: blog,
    });
  } catch (error) {
    if (req.file) {
      removeUploadedFile(`/uploads/${req.file.filename}`);
    }
    next(error);
  }
};

const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true });

    if (!blog) {
      res.status(404);
      throw new Error('Blog not found');
    }

    res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

const getAdminBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      if (req.file) {
        removeUploadedFile(`/uploads/${req.file.filename}`);
      }
      res.status(404);
      throw new Error('Blog not found');
    }

    const slug = createSlug(req.body.slug || blog.slug || req.body.title);

    if (!slug) {
      res.status(400);
      throw new Error('Slug is required');
    }

    await ensureUniqueSlug(slug, blog._id.toString());

    if (req.file) {
      removeUploadedFile(blog.image);
      blog.image = buildImagePath(req);
    }

    blog.title = req.body.title || blog.title;
    blog.slug = slug;
    blog.metaTitle = req.body.metaTitle || '';
    blog.metaDescription = req.body.metaDescription || '';
    blog.content = req.body.content || blog.content;
    blog.shortDescription = req.body.shortDescription || '';
    blog.imageAlt = req.body.imageAlt || '';
    blog.author = req.body.author || 'technicaltiwarijii';
    blog.isPublished =
      req.body.isPublished === undefined ? blog.isPublished : String(req.body.isPublished) === 'true';

    const updatedBlog = await blog.save();

    res.json({
      success: true,
      message: 'Blog updated successfully',
      data: updatedBlog,
    });
  } catch (error) {
    if (req.file) {
      removeUploadedFile(`/uploads/${req.file.filename}`);
    }
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      res.status(404);
      throw new Error('Blog not found');
    }

    removeUploadedFile(blog.image);
    await blog.deleteOne();

    res.json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  getAdminBlogs,
};
