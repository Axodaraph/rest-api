import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

import { Router } from 'express'
import { MovieModel } from '../model/movie.js'
export const moviesRouter = Router()

moviesRouter.get('/', async (req, res) => {
  try {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    res.json(movies)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

moviesRouter.get('/:id', async (req, res) => {
  try {
    // path-to-regexp
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (movie) return res.json(movie)

    res.status(404).json({ message: 'Movie not found' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

moviesRouter.post('/', async (req, res) => {
  try {
    const result = validateMovie(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    // en base de datos
    const newMovie = await MovieModel.create({ input: result.data })
    res.status(201).json(newMovie) // actualizar la cache del cliente
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

moviesRouter.patch('/:id', async (req, res) => {
  try {
    const result = validatePartialMovie(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const updateMovie = await MovieModel.update({ id, input: result.data })

    return res.json(updateMovie)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

moviesRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const result = MovieModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    return res.json({ message: 'Movie deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
