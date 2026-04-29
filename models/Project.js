import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre del proyecto es obligatorio'],
      trim: true,
      maxlength: [100, 'El nombre no puede superar 100 caracteres'],
    },
    description: {
      type: String,
      required: [true, 'La descripción es obligatoria'],
      trim: true,
      maxlength: [1000, 'La descripción no puede superar 1000 caracteres'],
    },
    image: {
      type: String,
      default: '',
      trim: true,
    },
    demoLink: {
      type: String,
      default: '',
      trim: true,
    },
    repoLink: {
      type: String,
      default: '',
      trim: true,
    },
    repoFrontLink: {
      type: String,
      default: '',
      trim: true,
    },
    repoBackLink: {
      type: String,
      default: '',
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
  }
)

const Project = mongoose.model('Project', projectSchema)

export default Project
