// ═══════════════════════════════════════════════════════════════════
// VR Asphodel — Google Apps Script (Web App)
// Принимает POST от /api/track и пишет в лист Events
//
// Структура листа Events (колонки A–I):
//   A: user_id     B: session_id  C: event      D: timestamp
//   E: page        F: payload     G: referrer
//   H: section     (для section_time, извлекается из payload)
//   I: seconds     (для section_time, извлекается из payload)
// ═══════════════════════════════════════════════════════════════════

const SPREADSHEET_ID = '1dypaPvUhYgaFGXKYkfTzy5_4BSpX3IomDqC2kXhQQ84'
const SECRET = 'vrasphodel2025'

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)

    // Проверка секрета
    if (data.secret !== SECRET) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'forbidden' }))
        .setMimeType(ContentService.MimeType.JSON)
    }

    const ss    = SpreadsheetApp.openById(SPREADSHEET_ID)
    let sheet   = ss.getSheetByName('Events')
    if (!sheet) {
      sheet = ss.insertSheet('Events')
      sheet.appendRow([
        'user_id','session_id','event','timestamp',
        'page','payload','referrer','section','seconds'
      ])
      sheet.getRange('1:1').setFontWeight('bold').setBackground('#f0f0f0')
    }

    const payload = data.payload || {}

    // ── Сохраняем ИСХОДНЫЙ порядок колонок (A-G как раньше) ─────────
    // + добавляем H=section, I=seconds из payload
    sheet.appendRow([
      data.user_id    || 'anon',                    // A: user_id
      data.session_id || '',                         // B: session_id
      data.event      || '',                         // C: event
      data.timestamp  || new Date().toISOString(),   // D: timestamp
      data.page       || '/',                        // E: page
      JSON.stringify(payload),                       // F: payload (полный JSON)
      data.referrer   || '',                         // G: referrer
      payload.section || '',                         // H: section ← ключевое!
      payload.seconds != null ? payload.seconds : '', // I: seconds ← ключевое!
    ])

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON)

  } catch (err) {
    Logger.log('doPost error: ' + err.message)
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

// ═══════════════════════════════════════════════════════════════════
// МИГРАЦИЯ: заполни H и I из существующих строк в колонке F (payload)
// Запусти ОДИН РАЗ вручную из Apps Script → потом можно удалить
// ═══════════════════════════════════════════════════════════════════
function migrateExistingRows() {
  const ss    = SpreadsheetApp.openById(SPREADSHEET_ID)
  const sheet = ss.getSheetByName('Events')
  if (!sheet) { Logger.log('Лист Events не найден'); return }

  const lastRow = sheet.getLastRow()
  if (lastRow < 2) { Logger.log('Нет данных'); return }

  const data = sheet.getRange(2, 1, lastRow - 1, 9).getValues()
  let fixed = 0

  data.forEach((row, i) => {
    const event      = row[2]  // C
    const payloadStr = row[5]  // F
    const section    = row[7]  // H (может быть пустым)
    const seconds    = row[8]  // I (может быть пустым)

    // Только section_time строки с пустым H
    if (event === 'section_time' && !section && payloadStr) {
      try {
        const payload = JSON.parse(payloadStr)
        if (payload.section) {
          sheet.getRange(i + 2, 8).setValue(payload.section) // H
          sheet.getRange(i + 2, 9).setValue(payload.seconds || 0) // I
          fixed++
        }
      } catch(e) {
        // пропускаем строки с битым JSON
      }
    }
  })

  Logger.log(`✅ Миграция завершена: исправлено ${fixed} строк`)
  SpreadsheetApp.getUi().alert(`✅ Миграция завершена: исправлено ${fixed} строк`)
}

// ── Тест ─────────────────────────────────────────────────────────
function testWrite() {
  const ss    = SpreadsheetApp.openById(SPREADSHEET_ID)
  const sheet = ss.getSheetByName('Events') || ss.insertSheet('Events')
  sheet.appendRow([
    'test_user', 'test_session', 'section_time',
    new Date().toISOString(), '/', '{"section":"hero","seconds":12}',
    '', 'hero', 12
  ])
  Logger.log('✅ Тестовая строка записана — проверь колонки H и I')
}

// ═══════════════════════════════════════════════════════════════════
// DASHBOARD — заменяет setupDashboard (оставь без изменений)
// ═══════════════════════════════════════════════════════════════════
function setupDashboard() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const old = ss.getSheetByName('Dashboard');
  if (old) ss.deleteSheet(old);
  const dash = ss.insertSheet('Dashboard');

  dash.getRange('A1').setValue('📊 Аналитика сайта V.R. Asphodel');
  dash.getRange('A1').setFontSize(16).setFontWeight('bold');
  dash.getRange('A2').setValue('Обновляется автоматически');
  dash.getRange('A2').setFontColor('#888888').setFontSize(10);

  // KPI
  dash.getRange('A4').setValue('Всего визитов').setFontWeight('bold');
  dash.getRange('B4').setFormula('=COUNTIF(Events!C:C,"page_view")');
  dash.getRange('B4').setFontSize(20).setFontWeight('bold');
  dash.getRange('D4').setValue('Заявок с форм').setFontWeight('bold');
  dash.getRange('E4').setFormula('=COUNTIF(Events!C:C,"contact_form_submit")+COUNTIF(Events!C:C,"lead_form_submit")');
  dash.getRange('E4').setFontSize(20).setFontWeight('bold');
  dash.getRange('G4').setValue('Клики по телефону').setFontWeight('bold');
  dash.getRange('H4').setFormula('=COUNTIF(Events!C:C,"click_phone")');
  dash.getRange('H4').setFontSize(20).setFontWeight('bold');
  dash.getRange('J4').setValue('Клики по Telegram').setFontWeight('bold');
  dash.getRange('K4').setFormula('=COUNTIF(Events!C:C,"click_telegram")');
  dash.getRange('K4').setFontSize(20).setFontWeight('bold');

  // Посещаемость по дням
  dash.getRange('A7').setValue('ПОСЕЩАЕМОСТЬ ПО ДНЯМ').setFontWeight('bold').setFontSize(12);
  dash.getRange('A8').setValue('Дата').setFontWeight('bold').setBackground('#f0f0f0');
  dash.getRange('B8').setValue('Посещений').setFontWeight('bold').setBackground('#f0f0f0');
  dash.getRange('A9').setFormula(
    '=IFERROR(SORT(UNIQUE(ARRAYFORMULA(IF(Events!C2:C="page_view",LEFT(Events!D2:D,10),""))),1,FALSE),"")'
  );
  dash.getRange('B9').setFormula(
    '=IFERROR(ARRAYFORMULA(IF(A9:A30="","",COUNTIFS(Events!C:C,"page_view",ARRAYFORMULA(LEFT(Events!D:D,10)),A9:A30))),"")'
  );

  // Время на секциях
  dash.getRange('D7').setValue('ВРЕМЯ НА СЕКЦИЯХ').setFontWeight('bold').setFontSize(12);
  dash.getRange('D8').setValue('Секция').setFontWeight('bold').setBackground('#f0f0f0');
  dash.getRange('E8').setValue('Ср. время (сек)').setFontWeight('bold').setBackground('#f0f0f0');
  dash.getRange('F8').setValue('Замеров').setFontWeight('bold').setBackground('#f0f0f0');

  const sections = [
    'hero','about','video','services',
    'responsibility','lead-magnets','process',
    'portfolio','calculator','reviews','faq','final-cta'
  ];
  sections.forEach((name, i) => {
    const row = 9 + i;
    dash.getRange(`D${row}`).setValue(name);
    dash.getRange(`E${row}`).setFormula(`=IFERROR(AVERAGEIF(Events!H:H,"${name}",Events!I:I),0)`);
    dash.getRange(`F${row}`).setFormula(`=COUNTIF(Events!H:H,"${name}")`);
  });
  dash.getRange('E9:E20').setNumberFormat('0');

  dash.setColumnWidth(1, 120);
  dash.setColumnWidth(2, 90);
  dash.setColumnWidth(4, 150);
  dash.setColumnWidth(5, 130);
  dash.setColumnWidth(6, 90);

  try {
    const chart1 = dash.newChart()
      .setChartType(Charts.ChartType.LINE)
      .addRange(dash.getRange('A8:B30'))
      .setPosition(22, 1, 0, 0)
      .setOption('title', 'Посещаемость по дням')
      .setOption('width', 480).setOption('height', 260)
      .setOption('legend', { position: 'none' })
      .build();
    dash.insertChart(chart1);

    const chart2 = dash.newChart()
      .setChartType(Charts.ChartType.BAR)
      .addRange(dash.getRange('D8:E20'))
      .setPosition(22, 4, 0, 0)
      .setOption('title', 'Среднее время на секции (сек)')
      .setOption('width', 480).setOption('height', 340)
      .setOption('legend', { position: 'none' })
      .build();
    dash.insertChart(chart2);
  } catch(e) {
    Logger.log('Графики: ' + e.message);
  }

  Logger.log('✅ Dashboard обновлён!');
  SpreadsheetApp.getUi().alert('✅ Dashboard настроен! Перейди на лист Dashboard.');
}
