# Cars Find You - backend

## Install Dependencies

After cloning the project from Github, run `npm install` in this directory to install all dependencies.

## Create .env File

Create a environment file `.env` in this directory. This file defines environment variables. Here is a template of the env file.

```
MONGO_URL=
PORT=
AUTH0_DOMAIN=
AUTH0_API_TOKEN=
```

## Start the Development

Run `npm run dev` to start a backend dev server. This dev server is boosted by `nodemon`. Everytime you make modifications to source files, the dev server would re compile all source file and restart.

## Project Structure

| File or Folder | Description                                       |
| -------------- | ------------------------------------------------- |
| src/index.ts   | Entry point of the server                         |
| src/config.ts  | Load env file                                     |
| src/db-init.ts | Initialize mongodb and mongoose                   |
| src/models     | Declaration and definition of mongodb collections |
| src/routers    | Api routers                                       |
