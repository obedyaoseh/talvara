export const SITE_URL = 'https://talvara.io'
export const SHARE_IMAGE = `${SITE_URL}/og-image.png`

export const pageMeta = {
  '/': {
    title: 'Talvara | Pre-assessed SDRs for B2B startups',
    description:
      'Managed SDRs deployed in 7 days, outbound live by day 12. Start with a 90-day pilot.',
  },
  '/how-it-works': {
    title: 'How Talvara works | Five steps to live pipeline',
    description:
      'From open application to live client portal: the five steps behind every Talvara SDR.',
  },
  '/pricing': {
    title: 'Talvara pricing | Four offers, from a 90-day pilot',
    description:
      'Direct hire, managed SDR, managed pod or a 90-day pilot. Prices and what each includes.',
  },
  '/about': {
    title: 'About Talvara | The team behind the platform',
    description: 'Meet the founders, the advisor and the assessed SDRs.',
  },
  '/contact': {
    title: 'Contact Talvara | Book a discovery call',
    description: 'Tell us your outbound problem. A person replies within 24 hours.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Talvara',
    description:
      'How Talvara collects, uses, shares and protects personal information from visitors, prospects and clients.',
  },
  '/terms-of-service': {
    title: 'Terms of Service | Talvara',
    description:
      'The terms that govern use of the Talvara website and pre-contract interactions with Talvara.',
  },
}

export const notFoundMeta = {
  title: 'Page not found | Talvara',
  description: 'This page does not exist. Head back to the Talvara homepage.',
}

export const routes = Object.keys(pageMeta)

export function normalisePath(pathname) {
  if (!pathname || pathname === '/') return '/'
  return pathname.replace(/\/+$/, '') || '/'
}

export function getPageMeta(pathname) {
  return pageMeta[normalisePath(pathname)] ?? notFoundMeta
}
