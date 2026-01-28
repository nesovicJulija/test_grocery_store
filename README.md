# Grocery Store App

## Features

- Product listing
- User authentication and authrorization
- Inserting data in DB
- Starting server and fetching data
- Running unit tests

## Stack

- TypeScript
- Node.js
- MongoDB

## Instalation

1. Clone repository : git clone https://github.com/nesovicJulija/test_grocery_store.git
2. Navigate to project : cd test_grocery_store
3. Install all necessary dependencies : npm install
4. If needed more : npm install --save-dev typescript ts-node @types/node (for setting ts up)
                    npm init -y (create package.json)
                    npm install mongodb (install mongodb)
                    npm install --save-dev @types/mongodb (adding types for ts)
                    npm i express bcrypt dotenv mongoose (needed for authentication)
                    npm i nodemon --save-dev
                    npm i --save-dev @types/express
                    npm install passport passport-local passport-jwt bctypt (needed for authentication)
                    npm install express-session connect-mongo  (saving sessions)
                    npm install -D @types/express-session
                    npm install install --save-dev mocha chai
                    npm install --save-dev @types/mocha @types/chai (for testing)
     
6. If you do not have Postman installed, than do it with :
    - sudo snap install postman (Linux)
    - download postman from : https://www.postman.com/downloads/ (Windows)
                                                             
## Running project

1. Fist run db:
   - Open terminal and type : sudo systemctl start mongod(Linux), new start MongoDB(Windows)
   - Open MongoDB Compass and connect to your database

2. Open Visual Studio Code and position in test_grocery_store:
3. Run script insertIntoDB.ts to insert data in database :
  - npm run build
  - npm run insert
4. Run server.ts to start server and fetch data:
  - npm run dev
5. These endpoints are used for fetching data:
  - /api/nodes/:id/employees -> retrieving all employees for one node
  - /api/nodes/:id/managers -> retrieving all managers for one node
  - /api/nodes/descendants/:id/employees -> retrieving all employees for one node and all his descendants
  - /api/nodes/descendants/:id/managers -> retrieving all managers for one node and all his descendants
  (Note : id used in this points is nodeId)

6. Run unit tests with :
  - npm run test      
   
                                      
