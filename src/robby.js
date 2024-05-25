import { cMAPA } from './constantes/Mapa.js'
import { cLOCAL } from './constantes/Local.js'
import { cCONFIG } from './constantes/Configuracao.js'
import { cPONTUACAO } from './constantes/Pontuacao.js'
import { cMOVIMENTOS } from './constantes/Movimentos.js'
import { GerarMovimentoAleatorio } from './utils/Utils.js'

/**
 * Função para criar um indivíduo (sequência de movimentos)
 * @returns {Array} com 200 movimentos aleatórios
 */
export function CriarIndividuo() {
  const movimentos = []
  for (let i = 0; i < 200; i++) {
    //Como são 6 movimentos possíveis, o Math.random() * 7 gera um número entre 0 e 6
    movimentos.push(GerarMovimentoAleatorio())
  }
  return movimentos
}

/**
 * Função para mutação de um indivíduo
 * @param {*} pIndividuo
 * @param {*} pTaxaMutacao
 * @returns Retorna um indivíduo mutado
 */
export function Mutar(pIndividuo, pTaxaMutacao) {
  const individuoMutado = pIndividuo.slice()
  for (let i = 0; i < individuoMutado.length; i++) {
    if (Math.random() < pTaxaMutacao) {
      individuoMutado[i] = GerarMovimentoAleatorio()
    }
  }
  return individuoMutado
}

/**
 * Função para crossover de dois indivíduos
 * @param {*} pMae
 * @param {*} pPai
 * @returns Retorna dois indivíduos filhos
 */
export function Crossover(pMae, pPai) {
  //Sem crossover
  if (Math.random() > cCONFIG.TAXA_CROSSOVER) {
    return [pMae.slice(), pPai.slice()]
  }

  //COm crossover
  const index = Math.floor(Math.random() * pMae.length)
  const filhoX = pMae.slice(0, index).concat(pPai.slice(index))
  const filhoY = pPai.slice(0, index).concat(pMae.slice(index))
  return [filhoX, filhoY]
}
/**
 * Função para avaliar o fitness de um indivíduo
 * @param {*} pIndividuo
 * @returns  Retorna a pontuação do indivíduo
 */
export function AvaliarFitness(pIndividuo) {
  const mapa = cMAPA.map((row) => row.slice())

  let x = 1
  let y = 1
  let score = 0

  pIndividuo.forEach((movimento) => {
    switch (movimento) {
      case cMOVIMENTOS.NORTE:
        if (mapa[y - 1][x] !== cLOCAL.PAREDE) y--
        else score += cPONTUACAO.BATER_PAREDE
        break
      case cMOVIMENTOS.SUL:
        if (mapa[y + 1][x] !== cLOCAL.PAREDE) y++
        else score += cPONTUACAO.BATER_PAREDE
        break
      case cMOVIMENTOS.LESTE:
        if (mapa[y][x + 1] !== cLOCAL.PAREDE) x++
        else score += cPONTUACAO.BATER_PAREDE
        break
      case cMOVIMENTOS.OESTE:
        if (mapa[y][x - 1] !== cLOCAL.PAREDE) x--
        else score += cPONTUACAO.BATER_PAREDE
        break
      case cMOVIMENTOS.ALEATORIO:
        const direction = Math.floor(Math.random() * 4)
        switch (direction) {
          case 0:
            if (mapa[y - 1][x] !== cLOCAL.PAREDE) y--
            else score += cPONTUACAO.BATER_PAREDE
            break
          case 1:
            if (mapa[y + 1][x] !== cLOCAL.PAREDE) y++
            else score += cPONTUACAO.BATER_PAREDE
            break
          case 2:
            if (mapa[y][x + 1] !== cLOCAL.PAREDE) x++
            else score += cPONTUACAO.BATER_PAREDE
            break
          case 3:
            if (mapa[y][x - 1] !== cLOCAL.PAREDE) x--
            else score += cPONTUACAO.BATER_PAREDE
            break
        }
        break
      case cMOVIMENTOS.PARADO:
        break
      case cMOVIMENTOS.PEGAR_LATA:
        if (mapa[y][x] === cLOCAL.LATA) {
          score += cPONTUACAO.PEGAR_LATA
          mapa[y][x] = cLOCAL.VAZIO
        } else {
          score += cPONTUACAO.PEGAR_VAZIO
        }
        break
    }
  })

  return score
}
/**
 * Função para seleção dos indivíduos mais aptos
 * @param {*} pPopulacao
 * @param {*} pFitness
 * @returns Retorna os indivíduos mais aptos
 */
export function SelecionarPorTorneio(pPopulacao, pFitness) {
  const tamanhoTorneio = 3
  const selecionados = []

  for (let i = 0; i < pPopulacao.length; i++) {
    const indiceTreinamento = []
    for (let j = 0; j < tamanhoTorneio; j++) {
      const index = Math.floor(Math.random() * pPopulacao.length)
      indiceTreinamento.push(index)
    }
    let melhorIndex = indiceTreinamento[0]
    for (let j = 1; j < tamanhoTorneio; j++) {
      const index = indiceTreinamento[j]
      if (pFitness[index] > pFitness[melhorIndex]) {
        melhorIndex = index
      }
    }
    selecionados.push(pPopulacao[melhorIndex])
  }

  return selecionados
}

export function SelecionarPorSUS(pPopulacao, pFitness) {
  const totalFitness = pFitness.reduce((a, b) => a + b, 0)
  const selected = []
  const pointers = []
  const stepSize = totalFitness / pPopulacao.length
  const startPoint = Math.random() * stepSize

  for (let i = 0; i < pPopulacao.length; i++) {
    pointers.push(startPoint + i * stepSize)
  }

  let fitnessSum = 0
  let index = 0

  for (let i = 0; i < pPopulacao.length; i++) {
    while (fitnessSum < pointers[i]) {
      fitnessSum += pFitness[index]
      index = (index + 1) % pPopulacao.length
    }
    selected.push(pPopulacao[index])
  }

  return selected
}
