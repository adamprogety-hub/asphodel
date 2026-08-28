import { NextRequest, NextResponse } from 'next/server'

const WEBHOOK_URL = process.env.SHEETS_WEBHOOK_URL
const SECRET      = process.env.SHEETS_SECRET || 'vrasphodel2025'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { user_id, session_id, event, page, payload, referrer } = body

    if (!event) {
      return NextResponse.json({ ok: false, error: 'event required' }, { status: 400 })
    }

    if (!WEBHOOK_URL) {
      // В dev-режиме просто логируем
      console.log('[track]', { event, user_id, page, payload })
      return NextResponse.json({ ok: true, dev: true })
    }

    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret:     SECRET,
        user_id:    user_id    || 'anon',
        session_id: session_id || '',
        event,
        timestamp:  new Date().toISOString(),
        page:       page       || '/',
        payload:    payload    || {},
        referrer:   referrer   || '',
      }),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[track API] error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
