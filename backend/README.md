# Cars Find You - backend

## Setup Environment

Create a `.env` file in the root of the backend folder. The file should have this two fields.

```
MONGO_URL=
PORT=
```

## Install Dependencies

After cloning the project from Github, run `npm install` in this directory to install all dependencies.

## Start the Development

Run `npm start` to start a new react dev server. This dev server is boosted by nodemon. Everytime you make modifications to source files, the dev server would re compile all source file and restart. 

## Project Structure

| File or Folder | Description                                       |
| -------------- | ------------------------------------------------- |
| src/index.ts   | Entry point of the server                         |
| src/config.ts  | Load env file                                     |
| src/db-init.ts | Initialize mongodb and mongoose                   |
| src/models     | Declaration and definition of mongodb collections |
| src/routers    | Api routers                                       |
