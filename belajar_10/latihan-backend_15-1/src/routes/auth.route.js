import { Router } from 'express'
import { Login } from '../controllers/auth.controller.js'

const authRoute = Router()
authRoute.post('/login', Login)

export default authRoute