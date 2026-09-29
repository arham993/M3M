# M3M Jewel Crest, Sector 97 Noida

Lead-generation website for M3M Jewel Crest, built with **React 18 + Vite**.
The page is pre-rendered to HTML at build time, so content shows before JavaScript loads (fast on mobile, readable by Google).
Enquiries go to a **Google Sheet** through a Google Apps Script web app.

## Project structure

```
src/
  config.js              Site settings (company name, phone, WhatsApp, lead endpoint)
  data/project.js        All page content: facts, highlights, rate sheet, payment plan, gallery, distances
  components/            Page sections (Hero, Pricing, Gallery, ...) and the enquiry popup/form
  lib/leads.js           Validation + sending leads to the Google Sheet
  lib/EnquiryContext.jsx The single enquiry popup and its 10-second auto-open
  styles.css             Design tokens and all styles (light theme, dark buttons, copper accent)
  icons.js               Phosphor icons (single-weight SVGs)
public/                  Images, brochure PDF, favicon, robots.txt, sitemap.xml
google-sheet/Code.gs     Apps Script that writes leads into the sheet
deploy/                  Nginx config + one-command deploy script
```

To change prices, text or photos, edit `src/data/project.js` (and `public/images/`), then rebuild.

## Settings

Edit `src/config.js`, or copy `.env.example` to `.env` and fill it in:

| Variable | What it does |
|---|---|
| `VITE_BRAND_NAME` | Your company name in the disclaimer |
| `VITE_PHONE` | Call button number, e.g. `+919876543210` (hidden while empty) |
| `VITE_WHATSAPP` | WhatsApp number, digits only, e.g. `919876543210` (hidden while empty) |
| `VITE_FORM_ENDPOINT` | Google Apps Script web app URL (already set) |
| `VITE_PRIVACY_URL` | Privacy policy link |

## Run locally

Needs Node.js 18 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build at http://localhost:4173
```

## Deploy to your server (Ubuntu + Nginx)

One-time setup:

```bash
# 1. Tools
sudo apt update && sudo apt install -y nginx git certbot python3-certbot-nginx
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt install -y nodejs

# 2. Code
sudo mkdir -p /var/www/jewelcrest/releases && sudo chown -R $USER /var/www/jewelcrest
git clone -b react https://github.com/arham993/M3M.git ~/jewelcrest && cd ~/jewelcrest

# 3. Nginx
sudo cp deploy/nginx.conf /etc/nginx/sites-available/jewelcrest
sudo ln -sf /etc/nginx/sites-available/jewelcrest /etc/nginx/sites-enabled/jewelcrest
sudo rm -f /etc/nginx/sites-enabled/default
sudo ufw allow 'Nginx Full'

# 4. Build and publish
./deploy/deploy.sh

# 5. HTTPS (once the domain's A record points to this server)
sudo certbot --nginx -d jewelcrestnoidasec97.com -d www.jewelcrestnoidasec97.com
```

Every update after that:

```bash
cd ~/jewelcrest && ./deploy/deploy.sh
```

Each deploy goes into its own release folder and switches over instantly, keeping the last 3 so you can roll back
by pointing `/var/www/jewelcrest/current` at an older one.

## Leads (Google Sheet)

`google-sheet/Code.gs` is the script behind the sheet. If you ever redeploy it and the URL changes,
update `VITE_FORM_ENDPOINT` (or `src/config.js`) and run the deploy again.
Every lead records name, mobile, email, interest, enquiry type, the button used, UTM campaign and page.
A `generate_lead` event is pushed to `dataLayer` (GTM/GA4) and `fbq('track','Lead')` fires if the Meta pixel is installed.
