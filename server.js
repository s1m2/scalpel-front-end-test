import express from 'express'
import { readFileSync, appendFileSync } from 'node:fs'
import { resolve } from 'node:path/posix'
import { log } from 'node:console'
import cors from 'cors'

const PORT = 5000
const root = process.cwd()
const resolve_local = p => resolve(root, p)

const site = readFileSync('./dist/index.html', 'utf-8' )
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

app.post('/api/savedata', (req, res) => {
  const { body } = req;

  try {
    appendFileSync('word.txt', body.word)
  } catch (error) {
    throw err;
  }

  res.status(200).json({ message: 'Data saved' })
})

app.get('/api/getdata', (req, res) => {

  try {
    const data = readFileSync('word.txt', 'utf8');
    res.status(200).json({ message: data })
  } catch (error) {
    throw err;
  }
})

app.listen(PORT, () => {
  log(`Listening on http://localhost:${PORT}`);
})