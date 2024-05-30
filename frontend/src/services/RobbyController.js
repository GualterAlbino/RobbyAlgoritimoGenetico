import AxiosInstanceClass from './AxiosInstanceClass'

export default class RobbyController extends AxiosInstanceClass {
  // --------------------------------------
  // constructor
  // --------------------------------------
  constructor() {
    super('http://localhost:3000')
  }

  // --------------------------------------
  // ExecutarAlgoritimoGenetico
  // --------------------------------------
  executarAlgoritimoGenetico(config = null) {
    let params = ''

    if (config) {
      params = `?TAMANHO_POPULACAO=${config.tamanhoPopulacao}&QTD_GERACOES=${config.quantidadeGeracoes}&TAXA_CROSSOVER=${config.taxaCrossover}&TAXA_MUTACAO=${config.taxaMutacao}`
    }

    return this.rest.get(`/executar${params}`)
  }
}
