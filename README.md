# 🚗 AutoElite Berlin — Website

Site premium pentru dealer auto cu Dark/Light Mode, secțiune B2B, trimitere email prin Gmail.

---

## 📁 Structura fișierelor

```
autoelite/
├── index.html   ← Structura paginii
├── style.css    ← Toate stilurile + Dark/Light theme
├── app.js       ← Toată logica: cars, filter, modal, email
└── README.md    ← Aceste instrucțiuni
```

---

## ✉️ Configurare EmailJS (trimitere email pe Gmail)

### Pasul 1 — Creează cont
1. Mergi pe **https://www.emailjs.com** → Sign Up (gratuit, 200 emailuri/lună)
2. Conectează-te cu contul tău Gmail/business

### Pasul 2 — Adaugă serviciul Gmail
1. În dashboard → **Email Services** → Add New Service
2. Alege **Gmail** → conectează contul tău Gmail
3. Copiază **Service ID** (ex: `service_abc123`)

### Pasul 3 — Creează Template pentru Contact
1. **Email Templates** → Create New Template
2. Numește-l `template_contact`
3. Conținut sugerat:
```
Subject: Neue Anfrage von {{from_name}}

Name: {{from_name}}
Email: {{from_email}}
Telefon: {{phone}}
Fahrzeug: {{vehicle}}

Nachricht:
{{message}}
```
4. **To Email**: `{{to_email}}` sau direct adresa ta
5. Salvează → copiază **Template ID**

### Pasul 4 — Creează Template pentru B2B
1. Create New Template → numește-l `template_b2b`
2. Conținut sugerat:
```
Subject: B2B Bewertungsanfrage — {{company}}

Firma: {{company}}
Kontakt: {{from_name}}
Email: {{from_email}}
Telefon: {{phone}}
Anzahl Fahrzeuge: {{quantity}}
Fahrzeugtypen: {{type}}

Details:
{{message}}
```
3. Salvează → copiază **Template ID**

### Pasul 5 — Adaugă cheile în app.js
Deschide `app.js` și înlocuiește la începutul fișierului:

```javascript
const EMAILJS_CONFIG = {
  publicKey:       'YOUR_PUBLIC_KEY',     // Account > API Keys > Public Key
  serviceId:       'service_abc123',      // ← ID-ul serviciului tău Gmail
  templateContact: 'template_contact',    // ← ID-ul template-ului contact
  templateB2B:     'template_b2b',        // ← ID-ul template-ului B2B
};
```

> ⚠️ Public Key-ul găsești în: EmailJS Dashboard → Account → API Keys

---

## 🚀 Deploy pe GitHub Pages (GRATUIT)

### Pasul 1 — Creează cont GitHub
Dacă nu ai: **https://github.com** → Sign Up (gratuit)

### Pasul 2 — Creează un repository nou
1. Click pe **+** (dreapta sus) → **New repository**
2. Numele repo-ului: `autoelite` (sau orice nume dorești)
3. Bifează **Public** (necesar pentru GitHub Pages gratuit)
4. Click **Create repository**

### Pasul 3 — Încarcă fișierele
**Varianta simplă (fără Git):**
1. În repository → click **Add file** → **Upload files**
2. Trage toate 3 fișiere: `index.html`, `style.css`, `app.js`
3. Click **Commit changes**

**Varianta cu Git (recomandat):**
```bash
git init
git add .
git commit -m "AutoElite website initial"
git remote add origin https://github.com/USERNAME/autoelite.git
git push -u origin main
```

### Pasul 4 — Activează GitHub Pages
1. În repository → click **Settings** (tab)
2. Scroll jos → secțiunea **Pages**
3. La **Source** → alege **Deploy from a branch**
4. La **Branch** → selectează `main` → folder `/` (root)
5. Click **Save**

### Pasul 5 — Accesează site-ul
- Așteptă ~2 minute
- Site-ul va fi live la: `https://USERNAME.github.io/autoelite`
- Exemplu: `https://ionpopescu.github.io/autoelite`

> 💡 **Domeniu propriu?** Poți adăuga `www.autoelite-berlin.de` gratuit în Settings > Pages > Custom domain

---

## 🔄 Actualizare site (după prima publicare)

Dacă modifici ceva, mergi pe GitHub → fișierul respectiv → icon Edit (creion) → modifică → Commit. Site-ul se actualizează automat în ~1 minut.

---

## 🎨 Funcționalități incluse

| Funcție | Descriere |
|---------|-----------|
| 🌙☀️ Dark/Light Mode | Toggle în navbar, se salvează automat |
| 🔍 Filtre avansate | Marke, Baujahr, Preis, Kraftstoff, Getriebe |
| 🚗 Modal detalii | Click pe orice mașină pentru detalii complete |
| 📧 Contact form | Trimite email direct pe Gmail via EmailJS |
| 🏢 Secțiune B2B | Formularul pentru firme/dealeri care vând mașini |
| ⚙️ Admin panel | Adaugă, șterge, schimbă statusul mașinilor |
| 📱 Responsive | Funcționează perfect pe telefon, tabletă, desktop |
| 🍔 Hamburger menu | Meniu mobil cu animație smooth |

---

## 📞 Suport

Dacă ai întrebări despre configurare, contactează dezvoltatorul.
