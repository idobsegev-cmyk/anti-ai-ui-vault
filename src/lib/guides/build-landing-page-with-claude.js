// Guide 3 — target: "build a landing page with Claude" / "לבנות דף נחיתה עם Claude"
export default {
  slug: "build-landing-page-with-claude",
  date: "2026-10-11",
  related: ["claude-prompt-for-website-design", "make-ai-website-not-look-ai", "small-business-website-with-ai"],
  designs: ["ledgerly-saas-landing-page", "vitals-habit-app-landing", "sunwave-festival-website"],
  en: {
    keyword: "build a landing page with Claude",
    title: "Build a Landing Page with Claude, Step by Step (Artifact to Live Site)",
    h1: "Building a landing page with Claude, step by step",
    description: "From brief to live URL: plan the page, prompt Claude, refine it as an artifact, move the code into Next.js and deploy. Seven steps with copy-ready prompts.",
    kicker: "Walkthrough",
    short: "Landing page with Claude",
    intro: "Claude can take you from an idea to a working landing page in an afternoon. The trick is to treat it as a design process with stages, not a single request. This walkthrough goes from a one-paragraph brief to a page running on your own URL.",
    body: [
      ["h2", "Step 1: Write a one-paragraph brief"],
      ["p", "Before any prompt, answer four questions in plain words: who is the page for, what should they do, why should they trust you, and what should it feel like. This takes five minutes and saves an hour of back-and-forth."],
      ["code", "Brief example", `Ledgerly is bookkeeping software for freelancers and small studios.
Visitors should start a free trial.
Trust: 4,200 studios use it; it closes the books automatically each month.
Feel: precise and calm, like a Swiss train timetable. Show the real product on the first screen.`],

      ["h2", "Step 2: Plan the sections"],
      ["p", "A landing page has one job, so every section should push toward it. A reliable order:"],
      ["ol", [
        "**Hero:** the promise in one line, a primary button, and proof (the product, a number or a face).",
        "**Social proof:** logos, a count, or one strong quote.",
        "**How it works or features:** three to six concrete benefits, each with a visual.",
        "**Pricing or offer:** the decision, made easy.",
        "**FAQ:** the objections people actually have.",
        "**Final call to action** and a footer.",
      ]],
      ["p", "Write the real copy for each section now. It does not have to be perfect, but it has to be real."],

      ["h2", "Step 3: Turn the brief into a prompt"],
      ["p", "Combine the brief, the sections and a design system into one prompt. If you need the full structure, see [how to write a Claude prompt for a website design](/guides/claude-prompt-for-website-design). Here is a compact version for a landing page:"],
      ["code", "Landing page prompt", `Build a "Ledgerly SaaS Landing Page" React component.

CONCEPT: Bookkeeping software for freelancers and small studios. It must show the actual product on the first screen and convert to a free trial. It should feel precise and calm, like a Swiss timetable.

LAYOUT & CONTENT:
- Nav: logo 'Ledgerly', links Product / Pricing / Customers, 'Sign in' and red 'Start free' button.
- Hero: headline 'Books that close themselves.' left; right a product card with this month's income, expenses, a bar chart and 3 recent transactions.
- Logo strip: 'Trusted by 4,200 studios' with 6 wordmarks.
- Features: 3x2 grid, each with a small UI fragment instead of an icon.
- Pricing: two plans (Solo $12, Studio $29) with a monthly/yearly toggle.
- FAQ: 4 questions. Final CTA band. Footer.

INTERACTIONS: transactions slide in one by one on load; chart bars grow when in view; toggle animates with a spring.

DESIGN SYSTEM — Swiss International:
- White #FFFFFF, ink #0B0B0C, grey #6B6B70, hairline #E6E6E8, one signal red #E30613 only for the primary button and key numbers.
- Strict 12-column grid, Inter Tight 700/800 with tight tracking, IBM Plex Mono for figures.
- No gradients, no glassmorphism, no generic icon cards.

OUTPUT: one self-contained React component (Tailwind CSS, framer-motion, lucide-react), default export, no external images, semantic HTML, keyboard accessible, responsive down to 360px.`],
      ["p", "This is close to the real prompt behind [Ledgerly](/vault/ledgerly-saas-landing-page). You can open it and copy the full version."],

      ["h2", "Step 4: Refine it as an artifact"],
      ["p", "In Claude's apps, a React component like this usually opens as an artifact: a live preview next to the chat. This is the cheapest place to iterate, because every change is visible in seconds. Work top to bottom and change one thing per message."],
      ["code", "Refinement prompts", `The hero headline wraps badly at tablet width. Make it clamp(2.5rem, 6vw, 5.5rem) and keep it to two lines.

The feature grid feels generic. Replace each icon with a tiny UI fragment: an invoice line, a bank sync badge, a tax estimate.

Check the page at 375px wide: stack the hero card under the headline, make the nav a simple menu button.

Read the page as a first-time visitor and list the three weakest sentences. Then rewrite them.`],
      ["p", "That last prompt is underrated. Asking Claude to critique its own output before you ask for changes often finds the real problems."],

      ["h2", "Step 5: Move the code into a real project"],
      ["p", "When the artifact looks right, copy the code into a project you control. Next.js is a good default, and it is what this site uses. On your computer, with Node.js installed:"],
      ["code", "Create the project", `npx create-next-app@latest my-landing --js --tailwind --app
cd my-landing
npm install framer-motion lucide-react`],
      ["p", "Save the component as `app/Landing.jsx`, add `\"use client\";` as its first line, and render it from `app/page.js`:"],
      ["code", "app/page.js", `import Landing from "./Landing";

export const metadata = {
  title: "Ledgerly: books that close themselves",
  description: "Bookkeeping for freelancers and small studios. Start free.",
};

export default function Page() {
  return <Landing />;
}`],
      ["p", "Run `npm run dev` and open the local address it prints. If something breaks, paste the exact error back into Claude. Most first-run problems are a missing package or a font import."],

      ["h2", "Step 6: Make it a real website"],
      ["p", "An artifact is a demo. A website needs a few things the preview never asked for:"],
      ["ul", [
        "**A working form.** Connect the signup or contact button to a real destination: a form service, an email, or your CRM.",
        "**Metadata.** A unique title and description, and a share image.",
        "**Real images.** Replace placeholders with your own photos, compressed, with alt text.",
        "**Analytics.** Something simple, so you know whether the page works.",
        "**A last check on a phone.** Tap every button with your thumb.",
      ]],
      ["p", "You can ask Claude for each of these. For example: “Add a contact form that posts to /api/contact and a route handler that forwards it to my email.”"],

      ["h2", "Step 7: Deploy"],
      ["p", "Push the project to GitHub and import it into a host such as Vercel or Netlify. Both detect Next.js and give you a public URL within minutes; every later push updates the site. Then connect your own domain in the host's settings."],

      ["h2", "Where people get stuck"],
      ["ul", [
        "**Endless polishing in the artifact.** Once it is 90% right, move it into the project. The last 10% is easier with the real content and real images.",
        "**One huge file.** Fine for the first version. When you start adding pages, ask Claude to split it into components.",
        "**Skipping the brief.** If the page feels unfocused, the brief usually was too.",
      ]],
      ["p", "If you want a head start, every [full website design](/designs/website-designs) in the library is a working landing page with its prompt. Pick one, change the brief, and you are already at step 4."],
    ],
    faq: [
      ["Can Claude build a full landing page in one prompt?", "Yes, a detailed prompt usually returns a complete, working page. Expect a few rounds of specific refinements before it is ready to publish."],
      ["Do I need to know how to code?", "Not to get a good preview. To publish it on your own domain you need some comfort with a terminal, GitHub and a host like Vercel, or someone to set it up once."],
      ["Is an artifact a live website?", "No. An artifact is a preview inside Claude. To have a website with your own address, forms and analytics, move the code into a project and deploy it."],
    ],
  },
  he: {
    keyword: "לבנות דף נחיתה עם Claude",
    title: "איך בונים דף נחיתה עם Claude, שלב אחר שלב",
    h1: "בונים דף נחיתה עם Claude, שלב אחר שלב",
    description: "מבריף ועד אתר באוויר: מתכננים את העמוד, כותבים פרומפט, משפרים ב-Artifact, מעבירים ל-Next.js ומעלים. שבעה שלבים עם פרומפטים מוכנים.",
    kicker: "מדריך מעשי",
    short: "דף נחיתה עם Claude",
    intro: "עם Claude אפשר להגיע מרעיון לדף נחיתה עובד בתוך אחר צהריים אחד. הסוד הוא להתייחס לזה כתהליך עיצוב עם שלבים, ולא כבקשה אחת. המדריך עובר מבריף של פסקה אחת ועד עמוד שרץ בכתובת משלכם.",
    body: [
      ["h2", "שלב 1: בריף של פסקה אחת"],
      ["p", "לפני כל פרומפט, עונים על ארבע שאלות במילים פשוטות: למי העמוד, מה רוצים שיעשו בו, למה שיסמכו עליכם, ואיך הוא צריך להרגיש. זה לוקח חמש דקות וחוסך שעה של הלוך ושוב."],
      ["code", "דוגמה לבריף", `סטודיו פילאטיס קטן בפלורנטין, שני מדריכים, קבוצות של עד 8.
המטרה: שיזמינו שיעור ניסיון.
אמון: 6 שנים בשכונה, 4.9 בגוגל, שיעור ראשון בחינם.
תחושה: רגוע ומדויק, כמו לוח זמנים מודפס על נייר טוב. רואים את המערכת השבועית כבר במסך הראשון.`],

      ["h2", "שלב 2: מתכננים את המקטעים"],
      ["p", "לדף נחיתה יש תפקיד אחד, אז כל מקטע צריך לקדם אותו. סדר שעובד כמעט תמיד:"],
      ["ol", [
        "**הירו:** ההבטחה בשורה אחת, כפתור ראשי והוכחה (המוצר, מספר או פנים).",
        "**הוכחה חברתית:** לוגואים, מספר לקוחות או ציטוט חזק אחד.",
        "**איך זה עובד או יתרונות:** שלושה עד שישה יתרונות קונקרטיים, לכל אחד ויזואל.",
        "**מחיר או הצעה:** ההחלטה, בקלות.",
        "**שאלות נפוצות:** ההתנגדויות שאנשים באמת מעלים.",
        "**קריאה לפעולה אחרונה** ופוטר.",
      ]],
      ["p", "כותבים כבר עכשיו את הטקסט האמיתי לכל מקטע. הוא לא חייב להיות מושלם, אבל הוא חייב להיות אמיתי."],

      ["h2", "שלב 3: הופכים את הבריף לפרומפט"],
      ["p", "מחברים את הבריף, המקטעים ומערכת העיצוב לפרומפט אחד. המבנה המלא מוסבר ב[מדריך לכתיבת פרומפט לבניית אתר](/guides/claude-prompt-for-website-design). הנה גרסה קומפקטית לדף נחיתה בעברית:"],
      ["code", "פרומפט לדף נחיתה", `Build a "Studio Mila Pilates Landing Page" React component.

CONCEPT: A small pilates studio in Florentin, Tel Aviv. Visitors should book a free trial class. It should feel calm and exact, like a timetable printed on good paper.

LANGUAGE: All copy in Hebrew, dir="rtl", lang="he". Gender-neutral Hebrew (plural present tense). IBM Plex Sans Hebrew 600 for headings, no letter-spacing, no uppercase, no italics on Hebrew.

LAYOUT & CONTENT:
- Nav: 'סטודיו מילה', links מערכת שעות / מחירים / הסטודיו, button 'שיעור ניסיון בחינם'.
- Hero: headline 'זזים לאט. מתחזקים באמת.' and the weekly timetable as a 7-column grid with real class times.
- Proof: '6 שנים בפלורנטין · 4.9 בגוגל · עד 8 בקבוצה'.
- Classes: 3 class types with level and length.
- Prices: single class 90₪, 10-class card 750₪, monthly 520₪.
- FAQ: 4 questions. Final CTA. Footer with address and hours.

DESIGN SYSTEM:
- Paper #F6F2EA, ink #1A1A1A, sage #6F7F5E as the only accent (buttons and today's column).
- 1px hairlines between sections, hard 3px 3px 0 shadow on buttons, no gradients, no glassmorphism.

OUTPUT: one self-contained React component (Tailwind CSS, framer-motion, lucide-react), default export, no external images, semantic HTML, keyboard accessible, responsive down to 360px.`],
      ["p", "רוצים לראות פרומפט מלא של דף נחיתה? [Ledgerly](/vault/ledgerly-saas-landing-page) ו[Vitals](/vault/vitals-habit-app-landing) הם דפי נחיתה שלמים מהספרייה, עם הפרומפט המלא."],

      ["h2", "שלב 4: משפרים ב-Artifact"],
      ["p", "באפליקציות של Claude, קומפוננטת React כזו נפתחת בדרך כלל כ-Artifact: תצוגה חיה ליד הצ'אט. זה המקום הכי זול לשפר בו, כי כל שינוי נראה תוך שניות. עובדים מלמעלה למטה ומבקשים שינוי אחד בכל הודעה."],
      ["code", "בקשות לשיפור", `הכותרת בהירו נשברת רע ברוחב של טאבלט. להגדיר clamp(2.5rem, 6vw, 5.5rem) ולשמור על שתי שורות.

היתרונות נראים גנריים. להחליף כל אייקון בפרגמנט קטן של ממשק: שורת שיעור, תג "נשארו 2 מקומות", כרטיסייה.

לבדוק את העמוד ברוחב 375px: מערכת השעות עוברת לרשימה לפי ימים, והתפריט הופך לכפתור.

לקרוא את העמוד כמו מבקר/ת חדש/ה ולמנות את שלושת המשפטים החלשים ביותר. אחר כך לכתוב אותם מחדש.`],
      ["p", "הבקשה האחרונה לא מקבלת מספיק קרדיט. כשמבקשים מ-Claude לבקר את מה שבנה לפני שמבקשים שינויים, הוא מוצא לא פעם את הבעיות האמיתיות."],

      ["h2", "שלב 5: מעבירים את הקוד לפרויקט אמיתי"],
      ["p", "כשה-Artifact נראה נכון, מעתיקים את הקוד לפרויקט שבשליטתכם. Next.js היא ברירת מחדל טובה, וגם האתר הזה בנוי עליה. במחשב, עם Node.js מותקן:"],
      ["code", "יצירת הפרויקט", `npx create-next-app@latest my-landing --js --tailwind --app
cd my-landing
npm install framer-motion lucide-react`],
      ["p", "שומרים את הקומפוננטה כ־`app/Landing.jsx`, מוסיפים `\"use client\";` בשורה הראשונה, ומציגים אותה מתוך `app/page.js`. באתר בעברית מגדירים גם `lang=\"he\"` ו־`dir=\"rtl\"` על תגית ה־html בקובץ `app/layout.js`."],
      ["code", "app/page.js", `import Landing from "./Landing";

export const metadata = {
  title: "סטודיו מילה: פילאטיס בקבוצות קטנות בפלורנטין",
  description: "שיעורי פילאטיס בקבוצות של עד 8. שיעור ניסיון ראשון בחינם.",
};

export default function Page() {
  return <Landing />;
}`],
      ["p", "מריצים `npm run dev` ופותחים את הכתובת המקומית שמופיעה. אם משהו נשבר, מדביקים את השגיאה המדויקת בחזרה ל-Claude. רוב התקלות בהרצה הראשונה הן חבילה חסרה או ייבוא של גופן."],

      ["h2", "שלב 6: הופכים את זה לאתר אמיתי"],
      ["p", "Artifact הוא הדגמה. לאתר צריך כמה דברים שהתצוגה המקדימה אף פעם לא ביקשה:"],
      ["ul", [
        "**טופס שעובד.** מחברים את כפתור ההרשמה או הפנייה ליעד אמיתי: שירות טפסים, מייל או CRM.",
        "**מטא־דאטה.** כותרת ותיאור ייחודיים ותמונת שיתוף.",
        "**תמונות אמיתיות.** מחליפים את הממלאים בתמונות שלכם, דחוסות ועם טקסט חלופי.",
        "**אנליטיקס.** משהו פשוט, כדי לדעת אם העמוד עובד.",
        "**בדיקה אחרונה בטלפון.** ללחוץ על כל כפתור עם האגודל.",
      ]],
      ["p", "על כל אחד מאלה אפשר לבקש עזרה מ-Claude. למשל: „להוסיף טופס פנייה ששולח ל־/api/contact, ו־route handler שמעביר את הפנייה למייל שלי”."],

      ["h2", "שלב 7: מעלים לאוויר"],
      ["p", "דוחפים את הפרויקט ל-GitHub ומייבאים אותו לשירות אחסון כמו Vercel או Netlify. שניהם מזהים Next.js ונותנים כתובת ציבורית תוך דקות, וכל push אחר כך מעדכן את האתר. בסוף מחברים דומיין משלכם בהגדרות האחסון."],

      ["h2", "איפה נתקעים"],
      ["ul", [
        "**ליטוש אינסופי ב-Artifact.** כשהעמוד נכון ב־90%, מעבירים אותו לפרויקט. את ה־10% האחרונים קל יותר לסגור עם תוכן ותמונות אמיתיים.",
        "**קובץ אחד ענק.** בסדר לגרסה הראשונה. כשמוסיפים עמודים, מבקשים מ-Claude לפצל לקומפוננטות.",
        "**לדלג על הבריף.** אם העמוד מרגיש לא ממוקד, כנראה שגם הבריף היה כזה.",
      ]],
      ["p", "רוצים לחסוך את ההתחלה? כל [אתר מלא](/designs/website-designs) בספרייה הוא דף נחיתה עובד עם הפרומפט שלו. בוחרים אחד, משנים את הבריף, ומתחילים ישר משלב 4."],
    ],
    faq: [
      ["Claude יכול לבנות דף נחיתה שלם בפרומפט אחד?", "כן, פרומפט מפורט מחזיר בדרך כלל עמוד שלם ועובד. כדאי לצפות לכמה סבבים של שיפורים ממוקדים לפני שהוא מוכן לפרסום."],
      ["צריך לדעת לתכנת?", "בשביל תצוגה מקדימה טובה, לא. כדי לפרסם בדומיין משלכם צריך קצת היכרות עם טרמינל, GitHub ושירות כמו Vercel, או מישהו שיקים את זה פעם אחת."],
      ["Artifact הוא אתר חי?", "לא. Artifact הוא תצוגה מקדימה בתוך Claude. בשביל אתר עם כתובת משלכם, טפסים ואנליטיקס, מעבירים את הקוד לפרויקט ומעלים אותו."],
    ],
  },
};
