/**
 * M3M Jewel Crest - website enquiries to Google Sheet
 *
 * Setup (one time):
 * 1. Create a Google Sheet (e.g. "M3M Jewel Crest Leads").
 * 2. In the sheet: Extensions > Apps Script. Delete the sample code, paste this file, Save.
 * 3. Optional: put your email in NOTIFY_EMAIL to get an email for every new lead.
 * 4. Deploy > New deployment > type "Web app".
 *      Execute as: Me
 *      Who has access: Anyone
 *    Click Deploy, allow the permissions, and copy the Web app URL (ends in /exec).
 * 5. Put that URL in CONFIG.formEndpoint in index.html (or send it to Claude).
 *
 * If you edit this script later: Deploy > Manage deployments > Edit > Version: New version > Deploy
 * (the URL stays the same).
 */

const SHEET_NAME = 'Leads';
const NOTIFY_EMAIL = '';   // e.g. 'you@example.com' - leave empty for no email alerts

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

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sheet = getSheet_();
    const row = COLUMNS.map(([key]) => clean_(p[key]));
    sheet.appendRow(row);
  } finally {
    lock.releaseLock();
  }

  if (NOTIFY_EMAIL) {
    const body = COLUMNS.map(([key, label]) => label + ': ' + (p[key] || '-')).join('\n');
    MailApp.sendEmail(NOTIFY_EMAIL, 'New M3M Jewel Crest lead: ' + p.name + ' (' + p.phone + ')', body);
  }

  return json_({ ok: true });
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

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Run this once from the editor (select "testLead" > Run) to see a sample row appear
function testLead() {
  doPost({ parameter: { name: 'Test Lead', phone: '+919999999999', email: '', interest: 'Retail shop',
    request: 'Enquire Now', source: 'manual-test', utm: '', page: 'test', project: 'M3M Jewel Crest Sector 97' } });
}
