import { Router } from 'express';
import * as CityModel from '../models/City';

const router = Router();

/**
 * City Routes — YOUR TASK #1
 *
 * Implement the REST endpoints for cities.
 */

// ============================================================
//  GET /api/cities — Return all host cities
// ============================================================
//
//
//
// This should return all 16 host cities as a JSON array.
//
//
// Expected response: [{ id, name, country, latitude, longitude, stadium }, ...]
//
// ============================================================

router.get('/', (_req, res) => {
  try {
    // Call the model layer to retrieve all cities
    const cities = CityModel.getAll();

    // Defensive check — ensure data exists and is an array
    if (!cities || !Array.isArray(cities)) {
      return res.status(500).json({
        error: 'Invalid data format returned from CityModel',
      });
    }

    // Return cities as JSON with default 200 status
    return res.status(200).json(cities);

  } catch (error) {
    // Log full error for debugging 
    console.error('Error fetching cities:', error);

    // Return generic error message to client (avoid leaking internals)
    return res.status(500).json({
      error: 'Failed to fetch cities',
    });
  }
});


export default router;
