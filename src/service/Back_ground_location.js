import { request, check, openSettings, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Alert, PermissionsAndroid, Platform } from 'react-native';

// export async function requestLocationPermissions() {
//   try {
//     const perm = Platform.select({
//       ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
//       android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
//     });

//     const result = await request(perm);

//     if (result === RESULTS.GRANTED) {
//       return true;
//     } else if (result === RESULTS.BLOCKED) {
//       // Show your own modal before forcing settings
//       Alert.alert(
//         "Permission Required",
//         "Location access is needed for tracking. Please enable it in settings.",
//         [
//           { text: "Cancel", style: "cancel" },
//           { text: "Open Settings", onPress: () => openSettings() }
//         ]
//       );
//       return false;
//     } else {
//       return false; // denied, but not permanently
//     }
//   } catch (err) {
//     console.warn("Permission request failed:", err);
//     return false;
//   }
// }
export async function requestLocationPermissions() {
  try {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message:
            "This app needs access to your location for tracking purposes.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          "Permission Required",
          "Location access is blocked. Please enable it in settings.",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Open Settings",
              onPress: () => {
                // You can link to settings manually:
                // Linking.openSettings();
              },
            },
          ]
        );
        return false;
      } else {
        return false; // denied but not permanently
      }
    } else {
      // iOS: system shows prompt automatically when you use Geolocation API
      return true;
    }
  } catch (err) {
    console.warn("Permission request failed:", err);
    return false;
  }
}



// // backgroundTask.js
// // import BackgroundFetch from "react-native-background-fetch";
// import Geolocation from "react-native-geolocation-service";
// import {Platform} from 'react-native';
// import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

// export async function requestLocationPermissions() {
//   try {
//     if (Platform.OS === 'ios') {
//       // First try WhenInUse
//       const whenInUse = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

//       if (whenInUse === RESULTS.GRANTED) {
//         // If you really need always, request upgrade
//         const always = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
//         return always === RESULTS.GRANTED;
//       }

//       return false;
//     } else {
//       // Android foreground
//       const fine = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
//       if (fine !== RESULTS.GRANTED) return false;

//       // Android background (only required if you need tracking after app closed)
//       if (Platform.Version >= 29) { // Android 10+
//         const bg = await request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);
//         return bg === RESULTS.GRANTED;
//       }

//       return true;
//     }
//   } catch (err) {
//     console.warn("Permission request failed:", err);
//     return false;
//   }
// }







// async function onBackgroundTask(taskId) {
//   console.log("[BackgroundFetch] task: ", taskId);

//   Geolocation.getCurrentPosition(
//     (position) => {
//       const { latitude, longitude } = position.coords;
// console.log('cooorrdss in bg',latitude,longitude);

//     //   // ✅ Send to server
//     //   fetch("https://your.api/endpoint/location", {
//     //     method: "POST",
//     //     headers: {"Content-Type": "application/json"},
//     //     body: JSON.stringify({ latitude, longitude, timestamp: Date.now() }),
//     //   }).catch(console.warn);
//     },
//     (error) => {
//       console.warn("BG geolocation error:", error);
//     },
//     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//   );

//   // Mark task complete
//   BackgroundFetch.finish(taskId);
// }

// export function initBackgroundFetch() {
//   BackgroundFetch.configure(
//     {
//       minimumFetchInterval: 15,   // minutes
//       stopOnTerminate: false,     // persist after app kill
//       startOnBoot: true,          // auto-start on reboot
//       enableHeadless: true,
//     },
//     onBackgroundTask,
//     (error) => console.warn("[BackgroundFetch] failed", error)
//   );

//   // For Android headless mode
//   BackgroundFetch.registerHeadlessTask(onBackgroundTask);
// }
