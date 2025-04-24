import mongoose from 'mongoose'

const trainingOfferSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  prerequisites: [{ type: String }],
  duration: { type: Number, required: true },
  startDate: { type: Date, required: true },
  fileUrl: { type: String },
}, { timestamps: true })

const TrainingOffer = mongoose.model('TrainingOffer', trainingOfferSchema)

export default TrainingOffer
