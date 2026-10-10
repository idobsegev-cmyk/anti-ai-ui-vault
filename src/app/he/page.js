import { HomeBody } from "../page";

export const metadata = {
  title: { absolute: "מבצר העיצוב — רכיבי ממשק מונפשים ופרומפטים ל-Claude שמרגישים אנושיים" },
  description:
    "כספת חינמית של רכיבי React מונפשים שכוונו ביד: הירו מגזיני, גרידי בנטו, כפתורים מוחשיים וטיפוגרפיה בתנועה, ולכל רכיב פרומפט מוכן ל-Claude ותצוגה חיה. שש־עשרה שפות עיצוב, בלי מראה של תבנית.",
  alternates: { canonical: "/he", languages: { en: "/", he: "/he", "x-default": "/" } },
  openGraph: { locale: "he_IL", url: "/he", title: "מבצר העיצוב — בונים אתרים שמרגישים חיים ואנושיים", siteName: "מבצר העיצוב" },
};

export default function HomeHe() {
  return <HomeBody lang="he" />;
}
