import { Linking } from 'react-native'; 

export const getFormattedDateTime = () => {
    const now = new Date();
    return (
      now.getFullYear() +
      '-' +
      String(now.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(now.getDate()).padStart(2, '0') +
      ' ' +
      String(now.getHours()).padStart(2, '0') +
      ':' +
      String(now.getMinutes()).padStart(2, '0') +
      ':' +
      String(now.getSeconds()).padStart(2, '0')
    );
  };

   // Password strength check
  export const isStrongPassword = pwd =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(pwd);

  // Format date time 
   export const formatTime = (datetime) => {
    if (!datetime) return 'N/A';
    try {
      return format(new Date(datetime), 'yyyy-MM-dd hh:mm a');
    } catch {
      return datetime;
    }
  };

//  Open Google Maps at the given coordinates.
  export const openMapWithCoords = (locationString) => {
  if (!locationString) {
    console.warn('No location provided');
    return;
  }
  
  const [lat, lng] = getCoordsFromString(locationString);
  const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  
  Linking.openURL(url).catch((err) =>
    console.error('Failed to open map:', err)
  );
};



//  * Extract coordinates from a "lat,lng" string.

// export const getCoordsFromString = (locationString) => {
//   if (!locationString || typeof locationString !== 'string') {
//     return [null, null];
//   }

//   const parts = locationString.split(',');
//   if (parts.length !== 2) return [null, null];

//   const lat = parseFloat(parts[0].trim());
//   const lng = parseFloat(parts[1].trim());

//   return isNaN(lat) || isNaN(lng) ? [null, null] : [lat, lng];
// };


export const getCoordsFromString = (locationString) => {
  if (!locationString || typeof locationString !== 'string') {
    return [null, null];
  }
  
  const parts = locationString.split(',');
  if (parts.length !== 2) return [null, null];
  
  const lat = parseFloat(parts[0].trim());
  const lng = parseFloat(parts[1].trim());
  
  if (isNaN(lat) || isNaN(lng)) return [null, null];
  
  return [lat, lng];
};


export const resolveImageUrl = (path) => {
  if (!path) return null;

  const cleanPath = path.replace(/\\/g, '/');
  return cleanPath.startsWith('http') ? cleanPath : `${IMAGE_BASE_URL}${cleanPath}`;
};


export const openMap = (locationStr) => {
  if (!locationStr) return;

  const [lat, lon] = locationStr.split(',');
  if (!lat || !lon) return;

  const url = `https://www.google.com/maps?q=${lat.trim()},${lon.trim()}`;
  Linking.openURL(url).catch(err => console.error('Failed to open map:', err));
};

export const getAddressFromCoords = async (latitude, longitude) => {
  try {
    if (isNaN(latitude) || isNaN(longitude)) {
      throw new Error('Invalid coordinates');
    }

    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    const json = await response.json();

    if (json && json.display_name) {
      return json.display_name;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Reverse geocode error:', error);
    return null;
  }
};


