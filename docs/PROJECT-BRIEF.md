# Specimen Design · דוגמית עיצוב: מסמך פרויקט מלא

> המסמך הזה נועד לכל סוכן או שיחה חדשה שעובדים על העסק או על האתר. הוא מרכז את כל מה שנבנה, למה, איפה הכול נמצא ומה עוד פתוח.
> עודכן לאחרונה: 11 באוקטובר 2026.

## 0. כללי תחזוקה (חובה לכל סוכן ושיחה)

- **המסמך הזה הוא מקור האמת של העסק והאתר.** לפני עבודה בפרויקט קוראים אותו. אם הוא סותר משהו בזיכרון של Claude, המסמך גובר.
- **הוראה קבועה של עידו:** בכל שיחה בפרויקט, ברגע שעולה פרט, שינוי או עדכון חשוב לעסק או לאתר, **מעדכנים את המסמך באותה שיחה**, בלי לחכות לבקשה. דוגמאות: פרטי קשר, החלטה עסקית, מחיר, לקוח, שינוי באתר, נכס חדש או משימה שנסגרה.
- **איך מעדכנים:**
  1. עורכים את הסעיף הרלוונטי, כך שהמסמך משקף תמיד את המצב הנוכחי ולא רק מוסיף שורות.
  2. מוסיפים שורה ל"יומן שינויים" בסוף המסמך, עם תאריך.
  3. משנים את תאריך "עודכן לאחרונה".
- **שני עותקים, תמיד מסונכרנים:**
  1. מסמך הפרויקט ב־Claude: `claude/specimen-design-project-brief.md`. נכתב עם הכלי Projects → `project_write` לאותו נתיב, שמחליף את הקיים.
  2. במאגר הקוד: `docs/PROJECT-BRIEF.md`. נשמר עם commit ו־push ל־`main`.
- לא שומרים במסמך סיסמאות, מפתחות API, טוקנים או פרטי תשלום.

---

## 1. במשפט אחד

**Specimen Design** (בעברית: **דוגמית עיצוב**) היא ספרייה חינמית של עיצובי אתרים שלמים ורכיבי ממשק מונפשים. כל עיצוב רץ חי בדפדפן ומגיע עם **פרומפט מוכן ל־Claude** שבונה אותו. הספרייה היא חלון הראווה והמשפך של העסק: **שירות בנייה וניהול של אתרים לעסקים קטנים**.

---

## 2. העסק

| נושא | פרטים |
|---|---|
| בעלים | עידו שגב (Ido Segev) |
| מייל עסקי | **admin@specimendesign.org** |
| מה מוכרים | בנייה וניהול של אתרים לעסקים קטנים: אסטרטגיה, תוכן, עיצוב, פיתוח ותחזוקה |
| מודל | הספרייה החינמית מושכת תנועה (SEO, אינסטגרם). המבקרים רואים את רמת העיצוב, ומי שרוצה אתר משלו ממלא טופס פנייה (Lead funnel) באתר |
| קהל יעד | (1) בעלי עסקים קטנים שצריכים אתר שנראה אחרת מתבנית. (2) אנשים שבונים בעצמם עם AI (Claude) ומחפשים השראה ופרומפטים טובים |
| הבטחה מרכזית | אתרים שנראים כאילו עוצבו ונבנו ביד, ולא כמו תוצר גנרי של AI או תבנית |
| שפות | אנגלית כברירת מחדל, עברית מלאה תחת `/he` |
| טענות שיווק באתר | "אסטרטגיה, תוכן ועיצוב בצוות אחד", "פיתוח ב־Next.js", "SEO ואנליטיקס מהיום הראשון", "רוב הפרויקטים באוויר תוך 4–6 שבועות", "תשובה תוך יום עבודה" |
| תקציב בטופס | בדולרים (שדה "תקציב משוער") |
| **מבצע נוכחי** | **70% הנחה על בניית האתר והליווי**, בתוקף עד סוף "חודש המבצעים", **30 בנובמבר 2026**. מקודם באינסטגרם (סעיף 10). מחירי בסיס עדיין לא נקבעו במסמך, ולכן בפוסטים מציינים רק את אחוז ההנחה |

### ערוצים וקישורים

| ערוץ | כתובת |
|---|---|
| האתר (אנגלית) | https://specimen-designs.vercel.app |
| האתר (עברית) | https://specimen-designs.vercel.app/he |
| מייל | admin@specimendesign.org (עדיין לא מופיע באתר) |
| דומיין specimendesign.org | רשום ומנוהל ב־**Squarespace** (רשם הדומיין וה־DNS). המייל העסקי מיועד לעבור דרך Google Workspace. **אימות הבעלות מול Google טרם הושלם** |
| **אינסטגרם** | **https://www.instagram.com/specimen.design/** (`@specimen.design`). הקישור מופיע בפוטר האתר בשתי השפות ובסכמת ה־Organization (`sameAs`) |
| קוד | https://github.com/idobsegev-cmyk/anti-ai-ui-vault (ציבורי, ענף `main`) |
| אחסון | Vercel, צוות `segev1`, פרויקט `anti-ai-ui-vault`. כל push ל־`main` מעלה גרסה חדשה אוטומטית |
| תצוגה מקדימה כ־Artifact | https://claude.ai/artifact/TWuS4bCdrgeCpDmvJFJ9J4 (פרטי, קובץ HTML יחיד של כל האתר) |
| נכסי מותג באתר | https://specimen-designs.vercel.app/brand/ (פירוט בסעיף 4) |

### ביו לאינסטגרם (הוצע, באנגלית)

- "Inspiration and tools to build a website that feels hand-made, yourself."
- חלופות: "Website designs + Claude prompts. Copy, paste, build your own." / "Steal our designs. Build it yourself with Claude." / "Real website designs, ready-to-use prompts. You do the building."
- שורה שנייה מומלצת: "Free library ↓ · Custom sites in DM", וקישור לאתר בשדה הלינק.

---

## 3. היסטוריית שמות והחלטות

1. **Anti-AI UI Vault** (בעברית "מבצר העיצוב"): השם הראשון. המאגר ופרויקט Vercel עדיין נקראים `anti-ai-ui-vault`, וגם חלק משמות המשתנים והקבצים בקוד (`vault`, `VaultGrid`, `vault-lang`).
2. **Specimen / דוגמית**: שם שנבחר מתוך כמה הצעות.
3. **Specimen Design / דוגמית עיצוב**: השם הסופי. המילה "design" יושבת מתחת ל־Specimen בלוגו, כדי להתאים לכתובת `specimen-designs.vercel.app`. הכתובת `specimen.vercel.app` הייתה תפוסה בצוות אחר.

החלטות מוצר לאורך הדרך, לפי סדר:
- תצוגה מקדימה כ־artifact, ואחר כך עלייה ל־Vercel.
- בכותרת הראשית (Hero) מילה מתחלפת, וכל מילה מקבלת גופן ואנימציה משלה: Alive, Human, Creative, Young, Modern, Timeless, Bold, Warm.
- דוגמאות עיצוב חיות כבר במסך הראשון (Hero showcase ופס פיצ'רים חי), כי לא היה ברור מה האתר מציג.
- מגוון סגנונות: 16 שפות עיצוב במקום סגנון אחד.
- אנגלית כברירת מחדל ועברית בנפרד. עברית מוצגת אוטומטית רק למי שהגיע מחיפוש בעברית בגוגל.
- עיצובים של **אתרים שלמים** בהשראת Dribbble, ולא רק רכיבים בודדים.
- טקסטים ארוכים הוחלפו בתצוגות חיות ובאנימציית "איך זה עובד" שרצה בלולאה.
- שדרוג SEO מלא בשתי השפות, תיקוני גלילה וחוויית משתמש, שדרוג טיפוגרפיה ותוכן בעברית, קבצי לוגו, סרטון לאינסטגרם וקישור לאינסטגרם.

---

## 4. מותג

### עקרונות עיצוב ("Anti-AI")

- **אסור:** ניאון וזוהר בסגנון סייברפאנק, Glassmorphism כבד ומטושטש, גרדיאנטים גנריים, מראה של תבנית.
- **כן:** פלטה חמה ומינימליסטית, טיפוגרפיה בהשראת שוויץ ומגזינים, קווים דקים (hairlines), צל קשיח ("offset shadow") במקום צל מטושטש, ותנועה עם פיזיקה של קפיץ (Framer Motion springs).
- דימוי מרכזי: "ספר דוגמיות" של בית דפוס. גיליונות, תוויות, קווים ומספור.

### צבעים

| טוקן | ערך | שימוש |
|---|---|---|
| paper | `#FAF9F6` | רקע ראשי |
| paper-2 | `#F2EFE8` | רקע משני (למשל "איך זה עובד") |
| paper-3 | `#E8E3D8` | שכבות נייר |
| ink | `#121212` | טקסט ורקע כהה |
| ink-2 | `#3A3A38` | טקסט גוף |
| ink-3 | `#6F6C66` | תוויות משניות |
| cobalt | `#1D4ED8` | צבע הדגשה ראשי (ה־"men" בלוגו) |
| terracotta | `#D9534F` | צבע הדגשה שני (קו ו־"design" בלוגו, כפתור "לבניית אתר") |
| moss | `#4A6B3A` | עזר |
| גרסה כהה של הלוגו | cobalt `#7C9BFF`, terracotta `#E8705F` | הגוונים הבהירים יותר נבחרו ל־contrast על רקע שחור |

### טיפוגרפיה

- **אנגלית:** Instrument Sans (ממשק וכותרות, bold), Instrument Serif נטוי (מילות הדגשה, ה־"men" בלוגו) ו־JetBrains Mono (תוויות קטנות, באותיות גדולות ובריווח רחב).
- **עברית:** IBM Plex Sans Hebrew (ממשק וכותרות, 600 בכותרות) ו־Frank Ruhl Libre (סריף עורכי, בעיקר במילה המתחלפת "אנושיים").
- חוקי עברית קבועים, מיושמים בקובץ `src/app/globals.css` תחת `[lang="he"]`:
  - אין ריווח בין אותיות (tracking).
  - אין אותיות גדולות (uppercase) ואין נטוי.
  - גובה שורה 1.1 בכותרות ו־1.65 בטקסט.
  - טקסט קטן גדל במדרגה אחת.
  - מילות הדגשה מסומנות במשקל light מאותו גופן, ולא בגופן אחר.
- המילה המתחלפת בעברית ברבים, כדי להתאים ל"אתרים שמרגישים…": חיים, אנושיים, יצירתיים, צעירים, מודרניים, על־זמניים, נועזים, חמים. לכל מילה גופן עברי משלה: Secular One, Frank Ruhl, Solitreo, Varela Round, Plex Light, Bellefair, Karantina, Suez One.

### לוגו

- **אנגלית:** "Speci" ב־Instrument Sans Bold בצבע ink, "men" ב־Instrument Serif Italic בצבע cobalt. מתחת: קו terracotta קצר ו־"DESIGN" ב־JetBrains Mono, בריווח רחב, בצבע terracotta.
- **עברית:** "דוגמית" ב־IBM Plex Sans Hebrew Bold ונקודה בצבע cobalt. מתחת: קו terracotta ו־"עיצוב".
- **אייקון:** ריבוע מעוגל בצבע charcoal, "S" נטוי בצבע paper ונקודה terracotta. האייקון משמש כ־favicon (`src/app/icon.svg`) וכאייקון אפל (`src/app/apple-icon.png`).
- **קבצים** בתיקייה `public/brand/`, ובאתר תחת `/brand/…`:
  - `specimen-design-logo-light|dark.svg|png`: אנגלית, לרקע בהיר או כהה.
  - `specimen-design-logo-he-light|dark.svg|png`: עברית.
  - `specimen-design-icon.svg|png`
  - `specimen-design-logo-1200x628-light|dark.png`: לתמונות שיתוף ופוסטים.
  - `video/specimen-how-it-works.mp4`: סרטון לאינסטגרם, אנכי 1080×1920, 12.4 שניות, לולאה חלקה, בלי סאונד.
- כל קבצי ה־SVG מכילים את הטקסט כצורות (outlines), כך שלא צריך להתקין גופנים כדי להציג אותם.
- הסקריפטים שמייצרים את הקבצים נמצאים ב־`scripts/brand/` (ראו README שם).

### טון כתיבה

- **אנגלית:** קצר, בטוח, עם קריצה קלה ("Four steps, zero templates.", "Made by people.").
- **עברית:** טבעית ותמציתית, לא תרגומית. **ניסוח ניטרלי מגדרית** (בקשה קבועה של עידו): פעלים בגוף רבים בהווה ("בוחרים, מעתיקים") או שם פועל ("לגעת, לנסות, להעתיק"). כשאין ברירה, צורת לוכסן ("מוותר/ת").
- **מילים שיש להיזהר מהן בעברית:** Zine מתורגם ל"פנזין", אף פעם לא "זין". Hero מתורגם ל"אזור פתיחה" (בעמודי SEO נשאר גם "הירו").

---

## 5. האתר: מה יש בו

### מבנה עמודים (בכל שפה, העברית עם תחילית `/he`)

| נתיב | תוכן |
|---|---|
| `/` | דף הבית: Hero עם מילה מתחלפת, מאגר מסתובב של 8 עיצובים נבחרים ופס של רכיבים חיים. אחריו רשת הספרייה עם חיפוש, סינון לפי קטגוריה וסגנון, אתרים מלאים ואז רכיבים. בהמשך "איך זה עובד" (הדגמה מונפשת בלולאה), "לפי סוג ולפי סגנון", שאלות נפוצות וטופס פנייה ("Studio") |
| `/vault/[slug]` | עמוד לכל עיצוב, 59 עמודים: תצוגה חיה (אתר מלא מוצג באורכו ונגלל עם העמוד), לשוניות פרומפט וקוד, כפתור העתקה, איך משתמשים, הפרומפט המלא ועיצובים קשורים |
| `/designs/[category]` | 9 עמודי נחיתה לפי סוג (website-designs, hero-sections, bento-grids, animated-buttons, kinetic-typography, 3d-cards, accordions, navigation-bars, forms) |
| `/styles/[style]` | 16 עמודי נחיתה לפי סגנון (neo-brutalist, bauhaus, swiss-international, japanese-minimal, luxury-noir, retro-70s, memphis-90s, y2k-chrome, retro-os, claymorphism, risograph-zine, organic-earth, art-deco, 8-bit-arcade, mono-data, warm-editorial) |
| `/api/lead` | קולט את טופס הפנייה ומעביר ל־`LEAD_WEBHOOK_URL` (**עדיין לא מוגדר**, ראו סעיף 9) |
| `/sitemap.xml`, `/robots.txt` | אוטומטיים. ב־sitemap יש 170 כתובות: 85 באנגלית ו־85 בעברית |

### התוכן (59 פריטים)

- **10 אתרים מלאים**, כל אחד בשפת עיצוב אחרת:
  - Nocturne Hotel: Luxury Noir
  - Loudmouth Agency: Neo-Brutalist
  - Kanso Architects: Japanese Minimal
  - Bloom & Root Skincare: Organic Earth
  - Ledgerly SaaS: Swiss International
  - Sunwave Festival: Retro 70s
  - Pixel Pals Game Studio: 8-bit Arcade
  - Café Bauhaus: Bauhaus
  - Vitals Habit App: Claymorphism
  - Overprint Zine Fair: Risograph Zine
- **49 רכיבים:**

  | קטגוריה | כמות |
  |---|---|
  | Hero sections | 6 |
  | Bento grids | 6 |
  | Buttons | 9 |
  | Kinetic typography | 6 |
  | 3D cards | 5 |
  | Accordions | 6 |
  | Navigation | 6 |
  | Forms | 5 |
- **סגנונות:** 34 פריטים ב־"Warm Editorial" (סגנון הבית), והשאר מפוזרים בין 15 שפות עיצוב נוספות.
- **הנתונים:**
  - `src/data/prompts.json`: כל פריט כולל `id`, `slug`, `title`, `category`, `description`, `style`, `tags`, `claudePrompt`, `previewCode` ו־`addedAt`.
  - `src/data/he.json`: כותרת ותיאור בעברית לכל `slug`. **כל פריט חדש צריך לקבל גם שורה כאן**, אחרת העברית מקבלת ניסוח גנרי.
  - תגיות בעברית נמצאות ב־`TAG_HE` בקובץ `src/lib/labels.js`. תגיות טכניות בלי תרגום מוסתרות בעברית.

### התנהגויות חשובות

- **שפה:**
  - שני עצי עמודים נפרדים, `(en)` ו־`(he)`. העברית מוגשת כ־`<html lang="he" dir="rtl">` מהשרת.
  - כפתור החלפה: לשונית בצד המסך בדסקטופ, כפתור קטן בפינה למטה במובייל.
  - בחירה ידנית נשמרת ב־`localStorage` (`vault-lang`).
  - מי שמגיע מגוגל בעברית (google.co.il או דפדפן בעברית) מועבר ל־`/he`.
  - תגי `hreflang` אומרים לגוגל להציג את הגרסה המתאימה.
- **תצוגות חיות:**
  - קוד ה־`previewCode` רץ בדפדפן דרך react-live.
  - כל תצוגה נטענת רק כשהיא מתקרבת למסך, ומתפנה כשהיא רחוקה ממנו.
  - כרטיסי אתרים "נגללים" כשמחזיקים עליהם את העכבר לרגע.
- **הגנות גלילה** (תוקנו אחרי תלונה על קפיצות):
  - תצוגה לא יכולה לגנוב פוקוס או לגלול את העמוד (`src/lib/preview-guard.js`).
  - ברשתות, תצוגות לא תופסות את גלגלת העכבר, ובטלפון החלקה מעליהן גוללת את העמוד.
  - הסרגל העליון מגיב רק לגלילה מכוונת.
  - הבודק האוטומטי פוסל תצוגות עם `autoFocus`, `scrollIntoView` או `window.scrollTo`.

---

## 6. טכנולוגיה

- **Stack:**
  - Next.js 16.4 (App Router, JavaScript, Turbopack)
  - Tailwind CSS v4 (טוקנים ב־`@theme`)
  - framer-motion 14
  - GSAP SplitText (אנימציית הכותרת)
  - lucide-react
  - react-live
- **פקודות:**

  | פקודה | מה עושה |
  |---|---|
  | `npm run dev` | שרת פיתוח |
  | `npm run build` | בנייה |
  | `npm run check:previews` | מקמפל ומרנדר כל תצוגה, כדי שתצוגה שבורה לא תעלה לאוויר |
  | `npm run build:artifact` | בונה את `dist/anti-ai-ui-vault.html`, קובץ יחיד של כל האתר לתצוגה כ־artifact |
  | `npm run seed` | בונה את `prompts.json` מחדש מ־`scripts/seed/*.mjs` |
  | `npm run daily` | מריץ את מחולל התוכן היומי באופן ידני |
- **מפת קבצים עיקרית:**
  - `src/app/(en)/…` ו־`src/app/(he)/he/…`: עמודים, layouts ותמונות OG.
  - `src/views/`: התוכן המשותף של העמודים, `HomeView`, `DetailView` ו־`CollectionView`, כולל metadata ו־JSON-LD.
  - `src/components/`: רכיבי הממשק, בהם `SiteShell` (ה־HTML כולו), `SiteHeader`, `SiteFooter`, `Hero`, `WordRotator`, `HeroShowcase`, `FeatureStrip`, `VaultGrid`, `HowItWorks`, `LeadFunnel`, `ComponentDetail`, `DetailTabs`, `LivePreview`, `SitePreview`, `Faq`, `Explore` ו־`LanguageSwitch`.
  - `src/lib/`:
    - `i18n.js`: כל הטקסטים בשתי השפות ו־`LangProvider`.
    - `labels.js`: שמות קטגוריות, סגנונות ותגיות בעברית.
    - `seo-content.js`: עמודי הנחיתה ושאלות נפוצות בשתי השפות.
    - `meta.js`: metadata, hreflang וסכמת Organization.
    - `site.js`: שם, כתובת הפרודקשן, אינסטגרם.
    - `fonts.js` ו־`fonts-he.js`: גופנים.
    - `data.js`: גישה לנתונים ו־`localize()`.
    - `live-scope.js`: מה זמין לקוד התצוגות.
    - `preview-guard.js` ו־`use-near-screen.js`.
  - `artifact/`: בניית ה־artifact (esbuild ו־Tailwind CLI, עם shims ל־`next/link` ול־`next/navigation`).
  - `scripts/`: המחולל היומי, הבודק, ה־seed, `ship.sh` ו־`brand/`.
- **חוקי `previewCode`:**
  - בלי `import`/`export`, בלי backticks ובלי template literals.
  - הקוד מסתיים ב־`render(<Demo />)` והאלמנט הראשי הוא `h-full w-full`.
  - צבעים כ־Tailwind hex arbitrary values.
  - בלי גישה ל־`window`/`document` בזמן render, בלי תמונות חיצוניות ובלי פעולות שמזיזות את העמוד.
  - ה־globals הזמינים מפורטים ב־`src/lib/live-scope.js`.
- **SEO:**
  - title ו־description לכל עמוד, ו־canonical לכתובת הפרודקשן.
  - hreflang `en`/`he`/`x-default`.
  - JSON-LD מסוג WebSite, Organization (כולל `sameAs` לאינסטגרם ול־GitHub), CollectionPage/ItemList, FAQPage, ProfessionalService, SoftwareSourceCode, CreativeWork ו־BreadcrumbList.
  - שאלות נפוצות כ־`<details>`, כך שהן נקראות גם בלי JavaScript.
  - תמונות OG אוטומטיות. בעמודים העבריים הטקסט בהן באנגלית, כי satori לא תומך ב־RTL.
  - קוד אימות למנועי חיפוש דרך `GOOGLE_SITE_VERIFICATION` ו־`BING_SITE_VERIFICATION`.
- **משתני סביבה:**
  - `LEAD_WEBHOOK_URL`: יעד הפניות.
  - `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`.
  - `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_REPO_URL`: אופציונליים.
  - לתוכן היומי: `ANTHROPIC_API_KEY` (Secret ב־GitHub, אופציונלי), `CLAUDE_MODEL` (Variable), `VAULT_FORCE`, `VAULT_DATE`, `VAULT_DRY_RUN`.
- **ביצועים:**
  - אין תזוזת עמוד בטעינה (CLS 0) ואין קפיצות גלילה. נבדק בדפדפן אמיתי.
  - ה־HTML של דף הבית שוקל כ־620KB, כי כל נתוני הפריטים נשלחים ללקוח. זו נקודה לשיפור עתידי.

---

## 7. אוטומציה: תוכן יומי

- **GitHub Action:** `.github/workflows/daily-vault-update.yml`, כל יום ב־09:00 UTC (12:00 שעון ישראל), או ידנית דרך Actions → Run workflow → force.
- **התהליך:**
  1. `scripts/generate-daily-components.mjs` מוסיף 3–5 רכיבים, עד אחד לכל קטגוריה, ומתחיל בקטגוריות הדלילות.
  2. כל מועמד עובר `check:previews` ו־`build`.
  3. ה־commit עולה ל־`main`, ו־Vercel מעלה גרסה חדשה.
- **מנועים:**
  - **Offline (ברירת מחדל):** 8 משפחות רכיבים × 12 תחומי עסק. מייצר רק בסגנון Warm Editorial ורק רכיבים, לא אתרים מלאים.
  - **Claude (אופציונלי):** דורש Secret בשם `ANTHROPIC_API_KEY`. מבקש מ־Claude עיצובים חדשים בסגנונות מגוונים, ונופל ל־Offline אם משהו נכשל.
- **⚠️ חלון הקמפיין:** `scripts/daily-config.json` מגדיר `startDate: 2026-10-11` ו־`endDate: 2026-10-17`. **אחרי 17 באוקטובר הריצה היומית תפסיק להוסיף תוכן**, אלא אם מאריכים את `endDate`.
- **סטטוס:** נכון ל־11 באוקטובר בצהריים, עדיין לא נראה commit של הבוט היום. לא ניתן היה לבדוק מכאן אם `ANTHROPIC_API_KEY` מוגדר, כי גישה ל־Secrets חסומה. כדאי לבדוק ב־GitHub תחת Actions.
- **פריט חדש שנוסף אוטומטית** לא מקבל שורה ב־`he.json`, ולכן בעברית הוא מוצג עם ניסוח גנרי. כדאי להוסיף תרגום ידני מדי פעם, או לשפר את המחולל כך שיכתוב גם עברית.

---

## 8. איך לעבוד על הפרויקט (לסוכן חדש)

- **לפני כל push:** להריץ `npm run check:previews`, `npm run build` ו־`npm run build:artifact`. אם משהו בממשק השתנה, לפרסם מחדש את ה־artifact.
- **לאמת בדפדפן ולא להניח.** בפרויקט הזה שימשו Playwright ו־Chromium לצילומי מסך, לבדיקת גלילה ולמדידת CLS (`PerformanceObserver` מסוג `layout-shift`), ו־curl לבדיקת האתר החי אחרי deploy. deploy ב־Vercel לוקח כשתי דקות.
- **שתי שפות תמיד יחד:**
  - כל טקסט ממשק חדש נכנס ל־`STRINGS.en` וגם ל־`STRINGS.he` (`src/lib/i18n.js`).
  - כל פריט חדש מקבל שורה ב־`he.json`.
  - כל קטגוריה או סגנון חדשים נכנסים ל־`labels.js` ול־`seo-content.js`.
- **עברית:**
  - לשמור על החוקים בסעיף 4 ולא להוסיף tracking, uppercase או italic לטקסט עברי.
  - ניסוח ניטרלי מגדרית.
  - לבדוק שהתרגום לא מביך.
- **אחרי שינוי גופנים או לוגו:** להריץ מחדש את `scripts/brand/`, כדי שקבצי הלוגו יתאימו לאתר.
- **Git:**
  - העבודה נעשית ישירות על `main`.
  - הודעות commit בסגנון `feat(…)` / `fix(…)` / `chore(…)`.
  - הבוט היומי דוחף בשם `vault-bot`, ולכן לעשות `git pull` לפני עבודה.
- **בטיחות:** לא להזין סיסמאות או מפתחות API בשום טופס. הגדרות ב־Vercel, ב־GitHub או ב־Search Console מבצע עידו בעצמו, או סוכן באישור מפורש שלו לכל פעולה.

---

## 9. משימות פתוחות ורעיונות להמשך

**חשוב ודחוף:**
1. **Google Search Console:** להוסיף את הנכס, לשים את קוד האימות ב־Vercel כ־`GOOGLE_SITE_VERIFICATION` ולהגיש את `/sitemap.xml`. בלי זה גוגל ימצא את האתר לאט. Bing Webmaster הוא אופציונלי ויכול לייבא מ־Search Console.
2. **`LEAD_WEBHOOK_URL`:** כרגע פניות מהטופס נכתבות רק ללוג של Vercel ו**לא מגיעות לאף אחד**. צריך לחבר יעד כמו Zapier, Make, Formspree, מייל או CRM.
3. **חלון התוכן היומי** מסתיים ב־17 באוקטובר 2026. להחליט אם להאריך.

**חשוב:**
4. **דומיין משלכם** (למשל specimen.design או specimendesign.co.il): עדיף ל־SEO ולאמינות מכתובת vercel.app. אחרי החיבור צריך לעדכן את `PRODUCTION_URL` ב־`src/lib/site.js`.
5. **קישורים חיצוניים:** Product Hunt, Reddit (r/web_design, r/ClaudeAI), קבוצות עיצוב ישראליות ושיתופים באינסטגרם. זה הגורם החזק ביותר לדירוג.
6. **מנוע Claude לתוכן היומי** (`ANTHROPIC_API_KEY`): בלעדיו התוכן החדש חד־גוני (Warm Editorial בלבד) ואין אתרים מלאים חדשים.
7. **פרטי קשר באתר:** המייל העסקי admin@specimendesign.org עדיין לא מופיע באתר (הוא מופיע רק כאן). אפשר להוסיף אותו לפוטר ולסכמת ה־Organization, וגם להפנות אליו את פניות הטופס (סעיף 2 למעלה). טלפון או וואטסאפ עדיין לא נמסרו.
14. **הדומיין specimendesign.org:** רשום ב־Squarespace, והמייל העסקי יושב עליו. **צעד נוכחי:** להשלים את אימות הדומיין ב־Google Workspace (רשומת TXT ב־DNS של Squarespace, או אימות אוטומטי דרך התחברות ל־Squarespace מתוך אשף ההגדרה של Google), ואז רשומות MX והפעלת Gmail, ובהמשך SPF, DKIM ו־DMARC. אחרי זה הדומיין מועמד טבעי לכתובת האתר במקום specimen-designs.vercel.app (ראו משימה 4). שינויי DNS לאתר צריכים לשמור על רשומות המייל.

**שיפורים:**
8. גרסאות נוספות של סרטון האינסטגרם: 4:5 או 1:1 לפיד, ו/או גרסה בעברית. הסקריפט `scripts/brand/record-reel.py` מוכן להתאמה.
9. תמונות OG בעברית עם טקסט עברי. צריך פתרון שתומך ב־RTL.
10. הקטנת ה־HTML של דף הבית, למשל טעינת נתוני הפריטים בחלקים.
11. מחולל יומי שכותב גם `he.json`.
12. שינוי שם המאגר ופרויקט Vercel מ־`anti-ai-ui-vault` לשם החדש. לא חובה, ויש לבדוק השפעה על חיבור ה־Git ב־Vercel.
13. תוכן לאינסטגרם: בביצוע, ראו סעיף 10.

---

## 10. רשתות חברתיות

### אינסטגרם (@specimen.design) — התחיל ב־11 באוקטובר 2026

- **מי מנהל:** Claude, כמנהל הרשתות של העסק, עם חופש יצירתי מלא מעידו. כל פרסום בפועל רק באישור מפורש של עידו לכל פוסט.
- **שפה:** אנגלית.
- **כלי פרסום:** Meta Business Suite (תזמון פוסטים, רילסים וסטוריז מהמחשב).
- **קצב:** פוסט אחד ביום, וסטוריז לכל פוסט.
- **מטרה:** להציג את העיצובים מהספרייה ולהזמין לבקר באתר; מדי פעם לקדם את שירות בניית האתרים.
- **סוגי תוכן:**
  1. רילסים: הקלטות של אתרים מלאים ורכיבים מונפשים שרצים חי.
  2. קרוסלות לפי קטגוריה או סגנון (למשל "6 hero sections").
  3. קרוסלה של עיצוב בודד מכמה זוויות (דסקטופ, מובייל, תקריב, פרומפט).
  4. פוסטים על שירות בניית האתרים והמבצע (70% עד 30.11.2026).
  5. גרסת סטורי (9:16) לכל פוסט, עם קישור לאתר.
- **מפרטים:** פיד 1080×1350 (4:5), רילס וסטורי 1080×1920. קריאה לפעולה: "Link in bio" / קישור בסטורי.
- **קבצים:** חבילות התוכן נשמרות במאגר תחת `social/instagram/` (תאריך, קבצים, כיתוב, האשטגים).
- **לבדוק:** תאריך סיום המבצע (30.11) מופיע בכל פוסט מבצע; אחריו לא מפרסמים אותו.
- **בהמשך:** אותו תוכן יותאם לרשתות נוספות.

---

## יומן שינויים

| תאריך | שינוי |
|---|---|
| 2026-10-10 | הקמת האתר (Anti-AI UI Vault), Artifact, עלייה ל־Vercel, מגוון סגנונות, אתרים מלאים, אנגלית ועברית, שינוי שם ל־Specimen Design וכתובת specimen-designs.vercel.app, שדרוג SEO בשתי השפות |
| 2026-10-11 | תיקוני גלילה ו־CLS; קבצי לוגו ואייקון חדש; תמונות 1200×628; שדרוג טיפוגרפיה ותוכן בעברית; סרטון "איך זה עובד" לאינסטגרם; קישור לאינסטגרם @specimen.design באתר; יצירת המסמך הזה |
| 2026-10-11 | נוסף המייל העסקי admin@specimendesign.org; נקבעה ההוראה הקבועה לעדכן את המסמך בכל שינוי חשוב (סעיף 0) |
| 2026-10-11 | הדומיין specimendesign.org (לא specimen.org) מנוהל ב־Squarespace; אימות מול Google Workspace עדיין לא הושלם (סעיף 2, משימה 14) |
| 2026-10-11 | התחלת ניהול אינסטגרם: אנגלית, Meta Business Suite, פוסט ביום + סטוריז; מבצע 70% על בנייה וליווי עד 30.11.2026 (סעיפים 2, 10) |
