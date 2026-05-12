import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  specs: string;
  priceValue: number;
  type: string;
  beds: number;
  baths: number;
  sqft: number;
  amenities: string[];
  description: string;
  gallery: string[];
  features: string[];
}

export interface Statistic {
  label: string;
  value: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category?: string;
  featured_image?: string;
  read_time?: string;
  status: 'draft' | 'published' | 'archived';
  author_id?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
}
