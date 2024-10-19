import {
  XalaflixScraper,
} from "./scrapers/index.ts";

const query = "Taylor Swift";

const xalaflix = new XalaflixScraper();

console.log(await xalaflix.scrape(query));
