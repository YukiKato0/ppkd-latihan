export const Products = [
  {
    id: 1,
    name: 'Espresso Single Shot',
    category: 'minuman',
    subCategory: 'Espresso-Based',
    price: 22000,
    rating: 4.8,
    reviewsCount: 120,
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500',
    description: 'Ekstrak kopi murni dari biji Arabika pilihan dengan aroma pekat dan krema tebal.',
    isBestSeller: false
  },
  {
    id: 2,
    name: 'Iced Caramel Macchiato',
    category: 'minuman',
    subCategory: 'Espresso-Based',
    price: 38000,
    rating: 4.9,
    reviewsCount: 240,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500',
    description: 'Perpaduan espresso, susu segar gurih, sirup vanila, dan saus karamel manis.',
    isBestSeller: true
  },
  {
    id: 3,
    name: 'Japanese Cold Drip',
    category: 'minuman',
    subCategory: 'Cold Brew',
    price: 35000,
    rating: 4.7,
    reviewsCount: 85,
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=500',
    description: 'Penyeduhan dingin perlahan selama 8 jam menghasilkan cita rasa buah yang segar.',
    isBestSeller: false
  },
  {
    id: 4,
    name: 'Butter Croissant',
    category: 'makanan',
    subCategory: 'Pastry & Bakery',
    price: 28000,
    rating: 4.9,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500',
    description: 'Pastry khas Prancis berlapis renyah dengan keharuman butter impor berkualitas tinggi.',
    isBestSeller: true
  },
  {
    id: 5,
    name: 'Beef Teriyaki Rice Bowl',
    category: 'makanan',
    subCategory: 'Heavy Meals',
    price: 48000,
    rating: 4.6,
    reviewsCount: 95,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
    description: 'Nasi hangat disajikan dengan irisan daging sapi empuk bertabur saus manis teriyaki.',
    isBestSeller: false
  },
  {
    id: 6,
    name: 'Matcha Oat Latte',
    category: 'minuman',
    subCategory: 'Non-Coffee',
    price: 36000,
    rating: 4.8,
    reviewsCount: 175,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500',
    description: 'Bubuk matcha murni dari Uji, Jepang dikocok dengan susu oat creamy.',
    isBestSeller: true
  }
];

export const initialCategories = [
  {
    id: 'minuman',
    label: 'Minuman',
    icon: '🥤',
    subCategories: ['Espresso-Based', 'Manual Brew', 'Non-Coffee', 'Cold Brew']
  },
  {
    id: 'makanan',
    label: 'Makanan',
    icon: '🥐',
    subCategories: ['Pastry & Bakery', 'Snack & Bites', 'Heavy Meals', 'Dessert']
  }
];