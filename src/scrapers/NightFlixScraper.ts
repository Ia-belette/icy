import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12";
import { BaseScraper } from "./BaseScraper.ts";

export class NightFlixScraper extends BaseScraper {
  constructor() {
    super("nightflix", "https://nightflix.fun/search_ajax.php");
  }

  buildSearchUrl(query: string) {
    return `${this.base_url}?search=${encodeURIComponent(query)}`;
  }

  parseHTML(html: string) {
    const $ = cheerio.load(html);

    const films = $("div.search-result")
      .map((_, element) => {
        const $element = $(element);
        const link = $element.find("a").attr("href");
        const title = $element.find("p").text().trim();
        const image = $element.find("img").attr("src");

        return link && title && image
          ? {
              title,
              link: new URL(link, this.base_url).toString(),
              image,
              site_name: this.site_name,
            }
          : null;
      })
      .get()
      .filter(Boolean); // Filtrer les résultats incomplets

    return films;
  }
}
