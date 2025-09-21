import mongoose from 'mongoose';
import Category from './model/categorymodel.js';

const MONGODB_URI = 'mongodb://localhost:27017/website';

const seedCategories = async () => {
  try {
    console.log('Connecting to MongoDB...');

    await mongoose.connect(MONGODB_URI);
    
    console.log('Connected to MongoDB');
    
    const initialCategories = [
      'workshop',
      'seminar',
      'conference',
      'cultural',
      'sports',
      'other'
    ];
    
    let addedCount = 0;
    
    for (const categoryName of initialCategories) {
      const categoryExists = await Category.findOne({ name: categoryName });
      if (!categoryExists) {
        const category = new Category({ name: categoryName });
        await category.save();
        console.log(`✓ Added category: ${categoryName}`);
        addedCount++;
      } else {
        console.log(`- Category already exists: ${categoryName}`);
      }
    }
    
    if (addedCount === 0) {
      console.log('All categories already exist in the database');
    } else {
      console.log(`Successfully added ${addedCount} new categories`);
    }
    
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  }
};

seedCategories();