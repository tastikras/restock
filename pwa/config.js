/* ============================================================================
   ReSTOCK PWA — konfigūracija
   ============================================================================
   ČIA įrašoma vienintelė reikalinga reikšmė: ReSTOCK Web App nuoroda.

   Kur ją rasti:  Google Sheets (ReSTOCK) → Extensions → Apps Script
                  → Deploy → Manage deployments → Web app
                  → „Web app URL", baigiasi /exec

   Jei `execUrl` paliktas tuščias — programa telefone paprašys nuorodos
   vieną kartą ir įsimins ją tame įrenginyje. Įrašius čia, prašymo nebus.
   ========================================================================== */

window.RESTOCK_CONFIG = {

  /* ReSTOCK Web App nuoroda — PWA visada jungiasi ČIA.
     Jei norite laikinai nukreipti kitur, pridėkite `?u=<nuoroda>` adrese. */
  execUrl: 'https://script.google.com/macros/s/AKfycbxPZj7Jwiwq9gnkYW8CFOfTYJS0xUG_5Cyi03eQXVBAXj8VC6kE3rC33ByX7mMocXEp8g/exec',

  /* Nuorodos perrašymas per adresą: ...?u=<nuoroda> (naudojama QR kodui). */
  urlParam: 'u',

  /* `?setup=1` — vėl parodyti nustatymo ekraną (kai nuoroda pasikeitė). */
  setupParam: 'setup'

};
