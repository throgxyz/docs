import { defineConfig } from 'vocs/config'
import { sidebar } from './sidebar'

export default defineConfig({
  title: 'tronz',
  description:
    'An idiomatic, async-first Rust SDK for the TRON network, inspired by alloy.',
  logoUrl: '/tronz-logo.png',
  renderStrategy: 'full-static',
  srcDir: 'docs',
  sidebar,
  iconUrl: { light: '/favicon.png', dark: '/favicon.png' },
  socials: [
    { icon: 'github', link: 'https://github.com/deszhou/tronz' },
  ],
  topNav: [
    { text: 'Docs', link: '/introduction/getting-started' },
    { text: 'Examples', link: '/examples/transfer_trx' },
    { text: 'docs.rs', link: 'https://docs.rs/tronz/latest/tronz/' },
    {
      text: '0.1.0',
      items: [
        {
          text: 'Changelog',
          link: 'https://github.com/deszhou/tronz/blob/main/CHANGELOG.md',
        },
        {
          text: 'Contributing',
          link: 'https://github.com/deszhou/tronz/blob/main/CONTRIBUTING.md',
        },
      ],
    },
  ],
  editLink: {
    link: 'https://github.com/deszhou/tronz/edit/main/docs/vocs/docs/pages/:path',
    text: 'Suggest changes on GitHub',
  },
})
