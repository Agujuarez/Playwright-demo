export type TransferPayload = {
  fromAccount: string
  toAccount: string
  amount: number
  currency: 'USD' | 'ARS'
  description: string
}

type HttpBinTransferResponse = {
  json: TransferPayload
}

export function assertTransferContract(body: unknown): asserts body is HttpBinTransferResponse {
  if (!body || typeof body !== 'object') {
    throw new Error('Respuesta invalida: el body no es un objeto')
  }

  const candidate = body as Partial<HttpBinTransferResponse>
  if (!candidate.json || typeof candidate.json !== 'object') {
    throw new Error('Contrato invalido: falta el nodo json')
  }

  const payload = candidate.json as Partial<TransferPayload>
  if (typeof payload.fromAccount !== 'string' || payload.fromAccount.length < 5) {
    throw new Error('Contrato invalido: fromAccount no cumple formato')
  }
  if (typeof payload.toAccount !== 'string' || payload.toAccount.length < 5) {
    throw new Error('Contrato invalido: toAccount no cumple formato')
  }
  if (typeof payload.amount !== 'number' || payload.amount <= 0) {
    throw new Error('Contrato invalido: amount debe ser mayor a cero')
  }
  if (payload.currency !== 'USD' && payload.currency !== 'ARS') {
    throw new Error('Contrato invalido: currency no soportada')
  }
  if (typeof payload.description !== 'string' || payload.description.length < 4) {
    throw new Error('Contrato invalido: description invalida')
  }
}
