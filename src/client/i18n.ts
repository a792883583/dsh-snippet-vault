/**
 * dsh-snippet-vault 多语言字典。
 */
import { useSyncExternalStore } from 'react'

export type Lang = 'zh' | 'en' | 'es'
type Dict = Record<string, string>

const DICTS: Record<Lang, Dict> = {
  zh: {
    'vault.title': '提示词库',
    'vault.open': '常用提示词与指令库',
    'vault.search': '搜索提示词…',
    'vault.add': '新建提示词',
    'vault.empty': '暂无提示词，点击上方新建',
    'vault.edit': '编辑',
    'vault.delete': '删除',
    'vault.copy': '复制',
    'vault.insert': '插入到输入框',
    'vault.copied': '已复制',
    'vault.inserted': '已插入输入框',
    'form.title': '标题',
    'form.title.ph': '如：极简代码重构',
    'form.category': '分类',
    'form.category.ph': '如：开发 / 审查 / 写作',
    'form.content': '提示词内容',
    'form.content.ph': '输入 Prompt 内容，支持 {{selected}} 占位符',
    'form.save': '保存',
    'form.cancel': '取消',
  },
  en: {
    'vault.title': 'Snippet Vault',
    'vault.open': 'Prompt & Instruction Vault',
    'vault.search': 'Search snippets…',
    'vault.add': 'New Snippet',
    'vault.empty': 'No snippets yet, click above to create one',
    'vault.edit': 'Edit',
    'vault.delete': 'Delete',
    'vault.copy': 'Copy',
    'vault.insert': 'Insert into composer',
    'vault.copied': 'Copied',
    'vault.inserted': 'Inserted',
    'form.title': 'Title',
    'form.title.ph': 'e.g., Concise Code Refactor',
    'form.category': 'Category',
    'form.category.ph': 'e.g., Dev / Review / Writing',
    'form.content': 'Prompt Content',
    'form.content.ph': 'Enter prompt text, supports {{selected}} placeholder',
    'form.save': 'Save',
    'form.cancel': 'Cancel',
  },
  es: {
    'vault.title': 'Bóveda de Prompts',
    'vault.open': 'Bóveda de Prompts e Instrucciones',
    'vault.search': 'Buscar prompts…',
    'vault.add': 'Nuevo Prompt',
    'vault.empty': 'No hay prompts, haz clic arriba para crear uno',
    'vault.edit': 'Editar',
    'vault.delete': 'Eliminar',
    'vault.copy': 'Copiar',
    'vault.insert': 'Insertar en entrada',
    'vault.copied': 'Copiado',
    'vault.inserted': 'Insertado',
    'form.title': 'Título',
    'form.title.ph': 'p. ej. Refactorización concisa',
    'form.category': 'Categoría',
    'form.category.ph': 'p. ej. Desarrollo / Revisión',
    'form.content': 'Contenido del Prompt',
    'form.content.ph': 'Texto del prompt, admite {{selected}}',
    'form.save': 'Guardar',
    'form.cancel': 'Cancelar',
  },
}

interface LocaleService {
  getLocale(): { active: string }
  subscribe(fn: () => void): () => void
}

let locale: LocaleService | null = null
let lang: Lang = 'zh'
let revision = 0
const listeners = new Set<() => void>()

function notify(): void {
  revision += 1
  for (const fn of listeners) fn()
}

function detectLang(): Lang {
  const active = locale?.getLocale().active
  if (active === 'zh') return 'zh'
  const nav = (navigator.language || '').toLowerCase()
  if (nav.startsWith('es')) return 'es'
  if (active === 'en') return 'en'
  if (nav.startsWith('zh')) return 'zh'
  return 'zh'
}

export function initI18n(service: LocaleService): void {
  if (locale === service) return
  locale = service
  lang = detectLang()
  service.subscribe(() => {
    const next = detectLang()
    if (next !== lang) {
      lang = next
      notify()
    }
  })
}

export function t(key: string): string {
  return DICTS[lang][key] ?? DICTS.zh[key] ?? key
}

export function useT(): (key: string) => string {
  useSyncExternalStore((fn) => { listeners.add(fn); return () => listeners.delete(fn) }, () => revision)
  return t
}
