/* eslint-disable */

document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('location-list');
  if (!container) return;

  let locations;
  try {
    const data = container.dataset.locations;
    locations = JSON.parse(data);
  } catch (err) {
    console.error('Error parsing locations:', err);
    return;
  }

  if (!Array.isArray(locations) || locations.length === 0) {
    container.innerHTML =
      '<p style="color:white;text-align:center;">No locations available</p>';
    return;
  }

  // Clear container and create a map element
  container.innerHTML =
    '<div id="map" style="height:500px; width:100%;"></div>';

  // Initialize Leaflet map
  const map = L.map('map', { scrollWheelZoom: false });

  // Add OpenStreetMap tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Collect bounds for all locations
  const bounds = [];

  locations.forEach((loc, index) => {
    if (loc.coordinates) {
      const [lng, lat] = loc.coordinates;

      const marker = L.marker([lat, lng]).addTo(map);
      marker.bindPopup(
        `<b>Day ${loc.day || index + 1}</b><br>${loc.description || ''}`,
      );

      bounds.push([lat, lng]);
    }
  });

  // Fit the map to show all markers
  if (bounds.length) {
    map.fitBounds(bounds, { padding: [50, 50] });
  }
});
