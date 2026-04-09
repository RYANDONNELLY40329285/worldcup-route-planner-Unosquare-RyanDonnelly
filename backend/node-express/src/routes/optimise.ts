import { Router } from 'express';
import * as MatchModel from '../models/Match';
import * as CityModel from '../models/City';
import { DateOnlyStrategy } from '../strategies/DateOnlyStrategy';
// Tip: You can also import DateOnlyStrategy to compare results
import { NearestNeighbourStrategy } from '../strategies/NearestNeighbourStrategy';
import * as FlightModel from '../models/FlightPrice';

const router = Router();

/**
 * Route Optimisation Routes — YOUR TASKS #3 and #5
 */

// ============================================================
//  POST /api/route/optimise — YOUR TASK #3
// ============================================================
//
// TODO: Implement this endpoint
//
// Request body: { matchIds: ["match-1", "match-5", "match-12", ...], originCityId: "city-atlanta" }
//
// Steps:
//   1. Extract matchIds and originCityId from req.body
//   2. Fetch the full match data: MatchModel.getByIds(matchIds)
//   3. Fetch origin city: CityModel.getById(originCityId)
//   4. Create a strategy instance: new NearestNeighbourStrategy()
//      (or new DateOnlyStrategy() to test with the working example first)
//   5. Call strategy.optimise(matches, originCity)
//   6. Return the optimised route as JSON
//
// TIP: Start by using DateOnlyStrategy to verify your endpoint works,
// then switch to NearestNeighbourStrategy once you've implemented it.
//
// ============================================================

router.post('/optimise', (req, res) => {
  try {
    const { matchIds, originCityId } = req.body;

    // Validation
    if (!Array.isArray(matchIds) || matchIds.length === 0) {
      return res.status(400).json({ error: 'matchIds must be a non-empty array' });
    }

    if (!originCityId) {
      return res.status(400).json({ error: 'originCityId is required' });
    }

  
    // Fetch data
    const matches = MatchModel.getByIds(matchIds);
    const originCity = CityModel.getById(originCityId);

    if (!originCity) {
      return res.status(404).json({ error: 'Origin city not found' });
    }

    if (matches.length === 0) {
      return res.status(404).json({ error: 'No matches found for given IDs' });
    }
   
    const strategy = new NearestNeighbourStrategy();

    const route = strategy.optimise(matches, originCity);

    return res.status(200).json(route);

  } catch (error) {
    console.error('[POST /api/route/optimise] Error:', error);

    return res.status(500).json({
      error: 'Failed to optimise route',
    });
  }
});

// ============================================================
//  POST /api/route/budget — YOUR TASK #5
// ============================================================
//
// TODO: Implement this endpoint
//
// Request body:
// {
//   "budget": 5000.00,
//   "matchIds": ["match-1", "match-5", "match-12", ...],
//   "originCityId": "city-atlanta"
// }
//
// Steps:
//   1. Extract budget, matchIds, and originCityId from req.body
//   2. Fetch matches by IDs: MatchModel.getByIds(matchIds)
//   3. Fetch origin city: CityModel.getById(originCityId)
//   4. Fetch all flight prices from the database
//   5. Use the CostCalculator to calculate the budget result
//   6. Return the BudgetResult as JSON
//
// Hint: Import and use the CostCalculator from '../utils/CostCalculator'
//
// IMPORTANT CONSTRAINTS:
//   - User MUST attend at least 1 match in each country (USA, Mexico, Canada)
//   - If the budget is insufficient, return feasible=false with:
//     - minimumBudgetRequired: the actual cost
//     - suggestions: ways to reduce cost
//   - If countries are missing, return feasible=false with:
//     - missingCountries: list of countries not covered
//
// ============================================================
router.post('/budget', (req, res) => {
  try {
    const { matchIds, originCityId, budget } = req.body;

    // Validation
    if (!Array.isArray(matchIds) || matchIds.length === 0) {
      return res.status(400).json({ error: 'matchIds must be a non-empty array' });
    }

    if (typeof originCityId !== 'string' || typeof budget !== 'number') {
      return res.status(400).json({ error: 'originCityId and budget are required' });
    }

    const matches = MatchModel.getByIds(matchIds);
    const originCity = CityModel.getById(originCityId);
    const flights = FlightModel.getAll();

    if (!originCity) {
      return res.status(404).json({ error: 'Origin city not found' });
    }

    if (matches.length === 0) {
      return res.status(404).json({ error: 'No matches found' });
    }


    // Build flight lookup
    const flightMap = new Map<string, number>(
      flights.map((f: any) => [
        `${f.origin_city_id}-${f.destination_city_id}`,
        f.price_usd,
      ])
    );


    // Ticket cost
    const ticketCost = matches.reduce((sum, m) => sum + m.ticketPrice, 0);

  
    // Flight cost
    let flightCost = 0;
    let currentCityId = originCity.id;

    for (const match of matches) {
      const key = `${currentCityId}-${match.city.id}`;
      const price = Number(flightMap.get(key) ?? 0);

      flightCost += price;
      currentCityId = match.city.id;
    }

    // Accommodation cost (1 night per match)
    const accommodationCost = matches.reduce(
      (sum, m) => sum + m.city.accommodation_per_night,
      0
    );


    // Total cost
    const totalCost = ticketCost + flightCost + accommodationCost;

    // Country validation
    const countriesVisited = Array.from(
      new Set(matches.map(m => m.city.country))
    );

    const REQUIRED_COUNTRIES = ['USA', 'Mexico', 'Canada'];

    const missingCountries = REQUIRED_COUNTRIES.filter(
      c => !countriesVisited.includes(c)
    );

    // Feasibility
    const withinBudget = totalCost <= budget;
    const hasAllCountries = missingCountries.length === 0;
    const feasible = withinBudget && hasAllCountries;

    // Suggestions
    const suggestions: string[] = [];

    if (!withinBudget) {
      suggestions.push('Reduce number of matches or choose cheaper cities');
    }

    if (!hasAllCountries) {
      suggestions.push(`Add matches in: ${missingCountries.join(', ')}`);
    }

    // Response
   return res.status(200).json({
      feasible,
      countriesVisited,
      missingCountries,
      suggestions,

      costBreakdown: {
        flights: flightCost,
        accommodation: accommodationCost,
        tickets: ticketCost,
        total: totalCost,
      },

      minimumBudgetRequired: totalCost, 
    });

  } catch (error) {
    console.error('[POST /api/route/budget] Error:', error);

    return res.status(500).json({
      error: 'Failed to calculate budget',
    });
  }
}); 


// ============================================================
//  POST /api/route/best-value — BONUS CHALLENGE #1
// ============================================================
//
// TODO: Implement this endpoint (BONUS)
//
// Request body:
// {
//   "budget": 5000.00,
//   "originCityId": "city-atlanta"
// }
//
// Steps:
//   1. Extract budget and originCityId from req.body
//   2. Fetch all matches: MatchModel.getAll()
//   3. Fetch origin city: CityModel.getById(originCityId)
//   4. Fetch all flight prices from the database
//   5. Use the BestValueFinder to find the best combination
//   6. Return the BestValueResult as JSON
//
// Hint: Import and use the BestValueFinder from '../bonus/BestValueFinder'
//
// ============================================================

router.post('/best-value', (req, res) => {
  // TODO: Replace with your implementation (BONUS)
  res.status(200).json({});
});

export default router;
