import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// ── Транспорт Яндекс SMTP ──────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST   || 'smtp.yandex.ru',
  port:   Number(process.env.SMTP_PORT || 465),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// ── Маппинг источника → PDF-файл ──────────────────────────────────
const downloadMap: Record<string, string> = {
  'lead-ads':   '/downloads/checklist-ads.pdf',
  'lead-site':  '/downloads/checklist-site.pdf',
  'lead-brief': '/downloads/brief-template.pdf',
}

// ── Отправка в Telegram ────────────────────────────────────────────
async function sendTelegram(text: string) {
  const token  = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id:    chatId,
      text,
      parse_mode: 'HTML',
    }),
  })
}

// ── POST /api/contact ──────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, contact, message, source, website } = body

    // Honeypot — если поле website заполнено, это бот
    if (website) {
      return NextResponse.json({ ok: true }) // молча игнорируем
    }

    // Проверка обязательных полей
    if (!name || !contact) {
      return NextResponse.json({ ok: false, error: 'Заполните имя и контакт' }, { status: 400 })
    }

    const from = process.env.SMTP_USER
    const to   = process.env.NOTIFY_EMAIL

    // Тема письма зависит от источника формы
    const subjectMap: Record<string, string> = {
      'contact-form':   '📬 Новая заявка с сайта',
      'contact-modal':  '💬 Новый запрос через модальное окно',
      'lead-ads':       '📋 Запрос чек-листа "Реклама"',
      'lead-site':      '📋 Запрос чек-листа "Сайт"',
      'lead-brief':     '📋 Запрос шаблона брифа',
      'ai-chat':        '🤖 Контакт в чате с Асей',
    }
    const subject = subjectMap[source] || '📬 Новая заявка с сайта'

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 12px;">
        <h2 style="margin: 0 0 20px; color: #111; font-size: 20px;">${subject}</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #888; font-size: 13px; width: 120px; vertical-align: top;">Имя</td>
            <td style="padding: 10px 0; color: #111; font-size: 14px; font-weight: 600;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #888; font-size: 13px; vertical-align: top;">Контакт</td>
            <td style="padding: 10px 0; color: #111; font-size: 14px; font-weight: 600;">${contact}</td>
          </tr>
          ${message ? `
          <tr>
            <td style="padding: 10px 0; color: #888; font-size: 13px; vertical-align: top;">Сообщение</td>
            <td style="padding: 10px 0; color: #111; font-size: 14px; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 10px 0; color: #888; font-size: 13px; vertical-align: top;">Источник</td>
            <td style="padding: 10px 0; color: #555; font-size: 13px;">${source || 'сайт'}</td>
          </tr>
        </table>
        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #eee; color: #bbb; font-size: 11px;">
          VR Asphodel · Автоматическое уведомление
        </div>
      </div>
    `

    // ── Telegram уведомление ─────────────────────────────────────
    const emojiMap: Record<string, string> = {
      'contact-form':  '📬',
      'contact-modal': '💬',
      'lead-ads':      '📋',
      'lead-site':     '📋',
      'lead-brief':    '📋',
      'ai-chat':       '🤖',
    }
    const emoji = emojiMap[source] || '📬'

    const tgText = [
      `${emoji} <b>${subject}</b>`,
      ``,
      `👤 <b>Имя:</b> ${name}`,
      `📱 <b>Контакт:</b> ${contact}`,
      message ? `💬 <b>Сообщение:</b>\n${message}` : null,
      ``,
      `🔗 <b>Источник:</b> ${source || 'сайт'}`,
    ].filter(Boolean).join('\n')

    // Отправляем параллельно — email + Telegram
    await Promise.allSettled([
      transporter.sendMail({ from, to, subject, html }),
      sendTelegram(tgText),
    ])

    const downloadUrl = downloadMap[source] || null
    return NextResponse.json({ ok: true, downloadUrl })
  } catch (err) {
    console.error('[contact API] error:', err)
    return NextResponse.json({ ok: false, error: 'Ошибка отправки' }, { status: 500 })
  }
}
