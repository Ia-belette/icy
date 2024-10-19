export class BaseScraper {
  site_name: string;
  base_url: string;

  constructor(site_name: string, base_url: string) {
    this.site_name = site_name;
    this.base_url = base_url;
  }

  buildSearchUrl(query: string) {
    return `${this.base_url}?s=${encodeURIComponent(query)}`;
  }

  async fetchHTML(query: string) {
    const url = this.buildSearchUrl(query);
    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return await response.text();
    } catch (error) {
      console.error(`Erreur lors du scraping de ${this.site_name}:`, error);
      return null;
    }
  }

  parseHTML(html: string) {
    throw new Error("parseHTML() doit être implémenté dans les sous-classes");
  }

  async scrape(query: string) {
    const html = await this.fetchHTML(query);
    if (!html) return [];
    return this.parseHTML(html);
  }
}
