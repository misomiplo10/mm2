# Kundeprofil – prototype

> **Status: prototype, ikke godkendt.** Ligger kun på grenen `kundeprofil` og er **ikke** merget til `main`,
> så hjemmesiden er uændret. Merge først, når det er godkendt.

## Idéen

Kunder og forhandlere kan oprette en profil hos Mister Mellow.

- **Kunder** bliver medlemmer, samler stempler og får medlemstilbud.
- **Forhandlere** får adgang til indkøbspriser, avance, opstartspakke og katalog – men først når Mister Mellow
  har godkendt profilen. Ingen andre kan se forhandlerpriserne.

Når man opretter en profil, vælger man i starten, om man er **kunde** eller **forhandler**.

## Hvad prototypen gør

| Side | Indhold |
|---|---|
| Header | Knappen "Forhandler" er blevet til **"Kundelogin"** (→ `/konto`). Logget ind: **"Min profil"**. |
| `/konto` | Opret profil / log ind. Trin 1: **Hvem er du?** Kunde eller Forhandler. Trin 2: felter for den valgte type. |
| `/konto/profil` (kunde) | **Stempelkort** med 10 felter, **medlemstilbud** og **ordrer**. |
| `/konto/profil` (forhandler) | Firmanavn, CVR og status **"Afventer godkendelse"** → **"Godkendt forhandler"** med links til priser og katalog. |
| `/forhandler` | Opstartspakke, prisliste, avance og katalog-knap er **låst** bag et kort: "Priserne er for forhandlere". Vilkår og kontakt er stadig offentlige. |
| Footer | Katalog-linket er markeret "kun forhandlere" og går til `/konto`. |

### Felter ved oprettelse

- **Kunde:** fulde navn, e-mail, adgangskode, bekræftelse af 18+, samtykke til medlemstilbud på e-mail (frivilligt).
- **Forhandler:** firmanavn, CVR-nummer, telefon, kontaktperson, e-mail, adgangskode, bekræftelse af 18+.

### Loyalitet (stempelkort)

- 1 stempel pr. ordre over **150 kr** (så man ikke kan samle stempler med små ordrer).
- **10 stempler = 2 g gratis**, som lægges i næste ordre. Kortet starter forfra.
- Reglerne står i `src/scripts/account.ts` (`STAMPS_PER_REWARD`, `MIN_ORDER_FOR_STAMP`).

### Eksempler på medlemstilbud

- 10 % på Sunday Cruise i weekenden (kun medlemmer)
- Dobbelt stempel på pre-rolls i en uge
- Gratis lighter i fødselsmåneden

## Sådan prøver du prototypen

```bash
git fetch origin
git checkout kundeprofil
npm install
npm run dev
```

Åbn `http://localhost:4321/konto`. I prototypen er der to test-knapper øverst på profilsiden:

- **"+ Simulér en ordre"** (kunde) – giver et stempel, så man kan se kortet fyldes op og 2 g låses op.
- **"✓ Godkend forhandler"** (forhandler) – svarer til, at Mister Mellow godkender profilen.

## Filer

- `src/scripts/account.ts` – den midlertidige "konto" (gemt i browseren) og stempelreglerne
- `src/pages/konto/index.astro` – opret profil / log ind
- `src/pages/konto/profil.astro` – stempelkort, tilbud, ordrer og forhandlerstatus
- `src/views/RetailView.astro` – låsning af forhandlerpriser og katalog
- `src/components/Header.astro`, `src/components/Footer.astro` – "Kundelogin" og katalog-link
- `src/scripts/main.ts` – viser/skjuler forhandlerindhold og skifter header-knappen
- `src/styles/global.css` – styling (sektionen "PROTOTYPE: customer / retailer accounts")

## ⚠️ Vigtigt: prototypen er IKKE sikker

Kontoen gemmes kun i den enkelte browser (localStorage). Der oprettes ingen rigtige konti, og
forhandlerpriserne ligger stadig i sidens HTML – de er bare skjult. **Må ikke gå live sådan.**

## Det mangler for at gå live

1. **Backend med login og database** (fx Supabase): konti, adgangskoder, ordrer og stempler.
2. **Forhandlerpriser og katalog flyttes ud af den offentlige side.** I dag ligger priserne i HTML'en og
   kataloget på `/docs/mister-mellow-katalog-2026.pdf`, som alle kan hente. De skal leveres af serveren og kun
   til godkendte forhandlere.
3. **Manuel godkendelse af forhandlere** – en liste over nye forhandlerprofiler, hvor CVR tjekkes og profilen
   godkendes. Ellers kan alle bare vælge "Forhandler".
4. **Rigtige ordrer** – stempler kan først tælle, når betaling er koblet på.
5. **Privatlivspolitik opdateres** (der gemmes nu kundeprofiler), og samtykke til markedsføring på e-mail.
6. **Engelsk version** af konto-siderne (prototypen er kun på dansk).

## Åbne spørgsmål

- Skal "Minimumsordre 4.640 kr" under Vilkår også låses for ikke-forhandlere?
- Er 150 kr den rigtige grænse for et stempel, og skal det være 2 g af en bestemt sort?
- Hvilke medlemstilbud skal der være fra start?
