import type { Sidebar } from "./types";
import { exampleItems } from "./example-items";

export const sidebar: Sidebar = [
  {
    text: 'Introduction',
    items: [
      { text: 'Installation', link: '/introduction/installation' },
      { text: 'Why tronz', link: '/introduction/why-tronz' },
      { text: 'Getting Started', link: '/introduction/getting-started' },
    ],
  },
  {
    text: 'Primitives',
    items: [
      { text: 'Introduction', link: '/primitives/introduction' },
      { text: 'Addresses', link: '/primitives/address' },
      { text: 'TRX and sun', link: '/primitives/trx-and-sun' },
      { text: 'Resource codes', link: '/primitives/resource-codes' },
    ],
  },
  {
    text: 'Signers',
    items: [
      { text: 'Introduction', link: '/signers/introduction' },
      { text: 'Local signer', link: '/signers/local-signer' },
    ],
  },
  {
    text: 'Providers',
    items: [
      { text: 'Introduction', link: '/providers/introduction' },
      { text: 'Provider builder', link: '/providers/provider-builder' },
      { text: 'gRPC transport', link: '/providers/grpc-transport' },
      { text: 'Fillers', link: '/providers/fillers' },
      { text: 'Reading chain state', link: '/providers/queries' },
    ],
  },
  {
    text: 'Transactions',
    items: [
      { text: 'Introduction', link: '/transactions/introduction' },
      { text: 'Transaction lifecycle', link: '/transactions/lifecycle' },
      { text: 'Transferring TRX', link: '/transactions/transfer-trx' },
      { text: 'Staking (Stake 2.0)', link: '/transactions/staking' },
    ],
  },
  {
    text: 'Contracts',
    items: [
      { text: 'Introduction', link: '/contracts/introduction' },
      { text: 'tron_sol! bindings', link: '/contracts/tron-sol' },
      { text: 'TRC20 tokens', link: '/contracts/trc20' },
      { text: 'TRC721 tokens', link: '/contracts/trc721' },
    ],
  },
  {
    text: 'Examples',
    items: exampleItems,
  },
];
