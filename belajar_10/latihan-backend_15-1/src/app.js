import express from 'express'
import cors from 'cors'

import authRoutes from './modules/auth/auth.route.js'
import userRoutes from './modules/users/users.route.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

// Handling route 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan' });
});

app.get('/', (req, res) => {
  res.json({ message: "Welcome to POS API" })
})

export default app
