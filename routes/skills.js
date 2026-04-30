import { Router } from 'express'
import Skill from '../models/Skill.js'

const router = Router()

/* ─────────────────────────────────────
   GET /api/skills  → Listar todas
───────────────────────────────────── */
router.get('/', async (_req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1, createdAt: 1 })
    res.json(skills)
  } catch (error) {
    console.error('GET /api/skills:', error.message)
    res.status(500).json({ message: 'Error al obtener skills', error: error.message })
  }
})

/* ─────────────────────────────────────
   POST /api/skills  → Crear skill
───────────────────────────────────── */
router.post('/', async (req, res) => {
  try {
    const { name, percent, order } = req.body

    const skill = new Skill({
      name: String(name).trim(),
      percent: Number(percent),
      order: Number(order ?? 0),
    })

    const saved = await skill.save()
    res.status(201).json(saved)
  } catch (error) {
    console.error('POST /api/skills:', error.message)
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Datos inválidos', error: error.message })
    }
    res.status(500).json({ message: 'Error al crear la skill', error: error.message })
  }
})

/* ─────────────────────────────────────
   PUT /api/skills/:id  → Actualizar
───────────────────────────────────── */
router.put('/:id', async (req, res) => {
  try {
    const { name, percent, order } = req.body

    const updated = await Skill.findByIdAndUpdate(
      req.params.id,
      {
        name: String(name).trim(),
        percent: Number(percent),
        order: Number(order ?? 0),
      },
      { new: true, runValidators: true }
    )

    if (!updated) return res.status(404).json({ message: 'Skill no encontrada' })
    res.json(updated)
  } catch (error) {
    console.error('PUT /api/skills/:id:', error.message)
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Datos inválidos', error: error.message })
    }
    res.status(500).json({ message: 'Error al actualizar la skill', error: error.message })
  }
})

/* ─────────────────────────────────────
   DELETE /api/skills/:id  → Eliminar
───────────────────────────────────── */
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Skill.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ message: 'Skill no encontrada' })
    res.json({ message: 'Skill eliminada correctamente', id: req.params.id })
  } catch (error) {
    console.error('DELETE /api/skills/:id:', error.message)
    res.status(500).json({ message: 'Error al eliminar la skill', error: error.message })
  }
})

export default router
