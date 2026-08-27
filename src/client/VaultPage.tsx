/**
 * dsh-snippet-vault 主页面组件。
 */
import { createElement, useState, useEffect, useMemo, useCallback } from 'react'
import { useT } from './i18n.ts'

export interface Snippet {
  id: string
  title: string
  category: string
  content: string
  createdAt: number
}

const DEFAULT_SNIPPETS: Snippet[] = [
  {
    id: 'code-refactor',
    title: '极简代码重构',
    category: '开发',
    content: '请用简洁、地道、模块化的风格重构以下代码，保留全部原有功能并提升可读性：\n\n```\n{{selected}}\n```',
    createdAt: 1,
  },
  {
    id: 'unit-test',
    title: '编写单元测试',
    category: '开发',
    content: '请为以下函数/模块编写完整的 Vitest 单元测试，覆盖核心路径与边界异常情况：\n\n```\n{{selected}}\n```',
    createdAt: 2,
  },
  {
    id: 'bug-analyze',
    title: '报错原因分析与修复',
    category: '排错',
    content: '分析以下报错堆栈与相关代码，给出具体的根本原因解释并提供修复方案：\n\n报错信息：\n{{selected}}',
    createdAt: 3,
  },
]

const STYLE = `
.dsh-sv-overlay { position:fixed; inset:0; z-index:990; background:rgba(0,0,0,0.45); backdrop-filter:blur(2px);
  display:flex; align-items:center; justify-content:center; }
.dsh-sv-card { width:90%; max-width:680px; max-height:85vh; background:var(--gw-bg, #fff);
  border:1px solid var(--gw-border, rgba(128,128,128,0.25)); border-radius:12px;
  box-shadow:0 16px 48px rgba(0,0,0,0.25); display:flex; flex-direction:column; overflow:hidden;
  color:var(--gw-fg, #24292f); font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; }
[data-ds-dark-theme] .dsh-sv-card { background:#1f2328; color:#d1d9e0; border-color:rgba(255,255,255,0.15); }
.dsh-sv-head { display:flex; align-items:center; gap:8px; padding:12px 16px; border-bottom:1px solid var(--gw-border, rgba(128,128,128,0.2)); font-weight:600; font-size:14px; }
.dsh-sv-head .spacer { flex:1; }
.dsh-sv-close { border:none; background:transparent; color:inherit; opacity:0.6; cursor:pointer; padding:4px; border-radius:6px; }
.dsh-sv-close:hover { opacity:1; background:rgba(128,128,128,0.1); }
.dsh-sv-toolbar { display:flex; gap:8px; padding:10px 16px; border-bottom:1px solid var(--gw-border, rgba(128,128,128,0.15)); align-items:center; }
.dsh-sv-input { flex:1; padding:6px 10px; font-size:12.5px; border-radius:6px; border:1px solid var(--gw-border, rgba(128,128,128,0.25)); background:transparent; color:inherit; outline:none; }
.dsh-sv-input:focus { border-color:#1976d2; }
.dsh-sv-btn { border:1px solid var(--gw-border, rgba(128,128,128,0.25)); background:transparent; color:inherit; border-radius:6px; padding:5px 12px; font-size:12px; cursor:pointer; font-weight:500; display:flex; align-items:center; gap:4px; }
.dsh-sv-btn.primary { background:#1976d2; border-color:#1976d2; color:#fff; }
.dsh-sv-btn:hover { background:rgba(128,128,128,0.1); }
.dsh-sv-btn.primary:hover { background:#1565c0; }
.dsh-sv-body { flex:1; overflow-y:auto; padding:12px 16px; display:flex; flex-direction:column; gap:8px; }
.dsh-sv-item { border:1px solid var(--gw-border, rgba(128,128,128,0.2)); border-radius:8px; padding:10px 12px; display:flex; flex-direction:column; gap:6px; background:rgba(128,128,128,0.03); }
.dsh-sv-item-top { display:flex; align-items:center; gap:8px; }
.dsh-sv-item-title { font-weight:600; font-size:13px; flex:1; }
.dsh-sv-item-tag { font-size:10.5px; padding:1px 6px; border-radius:10px; background:rgba(25,118,210,0.12); color:#1976d2; font-weight:600; }
.dsh-sv-item-content { font-size:11.5px; opacity:0.8; white-space:pre-wrap; word-break:break-all; max-height:80px; overflow:hidden; text-overflow:ellipsis; font-family:ui-monospace,Menlo,monospace; }
.dsh-sv-item-acts { display:flex; gap:6px; justify-content:flex-end; margin-top:2px; }
.dsh-sv-item-acts .dsh-sv-btn { padding:2px 8px; font-size:11px; }
.dsh-sv-form { display:flex; flex-direction:column; gap:10px; padding:12px 16px; }
.dsh-sv-field { display:flex; flex-direction:column; gap:4px; }
.dsh-sv-field label { font-size:11px; opacity:0.75; font-weight:600; }
.dsh-sv-textarea { width:100%; min-height:120px; padding:8px 10px; font-size:12px; border-radius:6px; border:1px solid var(--gw-border, rgba(128,128,128,0.25)); background:transparent; color:inherit; outline:none; font-family:ui-monospace,Menlo,monospace; box-sizing:border-box; }
`

let styleInjected = false
function ensureStyle(): void {
  if (styleInjected) return
  styleInjected = true
  const tag = document.createElement('style')
  tag.textContent = STYLE
  document.head.appendChild(tag)
}

export function VaultPage(props: { onClose: () => void }): React.ReactElement {
  const { onClose } = props
  const t = useT()
  ensureStyle()

  const [snippets, setSnippets] = useState<Snippet[]>(() => {
    try {
      const raw = localStorage.getItem('dsh-snippet-vault.items')
      return raw ? (JSON.parse(raw) as Snippet[]) : DEFAULT_SNIPPETS
    } catch {
      return DEFAULT_SNIPPETS
    }
  })

  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState<Snippet | null>(null)
  const [formTitle, setFormTitle] = useState('')
  const [formCat, setFormCat] = useState('')
  const [formContent, setFormContent] = useState('')
  const [msg, setMsg] = useState('')

  const saveToStorage = (items: Snippet[]): void => {
    setSnippets(items)
    try {
      localStorage.setItem('dsh-snippet-vault.items', JSON.stringify(items))
    } catch {}
  }

  const showFeedback = (text: string): void => {
    setMsg(text)
    setTimeout(() => setMsg(''), 2000)
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return snippets
    return snippets.filter((s) => s.title.toLowerCase().includes(q) || s.category.toLowerCase().includes(q) || s.content.toLowerCase().includes(q))
  }, [snippets, query])

  const openForm = (target: Snippet | null): void => {
    setEditing(target)
    setFormTitle(target?.title ?? '')
    setFormCat(target?.category ?? '常用')
    setFormContent(target?.content ?? '')
  }

  const submitForm = (): void => {
    if (!formTitle.trim() || !formContent.trim()) return
    let next: Snippet[]
    if (editing && editing.id) {
      next = snippets.map((s) => (s.id === editing.id ? { ...s, title: formTitle.trim(), category: formCat.trim() || '常用', content: formContent.trim() } : s))
    } else {
      const item: Snippet = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        title: formTitle.trim(),
        category: formCat.trim() || '常用',
        content: formContent.trim(),
        createdAt: Date.now(),
      }
      next = [item, ...snippets]
    }
    saveToStorage(next)
    setEditing(null)
  }

  const remove = (id: string): void => {
    saveToStorage(snippets.filter((s) => s.id !== id))
  }

  const copySnippet = (content: string): void => {
    if (navigator?.clipboard?.writeText) {
      void navigator.clipboard.writeText(content).then(() => showFeedback(t('vault.copied')))
    }
  }

  const insertToComposer = (content: string): void => {
    // 探测 DSH 输入框并填入内容
    const composer = document.querySelector<HTMLTextAreaElement | HTMLDivElement>('[contenteditable="true"], textarea')
    if (composer) {
      if ('value' in composer) {
        composer.value = (composer.value ? composer.value + '\n' : '') + content
        composer.dispatchEvent(new Event('input', { bubbles: true }))
      } else {
        composer.textContent = (composer.textContent ? composer.textContent + '\n' : '') + content
        composer.dispatchEvent(new Event('input', { bubbles: true }))
      }
      showFeedback(t('vault.inserted'))
      setTimeout(onClose, 500)
    } else {
      copySnippet(content)
    }
  }

  return createElement(
    'div',
    { className: 'dsh-sv-overlay', onClick: onClose },
    createElement(
      'div',
      { className: 'dsh-sv-card', onClick: (e) => e.stopPropagation() },
      createElement(
        'div',
        { className: 'dsh-sv-head' },
        createElement('span', null, `💡 ${t('vault.title')}`),
        msg ? createElement('span', { style: { color: '#2ea043', fontSize: 12, marginLeft: 8 } }, msg) : null,
        createElement('span', { className: 'spacer' }),
        createElement('button', { type: 'button', className: 'dsh-sv-close', onClick: onClose }, '✕'),
      ),
      editing !== null
        ? createElement(
            'div',
            { className: 'dsh-sv-form' },
            createElement(
              'div',
              { className: 'dsh-sv-field' },
              createElement('label', null, t('form.title')),
              createElement('input', { className: 'dsh-sv-input', value: formTitle, placeholder: t('form.title.ph'), onChange: (e: any) => setFormTitle(e.target.value) }),
            ),
            createElement(
              'div',
              { className: 'dsh-sv-field' },
              createElement('label', null, t('form.category')),
              createElement('input', { className: 'dsh-sv-input', value: formCat, placeholder: t('form.category.ph'), onChange: (e: any) => setFormCat(e.target.value) }),
            ),
            createElement(
              'div',
              { className: 'dsh-sv-field' },
              createElement('label', null, t('form.content')),
              createElement('textarea', { className: 'dsh-sv-textarea', value: formContent, placeholder: t('form.content.ph'), onChange: (e: any) => setFormContent(e.target.value) }),
            ),
            createElement(
              'div',
              { style: { display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 } },
              createElement('button', { type: 'button', className: 'dsh-sv-btn primary', onClick: submitForm }, t('form.save')),
              createElement('button', { type: 'button', className: 'dsh-sv-btn', onClick: () => setEditing(null) }, t('form.cancel')),
            ),
          )
        : createElement(
            'div',
            null,
            createElement(
              'div',
              { className: 'dsh-sv-toolbar' },
              createElement('input', { className: 'dsh-sv-input', value: query, placeholder: t('vault.search'), onChange: (e: any) => setQuery(e.target.value) }),
              createElement('button', { type: 'button', className: 'dsh-sv-btn primary', onClick: () => openForm({} as any) }, `+ ${t('vault.add')}`),
            ),
            createElement(
              'div',
              { className: 'dsh-sv-body' },
              filtered.length === 0
                ? createElement('div', { style: { textAlign: 'center', opacity: 0.5, padding: 30, fontSize: 13 } }, t('vault.empty'))
                : filtered.map((s) =>
                    createElement(
                      'div',
                      { key: s.id, className: 'dsh-sv-item' },
                      createElement(
                        'div',
                        { className: 'dsh-sv-item-top' },
                        createElement('span', { className: 'dsh-sv-item-title' }, s.title),
                        createElement('span', { className: 'dsh-sv-item-tag' }, s.category),
                      ),
                      createElement('div', { className: 'dsh-sv-item-content' }, s.content),
                      createElement(
                        'div',
                        { className: 'dsh-sv-item-acts' },
                        createElement('button', { type: 'button', className: 'dsh-sv-btn primary', onClick: () => insertToComposer(s.content) }, t('vault.insert')),
                        createElement('button', { type: 'button', className: 'dsh-sv-btn', onClick: () => copySnippet(s.content) }, t('vault.copy')),
                        createElement('button', { type: 'button', className: 'dsh-sv-btn', onClick: () => openForm(s) }, t('vault.edit')),
                        createElement('button', { type: 'button', className: 'dsh-sv-btn', style: { color: '#cf222e' }, onClick: () => remove(s.id) }, t('vault.delete')),
                      ),
                    ),
                  ),
            ),
          ),
    ),
  )
}
