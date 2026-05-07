import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './src/models/Category.js';
import Product from './src/models/Product.js';

dotenv.config();

const categories = [
  {
    name: "Premium Clothes",
    slug: "premium-clothes",
    image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
    description: "High-quality fashion apparel for every season."
  },
  {
    name: "Luxury Bags",
    slug: "luxury-bags",
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    description: "Elegant handbags and backpacks for professionals."
  },
  {
    name: "Designer Watches",
    slug: "designer-watches",
    image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg",
    description: "Precision timepieces and stylish chronographs."
  },
  {
    name: "Urban Footwear",
    slug: "urban-footwear",
    image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
    description: "Comfortable and trendy shoes for urban lifestyle."
  }
];

const products = [
  {
    name: "Premium Leather Jacket",
    description: "A timeless masterpiece crafted from 100% genuine top-grain leather. This jacket features a slim fit design, premium YKK zippers, and a soft quilted inner lining. Perfect for those who value durability and style.",
    price: 12999,
    comparePrice: 15000,
    categoryName: "Premium Clothes",
    images: [
      { url: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg", alt: "Leather Jacket Front" },
      { url: "https://images.pexels.com/photos/16170/pexels-photo.jpg", alt: "Leather Jacket Detail" }
    ],
    colors: [{ name: "Black", code: "#000000", inStock: true }, { name: "Brown", code: "#4a3728", inStock: true }],
    sizes: [{ name: "M", inStock: true }, { name: "L", inStock: true }, { name: "XL", inStock: true }],
    stock: 25,
    isFeatured: true
  },
  {
    name: "Luxury Designer Handbag",
    description: "Elevate your accessory game with this stunning designer handbag. Made with premium synthetic leather and featuring gold-tone hardware, this bag offers both elegance and practicality with multiple compartments.",
    price: 8499,
    comparePrice: 9999,
    categoryName: "Luxury Bags",
    images: [
      { url: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg", alt: "Handbag Front" },
      { url: "https://images.pexels.com/photos/949591/pexels-photo-949591.jpeg", alt: "Handbag Side" }
    ],
    colors: [{ name: "Tan", code: "#D2B48C", inStock: true }, { name: "Black", code: "#000000", inStock: true }],
    sizes: [{ name: "Standard", inStock: true }],
    stock: 15,
    isFeatured: true
  },
  {
    name: "Classic Chronograph Watch",
    description: "A symbol of precision and luxury. This chronograph watch features a stainless steel case, sapphire crystal glass, and a reliable Japanese quartz movement. Water-resistant up to 50 meters.",
    price: 5999,
    comparePrice: 7500,
    categoryName: "Designer Watches",
    images: [
      { url: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg", alt: "Watch Front" },
      { url: "https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg", alt: "Watch Detail" }
    ],
    colors: [{ name: "Silver", code: "#C0C0C0", inStock: true }, { name: "Gold", code: "#D4AF37", inStock: true }],
    sizes: [{ name: "42mm", inStock: true }],
    stock: 20,
    isFeatured: true
  },
  {
    name: "Urban Street Sneakers",
    description: "Walk the streets in style and comfort. These urban sneakers feature a breathable mesh upper, cushioned EVA midsole, and a high-grip rubber outsole. Ideal for daily wear and street style.",
    price: 4599,
    comparePrice: 5500,
    categoryName: "Urban Footwear",
    images: [
      { url: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg", alt: "Sneakers Front" },
      { url: "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg", alt: "Sneakers Side" }
    ],
    colors: [{ name: "White", code: "#FFFFFF", inStock: true }, { name: "Black", code: "#000000", inStock: true }],
    sizes: [{ name: "40", inStock: true }, { name: "41", inStock: true }, { name: "42", inStock: true }, { name: "43", inStock: true }],
    stock: 40,
    isFeatured: true
  },
  {
    name: "Woolen Winter Overcoat",
    description: "Stay warm without compromising on style. This premium woolen overcoat features a classic notched lapel, double-breasted closure, and a luxurious quilted lining. A winter essential for the modern man.",
    price: 9799,
    comparePrice: 11000,
    categoryName: "Premium Clothes",
    images: [
      { url: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg", alt: "Overcoat Front" },
      { url: "https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg", alt: "Overcoat Back" }
    ],
    colors: [{ name: "Beige", code: "#F5F5DC", inStock: true }, { name: "Charcoal", code: "#36454F", inStock: true }],
    sizes: [{ name: "M", inStock: true }, { name: "L", inStock: true }],
    stock: 12,
    isFeatured: true
  },
  {
    name: "Silk Evening Scarf",
    description: "Add a touch of elegance to your evening attire. This 100% pure silk scarf features a unique hand-painted pattern and a soft, luxurious feel. The perfect gift for someone special.",
    price: 2299,
    comparePrice: 2900,
    categoryName: "Premium Clothes",
    images: [
      { url: "https://images.pexels.com/photos/375880/pexels-photo-375880.jpeg", alt: "Scarf Front" },
      { url: "https://images.pexels.com/photos/3310691/pexels-photo-3310691.jpeg", alt: "Scarf Detail" }
    ],
    colors: [{ name: "Floral", code: "#FFB6C1", inStock: true }],
    sizes: [{ name: "One Size", inStock: true }],
    stock: 50,
    isFeatured: false
  },
  {
    name: "Slim Fit Denim Jeans",
    description: "The perfect pair of jeans for every occasion. Our slim fit denim is made from high-quality stretch cotton for maximum comfort and durability. Featuring a classic 5-pocket design.",
    price: 3899,
    comparePrice: 4500,
    categoryName: "Premium Clothes",
    images: [
      { url: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg", alt: "Jeans Front" },
      { url: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg", alt: "Jeans Detail" }
    ],
    colors: [{ name: "Dark Blue", code: "#00008B", inStock: true }, { name: "Light Blue", code: "#ADD8E6", inStock: true }],
    sizes: [{ name: "30", inStock: true }, { name: "32", inStock: true }, { name: "34", inStock: true }],
    stock: 45,
    isFeatured: true
  },
  {
    name: "Minimalist Aviator Shades",
    description: "Protect your eyes with style. These minimalist aviator sunglasses feature polarized lenses and a lightweight titanium frame. UV400 protection guaranteed.",
    price: 1999,
    comparePrice: 2500,
    categoryName: "Designer Watches",
    images: [
      { url: "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg", alt: "Shades Front" },
      { url: "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg", alt: "Shades Side" }
    ],
    colors: [{ name: "Gold", code: "#D4AF37", inStock: true }, { name: "Silver", code: "#C0C0C0", inStock: true }],
    sizes: [{ name: "Standard", inStock: true }],
    stock: 60,
    isFeatured: true
  },
  {
    name: "Formal Slim Suit - Navy",
    description: "Look sharp at your next formal event. This navy blue slim fit suit is made from a premium wool-blend fabric and features a modern two-button blazer and matching trousers.",
    price: 18500,
    comparePrice: 22000,
    categoryName: "Premium Clothes",
    images: [
      { url: "https://images.pexels.com/photos/1321943/pexels-photo-1321943.jpeg", alt: "Suit Front" },
      { url: "https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg", alt: "Suit Detail" }
    ],
    colors: [{ name: "Navy Blue", code: "#000080", inStock: true }],
    sizes: [{ name: "48", inStock: true }, { name: "50", inStock: true }, { name: "52", inStock: true }],
    stock: 10,
    isFeatured: true
  },
  {
    name: "Minimalist Tote Bag",
    description: "The ideal bag for your daily essentials. This minimalist tote is made from durable organic cotton canvas and features a reinforced base and long shoulder straps.",
    price: 1599,
    comparePrice: 1999,
    categoryName: "Luxury Bags",
    images: [
      { url: "https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg", alt: "Tote Bag Front" },
      { url: "https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg", alt: "Tote Bag Model" }
    ],
    colors: [{ name: "Natural", code: "#F5F5DC", inStock: true }],
    sizes: [{ name: "One Size", inStock: true }],
    stock: 100,
    isFeatured: false
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB for seeding...');

    // Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});
    console.log('🗑️ Existing Products and Categories cleared.');

    // Seed Categories
    const createdCategories = [];
    for (const cat of categories) {
      const newCat = await Category.create(cat);
      createdCategories.push(newCat);
    }
    console.log('📂 Categories seeded.');

    // Map Category IDs to Names for easy lookup
    const catMap = {};
    createdCategories.forEach(cat => {
      catMap[cat.name] = cat._id;
    });

    // Prepare Products with Category IDs
    const finalProducts = products.map(p => ({
      ...p,
      category: catMap[p.categoryName]
    }));

    // Seed Products
    for (const prod of finalProducts) {
      await Product.create(prod);
    }
    console.log('🛍️ Products seeded.');

    console.log('✨ Database seeding completed successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding Error:', err);
    process.exit(1);
  }
};

seedDB();
