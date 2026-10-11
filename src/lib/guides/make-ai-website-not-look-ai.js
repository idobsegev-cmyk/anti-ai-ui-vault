// Guide 2 — target: "how to make an AI website not look AI" / "אתר שנבנה עם AI שלא נראה כמו AI"
export default {
  slug: "make-ai-website-not-look-ai",
  date: "2026-10-11",
  related: ["claude-prompt-for-website-design", "website-style-prompts", "small-business-website-with-ai"],
  designs: ["loudmouth-agency-website", "nocturne-hotel-website", "overprint-zine-fair-website"],
  en: {
    keyword: "how to make an AI website not look AI",
    title: "How to Make an AI-Built Website Not Look AI-Generated",
    h1: "How to make an AI-built website not look AI-generated",
    description: "Why AI websites all look alike, and nine concrete design rules (with prompt snippets) to make a Claude-built site feel hand-made: palette, type, shadows, layout and motion.",
    kicker: "Design principles",
    short: "Avoid the AI look",
    intro: "People can spot an AI-generated website in about a second: purple gradient, glassy cards, three icons in a row, a headline about “unlocking your potential.” None of it is caused by AI itself. It comes from defaults. Change the defaults and the look goes away.",
    body: [
      ["h2", "What the “AI look” actually is"],
      ["p", "It helps to name the pattern before fighting it. Most generated sites share the same handful of choices:"],
      ["ul", [
        "A blue-to-purple gradient behind a centered headline.",
        "Frosted glass cards with soft blurred shadows (glassmorphism).",
        "Neon glows, especially on dark backgrounds.",
        "Three feature cards with generic line icons.",
        "Every corner rounded the same, every section padded the same.",
        "Inter or a similar neutral sans, one weight, everywhere.",
        "Fade-in animation on every block as you scroll.",
        "Copy that could belong to any company: “Elevate your workflow.”",
      ]],
      ["p", "Each of these is the statistically safest answer to an open question. Put them together and you get a site that looks like ten thousand others. The rules below close those questions one by one."],

      ["h2", "1. Pick a real-world reference"],
      ["p", "Designers rarely start from “modern.” They start from something physical: a printed poster, a museum label, a restaurant menu, a field guide. Give Claude a reference like that in the first line of the prompt. It pulls every later choice in one direction."],
      ["code", "Concept lines that work", `It should feel like a printed protest poster that also works as a website.
It should read like a museum wall label: quiet, exact, a lot of white space.
It should feel like an evening: dark, expensive, unhurried.
It should look like a risograph-printed zine, slightly misregistered.`],
      ["p", "Compare [Loudmouth Agency](/vault/loudmouth-agency-website) and [Nocturne Hotel](/vault/nocturne-hotel-website): both started from one sentence like these."],

      ["h2", "2. Use a warm or committed palette, with hex values"],
      ["p", "Pure white and saturated blue are what you get when nobody chooses. Choose. A warm off-white (#FAF9F6), near-black ink (#121212) and one accent color already look more considered than any gradient. Or commit fully to a style palette: acid yellow and black for brutalism, washi paper and vermilion for Japanese minimal."],
      ["p", "Then limit the accent. “Terracotta only on the primary button and one underline” is a design decision. Accent everywhere is decoration."],

      ["h2", "3. Ban the defaults explicitly"],
      ["p", "Claude follows exclusions reliably, so write them down. This block is worth adding to any prompt:"],
      ["code", "Anti-AI ban list", `AVOID:
- Gradients (except soft vignettes on image placeholders).
- Glassmorphism, backdrop blur, frosted cards.
- Neon glow, colored drop shadows, cyberpunk styling.
- Generic three-card feature rows with line icons.
- Fade-in-on-scroll for every section.
- Stock phrases like "elevate", "unlock", "seamless", "next-level".`],

      ["h2", "4. Make typography do the work"],
      ["p", "Generated sites use one sans-serif at one weight. Hand-made sites have a type system: a display face with character, a quiet body face, and often a mono or serif for labels and accents. Specify all three, with weights and sizes, and let the headline be big. A 9rem headline with tight tracking says more than any illustration."],
      ["code", "Type system snippet", `TYPE:
- Display: Instrument Sans 700, tracking -0.04em, headline at clamp(3rem, 8vw, 7rem).
- Accent: Instrument Serif italic for one word per headline.
- Labels: JetBrains Mono 11px uppercase, tracking 0.16em.
- Body: 17px, line-height 1.6, max width 65ch.`],

      ["h2", "5. Hard shadows and hairlines instead of blur"],
      ["p", "Soft blurred shadows are the fingerprint of UI kits. Print has no blur. Use 1px hairlines to divide sections and hard offset shadows (a solid copy of the shape, shifted 3–8px) for things you can press. It instantly reads as graphic design rather than software."],
      ["code", "Shadow and line rules", `DETAILS:
- Section dividers: 1px solid #121212 hairlines, full width.
- Buttons and cards: 1px border, hard offset shadow 3px 3px 0 #121212, no blur.
- Corner radius: square, or one radius used everywhere (no mix).`],

      ["h2", "6. Break the grid once, on purpose"],
      ["p", "Templates center everything. Use a 12-column grid and place things asymmetrically: headline across seven columns, intro in the remaining five, aligned to the bottom. Let one element break out: a rotated sticker, an oversized number, a vertical caption. One deliberate break per page is enough. Ten is noise."],

      ["h2", "7. Motion with physics, used sparingly"],
      ["p", "Fades everywhere feel automated. Pick two or three moments and give them physical motion: a button that squishes when pressed, cards that tilt toward the cursor, a headline word that swaps with a spring. Specify spring values and animate only transform and opacity. The [animated buttons](/designs/animated-buttons) and [kinetic typography](/designs/kinetic-typography) collections are full of examples with their exact settings."],

      ["h2", "8. Write real copy before you design"],
      ["p", "Nothing gives a site away faster than vague copy. Write the actual headline, the actual prices, the actual opening hours, and put them in the prompt. Specific words (“Open from 7. Closed Saturdays.”) make the design specific too, because Claude lays out what is really there."],

      ["h2", "9. Add one detail nobody asked for"],
      ["p", "Hand-made sites have small surprises: a ticker strip, a hand-drawn underline, a page number in the corner, a cursor that leaves ink. These details cost one line in a prompt and are the part visitors remember. Browse the [hero sections](/designs/hero-sections) for ideas."],

      ["h2", "Before and after: the same request, rewritten"],
      ["p", "Here is a typical prompt, followed by the same request with the rules applied. The second is longer, but every extra line removes a default."],
      ["code", "Before", `Make a modern, beautiful website for my yoga studio with a hero, classes, pricing and contact. Use nice animations.`],
      ["code", "After", `Build a one-page website for "Ashtanga Lab", a small yoga studio in a converted print shop.

CONCEPT: It should feel like a printed class timetable pinned to a cork board: calm, exact, a little analog.

SECTIONS: hero with the headline "Practice, not performance." and this week's timetable beside it; three class types with level and length; prices (drop-in $18, 10 classes $150); a short note from the teacher; address and hours.

DESIGN: paper #F6F2EA, ink #1A1A1A, one terracotta accent #C4502F only on buttons and today's column. Display: Instrument Sans 700, tracking -0.04em. Labels: JetBrains Mono 11px uppercase. 1px hairlines, hard 3px 3px 0 shadows, square corners.

MOTION: today's column slides in with a spring; buttons press into their shadow. Nothing else moves.

AVOID: gradients, glassmorphism, neon, icon cards, fade-in on every section, stock phrases.`],
      ["p", "The first prompt leaves about thirty decisions to chance. The second makes them all, and the result looks like a studio with a point of view."],

      ["h2", "Putting it together"],
      ["p", "You do not need all nine rules on every page. A reference, a fixed palette, a ban list and a real type system already move a site out of the template look. Add hard shadows and one piece of physical motion and most people will assume a designer built it."],
      ["p", "Every design in the [Specimen library](/designs/website-designs) was built with these rules. Open one, read its prompt, and you will see each principle written out."],
    ],
    faq: [
      ["Why do AI-generated websites all look the same?", "Because open questions in a prompt get the most common answer: gradient hero, glass cards, three icons, neutral sans-serif. The sameness comes from defaults, not from the model's ability."],
      ["Is glassmorphism bad?", "Not in itself, but heavy blur and frosted cards have become a signature of generated UI. Used everywhere, it makes a site look like a template."],
      ["Which design styles look least like AI?", "Styles with strong, specific rules: neo-brutalism, Bauhaus, Swiss International, Japanese minimal, risograph zine and warm editorial. Their constraints leave little room for defaults."],
    ],
  },
  he: {
    keyword: "אתר שנבנה עם AI שלא נראה כמו AI",
    title: "איך גורמים לאתר שנבנה עם AI לא להיראות כמו AI",
    h1: "איך גורמים לאתר שנבנה עם AI לא להיראות כמו AI",
    description: "למה כל אתרי ה-AI נראים אותו דבר, ותשעה כללי עיצוב מעשיים, עם קטעי פרומפט, שהופכים אתר שנבנה עם Claude לאתר שנראה עשוי ביד.",
    kicker: "עקרונות עיצוב",
    short: "אתר AI שלא נראה כמו AI",
    intro: "אתר שנבנה עם AI מזהים תוך שנייה: גרדיאנט סגול, כרטיסים מזכוכית, שלושה אייקונים בשורה וכותרת על „לממש את הפוטנציאל”. שום דבר מזה לא נובע מה-AI עצמו. הוא נובע מברירות מחדל. משנים אותן, והמראה נעלם.",
    body: [
      ["h2", "מה זה בעצם „המראה של AI”"],
      ["p", "כדאי לתת לדפוס שם לפני שנלחמים בו. רוב האתרים שנוצרים אוטומטית חולקים אותן בחירות:"],
      ["ul", [
        "גרדיאנט מכחול לסגול מאחורי כותרת ממורכזת.",
        "כרטיסי זכוכית חלבית עם צל רך ומטושטש (Glassmorphism).",
        "זוהר ניאון, במיוחד על רקע כהה.",
        "שלושה כרטיסי יתרונות עם אייקוני קו גנריים.",
        "אותו רדיוס לכל פינה, אותו ריווח לכל מקטע.",
        "גופן Sans ניטרלי במשקל אחד, בכל מקום.",
        "כל בלוק נכנס ב־fade בזמן הגלילה.",
        "טקסט שמתאים לכל חברה: „להזניק את העסק לשלב הבא”.",
      ]],
      ["p", "כל אחת מהבחירות האלה היא התשובה הבטוחה ביותר לשאלה פתוחה. ביחד הן יוצרות אתר שנראה כמו עשרת אלפים אחרים. הכללים הבאים סוגרים את השאלות האלה אחת אחת."],

      ["h2", "1. בוחרים דימוי מהעולם האמיתי"],
      ["p", "מעצבים כמעט אף פעם לא מתחילים מ„מודרני”. הם מתחילים ממשהו מוחשי: כרזה, שלט במוזיאון, תפריט של מסעדה, מדריך שדה. משפט כזה בתחילת הפרומפט מושך כל החלטה שבאה אחריו לאותו כיוון."],
      ["code", "שורות רעיון שעובדות", `It should feel like a printed protest poster that also works as a website.
It should read like a museum wall label: quiet, exact, a lot of white space.
It should feel like an evening: dark, expensive, unhurried.
It should look like a risograph-printed zine, slightly misregistered.`],
      ["p", "אפשר להשוות בין [Loudmouth Agency](/vault/loudmouth-agency-website) ל[Nocturne Hotel](/vault/nocturne-hotel-website): שניהם התחילו ממשפט אחד כזה."],

      ["h2", "2. פלטה חמה או מחויבת, בקודי hex"],
      ["p", "לבן טהור וכחול רווי הם מה שמתקבל כשאף אחד לא בוחר. אז בוחרים. לבן שבור וחם (‎#FAF9F6), שחור דיו (‎#121212) וצבע הדגשה אחד כבר נראים מחושבים יותר מכל גרדיאנט. או מתחייבים עד הסוף לפלטה של סגנון: צהוב חומצי ושחור לברוטליזם, נייר וואשי ואדום ורמיליון למינימליזם יפני."],
      ["p", "ואז מגבילים את צבע ההדגשה. „טרקוטה רק בכפתור הראשי ובקו תחתון אחד” היא החלטת עיצוב. הדגשה בכל מקום היא קישוט."],

      ["h2", "3. אוסרים במפורש את ברירות המחדל"],
      ["p", "Claude מקפיד על החרגות, אז כדאי לכתוב אותן. את הבלוק הזה אפשר להוסיף לכל פרומפט:"],
      ["code", "רשימת איסורים נגד מראה AI", `AVOID:
- Gradients (except soft vignettes on image placeholders).
- Glassmorphism, backdrop blur, frosted cards.
- Neon glow, colored drop shadows, cyberpunk styling.
- Generic three-card feature rows with line icons.
- Fade-in-on-scroll for every section.
- Stock phrases like "elevate", "unlock", "seamless", "next-level".`],

      ["h2", "4. הטיפוגרפיה עושה את העבודה"],
      ["p", "אתרים שנוצרים אוטומטית משתמשים בגופן אחד במשקל אחד. לאתר שנבנה ביד יש מערכת טיפוגרפית: גופן תצוגה עם אופי, גופן גוף שקט, ולעיתים גופן מונו או סריף לתוויות ולהדגשות. מגדירים את שלושתם, עם משקלים וגדלים, ונותנים לכותרת להיות גדולה. כותרת ענקית עם ריווח צפוף אומרת יותר מכל איור."],
      ["p", "באתר עברי הכללים קצת אחרים: בלי ריווח בין אותיות, בלי אותיות גדולות ובלי נטוי. את ההדגשה עושים במשקל, למשל מילה אחת במשקל light מאותו גופן."],
      ["code", "מערכת טיפוגרפית לאתר בעברית", `TYPE (Hebrew):
- Display: IBM Plex Sans Hebrew 600, line-height 1.1, headline at clamp(2.6rem, 7vw, 6rem).
- Accent: one word per headline in weight 300 of the same font.
- Labels: 12.5px, weight 500, tabular numbers. No letter-spacing, no uppercase, no italics.
- Body: 17px, line-height 1.65, max width 65ch.`],

      ["h2", "5. צל קשיח וקווים דקים במקום טשטוש"],
      ["p", "צל רך ומטושטש הוא טביעת האצבע של ערכות UI. בדפוס אין טשטוש. משתמשים בקווים דקים של פיקסל אחד כדי להפריד בין מקטעים, ובצל קשיח (העתק מלא של הצורה, מוזז ב־3 עד 8 פיקסלים) לכל מה שאפשר ללחוץ עליו. זה מיד נקרא כעיצוב גרפי ולא כתוכנה."],
      ["code", "כללי צל וקו", `DETAILS:
- Section dividers: 1px solid #121212 hairlines, full width.
- Buttons and cards: 1px border, hard offset shadow 3px 3px 0 #121212, no blur.
- Corner radius: square, or one radius used everywhere (no mix).`],

      ["h2", "6. שוברים את הגריד פעם אחת, בכוונה"],
      ["p", "תבניות מְמרכזות הכול. עובדים עם גריד של 12 עמודות וממקמים באופן א־סימטרי: הכותרת על שבע עמודות, הפתיח בחמש הנותרות, מיושר לתחתית. ונותנים לאלמנט אחד לפרוץ: מדבקה מסובבת, מספר ענק, כיתוב אנכי. שבירה מכוונת אחת בעמוד מספיקה. עשר זה רעש."],

      ["h2", "7. תנועה עם פיזיקה, במשורה"],
      ["p", "fade בכל מקום מרגיש אוטומטי. בוחרים שניים־שלושה רגעים ונותנים להם תנועה פיזית: כפתור שנמעך בלחיצה, כרטיסים שנוטים לכיוון הסמן, מילה בכותרת שמתחלפת עם קפיץ. מגדירים ערכי קפיץ ומנפישים רק transform ו־opacity. ב[כפתורים המונפשים](/designs/animated-buttons) וב[טיפוגרפיה בתנועה](/designs/kinetic-typography) יש הרבה דוגמאות עם ההגדרות המדויקות."],

      ["h2", "8. כותבים טקסט אמיתי לפני שמעצבים"],
      ["p", "שום דבר לא מסגיר אתר מהר יותר מטקסט כללי. כותבים את הכותרת האמיתית, המחירים האמיתיים, שעות הפתיחה האמיתיות, ומכניסים אותם לפרומפט. מילים ספציפיות („פתוח משבע. סגור בשבת.”) הופכות גם את העיצוב לספציפי, כי Claude בונה את העמוד סביב מה שבאמת קיים."],

      ["h2", "9. פרט אחד שאף אחד לא ביקש"],
      ["p", "לאתרים שנבנו ביד יש הפתעות קטנות: פס טקסט רץ, קו תחתון שנראה מצויר, מספר עמוד בפינה, סמן שמשאיר דיו. כל פרט כזה עולה שורה אחת בפרומפט, והוא החלק שמבקרים זוכרים. ב[אזורי הפתיחה](/designs/hero-sections) יש לא מעט רעיונות."],

      ["h2", "לפני ואחרי: אותה בקשה, בכתיבה אחרת"],
      ["p", "הנה פרומפט טיפוסי, ואחריו אותה בקשה עם הכללים. השני ארוך יותר, אבל כל שורה נוספת מבטלת ברירת מחדל."],
      ["code", "לפני", `תבנה אתר מודרני ויפה לסטודיו יוגה שלי, עם הירו, שיעורים, מחירים ויצירת קשר. עם אנימציות יפות.`],
      ["code", "אחרי", `Build a one-page website for "Ashtanga Lab", a small yoga studio in a converted print shop in Jaffa.

LANGUAGE: All copy in Hebrew, dir="rtl", lang="he". Gender-neutral Hebrew (plural present tense).

CONCEPT: It should feel like a printed class timetable pinned to a cork board: calm, exact, a little analog.

SECTIONS: hero with the headline "מתרגלים, לא מופיעים." and this week's timetable beside it; three class types with level and length; prices (single class 70₪, 10-class card 600₪); a short note from the teacher; address and hours.

DESIGN: paper #F6F2EA, ink #1A1A1A, one terracotta accent #C4502F only on buttons and today's column. IBM Plex Sans Hebrew 600 for headings, no letter-spacing, no uppercase, no italics. 1px hairlines, hard 3px 3px 0 shadows, square corners.

MOTION: today's column slides in with a spring; buttons press into their shadow. Nothing else moves.

AVOID: gradients, glassmorphism, neon, icon cards, fade-in on every section, stock phrases.`],
      ["p", "הפרומפט הראשון משאיר בערך שלושים החלטות ליד המקרה. השני מקבל את כולן, והתוצאה נראית כמו סטודיו עם נקודת מבט."],

      ["h2", "לחבר את הכול"],
      ["p", "לא צריך את כל תשעת הכללים בכל עמוד. דימוי, פלטה קבועה, רשימת איסורים ומערכת טיפוגרפית אמיתית כבר מוציאים אתר מהמראה של תבנית. מוסיפים צל קשיח ותנועה פיזית אחת, ורוב האנשים יניחו שמעצב/ת בנו אותו."],
      ["p", "כל עיצוב ב[ספרייה](/designs/website-designs) נבנה לפי הכללים האלה. פותחים אחד, קוראים את הפרומפט, ורואים כל עיקרון כתוב במפורש."],
    ],
    faq: [
      ["למה כל האתרים שנבנים עם AI נראים אותו דבר?", "כי שאלה פתוחה בפרומפט מקבלת את התשובה הנפוצה ביותר: הירו עם גרדיאנט, כרטיסי זכוכית, שלושה אייקונים וגופן ניטרלי. הדמיון נובע מברירות מחדל, לא מהיכולת של המודל."],
      ["Glassmorphism זה רע?", "לא בהכרח, אבל טשטוש כבד וכרטיסים חלביים הפכו לסימן היכר של ממשק שנוצר אוטומטית. כשהוא בכל מקום, האתר נראה כמו תבנית."],
      ["אילו סגנונות עיצוב הכי פחות נראים כמו AI?", "סגנונות עם כללים חזקים וספציפיים: ניאו־ברוטליזם, באוהאוס, סגנון שוויצרי, מינימליזם יפני, פנזין ריזוגרף ומגזיני חם. המגבלות שלהם לא משאירות מקום לברירות מחדל."],
    ],
  },
};
