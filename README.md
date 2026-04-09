![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![React](https://img.shields.io/badge/React-Frontend-blue)

#  World Cup 2026 Travel Planner 

Unosquare Graduate / Junior SWE Coding Challenge

## Overview 

Full stack web app for planing an optimised travel route accross the 2026 Host nations (Canada, Mexico, USA)
End users can select matches, calculate total trip cost and get an optimised travel route. 

## Architecture Overiew 

### Frontend (React + TypeScript)
-- Built with Ract + Rite 
-- Includes an interactive map (react-leaflet)
-- Uses React Hookls and integrates with backend via Rest API 

### Backend (Node.js and Express)

-- REST API built Express 
-- Data models (matches, cities, flights, itineraries)
-- Route optimisation (Nearest-Neighbour) 
 -- Best value combinatorial optimisation  

 ## Project Structure  

 ### Backend (/backend/node -express)

```
/backend/node-express
├── src/
│   ├── bonus/
│   │   └── BestValueFinder.ts        # Advanced optimisation logic
│   ├── db/
│   │   ├── connection.ts             # Database connection
│   │   ├── schema.sql                # Schema
│   │   └── seed.ts                   # Seed data
│   ├── models/
│   │   ├── City.ts
│   │   ├── FlightPrice.ts
│   │   ├── Itinerary.ts
│   │   ├── Match.ts
│   │   └── Team.ts
│   ├── routes/
│   │   ├── cities.ts
│   │   ├── itineraries.ts
│   │   ├── matches.ts
│   │   └── optimise.ts
│   ├── strategies/
│   │   ├── DateOnlyStrategy.ts
│   │   ├── NearestNeighbourStrategy.ts
│   │   └── RouteStrategy.ts
│   ├── utils/
│   │   ├── buildRoute.ts
│   │   ├── CostCalculator.ts
│   │   └── haversine.ts
│   └── index.ts
├── __tests__/
│   ├── Budget.test.ts
│   └── NearestNeighbourStrategy.test.ts
├── package.json
├── tsconfig.json
├── jest.config.ts
└── worldcup.db
```


### Frontend (/frontend)

```
/frontend
├── src/
│   ├── api/
│   │   └── client.ts
│   ├── components/
│   │   ├── BestValueDialog.tsx
│   │   ├── BudgetPlanner.tsx
│   │   ├── CostBreakdownPanel.tsx
│   │   ├── ItineraryPanel.tsx
│   │   ├── MatchBrowser.tsx
│   │   ├── MatchCard.tsx
│   │   ├── MatchSelector.tsx
│   │   └── RouteMap.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── App.css
├── __tests__/
│   └── RouteMap.test.tsx
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```


##  Setup 

### Preequisties 

Node.js   
npm  

### Backend 

cd backend/node-express 
npm install 
npm run dev 

Server runs on: 

http://localhost:3008 

### Frontend 

cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173

## Key API Endpooints 

### GET /api/cities 
returns all cities 

### GET /api/matches

returns all Matches  

-- can be searched city ?city= 
-- can be searched bt Date ?date 
-- can be searched by both city and date ?city=atlanta&date=2026-06-14 
-- can be searched by match id  /match-1

### POST /api/route/optimise 

runs optimised route  

### POST /api/route/budget 

calculates and returns if a route is viable  

### POST /api/route/best-value  

Finds the best value out of a route

### POST /api/itneraries  

Saves an itinerary 

### GET /api/itneraries
returns itenerary from  it id 

### GET api/health 

Checks health of the backend server 

## Testing 

### Backend 

npm test 

uses: 
    Jest 
    Supertest  

Tests Include: 
    Route optimisation 
    Budget Calculations 
    Edge Cases 

### Frotnend 

npm test 

Includes: 
    Component rendering tests 
    RouteMap Behaviour 
    Edge cases 


## Documentation folder 

Unit tests test table results  
Postman screenshot results 
And documentation and design decisions for a further break down. 
Calulcate Budget and Route Optimisation flow 
