import { cCONFIG } from './constantes/Configuracao.js'
import {
  CriarIndividuo,
  Mutar,
  Crossover,
  AvaliarFitness,
  SelecionarPorTorneio,
  SelecionarPorSUS
} from './services/robby.js'

// Função principal do algoritmo genético
export function executarAlgoritimoGenetico(
  pTaxaMutacao,
  pTaxaCrossover,
  pTamanhoPopulacao,
  pQtdGeracoes
) {
  if (pTaxaMutacao) cCONFIG.TAXA_MUTACAO = pTaxaMutacao
  if (pQtdGeracoes) cCONFIG.QTD_GERACOES = pQtdGeracoes
  if (pTaxaCrossover) cCONFIG.TAXA_CROSSOVER = pTaxaCrossover
  if (pTamanhoPopulacao) cCONFIG.TAMANHO_POPULACAO = pTamanhoPopulacao

  let mediaPontuacao = 0
  const melhoresPontuacoes = []

  let geracao = 0
  let melhorIndividuo = null
  let melhorFitness = -Infinity
  let melhorFitnessDaGeracao = -Infinity
  let populacao = Array.from(
    { length: cCONFIG.TAMANHO_POPULACAO },
    CriarIndividuo
  )

  for (let i = 0; i < cCONFIG.QTD_GERACOES; i++) {
    const fitness = populacao.map(AvaliarFitness)

    // Encontrar o melhor indivíduo desta geração
    for (let j = 0; j < populacao.length; j++) {
      if (fitness[j] > melhorFitness) {
        melhorFitness = fitness[j]
        melhorIndividuo = populacao[j]
      }
    }

    // Encontrar a melhor pontuação desta geração
    melhorFitnessDaGeracao = Math.max(...fitness)
    melhoresPontuacoes.push(melhorFitnessDaGeracao)

    // Mostrar a melhor pontuação da geração atual
    console.log(
      `Geração ${geracao}: melhor pontuação = ${melhorFitnessDaGeracao}`
    )

    // Seleção com elitismo
    const eliteSize = Math.floor(cCONFIG.TAMANHO_POPULACAO * 0.1)
    const sortedPopulation = populacao
      .map((individuo, index) => ({ individuo, fitness: fitness[index] }))
      .sort((a, b) => b.fitness - a.fitness)
    const elite = sortedPopulation
      .slice(0, eliteSize)
      .map((item) => item.individuo)

    const populacaoSelecionada = SelecionarPorSUS(populacao, fitness).slice(
      eliteSize
    )

    // Aplicar crossover
    const novaPopulacao = []
    while (novaPopulacao.length < cCONFIG.TAMANHO_POPULACAO - eliteSize) {
      const pai1 =
        populacaoSelecionada[
          Math.floor(Math.random() * populacaoSelecionada.length)
        ]
      const pai2 =
        populacaoSelecionada[
          Math.floor(Math.random() * populacaoSelecionada.length)
        ]
      const [filho1, filho2] = Crossover(pai1, pai2)
      novaPopulacao.push(filho1, filho2)
    }

    // Aplicar mutação
    const populacaoMutada = novaPopulacao.map((individuo) =>
      Mutar(individuo, cCONFIG.TAXA_MUTACAO)
    )

    // Inserir elite na nova população
    populacao = elite.concat(populacaoMutada)
    geracao++
  }

  mediaPontuacao =
    melhoresPontuacoes.reduce((a, b) => a + b) / melhoresPontuacoes.length
  return { melhorIndividuo, melhoresPontuacoes, mediaPontuacao }
}

// Executar o algoritmo genético com a configuração fornecida
// const { melhorIndividuo, melhorFitness, mediaPontuacao } =
//   ExecutarAlgoritimoGenetico()
// console.log('Média de pontuação:', mediaPontuacao)
// console.log('Melhor sequência encontrada:', melhorIndividuo)
// console.log('Fitness pontuação obtida:', melhorFitness)
