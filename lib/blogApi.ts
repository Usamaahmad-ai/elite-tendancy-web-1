import { supabase } from './supabaseClient';
import { BlogPost } from '../types';

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const calculateReadTime = (html: string): string => {
  const text = html.replace(/<[^>]*>/g, '');
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  const readTime = Math.ceil(words / wordsPerMinute);
  return readTime === 1 ? '1 min read' : `${readTime} min read`;
};

export const getPublishedPosts = async (): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('cms_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) throw error;
    return (data as BlogPost[]) || [];
  } catch (error) {
    console.error('Error fetching published posts:', error);
    return [];
  }
};

export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const { data, error } = await supabase
      .from('cms_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) throw error;
    return (data as BlogPost) || null;
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
};

export const getAllPosts = async (): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('cms_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data as BlogPost[]) || [];
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
};

export const getPostById = async (id: string): Promise<BlogPost | null> => {
  try {
    const { data, error } = await supabase
      .from('cms_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return (data as BlogPost) || null;
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    return null;
  }
};

export const createPost = async (post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost | null> => {
  try {
    const { data, error } = await supabase
      .from('cms_posts')
      .insert([post])
      .select()
      .single();

    if (error) throw error;
    return (data as BlogPost) || null;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const updatePost = async (id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> => {
  try {
    const { data, error } = await supabase
      .from('cms_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return (data as BlogPost) || null;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

export const deletePost = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('cms_posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

export const archivePost = async (id: string): Promise<BlogPost | null> => {
  return updatePost(id, { status: 'archived' });
};
