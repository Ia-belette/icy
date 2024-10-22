import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12";
import { BaseScraper } from "./BaseScraper.ts";

export class SenpaiStreamScraper extends BaseScraper {
  constructor() {
    super("SENPAI-STREAM", "https://senpai-stream.net/search/");
  }

  buildSearchUrl(query: string) {
    return `${this.base_url}${encodeURIComponent(query)}`;
  }

  parseHTML(html: string) {
    const $ = cheerio.load(html);

    const films = $("div.relative.group")
      .map((_, element) => {
        const $element = $(element);

        const link = $element.find("a").attr("href");

        const image = $element.find("img").attr("data-src");

        const title = $element.find("img").attr("alt");

        return link && image && title
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
