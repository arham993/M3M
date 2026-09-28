M3M JEWEL CREST - LANDING PAGE
==============================
Upload everything in this folder to your hosting (keep the folder structure).

BEFORE GOING LIVE - open index.html, find "SITE CONFIG" near the bottom and fill in:
  brandName    Your channel-partner company name (appears in the disclaimer)
  phone        Call number, e.g. "+919876543210"  (Call buttons stay hidden until set)
  whatsapp     WhatsApp number, digits only, e.g. "919876543210" (WhatsApp buttons appear when set)
  formEndpoint URL that receives leads by POST, e.g. a Google Apps Script web app,
               Formspree, a Zapier/Make webhook or your CRM. Fields sent:
               project, name, phone, email, interest, request, source, page, utm, submitted_at
  privacyUrl   Link to your privacy policy

Behaviour
- Enquiry popup opens automatically 10 seconds after landing (once per visit, never after a lead is submitted).
- Every CTA opens the same popup with its own heading (Enquire Now, Download Brochure, Get Price Sheet, Floor Plans, Site Visit).
- "Download Brochure" leads get M3M-Jewel-Crest-Brochure.pdf (3 MB, built from the brochure renders).
- UTM / gclid / fbclid are captured with each lead; a "generate_lead" event is pushed to dataLayer (GTM/GA4) and fbq('track','Lead') fires if the Meta pixel is installed.
