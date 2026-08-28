'use client'

// ── Генерация / получение persistent user_id ─────────────────────
function getUserId(): string {
  if (typeof window === 'undefined') return 'ssr'
  let uid = localStorage.getItem('_uid')
  if (!uid) {
    uid = 'usr_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
    localStorage.setItem('_uid', uid)
  }
  return uid
}

// ── Session ID (сбрасывается при закрытии вкладки) ───────────────
function getSessionId(): string {
  if (typeof window === 'undefined') return 'ssr'
  let sid = sessionStorage.getItem('_sid')
  if (!sid) {
    sid = 'ses_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
    sessionStorage.setItem('_sid', sid)
  }
  return sid
}

// ── Основная функция трекинга ─────────────────────────────────────
export function track(
  event: string,
  payload?: Record<string, unknown>,
) {
  try {
    // Не трекаем на localhost — только на продакшне
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') return

    const data = {
      user_id:    getUserId(),
      session_id: getSessionId(),
      event,
      page:       window.location.pathname,
      referrer:   document.referrer || '',
      payload:    payload || {},
    }

    // Fire-and-forget — не блокируем UI
    fetch('/api/track', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(data),
    }).catch(() => {/* тихо игнорируем ошибки трекинга */})
  } catch {
    // Никогда не ломаем UI из-за трекинга
  }
}
