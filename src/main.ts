import { WookaFRScraper, GuinchezScraper } from "./scrapers/index.ts";

const query = "Taylor Swift";

const wooka = new WookaFRScraper();
const guinchez = new GuinchezScraper();

console.log(await wooka.scrape(query));
console.log(await guinchez.scrape(query));
