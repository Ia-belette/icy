import {
  WookaFRScraper,
  GuinchezScraper,
  PrincessFilmsScraper,
} from "./scrapers/index.ts";

const query = "Taylor Swift";

const wooka = new WookaFRScraper();
const guinchez = new GuinchezScraper();
const princess = new PrincessFilmsScraper();

console.log(await wooka.scrape(query));
console.log(await guinchez.scrape(query));
console.log(await princess.scrape(query));
