Bruker selenium til å scrape biler på finn.no og lagrer disse i en mongoDB database.
Scrapingen sjekker om prisen på bilene er gått opp eller ned fra tideligere lagrede priser.

Backend består av en node express-aphollo server, som bruker type-graphql til å sende informasjon om bilene til en react-frontend. 
