import { BaseScraper } from "./BaseScraper.ts";

export class SeeFrenchScraper extends BaseScraper {
  constructor() {
    super("seefrench", "https://seefrench.pro/api/movie/search");
  }

  buildSearchUrl(query: string) {
    return `${this.base_url}?q=${encodeURIComponent(query)}&page=1`;
  }

  async fetchMovies(query: string) {
    const url = this.buildSearchUrl(query);
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const htmlLikeString = JSON.stringify(data);
      return this.parseHTML(htmlLikeString);
    } catch (error) {
      console.error("Erreur lors du scraping de SeeFrench:", error);
      return [];
    }
  }

  parseHTML(html: string) {
    try {
      const jsonData = JSON.parse(html);

      const films = jsonData.map((movie: any) => ({
        title: movie.title,
        link: `https://seefrench.pro/movies/${movie.id}`,
        image: movie.poster_url,
        site_name: this.site_name,
      }));

      return;
    } catch (error) {
      console.error("Erreur lors du parsing des données JSON:", error);
      return [];
    }
  }
}
