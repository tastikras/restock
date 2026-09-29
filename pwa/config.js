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

  /* Pvz.: 'https://script.google.com/macros/s/AKfycb.../exec' */
  execUrl: '',

  /* Nuorodos perrašymas per adresą: ...?u=<nuoroda> (naudojama QR kodui). */
  urlParam: 'u',

  /* `?setup=1` — vėl parodyti nustatymo ekraną (kai nuoroda pasikeitė). */
  setupParam: 'setup'

};
