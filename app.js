import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { petsRouter } from './routes/api/pets.js'
import { medicationsRouter } from './routes/api/medications.js'
import { logsRouter } from './routes/api/logs.js'
import { prescriptionsRouter } from './routes/api/prescriptions.js'

const port = process.env.PORT || 3020
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/pets', petsRouter)
app.use('/api/medications', medicationsRouter)
app.use('/api/logs', logsRouter)
app.use('/api/prescriptions', prescriptionsRouter)

app.listen(port, () => console.log(`Server running at http://localhost:${port}`))