import express from 'express'
import { readFileSync} from 'node:fs'
import { resolve } from 'node:path/posix'
import { log } from 'node:console'
import cors from 'cors'

const PORT = 3000
const root = process.cwd()
const resolve_local = p => resolve(root, p)

const site = readFileSync( resolve_local( './dist/index.html' ), 'utf-8' )
const app = express()

app.use(express.static(resolve_local('./dist')))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:4173',
    'http://localhost:3000'
  ]
}))

app.get('/', async (req, res) => {
  const url = req.originalUrl
  res.status(200).end(site)
})

app.listen(PORT, () => {
  log(`Listening on http://localhost:${PORT}`);
})