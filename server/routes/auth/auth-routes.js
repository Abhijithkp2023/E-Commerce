import express, { Router } from "express"
import {registerUser, loginUser, logoutUser, authMiddleware} from "../../controllers/auth/auth-controller.js"

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout',authMiddleware, logoutUser)

export default router;