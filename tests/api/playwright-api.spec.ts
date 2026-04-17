import { expect, test } from '@playwright/test'
import { BankingApiClient } from '../../utils/apiClient'
import { assertTransferContract } from '../../utils/contracts'
import { transferPayload } from '../../utils/testData'

test.describe('API | Contexto request de Playwright', () => {
  test('positivo: endpoint de health devuelve 200', async ({ request }) => {
    const api = new BankingApiClient(request)
    const startedAt = Date.now()
    const response = await api.obtenerHealth()
    const elapsedMs = Date.now() - startedAt

    expect(response.status()).toBe(200)
    expect(elapsedMs).toBeLessThan(1500)
  })

  test('negativo: endpoint no autorizado devuelve 401', async ({ request }) => {
    const api = new BankingApiClient(request)
    const startedAt = Date.now()
    const response = await api.obtenerNoAutorizado()
    const elapsedMs = Date.now() - startedAt

    expect(response.status()).toBe(401)
    expect(elapsedMs).toBeLessThan(1500)
  })

  test('positivo: el payload de transferencia vuelve correctamente', async ({ request }) => {
    const api = new BankingApiClient(request)
    const startedAt = Date.now()
    const response = await api.crearTransferencia(transferPayload)
    const elapsedMs = Date.now() - startedAt

    await test.step('validar status http', async () => {
      expect(response.ok()).toBeTruthy()
      expect(response.status()).toBe(200)
      expect(elapsedMs).toBeLessThan(2000)
    })

    await test.step('validar headers y contrato de respuesta', async () => {
      expect(response.headers()['content-type']).toContain('application/json')

      const body: unknown = await response.json()
      assertTransferContract(body)

      expect(body.json.amount).toBe(transferPayload.amount)
      expect(body.json.currency).toBe('USD')
    })
  })
})
