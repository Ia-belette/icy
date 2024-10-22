import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12";
import { BaseScraper } from "./BaseScraper.ts";

export class XalaflixScraper extends BaseScraper {
  constructor() {
    super("XALAFLIX", "https://xalaflix.eu/search_elastic");
  }

  buildSearchUrl(query: string) {
    return `${this.base_url}?s=${encodeURIComponent(query)}`;
  }

  parseHTML(html: string) {
    const $ = cheerio.load(html);
    const filmsSection = $("div.vfx-item-section:contains('Films')").parent();
    const films = filmsSection
      .find("div.single-video")
      .map((_, element) => {
        const $element = $(element);
        const link = $element.find("a").attr("href");
        const title = $element.find(".video-item-content").text().trim();
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
      .filter(Boolean);

    return films;
  }
}
