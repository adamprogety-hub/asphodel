'use client'
import { useRef, useEffect, useState, CSSProperties } from 'react'
import IMask from 'imask'

interface ContactInputProps {
  value: string
  onChange: (val: string) => void
  style?: CSSProperties
  className?: string
  required?: boolean
  id?: string
}

// ── Определяем тип по первому символу ────────────────────────────────
function detectType(val: string): 'phone' | 'telegram' | 'email' | 'unknown' {
  const v = val.trim()
  if (!v) return 'unknown'
  if (v.startsWith('@')) return 'telegram'
  if (v.includes('@') && !v.startsWith('@')) return 'email'
  if (/^[+78\d]/.test(v)) return 'phone'
  // Если начинается с латинской буквы без @ — считаем телеграмом
  if (/^[a-zA-Z]/.test(v)) return 'telegram'
  return 'unknown'
}

// ── Санитайзер Telegram: только латиница + цифры + _ после @ ─────────
function sanitizeTelegram(raw: string): string {
  const withoutAt = raw.startsWith('@') ? raw.slice(1) : raw
  // Только латинские буквы, цифры и подчёркивание
  const clean = withoutAt.replace(/[^a-zA-Z0-9_]/g, '')
  // Первый символ должен быть буквой
  const firstOk = clean.replace(/^[^a-zA-Z]+/, '')
  // Максимум 31 символ после @
  const trimmed = firstOk.slice(0, 31)
  return trimmed ? `@${trimmed}` : '@'
}

const PHONE_MASK = '+{7} (000) 000-00-00'

export default function ContactInput({
  value, onChange, style, className, required, id,
}: ContactInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const maskRef  = useRef<any>(null)
  const [type, setType] = useState<'phone' | 'telegram' | 'email' | 'unknown'>('unknown')

  // ── Инициализируем / убираем маску в зависимости от типа ─────────
  useEffect(() => {
    const el = inputRef.current
    if (!el) return

    if (type === 'phone') {
      maskRef.current = IMask(el, { mask: PHONE_MASK, lazy: false })
      maskRef.current.on('accept', () => {
        const unmasked = maskRef.current?.unmaskedValue ?? ''
        if (!unmasked) {
          // Пользователь стёр всё — сбрасываем маску и даём начать заново
          maskRef.current?.destroy()
          maskRef.current = null
          if (inputRef.current) inputRef.current.value = ''
          setType('unknown')
          onChange('')
        } else {
          onChange(maskRef.current!.value)
        }
      })
    } else {
      if (maskRef.current) { maskRef.current.destroy(); maskRef.current = null }
    }

    return () => {
      if (maskRef.current) { maskRef.current.destroy(); maskRef.current = null }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])

  // ── Синхронизируем значение снаружи (сброс формы) ────────────────
  useEffect(() => {
    if (type !== 'phone' && inputRef.current && inputRef.current.value !== value) {
      inputRef.current.value = value
    }
  }, [value, type])

  // ── Обработка ввода ───────────────────────────────────────────────
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    const newType = detectType(raw)
    if (newType !== type) setType(newType)

    if (newType === 'telegram') {
      const sanitized = sanitizeTelegram(raw)
      if (inputRef.current) inputRef.current.value = sanitized
      onChange(sanitized)
      return
    }

    if (newType !== 'phone') onChange(raw)
    // для phone — onChange вызывается через imask accept
  }

  // ── Блокируем кириллицу на keydown ВСЕГДА ────────────────────────
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Кириллица запрещена в любом контактном поле
    if (e.key.length === 1 && /[\u0400-\u04FF]/.test(e.key)) {
      e.preventDefault()
    }
  }

  // ── Placeholder ───────────────────────────────────────────────────
  const placeholder =
    type === 'phone'    ? '+7 (___) ___-__-__' :
    type === 'telegram' ? '@username' :
    type === 'email'    ? 'email@example.com' :
    '+7 или @username'

  return (
    <input
      ref={inputRef}
      id={id}
      type="text"
      inputMode={type === 'phone' ? 'tel' : 'text'}
      placeholder={placeholder}
      required={required}
      defaultValue={value}
      onChange={handleInput}
      onKeyDown={handleKeyDown}
      style={style}
      className={className}
      autoComplete="off"
    />
  )
}
