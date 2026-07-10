import { defineConfig } from 'vocs/config'
import { sidebar } from './sidebar'

export default defineConfig({
  basePath: '/docs',
  title: 'tronz',
  description:
    'An idiomatic, async-first Rust SDK for the TRON network, inspired by alloy.',
  logoUrl: '/docs/tronz-logo.png',
  renderStrategy: 'full-static',
  srcDir: 'docs',
  sidebar,
  iconUrl: { light: '/docs/favicon.png', dark: '/docs/favicon.png' },
  socials: [
    { icon: 'github', link: 'https://github.com/throgxyz/tronz' },
  ],
  topNav: [
    { text: 'Docs', link: '/introduction/getting-started' },
    { text: 'Examples', link: '/examples/transfers/transfer_trx' },
    { text: 'docs.rs', link: 'https://docs.rs/tronz/latest/tronz/' },
    {
      text: '0.3.0',
      items: [
        {
          text: 'Changelog',
          link: 'https://github.com/throgxyz/tronz/blob/main/CHANGELOG.md',
        },
        {
          text: 'Contributing',
          link: 'https://github.com/throgxyz/tronz/blob/main/CONTRIBUTING.md',
        },
      ],
    },
  ],
  editLink: {
    link: 'https://github.com/throgxyz/tronz/edit/main/docs/vocs/docs/pages/:path',
    text: 'Suggest changes on GitHub',
  },
})
