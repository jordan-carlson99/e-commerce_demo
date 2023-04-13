# e-commerce full stack minimum viable product

### Description

Under a time constraint deliver a full stack web application demo + api from concept to deployment with full CRUD operations

![desktopscrenshot](./images/e-commerce-mvp.png)

### Technologies

This project was developed using the following:

- Express
- Docker
- Postgresql
- Node-Postgres

### Features

- Full CRUD operations on postgresql database
- Responsive UI built using CSS flex
- User management table with cart persistence for users
- Distinct static-site and API server for modularity
- Minimized client queries to shop API using DOM API reducing latency

### Usage

Docker containerization on the way. In the mean time, a local deployment can be achieved by the following:

1. set environment variables in a .env file:
   - static site port
     - _frontPort=3000_
   - static site url
     - _frontURL="127.0.0.1"_
   - connection string to database
     - _connectionString="postgres://username:password@host:port/database"_
   - port for API
     - _backPort=3500_
   - url for API
     - _backURL="127.0.0.15"_
2. in repo folder run command `npm install`
3. then run command `npm run dev`

Site will be hosted to your static site url variable (ex. http://127.0.0.1:3000/)

---

### Database ERD:

![erd](./images/mvp-erd.png)

---

### Phone view:

![phoneview](./images/e-commerce-mvp-phone.png)
