import { MegaStreamScraper, NightFlixScraper } from "./scrapers/index.ts";

const query = "Taylor Swift";

const megastream = new MegaStreamScraper();
const nightflix = new NightFlixScraper();

console.log(await megastream.scrape(query));
console.log(await nightflix.scrape(query));
