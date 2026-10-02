import express from 'express'
import emprestimosRouter from './src/routes/emprestimos.routes.js'
import { logger } from './src/middlewares.js'

const app = express()

app.use(express.json())
app.use(logger)
app.use('/emprestimos', emprestimosRouter)

app.get('/', (req, res) => {
  res.json({ mensagem: 'API rodou chefia' })
})

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' })
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({ erro: err.message || 'Erro do servidor' })
})

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})