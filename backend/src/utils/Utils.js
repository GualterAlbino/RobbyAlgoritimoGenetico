/**
 * Gera um movimento aleatório para o robô
 * Como são 6 movimentos possíveis, o Math.random() * 7 gera um número entre 0 e 6
 * @returns {number}
 */
export function GerarMovimentoAleatorio() {
  return Math.floor(Math.random() * 7)
}
