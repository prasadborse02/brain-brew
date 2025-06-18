---
title: Football across Europe
published: 2025-05-09T12:15:00-00:00
tags:
  - sports
---

Football (don't call it soccer) is the world’s most popular sport, organized across multiple tiers—from global tournaments between national teams to regional and domestic club competitions.

**Related Projects:** This knowledge forms the foundation for sports apps like [[groundplay-setup|GroundPlay]] and platforms like [[draft it is|Sports TakeHub]] that aim to enhance the fan experience.

## 1. International Competitions (Country vs Country)

- **FIFA World Cup**  
  Held every four years; features 32 national teams from six confederations.

- **UEFA European Championship (Euros)**  
  Every four years, midway between World Cups; 24 European national teams compete.

- **Other Continental Tournaments**  
  - Africa Cup of Nations (AFCON)  
  - AFC Asian Cup  
  - Copa América  

## 2. FIFA Club Competition

- **FIFA Club World Cup**  
  Annual tournament for continental club champions (e.g., UEFA Champions League winners vs. Copa Libertadores winners).

## 3. UEFA Club Competitions (Clubs from Different Countries)

- **UEFA Champions League**  
  Europe’s premier club tournament, featuring top-placed teams from domestic leagues.

- **UEFA Europa League**  
  Second-tier continental competition for clubs just below Champions League spots.

- **UEFA Europa Conference League**  
  Third-tier, introduced in 2021–22 for clubs finishing further down the domestic tables.

- **UEFA Super Cup**  
  One-off match between Champions League and Europa League winners each season.

## 4. Domestic Club Football

### a. Leagues (Double Round-Robin)

| Country  | Top Division | Relegation & Promotion           |
| -------- | ------------ | -------------------------------- |
| England  | Premier League | Bottom 3 ↔ Championship        |
| Spain    | La Liga       | Bottom 3 ↔ Segunda División     |
| Germany  | Bundesliga    | Bottom 2 + play-off ↔ 2. Bundesliga |
| Italy    | Serie A       | Bottom 3 ↔ Serie B              |
| France   | Ligue 1       | Bottom 3 ↔ Ligue 2              |

### b. Domestic Cups (Knock-out)

- **England**: FA Cup, EFL (Carabao) Cup  
- **Spain**: Copa del Rey  
- **Germany**: DFB-Pokal  
- **Italy**: Coppa Italia  
- **France**: Coupe de France  

### c. Domestic Super Cups (One-off)

- **England**: Community Shield (PL winner vs. FA Cup winner)  
- **Spain**: Supercopa de España (La Liga & Copa del Rey finalists)  
- **Germany**: DFL-Supercup (Bundesliga vs. DFB-Pokal winner)  
- **Italy**: Supercoppa Italiana (Serie A vs. Coppa Italia)  
- **France**: Trophée des Champions (Ligue 1 vs. Coupe de France)  

## 5. Season Calendar

- **August–May**: Domestic leagues, domestic cups, and UEFA competitions run simultaneously.  
- **January**: Some leagues pause for winter break; domestic super cups are often played.  
- **June–July**: International tournaments (World Cup, Euros, AFCON, Copa América) take place in their multi-year cycles.

## 6. Visual Representation of Football Competition Structure

### International Football

```mermaid
graph TD
    A[International Football] --> B[FIFA World Cup]
    A --> C[Continental Championships]
    C --> C1[UEFA Euros]
    C --> C2[Copa América]
    C --> C3[AFCON]
    C --> C4[AFC Asian Cup]
```

### Club Football

```mermaid
graph TD
    D[Club Football] --> E[Intercontinental]
    E --> E1[FIFA Club World Cup]
    
    D --> F[Continental Club Competitions]
    F --> F1[UEFA Champions League]
    F --> F2[UEFA Europa League]
    F --> F3[UEFA Europa Conference League]
    
    D --> G[Domestic Competitions]
    
    G --> G1[Domestic Leagues]
    G1 --> G1E[England]
    G1E --> G1E1[Premier League]
    G1 --> G1S[Spain]
    G1S --> G1S1[La Liga]
    G1 --> G1G[Germany]
    G1G --> G1G1[Bundesliga]
    G1 --> G1I[Italy]
    G1I --> G1I1[Serie A]
    G1 --> G1F[France]
    G1F --> G1F1[Ligue 1]
    
    G --> G2[Domestic Cups]
    G2 --> G2E[England]
    G2E --> G2E1[FA Cup]
    G2 --> G2S[Spain]
    G2S --> G2S1[Copa del Rey]
    G2 --> G2G[Germany]
    G2G --> G2G1[DFB-Pokal]
    G2 --> G2I[Italy]
    G2I --> G2I1[Coppa Italia]
    G2 --> G2F[France]
    G2F --> G2F1[Coupe de France]
    
    G --> G3[Domestic Super Cups]
    G3 --> G3E[England]
    G3E --> G3E1[Community Shield]
    G3 --> G3S[Spain]
    G3S --> G3S1[Supercopa de España]
    G3 --> G3G[Germany]
    G3G --> G3G1[DFL-Supercup]
    G3 --> G3I[Italy]
    G3I --> G3I1[Supercoppa Italiana]
    G3 --> G3F[France]
    G3F --> G3F1[Trophée des Champions]
```
