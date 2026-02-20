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