# Playwright-demo

Portafolio técnico para entrevistas, inspirado en patrones QA enterprise del sector financiero, sin exponer código ni datos confidenciales.

## Qué muestra este repositorio

- Implementación de Page Object Model para automatización E2E (`pages/`)
- Sesión autenticada reutilizable con `storageState` (`tests/setup/auth.setup.ts`)
- Tests E2E con casos positivos y negativos (`tests/e2e/`)
- Tests de API simples con Playwright (`tests/api/playwright-api.spec.ts`)
- Tests de API de transferencias (`tests/api/api-transferencias.spec.ts`)
- Pipelines de CI para Pull Request y Stage (`.github/workflows/`)

## Estructura del proyecto

```text
.
├── pages/
├── tests/
│   ├── api/
│   ├── e2e/
│   │   ├── auth/
│   │   ├── carrito/
│   │   └── seguridad/
│   └── setup/
├── utils/
└── .github/workflows/
```

## Stack tecnológico

- Playwright (`@playwright/test`)
- TypeScript
- GitHub Actions

## Inicio rápido

```bash
npm install
npx playwright install
```

## Ejecutar tests en local

```bash
# Todos los tests
npm run test:ci

# Solo E2E
npm run test:e2e

# Solo API simples con Playwright
npm run test:api:pw
# Solo API de transferencias
npm run test:api:transferencias
```

## Escenarios incluidos

### E2E (UI)

- `auth/`: login positivo y negativo
- `carrito/`: flujo de compra básico con sesión autenticada
- `seguridad/`: rutas protegidas sin sesión, y sesión invalidada tras logout
- Positivo: login válido
- Negativo: login sin credenciales (click en login)
- Negativo: usuario inválido
- Negativo: contraseña inválida
- Negativo: usuario bloqueado
- Positivo: agregar producto al carrito y validar estado
- Seguridad: sin login no se accede a inventario, carrito ni checkout
- Seguridad: tras logout no se puede volver al inventario sin credenciales

### API simples con Playwright

- Positivo: status `200`
- Negativo: status `401`
- Positivo: validación de contrato de transferencia

### API de transferencias

- Positivo: contrato de transferencia válido
- Negativo: endpoint inexistente devuelve `404`
- Negativos de negocio: matriz de payloads inválidos con validación de contrato

## Prácticas de nivel semi-senior/senior incluidas

- Setup de autenticación centralizado por proyecto Playwright
- Separación de proyectos en config (`setup`, `e2e`, `api`)
- Cliente API reusable (`utils/apiClient.ts`) para evitar duplicación
- Validación de contrato con type guards (`utils/contracts.ts`)
- Escenarios negativos funcionales y de negocio, no solo de status code

## Pipelines de CI

- `pr.yml`: corre en Pull Request contra `main`
- `stage.yml`: corre en push a `stage` y manual (`workflow_dispatch`)