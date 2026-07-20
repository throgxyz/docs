import { defineConfig } from 'vocs/config'
import { sidebar } from './sidebar'

export default defineConfig({
  basePath: '/docs/tronz',
  title: 'tronz',
  description:
    'An idiomatic, async-first Rust SDK for the TRON network, inspired by alloy.',
  logoUrl: '/docs/tronz/tronz-logo.png',
  renderStrategy: 'full-static',
  srcDir: 'docs',
  sidebar,
  iconUrl: { light: '/docs/tronz/favicon.png', dark: '/docs/tronz/favicon.png' },
  socials: [
    { icon: 'github', link: 'https://github.com/throgxyz/tronz' },
  ],
  topNav: [
    { text: 'Docs', link: '/introduction/getting-started' },
    { text: 'Examples', link: '/examples/queries/README' },
    { text: 'docs.rs', link: 'https://docs.rs/tronz/latest/tronz/' },
    {
      text: '0.4.0',
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
    link: 'https://github.com/throgxyz/docs/edit/main/vocs/docs/pages/:path',
    text: 'Suggest changes on GitHub',
  },
})
