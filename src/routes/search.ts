import Router, { Request, Response } from "npm:express@4.18.2";
import {
  CoflixScraper,
  Jour1FilmScraper,
  MegaStreamScraper,
  NightFlixScraper,
  SeeFrenchScraper,
  GuinchezScraper,
  PrincessFilmsScraper,
  SenpaiStreamScraper,
  TopStreamingScraper,
  WookaFRScraper,
  XalaflixScraper,
} from "../scrapers/index.ts";

const scrapers = {
  seefrench: new SeeFrenchScraper(),
  coflix: new CoflixScraper(),
  nightflix: new NightFlixScraper(),
  xalaflix: new XalaflixScraper(),
  senpai: new SenpaiStreamScraper(),
  topstreaming: new TopStreamingScraper(),
  wookafr: new WookaFRScraper(),
  monstream: new MegaStreamScraper(),
  guinchez: new GuinchezScraper(),
  jour1film: new Jour1FilmScraper(),
  princessfilms: new PrincessFilmsScraper(),
};


export const router = Router();

router.get("/search/:query", async (req: Request, res: Response) => {
  const query = req.params.query;

  const scraperPromises = Object.keys(scrapers).map((provider) =>
    callScraper(provider, query)
      .then((result) => result || [])
      .catch((error) => {
        console.error(`Erreur pour ${provider}:`, error);
        return [];
      })
  );

  const results = await Promise.all(scraperPromises);
  const flattenedResults = results
    .flat()
    .filter(
      (item: {
        title: string;
        url: string;
        image: string;
        site_name: string;
      }): item is NonNullable<typeof item> => item != null
    );

  console.group("Détails de la recherche");
  console.info(`Recherche: ${query}`);
  console.info(`Résultats: ${flattenedResults.length}`);
  console.groupEnd();

  res.json(flattenedResults);
});

function callScraper(provider: string, query: string) {
  const scraper = scrapers[provider as keyof typeof scrapers];
  if (!scraper) {
    console.warn(`Scraper non implémenté pour ${provider}`);
    return Promise.resolve([]);
  }

  if (provider === "seefrench") {
    // @ts-expect-error fetchMovies is not present in the BaseScraper class
    return scraper.fetchMovies(query);
  }

  return scraper.scrape(query);
}
