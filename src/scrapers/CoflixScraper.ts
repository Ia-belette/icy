import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12";
import { BaseScraper } from "./BaseScraper.ts";

export class CoflixScraper extends BaseScraper {
  constructor() {
    super("Coflix", "https://coflix.plus/");
  }

  buildSearchUrl(query: string) {
    return `${this.base_url}?s=${encodeURIComponent(query)}`;
  }

  parseHTML(html: string) {
    const $ = cheerio.load(html);

    return $("#results .bx.por")
      .map((_, element) => {
        const $element = $(element);
        const title = $element.find("div.ttl").text().trim();
        const link = $element.find("a.lnk-blk").attr("href");
        const image = $element.find("figure img").attr("src");

        return title && link && image
          ? {
              title,
              link: new URL(link, this.base_url).toString(),
              image: `https://image.tmdb.org/t/p/w342${image}`,
              site_name: this.site_name,
            }
          : null;
      })
      .get()
      .filter(Boolean);
  }
}
