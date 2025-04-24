import express from 'express'
import TrainingOffer from '../models/TrainingOffer.js'
import Category from '../models/Category.js' // 👈 add this
import upload from '../middleware/upload.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/', auth, upload.single('file'), async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      prerequisites,
      duration,
      startDate,
    } = req.body

    // 👉 Convert category name to its ObjectId
    const foundCategory = await Category.findOne({ name: category })
    if (!foundCategory) {
      return res.status(400).json({ message: 'Category not found' })
    }

    // prerequisites may come as JSON string or array
    let prereqArray = []
    if (typeof prerequisites === 'string') {
      try {
        prereqArray = JSON.parse(prerequisites)
      } catch {
        prereqArray = [prerequisites]
      }
    } else if (Array.isArray(prerequisites)) {
      prereqArray = prerequisites
    }

    const fileUrl = req.file ? `/uploads/${req.file.filename}` : null

    const trainingOffer = new TrainingOffer({
      title,
      description,
      category: foundCategory._id, // 👈 final fixed id here
      prerequisites: prereqArray,
      duration,
      startDate,
      fileUrl,
    })

    await trainingOffer.save()

    res.status(201).json({ message: 'Training offer created successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create training offer' })
  }
})

export default router
