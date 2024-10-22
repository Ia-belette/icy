# Icy

## Providers

- [x] SeeFrench
- [x] Coflix
- [x] NightFlix
- [x] Xalaflix
- [x] SenpaiStream
- [x] TopStreaming
- [x] WookaFR
- [x] MegaStream
- [x] Guinchez
- [x] PrincessFilms
- [x] 1Jour1Film
- [ ] MonStream (reverse engineering non commencé)

## Clone

Pour une meilleure expérience, installe [Deno](https://docs.deno.com/runtime/).

```
git clone https://github.com/Ia-belette/icy.git && cd icy
```

Lancer le projet en mode développement :

```
deno task dev
```

## Utilisation

```
const request = await fetch(
  "https://api-endpoint.com/search/taylor%20swift/seefrench,xalaflix,coflix" // max 7 providers
);
const data = await request.json();
console.log(data);
```

Réponse :

```json
[
  {
    "title": "Taylor Swift - The Eras Tour",
    "link": "https://seefrench.pro/watch/movie?id=1160164",
    "image": "https://image.tmdb.org/t/p/w500/jf3YO8hOqGHCupsREf5qymYq1n.jpg",
    "site_name": "seefrench"
  },
  {
    "title": "Taylor Swift - Speak Now World Tour Live",
    "link": "https://seefrench.pro/watch/movie?id=80009",
    "image": "https://image.tmdb.org/t/p/w500/ajlTVNkTqitAEYKckZPJ1JIaD2S.jpg",
    "site_name": "seefrench"
  },
  {
    "title": "Taylor Swift - City of Lover Concert",
    "link": "https://seefrench.pro/watch/movie?id=701684",
    "image": "https://image.tmdb.org/t/p/w500/ksCyBrDLJyT4hCuDXZS5oTDNX0p.jpg",
    "site_name": "seefrench"
  },
  {
    "title": "Taylor Swift: Speak Now",
    "link": "https://seefrench.pro/watch/movie?id=372478",
    "image": "https://image.tmdb.org/t/p/w500/p9HBkoMy3Q5ZT7Ar3xp3Ltj1PT1.jpg",
    "site_name": "seefrench"
  }
  {...10}
]
```
