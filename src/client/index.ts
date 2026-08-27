/**
 * dsh-snippet-vault 浏览器客户端入口。
 */
import { createElement, useState, useCallback } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { initI18n, useT } from './i18n.ts'
import { VaultPage } from './VaultPage.tsx'

interface ClientContext {
  effect(fn: () => (() => void) | void, name: string): void
  locale: {
    getLocale(): { active: string }
    subscribe(fn: () => void): () => void
  }
}

export const inject = ['locale']

const BUTTON_STYLE = `
.dsh-sv-open { display:flex; align-items:center; gap:8px; width:100%; padding:8px 12px;
  border:none; background:transparent; color:inherit; cursor:pointer;
  font-size:12px; font-weight:500; border-radius:8px; box-sizing:border-box; }
.dsh-sv-open:hover { background:rgba(128,128,128,0.1); }
.dsh-sv-open .icon { font-size:14px; display:flex; align-items:center; }
.dsh-sv-open .label { flex:1; font-weight:500; }
`

const NEW_SESSION_SELECTOR = '[class*="newSession"]'

let styleInjected = false
function ensureButtonStyle(): void {
  if (styleInjected) return
  styleInjected = true
  const tag = document.createElement('style')
  tag.dataset.plugin = 'dsh-snippet-vault-btn'
  tag.textContent = BUTTON_STYLE
  document.head.appendChild(tag)
}

function VaultApp(): React.ReactElement {
  const t = useT()
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  ensureButtonStyle()

  return createElement(
    'div',
    null,
    createElement(
      'button',
      { type: 'button', className: 'dsh-sv-open', title: t('vault.open'), onClick: () => setOpen(true) },
      createElement('span', { className: 'icon' }, '💡'),
      createElement('span', { className: 'label' }, t('vault.title')),
    ),
    open ? createElement(VaultPage, { onClose: close }) : null,
  )
}

export function apply(ctx: ClientContext): void {
  try {
    initI18n(ctx.locale)
  } catch (e) {
    console.error('dsh-snippet-vault: i18n init error', e)
  }

  ctx.effect(() => {
    const host = document.createElement('div')
    host.dataset.vaultHost = ''
    const root: Root = createRoot(host)
    let disposed = false

    const render = (): void => {
      if (disposed) return
      root.render(createElement(VaultApp, null))
    }

    let raf = 0
    let polling = true
    const poll = (): void => {
      if (disposed || !polling) return
      if (!host.isConnected) {
        const btn = document.querySelector<HTMLElement>(NEW_SESSION_SELECTOR)
        if (btn !== null && btn.parentElement !== null) {
          btn.parentElement.appendChild(host)
          render()
          polling = false
          return
        }
      } else {
        polling = false
        return
      }
      raf = requestAnimationFrame(poll)
    }
    raf = requestAnimationFrame(poll)

    const fallback = window.setInterval(() => {
      if (disposed) return
      if (!host.isConnected) {
        const btn = document.querySelector<HTMLElement>(NEW_SESSION_SELECTOR)
        if (btn !== null && btn.parentElement !== null) {
          btn.parentElement.appendChild(host)
          render()
        }
      }
    }, 2000)

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      clearInterval(fallback)
      try { root.unmount() } catch {}
      host.remove()
    }
  }, 'dsh-snippet-vault: mount')
}

export default { apply, inject }
