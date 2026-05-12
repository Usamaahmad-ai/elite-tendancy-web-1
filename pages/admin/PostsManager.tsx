import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Archive, Eye, AlertCircle } from 'lucide-react';
import { getAllPosts, deletePost, archivePost, BlogPost } from '../../lib/blogApi';

const PostsManager: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await getAllPosts();
      setPosts(data);
      setError(null);
    } catch (err) {
      console.error('Failed to load posts:', err);
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePost(id);
      setPosts(prev => prev.filter(p => p.id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      console.error('Failed to delete post:', err);
      setError('Failed to delete post');
    }
  };

  const handleArchive = async (id: string) => {
    try {
      await archivePost(id);
      loadPosts();
    } catch (err) {
      console.error('Failed to archive post:', err);
      setError('Failed to archive post');
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      published: 'bg-green-500/20 text-green-400 border-green-500/50',
      draft: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
      archived: 'bg-gray-500/20 text-gray-400 border-gray-500/50',
    };
    return colors[status as keyof typeof colors] || colors.draft;
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-6 bg-obsidian text-platinum">
        <div className="max-w-6xl mx-auto flex items-center justify-center py-20">
          <p className="text-platinum/60">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-6 bg-obsidian text-platinum pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-serif mb-2">Blog Posts</h1>
              <p className="text-platinum/60">Manage and publish your articles</p>
            </div>
            <button
              onClick={() => navigate('/admin/cms/posts/new')}
              className="flex items-center gap-2 px-6 py-3 bg-gold text-obsidian font-bold uppercase tracking-widest hover:bg-gold/80 transition-colors"
            >
              <Plus size={20} />
              New Article
            </button>
          </div>

          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex gap-3"
            >
              <AlertCircle className="text-red-400 flex-shrink-0" size={20} />
              <p className="text-red-400">{error}</p>
            </motion.div>
          )}

          {/* Delete Confirmation Modal */}
          {deleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-obsidian border border-white/10 rounded-lg p-6 max-w-sm"
              >
                <h2 className="text-xl font-serif mb-4">Delete Article?</h2>
                <p className="text-platinum/70 mb-6">This action cannot be undone.</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleDelete(deleteConfirm)}
                    className="flex-1 bg-red-500/20 text-red-400 border border-red-500/50 py-2 font-bold uppercase tracking-widest hover:bg-red-500/30 transition-colors"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 bg-graphite text-platinum border border-white/20 py-2 font-bold uppercase tracking-widest hover:border-white/40 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Posts Table */}
          {posts.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-lg overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left px-6 py-4 text-sm font-bold uppercase tracking-widest text-platinum/60">Title</th>
                      <th className="text-left px-6 py-4 text-sm font-bold uppercase tracking-widest text-platinum/60">Status</th>
                      <th className="text-left px-6 py-4 text-sm font-bold uppercase tracking-widest text-platinum/60">Category</th>
                      <th className="text-left px-6 py-4 text-sm font-bold uppercase tracking-widest text-platinum/60">Published</th>
                      <th className="text-right px-6 py-4 text-sm font-bold uppercase tracking-widest text-platinum/60">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {posts.map((post) => (
                      <tr key={post.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-white line-clamp-1">{post.title}</p>
                            <p className="text-platinum/60 text-sm line-clamp-1">/{post.slug}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border ${getStatusBadge(post.status)}`}>
                            {post.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-platinum/70">
                          {post.category || '-'}
                        </td>
                        <td className="px-6 py-4 text-platinum/70 text-sm">
                          {post.published_at ? new Date(post.published_at).toLocaleDateString() : '-'}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            {post.status === 'published' && (
                              <a
                                href={`/#/blog/${post.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 hover:bg-blue-500/20 text-blue-400 rounded transition-colors"
                                title="View"
                              >
                                <Eye size={18} />
                              </a>
                            )}
                            <button
                              onClick={() => navigate(`/admin/cms/posts/${post.id}/edit`)}
                              className="p-2 hover:bg-gold/20 text-gold rounded transition-colors"
                              title="Edit"
                            >
                              <Edit2 size={18} />
                            </button>
                            {post.status !== 'archived' && (
                              <button
                                onClick={() => handleArchive(post.id)}
                                className="p-2 hover:bg-yellow-500/20 text-yellow-400 rounded transition-colors"
                                title="Archive"
                              >
                                <Archive size={18} />
                              </button>
                            )}
                            <button
                              onClick={() => setDeleteConfirm(post.id)}
                              className="p-2 hover:bg-red-500/20 text-red-400 rounded transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-lg"
            >
              <p className="text-platinum/60 mb-4">No articles yet. Create your first post to get started.</p>
              <button
                onClick={() => navigate('/admin/cms/posts/new')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-obsidian font-bold uppercase tracking-widest hover:bg-gold/80 transition-colors"
              >
                <Plus size={20} />
                Create Article
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostsManager;
