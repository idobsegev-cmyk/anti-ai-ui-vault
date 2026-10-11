// Guide 4 — target: "website design style prompts" / "brutalist website prompt" / "פרומפט לעיצוב אתר"
export default {
  slug: "website-style-prompts",
  date: "2026-10-11",
  related: ["claude-prompt-for-website-design", "make-ai-website-not-look-ai", "build-landing-page-with-claude"],
  designs: ["loudmouth-agency-website", "caf-bauhaus-website", "kanso-architects-website", "nocturne-hotel-website", "overprint-zine-fair-website"],
  en: {
    keyword: "website design style prompts / brutalist website prompt",
    title: "Website Design Style Prompts for Claude: Brutalist, Bauhaus, Swiss and More",
    h1: "Website design style prompts for Claude",
    description: "Copy-ready style blocks for eight website design styles: neo-brutalist, Bauhaus, Swiss, Japanese minimal, luxury noir, retro 70s, claymorphism and risograph. Colors, type and rules.",
    kicker: "Style prompts",
    short: "Prompts by design style",
    intro: "Writing “make it brutalist” gets you a few thick borders on an otherwise generic page. A style is a set of rules, and Claude follows rules well when you spell them out. Below are eight styles, each with a block you can paste into any website prompt.",
    body: [
      ["h2", "Why a style name is not enough"],
      ["p", "Style names are fuzzy. “Minimal” can mean Apple, Muji or an empty page. “Brutalist” has meant raw concrete, unstyled HTML and loud pink stickers. Given only a name, Claude averages all of those meanings and returns the safe middle."],
      ["p", "The fix is to translate the name into decisions: a palette with hex values, a type pairing, a border and shadow rule, a layout rule and a short ban list. That is the structure of every block below. Paste one near the top of your prompt, then add your content. The full prompt anatomy is in [how to write a Claude prompt for a website](/guides/claude-prompt-for-website-design)."],
      ["h2", "1. Neo-brutalist"],
      ["p", "Thick black outlines, hard offset shadows, flat saturated color and type that shouts. It suits agencies, events and anyone who wants to be remembered. The [neo-brutalist style page](/styles/neo-brutalist) collects live examples, and the [Loudmouth agency site](/vault/loudmouth-agency-website) shows a full page."],
      ["code", "Neo-brutalist style block", `STYLE: neo-brutalist.
COLORS: paper #FFFDF5, ink #111111, accents #FF5C39 and #3D5AFE, one flat color per section.
TYPE: huge grotesk headlines (clamp 3rem to 9rem), tight leading, mono for labels.
RULES: 3px solid black borders, hard shadows 6px 6px 0 #111 with no blur, square or lightly rounded corners, hover moves the element 2px and shrinks the shadow.
AVOID: gradients, glass, soft shadows, stock icons.`],
      ["h2", "2. Bauhaus"],
      ["p", "Primary colors, circles, squares and triangles, and a strict grid. It works for cafes, schools and cultural venues. See the [Bauhaus style page](/styles/bauhaus) and the [Cafe Bauhaus website](/vault/caf-bauhaus-website)."],
      ["code", "Bauhaus style block", `STYLE: Bauhaus.
COLORS: off-white #F4EFE6, black, red #D6322B, yellow #F2B705, blue #1F4E9E. Nothing else.
TYPE: geometric sans in bold and light, all lowercase headlines, set flush left.
RULES: build visuals only from circles, squares and triangles; align everything to a 12-column grid; use diagonals and rotated 90-degree blocks for rhythm.
AVOID: photos with effects, rounded cards, drop shadows.`],
      ["h2", "3. Swiss International"],
      ["p", "Grid, whitespace, one typeface and a single accent. It reads as credible, which is why it fits consultants, software and law. See the [Swiss International style page](/styles/swiss-international)."],
      ["code", "Swiss style block", `STYLE: Swiss International.
COLORS: white, black, one red accent #E30613 used on at most one element per screen.
TYPE: one neo-grotesk family, three sizes only, headlines flush left and ragged right.
RULES: 12-column grid with visible alignment, generous margins, thin 1px rules between sections, numbered sections.
AVOID: decoration, icons, more than one accent color.`],
      ["h2", "4. Japanese minimal"],
      ["p", "Quiet, warm and slow, with space doing most of the work. It suits architects, ceramics and wellness. See the [Japanese minimal style page](/styles/japanese-minimal) and [Kanso Architects](/vault/kanso-architects-website)."],
      ["code", "Japanese minimal style block", `STYLE: Japanese minimal (kanso).
COLORS: washi #F2EEE6, charcoal #2B2B2B, moss #6B705C as the only accent.
TYPE: light serif for headlines, small sans for body, generous letter spacing on small labels.
RULES: at least 120px between sections, one image per screen, vertical text for one decorative label, motion limited to slow 600ms fades.
AVOID: bright colors, dense grids, bounce animations.`],
      ["h2", "5. Luxury noir"],
      ["p", "Near-black backgrounds, a metallic accent and elegant serif type. It fits hotels, restaurants and jewelry. See the [luxury noir style page](/styles/luxury-noir) and the [Nocturne hotel website](/vault/nocturne-hotel-website)."],
      ["code", "Luxury noir style block", `STYLE: luxury noir.
COLORS: background #0B0B0C, text #EDE8DF, gold #B8975A for lines and small details only.
TYPE: high-contrast serif for headlines at large size, small caps sans for navigation.
RULES: hairline 1px gold dividers, full-bleed dark photography, slow parallax at most, buttons as outlined rectangles.
AVOID: neon, glow effects, gradients, rounded pill buttons.`],
      ["h2", "6. Retro 70s"],
      ["p", "Warm browns and oranges, fat rounded type and sunset stripes. It suits food, music and lifestyle brands. See the [retro 70s style page](/styles/retro-70s)."],
      ["code", "Retro 70s style block", `STYLE: retro 70s.
COLORS: cream #F6E7C8, brown #5A2E1B, orange #E8702A, mustard #E3A72F, teal #2A7F7B.
TYPE: soft heavy display serif or rounded sans, tight leading.
RULES: concentric stripe bands as dividers, rounded corners 24px, sun and arch shapes, subtle paper grain.
AVOID: pure black, cold blues, sharp corners.`],
      ["h2", "7. Claymorphism"],
      ["p", "Soft, inflated, toy-like shapes with inner highlights. It suits kids, apps and playful products. See the [claymorphism style page](/styles/claymorphism)."],
      ["code", "Claymorphism style block", `STYLE: claymorphism.
COLORS: pastel background #EEF0FF, shapes in peach, mint and lilac, text #2A2A40.
TYPE: rounded sans, bold weights, friendly sentence-case headlines.
RULES: radius 28px or more, double shadow (outer soft plus inner highlight), buttons that squish on press, no hard borders.
AVOID: sharp edges, flat black, dense text blocks.`],
      ["h2", "8. Risograph zine"],
      ["p", "Two or three overprinted inks, grain and misregistration. It works for events, publishers and creative studios. See the [risograph zine style page](/styles/risograph-zine) and the [Overprint zine fair website](/vault/overprint-zine-fair-website)."],
      ["code", "Risograph style block", `STYLE: risograph zine.
COLORS: paper #F5F0E6, fluorescent pink #FF48B0, blue #0078BF, overlap areas use multiply blend.
TYPE: chunky grotesk plus a typewriter mono for captions.
RULES: halftone dot textures, shapes offset 3px to fake misregistration, uneven hand-cut edges, two inks per section at most.
AVOID: smooth gradients, glass, perfect alignment.`],
      ["h2", "How to combine and adapt styles"],
      ["ul", [
        "Pick one style for structure. Borrow at most one detail from another, such as a mono font for labels.",
        "Swap the accent color to match the brand and keep the rest of the block.",
        "Ask for two variants of the hero only, compare them, then build the page.",
        "If the result drifts, paste the block again and say which rule was broken.",
      ]],
      ["p", "More tips on avoiding generic output are in [how to make an AI website not look AI](/guides/make-ai-website-not-look-ai). To see each style running live, browse the [website designs](/designs/website-designs), and every design page includes the prompt behind it."],
    ],
    faq: [
      ["What is the best prompt for a brutalist website?", "Name the style, then give hard rules: black outlines of 3px, hard offset shadows with no blur, two or three flat accent colors and oversized grotesk type. A ban list for gradients and soft shadows keeps Claude from drifting."],
      ["Can I combine two design styles on one page?", "Rarely well. Choose one style for the structure and borrow a single detail from another, for example a mono font for labels."],
      ["Which style converts best for a small business?", "There is no single winner. Swiss International is the safest for credibility and clarity, while bolder styles like brutalism or Bauhaus help when standing out matters more."],
    ],
  },
  he: {
    keyword: "פרומפט לעיצוב אתר / סגנונות עיצוב אתרים",
    title: "פרומפט לעיצוב אתר לפי סגנון: ברוטליסט, באוהאוס, שוויצרי ועוד",
    h1: "פרומפט לעיצוב אתר לפי סגנון",
    description: "בלוקים מוכנים להעתקה לשמונה סגנונות עיצוב אתרים: ניאו-ברוטליסט, באוהאוס, שוויצרי, מינימליזם יפני, נואר יוקרתי, רטרו 70, קליימורפיזם וריזוגרף. צבעים, טיפוגרפיה וכללים.",
    kicker: "פרומפטים לפי סגנון",
    short: "פרומפטים לפי סגנון עיצוב",
    intro: "כתיבה של „תעשה את זה ברוטליסטי” מניבה כמה מסגרות עבות על עמוד גנרי. סגנון הוא אוסף כללים, ו-Claude מקיים כללים היטב כשמפרטים אותם. כאן שמונה סגנונות עיצוב אתרים, ולכל אחד בלוק שאפשר להדביק בכל פרומפט.",
    body: [
      ["h2", "למה שם של סגנון לא מספיק"],
      ["p", "שמות של סגנונות הם מושגים עמומים. „מינימלי” יכול להיות אפל, מוג׳י או עמוד ריק. „ברוטליסטי” היה בטון חשוף, HTML בלי עיצוב וסטיקרים ורודים. כשנותנים ל-Claude רק שם, הוא ממצע את כל המשמעויות ומחזיר את האמצע הבטוח."],
      ["p", "הפתרון הוא לתרגם את השם להחלטות: פלטה עם קודי צבע, זוג גופנים, כלל למסגרות וצללים, כלל לפריסה ורשימה קצרה של דברים אסורים. זה המבנה של כל בלוק כאן. מדביקים בלוק בתחילת הפרומפט ואז מוסיפים תוכן. המבנה המלא של פרומפט מופיע במדריך [איך כותבים פרומפט ל-Claude לעיצוב אתר](/guides/claude-prompt-for-website-design)."],
      ["h2", "1. ניאו-ברוטליסט"],
      ["p", "קווי מתאר שחורים עבים, צללים קשיחים בהיסט, צבע שטוח רווי וטיפוגרפיה שצועקת. מתאים לסוכנויות, אירועים ולמי שרוצה להיזכר. בעמוד [סגנון ניאו-ברוטליסט](/styles/neo-brutalist) יש דוגמאות חיות, ו[אתר סוכנות Loudmouth](/vault/loudmouth-agency-website) מציג עמוד שלם."],
      ["code", "בלוק ניאו-ברוטליסט", `STYLE: neo-brutalist.
COLORS: paper #FFFDF5, ink #111111, accents #FF5C39 and #3D5AFE, one flat color per section.
TYPE: huge grotesk headlines (clamp 3rem to 9rem), tight leading, mono for labels.
RULES: 3px solid black borders, hard shadows 6px 6px 0 #111 with no blur, square or lightly rounded corners, hover moves the element 2px and shrinks the shadow.
AVOID: gradients, glass, soft shadows, stock icons.`],
      ["h2", "2. באוהאוס"],
      ["p", "צבעי יסוד, עיגולים, ריבועים ומשולשים, ורשת קפדנית. עובד יפה לבתי קפה, בתי ספר ומוסדות תרבות. ראו את עמוד [סגנון באוהאוס](/styles/bauhaus) ואת [אתר Cafe Bauhaus](/vault/caf-bauhaus-website)."],
      ["code", "בלוק באוהאוס", `STYLE: Bauhaus.
COLORS: off-white #F4EFE6, black, red #D6322B, yellow #F2B705, blue #1F4E9E. Nothing else.
TYPE: geometric sans in bold and light, all lowercase headlines, set flush left.
RULES: build visuals only from circles, squares and triangles; align everything to a 12-column grid; use diagonals and rotated 90-degree blocks for rhythm.
AVOID: photos with effects, rounded cards, drop shadows.`],
      ["h2", "3. שוויצרי (Swiss International)"],
      ["p", "רשת, מרווחים ריקים, משפחת גופנים אחת וצבע הדגשה יחיד. הסגנון משדר אמינות, ולכן הוא מתאים ליועצים, לתוכנה ולמשרדי עורכי דין. ראו את עמוד [הסגנון השוויצרי](/styles/swiss-international)."],
      ["code", "בלוק סגנון שוויצרי", `STYLE: Swiss International.
COLORS: white, black, one red accent #E30613 used on at most one element per screen.
TYPE: one neo-grotesk family, three sizes only, headlines flush left and ragged right.
RULES: 12-column grid with visible alignment, generous margins, thin 1px rules between sections, numbered sections.
AVOID: decoration, icons, more than one accent color.`],
      ["h2", "4. מינימליזם יפני"],
      ["p", "שקט, חם ואיטי, והחלל עושה את רוב העבודה. מתאים לאדריכלים, לקרמיקה ולבריאות. ראו את עמוד [מינימליזם יפני](/styles/japanese-minimal) ואת [Kanso Architects](/vault/kanso-architects-website)."],
      ["code", "בלוק מינימליזם יפני", `STYLE: Japanese minimal (kanso).
COLORS: washi #F2EEE6, charcoal #2B2B2B, moss #6B705C as the only accent.
TYPE: light serif for headlines, small sans for body, generous letter spacing on small labels.
RULES: at least 120px between sections, one image per screen, vertical text for one decorative label, motion limited to slow 600ms fades.
AVOID: bright colors, dense grids, bounce animations.`],
      ["h2", "5. נואר יוקרתי"],
      ["p", "רקעים כמעט שחורים, הדגשה מתכתית וגופן סריף אלגנטי. מתאים למלונות, למסעדות ולתכשיטים. ראו את עמוד [נואר יוקרתי](/styles/luxury-noir) ואת [אתר מלון Nocturne](/vault/nocturne-hotel-website)."],
      ["code", "בלוק נואר יוקרתי", `STYLE: luxury noir.
COLORS: background #0B0B0C, text #EDE8DF, gold #B8975A for lines and small details only.
TYPE: high-contrast serif for headlines at large size, small caps sans for navigation.
RULES: hairline 1px gold dividers, full-bleed dark photography, slow parallax at most, buttons as outlined rectangles.
AVOID: neon, glow effects, gradients, rounded pill buttons.`],
      ["h2", "6. רטרו שנות ה-70"],
      ["p", "חומים וכתומים חמים, אותיות עבות ועגולות ופסי שקיעה. מתאים למזון, למוזיקה ולמותגי לייפסטייל. ראו את עמוד [רטרו 70](/styles/retro-70s)."],
      ["code", "בלוק רטרו 70", `STYLE: retro 70s.
COLORS: cream #F6E7C8, brown #5A2E1B, orange #E8702A, mustard #E3A72F, teal #2A7F7B.
TYPE: soft heavy display serif or rounded sans, tight leading.
RULES: concentric stripe bands as dividers, rounded corners 24px, sun and arch shapes, subtle paper grain.
AVOID: pure black, cold blues, sharp corners.`],
      ["h2", "7. קליימורפיזם"],
      ["p", "צורות רכות, מנופחות ודמויות צעצוע, עם הארה פנימית. מתאים לילדים, לאפליקציות ולמוצרים שובבים. ראו את עמוד [קליימורפיזם](/styles/claymorphism)."],
      ["code", "בלוק קליימורפיזם", `STYLE: claymorphism.
COLORS: pastel background #EEF0FF, shapes in peach, mint and lilac, text #2A2A40.
TYPE: rounded sans, bold weights, friendly sentence-case headlines.
RULES: radius 28px or more, double shadow (outer soft plus inner highlight), buttons that squish on press, no hard borders.
AVOID: sharp edges, flat black, dense text blocks.`],
      ["h2", "8. ריזוגרף (פנזין)"],
      ["p", "שניים או שלושה צבעי דיו שנדפסים זה על זה, גרעיניות וסטייה קלה בהתאמה. עובד לאירועים, להוצאות ספרים ולסטודיואים יצירתיים. ראו את עמוד [ריזוגרף פנזין](/styles/risograph-zine) ואת [אתר Overprint Zine Fair](/vault/overprint-zine-fair-website)."],
      ["code", "בלוק ריזוגרף", `STYLE: risograph zine.
COLORS: paper #F5F0E6, fluorescent pink #FF48B0, blue #0078BF, overlap areas use multiply blend.
TYPE: chunky grotesk plus a typewriter mono for captions.
RULES: halftone dot textures, shapes offset 3px to fake misregistration, uneven hand-cut edges, two inks per section at most.
AVOID: smooth gradients, glass, perfect alignment.`],
      ["p", "הבלוקים נכתבים באנגלית בכוונה: Claude מבצע הוראות עיצוב באנגלית בדיוק רב יותר, והתוכן של האתר עצמו אפשר לבקש בעברית."],
      ["h2", "איך משלבים ומתאימים סגנונות"],
      ["ul", [
        "בוחרים סגנון אחד למבנה ולוקחים לכל היותר פרט אחד מסגנון אחר, למשל גופן מונו לתוויות.",
        "מחליפים את צבע ההדגשה לצבע המותג ומשאירים את שאר הבלוק.",
        "מבקשים שתי גרסאות של אזור הפתיחה בלבד, משווים, ורק אז בונים את העמוד.",
        "אם התוצאה סוטה, מדביקים את הבלוק שוב ומציינים איזה כלל נשבר.",
      ]],
      ["p", "עוד טיפים נגד פלט גנרי יש במדריך [איך גורמים לאתר AI לא להיראות כמו AI](/guides/make-ai-website-not-look-ai). כדי לראות כל סגנון רץ חי, עיינו ב[עיצובי האתרים](/designs/website-designs). בכל עמוד עיצוב מופיע הפרומפט שמאחוריו."],
    ],
    faq: [
      ["מהו הפרומפט הטוב ביותר לאתר ברוטליסטי?", "נותנים שם לסגנון ואז כללים קשיחים: מסגרות שחורות של 3 פיקסלים, צללים קשיחים בלי טשטוש, שניים-שלושה צבעי הדגשה שטוחים וגופן גרוטסק ענק. רשימת איסורים על גרדיאנטים וצללים רכים מונעת מ-Claude לסטות."],
      ["אפשר לשלב שני סגנונות בעמוד אחד?", "רק לעיתים רחוקות וזה עובד היטב. בוחרים סגנון אחד למבנה ולוקחים ממנו פרט אחד מסגנון אחר, למשל גופן מונו לתוויות."],
      ["איזה סגנון הכי מתאים לעסק קטן?", "אין מנצח אחד. הסגנון השוויצרי הכי בטוח לאמינות ובהירות, וסגנונות נועזים כמו ברוטליזם או באוהאוס עוזרים כשחשוב יותר לבלוט."],
    ],
  },
};
