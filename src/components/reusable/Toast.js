import React, { useEffect, useState } from "react";
import { Animated, Platform, StyleSheet, Text, View } from "react-native";
import { ToastAndroid } from "react-native";

let toastRef = null;

export const showToast = (message, duration = 2000) => {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    if (toastRef) {
      toastRef.show(message, duration);
    }
  }
};

const ToastMessage = () => {
  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    toastRef = {
      show: (message, duration) => {
        setMsg(message);
        setVisible(true);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();

        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => setVisible(false));
        }, duration);
      },
    };

    return () => {
      toastRef = null;
    };
  }, []);

  if (!visible) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      <Animated.View style={[styles.toast, { opacity: fadeAnim }]}>
        <Text style={styles.text}>{msg}</Text>
      </Animated.View>
    </View>
  );
};

export default ToastMessage;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 9999,
  },
  toast: {
    backgroundColor: "#333",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    maxWidth: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 14,
  },
});
