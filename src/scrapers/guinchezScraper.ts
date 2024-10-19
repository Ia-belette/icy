import { BaseScraper } from "./BaseScraper.ts";

export class GuinchezScraper extends BaseScraper {
  constructor() {
    super("Guinchez", "https://guinchez.one");
  }

  buildSearchUrl(query: string) {
    return `${this.base_url}/search/${encodeURIComponent(query)}`;
  }

  parseHTML(html: string) {
    const jsonMatch = html.match(/window\.bootstrapData = (.*?);\n/);

    if (!jsonMatch?.[1]) {
      return [];
    }

    const parsedData = JSON.parse(jsonMatch[1]);

    const films = parsedData.loaders.searchPage.results
      .map((result: any) => {
        const title = result.name;
        const image = result.poster;

        if (!title || !image || result.model_type === "person") return null;

        // formater le titre pour générer le lien du contenu
        const formattedTitle = title
          // supprime les titres de civilité au début
          .replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Prof\.)\s+/i, "")
          // convertit en minuscules
          .toLowerCase()
          // normalise les caracteres (ex: é -> e)
          .normalize("NFD")
          // supprime les accents
          .replace(/[\u0300-\u036f]/g, "")
          // supprime les apostrophes
          .replace(/[']/g, "")
          // remplace les deux-points par un tiret
          .replace(/\s*[:]\s*/g, "-")
          // uniformise les tirets
          .replace(/\s*-\s*/g, "-")
          // remplace les espaces par des tirets
          .replace(/\s+/g, "-");

        const link = `https://guinchez.one/titles/${result.id}/${formattedTitle}`;

        return {
          title,
          image,
          link,
          site_name: this.site_name,
        };
      })
      .filter((film: any) => film);

    return films;
  }
}
