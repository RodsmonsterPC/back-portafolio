import { Router } from 'express'
import jwt from 'jsonwebtoken'

const router = Router()

/* ─────────────────────────────────────
   POST /api/auth/login
   Body: { username, password }
───────────────────────────────────── */
router.post('/login', (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'Usuario y contraseña requeridos.' })
  }

  const validUser = process.env.ADMIN_USER
  const validPass = process.env.ADMIN_PASSWORD

  if (username !== validUser || password !== validPass) {
    return res.status(401).json({ message: 'Credenciales incorrectas.' })
  }

  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  )

  return res.json({ token, username })
})

/* ─────────────────────────────────────
   GET /api/auth/verify
   Header: Authorization: Bearer <token>
───────────────────────────────────── */
router.get('/verify', (req, res) => {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ valid: false })
  }

  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return res.json({ valid: true, username: decoded.username })
  } catch {
    return res.status(401).json({ valid: false })
  }
})

export default router
