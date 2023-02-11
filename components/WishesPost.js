import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";

export const Wishes = (el) => {
  if (el.Wishes.length > 0) {
    let res = "";
    el.Wishes.forEach((element) => {
      res += `${element["Name"].slice(0, 1)} `;
    });
    return (
      <Text style={styles.text}>
        Пожелания:{"  "}
        <Text style={{ color: "orange", fontWeight: "700" }}>{res}</Text>
      </Text>
    );
  } else {
    return <></>;
  }
};

export const ClientComment = (el) => {
  if (el.ClientComment) {
    return el.ClientComment;
  } else {
    return "";
  }
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#17312b",
    padding: 10,
    margin: 10,
    backgroundColor: "#182533",
  },
  text: {
    marginBottom: 6,
    marginEnd: 6,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "400",
    color: "#FAEBD7",
    flex: 1,
    fontSize: 15,
  },
  title: {
    //textAlign: "center",
    width: 125,
    //flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#FAEBD7",
    // borderWidth: 1,
    // borderRadius: 5,
  },
  button: {
    width: 80,
    height: 40,
    color: "#FAEBD7",
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    backgroundColor: "green",
    textAlign: "center",
    textAlignVertical: "center",
  },
  status: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "bold",
  },
});
