import { NearestNeighbourStrategy } from '../src/strategies/NearestNeighbourStrategy';
import { MatchWithCity, City } from '../src/strategies/RouteStrategy';


/**
 * NearestNeighbourStrategyTest — YOUR TASK #4
 *
 * ============================================================
 * WHAT YOU NEED TO IMPLEMENT:
 * ============================================================
 *
 * Write unit tests for the NearestNeighbourStrategy.
 * Each test has a TODO comment explaining what to test.
 *
 */

describe('NearestNeighbourStrategy', () => {
  let strategy: NearestNeighbourStrategy;

 // Mock cities
  const atlanta: City = {
    id: 'city-atlanta',
    name: 'Atlanta',
    country: 'USA',
    latitude: 33.7553,
    longitude: -84.4006,
    stadium: '',
    accommodation_per_night: 100,
  };

  const mexicoCity: City = {
    id: 'city-mexico-city',
    name: 'Mexico City',
    country: 'Mexico',
    latitude: 19.4326,
    longitude: -99.1332,
    stadium: '',
    accommodation_per_night: 100,
  };

  const toronto: City = {
    id: 'city-toronto',
    name: 'Toronto',
    country: 'Canada',
    latitude: 43.651,
    longitude: -79.347,
    stadium: '',
    accommodation_per_night: 100,
  };

  // Helper function to create matches
  const createMatch = (
    id: string,
    date: string,
    city: City
  ): MatchWithCity => ({
    id,
    kickoff: `${date}T12:00:00Z`,
    group: 'A',
    matchDay: 1,
    ticketPrice: 100,
    homeTeam: { id: 'h', name: 'Home', code: 'H', group: 'A' },
    awayTeam: { id: 'a', name: 'Away', code: 'A', group: 'A' },
    city,
  });



// Re-initialise strategy before each test to ensure test isolation
beforeEach(() => {
  strategy = new NearestNeighbourStrategy();
});
  it('should return a valid route for multiple matches (happy path)', () => {
    // TODO: Implement test
    // Arrange: Create an array of matches across different cities and dates
    // Act: Call strategy.optimise(matches)
    // Assert: Verify the result has stops, totalDistance > 0, and strategy = 'nearest-neighbour'

      const matches = [
      createMatch('1', '2026-06-11', atlanta),
      createMatch('2', '2026-06-12', mexicoCity),
      createMatch('3', '2026-06-13', toronto),
      createMatch('4', '2026-06-14', atlanta),
      createMatch('5', '2026-06-15', mexicoCity),
    ];

    const route = strategy.optimise(matches, atlanta);

  expect(route.stops.length).toBeGreaterThanOrEqual(5); 
  expect(route.totalDistance).toBeGreaterThan(0);
  expect(route.strategy).toBe('nearest-neighbour');
  expect(route.feasible).toBe(true); 

  expect(route.countriesVisited).toEqual(
    expect.arrayContaining(['USA', 'Mexico', 'Canada'])
  );


  });

  it('should return an empty route for empty matches', () => {
    // TODO: Implement test
    // Arrange: Create an empty array of matches
    // Act: Call strategy.optimise([])
    // Assert: Verify the result has empty stops and totalDistance = 0
    const route = strategy.optimise([], atlanta);
    
    expect(route.stops.length).toBe(0);
    expect(route.totalDistance).toBe(0);
    expect(route.feasible).toBe(false);
  });

  it('should return zero distance for a single match', () => {
    // TODO: Implement test
    // Arrange: Create an array with a single match
    // Act: Call strategy.optimise(matches)
    // Assert: Verify totalDistance = 0 and stops.length = 1
    const matches = [
      createMatch('1', '2026-06-11', atlanta),
    ];
    const route = strategy.optimise(matches, atlanta);

    expect(route.stops.length).toBe(1);
    expect(route.totalDistance).toBe(0);
  });
});
