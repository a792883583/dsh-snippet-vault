/**
 * dsh-snippet-vault — 宿主侧声明。
 * @module dsh-snippet-vault
 */

import type { Context } from '@deepseek-ai/cordis'

export const name = 'dsh-snippet-vault'

export const inject: string[] = []

export function apply(_ctx: Context): void {
  // 纯客户端 UI 插件，宿主侧占位
}

export default { name, apply, inject }
