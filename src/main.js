import { cCONFIG } from './constantes/Configuracao.js'
import {
  CriarIndividuo,
  Mutar,
  Crossover,
  AvaliarFitness,
  SelecionarPorTorneio,
  SelecionarPorSUS
} from './robby.js'

// Função principal do algoritmo genético
function ExecutarAlgoritimoGenetico() {
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

  return { melhorIndividuo, melhorFitness }
}

// Executar o algoritmo genético com a configuração fornecida
const { melhorIndividuo, melhorFitness } = ExecutarAlgoritimoGenetico()
console.log('Melhor sequência encontrada:', melhorIndividuo)
console.log('Fitness da melhor sequência:', melhorFitness)
