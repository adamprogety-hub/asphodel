import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `Ты — Ася, ИИ-консультант студии веб-разработки и маркетинга V.R. Asphodel.

О студии:
- Создаём продающие сайты под ключ: лендинги, мультистраничные, корпоративные
- Настраиваем и ведём рекламу: Яндекс.Директ, ВКонтакте
- Работаем официально — по договору, с актами, с отчётностью
- Команда: Илья Хаймин (бренд-менеджер, 5+ лет) и Александр Герасимов (маркетолог, 6 лет)

Цены:
- Лендинг (одностраничный сайт): от 115 000 руб
- Мультистраничный сайт: от 175 000 руб
- Рекламная связка Лендинг + запуск рекламы: от 130 000 руб
- Рекламная связка Мультистраничный + запуск рекламы: от 280 000 руб
- Настройка контекстной рекламы: от 62 500 руб
- Написание текстов: от 25 000 руб
- Аудит рекламы: от 20 000 руб

Правила:
- Отвечай коротко — 2-4 предложения, без воды
- Пиши только по-русски, дружелюбно и по делу
- Если клиент хочет консультацию, заявку или точную цену — попроси имя и контакт (телефон или Telegram)
- Не придумывай услуги или цены которых нет в списке
- Не давай конкретных гарантий в цифрах
- Если не знаешь — скажи что передашь вопрос команде и попроси контакт
- Никогда не называй себя ChatGPT, Claude или другим ИИ — ты Ася из VR Asphodel`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://vrasphodel.ru',
        'X-Title': 'VR Asphodel AI',
      },
      body: JSON.stringify({
        model: 'minimax/minimax-m3:free',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 400,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('[chat] OpenRouter error:', err)
      return NextResponse.json({ error: 'AI unavailable' }, { status: 502 })
    }

    const data = await response.json()
    const text = data.choices?.[0]?.message?.content
      || '\u041d\u0435 \u043c\u043e\u0433\u0443 \u043e\u0442\u0432\u0435\u0442\u0438\u0442\u044c \u043f\u0440\u044f\u043c\u043e \u0441\u0435\u0439\u0447\u0430\u0441. \u041d\u0430\u043f\u0438\u0448\u0438\u0442\u0435 \u043d\u0430\u043c \u043d\u0430\u043f\u0440\u044f\u043c\u0443\u044e: @AGerasimov_Marketing'

    return NextResponse.json({ text })
  } catch (err) {
    console.error('[chat] error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
