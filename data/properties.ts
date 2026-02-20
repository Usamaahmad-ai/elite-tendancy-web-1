import { Property } from '../types';

export const properties: Property[] = [
  {
    id: '1',
    title: 'The Obsidian Penthouse',
    location: 'Financial District, NY',
    price: '$25,000 / mo',
    priceValue: 25000,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
    specs: '4 Bed • 5.5 Bath • 4,200 sqft',
    type: 'Penthouse',
    beds: 4,
    baths: 5.5,
    sqft: 4200,
    amenities: ['Concierge', 'Private Pool', 'Smart Home'],
    description: 'Hovering above the financial capital of the world, The Obsidian Penthouse redefines urban luxury. This triplex residence offers 360-degree views of the Manhattan skyline, featuring a private rooftop infinity pool, a state-of-the-art home automation system, and direct elevator access. Every detail has been meticulously curated for the discerning individual who demands nothing less than perfection.',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2000&auto=format&fit=crop'
    ],
    features: ['360° Skyline Views', 'Private Rooftop Pool', 'Direct Elevator Access', 'Triple-Height Ceilings', 'Chef\'s Kitchen']
  },
  {
    id: '2',
    title: 'Skyline Glass House',
    location: 'Beverly Hills, CA',
    price: '$45,000 / mo',
    priceValue: 45000,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2000&auto=format&fit=crop',
    specs: '5 Bed • 6 Bath • 5,800 sqft',
    type: 'Villa',
    beds: 5,
    baths: 6,
    sqft: 5800,
    amenities: ['Gated', 'Theater', 'Wine Cellar'],
    description: 'A masterpiece of modern architecture, the Skyline Glass House blurs the line between indoor and outdoor living. Perched in the exclusive hills of Beverly Hills, this estate features floor-to-ceiling glass walls, a zero-edge swimming pool, and a private screening room. The property is a sanctuary of privacy and tranquility, designed for entertaining on a grand scale.',
    gallery: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154526-990dcea4db0d?q=80&w=2000&auto=format&fit=crop'
    ],
    features: ['Zero-Edge Pool', 'Home Theater', 'Wine Cellar', 'Gated Privacy', 'Smart Security System']
  },
  {
    id: '3',
    title: 'The Azure Loft',
    location: 'Tribeca, NY',
    price: '$18,500 / mo',
    priceValue: 18500,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop',
    specs: '3 Bed • 2 Bath • 2,400 sqft',
    type: 'Loft',
    beds: 3,
    baths: 2,
    sqft: 2400,
    amenities: ['Smart Home', 'Doorman', 'Gym'],
    description: 'Located in the heart of Tribeca on a cobblestone street, The Azure Loft combines industrial heritage with contemporary elegance. Exposed brick walls, reclaimed wood beams, and oversized arched windows create a unique character. The open-plan living area is flooded with natural light, perfect for both relaxation and creative pursuits.',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2000&auto=format&fit=crop'
    ],
    features: ['Exposed Brick', 'Oversized Windows', 'Chef\'s Kitchen', 'Private Storage', 'Building Gym']
  },
  {
    id: '4',
    title: 'Marina Bay Villa',
    location: 'Miami, FL',
    price: '$32,000 / mo',
    priceValue: 32000,
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2000&auto=format&fit=crop',
    specs: '6 Bed • 7 Bath • 7,000 sqft',
    type: 'Villa',
    beds: 6,
    baths: 7,
    sqft: 7000,
    amenities: ['Waterfront', 'Boat Dock', 'Private Pool'],
    description: 'Experience the ultimate waterfront lifestyle at Marina Bay Villa. This expansive property features 100 feet of water frontage with a private dock, capable of accommodating a 60-foot yacht. The interior is a showcase of modern design, with marble floors, a custom Italian kitchen, and a master suite with a private terrace overlooking the bay.',
    gallery: [
      'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop'
    ],
    features: ['100ft Water Frontage', 'Private Yacht Dock', 'Summer Kitchen', 'Staff Quarters', '3-Car Garage']
  },
  {
    id: '5',
    title: 'Central Park Estate',
    location: 'Manhattan, NY',
    price: '$55,000 / mo',
    priceValue: 55000,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2000&auto=format&fit=crop',
    specs: '6 Bed • 6.5 Bath • 6,100 sqft',
    type: 'Estate',
    beds: 6,
    baths: 6.5,
    sqft: 6100,
    amenities: ['Concierge', 'Spa', 'Library'],
    description: 'A rare opportunity to lease a townhouse of this caliber steps from Central Park. This historic limestone estate has been meticulously restored to its Gilded Age glory, updated with modern conveniences. Features include a grand staircase, a wood-paneled library, a private garden, and a full-floor master suite with dual dressing rooms.',
    gallery: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2000&auto=format&fit=crop'
    ],
    features: ['Historic Limestone', 'Private Garden', 'Wood-Paneled Library', 'Full-Floor Master', 'Wine Cellar']
  },
  {
    id: '6',
    title: 'SoHo Industrial',
    location: 'SoHo, NY',
    price: '$14,000 / mo',
    priceValue: 14000,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2000&auto=format&fit=crop',
    specs: '2 Bed • 2 Bath • 1,800 sqft',
    type: 'Loft',
    beds: 2,
    baths: 2,
    sqft: 1800,
    amenities: ['Elevator', 'Rooftop', 'Smart Home'],
    description: 'Minimalist luxury in the heart of SoHo. This cast-iron building loft features 14-foot ceilings, original Corinthian columns, and wide-plank white oak floors. The kitchen is a chef\'s dream with Wolf and Sub-Zero appliances. Direct key-locked elevator access ensures privacy and exclusivity.',
    gallery: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2000&auto=format&fit=crop'
    ],
    features: ['Direct Elevator Access', '14ft Ceilings', 'Cast-Iron Building', 'Common Rooftop', 'Radiant Heat Floors']
  }
];