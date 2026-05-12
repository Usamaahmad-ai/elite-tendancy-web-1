import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Upload, AlertCircle } from 'lucide-react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { getPostById, createPost, updatePost, BlogPost, generateSlug, calculateReadTime } from '../../lib/blogApi';

const PostEditor: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isNew = !id;

  const [post, setPost] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    body: '',
    category: '',
    featured_image: '',
    status: 'draft',
  });

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slugError, setSlugError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isNew && id) {
      loadPost(id);
    }
  }, [id, isNew]);

  const loadPost = async (postId: string) => {
    try {
      setLoading(true);
      const data = await getPostById(postId);
      if (data) {
        setPost(data);
        setError(null);
      } else {
        setError('Post not found');
      }
    } catch (err) {
      console.error('Failed to load post:', err);
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (title: string) => {
    setPost(prev => ({
      ...prev,
      title,
      slug: post.slug || generateSlug(title)
    }));
  };

  const handleSlugChange = (slug: string) => {
    const validSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setPost(prev => ({ ...prev, slug: validSlug }));
    setSlugError(validSlug.length === 0 ? 'Slug cannot be empty' : null);
  };

  const handleBodyChange = (body: string) => {
    const readTime = calculateReadTime(body);
    setPost(prev => ({
      ...prev,
      body,
      read_time: readTime
    }));
  };

  const handlePublish = async () => {
    if (!post.title?.trim()) {
      setError('Title is required');
      return;
    }
    if (!post.slug?.trim()) {
      setError('Slug is required');
      return;
    }
    if (!post.excerpt?.trim()) {
      setError('Excerpt is required');
      return;
    }
    if (!post.body?.trim()) {
      setError('Content is required');
      return;
    }

    await handleSave('published');
  };

  const handleSave = async (status: 'draft' | 'published' = 'draft') => {
    try {
      setSaving(true);
      setError(null);

      const postData: Partial<BlogPost> = {
        ...post,
        status,
        published_at: status === 'published' ? new Date().toISOString() : post.published_at,
      };

      if (isNew) {
        await createPost(postData as Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>);
      } else {
        await updatePost(id!, postData);
      }

      navigate('/admin/cms/posts');
    } catch (err: any) {
      console.error('Failed to save post:', err);
      setError(err?.message || 'Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center bg-obsidian">
        <p className="text-platinum/60">Loading post...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-6 bg-obsidian text-platinum pb-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => navigate('/admin/cms/posts')}
              className="inline-flex items-center gap-2 text-platinum/60 hover:text-gold mb-4 transition-colors"
            >
              <ArrowLeft size={16} />
              <span className="uppercase tracking-widest text-xs font-bold">Back</span>
            </button>
            <h1 className="text-4xl font-serif">{isNew ? 'Create Article' : 'Edit Article'}</h1>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-8 flex gap-3"
          >
            <AlertCircle className="text-red-400 flex-shrink-0" size={20} />
            <p className="text-red-400">{error}</p>
          </motion.div>
        )}

        {/* Editor Form */}
        <div className="space-y-8">
          {/* Title */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-widest text-gold/80 mb-3">Title *</label>
            <input
              type="text"
              value={post.title || ''}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter article title"
              className="w-full bg-obsidian/50 border-b border-white/10 focus:border-gold py-3 text-white focus:outline-none transition-colors placeholder-white/20"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-widest text-gold/80 mb-3">URL Slug *</label>
            <input
              type="text"
              value={post.slug || ''}
              onChange={(e) => handleSlugChange(e.target.value)}
              placeholder="article-title"
              className={`w-full bg-obsidian/50 border-b focus:outline-none py-3 text-white transition-colors placeholder-white/20 ${
                slugError ? 'border-red-400 focus:border-red-400' : 'border-white/10 focus:border-gold'
              }`}
            />
            {slugError && <p className="text-red-400 text-xs mt-1">{slugError}</p>}
            <p className="text-platinum/50 text-xs mt-2">URL-friendly version: /blog/{post.slug}</p>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-widest text-gold/80 mb-3">Excerpt *</label>
            <textarea
              value={post.excerpt || ''}
              onChange={(e) => setPost(prev => ({ ...prev, excerpt: e.target.value }))}
              placeholder="Brief summary of the article (appears in blog listing)"
              rows={3}
              className="w-full bg-obsidian/50 border border-white/10 focus:border-gold rounded px-4 py-3 text-white focus:outline-none transition-colors placeholder-white/20 resize-none"
            />
            <p className="text-platinum/50 text-xs mt-2">{post.excerpt?.length || 0}/250 characters</p>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-widest text-gold/80 mb-3">Category</label>
            <input
              type="text"
              value={post.category || ''}
              onChange={(e) => setPost(prev => ({ ...prev, category: e.target.value }))}
              placeholder="e.g., Market Trends, Design Ideas, Legal"
              className="w-full bg-obsidian/50 border-b border-white/10 focus:border-gold py-3 text-white focus:outline-none transition-colors placeholder-white/20"
            />
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-widest text-gold/80 mb-3">Featured Image URL</label>
            <input
              type="url"
              value={post.featured_image || ''}
              onChange={(e) => setPost(prev => ({ ...prev, featured_image: e.target.value }))}
              placeholder="https://example.com/image.jpg"
              className="w-full bg-obsidian/50 border-b border-white/10 focus:border-gold py-3 text-white focus:outline-none transition-colors placeholder-white/20"
            />
            {post.featured_image && (
              <div className="mt-3 border border-white/10 rounded p-3">
                <img 
                  src={post.featured_image} 
                  alt="Preview" 
                  className="w-full h-40 object-cover rounded"
                  onError={() => setError('Failed to load image')}
                />
              </div>
            )}
          </div>

          {/* Body Content */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-widest text-gold/80 mb-3">Content * {post.read_time && <span className="text-platinum/60 font-normal">({post.read_time})</span>}</label>
            <textarea
              value={post.body || ''}
              onChange={(e) => handleBodyChange(e.target.value)}
              placeholder="Write your article content here. Supports basic HTML tags: &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;a href=&quot;&quot;&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;, &lt;blockquote&gt;, &lt;code&gt;"
              rows={15}
              className="w-full bg-obsidian/50 border border-white/10 focus:border-gold rounded px-4 py-3 text-white focus:outline-none transition-colors placeholder-white/20 resize-none font-mono text-sm"
            />
            <p className="text-platinum/50 text-xs mt-2">HTML formatting is supported</p>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-widest text-gold/80 mb-3">Status</label>
            <select
              value={post.status || 'draft'}
              onChange={(e) => setPost(prev => ({ ...prev, status: e.target.value as 'draft' | 'published' | 'archived' }))}
              className="w-full bg-obsidian/50 border border-white/10 focus:border-gold rounded px-4 py-3 text-white focus:outline-none transition-colors"
            >
              <option value="draft">Draft (Not visible)</option>
              <option value="published">Published (Visible)</option>
              <option value="archived">Archived (Hidden)</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-8 border-t border-white/10">
            <button
              onClick={() => handleSave('draft')}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-graphite text-platinum border border-white/20 hover:border-white/40 font-bold uppercase tracking-widest transition-colors disabled:opacity-50"
            >
              <Save size={18} />
              Save Draft
            </button>
            <button
              onClick={handlePublish}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-gold text-obsidian font-bold uppercase tracking-widest hover:bg-gold/80 transition-colors disabled:opacity-50"
            >
              <Upload size={18} />
              {isNew ? 'Publish' : 'Update & Publish'}
            </button>
            <button
              onClick={() => navigate('/admin/cms/posts')}
              disabled={saving}
              className="px-6 py-3 text-platinum/60 hover:text-platinum font-bold uppercase tracking-widest transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostEditor;
