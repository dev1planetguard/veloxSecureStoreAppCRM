/**
 * Converts numeric degrees to radians
 * @param {number} degrees
 * @returns {number} Radians
 */
const toRadians = (degrees) => {
  return degrees * Math.PI / 180;
};

/**
 * Calculates the distance between two geographical coordinates using the Haversine formula.
 * @param {{latitude: number, longitude: number}} coord1 The starting coordinate.
 * @param {{latitude: number, longitude: number}} coord2 The destination coordinate.
 * @returns {number} Distance in meters.
 */
const haversineDistance = (coord1, coord2) => {
  const R = 6371e3; // Radius of the Earth in meters
  const lat1 = toRadians(coord1.latitude);
  const lat2 = toRadians(coord2.latitude);
  const deltaLat = toRadians(coord2.latitude - coord1.latitude);
  const deltaLon = toRadians(coord2.longitude - coord1.longitude);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};


/**
 * Calculates the total distance of a path defined by an array of coordinates.
 * @param {Array<{latitude: number, longitude: number}>} coordinatesArray An array of coordinate objects.
 * @returns {number} The total distance of the path in meters.
 */
export const calculateTotalPathDistance = (coordinatesArray) => {
  if (!coordinatesArray || coordinatesArray.length < 2) {
    return 0;
  }

  let totalDistance = 0;
  for (let i = 0; i < coordinatesArray.length - 1; i++) {
    const point1 = coordinatesArray[i];
    const point2 = coordinatesArray[i + 1];
    totalDistance += haversineDistance(point1, point2);
  }

  return totalDistance;
};
