import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function LoadingPopUp(props) {
  const color = props.error ? "#ef4444" : "#84cc16";
  const cardStyle = { backgroundColor: color, ...styles.card };
  return (
    <View style={cardStyle}>
      <Text>{props.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    textAlign: "center",
    margin: 30,
    color: "#fff",
    fontWeight: "bold",
    padding: 30,
  },
});
