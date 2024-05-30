import axios from 'axios'

export default class AxiosInstanceClass {
  #baseURL = null

  constructor(pBaseURL) {
    this.#baseURL = pBaseURL
  }

  get baseURL() {
    return this.#baseURL
  }

  set baseURL(pBaseURL) {
    if (!pBaseURL) {
      this.#baseURL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
    }
    this.#baseURL = pBaseURL
  }

  // --------------------------------------
  // rest
  // --------------------------------------
  get rest() {
    return axios.create({
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD'
      },
      baseURL: this.baseURL
    })
  }

  // --------------------------------------
  // dispatchError
  // --------------------------------------
  dispatchError(eventName, error) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail: this.tratarMensagemErro(this.getMessageError(error))
      })
    )
  }

  throwError(error) {
    throw this.tratarMensagemErro(this.getMessageError(error))
  }

  // --------------------------------------
  // dispatchResponse
  // --------------------------------------
  dispatchResponse(eventName, response) {
    this.dispatchEvent(
      new CustomEvent(eventName, { detail: response ? response.data : null })
    )
  }

  // --------------------------------------
  // getMessageError
  // --------------------------------------
  getMessageError(error) {
    // Quando o servidor está desligado, não possui response
    if (!error.response) {
      return error.message
    }

    if (!error.response.data.error) {
      return error.response.data
    }

    return error.response.data.error
  }

  // --------------------------------------
  // tratarMensagemErro
  // --------------------------------------
  tratarMensagemErro(mensagem) {
    if (mensagem === 'Network Error') {
      return 'Falha de conexão com o servidor!'
    }

    return mensagem
  }
}
