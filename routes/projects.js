import { Router } from 'express'
import Project from '../models/Project.js'

const router = Router()

/* ─────────────────────────────────────
   GET /api/projects  → Listar todos
───────────────────────────────────── */
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })
    res.json(projects)
  } catch (error) {
    console.error('GET /api/projects:', error.message)
    res.status(500).json({ message: 'Error al obtener proyectos', error: error.message })
  }
})

/* ─────────────────────────────────────
   GET /api/projects/:id  → Obtener uno
───────────────────────────────────── */
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) return res.status(404).json({ message: 'Proyecto no encontrado' })
    res.json(project)
  } catch (error) {
    console.error('GET /api/projects/:id:', error.message)
    res.status(500).json({ message: 'Error al obtener el proyecto', error: error.message })
  }
})

/* ─────────────────────────────────────
   POST /api/projects  → Crear proyecto
───────────────────────────────────── */
router.post('/', async (req, res) => {
  try {
    const { name, description, image, demoLink, repoLink, repoFrontLink, repoBackLink, tags } = req.body

    // Normalizar tags: acepta string o array
    const normalizedTags = Array.isArray(tags)
      ? tags.map((t) => t.trim()).filter(Boolean)
      : typeof tags === 'string'
      ? tags.split(',').map((t) => t.trim()).filter(Boolean)
      : []

    const project = new Project({
      name,
      description,
      image,
      demoLink,
      repoLink,
      repoFrontLink,
      repoBackLink,
      tags: normalizedTags,
    })

    const saved = await project.save()
    res.status(201).json(saved)
  } catch (error) {
    console.error('POST /api/projects:', error.message)
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Datos inválidos', error: error.message })
    }
    res.status(500).json({ message: 'Error al crear el proyecto', error: error.message })
  }
})

/* ─────────────────────────────────────
   PUT /api/projects/:id  → Editar
───────────────────────────────────── */
router.put('/:id', async (req, res) => {
  try {
    const { name, description, image, demoLink, repoLink, repoFrontLink, repoBackLink, tags } = req.body

    // Normalizar tags
    const normalizedTags = Array.isArray(tags)
      ? tags.map((t) => t.trim()).filter(Boolean)
      : typeof tags === 'string'
      ? tags.split(',').map((t) => t.trim()).filter(Boolean)
      : []

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      { name, description, image, demoLink, repoLink, repoFrontLink, repoBackLink, tags: normalizedTags },
      { new: true, runValidators: true }
    )

    if (!updated) return res.status(404).json({ message: 'Proyecto no encontrado' })
    res.json(updated)
  } catch (error) {
    console.error('PUT /api/projects/:id:', error.message)
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Datos inválidos', error: error.message })
    }
    res.status(500).json({ message: 'Error al actualizar el proyecto', error: error.message })
  }
})

/* ─────────────────────────────────────
   DELETE /api/projects/:id  → Eliminar
───────────────────────────────────── */
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ message: 'Proyecto no encontrado' })
    res.json({ message: 'Proyecto eliminado correctamente', id: req.params.id })
  } catch (error) {
    console.error('DELETE /api/projects/:id:', error.message)
    res.status(500).json({ message: 'Error al eliminar el proyecto', error: error.message })
  }
})

export default router
