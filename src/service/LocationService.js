// import React, { useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import BackgroundService from 'react-native-background-actions';
// import Geolocation from 'react-native-geolocation-service';

// const sleep = (time) =>
//   new Promise((resolve) => setTimeout(() => resolve(), time));

// const options = {
//   taskName: 'LocationTracking',
//   taskTitle: 'Location Service Running',
//   taskDesc: 'Sending location updates to server',
//   taskIcon: {
//     name: 'ic_launcher',
//     type: 'mipmap',
//   },
//   color: '#ff00ff',
//   parameters: {
//     delay: 10000, // 10 sec interval
//   },
// };

// const sendLocationToServer = async (coords) => {
//   try {
//     const token = await AsyncStorage.getItem('jwtToken');
//     if (!token) return;

//     await fetch('https://your-api.com/location', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         latitude: coords.latitude,
//         longitude: coords.longitude,
//         timestamp: new Date().toISOString(),
//       }),
//     });
//   } catch (err) {
//     console.log('API error:', err);
//   }
// };

// // const veryIntensiveTask = async (taskData) => {
// //   const { delay } = taskData;
// //   console.log('Background task started with delay:', delay);

// //   while (BackgroundService.isRunning()) {
// //     await new Promise((resolve) => {
// //       Geolocation.getCurrentPosition(
// //         (position) => {
// //           console.log('Location:', position.coords);
// //         //   sendLocationToServer(position.coords);
// //           resolve();
// //         },
// //         (error) => {
// //           console.log('Location error:', error);
// //           resolve();
// //         },
// //         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
// //       );
// //     });

// //     await sleep(delay);
// //   }
// // };

// const veryIntensiveTask = async (taskData) => {
//   const { delay } = taskData;
//   while (BackgroundService.isRunning()) {
//     console.log('Background service alive!');
//     await sleep(delay);
//   }
// };

// const LocationService = () => {
//   useEffect(() => {
//     const startService = async () => {
//       const token = await AsyncStorage.getItem('jwtToken');
//       if (true) {
//         if (!BackgroundService.isRunning()) {
//           console.log('Starting background service...');
//               BackgroundService.start(veryIntensiveTask, options)
//     .then(() => console.log('Background service started'))
//     .catch((err) => console.log('Service start error:', err));
//         }
//       }
//     };

//     startService();

//     return () => {
//       BackgroundService.stop();
//     };
//   }, []);

//   return null;
// };

// export default LocationService;

import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundService from 'react-native-background-actions';

const sleep = (time) =>
  new Promise((resolve) => setTimeout(() => resolve(), time));

const options = {
  taskName: 'LocationTracking',
  taskTitle: 'Location Service Running',
  taskDesc: 'Testing background service',
  taskIcon: {
    name: 'ic_launcher', // correct!
    type: 'mipmap',
  },
  color: '#ff00ff',
  parameters: {
    delay: 5000,
  },
};

const veryIntensiveTask = async (taskData) => {
  const { delay } = taskData;
  while (BackgroundService.isRunning()) {
    console.log('Background service alive!');
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
};

const LocationService = () => {
  useEffect(() => {
    const startService = async () => {
      const token = await AsyncStorage.getItem('jwtToken');
      if (true) {
        if (!BackgroundService.isRunning()) {
          console.log('🚀 Starting background service...');
          BackgroundService.start(veryIntensiveTask, options)
            .then(() => console.log('🎉 Background service started!'))
            .catch((err) => console.log('❌ Service start error:', err));
        }
      }
    };


    startService();

    return () => {
      BackgroundService.stop();
    };
  }, []);

  return null;
};

export default LocationService;
