// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages } from 'waku/router'

// prettier-ignore
type Page =
  | { path: '/contracts/introduction'; render: 'static' }
  | { path: '/contracts/trc20'; render: 'static' }
  | { path: '/examples/accounts/README'; render: 'static' }
  | { path: '/examples/accounts/account_create'; render: 'static' }
  | { path: '/examples/accounts/account_permissions'; render: 'static' }
  | { path: '/examples/accounts/account_update'; render: 'static' }
  | { path: '/examples/contracts/README'; render: 'static' }
  | { path: '/examples/contracts/contract_call'; render: 'static' }
  | { path: '/examples/contracts/contract_deploy'; render: 'static' }
  | { path: '/examples/contracts/contract_dynamic_abi'; render: 'static' }
  | { path: '/examples/contracts/contract_estimate_energy'; render: 'static' }
  | { path: '/examples/contracts/contract_revert'; render: 'static' }
  | { path: '/examples/contracts/contract_send'; render: 'static' }
  | { path: '/examples/contracts/decode_log'; render: 'static' }
  | { path: '/examples/contracts/decode_receipt'; render: 'static' }
  | { path: '/examples/queries/README'; render: 'static' }
  | { path: '/examples/queries/address_formats'; render: 'static' }
  | { path: '/examples/queries/amount_math'; render: 'static' }
  | { path: '/examples/queries/connect_custom'; render: 'static' }
  | { path: '/examples/queries/governance_list'; render: 'static' }
  | { path: '/examples/queries/list_witnesses'; render: 'static' }
  | { path: '/examples/queries/query'; render: 'static' }
  | { path: '/examples/signers/README'; render: 'static' }
  | { path: '/examples/signers/signer_generate'; render: 'static' }
  | { path: '/examples/signers/signer_keystore'; render: 'static' }
  | { path: '/examples/signers/signer_local'; render: 'static' }
  | { path: '/examples/signers/signer_mnemonic'; render: 'static' }
  | { path: '/examples/staking/README'; render: 'static' }
  | { path: '/examples/staking/cancel_unfreeze'; render: 'static' }
  | { path: '/examples/staking/claim_rewards'; render: 'static' }
  | { path: '/examples/staking/delegate'; render: 'static' }
  | { path: '/examples/staking/stake'; render: 'static' }
  | { path: '/examples/staking/stake_bandwidth'; render: 'static' }
  | { path: '/examples/staking/stake_v1'; render: 'static' }
  | { path: '/examples/staking/undelegate'; render: 'static' }
  | { path: '/examples/staking/unfreeze'; render: 'static' }
  | { path: '/examples/staking/vote_witness'; render: 'static' }
  | { path: '/examples/staking/withdraw_unfreeze'; render: 'static' }
  | { path: '/examples/transfers/README'; render: 'static' }
  | { path: '/examples/transfers/transfer_trx'; render: 'static' }
  | { path: '/examples/transfers/transfer_trx_memo'; render: 'static' }
  | { path: '/examples/trc10/README'; render: 'static' }
  | { path: '/examples/trc10/trc10_balance'; render: 'static' }
  | { path: '/examples/trc10/trc10_by_name'; render: 'static' }
  | { path: '/examples/trc10/trc10_issue'; render: 'static' }
  | { path: '/examples/trc10/trc10_query'; render: 'static' }
  | { path: '/examples/trc10/trc10_transfer'; render: 'static' }
  | { path: '/examples/trc20/README'; render: 'static' }
  | { path: '/examples/trc20/trc20'; render: 'static' }
  | { path: '/examples/trc20/trc20_approve'; render: 'static' }
  | { path: '/examples/trc20/trc20_decode_transfer_event'; render: 'static' }
  | { path: '/examples/trc20/trc20_transfer_from'; render: 'static' }
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
  | { path: '/templates/accounts/README'; render: 'static' }
  | { path: '/templates/contracts/README'; render: 'static' }
  | { path: '/templates/queries/README'; render: 'static' }
  | { path: '/templates/signers/README'; render: 'static' }
  | { path: '/templates/staking/README'; render: 'static' }
  | { path: '/templates/transfers/README'; render: 'static' }
  | { path: '/templates/trc10/README'; render: 'static' }
  | { path: '/templates/trc20/README'; render: 'static' }
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
