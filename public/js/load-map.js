/* eslint-disable */

// load-map.js - Pure CSS/HTML implementation
export const displayMap = (locations, containerId = 'location-list') => {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!Array.isArray(locations) || locations.length === 0) {
    container.innerHTML =
      '<p style="color:white;text-align:center;">No locations available</p>';
    return;
  }

  const validLocations = locations.filter(
    (loc) => loc.coordinates && loc.coordinates.length === 2,
  );

  if (validLocations.length === 0) {
    container.innerHTML =
      '<p style="color:white;text-align:center;">No valid location coordinates</p>';
    return;
  }

  // Create a simple list with coordinates
  container.innerHTML = `
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
      <h3 style="margin-top: 0; color: #333;">Tour Locations</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
        ${validLocations
          .map((loc, index) => {
            const [lng, lat] = loc.coordinates;
            return `
            <div style="background: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <div style="font-weight: bold; color: #e74c3c; margin-bottom: 8px;">
                📍 Day ${loc.day || index + 1}
              </div>
              <div style="color: #666; margin-bottom: 8px;">
                ${loc.description || 'No description available'}
              </div>
              <div style="font-size: 12px; color: #888;">
                Coordinates: ${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E
              </div>
              <button onclick="openInGoogleMaps(${lat}, ${lng})" 
                      style="margin-top: 10px; padding: 5px 10px; background: #3498db; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 12px;">
                View on Google Maps
              </button>
            </div>
          `;
          })
          .join('')}
      </div>
    </div>
  `;

  // Add global function for opening in Google Maps
  window.openInGoogleMaps = (lat, lng) => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
  };
};
