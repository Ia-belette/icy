import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12";
import { BaseScraper } from "./BaseScraper.ts";

export class PrincessFilmsScraper extends BaseScraper {
  constructor() {
    super("filmsdeprincess", "https://filmsdeprincesse.org/");
  }

  buildSearchUrl(query: string) {
    return `${this.base_url}?s=${encodeURIComponent(query)}`;
  }

  parseHTML(html: string) {
    const $ = cheerio.load(html);

    const films = $("ul.MovieList li")
      .map((_, element) => {
        const $element = $(element);
        const title = $element.find("h2.Title").text().trim();
        const link = $element.find("a").attr("href");
        const image =
          $element.find("figure img").attr("data-src") ||
          $element.find("figure img").attr("src");

        return title && link
          ? {
              title,
              link,
              image: `https:${image}`,
              site_name: this.site_name,
            }
          : null;
      })
      .get()
      .filter(Boolean);

    return films;
  }
}
