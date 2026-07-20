import { watchEffect } from 'vue'

interface PageMeta {
  title: string
  description: string
  /** Path relative to the site root, e.g. '/' or '/projects/zonas-francas'. */
  path: string
}

const SITE_URL = 'https://zerockcrportafolio.com'

function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Keeps the tab title and the description/OG/Twitter meta tags in sync with
 * the current route. Note: this only affects the DOM after hydration — link
 * unfurlers (WhatsApp, LinkedIn, Slack…) fetch the raw index.html and don't
 * run JS, so a shared /projects/:slug link still shows the site-wide OG
 * tags baked into index.html, not the per-project ones set here.
 */
export function usePageMeta(getMeta: () => PageMeta) {
  watchEffect(() => {
    const meta = getMeta()
    const url = `${SITE_URL}${meta.path}`

    document.title = meta.title

    setMetaTag('name', 'description', meta.description)
    setMetaTag('property', 'og:title', meta.title)
    setMetaTag('property', 'og:description', meta.description)
    setMetaTag('property', 'og:url', url)
    setMetaTag('name', 'twitter:title', meta.title)
    setMetaTag('name', 'twitter:description', meta.description)
    setCanonical(url)
  })
}
