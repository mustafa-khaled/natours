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

  container.innerHTML = `
      <div class="locations-grid">
        ${locations
          .map(
            (loc, index) => `
          <div class="location-card">
            <div class="location-day">${loc.day || index + 1}</div>
            ${
              loc.coordinates
                ? `
              <div class="location-coords">
                ${loc.coordinates[1].toFixed(4)}, ${loc.coordinates[0].toFixed(4)}
              </div>
            `
                : ''
            }
          </div>
        `,
          )
          .join('')}
      </div>
    `;
});
