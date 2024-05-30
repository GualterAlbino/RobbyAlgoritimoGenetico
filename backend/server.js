import express from 'express'
import cors from 'cors'
import { executarAlgoritimoGenetico } from './src/main.js'

const app = express()
const port = 3000

// Configuração do CORS
app.use(cors())

app.get('/executar', (req, res) => {
  const taxaMutacao = req.query.TAXA_MUTACAO
  const qtdGeracoes = req.query.QTD_GERACOES
  const taxaCrossover = req.query.TAXA_CROSSOVER
  const tamanhoPopulacao = req.query.TAMANHO_POPULACAO

  res.json(
    executarAlgoritimoGenetico(
      taxaMutacao,
      taxaCrossover,
      tamanhoPopulacao,
      qtdGeracoes
    )
  )
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
