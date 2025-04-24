import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Category from './models/Category.js'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/trainingdb'

const categories = [
  { name: 'Software Development' },
  { name: 'Project Management' },
  { name: 'Human Resources' },
  { name: 'Marketing' },
  { name: 'Sales' },
]

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connected to MongoDB')

    await Category.deleteMany({})
    console.log('Cleared existing categories')

    await Category.insertMany(categories)
    console.log('Inserted sample categories')

    mongoose.disconnect()
  } catch (error) {
    console.error('Error seeding categories:', error)
  }
}

seed()
