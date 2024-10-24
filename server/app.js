const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
//const orders = require('./routes/orders');



const cors = require('cors');

require('dotenv').config()

const url=process.env.mongo_url
const port =process.env.port||5000
const app = express();
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
// app.use('/orders', orders);


// Connect to MongoDB

mongoose.connect(url)
.then(()=>{
  console.log('Connected to MongoDB')
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})
.catch((error)=>{
  console.log(error.message)
  process.exit(1) // To exit the process if an error occurs
})






{/*
 
const { MongoClient } = require('mongodb');

async function main() {
 // const uri = "YOUR_MONGODB_CONNECTION_STRING";
  const client = new MongoClient(url);

  try {
    await client.connect();

    const database = client.db('ecommerce');
    const collection = database.collection('products');

    const products =
  [
  {
    "title": "Men's T-shirt",
    "brand": "RockStar",
    "price": 19.99,
    "imageUrl": "https://res.cloudinary.com/duor2ien6/image/upload/v1723259977/t-shirt_yfdwja.webp",
    "rating": 4.5,
    "availability": "In Stock",
    "description": "Comfortable cotton T-shirt",
    "totalReviews": 120
  },
  {
    "title": "Women's Jacket",
    "brand": "Nike",
    "price": 89.99,
    "imageUrl": "https://res.cloudinary.com/duor2ien6/image/upload/v1723260046/womens_jacket_n5h3cj.webp",
    "rating": 4.7,
    "availability": "In Stock",
    "description": "Warm and stylish jacket",
    "totalReviews": 150
  },
  {
    "title": "Smartphone",
    "brand": "Apple",
    "price": 299.99,
    "imageUrl": "https://res.cloudinary.com/duor2ien6/image/upload/v1723260031/smart_phone_elo4lz.jpg",
    "rating": 4.6,
    "availability": "In Stock",
    "description": "Latest model smartphone",
    "totalReviews": 350
  },
  {
    "title": "Bluetooth Speaker",
    "brand": "Sony",
    "price": 49.99,
    "imageUrl": "https://res.cloudinary.com/duor2ien6/image/upload/v1723260012/bluetooth_speaker_fslw8d.jpg",
    "rating": 4.5,
    "availability": "In Stock",
    "description": "Portable Bluetooth speaker",
    "totalReviews": 200
  },
  {
    "title": "Electric Kettle",
    "brand": "Prestige",
    "price": 29.99,
    "imageUrl": "https://res.cloudinary.com/duor2ien6/image/upload/v1723259945/81Way6oKRRL._SL1500__xhk5pc.jpg",
    "rating": 4.4,
    "availability": "In Stock",
    "description": "Quick boil electric kettle",
    "totalReviews": 170
  },
  {
    "title": "Washing Machine",
    "brand": "Samsung",
    "price": 499.99,
    "imageUrl": "https://res.cloudinary.com/duor2ien6/image/upload/v1723259293/303041_0_qmlwcl_nmzjhl.webp",
    "rating": 4.7,
    "availability": "In Stock",
    "description": "High-efficiency washing machine",
    "totalReviews": 300
  },
  {
    "title": "Air Fryer",
    "brand": "Philips",
    "price": 79.99,
    "imageUrl": "https://res.cloudinary.com/duor2ien6/image/upload/v1723259813/philips-airfryer-uk-thumbnail_tfzxgo.avif",
    "rating": 4.6,
    "availability": "In Stock",
    "description": "Healthy air fryer",
    "totalReviews": 220
  },
  {
    "title": "Grocery Basket",
    "brand": "Brand H",
    "price": 5.99,
    "imageUrl": "https://res.cloudinary.com/duor2ien6/image/upload/v1723259751/istockphoto-1319625327-612x612_pvlewy.jpg",
    "rating": 4.8,
    "availability": "In Stock",
    "description": "Reusable grocery basket",
    "totalReviews": 180
  },
  {
    "title": "Juicer",
    "brand": "HealthPro",
    "price": 69.99,
    "imageUrl": "https://res.cloudinary.com/duor2ien6/image/upload/v1723259696/download_oatjpt.jpg",
    "rating": 4.5,
    "availability": "In Stock",
    "description": "Fresh juice maker",
    "totalReviews": 150
  },
  {
    "title": "Coffee Machine",
    "brand": "Budan Pro",
    "price": 99.99,
    "imageUrl": "https://res.cloudinary.com/duor2ien6/image/upload/v1723260171/Slide_1_iwsbo8.webp",
    "rating": 4.7,
    "availability": "In Stock",
    "description": "Automatic coffee machine",
    "totalReviews": 250
  },
  {
    "title": "Men's Socks",
    "brand": "Bamboo",
    "price": 12.99,
    "imageUrl": "https://res.cloudinary.com/duor2ien6/image/upload/v1723260570/p3-greenlgnb-web-65530d24c4900_360x_avovji.avif",
    "rating": 4.5,
    "availability": "In Stock",
    "description": "Comfortable cotton socks",
    "totalReviews": 140
  },
  {
    "title": "Women's Scarf",
    "brand": "Matchitt",
    "price": 24.99,
    "imageUrl": "https://res.cloudinary.com/duor2ien6/image/upload/v1723260654/images_mlhyl7.jpg",
    "rating": 4.6,
    "availability": "In Stock",
    "description": "Silk scarf",
    "totalReviews": 110
  },
  {
    "title": "Bluetooth Headphones",
    "brand": "Sony",
    "price": 59.99,
    "imageUrl": "https://res.cloudinary.com/duor2ien6/image/upload/v1723260826/unnamed_qkzfj4.webp",
    "rating": 4.5,
    "availability": "In Stock",
    "description": "Noise-cancelling headphones",
    "totalReviews": 380
  },
  {
    "title": "Smart TV",
    "brand": "Sony",
    "price": 499.99,
    "imageUrl": "https://res.cloudinary.com/duor2ien6/image/upload/v1723260870/81P6YFm57TL_mc1fix.jpg",
    "rating": 4.7,
    "availability": "In Stock",
    "description": "4K Ultra HD Smart TV",
    "totalReviews": 400
  },
  {
    "title": "Blender",
    "brand": "Solara",
    "price": 49.99,
    "imageUrl": "https://res.cloudinary.com/duor2ien6/image/upload/v1723260912/Photoroom_20240401_53936PM_y3xvfn.webp",
    "rating": 4.4,
    "availability": "In Stock",
    "description": "High-speed blender",
    "totalReviews": 290
  },
  {
    "title": "Vacuum Cleaner",
    "brand": "Kent",
    "price": 199.99,
    "imageUrl": "https://res.cloudinary.com/duor2ien6/image/upload/v1723261031/download_wet4qo.jpg",
    "rating": 4.6,
    "availability": "In Stock",
    "description": "Cordless vacuum cleaner",
    "totalReviews": 320
  },
  {
    "title": "Toaster",
    "brand": "Whall",
    "price": 29.99,
    "imageUrl": "https://res.cloudinary.com/duor2ien6/image/upload/v1723261116/6344fbbd0abc17115a22cb52-toasters-2-slice-best-rated-prime-whall_zelm7o.jpg",
    "rating": 4.5,
    "availability": "In Stock",
    "description": "2-slice toaster",
    "totalReviews": 230
  },
  {
    "title": "Bread",
    "brand": "Brand R",
    "price": 2.49,
    "imageUrl": "https://res.cloudinary.com/duor2ien6/image/upload/v1723261223/milk-bread_vopfmp.webp",
    "rating": 4.8,
    "availability": "In Stock",
    "description": "Whole grain bread",
    "totalReviews": 500
  },
  {
    "title": "Milk",
    "brand": "Brand S",
    "price": 1.99,
    "imageUrl": "https://images.unsplash.com/photo-1590983153751-55c25b68a7f3",
    "rating": 4.7,
    "availability": "In Stock",
    "description": "Organic whole milk",
    "totalReviews": 480
  },
  {
    "title": "Eggs",
    "brand": "Brand T",
    "price": 3.99,
    "imageUrl": "https://images.unsplash.com/photo-1590983153751-5d70d1b9a894",
    "rating": 4.6,
    "availability": "In Stock",
    "description": "Free-range eggs",
    "totalReviews": 460
  },
  {
    "title": "Juice",
    "brand": "Brand U",
    "price": 2.99,
    "imageUrl": "https://images.unsplash.com/photo-1590983153751-0fd21f6b60f1",
    "rating": 4.5,
    "availability": "In Stock",
    "description": "Fresh orange juice",
    "totalReviews": 440
  },
  {
    "title": "Chocolate",
    "brand": "Brand V",
    "price": 1.99,
    "imageUrl": "https://images.unsplash.com/photo-1590983153751-9e1fcd4d62d0",
    "rating": 4.8,
    "availability": "In Stock",
    "description": "Dark chocolate bar",
    "totalReviews": 160
},

  {
    "title": "Chocolate",
    "brand": "Brand V",
    "price": 1.99,
    "imageUrl": "https://images.unsplash.com/photo-1590983153751-9e1fcd4d62d0",
    "rating": 4.8,
    "availability": "In Stock",
    "description": "Dark chocolate bar",
    "totalReviews": 150
  },
  {
    "title": "Action Figure",
    "brand": "Brand W",
    "price": 14.99,
    "imageUrl": "https://images.unsplash.com/photo-1590983153751-5d9ddf9e5d35",
    "rating": 4.6,
    "availability": "In Stock",
    "description": "Collectible action figure",
    "totalReviews": 130
  },
  {
    "title": "Puzzle",
    "brand": "Brand X",
    "price": 9.99,
    "imageUrl": "https://images.unsplash.com/photo-1590983153751-44f5e0c7d220",
    "rating": 4.7,
    "availability": "In Stock",
    "description": "500-piece jigsaw puzzle",
    "totalReviews": 120
  },
  {
    "title": "Dollhouse",
    "brand": "Brand Y",
    "price": 99.99,
    "imageUrl": "https://images.unsplash.com/photo-1590983153751-8cbb68a0f9e5",
    "rating": 4.8,
    "availability": "In Stock",
    "description": "Wooden dollhouse with furniture",
    "totalReviews": 140
  },
  {
    "title": "Kids' Bike",
    "brand": "Brand Z",
    "price": 149.99,
    "imageUrl": "https://images.unsplash.com/photo-1590983153751-0c91c5158f65",
    "rating": 4.7,
    "availability": "In Stock",
    "description": "Adjustable kids' bike",
    "totalReviews": 160
  },
  {
    "title": "Men's Sneakers",
    "brand": "Brand AA",
    "price": 79.99,
    "imageUrl": "https://images.unsplash.com/photo-1590983153751-df5e4b4f0dfd",
    "rating": 4.6,
    "availability": "In Stock",
    "description": "Stylish men's sneakers",
    "totalReviews": 140
  },
  {
    "title": "Women's Boots",
    "brand": "Brand BB",
    "price": 119.99,
    "imageUrl": "https://images.unsplash.com/photo-1590983153751-4e5e6c0c7b45",
    "rating": 4.7,
    "availability": "In Stock",
    "description": "Warm winter boots",
    "totalReviews": 130
  },
  {
    "title": "Smartwatch",
    "brand": "Brand CC",
    "price": 199.99,
    "imageUrl": "https://images.unsplash.com/photo-1590983153751-9db0f9b2d1d1",
    "rating": 4.6,
    "availability": "In Stock",
    "description": "Advanced smartwatch with health tracking",
    "totalReviews": 210
  },
  {
    "title": "Camera",
    "brand": "Brand DD",
    "price": 399.99,
    "imageUrl": "https://images.unsplash.com/photo-1590983153751-8e4d5d99a0d1",
    "rating": 4.8,
    "availability": "In Stock",
    "description": "Digital camera with 4K video",
    "totalReviews": 270
  },
  {
    "title": "Laptop",
    "brand": "Brand EE",
    "price": 799.99,
    "imageUrl": "https://images.unsplash.com/photo-1590983153751-9c3d9e0d8a01",
    "rating": 4.7,
    "availability": "In Stock",
    "description": "High-performance laptop",
    "totalReviews": 340
  },
  {
    "title": "Guitar",
    "brand": "Brand FF",
    "price": 129.99,
    "imageUrl": "https://images.unsplash.com/photo-1590983153751-7f7e3b4d0db4",
    "rating": 4.5,
    "availability": "In Stock",
    "description": "Acoustic guitar with case",
    "totalReviews": 200
  },
  {
    "title": "Headphones",
    "brand": "Brand GG",
    "price": 89.99,
    "imageUrl": "https://images.unsplash.com/photo-1590983153751-6c8f5b4d9c1a",
    "rating": 4.6,
    "availability": "In Stock",
    "description": "Over-ear noise-cancelling headphones",
    "totalReviews": 210
  },
  {
    "title": "E-Reader",
    "brand": "Brand HH",
    "price": 149.99,
    "imageUrl": "https://images.unsplash.com/photo-1590983153751-bb7e6c0e0dd1",
    "rating": 4.7,
    "availability": "In Stock",
    "description": "High-resolution e-reader",
    "totalReviews": 190
  },
  {
    "title": "Yoga Mat",
    "brand": "Brand II",
    "price": 29.99,
    "imageUrl": "https://images.unsplash.com/photo-1590983153751-f11c5b4d2d3f",
    "rating": 4.8,
    "availability": "In Stock",
    "description": "Non-slip yoga mat",
    "totalReviews": 220
  },
  {
    "title": "Massage Gun",
    "brand": "Brand JJ",
    "price": 119.99,
    "imageUrl": "https://images.unsplash.com/photo-1590983153751-0a2d5c5e5b03",
    "rating": 4.6,
    "availability": "In Stock",
    "description": "Portable massage gun",
    "totalReviews": 160
  },
  {
    "title": "Camping Tent",
    "brand": "Brand KK",
    "price": 199.99,
    "imageUrl": "https://images.unsplash.com/photo-1590983153751-72f5b4d8c7d1",
    "rating": 4.7,
    "availability": "In Stock",
    "description": "Spacious camping tent",
    "totalReviews": 170
  },
  {
    "title": "Hiking Boots",
    "brand": "Brand LL",
    "price": 129.99,
    "imageUrl": "https://images.unsplash.com/photo-1590983153751-cd7e5b4d2c5a",
    "rating": 4.6,
    "availability": "In Stock",
    "description": "Durable hiking boots",
    "totalReviews": 140
  },
  {
    "title": "Travel Backpack",
    "brand": "Brand MM",
    "price": 89.99,
    "imageUrl": "https://images.unsplash.com/photo-1590983153751-0d2d5c8e0b0b",
    "rating": 4.5,
    "availability": "In Stock",
    "description": "Large travel backpack",
    "totalReviews": 180
  },
  {
    "title": "Electric Toothbrush",
    "brand": "Brand NN",
    "price": 59.99,
    "imageUrl": "https://images.unsplash.com/photo-1590983153751-f22e8d8e5b1b",
    "rating": 4.7,
    "availability": "In Stock",
    "description": "Rechargeable electric toothbrush",
    "totalReviews": 150
  },
  {
    "title": "Hair Dryer",
    "brand": "Brand OO",
    "price": 39.99,
    "imageUrl": "https://images.unsplash.com/photo-1590983153751-5d5b8e8e5a4d",
    "rating": 4.6,
    "availability": "In Stock",
    "description": "Professional hair dryer",
    "totalReviews": 160
  },
  {
    "title": "Smart Thermostat",
    "brand": "Brand PP",
    "price": 149.99,
    "imageUrl": "https://images.unsplash.com/photo-1590983153751-fb5b8d8e5b1b",
    "rating": 4.8,
    "availability": "In Stock",
    "description": "Wi-Fi enabled smart thermostat",
    "totalReviews": 140
  }
  
]


    const result = await collection.insertMany(products);
    console.log(`${result.insertedCount} products were inserted`);

  } finally {
    await client.close();
  }
}

main().catch(console.error);

*/}