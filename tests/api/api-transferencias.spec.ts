import { expect, test } from '@playwright/test'
import { BankingApiClient } from '../../utils/apiClient'
import { assertTransferContract } from '../../utils/contracts'
import { transferenciasInvalidas, transferPayload } from '../../utils/testData'

test.describe('API | Transferencias', () => {
  test('positivo: contrato de transferencia valido', async ({ request }) => {
    const api = new BankingApiClient(request)
    const startedAt = Date.now()
    const response = await api.crearTransferencia(transferPayload)
    const elapsedMs = Date.now() - startedAt

    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toContain('application/json')
    expect(elapsedMs).toBeLessThan(2000)

    const body: unknown = await response.json()
    assertTransferContract(body)

    expect(body.json.fromAccount).toBe('CHK-001')
    expect(body.json.toAccount).toBe('SAV-999')
    expect(body.json.amount).toBe(1250.75)
    expect(body.json.currency).toBe('USD')
  })

  test('negativo: endpoint inexistente devuelve 404', async ({ request }) => {
    const startedAt = Date.now()
    const response = await request.get('https://httpbin.org/status/404')
    const elapsedMs = Date.now() - startedAt

    expect(response.status()).toBe(404)
    expect(elapsedMs).toBeLessThan(1500)
  })

  for (const escenario of transferenciasInvalidas) {
    test(`negativo de negocio: ${escenario.caso}`, async ({ request }) => {
      const api = new BankingApiClient(request)
      const startedAt = Date.now()
      const response = await api.crearTransferencia({
        ...escenario.payload
      })
      const elapsedMs = Date.now() - startedAt

      expect(response.status()).toBe(200)
      expect(response.headers()['content-type']).toContain('application/json')
      expect(elapsedMs).toBeLessThan(2000)
      const body: unknown = await response.json()

      expect(() => assertTransferContract(body)).toThrowError()
    })
  }
})
