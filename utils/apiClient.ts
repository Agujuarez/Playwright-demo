import { type APIRequestContext, expect } from '@playwright/test'

import { type TransferPayload } from './contracts'

export class BankingApiClient {
  private readonly request: APIRequestContext
  private readonly baseUrl: string

  constructor(request: APIRequestContext, baseUrl = 'https://httpbin.org') {
    this.request = request
    this.baseUrl = baseUrl
  }

  async obtenerHealth() {
    return this.request.get(`${this.baseUrl}/status/200`)
  }

  async obtenerNoAutorizado() {
    return this.request.get(`${this.baseUrl}/status/401`)
  }

  async crearTransferencia(payload: TransferPayload) {
    return this.request.post(`${this.baseUrl}/post`, { data: payload })
  }

  async esperarStatus(response: Awaited<ReturnType<APIRequestContext['get']>>, status: number) {
    await expect(response.status()).toBe(status)
  }
}
