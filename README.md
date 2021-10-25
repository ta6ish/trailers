# Trailers
An Express.js application for serving the trailers.

# Demo
App has been deployed on Heroku. `https://ta6ish-trailers.herokuapp.com/api/trailer`
```bash
curl --request GET 'https://ta6ish-trailers.herokuapp.com/api/trailer?url=https://content.viaplay.se/pc-se/film/everest-2015'
```

## Pre-reqs
To run this app locally you will need:
- [Node.js](https://nodejs.org/en/)

## Development setup
* Install dependencies `npm install -D`
* Rename `.env.example` to `.env` and provide values. `TMDB_API_KEY` is required
* Start in development mode `npm run dev`

## Request
If service is started on port `3000`
```bash
curl --request GET 'http://localhost:3000/api/trailer?url=https://content.viaplay.se/pc-se/film/everest-2015'
```

## Response
* `code` 1 means success
* `data` API response data
```javascript
{"code":1,"data":{"url":"https://www.youtube.com/watch?v=5CKZwKpV06U","type":"trailer"}}
```

## Tests
`npm test`

## Containerize 🐋
```bash
docker build -t trailerapp .
docker container run -e TMDB_API_KEY='somekey' -p 3000:3000 -d trailerapp
```

## Improvements left
- Http response codes from the viaplay content service can be forwarded.
- Implementation of Circuit Breaker can help, however timeout has been added to HTTP services.
- Cache trailers by the imdb ID to improve service response and depedent service downtime.

## Add more services
- Create a new service by extending `lib/services/base-trailer.js` and implementing the `getTrailer` method.
- Update `lib/helpers/get-trailer.js` Factory method to provide new service to controller.
- Update `config/app.js` to swtich service.
