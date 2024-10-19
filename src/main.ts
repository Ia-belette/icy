import {
  WookaFRScraper,
  GuinchezScraper,
  PrincessFilmsScraper,
  CoflixScraper,
} from "./scrapers/index.ts";

const query = "Taylor Swift";

const wooka = new WookaFRScraper();
const guinchez = new GuinchezScraper();
const princess = new PrincessFilmsScraper();
const coflix = new CoflixScraper();

console.log(await wooka.scrape(query));
console.log(await guinchez.scrape(query));
console.log(await princess.scrape(query));
console.log(await coflix.scrape(query));
