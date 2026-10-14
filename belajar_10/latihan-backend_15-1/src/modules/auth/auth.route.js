import { Router } from 'express'
import { Login } from './auth.controller.js'

const router = Router()

router.post('/login', Login)

export default router