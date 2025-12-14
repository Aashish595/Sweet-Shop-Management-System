import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Sweet from './models/Sweet.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Sweet.deleteMany({});

    // Create admin user
    const admin = new User({
      email: 'admin@sweetshop.com',
      password: 'admin123',
      role: 'admin',
    });
    await admin.save();

    // Create regular user
    const user = new User({
      email: 'customer@sweetshop.com',
      password: 'customer123',
      role: 'user',
    });
    await user.save();

    // Create sample sweets
    const sweets = [
      {
        name: 'Dark Chocolate Truffle',
        description: 'Rich dark chocolate truffle dusted with cocoa powder',
        category: 'chocolate',
        price: 2.99,
        quantity: 100,
        imageUrl: 'https://images.unsplash.com/photo-1575377427642-087cf684f29d?w=300',
      },
      {
        name: 'Gummy Bears',
        description: 'Assorted fruit flavored gummy bears',
        category: 'candy',
        price: 1.49,
        quantity: 200,
        imageUrl: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=300',
      },
      {
        name: 'Vanilla Cupcake',
        description: 'Moist vanilla cupcake with buttercream frosting',
        category: 'cake',
        price: 3.49,
        quantity: 50,
        imageUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=300',
      },
      {
        name: 'Butter Cookies',
        description: 'Crispy butter cookies with sugar sprinkles',
        category: 'biscuit',
        price: 4.99,
        quantity: 150,
      },
      {
        name: 'Mango Ice Cream',
        description: 'Creamy mango flavored ice cream',
        category: 'ice-cream',
        price: 3.99,
        quantity: 80,
      },
    ];

    await Sweet.insertMany(sweets);

    console.log('✅ Database seeded successfully!');
    console.log('\n📋 Admin credentials:');
    console.log('   Email: admin@sweetshop.com');
    console.log('   Password: admin123');
    console.log('\n📋 User credentials:');
    console.log('   Email: customer@sweetshop.com');
    console.log('   Password: customer123');
    console.log(`\n🔗 API URL: http://localhost:${process.env.PORT || 5000}`);

    mongoose.disconnect();
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();