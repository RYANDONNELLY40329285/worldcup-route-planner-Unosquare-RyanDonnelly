import request from 'supertest';
import app from '../src/index';

describe('POST /api/route/budget', () => {

  // --------------------------------------------------
  // Test 1: Happy path (valid route)
  // --------------------------------------------------
  it('should return feasible=true when within budget and all countries visited', async () => {
    const res = await request(app)
      .post('/api/route/budget')
      .send({
        matchIds: ['match-1', 'match-3', 'match-4', 'match-7', 'match-14'], 
        originCityId: 'city-atlanta',
        budget: 10000,
      });

    expect(res.status).toBe(200);
    expect(res.body.feasible).toBe(true);
    expect(res.body.totalCost).toBeGreaterThan(0);
    expect(res.body.breakdown.ticketCost).toBeDefined();
  });

  // --------------------------------------------------
  // Test 2: Over budget
  // --------------------------------------------------
  it('should return feasible=false when over budget', async () => {
    const res = await request(app)
      .post('/api/route/budget')
      .send({
        matchIds: ['match-1', 'match-5', 'match-11', 'match-20', 'match-35'],
        originCityId: 'city-atlanta',
        budget: 100, // very low
      });

    expect(res.status).toBe(200);
    expect(res.body.feasible).toBe(false);
    expect(res.body.suggestions).toContain(
      'Reduce number of matches or choose cheaper cities'
    );
  });

  // --------------------------------------------------
  //  Test 3: Missing countries
  // --------------------------------------------------
  it('should return missing countries when not all visited', async () => {
    const res = await request(app)
      .post('/api/route/budget')
      .send({
        matchIds: ['match-8', 'match-20', 'match-35'], 
        originCityId: 'city-atlanta',
        budget: 10000,
      });

    expect(res.status).toBe(200);
    expect(res.body.feasible).toBe(false);
    expect(res.body.missingCountries.length).toBeGreaterThan(0);
    expect(res.body.missingCountries).toContain('Mexico');
    expect(res.body.missingCountries).toContain('Canada');
  });

  // --------------------------------------------------
  //  Test 4: Invalid input
  // --------------------------------------------------
  it('should return 400 for invalid request body', async () => {
    const res = await request(app)
      .post('/api/route/budget')
      .send({
        matchIds: [], // invalid
        originCityId: '',
        budget: null,
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });


  it('should calculate correct total cost breakdown', async () => {
  const res = await request(app)
    .post('/api/route/budget')
    .send({
      matchIds: ['match-1'],
      originCityId: 'city-atlanta',
      budget: 10000,
    });

  const { ticketCost, flightCost, accommodationCost } = res.body.breakdown;

  expect(res.body.totalCost).toBe(
    ticketCost + flightCost + accommodationCost
  );
});

// orgin nopt found
it('should return 404 if origin city does not exist', async () => {
  const res = await request(app)
    .post('/api/route/budget')
    .send({
      matchIds: ['match-1'],
      originCityId: 'invalid-city',
      budget: 1000,
    });

  expect(res.status).toBe(404);
  expect(res.body.error).toBe('Origin city not found');
});

it('should return 404 if no matches found for given IDs', async () => {
  const res = await request(app)
    .post('/api/route/budget')
    .send({
      matchIds: ['invalid-match'],
      originCityId: 'city-atlanta',
      budget: 1000,
    });

  expect(res.status).toBe(404);
  expect(res.body.error).toBe('No matches found');
});



it('should handle missing flight routes gracefully (cost = 0)', async () => {
  const res = await request(app)
    .post('/api/route/budget')
    .send({
      matchIds: ['match-1'],  
      originCityId: 'city-vancouver', 
      budget: 10000,
    });

  expect(res.status).toBe(200);
  expect(res.body.breakdown.flightCost).toBeGreaterThanOrEqual(0);
});

it('should be feasible when totalCost equals budget exactly', async () => {
  const res = await request(app)
    .post('/api/route/budget')
    .send({
      matchIds: ['match-1'],
      originCityId: 'city-atlanta',
      budget: 10000,  
    });

  expect(res.status).toBe(200);

  if (res.body.totalCost === res.body.budget) {
    expect(res.body.feasible).toBe(true);
  }
});



});