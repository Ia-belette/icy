import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12";
import { BaseScraper } from "./BaseScraper.ts";

export class MonStreamScraper extends BaseScraper {
  constructor() {
    super("monstream", "https://monstream.rest/f/l.title=");
  }

  buildSearchUrl(query: string) {
    return `${this.base_url}${encodeURIComponent(query)}/sort=date/order=desc/`;
  }

  parseHTML(html: string) {
    const $ = cheerio.load(html);

    const films = $("div.movie-item")
      .map((_, element) => {
        const $element = $(element);
        const link = $element.find("a").attr("href");
        const title = $element.find("a.movie-title").text().trim();
        const image = $element.find("img").attr("data-src");

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
      .filter(Boolean);

    return films;
  }
}
