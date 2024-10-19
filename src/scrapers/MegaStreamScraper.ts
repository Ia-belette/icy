import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12";
import { BaseScraper } from "./BaseScraper.ts";

export class MegaStreamScraper extends BaseScraper {
  constructor() {
    super("megastream", "https://megastream.autos/index.php");
  }
  //   ?do=search&subaction=search&search_start=0&full_search=0&result_from=1&story=taylor+swift
  buildSearchUrl(query: string): string {
    return `${
      this.base_url
    }?do=search&subaction=search&search_start=0&full_search=0&result_from=1&story=${encodeURIComponent(
      query
    )}`;
  }

  parseHTML(html: string) {
    const $ = cheerio.load(html);

    const films = $("a.short-item")
      .map((_, element) => {
        const $element = $(element);
        const link = $element.attr("href");
        const title = $element.find(".short-item__title").text().trim();
        const image =
          $element.find("img").attr("data-src") ||
          $element.find("img").attr("src");

        return link && title && image
          ? {
              title,
              link: new URL(link, this.base_url).toString(),
              image: `https://megastream.autos${image}`,
              site_name: this.site_name,
            }
          : null;
      })
      .get()
      .filter(Boolean);

    return films;
  }
}
