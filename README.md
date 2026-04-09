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
├── src/
│   ├── bonus/
│   │   └── BestValueFinder.ts        # Advanced optimisation logic
│   │
│   ├── db/
│   │   ├── connection.ts            # Database connection setup
│   │   ├── schema.sql               # Database schema
│   │   └── seed.ts                  # Seed data for testing
│   │
│   ├── models/
│   │   ├── City.ts                  # City data model
│   │   ├── FlightPrice.ts           # Flight pricing model
│   │   ├── Itinerary.ts             # Travel itinerary model
│   │   ├── Match.ts                 # Match data model
│   │   └── Team.ts                  # Team data model
│   │
│   ├── routes/
│   │   ├── cities.ts                # City-related endpoints
│   │   ├── itineraries.ts           # Itinerary generation endpoints
│   │   ├── matches.ts               # Match data endpoints
│   │   └── optimise.ts              # Route optimisation endpoints
│   │
│   ├── strategies/
│   │   ├── DateOnlyStrategy.ts      # Date-based route planning
│   │   ├── NearestNeighbourStrategy.ts  # Greedy optimisation algorithm
│   │   └── RouteStrategy.ts         # Strategy interface
│   │
│   ├── utils/
│   │   ├── buildRoute.ts            # Route construction logic
│   │   ├── CostCalculator.ts       # Travel cost calculations
│   │   └── haversine.ts            # Distance calculations
│   │
│   └── index.ts                    # Application entry point
│
├── __tests__/
│   ├── Budget.test.ts
│   └── NearestNeighbourStrategy.test.ts
│
├── package.json                    # Dependencies & scripts
├── tsconfig.json                   # TypeScript config
├── jest.config.ts                  # Testing configuration
├── worldcup.db                     # SQLite database



### Frontend (/frontend)
/frontend
├── src/
│   ├── api/
│   │   └── client.ts              # API client for backend communication
│   │
│   ├── components/
│   │   ├── BestValueDialog.tsx    # Displays best-value travel options
│   │   ├── BudgetPlanner.tsx      # Budget planning UI
│   │   ├── CostBreakdownPanel.tsx # Cost analysis view
│   │   ├── ItineraryPanel.tsx     # Displays generated itineraries
│   │   ├── MatchBrowser.tsx       # Browse available matches
│   │   ├── MatchCard.tsx          # Individual match UI component
│   │   ├── MatchSelector.tsx      # Select matches for planning
│   │   └── RouteMap.tsx           # Visual map of travel route
│   │
│   ├── types/
│   │   └── index.ts               # Shared TypeScript types
│   │
│   ├── App.tsx                   # Root React component
│   ├── main.tsx                  # Application entry point
│   └── App.css                   # Global styles
│
├── __tests__/
│   └── RouteMap.test.tsx         # Component tests
│
├── index.html                   # Vite HTML entry
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript config
├── package.json                 # Dependencies & scripts



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


## Documentation 

Unit tests test table results  
Postman screenshot results 
And documentation and design decisions for a further break down. 
