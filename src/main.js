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

    // Seleção
    const populacaoSelecionada = SelecionarPorTorneio(populacao, fitness)

    // const populacaoSelecionada = SelecionarPorSUS(
    //   populacao,
    //   fitness
    // )

    // Crossover e Mutação
    const novaPopulacao = []
    for (let j = 0; j < cCONFIG.TAMANHO_POPULACAO; j += 2) {
      const pais = [populacaoSelecionada[j], populacaoSelecionada[j + 1]]
      const filhos = Crossover(pais[0], pais[1])
      const mutatedChildren = [
        Mutar(filhos[0], cCONFIG.TAXA_MUTACAO),
        Mutar(filhos[1], cCONFIG.TAXA_MUTACAO)
      ]
      novaPopulacao.push(...mutatedChildren)
    }

    populacao = novaPopulacao
    geracao++
  }

  return { melhorIndividuo, melhorFitness }
}

// Executar o algoritmo genético com a configuração fornecida
const { melhorIndividuo, melhorFitness } = ExecutarAlgoritimoGenetico()
console.log('Melhor sequência encontrada:', melhorIndividuo)
console.log('Fitness da melhor sequência:', melhorFitness)
