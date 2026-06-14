// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages } from 'waku/router'

// prettier-ignore
type Page =
  | { path: '/contracts/introduction'; render: 'static' }
  | { path: '/contracts/trc20'; render: 'static' }
  | { path: '/examples/query'; render: 'static' }
  | { path: '/examples/stake'; render: 'static' }
  | { path: '/examples/transfer_trx'; render: 'static' }
  | { path: '/examples/trc20'; render: 'static' }
  | { path: '/'; render: 'static' }
  | { path: '/introduction/getting-started'; render: 'static' }
  | { path: '/introduction/installation'; render: 'static' }
  | { path: '/introduction/why-tronz'; render: 'static' }
  | { path: '/primitives/address'; render: 'static' }
  | { path: '/primitives/introduction'; render: 'static' }
  | { path: '/primitives/resource-codes'; render: 'static' }
  | { path: '/primitives/trx-and-sun'; render: 'static' }
  | { path: '/providers/fillers'; render: 'static' }
  | { path: '/providers/grpc-transport'; render: 'static' }
  | { path: '/providers/introduction'; render: 'static' }
  | { path: '/providers/provider-builder'; render: 'static' }
  | { path: '/providers/queries'; render: 'static' }
  | { path: '/signers/introduction'; render: 'static' }
  | { path: '/signers/local-signer'; render: 'static' }
  | { path: '/transactions/introduction'; render: 'static' }
  | { path: '/transactions/lifecycle'; render: 'static' }
  | { path: '/transactions/staking'; render: 'static' }
  | { path: '/transactions/transfer-trx'; render: 'static' }

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>
  }
  interface CreatePagesConfig {
    pages: Page
  }
}
