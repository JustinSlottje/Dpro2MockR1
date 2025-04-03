import React, { useEffect, useRef, useState, useMemo } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import Supercluster from 'supercluster';
import { Location, Play } from '../types';
import { geocodeLocations } from '../utils/geocoding';
import { Loader2 } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

if (!MAPBOX_TOKEN) {
  throw new Error('Mapbox token is required. Please add VITE_MAPBOX_TOKEN to your .env file.');
}

mapboxgl.accessToken = MAPBOX_TOKEN;

interface MapProps {
  onTerritoryUpdate: (boundaries: GeoJSON.Feature) => void;
  locations: Location[];
  selectedPlay?: Play | null;
}

interface ClusterProperties {
  locationIds: string[];
}

export function Map({ onTerritoryUpdate, locations, selectedPlay }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const draw = useRef<MapboxDraw | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [geocodedLocations, setGeocodedLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const supercluster = useMemo(() => new Supercluster<ClusterProperties>({
    radius: 40,
    maxZoom: 16,
  }), []);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-98.5795, 39.8283], // Center of USA
      zoom: 3.5,
      attributionControl: true,
      preserveDrawingBuffer: true
    });

    draw.current = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      }
    });

    map.current.addControl(draw.current);
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    const handleCreate = (e: { features: GeoJSON.Feature[] }) => {
      if (e.features && e.features[0]) {
        onTerritoryUpdate(e.features[0]);
      }
    };

    const handleUpdate = (e: { features: GeoJSON.Feature[] }) => {
      if (e.features && e.features[0]) {
        onTerritoryUpdate(e.features[0]);
      }
    };

    map.current.on('draw.create', handleCreate);
    map.current.on('draw.update', handleUpdate);

    // Add source and layer for audience circles
    map.current.on('load', () => {
      map.current?.addSource('audience-circles', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });

      // Add fill layer for circles
      map.current?.addLayer({
        id: 'audience-circles-fill',
        type: 'fill',
        source: 'audience-circles',
        paint: {
          'fill-color': ['get', 'fillColor'],
          'fill-opacity': 0.15
        }
      });

      // Add border layer for circles
      map.current?.addLayer({
        id: 'audience-circles-border',
        type: 'line',
        source: 'audience-circles',
        paint: {
          'line-color': ['get', 'borderColor'],
          'line-width': 2,
          'line-opacity': 0.5
        }
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Function to fit map bounds to locations
  const fitMapToLocations = (locs: Location[]) => {
    if (!map.current || locs.length === 0) return;

    const coordinates = locs
      .filter(loc => loc.coordinates)
      .map(loc => loc.coordinates!);

    if (coordinates.length === 0) return;

    const bounds = coordinates.reduce(
      (bounds, coord) => bounds.extend(coord as [number, number]),
      new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])
    );

    map.current.fitBounds(bounds, {
      padding: { top: 50, bottom: 50, left: 50, right: 50 },
      maxZoom: 15
    });
  };

  // Update audience circles when play or locations change
  useEffect(() => {
    if (!map.current || !geocodedLocations.length) return;

    const source = map.current.getSource('audience-circles') as mapboxgl.GeoJSONSource;
    if (!source) return;

    if (!selectedPlay) {
      // Clear circles if no play is selected
      source.setData({
        type: 'FeatureCollection',
        features: []
      });
      return;
    }

    setLoadingMessage('Calculating coverage areas...');
    setIsLoading(true);

    // Calculate radius based on play metrics - increased radius calculation
    const baseRadius = selectedPlay.audienceSize / 100; // Reduced divisor for larger circles
    const radius = Math.max(5, Math.min(baseRadius, 50)); // Increased min/max radius range

    // Create circle features for each location
    const circles = geocodedLocations
      .filter(location => location.coordinates)
      .map(location => {
        const center = location.coordinates!;
        const points = 64; // Number of points to make the circle smooth
        const coordinates = [];
        
        // Create a circle of points
        for (let i = 0; i <= points; i++) {
          const angle = (i * 360) / points;
          const rad = (Math.PI * angle) / 180;
          // Convert radius from km to degrees (approximate)
          const latRadius = radius / 111;
          const lonRadius = radius / (111 * Math.cos((center[1] * Math.PI) / 180));
          coordinates.push([
            center[0] + lonRadius * Math.cos(rad),
            center[1] + latRadius * Math.sin(rad)
          ]);
        }

        return {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [coordinates]
          },
          properties: {
            locationId: location.id,
            locationName: location.name,
            audienceSize: selectedPlay.audienceSize,
            radius: radius,
            fillColor: selectedPlay.color?.secondary || '#4F46E5',
            borderColor: selectedPlay.color?.primary || '#4338CA'
          }
        };
      });

    source.setData({
      type: 'FeatureCollection',
      features: circles
    });

    setIsLoading(false);
    setLoadingMessage('');
  }, [selectedPlay, geocodedLocations]);

  useEffect(() => {
    if (!locations || !map.current) return;

    setLoadingMessage('Loading locations...');
    setIsLoading(true);

    const loadLocations = async () => {
      try {
        const geoLocations = await geocodeLocations(locations);
        setGeocodedLocations(geoLocations);
        fitMapToLocations(geoLocations);
      } finally {
        setIsLoading(false);
        setLoadingMessage('');
      }
    };

    loadLocations();
  }, [locations]);

  useEffect(() => {
    if (!map.current || !geocodedLocations.length) return;

    try {
      const points = geocodedLocations
        .filter(location => location.coordinates)
        .map(location => ({
          type: 'Feature',
          properties: {
            locationIds: [location.id],
            location
          },
          geometry: {
            type: 'Point',
            coordinates: location.coordinates!
          }
        })) as any[];

      supercluster.load(points);

      const updateClusters = () => {
        if (!map.current) return;

        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        const bounds = map.current.getBounds();
        const zoom = Math.floor(map.current.getZoom());

        const clusters = supercluster.getClusters(
          [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()],
          zoom
        );

        clusters.forEach(cluster => {
          const [longitude, latitude] = cluster.geometry.coordinates;

          const el = document.createElement('div');
          el.className = cluster.properties.cluster ? 'cluster-marker' : 'location-marker';

          if (cluster.properties.cluster) {
            const count = cluster.properties.point_count;
            el.innerHTML = `<div class="cluster-count">${count}</div>`;
            el.addEventListener('click', () => {
              map.current?.flyTo({
                center: [longitude, latitude],
                zoom: supercluster.getClusterExpansionZoom(cluster.properties.cluster_id)
              });
            });
          } else {
            const location = cluster.properties.location;
            el.addEventListener('click', () => {
              setSelectedLocation(location);
            });
          }

          const marker = new mapboxgl.Marker(el)
            .setLngLat([longitude, latitude])
            .setPopup(
              cluster.properties.cluster
                ? undefined
                : new mapboxgl.Popup({ offset: 25 }).setHTML(`
                    <div class="p-2">
                      <h3 class="font-bold">${cluster.properties.location.name}</h3>
                      <p>${cluster.properties.location.address}</p>
                      <p>${cluster.properties.location.city}, ${cluster.properties.location.state} ${cluster.properties.location.zipcode}</p>
                      <p>Manager: ${cluster.properties.location.manager}</p>
                    </div>
                  `)
            )
            .addTo(map.current!);

          markersRef.current.push(marker);
        });
      };

      map.current.on('moveend', updateClusters);
      map.current.on('zoomend', updateClusters);
      updateClusters();

    } catch (error) {
      console.error('Error initializing markers:', error);
    }

    return () => {
      markersRef.current.forEach(marker => marker.remove());
    };
  }, [geocodedLocations, supercluster]);

  return (
    <div className="absolute inset-0">
      <div ref={mapContainer} className="w-full h-full" />
      {isLoading && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
          <span className="text-sm font-medium text-gray-700">{loadingMessage}</span>
        </div>
      )}
      <style>
        {`
          .location-marker {
            background-color: #4F46E5;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .location-marker:hover {
            transform: scale(1.2);
          }
          .cluster-marker {
            background-color: #4F46E5;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .cluster-marker:hover {
            transform: scale(1.1);
          }
          .cluster-count {
            color: white;
            font-size: 14px;
          }
          .mapboxgl-popup-content {
            padding: 1rem;
            border-radius: 0.5rem;
          }
        `}
      </style>
    </div>
  );
}