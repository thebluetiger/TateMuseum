# TateMuseum

## Setup

You will need a MySQL server running and will need to create a .env file that matches format of the provided .env.example file.

For the environment file you need to provide the MySQL server address, port, username, password, and database name. Tables will automatically be generated if the synchronize environment variable is set to `true`.

## Running the server

After the .env file is created, From the root directory of this project, you will run the following commands to start the server.

```
npm i
npm start
```

This will start the application running on port 3000. You can access all of the routes by visiting http://localhost:3000 in your browser.

## Importing Data

To import the data, I built an import controller which allows you to visit the two following URLs to import and clean the database.

[Import Data (http://localhost:3000/import)](http://localhost:3000/import)
[Clear Data (http://localhost:3000/import/clear)](http://localhost:3000/import/clear)

## Testing Endpoints

Included in the project is a Postman collection export. The file is named `Tate.postman_collection.json` and once imported to postman can be used to exercise each endpoint to validate both inputs and http codes.
