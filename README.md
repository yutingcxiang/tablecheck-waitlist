# TableCheck SWE Fullstack Take-Home Assignment

## Specifications


## Built With
- Ruby on Rails
- React.js
- Postgres
- Docker

## Getting Started
To build the app locally, use:
```
docker-compose build
```

To run the app locally in the background, use:
```
docker-compose up -d
```

To stop the app, use:
```
docker-compose stop
```

To create, migrate, and seed the database, use:
```
docker exec tablecheck-waitlist-api-1 rake db:create db:migrate db:seed
```

To access the app, navigate to `http://localhost:3002/` for the api and `http://localhost:3000/` for the client.


## Running Tests
Client tests:

To run all the clients locally, navigate to the client folder and use:
```
npm run test
```

For running tests in watch mode use:
```
npm run test:watch
```

Api tests:
To run all the client tests in the docker container, use:
```
docker exec tablecheck-waitlist-api-1 bundle exec rspec
```

## Architecture

## Additional Considerations

## Author