import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12";
import { BaseScraper } from "./BaseScraper.ts";

export class Jour1FilmScraper extends BaseScraper {
  constructor() {
    super("1Jour1Film", "https://1jour1film.skin/");
  }

  buildSearchUrl(query: string) {
    return `${this.base_url}?s=${encodeURIComponent(query)}`;
  }

  parseHTML(html: string) {
    const $ = cheerio.load(html);

    const films = $("div.result-item")
      .map((_, element) => {
        const $element = $(element);
        const $titleLink = $element.find("div.title a");
        const image = $element.find(" img").attr("data-src");
        const title = $titleLink.text().trim();
        const link = $titleLink.attr("href");

        return title && link && image
          ? {
              title,
              link,
              image,
              site_name: this.site_name,
            }
          : null;
      })
      .get()
      .filter(Boolean);

    return films;
  }
}
