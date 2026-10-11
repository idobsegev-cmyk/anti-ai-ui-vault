// Long-form guides (keyword cluster A: prompts & AI website building), English + Hebrew.
// Each guide body is a list of blocks: ["h2", text] | ["h3", text] | ["p", text] | ["ul" | "ol", [items]] | ["code", label, text].
// Inline markup in text: **bold**, `code`, [label](/internal/path).
import claudePrompt from "./guides/claude-prompt-for-website-design";
import notLookAi from "./guides/make-ai-website-not-look-ai";
import landingPage from "./guides/build-landing-page-with-claude";
import stylePrompts from "./guides/website-style-prompts";
import smallBusiness from "./guides/small-business-website-with-ai";

export const GUIDES = [claudePrompt, notLookAi, landingPage, stylePrompts, smallBusiness];

export const GUIDE_HUB = {
  en: {
    h1: "Guides",
    title: "Guides: Claude Prompts & Building Websites with AI",
    description: "Practical guides to building websites with Claude: how to write website prompts, avoid the AI look, prompt for specific styles and take a page from artifact to live site.",
    intro: "How we write the prompts behind every design in the library, and how to use them to build a site that looks made by a person. Copy-ready examples in every guide.",
  },
  he: {
    h1: "מדריכים",
    title: "מדריכים: פרומפטים ל-Claude ובניית אתרים עם AI",
    description: "מדריכים מעשיים לבניית אתרים עם Claude: איך כותבים פרומפט לבניית אתר, איך נמנעים מהמראה של AI, פרומפטים לפי סגנון ומעבר מ-Artifact לאתר באוויר.",
    intro: "איך נכתבים הפרומפטים שמאחורי כל עיצוב בספרייה, ואיך משתמשים בהם כדי לבנות אתר שנראה מעוצב. בכל מדריך יש דוגמאות מוכנות להעתקה.",
  },
};

export const guideBySlug = (slug) => GUIDES.find((g) => g.slug === slug);

/** Plain text of a guide body (for word counts and JSON-LD). */
export function guideText(body) {
  return body
    .map((b) => (b[0] === "ul" || b[0] === "ol" ? b[1].join(" ") : b[0] === "code" ? b[2] : b[1]))
    .join(" ")
    .replace(/\*\*|`/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

export const wordCount = (body) => guideText(body).split(/\s+/).filter(Boolean).length;
