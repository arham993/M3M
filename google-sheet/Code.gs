/**
 * M3M Jewel Crest - website enquiries to Google Sheet + email alert
 *
 * Setup (one time):
 * 1. Create a Google Sheet (e.g. "M3M Jewel Crest Leads").
 * 2. In the sheet: Extensions > Apps Script. Delete the sample code, paste this file, Save.
 * 3. Set NOTIFY_EMAIL below to the address(es) that should get an email for every lead.
 * 4. Deploy > New deployment > type "Web app".
 *      Execute as: Me
 *      Who has access: Anyone
 *    Click Deploy, allow the permissions, and copy the Web app URL (ends in /exec).
 * 5. Put that URL in VITE_FORM_ENDPOINT (.env) or src/config.js.
 *
 * Updating this script later (keeps the same URL):
 *   Deploy > Manage deployments > pencil icon > Version: "New version" > Deploy
 *
 * Email limits: a free Gmail account can send about 100 alert emails a day, Google Workspace about 1,500.
 * Leads are always saved to the sheet first, even if an email fails.
 */

const SHEET_NAME = 'Leads';

// Who gets the lead alert. Several people: 'a@x.com, b@y.com'. Leave '' to turn emails off.
const NOTIFY_EMAIL = 'singhrohit16988@gmail.com, abhishek.anand582@gmail.com, arham@raysuite.ai';

const COLUMNS = [
  ['submitted_ist', 'Date & Time (IST)'],
  ['name',          'Name'],
  ['phone',         'Mobile'],
  ['email',         'Email'],
  ['interest',      'Interested In'],
  ['request',       'Enquiry Type'],
  ['source',        'Button / Source'],
  ['utm',           'UTM / Campaign'],
  ['page',          'Page'],
  ['project',       'Project'],
];

function doPost(e) {
  const p = (e && e.parameter) || {};

  // Spam trap: real visitors never fill the hidden "website" field
  if (p.website) return json_({ ok: true });

  // Basic validation
  const phone = String(p.phone || '').replace(/[^\d+]/g, '');
  if (!p.name || phone.replace(/\D/g, '').length < 10) {
    return json_({ ok: false, error: 'missing name or phone' });
  }
  p.phone = phone;
  p.submitted_ist = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'dd-MMM-yyyy hh:mm a');

  // 1. Save to the sheet
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    getSheet_().appendRow(COLUMNS.map(([key]) => clean_(p[key])));
  } finally {
    lock.releaseLock();
  }

  // 2. Email alert (a failed email never loses the lead, it is already in the sheet)
  if (NOTIFY_EMAIL) {
    try {
      sendLeadEmail_(p);
    } catch (err) {
      console.error('Lead email failed: ' + err);
    }
  }

  return json_({ ok: true });
}

function sendLeadEmail_(p) {
  const digits = p.phone.replace(/\D/g, '');
  const rows = COLUMNS
    .filter(([key]) => p[key])
    .map(([key, label]) =>
      '<tr><td style="padding:8px 12px;color:#5E636B;white-space:nowrap;vertical-align:top">' + label + '</td>' +
      '<td style="padding:8px 12px;color:#16181B;font-weight:600">' + esc_(p[key]) + '</td></tr>')
    .join('');

  const htmlBody =
    '<div style="font-family:Arial,sans-serif;max-width:560px">' +
      '<h2 style="margin:0 0 4px;color:#16181B">New lead: ' + esc_(p.name) + '</h2>' +
      '<p style="margin:0 0 16px;color:#5E636B">' + esc_(p.request || 'Enquiry') + ' from the M3M Jewel Crest website</p>' +
      '<p style="margin:0 0 18px">' +
        '<a href="tel:+' + digits + '" style="display:inline-block;background:#16181B;color:#fff;padding:10px 18px;border-radius:999px;text-decoration:none;font-weight:700;margin-right:8px">Call ' + esc_(p.phone) + '</a>' +
        '<a href="https://wa.me/' + digits + '" style="display:inline-block;background:#1F8F4E;color:#fff;padding:10px 18px;border-radius:999px;text-decoration:none;font-weight:700">WhatsApp</a>' +
      '</p>' +
      '<table style="border-collapse:collapse;width:100%;border:1px solid #DADDD7">' + rows + '</table>' +
      '<p style="margin:16px 0 0;font-size:12px;color:#5E636B">All leads: <a href="' + SpreadsheetApp.getActiveSpreadsheet().getUrl() + '">open the Google Sheet</a></p>' +
    '</div>';

  const body = COLUMNS.filter(([key]) => p[key]).map(([key, label]) => label + ': ' + p[key]).join('\n');

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: 'New lead: ' + p.name + ' (' + p.phone + ') - ' + (p.request || 'Enquiry'),
    htmlBody: htmlBody,
    body: body,
    name: 'M3M Jewel Crest Leads',
    replyTo: p.email || undefined,
  });
}

// Open the /exec URL in a browser to check the script is live
function doGet() {
  return json_({ ok: true, message: 'M3M Jewel Crest lead endpoint is live' });
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS.map(([, label]) => label));
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold').setBackground('#16181B').setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
    sheet.setColumnWidths(1, COLUMNS.length, 160);
  }
  return sheet;
}

// Stops values like "+91..." or "=..." being read as formulas, and trims length
function clean_(v) {
  let s = String(v == null ? '' : v).trim().slice(0, 500);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function esc_(v) {
  return String(v == null ? '' : v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Select "testLead" in the toolbar and click Run: adds a sample row AND sends a sample email.
// The first run asks you to allow "Send email as you". Delete the test row afterwards.
function testLead() {
  doPost({ parameter: { name: 'Test Lead (delete me)', phone: '+919999999999', email: '', interest: 'Retail shop',
    request: 'Enquire Now', source: 'manual-test', utm: '', page: 'test', project: 'M3M Jewel Crest Sector 97' } });
}
