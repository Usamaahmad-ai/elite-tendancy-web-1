import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, AlertCircle } from 'lucide-react';
import { BlogPost as BlogPostType } from '../types';
import { getPostBySlug } from '../lib/blogApi';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (slug) {
      loadPost(slug);
    }
  }, [slug]);

  const loadPost = async (postSlug: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPostBySlug(postSlug);
      if (data) {
        setPost(data);
      } else {
        setError('Article not found');
      }
    } catch (err) {
      console.error('Failed to load post:', err);
      setError('Failed to load article');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share && post) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(err => console.log('Error sharing:', err));
    } else if (post) {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center bg-obsidian">
        <p className="text-platinum/60">Loading article...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen pt-32 px-6 bg-obsidian text-platinum">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 text-platinum/60 hover:text-gold mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="uppercase tracking-widest text-xs font-bold">Back to Blog</span>
          </button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 flex gap-4"
          >
            <AlertCircle className="text-red-400 flex-shrink-0" size={24} />
            <div>
              <h2 className="text-red-400 font-bold mb-2">Article Not Found</h2>
              <p className="text-red-400/80">{error}</p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-6 bg-obsidian text-platinum pb-20">
      <article className="max-w-2xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/blog')}
          className="inline-flex items-center gap-2 text-platinum/60 hover:text-gold mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          <span className="uppercase tracking-widest text-xs font-bold">Back to Blog</span>
        </motion.button>

        {/* Featured Image */}
        {post.featured_image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 rounded-lg overflow-hidden h-80 md:h-96"
          >
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-serif mb-6"
        >
          {post.title}
        </motion.h1>

        {/* Meta Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-white/10 text-platinum/60 text-sm"
        >
          {post.category && (
            <span className="text-gold font-bold uppercase tracking-widest text-xs">
              {post.category}
            </span>
          )}
          <span>
            {post.published_at && new Date(post.published_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
          <span>{post.read_time || '5 min read'}</span>
          <button
            onClick={handleShare}
            className="ml-auto flex items-center gap-2 hover:text-gold transition-colors"
          >
            <Share2 size={16} />
            <span>Share</span>
          </button>
        </motion.div>

        {/* Excerpt */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl text-platinum/80 mb-12 font-serif italic"
        >
          {post.excerpt}
        </motion.p>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{
            __html: post.body
              .replace(/^<p><\/p>$/gm, '')
              .replace(/<p>/g, '<p class="text-platinum/90 leading-relaxed mb-4">')
              .replace(/<h2>/g, '<h2 class="text-3xl font-serif mt-8 mb-4 text-white">')
              .replace(/<h3>/g, '<h3 class="text-2xl font-serif mt-6 mb-3 text-platinum">')
              .replace(/<strong>/g, '<strong class="text-gold font-bold">')
              .replace(/<em>/g, '<em class="italic text-platinum/80">')
              .replace(/<a /g, '<a class="text-gold hover:underline" ')
              .replace(/<ul>/g, '<ul class="list-disc list-inside space-y-2 my-4 text-platinum/90">')
              .replace(/<ol>/g, '<ol class="list-decimal list-inside space-y-2 my-4 text-platinum/90">')
              .replace(/<li>/g, '<li class="ml-2">')
              .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-gold pl-4 py-2 my-4 italic text-platinum/80">')
              .replace(/<code>/g, '<code class="bg-obsidian/50 px-2 py-1 rounded text-gold font-mono text-sm">')
          }}
        />
      </article>
    </div>
  );
};

export default BlogPost;
