# Cars Find You :red_car:

**Final Project** for [CS5500](https://ccis.northeastern.edu/home/pgust/classes/cs5500/2021/Spring/) Foundation of Software Engineering at Northeastern University 

**Instructor:** [Philip Gust](http://www.ccis.northeastern.edu/home/pgust/)


# Introduction

Buying a car is a laborious task. Usually, it takes people a lot of time and effort to search for matching cars, compare car specs and negotiate with dealers. To make this process more efficient, we decide to build a user-friendly car trading website. Unlike other websites where buyers find dealers, people can post their demands and expectations here and wait for dealers to match the posts.

### Developers

- Cheng-Yu Wang, arieswwang
- Qianwen Zhang, qwzhang
- Siluo Feng, siluofeng
- Xue Wu, sherry719
- Yao Xiao, xiaoyao5
- Yeqing Huang, yeqing2020
- Yibo Zhao, yibozhao1003

### Customer representative

- Abi Singh

### Tech Stack

- Database: MongoDB + Mongoose
- Backend: Express + Typescript + Auth0
- Frontend: React + Redux + Auth0 + Material UI

### Feature
- Users are supposed to select their identity as a dealer or buyer when registering at the beginning

- Buyers are the users who want to buy cars. Buyers can post their demands including brand, year, model, condition, mileage, color and affordable price range on the website and wait for dealers to contact them. 
- Dealers are the users who want to sell cars. They can search buyers’ posts on the website and contact buyers if they are good matches.


## Project structure

| Location                     | Description                                                             | 
| ---------------------------- | ----------------------------------------------------------------------- |
| docs/index.html              | The homepage of this project                                            |       
| docs/communication-plans.pdf | The communication plans. It will be updated if needs change             |       
| frontend/                    | The codebase of frontend                                                |       
| backend/                     | The codebase of backend                                                 |       

## Mongoose Structure

collection: car 
| Field                        | Type                                |   Usage                            |
| ---------------------------- | ------------------------------------|------------------------------------|
| dealerId                     | string                              | dealers' Id in MongoDN             |
| vin                          | string                              | Vehicle Identification Number      |
| carMake                      | string                              | vechicle manufacturers             |
| carModel                     | string                              | venicle model                      |
| mileage                      | number                              | venicle mileage                    |
| color                        | string                              | Vehicle color                      |
| price                        | number                              | selling price                      |
| year                         | string                              | model year                         |
| creaedAt                     | Date                                | vehicle's info created date        |
| updatedAt                    | Date                                | vehicle's info updated date        |

collection: user

| Field                        | Type                                |   Usage                            |
| ---------------------------- | ------------------------------------|------------------------------------|
| auth0Id                      | string                              | user's Id in Auth0                 |
| username                     | string                              | username in MongoDB                |
| email                        | string                              | user's email                       |
| phone                        | string                              | user's phone number                |
| role                         | UserRole(enum)                      | user's identity : buyer or dealer  |
| creaedAt                     | Date                                | user's info created date           |
| updatedAt                    | Date                                | user's info updated date           |

*UserRole = "BUYER" | "DEALER"


collection: post
| Field                        | Type                                | Usage                              |
| ---------------------------- | ------------------------------------|------------------------------------|
| userId                       | string                              | user's Id in MongoDB               |
| title                        | string                              | the post's title                   |
| carMake?                     | string                              | vechicle manufacturers             |
| carModel?                    | string                              | venicle model                      |
| carYear?                     | string                              | vehicle registered year            |
| zipCode?                     | string                              | users' zip code                    |
| radius?                      | number                              | radius                             |
| mileage?                     | number                              | venicle mileage                    |
| trim?                        | string                              | venicle trim                       |
| color?                       | string                              | Vehicle color                      |
| image?                       | string                              | url tovehicle's picture            |
| price                        | number                              | selling price                      |
| drivetrain?                  | string                              | vehicle derivetrain                |
| additionalInformation?       | string                              | additional information             |
| creaedAt                     | Date                                | postcreated date                   |
| updatedAt                    | Date                                | post updated date                  |

 *fields associate with ? are optional 
 
collection: offer
| Field                        | Type                                |   Usage                            |
| ---------------------------- | ------------------------------------|------------------------------------|
| postId                       | Type.ObjectId                       | postId in MongoDB                  |
| carId                        | Type.ObjectId                       | carId in MongoDB                   |
| dealerId                     | string                              | dealer's Id in MongoDB             |
| additionalInformation?       | string                              | additional information             |
| status                       | OfferStatus(enum)                   | offer status                       |
| creaedAt                     | Date                                | offer created date                 |
| updatedAt                    | Date                                | offer updated date                 |

 *OfferStatus = "PENDING" | "ACCEPT" | "DECLINE" | "CANCEL";

## Instruction to build

Create a folder on your pc <br />
Open two terminals, one starts backend and the other starts frontend

Your pc should install package manager [npm](https://docs.npmjs.com/cli/v6/commands/npm-install).
```bash
cd the folder 
git clone https://github.ccs.neu.edu/2021SPCS5500SB/project-cars_find_you.git
cd project-cars_find_you 
cd backend
npm install
npm start
cd frontend
npm install
yarn build
yarn start

```
The project will be poped up automatically in your browser otherwise navigate to: http://localhost3000 in your browser
