import mongoose from 'mongoose'

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre de la tecnología es obligatorio'],
      trim: true,
      maxlength: [80, 'El nombre no puede superar 80 caracteres'],
    },
    percent: {
      type: Number,
      required: [true, 'El porcentaje es obligatorio'],
      min: [0, 'El porcentaje mínimo es 0'],
      max: [100, 'El porcentaje máximo es 100'],
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Skill = mongoose.model('Skill', skillSchema)

export default Skill
