import express, { json } from 'express' // require -> ecmascript module
/* import movies from './movie.json' with {type: 'json'} */

import { moviesRouter } from './routes/movies.js'
/* import { corsMiddleware } from './middleware/cors.js' */

// como leer un json en ESModules recomendado por ahora

const app = express()
app.use(json())
/* app.use(corsMiddleware()) */
app.disable('x-powered-by')

// metodos normales: GET/HEAD/POST
// metodos complejos: PUT/PATCH/DELETE

// CORS PRE-Flight
// OPTIONS

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
