// Configuração do Algoritmo Genético
export const cCONFIG = {
  // Tamanho da população de indivíduos
  TAMANHO_POPULACAO: 1000,

  // Cada geração representa uma geração de indivíduos, onde ocorre seleção, crossover, mutação e avaliação de fitness.
  QTD_GERACOES: 100,

  // A probabilidade de dois indivíduos selecionados para reprodução realizarem o crossover, gerando descendentes.
  TAXA_CROSSOVER: 0.05,

  //A probabilidade de cada gene em um indivíduo sofrer mutação durante a reprodução.
  TAXA_MUTACAO: 0.1
}
