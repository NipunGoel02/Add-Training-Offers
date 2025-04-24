import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

// Hardcoded admin user for demo purposes with plain password
const adminUser = {
  email: 'admin@example.com',
  password: 'password123',
}

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  if (email !== adminUser.email || password !== adminUser.password) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }

  const token = jwt.sign({ email: adminUser.email, role: 'admin' }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  })

  res.json({ token })
})

export default router
