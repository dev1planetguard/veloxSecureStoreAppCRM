// foregroundTracking.js
import { Platform } from "react-native";
import Geolocation from "react-native-geolocation-service";

let watchId = null;

export function startForegroundTracking(onLocation) {

  if (Platform.OS === "ios" && Geolocation.requestAuthorization) {
    Geolocation.requestAuthorization("whenInUse"); 
    // or "whenInUse" depending on your plist keys
  }

  watchId = Geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      console.log("Foreground Location:", latitude, longitude);
      onLocation && onLocation({ latitude, longitude });
     
    },
    (error) => {
      console.warn("Foreground watch error:", error);
    },
    {
      enableHighAccuracy: true,
      distanceFilter: 20,     // meters before update
      interval: 900000,         // Android: request interval (ms)
      fastestInterval: 2000,  // Android: fastest interval
      showsBackgroundLocationIndicator: true, // iOS indicator
    }
  );


}

export function stopForegroundTracking() {
  if (watchId !== null) {
    Geolocation.clearWatch(watchId);
    watchId = null;
  }
}
