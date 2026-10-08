import express from 'express'
import cors from 'cors'

import authRoute from './routes/auth.route.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoute)

app.get('/', (req, res) => {
  res.json({ message: "Welcome to POS API" })
})

export default app
