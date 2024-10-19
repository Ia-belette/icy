import { WookaFRScraper, GuinchezScraper } from "./scrapers/index.ts";

const query = "Taylor Swift";

const wooka = new WookaFRScraper();
const guinchez = new GuinchezScraper();
// git commit -m 'feat(scrapers): add guinchez scraper and refactor existing scrapers' -m 'add new guinchez scraper implementation' -m 'update scrapers index to include new guinchez scraper' -m 'refactor BaseScraper and wookaScraper for consistency' -m 'update main.ts to integrate new scraper'