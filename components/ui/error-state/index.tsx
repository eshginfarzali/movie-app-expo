import { Colors } from "@/constants/Colors";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const ErrorState = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) => {
  return (
    <View style={styles.container} accessibilityRole="alert">
      <Text style={styles.message}>{message}</Text>
      {onRetry ? (
        <Pressable
          onPress={onRetry}
          style={styles.button}
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Try again</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

export default ErrorState;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 16,
  },
  message: {
    color: Colors.secendaryText,
    textAlign: "center",
  },
  button: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: Colors.purple,
  },
  buttonText: {
    color: Colors.text,
    fontWeight: "bold",
  },
});
