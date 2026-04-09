import { render, screen } from '@testing-library/react';
import RouteMap from '../src/components/RouteMap';
import { OptimisedRoute } from '../src/types';


jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }: any) => <div data-testid="map">{children}</div>,
  TileLayer: () => <div data-testid="tile" />,
  Marker: ({ children }: any) => <div data-testid="marker">{children}</div>,
  Popup: ({ children }: any) => <div>{children}</div>,
  Polyline: () => <div data-testid="polyline" />,
}));

describe('RouteMap', () => {

  // --------------------------------------------------
  // Test 1: Placeholder
  // --------------------------------------------------
  it('should render placeholder message when route is null', () => {
    render(<RouteMap route={null} originCity={null} />);

    expect(
      screen.getByText(/Validate a route to see it displayed/i)
    ).toBeInTheDocument();
  });

  // --------------------------------------------------
  // Test 2: Map renders
  // --------------------------------------------------
  it('should render a map container when route is provided', () => {
    const mockRoute: OptimisedRoute = {
      stops: [],
      totalDistance: 0,
      strategy: 'nearest-neighbour',
      feasible: false,
      warnings: [],
      countriesVisited: [],
      missingCountries: [],
    };

    render(<RouteMap route={mockRoute} originCity={null} />);

    expect(screen.getByTestId('map')).toBeInTheDocument();
  });

  // --------------------------------------------------
  // Test 3: Markers rendered
  // --------------------------------------------------
  it('should render a marker for each stop in the route', () => {
    const mockRoute: OptimisedRoute = {
      stops: [
        {
          stopNumber: 1,
          city: { id: '1', name: 'A', country: 'USA', latitude: 1, longitude: 1 },
          match: {
            id: 'm1',
            kickoff: '2026-06-11T12:00:00Z',
            homeTeam: 'A',
            awayTeam: 'B',
          },
        },
        {
          stopNumber: 2,
          city: { id: '2', name: 'B', country: 'Mexico', latitude: 2, longitude: 2 },
          match: {
            id: 'm2',
            kickoff: '2026-06-12T12:00:00Z',
            homeTeam: 'C',
            awayTeam: 'D',
          },
        },
        {
          stopNumber: 3,
          city: { id: '3', name: 'C', country: 'Canada', latitude: 3, longitude: 3 },
          match: {
            id: 'm3',
            kickoff: '2026-06-13T12:00:00Z',
            homeTeam: 'E',
            awayTeam: 'F',
          },
        },
      ],
      totalDistance: 100,
      strategy: 'nearest-neighbour',
      feasible: true,
      warnings: [],
      countriesVisited: ['USA', 'Mexico', 'Canada'],
      missingCountries: [],
    };

    render(<RouteMap route={mockRoute} originCity={null} />);

    const markers = screen.getAllByTestId('marker');
    expect(markers.length).toBeGreaterThanOrEqual(3);
  });

  // --------------------------------------------------
  // Test 4: Empty stops
  // --------------------------------------------------
  it('should handle route with empty stops array', () => {
    const mockRoute: OptimisedRoute = {
      stops: [],
      totalDistance: 0,
      strategy: 'nearest-neighbour',
      feasible: false,
      warnings: [],
      countriesVisited: [],
      missingCountries: [],
    };

    render(<RouteMap route={mockRoute} originCity={null} />);

    expect(screen.getByTestId('map')).toBeInTheDocument();
  });

});