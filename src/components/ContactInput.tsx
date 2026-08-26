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
  if (v.includes('@') && !v.startsWith('+') && !/^\d/.test(v.charAt(0)) === false) return 'email'
  if (v.includes('@')) return 'email'
  if (/^[+78\d]/.test(v)) return 'phone'
  return 'unknown'
}

const PHONE_MASK = '+{7} (000) 000-00-00'

export default function ContactInput({
  value, onChange, style, className, required, id,
}: ContactInputProps) {
  const inputRef  = useRef<HTMLInputElement>(null)
  const maskRef   = useRef<IMask.InputMask<IMask.MaskedPatternOptions> | null>(null)
  const [type, setType] = useState<'phone' | 'telegram' | 'email' | 'unknown'>('unknown')

  // ── Инициализируем / убираем маску в зависимости от типа ─────────
  useEffect(() => {
    const el = inputRef.current
    if (!el) return

    if (type === 'phone') {
      // Применяем маску телефона
      maskRef.current = IMask(el, {
        mask: PHONE_MASK,
        lazy: false, // показывает шаблон сразу
      })
      maskRef.current.on('accept', () => {
        onChange(maskRef.current!.value)
      })
    } else {
      // Убираем маску для Telegram / email / пустого
      if (maskRef.current) {
        maskRef.current.destroy()
        maskRef.current = null
      }
    }

    return () => {
      if (maskRef.current) {
        maskRef.current.destroy()
        maskRef.current = null
      }
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

    if (newType !== type) {
      setType(newType)
    }

    if (newType !== 'phone') {
      onChange(raw)
    }
    // для phone — onChange вызывается через imask accept
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
      style={style}
      className={className}
      autoComplete="off"
    />
  )
}
