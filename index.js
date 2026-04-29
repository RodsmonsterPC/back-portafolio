import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db.js'
import projectRoutes from './routes/projects.js'
import authRoutes from './routes/auth.js'

dotenv.config()

// Conectar a la base de datos
connectDB()

const app = express()

/* ─── Middlewares ─── */
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://127.0.0.1:5173',
      'https://front-portfafolio.vercel.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* ─── Rutas ─── */
app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)

/* ─── Health check ─── */
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'OK',
    message: '🚀 Servidor del portafolio activo',
    timestamp: new Date().toISOString(),
  })
})

/* ─── 404 ─── */
app.use((_req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' })
})

/* ─── Arrancar servidor ─── */
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
  console.log(`📡 API disponible en http://localhost:${PORT}/api/projects`)
})
