// Guide 1 — target: "claude prompt for website design" / "פרומפט לבניית אתר"
export default {
  slug: "claude-prompt-for-website-design",
  date: "2026-10-11",
  related: ["make-ai-website-not-look-ai", "build-landing-page-with-claude", "website-style-prompts"],
  designs: ["caf-bauhaus-website", "ledgerly-saas-landing-page", "kanso-architects-website"],
  en: {
    keyword: "claude prompt for website design",
    title: "How to Write a Claude Prompt for Website Design (With Examples)",
    h1: "How to write a Claude prompt for a website design",
    description: "A practical structure for Claude website prompts: concept, sections, design system, motion and output rules. Includes copy-ready prompt templates and real examples.",
    kicker: "Prompting",
    short: "Claude prompt for a website",
    intro: "Most AI-built websites look the same because most prompts say the same thing: “make a modern landing page for my business.” A good prompt reads like a design brief. Here is the structure we use for every design in the library, with templates you can copy.",
    body: [
      ["h2", "Why one-line prompts give you a template"],
      ["p", "When a prompt leaves a decision open, Claude fills it with the most likely answer. The most likely hero is a centered headline over a soft gradient. The most likely palette is blue and purple. The most likely feature section is three cards with icons. None of those choices are wrong, they are just average, and average is what a template looks like."],
      ["p", "The fix is not a longer prompt for its own sake. It is a prompt that makes the decisions a designer would make: what the site should feel like, what goes on each section, which colors and fonts, how things move, and what the code should look like when it comes back."],

      ["h2", "The five parts of a website prompt"],
      ["p", "Every prompt in the [Specimen library](/designs/website-designs) follows the same five-part skeleton. You can open any design, switch to the prompt tab and see it in full."],
      ["ol", [
        "**Concept.** One or two sentences on who the site is for and what it should feel like. Use a metaphor: “a Bauhaus exhibition poster that sells coffee” gives Claude far more to work with than “clean and modern.”",
        "**Layout and content.** Every section in order, with the real words. Headlines, button labels, prices, the number of cards. Placeholder text produces placeholder design.",
        "**Interactions and motion.** What moves, when, and how. Name the trigger (hover, scroll into view, click) and the feel (a spring with stiffness 260, not “smooth animations”).",
        "**Design system.** Exact hex colors, font names and weights, border widths, shadow style, corner radius. Also the things to avoid.",
        "**Output rules.** Framework, styling, libraries, one file or many, accessibility requirements. This keeps the code usable after the first answer.",
      ]],

      ["h2", "A copy-ready template"],
      ["p", "Fill in the brackets. Leave nothing vague: if you do not know a color yet, pick one and change it later. A wrong decision is easier to fix than no decision."],
      ["code", "Website prompt template", `Build a "[Business name] Website" React component.

CONCEPT: [Who it is for, in one sentence]. It should feel like [a physical object or place: a printed menu, a gallery wall, a field notebook].

LAYOUT & CONTENT:
- Nav: [logo text], links [A / B / C], primary button "[label]".
- Hero: headline "[exact headline]", subline "[one sentence]", [what sits next to it].
- [Section 2]: [what it shows, how many items, the real text].
- [Section 3]: ...
- Footer: [address, hours, small print].

INTERACTIONS & MOTION:
- [Element] [does what] on [hover / click / scroll into view].
- Spring physics (stiffness 260, damping 20). Animate transform and opacity only.
- Respect prefers-reduced-motion.

DESIGN SYSTEM:
- Colors: background [#hex], text [#hex], one accent [#hex] used sparingly.
- Type: [display font + weight] for headings, [body font] for text.
- Details: [1px hairlines / 3px borders], [hard offset shadows / no shadows], [corner radius].
- Avoid: gradients, glassmorphism, neon glow, generic stock icons.

OUTPUT: one self-contained React component (Tailwind CSS, framer-motion, lucide-react), default export, no external images, semantic HTML, visible focus states, keyboard operable.`],

      ["h2", "A real example: a café website"],
      ["p", "Here is a shortened version of the prompt behind [Café Bauhaus](/vault/caf-bauhaus-website). Notice how much of it is content and constraints rather than adjectives."],
      ["code", "Example: Café Bauhaus (shortened)", `Build a "Café Bauhaus Website" React component.

CONCEPT: The website of a neighbourhood café and roastery in a 1930s white-city building. It should read like a Bauhaus exhibition poster that sells coffee.

LAYOUT & CONTENT:
- Nav: circle logo + 'CAFÉ BAUHAUS', links Menu / Beans / Visit, red 'Order ahead' square button.
- Hero: headline 'FORM / FOLLOWS / COFFEE' stacked; right a 3x3 geometric composition.
- Menu: 6 tiles (Espresso, Flat white, Cortado, Filter, Cardamom bun, Shakshuka toast), each with a shape icon, price and short note.
- Hours: each weekday as a horizontal bar with times.

DESIGN SYSTEM — Bauhaus:
- Off-white #F3EEE3, black #111, red #E63322, blue #1F4E9E, yellow #F6C21B.
- Only circles, squares, half- and quarter-circles; strict grid.
- Syne 800 uppercase for display, Inter Tight for body.`],
      ["p", "Every line closes a door. Claude cannot reach for a gradient, because the palette is fixed. It cannot invent a generic feature grid, because the menu tiles are spelled out. That is what makes the result look designed."],

      ["h2", "Write the design system like a style guide"],
      ["p", "The design system block does most of the work against the “AI look.” Three habits help:"],
      ["ul", [
        "**Give hex values, not color names.** “Warm beige” can be anything. #F3EEE3 is one thing.",
        "**Limit the accent.** Say how often the accent color may appear: “used twice at most” or “only on the primary button.” Restraint reads as intent.",
        "**Write a ban list.** Name what you do not want. Claude follows explicit exclusions well, and the defaults you exclude are exactly the ones that make sites look generated.",
      ]],
      ["p", "If you are unsure what a style needs, borrow it. Each style page, like [Swiss International](/styles/swiss-international) or [Japanese Minimal](/styles/japanese-minimal), collects designs whose prompts already contain a full design system."],

      ["h2", "Describe motion with numbers"],
      ["p", "“Add smooth animations” produces fades on everything. Instead, pick two or three moments that matter and describe them precisely: the hero headline slides up word by word, cards lift 4px on hover with a spring, the hours bars grow when the section enters view. Ask for transform and opacity only, so it stays fast, and ask Claude to respect reduced-motion settings."],

      ["h2", "Iterate in small, specific steps"],
      ["p", "The first answer is a draft. Do not ask for “better.” Ask for one change at a time and say why:"],
      ["code", "Follow-up prompts that work", `The hero feels crowded. Remove the subline, make the headline 20% larger and give it 2x more space above.

The menu tiles all look the same weight. Make the first tile span two columns and use the accent color only there.

Replace every rounded-2xl with square corners and add a 3px black border with a hard 6px 6px 0 shadow.

On mobile, stack the hero composition under the headline and reduce it to a 2x2 grid.`],
      ["p", "Short, concrete follow-ups keep the parts you already like. A vague follow-up invites Claude to redo everything."],

      ["h2", "Common mistakes"],
      ["ul", [
        "**Lorem ipsum.** Real words change the layout. A three-word headline and a twelve-word headline need different designs.",
        "**Too many sections at once.** For a first pass, five to seven sections is plenty. Add the rest once the system is set.",
        "**Mixing styles.** “Brutalist but elegant and playful” cancels itself out. Pick one design language and commit.",
        "**No output rules.** Without them you may get a page that depends on images you do not have or libraries you did not install.",
      ]],

      ["h2", "Start from a working prompt"],
      ["p", "The fastest way to learn the structure is to copy a prompt that already works and change it. Browse the [full website designs](/designs/website-designs), find one close to your business, and swap in your name, content and colors. For single sections, try the [hero sections](/designs/hero-sections) or [forms](/designs/forms)."],
    ],
    faq: [
      ["How long should a Claude prompt for a website be?", "Long enough to make every design decision: usually 250 to 500 words for a full page. Length is not the goal; specificity is. Every section, color and interaction should be named."],
      ["Should I write the prompt in English?", "English works best for technical terms like font names and CSS properties, but the site content can be in any language. Write the copy in your language and ask for the correct direction (for example dir=\"rtl\" for Hebrew)."],
      ["Can I reuse the prompts from Specimen Design for my business?", "Yes. All designs and prompts are free to use under the MIT license. Replace the business name, copy and colors with your own."],
      ["What should I do if Claude ignores part of the prompt?", "Point to the exact line it missed and restate it as a single follow-up. Small, specific corrections work better than repeating the whole prompt."],
    ],
  },
  he: {
    keyword: "פרומפט לבניית אתר",
    title: "פרומפט לבניית אתר ב-Claude: מבנה, תבנית ודוגמאות",
    h1: "איך כותבים פרומפט לבניית אתר",
    description: "מבנה מעשי לפרומפט לעיצוב אתר ב-Claude: רעיון, מקטעים, מערכת עיצוב, תנועה וכללי פלט. כולל תבנית מוכנה להעתקה ודוגמאות אמיתיות.",
    kicker: "פרומפטים",
    short: "פרומפט לבניית אתר",
    intro: "רוב האתרים שנבנים עם AI נראים אותו דבר, כי רוב הפרומפטים אומרים אותו דבר: „תבנה דף נחיתה מודרני לעסק שלי”. פרומפט טוב נקרא כמו בריף של מעצב. זה המבנה שבו נכתב כל עיצוב בספרייה, עם תבניות מוכנות להעתקה.",
    body: [
      ["h2", "למה פרומפט של שורה אחת מייצר תבנית"],
      ["p", "כשפרומפט משאיר החלטה פתוחה, Claude ממלא אותה בתשובה הסבירה ביותר. ההירו הסביר ביותר הוא כותרת ממורכזת על גרדיאנט רך. הפלטה הסבירה ביותר היא כחול וסגול. מקטע היתרונות הסביר ביותר הוא שלושה כרטיסים עם אייקונים. אף אחת מהבחירות האלה לא שגויה, הן פשוט ממוצעות. וממוצע זה בדיוק איך שתבנית נראית."],
      ["p", "הפתרון הוא לא פרומפט ארוך יותר בשביל האורך. הוא פרומפט שמקבל את ההחלטות שמעצב/ת היו מקבלים: איך האתר צריך להרגיש, מה יש בכל מקטע, אילו צבעים וגופנים, מה זז ואיך, ואיך הקוד צריך להיראות כשהוא חוזר."],

      ["h2", "חמשת החלקים של פרומפט לאתר"],
      ["p", "כל פרומפט ב[ספרייה](/designs/website-designs) בנוי על אותו שלד. אפשר לפתוח כל עיצוב, לעבור ללשונית הפרומפט ולראות אותו במלואו."],
      ["ol", [
        "**רעיון.** משפט או שניים: למי האתר ואיך הוא צריך להרגיש. כדאי להשתמש בדימוי: „כרזה של תערוכת באוהאוס שמוכרת קפה” נותן ל-Claude הרבה יותר מ„נקי ומודרני”.",
        "**מבנה ותוכן.** כל המקטעים לפי הסדר, עם הטקסטים האמיתיים: כותרות, כפתורים, מחירים, מספר הכרטיסים. טקסט דמה מייצר עיצוב דמה.",
        "**אינטראקציה ותנועה.** מה זז, מתי ואיך. מגדירים את הטריגר (ריחוף, גלילה, לחיצה) ואת התחושה (קפיץ עם stiffness 260, לא „אנימציות חלקות”).",
        "**מערכת עיצוב.** צבעים בקוד hex, שמות גופנים ומשקלים, עובי קווים, סוג צל, רדיוס פינות. וגם מה אסור.",
        "**כללי פלט.** פריימוורק, עיצוב, ספריות, קובץ אחד או כמה, נגישות. כך הקוד שמיש כבר מהתשובה הראשונה.",
      ]],

      ["h2", "תבנית מוכנה להעתקה"],
      ["p", "התבנית באנגלית, כי שמות גופנים, צבעים ומונחי CSS עובדים הכי טוב כך. את התוכן עצמו אפשר לכתוב בעברית. ממלאים את הסוגריים ולא משאירים שום דבר עמום: אם עוד אין צבע, בוחרים אחד ומחליפים אחר כך."],
      ["code", "תבנית פרומפט לאתר", `Build a "[Business name] Website" React component.

CONCEPT: [Who it is for, in one sentence]. It should feel like [a physical object or place: a printed menu, a gallery wall, a field notebook].

LAYOUT & CONTENT:
- Nav: [logo text], links [A / B / C], primary button "[label]".
- Hero: headline "[exact headline]", subline "[one sentence]", [what sits next to it].
- [Section 2]: [what it shows, how many items, the real text].
- [Section 3]: ...
- Footer: [address, hours, small print].

INTERACTIONS & MOTION:
- [Element] [does what] on [hover / click / scroll into view].
- Spring physics (stiffness 260, damping 20). Animate transform and opacity only.
- Respect prefers-reduced-motion.

DESIGN SYSTEM:
- Colors: background [#hex], text [#hex], one accent [#hex] used sparingly.
- Type: [display font + weight] for headings, [body font] for text.
- Details: [1px hairlines / 3px borders], [hard offset shadows / no shadows], [corner radius].
- Avoid: gradients, glassmorphism, neon glow, generic stock icons.

OUTPUT: one self-contained React component (Tailwind CSS, framer-motion, lucide-react), default export, no external images, semantic HTML, visible focus states, keyboard operable.`],

      ["h2", "אתר בעברית: מה מוסיפים לפרומפט"],
      ["p", "לאתר בעברית מוסיפים שלוש שורות. בלעדיהן מתקבל לרוב אתר עם כיוון שגוי, גופן לטיני על טקסט עברי וריווח אותיות שלא מתאים לעברית."],
      ["code", "תוספת לאתר בעברית", `LANGUAGE: All copy is in Hebrew. Set dir="rtl" and lang="he" on the root, use logical properties (ps/pe, ms/me, start/end).
TYPE: Hebrew fonts only for Hebrew text: IBM Plex Sans Hebrew 600 for headings, Frank Ruhl Libre for accents. No letter-spacing, no uppercase, no italics on Hebrew.
COPY: Gender-neutral Hebrew (plural present tense or infinitive), for example "מזמינים מקום", not "הזמן מקום".`],

      ["h2", "דוגמה אמיתית: אתר לבית קפה"],
      ["p", "הנה גרסה מקוצרת של הפרומפט שמאחורי [Café Bauhaus](/vault/caf-bauhaus-website). רוב השורות הן תוכן ומגבלות, לא שמות תואר."],
      ["code", "דוגמה: Café Bauhaus (מקוצר)", `Build a "Café Bauhaus Website" React component.

CONCEPT: The website of a neighbourhood café and roastery in a 1930s white-city building. It should read like a Bauhaus exhibition poster that sells coffee.

LAYOUT & CONTENT:
- Nav: circle logo + 'CAFÉ BAUHAUS', links Menu / Beans / Visit, red 'Order ahead' square button.
- Hero: headline 'FORM / FOLLOWS / COFFEE' stacked; right a 3x3 geometric composition.
- Menu: 6 tiles (Espresso, Flat white, Cortado, Filter, Cardamom bun, Shakshuka toast), each with a shape icon, price and short note.

DESIGN SYSTEM — Bauhaus:
- Off-white #F3EEE3, black #111, red #E63322, blue #1F4E9E, yellow #F6C21B.
- Only circles, squares, half- and quarter-circles; strict grid.
- Syne 800 uppercase for display, Inter Tight for body.`],
      ["p", "כל שורה סוגרת אפשרות. Claude לא יכול לשלוף גרדיאנט, כי הפלטה קבועה. הוא לא ימציא גריד יתרונות גנרי, כי אריחי התפריט מפורטים. זה מה שגורם לתוצאה להיראות מעוצבת."],

      ["h2", "מערכת עיצוב שנכתבת כמו מדריך סגנון"],
      ["ul", [
        "**קוד hex ולא שם של צבע.** „בז' חמים” יכול להיות כל דבר. ‎#F3EEE3 הוא דבר אחד.",
        "**להגביל את צבע ההדגשה.** לכתוב כמה פעמים מותר לו להופיע: „פעמיים לכל היותר” או „רק בכפתור הראשי”. איפוק נקרא ככוונה.",
        "**רשימת איסורים.** לכתוב במפורש מה לא רוצים. Claude מקפיד על החרגות מפורשות, וברירות המחדל שמחריגים הן בדיוק אלה שגורמות לאתר להיראות כמו AI.",
      ]],
      ["p", "לא בטוחים מה סגנון מסוים דורש? אפשר לשאול ממנו. בכל עמוד סגנון, למשל [סגנון שוויצרי](/styles/swiss-international) או [מינימליזם יפני](/styles/japanese-minimal), יש עיצובים שהפרומפט שלהם כבר כולל מערכת עיצוב מלאה."],

      ["h2", "תנועה מתארים במספרים"],
      ["p", "„להוסיף אנימציות חלקות” מייצר fade על כל דבר. עדיף לבחור שניים־שלושה רגעים שחשובים ולתאר אותם בדיוק: הכותרת עולה מילה אחר מילה, כרטיסים מתרוממים ב־4 פיקסלים בריחוף עם קפיץ, פסי שעות הפתיחה גדלים כשהמקטע נכנס למסך. מבקשים להנפיש רק transform ו־opacity, כדי שהאתר יישאר מהיר, ולכבד את הגדרת הפחתת התנועה."],

      ["h2", "משפרים בצעדים קטנים"],
      ["p", "התשובה הראשונה היא טיוטה. לא מבקשים „יותר טוב”, אלא שינוי אחד בכל פעם, עם הסבר:"],
      ["code", "בקשות המשך שעובדות", `ההירו צפוף מדי. להוריד את שורת המשנה, להגדיל את הכותרת ב־20% ולתת לה פי שניים רווח מעליה.

כל אריחי התפריט באותו משקל. האריח הראשון יתפרס על שתי עמודות, וצבע ההדגשה יופיע רק בו.

להחליף כל rounded-2xl בפינות ישרות ולהוסיף מסגרת שחורה בעובי 3px עם צל קשיח של 6px 6px 0.

במובייל, הקומפוזיציה של ההירו תרד מתחת לכותרת ותצטמצם לגריד 2x2.`],
      ["p", "בקשות קצרות ומדויקות שומרות על מה שכבר טוב. בקשה עמומה מזמינה את Claude לבנות הכול מחדש."],

      ["h2", "טעויות נפוצות"],
      ["ul", [
        "**טקסט דמה.** טקסט אמיתי משנה את הפריסה. כותרת של שלוש מילים וכותרת של שתים־עשרה מילים צריכות עיצוב אחר.",
        "**יותר מדי מקטעים בבת אחת.** לסבב ראשון מספיקים חמישה עד שבעה. את השאר מוסיפים אחרי שהמערכת יציבה.",
        "**ערבוב סגנונות.** „ברוטליסטי אבל אלגנטי ושובב” מבטל את עצמו. בוחרים שפת עיצוב אחת והולכים איתה.",
        "**בלי כללי פלט.** בלעדיהם עלול לחזור עמוד שתלוי בתמונות שאין לכם או בספריות שלא הותקנו.",
      ]],

      ["h2", "מתחילים מפרומפט שעובד"],
      ["p", "הדרך הכי מהירה ללמוד את המבנה היא להעתיק פרומפט שכבר עובד ולשנות אותו. אפשר לעבור על [האתרים המלאים](/designs/website-designs), למצוא אחד שקרוב לעסק, ולהחליף שם, תוכן וצבעים. למקטעים בודדים כדאי להציץ ב[אזורי הפתיחה](/designs/hero-sections) או ב[טפסים](/designs/forms)."],
    ],
    faq: [
      ["כמה ארוך צריך להיות פרומפט לבניית אתר?", "ארוך מספיק כדי לקבל כל החלטת עיצוב: בדרך כלל 250 עד 500 מילים לעמוד שלם. המטרה היא דיוק, לא אורך. כל מקטע, צבע ואינטראקציה צריכים להופיע בשמם."],
      ["כותבים את הפרומפט בעברית או באנגלית?", "את ההוראות הטכניות עדיף באנגלית, כי שמות גופנים ומונחי CSS מובנים כך הכי טוב. את תוכן האתר כותבים בעברית, ומוסיפים הוראה מפורשת ל־RTL ולגופנים עבריים."],
      ["אפשר להשתמש בפרומפטים מדוגמית עיצוב לעסק שלי?", "כן. כל העיצובים והפרומפטים חופשיים לשימוש ברישיון MIT. מחליפים את שם העסק, הטקסטים והצבעים."],
      ["מה עושים כש-Claude מתעלם מחלק מהפרומפט?", "מצביעים על השורה המדויקת שהוא פספס וכותבים אותה שוב כבקשת המשך אחת. תיקון קטן וממוקד עובד יותר טוב מהדבקה חוזרת של כל הפרומפט."],
    ],
  },
};
