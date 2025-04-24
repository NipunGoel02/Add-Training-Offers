import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import categoryRoutes from './routes/category.js'
import trainingOfferRoutes from './routes/trainingOffer.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes
app.use('/api/categories', categoryRoutes)
app.use('/api/training-offers', trainingOfferRoutes)

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/trainingdb'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})
.catch((err) => {
  console.error('Failed to connect to MongoDB', err)
})
