// Guide 5 — target: "small business website with AI" / "בניית אתר לעסק קטן עם AI"
export default {
  slug: "small-business-website-with-ai",
  date: "2026-10-11",
  related: ["build-landing-page-with-claude", "make-ai-website-not-look-ai", "claude-prompt-for-website-design"],
  designs: ["bloom-root-skincare-shop", "caf-bauhaus-website", "nocturne-hotel-website"],
  en: {
    keyword: "small business website with AI",
    title: "Building a Small Business Website with AI: What to DIY, When to Hire",
    h1: "A small business website with AI: what you can do yourself, and when to hire",
    description: "An honest breakdown of what AI tools like Claude handle well for a small business website, where they fall short, and how to decide between DIY, a hybrid and a studio.",
    kicker: "For business owners",
    short: "Small business site with AI",
    intro: "AI has made it possible for a café owner or a consultant to build a decent website over a weekend. It has not made every part of a website easy. This guide is an honest split: what you can safely do yourself, what tends to go wrong, and when paying someone actually saves money.",
    body: [
      ["h2", "What AI now does well"],
      ["p", "With a good prompt, Claude can produce a complete, responsive page in minutes. For a small business, that covers a lot:"],
      ["ul", [
        "**Layout and design** of a one-page site or a landing page, in a clear style.",
        "**First drafts of copy:** headlines, service descriptions, FAQs. You still need to edit them into your voice.",
        "**Components:** menus, pricing tables, booking forms, galleries, contact sections.",
        "**Explaining and fixing code** when something breaks, if you paste the error.",
        "**Variations:** trying three hero ideas in ten minutes instead of a week.",
      ]],
      ["p", "If you want to try, start with [how to write a Claude prompt for a website design](/guides/claude-prompt-for-website-design) and [the step-by-step landing page walkthrough](/guides/build-landing-page-with-claude)."],

      ["h2", "Where DIY usually breaks"],
      ["p", "The design is rarely the problem anymore. The gaps are in everything around it:"],
      ["ul", [
        "**Strategy.** AI builds what you ask for. If the question is wrong (wrong audience, wrong offer, wrong first screen), you get a beautiful page that does not bring customers.",
        "**Your own content.** Photos, real prices, real reviews, the story of the business. AI cannot invent these honestly, and placeholders are what make a site feel fake.",
        "**Making it work in the real world.** Forms that actually reach you, booking and payment integrations, email that does not land in spam, a domain connected without breaking your mail.",
        "**Search.** Page structure, titles, local business data, Google Business Profile, speed. A site nobody finds is a brochure in a drawer.",
        "**Maintenance.** Updating hours, adding a new service, fixing something that broke after an update, six months from now, when you have forgotten how it was built.",
        "**Looking generic.** Without design judgment it is easy to end up with the [AI look](/guides/make-ai-website-not-look-ai) that customers have learned to skim past.",
      ]],

      ["h2", "Three ways to do it"],
      ["h3", "1. Full DIY"],
      ["p", "You write the prompts, deploy the site and maintain it. Best when the site is simple (one page, contact details, a menu or a portfolio), your budget is close to zero and you enjoy the process. Expect a weekend for the first version and an hour or two a month afterwards."],
      ["h3", "2. Hybrid"],
      ["p", "You build the first version with AI, then pay a professional for the parts that are hard to get right: domain and email setup, forms, SEO basics, a design review. This is often the best value for a business with a clear offer and some time."],
      ["h3", "3. Hire a studio"],
      ["p", "Someone else owns strategy, content structure, design, build, search setup and ongoing changes. Best when the website is a real sales channel, when you need bookings or a shop, or when your time is worth more running the business than learning deployment."],

      ["h2", "A quick decision checklist"],
      ["p", "Count how many of these are true for you:"],
      ["ul", [
        "The site needs more than one or two pages.",
        "Customers book, buy or pay through it.",
        "You compete with other local businesses on Google.",
        "You need a second language, for example Hebrew and English.",
        "Nobody in the business is comfortable with GitHub, DNS or hosting dashboards.",
        "You would rather spend the weekend on the business than on the website.",
      ]],
      ["p", "Zero or one: DIY is a good bet. Two or three: consider the hybrid route. Four or more: hiring will likely save you money and months."],

      ["h2", "If you DIY: a starter prompt"],
      ["p", "Here is a prompt shaped for a small local business. Replace every bracket with real details before you send it."],
      ["code", "Small business site prompt", `Build a one-page website for "[Business name]", a [type of business] in [neighbourhood, city].

GOAL: visitors should [call / book / order / visit]. The most important information is [hours, location, menu, prices].

CONCEPT: It should feel like [a physical reference: a chalkboard menu, a printed price list, a gallery label]. Customers are [who they are].

SECTIONS:
- Header: name, phone as a tap-to-call link, primary button "[Book / Order / Call]".
- Hero: headline "[your real headline]", one sentence, one photo placeholder labelled "[what photo goes here]".
- Services or menu: [list with real prices].
- About: [two sentences about you, in your words].
- Reviews: [2–3 real reviews with first names].
- Visit: address, opening hours as a table, a map link.
- Footer: [legal name, social links].

DESIGN: background [#hex], text [#hex], one accent [#hex] used only on buttons. [Font] for headings, [font] for body. 1px hairlines, hard offset shadows, no gradients, no glassmorphism.

OUTPUT: one React component (Tailwind CSS, framer-motion), semantic HTML, large tap targets, fast on mobile, accessible.`],
      ["p", "Then pick a starting point that matches your business. The library has full sites for a [café](/vault/caf-bauhaus-website), a [hotel](/vault/nocturne-hotel-website), a [skincare shop](/vault/bloom-root-skincare-shop) and more, each with its full prompt."],

      ["h2", "If you hire: what to ask for"],
      ["p", "Whoever you hire, ask these questions before you agree on anything:"],
      ["ul", [
        "Who writes and structures the content, and who supplies photos?",
        "Will I own the domain, the code and the hosting account?",
        "What does search setup include (titles, structured data, Google Business Profile, speed)?",
        "How do I make small changes later, and what do changes cost?",
        "What happens to the site if we stop working together?",
      ]],
      ["p", "A good studio has clear answers to all five. A vague answer to the ownership question is the biggest warning sign."],

      ["h2", "How we work"],
      ["p", "This library is the public side of a small studio. We design and build websites for small businesses with the same rules you see in these guides: strategy, copy and design in one team, a fast Next.js build, SEO and analytics from day one. Most sites go live within four to six weeks. If you would rather spend your time on the business, [see what is included](/services) or send a short brief below."],
    ],
    faq: [
      ["Can I build a small business website with AI for free?", "Mostly. Claude can generate the design and code, and hosts such as Vercel or Netlify have free tiers. You will still pay for a domain, and possibly for tools like booking or email."],
      ["Will an AI-built website rank on Google?", "It can, if the structure is right: unique titles and descriptions, real content, fast pages, local business information and a Google Business Profile. AI does not handle these by default."],
      ["When is it worth hiring a professional?", "When the site is a sales channel (bookings, orders, leads), when you compete locally on search, when you need more than a couple of pages or a second language, or when your time is better spent on the business."],
    ],
  },
  he: {
    keyword: "בניית אתר לעסק קטן עם AI",
    title: "בניית אתר לעסק קטן עם AI: מה עושים לבד ומתי כדאי לשכור",
    h1: "אתר לעסק קטן עם AI: מה אפשר לעשות לבד, ומתי כדאי לשכור",
    description: "פירוק כן של מה שכלי AI כמו Claude עושים טוב באתר לעסק קטן, איפה הם נופלים, ואיך מחליטים בין עשה־זאת־בעצמך, דרך ביניים וסטודיו.",
    kicker: "לבעלי עסקים",
    short: "אתר לעסק קטן עם AI",
    intro: "בזכות AI, מי שמנהלים בית קפה או משרד ייעוץ קטן יכולים לבנות אתר סביר בסוף שבוע. זה לא הפך כל חלק באתר לקל. המדריך הזה מחלק בכנות: מה בטוח לעשות לבד, מה נוטה להשתבש, ומתי תשלום למקצוען דווקא חוסך כסף.",
    body: [
      ["h2", "מה AI עושה טוב היום"],
      ["p", "עם פרומפט טוב, Claude מייצר עמוד שלם ורספונסיבי תוך דקות. לעסק קטן זה מכסה לא מעט:"],
      ["ul", [
        "**פריסה ועיצוב** של אתר בעמוד אחד או דף נחיתה, בסגנון ברור.",
        "**טיוטות ראשונות של טקסט:** כותרות, תיאורי שירותים, שאלות נפוצות. עדיין צריך לערוך אותן לקול שלכם.",
        "**רכיבים:** תפריטים, טבלאות מחירים, טופסי הזמנה, גלריות, אזור יצירת קשר.",
        "**הסבר ותיקון של קוד** כשמשהו נשבר, אם מדביקים את השגיאה.",
        "**וריאציות:** לנסות שלושה רעיונות להירו בעשר דקות במקום בשבוע.",
      ]],
      ["p", "רוצים לנסות? כדאי להתחיל מ[המדריך לכתיבת פרומפט לבניית אתר](/guides/claude-prompt-for-website-design) ומ[בניית דף נחיתה שלב אחר שלב](/guides/build-landing-page-with-claude)."],

      ["h2", "איפה עשה־זאת־בעצמך נשבר"],
      ["p", "העיצוב כבר כמעט אף פעם לא הבעיה. הפערים הם בכל מה שמסביב:"],
      ["ul", [
        "**אסטרטגיה.** AI בונה את מה שמבקשים. אם השאלה שגויה (קהל לא נכון, הצעה לא נכונה, מסך ראשון לא נכון), מתקבל עמוד יפה שלא מביא לקוחות.",
        "**התוכן שלכם.** תמונות, מחירים אמיתיים, ביקורות אמיתיות, הסיפור של העסק. AI לא יכול להמציא אותם ביושר, וממלאי מקום הם בדיוק מה שגורם לאתר להרגיש מזויף.",
        "**לגרום לזה לעבוד בעולם האמיתי.** טפסים שבאמת מגיעים אליכם, חיבור למערכת זימון תורים או תשלום, מייל שלא נוחת בספאם, דומיין שמחובר בלי לשבור את המייל.",
        "**חיפוש.** מבנה עמודים, כותרות, נתוני עסק מקומי, פרופיל עסק בגוגל, מהירות. אתר שאף אחד לא מוצא הוא חוברת במגירה.",
        "**תחזוקה.** לעדכן שעות, להוסיף שירות, לתקן משהו שנשבר אחרי עדכון, בעוד חצי שנה, כשכבר לא זוכרים איך זה נבנה.",
        "**להיראות גנרי.** בלי עין מעצבת קל להגיע ל[מראה של AI](/guides/make-ai-website-not-look-ai), שלקוחות כבר למדו לדלג עליו.",
        "**אתר דו־לשוני.** עברית ואנגלית, RTL, גופנים עבריים טובים ו־hreflang לגוגל. AI יודע לעשות את זה, אבל רק כשמבקשים כל פרט במפורש.",
      ]],

      ["h2", "שלוש דרכים לעשות את זה"],
      ["h3", "1. לבד, מההתחלה ועד הסוף"],
      ["p", "כותבים את הפרומפטים, מעלים את האתר ומתחזקים אותו. מתאים כשהאתר פשוט (עמוד אחד, פרטי קשר, תפריט או תיק עבודות), כשהתקציב קרוב לאפס וכשהתהליך מהנה. כדאי לצפות לסוף שבוע לגרסה הראשונה ושעה־שעתיים בחודש אחר כך."],
      ["h3", "2. דרך ביניים"],
      ["p", "בונים גרסה ראשונה עם AI, ומשלמים למקצוען על החלקים שקשה לעשות נכון: דומיין ומייל, טפסים, בסיס SEO ומבט מעצב. לעסק עם הצעה ברורה וקצת זמן פנוי, זו לרוב העסקה הכי משתלמת."],
      ["h3", "3. סטודיו"],
      ["p", "מישהו אחר אחראי על האסטרטגיה, מבנה התוכן, העיצוב, הפיתוח, החיפוש והשינויים השוטפים. מתאים כשהאתר הוא ערוץ מכירה אמיתי, כשצריך הזמנות או חנות, או כשהזמן שלכם שווה יותר בניהול העסק מאשר בלמידה של העלאת אתרים."],

      ["h2", "צ'קליסט קצר להחלטה"],
      ["p", "סופרים כמה מהמשפטים האלה נכונים לגביכם:"],
      ["ul", [
        "האתר צריך יותר מעמוד או שניים.",
        "לקוחות מזמינים, קונים או משלמים דרכו.",
        "מתחרים בגוגל מול עסקים אחרים באזור.",
        "צריך שתי שפות, למשל עברית ואנגלית.",
        "אף אחד בעסק לא מרגיש בנוח עם GitHub, DNS או לוחות בקרה של אחסון.",
        "מעדיפים להשקיע את סוף השבוע בעסק ולא באתר.",
      ]],
      ["p", "אפס או אחד: לבד זה הימור טוב. שניים או שלושה: כדאי לשקול את דרך הביניים. ארבעה ומעלה: שכירת מקצוען כנראה תחסוך כסף וחודשים."],

      ["h2", "אם עושים לבד: פרומפט פתיחה"],
      ["p", "פרומפט שמותאם לעסק מקומי קטן. מחליפים כל סוגריים בפרטים אמיתיים לפני השליחה."],
      ["code", "פרומפט לאתר של עסק קטן", `Build a one-page website for "[שם העסק]", a [type of business] in [neighbourhood, city].

LANGUAGE: All copy in Hebrew, dir="rtl", lang="he". Gender-neutral Hebrew (plural present tense). Hebrew fonts only (IBM Plex Sans Hebrew), no letter-spacing, no uppercase, no italics.

GOAL: visitors should [call / book / order / visit]. The most important information is [hours, location, menu, prices].

CONCEPT: It should feel like [a physical reference: a chalkboard menu, a printed price list, a gallery label]. Customers are [who they are].

SECTIONS:
- Header: name, phone as a tap-to-call link, WhatsApp button, primary button "[להזמנה / לתיאום]".
- Hero: headline "[הכותרת האמיתית]", one sentence, one photo placeholder labelled "[what photo goes here]".
- Services or menu: [list with real prices in ₪].
- About: [two sentences about you, in your words].
- Reviews: [2–3 real reviews with first names].
- Visit: address, opening hours as a table (Sunday to Thursday, Friday, Saturday), a map link.
- Footer: [legal name, social links].

DESIGN: background [#hex], text [#hex], one accent [#hex] used only on buttons. 1px hairlines, hard offset shadows, no gradients, no glassmorphism.

OUTPUT: one React component (Tailwind CSS, framer-motion), semantic HTML, large tap targets, fast on mobile, accessible.`],
      ["p", "אחר כך בוחרים נקודת פתיחה שמתאימה לעסק. בספרייה יש אתרים מלאים ל[בית קפה](/vault/caf-bauhaus-website), ל[מלון](/vault/nocturne-hotel-website), ל[חנות טיפוח](/vault/bloom-root-skincare-shop) ועוד, כל אחד עם הפרומפט המלא."],

      ["h2", "אם שוכרים: מה לשאול"],
      ["p", "את מי שלא תבחרו, כדאי לשאול את השאלות האלה לפני שסוגרים:"],
      ["ul", [
        "מי כותב ומארגן את התוכן, ומי מספק תמונות?",
        "הדומיין, הקוד וחשבון האחסון יהיו בבעלותי?",
        "מה כולל הטיפול בחיפוש (כותרות, נתונים מובנים, פרופיל עסק בגוגל, מהירות)?",
        "איך עושים שינויים קטנים בהמשך, וכמה הם עולים?",
        "מה קורה לאתר אם מפסיקים לעבוד יחד?",
      ]],
      ["p", "לסטודיו טוב יש תשובות ברורות לכל חמש. תשובה מעורפלת לשאלת הבעלות היא סימן האזהרה הכי גדול."],

      ["h2", "איך אנחנו עובדים"],
      ["p", "הספרייה הזו היא הצד הציבורי של סטודיו קטן. אנחנו מעצבים ובונים אתרים לעסקים קטנים לפי אותם כללים שבמדריכים: אסטרטגיה, תוכן ועיצוב בצוות אחד, פיתוח מהיר ב-Next.js, SEO ואנליטיקס מהיום הראשון, ואתרים בעברית ובאנגלית. רוב האתרים עולים לאוויר תוך ארבעה עד שישה שבועות. אם מעדיפים להשקיע את הזמן בעסק, אפשר [לראות מה כלול](/services) או לשלוח בריף קצר כאן למטה."],
    ],
    faq: [
      ["אפשר לבנות אתר לעסק קטן עם AI בחינם?", "כמעט. Claude מייצר את העיצוב והקוד, ולשירותי אחסון כמו Vercel או Netlify יש מסלול חינמי. עדיין משלמים על דומיין, ולפעמים על כלים כמו זימון תורים או מייל."],
      ["אתר שנבנה עם AI יופיע בגוגל?", "כן, אם המבנה נכון: כותרות ותיאורים ייחודיים, תוכן אמיתי, עמודים מהירים, פרטי עסק מקומי ופרופיל עסק בגוגל. AI לא מטפל בכל אלה מעצמו."],
      ["מתי כדאי לשכור מקצוען?", "כשהאתר הוא ערוץ מכירה (הזמנות, פניות, רכישות), כשמתחרים מקומית בחיפוש, כשצריך יותר מכמה עמודים או שתי שפות, או כשהזמן שלכם שווה יותר בעסק עצמו."],
    ],
  },
};
