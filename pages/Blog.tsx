import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { getPublishedPosts } from '../lib/blogApi';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await getPublishedPosts();
      setPosts(data);

      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(data.filter(p => p.category).map(p => p.category))
      ) as string[];
      setCategories(uniqueCategories.sort());
      setFilteredPosts(data);
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = (posts: BlogPost[], category: string, query: string) => {
    return posts.filter(post => {
      const matchesCategory = category === 'all' || post.category === category;
      const matchesSearch = post.title.toLowerCase().includes(query.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setFilteredPosts(filterPosts(posts, category, searchQuery));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredPosts(filterPosts(posts, selectedCategory, query));
  };

  return (
    <div className="min-h-screen pt-32 px-6 bg-obsidian text-platinum pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-serif mb-4">Blog & Insights</h1>
          <p className="text-platinum/70 text-lg mb-8">Market trends, property insights, and expert advice from Elite Tenancy</p>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold" size={20} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-obsidian/50 border border-white/10 focus:border-gold rounded-lg px-12 py-3 text-white placeholder-white/40 focus:outline-none transition-colors"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex gap-3 mb-12 flex-wrap"
          >
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${
                selectedCategory === 'all'
                  ? 'bg-gold text-obsidian'
                  : 'bg-white/5 border border-white/10 text-platinum hover:border-gold/50'
              }`}
            >
              All Articles
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${
                  selectedCategory === category
                    ? 'bg-gold text-obsidian'
                    : 'bg-white/5 border border-white/10 text-platinum hover:border-gold/50'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <p className="text-platinum/60">Loading articles...</p>
          </div>
        )}

        {/* Blog Grid */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <Link key={post.id} to={`/blog/${post.slug}`}>
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group h-full flex flex-col bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-gold/50 rounded-lg overflow-hidden transition-all hover:shadow-lg hover:shadow-gold/10"
                  >
                    {/* Featured Image */}
                    {post.featured_image && (
                      <div className="overflow-hidden h-48 bg-obsidian/50">
                        <img
                          src={post.featured_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Category */}
                      {post.category && (
                        <div className="mb-3">
                          <span className="text-xs font-bold uppercase tracking-widest text-gold/80 bg-gold/10 px-3 py-1 rounded-full inline-block">
                            {post.category}
                          </span>
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-xl font-serif mb-3 group-hover:text-gold transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-platinum/70 text-sm mb-4 flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-xs text-platinum/50 pt-4 border-t border-white/10">
                        <span>{post.read_time || '5 min read'}</span>
                        <span>
                          {post.published_at && new Date(post.published_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>

                      {/* Read More Link */}
                      <div className="mt-4 flex items-center gap-2 text-gold group-hover:gap-3 transition-all">
                        <span className="text-sm font-bold uppercase tracking-widest">Read Article</span>
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </motion.article>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-platinum/60 text-lg">No articles found. Try adjusting your search or filters.</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Blog;
