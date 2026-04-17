export const e2eUsers = {
  valid: {
    username: 'standard_user',
    password: 'secret_sauce'
  },
  invalidUser: {
    username: 'usuario_inexistente',
    password: 'secret_sauce'
  },
  invalidPassword: {
    username: 'standard_user',
    password: 'wrong_password'
  },
  lockedOut: {
    username: 'locked_out_user',
    password: 'secret_sauce'
  }
}

export const transferPayload = {
  fromAccount: 'CHK-001',
  toAccount: 'SAV-999',
  amount: 1250.75,
  currency: 'USD',
  description: 'Pago de servicios'
}

export const transferenciasInvalidas = [
  {
    caso: 'monto en cero',
    payload: {
      fromAccount: 'CHK-001',
      toAccount: 'SAV-999',
      amount: 0,
      currency: 'USD',
      description: 'Transferencia invalida por monto'
    }
  },
  {
    caso: 'cuenta destino invalida',
    payload: {
      fromAccount: 'CHK-001',
      toAccount: 'S1',
      amount: 150,
      currency: 'ARS',
      description: 'Transferencia invalida por cuenta destino'
    }
  }
] as const
