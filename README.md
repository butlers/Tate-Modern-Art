# Tate-Modern-Art

## Video Walkthrough

https://www.loom.com/share/2f2a8bf2b9114eeaa8e9b55912d86f8c?sid=fff7e9cc-e1b9-4ad4-8a3d-8759099ea033


## Prerequisites

- Docker

## Setup

To run this project, make sure you have Docker installed and the Docker daemon is running in the background.

Execute the following command to build the Docker container and start the server:

```bash
docker system prune -f && docker build -t my-node-app . && docker-compose up
```

## Initializing Database

After the server is up and running, follow these steps to initialize the database:


## Step 1: Setup Postgres Tables
Hit the following endpoint to initialize PostgreSQL database tables:

```bash
curl -X GET http://localhost:13000/setup-tables
```

## Step 2: Populate Database
To populate the newly created database tables with data from the-tate-collection.csv, use:

```bash
curl -X GET http://localhost:13000/initialize-database
```


---


# How to Interact with Endpoints
Once the database is set up, feel free to explore the various endpoints provided by the server.
Each endpoint is contained within the `server.js` file, and examples of hitting each endpoint can be found within the `test/test.rest` file.

## Setup Art Tables

Initialize PostgreSQL database tables for art entries.

```http
GET http://localhost:13000/setup-tables
```

## Initialize Art Database

Populate the art database with data from the-tate-collection.csv.

```http
GET http://localhost:13000/initialize-database
```

## Get Art Entries

Retrieve all art entries from the database. Because of the size of data, this is a paginated endpoint, and will return 10 entires at a time.

```http
GET http://localhost:13000/api/art
```

## Get Art Entry by ID
Retrieve details for an existing art entry by providing the art ID.
- Returns 200 with Art entry if found
- Returns 404 if no entry exists
  
```http
GET http://localhost:13000/api/art/20400
```

## Create New User

Creates a new user given a valid name, age and location

```http
POST http://localhost:13000/api/users
Content-Type: application/json

{
  "name": "Samuel Butler",
  "age": 29,
  "location": "San Francisco"
}
```

## Crew New Comment
Create a new comment for a specific art entry with a valid user ID, name, and content.

```http
POST http://localhost:13000/api/art/20400/comments
Content-Type: application/json

{
  "userID": 123,
  "name": "John Doe",
  "content": "This is a great piece of art!"
}
```
