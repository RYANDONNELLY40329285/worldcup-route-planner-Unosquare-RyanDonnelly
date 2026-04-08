import { Router } from 'express';
import * as MatchModel from '../models/Match';

const router = Router();

/**
 * Match Routes — YOUR TASK #2
 *
 * Implement the REST endpoints for matches.
 */

// ============================================================
//  GET /api/matches — Return matches with optional filters
// ============================================================
//
// TODO: Implement this endpoint
//
// Query parameters (both optional):
//   ?city=city-atlanta    → filter by city ID
//   ?date=2026-06-14      → filter by date (YYYY-MM-DD)
//
// Hint: MatchModel.getAll() accepts an optional filters object:
//   MatchModel.getAll({ city: 'city-atlanta', date: '2026-06-14' })
//
// The model already handles the filtering — you just need to
// extract the query params and pass them through.
//
// Expected response: [{ id, homeTeam, awayTeam, city, kickoff, group, matchDay }, ...]
//   where homeTeam, awayTeam, and city are full objects (not just IDs)
//
// ============================================================
router.get('/', (req, res) => {
  try {
    // Extract and safely type query params
    const city = typeof req.query.city === 'string' ? req.query.city : undefined;
    const date = typeof req.query.date === 'string' ? req.query.date : undefined;

    // Delegate filtering logic to model layer
    const matches = MatchModel.getAll({ city, date });

    return res.status(200).json(matches);

  } catch (error) {
    console.error('[GET /api/matches] Error:', error);

    return res.status(500).json({
      error: 'Failed to fetch matches',
    });  
  }
});


// ============================================================
//  GET /api/matches/:id — Return a single match by ID
// ============================================================
//
// TODO: Implement this endpoint
//
// Hint: MatchModel.getById(id) returns a match or undefined.
// Return 404 if the match is not found.
//
// ===========================================================
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Match ID is required' });
    }
  
    const match = MatchModel.getById(id);

    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    return res.status(200).json(match);

  } catch (error) {
    console.error(`[GET /api/matches/${req.params.id}] Error:`, error);

    return res.status(500).json({
      error: 'Failed to fetch match',
    });
  }
});


export default router;
